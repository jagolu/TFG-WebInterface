import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, 
        HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { switchMap, catchError, finalize } from 'rxjs/operators';
import { AlertService, AlertType } from '../services/visualServices/alert.service';
import { LoadingService } from '../services/visualServices/loading.service';
import { SessionService } from '../services/userServices/session.service';
import { AuthenticationService } from '../services/restServices/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private alert:AlertService, private loading:LoadingService,
                private _router:Router, private _sessionS:SessionService,
                private _authS:AuthenticationService) { }

    intercept( req: HttpRequest<any>, next: HttpHandler ):Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(err=>{
                if(err instanceof HttpErrorResponse){
                    if(err.status == 401){
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
            if(err.error["error"] == "EmailAlreadyExistsError") this.alert.openAlert(AlertType.EMAILTAKENERROR);
            if(err.error["error"] == "WrongEmailOrPassword") this.alert.openAlert(AlertType.WRONGEMAILORPASSWORD);
            if(err.error["error"] == "NotValidatedYet") this.alert.openAlert(AlertType.NOTVALIDATEDYET);
            if(err.error["error"] == "InvalidSocialToken") this.alert.openAlert(AlertType.SOCIALERROR);
            if(err.error["error"] == "InvalidChangePassword") this.alert.openAlert(AlertType.VALIDATINGUSERERROR);
            if(err.error["error"] == "InvalidChangeNickname") this.alert.openAlert(AlertType.VALIDATINGUSERERROR);
            if(err.error["error"] == "CantDeleteAccount") this.alert.openAlert(AlertType.CANTDELETEACCOUNT);
            if(err.error['email'] || err.error['password'] || err.error['username']) this.alert.openAlert(AlertType.VALIDATINGUSERERROR);
        }
        if(err.status == 500) this.alert.openAlert(AlertType.SERVERERROR);
        if(err.status == 0) this.alert.openAlert(AlertType.LOSTCONNECTIONERROR);
        if(err.status == 401) this.alert.openAlert(AlertType.SESSIONEXPIRED);
    }

/*------------------------------------ REDIRECT------------------------------ */
    
    private errRedirect(err:HttpErrorResponse){
        if(err.status == 401){
            this._authS.logOut();
            this._router.navigate(['../logIn']);
        }
        if(err.url.includes("Authorization/Validate")) this._router.navigate(['']);
    }

/**********************REFRESHTOKEN********************************/
    
    private handleUnathorized(res, req:HttpRequest<any>, next:HttpHandler):Observable<any>{

        return this._authS.refreshToken().pipe(
            switchMap(newToken=>{
                if(newToken){
                    this._sessionS.renewToken(newToken.api_token, newToken.role);
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