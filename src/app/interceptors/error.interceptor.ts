import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, 
        HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { switchMap, catchError, finalize } from 'rxjs/operators';
import { AlertService } from '../services/visualServices/alert.service';
import { LoadingService } from '../services/visualServices/loading.service';
import { SessionService } from '../services/userServices/session.service';
import { AuthenticationService } from '../services/restServices/authentication.service';
import { AlertInfoType } from '../models/models';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private alert:AlertService, private loading:LoadingService,
                private _router:Router, private _sessionS:SessionService,
                private _authS:AuthenticationService) { }

    intercept( req: HttpRequest<any>, next: HttpHandler ):Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(err=>{
                if(err instanceof HttpErrorResponse){
                    if(err.status == 401 && !err.url.includes("Refresh")){
                        return this.handleUnathorized(err, req, next);
                    } 
                    else{
                        this.loading.stopLoading();
                        this.showErrorAlert(err);
                        this.errRedirect(err);
                        return EMPTY;
                    }
                }
            })
        );
    }


/*-----------------------------------------ALERTS----------------------------------- */

    private showErrorAlert(err:HttpErrorResponse){
        if(err.status == 400 && err.error){
            if(err.error["error"] == "EmailAlreadyExistsError") this.alert.openAlertInfo(AlertInfoType.EMAILTAKENERROR);
            else if(err.error["error"] == "WrongEmailOrPassword") this.alert.openAlertInfo(AlertInfoType.WRONGEMAILORPASSWORD);
            else if(err.error["error"] == "NotValidatedYet") this.alert.openAlertInfo(AlertInfoType.NOTVALIDATEDYET);
            else if(err.error["error"] == "InvalidSocialToken") this.alert.openAlertInfo(AlertInfoType.SOCIALERROR);
            else if(err.error["error"] == "CantDeleteAccount") this.alert.openAlertInfo(AlertInfoType.CANTDELETEACCOUNT);
            else if(err.error["error"] == "LimitationSpecificCreateGroup") this.alert.openAlertInfo(AlertInfoType.LIMITATIONSPECIFICCREATEGROUP);
            else if(err.error["error"] == "LimitationCreateGroup") this.alert.openAlertInfo(AlertInfoType.LIMITATIONCREATEGROUP);
            else if(err.error["error"] == "IncorrectOldPassword") this.alert.openAlertInfo(AlertInfoType.INCORRECTOLDPASSWORD);
            else if(err.error["error"] == "ErrorBuy") this.alert.openAlertInfo(AlertInfoType.ERRORBUY);
            else if(err.error["error"] == "IncorrectPasswordJoiningGroup") this.alert.openAlertInfo(AlertInfoType.INCORRECTPASSWORDJOININGGROUP);
            else if(err.error["error"] == "MaxGroupJoinsReached") this.alert.openAlertInfo(AlertInfoType.MAXGROUPJOINREACHED);
            else this.alert.openAlertInfo(AlertInfoType.VALIDATINGUSERERROR);
        }
        else if(err.status == 500) this.alert.openAlertInfo(AlertInfoType.SERVERERROR);
        else if(err.status == 0) this.alert.openAlertInfo(AlertInfoType.LOSTCONNECTIONERROR);
        else if(err.status == 401) this.alert.openAlertInfo(AlertInfoType.SESSIONEXPIRED);
    }

/*------------------------------------ REDIRECT------------------------------ */
    
    private errRedirect(err:HttpErrorResponse){
        if(err.status == 401){
            this._authS.logOut();
            this._router.navigate(['../logIn']);
        }
        if(err.url.includes("Authorization/Validate")) this._router.navigate(['']);
        if(err.status == 400 && err.error["error"] == "") this._router.navigate(['']);
    }

/**********************REFRESHTOKEN********************************/
    
    private handleUnathorized(res, req:HttpRequest<any>, next:HttpHandler):Observable<any>{

        return this._authS.refreshToken().pipe(
            switchMap(newToken=>{
                if(newToken){
                    this._sessionS.renewToken({
                        "api_token": newToken.api_token,
                        "role" : newToken.role,
                        "groups" : newToken.groups
                    });
                    return next.handle(this.addToken(req, newToken.api_token));
                }

                this.loading.stopLoading();
                this.showErrorAlert(res);
                this.errRedirect(res);
                return EMPTY;
            })
            ,
            catchError(_=>{
                this.loading.stopLoading();
                this.showErrorAlert(res);
                this.errRedirect(res);
                return EMPTY;
            }),
            finalize(()=>{
                return EMPTY;
            })
        );
    }

    addToken(req:HttpRequest<any>, token:string){
        return req.clone({
            headers: req.headers.set('Authorization', "Bearer "+token)
        });
    }
}