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
            if(err.error == "notAllowed") this.alert.openAlertInfo(AlertInfoType.NOTVALIDROLE);
            else if(err.error["error"] == "EmailAlreadyExistsError") this.alert.openAlertInfo(AlertInfoType.EMAILTAKENERROR);
            else if(err.error["error"] == "WrongEmailOrPassword") this.alert.openAlertInfo(AlertInfoType.WRONGEMAILORPASSWORD);
            else if(err.error["error"] == "NotValidatedYet") this.alert.openAlertInfo(AlertInfoType.NOTVALIDATEDYET);
            else if(err.error["error"] == "InvalidSocialToken") this.alert.openAlertInfo(AlertInfoType.SOCIALERROR);
            else if(err.error["error"] == "CantDeleteAccount") this.alert.openAlertInfo(AlertInfoType.CANTDELETEACCOUNT);
            else if(err.error["error"] == "LimitationTimeCreateGroup") this.alert.openAlertInfo(AlertInfoType.LIMITATIONTIMECREATEGROUP);
            else if(err.error["error"] == "LimitationCreateGroup") this.alert.openAlertInfo(AlertInfoType.LIMITATIONCREATEGROUP);
            else if(err.error["error"] == "IncorrectOldPassword") this.alert.openAlertInfo(AlertInfoType.INCORRECTOLDPASSWORD);
            else if(err.error["error"] == "ErrorBuy") this.alert.openAlertInfo(AlertInfoType.ERRORBUY);
            else if(err.error["error"] == "IncorrectPasswordJoiningGroup") this.alert.openAlertInfo(AlertInfoType.INCORRECTPASSWORDJOININGGROUP);
            else if(err.error["error"] == "MaxGroupJoinsReached") this.alert.openAlertInfo(AlertInfoType.MAXGROUPJOINREACHED);
            else if(err.error["error"] == "EmailDontExist") this.alert.openAlertInfo(AlertInfoType.EMAILDONTEXIST);
            else if(err.error["error"] == "CantChangePasswordToday") this.alert.openAlertInfo(AlertInfoType.CANTCHANGEPASSTODAY);
            else if(err.error["error"] == "NotSocialSignYet") this.alert.openAlertInfo(AlertInfoType.NOTSOCIALSIGNYET);
            else if(err.error["error"] == "BetCancelled") this.alert.openAlertInfo(AlertInfoType.BETCANCELLED);
            else if(err.error["error"] == "BetEnded") this.alert.openAlertInfo(AlertInfoType.BETENDED);
            else if(err.error["error"] == "BetLastBetPassed") this.alert.openAlertInfo(AlertInfoType.BETLASTBETPASSED);
            else if(err.error["error"] == "CancelBetCancelled") this.alert.openAlertInfo(AlertInfoType.CANCELBETCANCELLED);
            else if(err.error["error"] == "CancelBetEnded") this.alert.openAlertInfo(AlertInfoType.CANCELBETENDED);
            else if(err.error["error"] == "CancelBetLastBetPassed") this.alert.openAlertInfo(AlertInfoType.CANCELBETLASTBETPASSED);
            else if(err.error["error"] == "YoureBanned") this.alert.openAlertInfo(AlertInfoType.YOUREBANNED);
            else if(err.error["error"] == "GroupBanned") this.alert.openAlertInfo(AlertInfoType.GROUPBANNED);
            else if(err.error["error"] == "DeleteRequested") this.alert.openAlertInfo(AlertInfoType.DELETEREQUEST);
            else if(err.error["error"] == "recvNotExist") this.alert.openAlertInfo(AlertInfoType.RECVNOTEXIST);
            else if(err.error["error"] == "YouwereKickedGroup") this.alert.openAlertInfo(AlertInfoType.YOUWEREKICKEDGROUP);
            else if(err.error["error"] == "YouhasleavedGroup") this.alert.openAlertInfo(AlertInfoType.YOUHASLEAVEGROUP);
        }
        else if(err.status == 400 && !err.error) this.alert.openAlertInfo(AlertInfoType.VALIDATINGUSERERROR);
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
        if(err.url.includes("Authorization/Validate") || err.url.includes("Authorization/checkPasswordToken")) {
            this._router.navigate(['']);
        }
        if(err.status == 400 && 
            (!err.error || err.error=="notAllowed" || err.error["error"]=="YoureBanned" || err.error["error"]=="GroupBanned")){
            this._authS.logOut();
            this._router.navigate(['../logIn']);
        }
    }

/**********************REFRESHTOKEN********************************/
    
    private handleUnathorized(res, req:HttpRequest<any>, next:HttpHandler):Observable<any>{

        return this._authS.refreshToken().pipe(
            switchMap(newToken=>{
                if(newToken){
                    this._sessionS.renewToken({
                        "api_token": newToken.api_token,
                        "username": newToken.username,
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