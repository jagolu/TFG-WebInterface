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

    //
    // ──────────────────────────────────────────────────────────────────────────
    //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //

    /**
     * @constructor
     * @param {AlertService} __alert To launch the alerts
     * @param {LoadingService} __loading To stop loading
     * @param {Router} __router To redirect the user
     * @param {SessionService} __sessionS To renew the token
     * @param {AuthenticationService} __authS To log out the user if it is needed
     */
    constructor(
        private __alert:AlertService, 
        private __loading:LoadingService,
        private __router:Router, 
        private __sessionS:SessionService,
        private __authS:AuthenticationService
    ) { }


    //
    // ──────────────────────────────────────────────────────────────────────────────────
    //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────────
    //

    /**
     * Intercept every incoming http responses
     * 
     * @access public
     * @param {HttpRequest<any>} req The incoming request
     * @param {HttpHandler} next The http handler
     */
    public intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(err=>{
                if(err instanceof HttpErrorResponse){
                    if(err.status == 401 && !err.url.includes("Refresh")){
                        return this.handleUnathorized(err, req, next);
                    } 
                    else{
                        this.__loading.stopLoading();
                        this.showErrorAlert(err);
                        this.errRedirect(err);
                        return EMPTY;
                    }
                }
            })
        );
    }



    //
    // ────────────────────────────────────────────────────────────────────────────────────
    //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────────────
    //


    //
    // ─── LAUNCH ALERTS ──────────────────────────────────────────────────────────────
    //

    
    /**
     * Launch an alert for the provided error response
     * 
     * @access private
     * @param {HttpErrorResponse} errRes The response when
     * the response is an error
     */
    private showErrorAlert(errRes:HttpErrorResponse){
        if(errRes.status == 400 && errRes.error){
            if(errRes.error == "notAllowed") this.__alert.openAlertInfo(AlertInfoType.NOTVALIDROLE);
            else if(errRes.error["error"] == "EmailAlreadyExistsError") this.__alert.openAlertInfo(AlertInfoType.EMAILTAKENERROR);
            else if(errRes.error["error"] == "WrongEmailOrPassword") this.__alert.openAlertInfo(AlertInfoType.WRONGEMAILORPASSWORD);
            else if(errRes.error["error"] == "NotValidatedYet") this.__alert.openAlertInfo(AlertInfoType.NOTVALIDATEDYET);
            else if(errRes.error["error"] == "InvalidSocialToken") this.__alert.openAlertInfo(AlertInfoType.SOCIALERROR);
            else if(errRes.error["error"] == "CantDeleteAccount") this.__alert.openAlertInfo(AlertInfoType.CANTDELETEACCOUNT);
            else if(errRes.error["error"] == "LimitationTimeCreateGroup") this.__alert.openAlertInfo(AlertInfoType.LIMITATIONTIMECREATEGROUP);
            else if(errRes.error["error"] == "LimitationCreateGroup") this.__alert.openAlertInfo(AlertInfoType.LIMITATIONCREATEGROUP);
            else if(errRes.error["error"] == "IncorrectOldPassword") this.__alert.openAlertInfo(AlertInfoType.INCORRECTOLDPASSWORD);
            else if(errRes.error["error"] == "ErrorBuy") this.__alert.openAlertInfo(AlertInfoType.ERRORBUY);
            else if(errRes.error["error"] == "IncorrectPasswordJoiningGroup") this.__alert.openAlertInfo(AlertInfoType.INCORRECTPASSWORDJOININGGROUP);
            else if(errRes.error["error"] == "MaxGroupJoinsReached") this.__alert.openAlertInfo(AlertInfoType.MAXGROUPJOINREACHED);
            else if(errRes.error["error"] == "EmailDontExist") this.__alert.openAlertInfo(AlertInfoType.EMAILDONTEXIST);
            else if(errRes.error["error"] == "CantChangePasswordToday") this.__alert.openAlertInfo(AlertInfoType.CANTCHANGEPASSTODAY);
            else if(errRes.error["error"] == "NotSocialSignYet") this.__alert.openAlertInfo(AlertInfoType.NOTSOCIALSIGNYET);
            else if(errRes.error["error"] == "BetCancelled") this.__alert.openAlertInfo(AlertInfoType.BETCANCELLED);
            else if(errRes.error["error"] == "BetEnded") this.__alert.openAlertInfo(AlertInfoType.BETENDED);
            else if(errRes.error["error"] == "BetLastBetPassed") this.__alert.openAlertInfo(AlertInfoType.BETLASTBETPASSED);
            else if(errRes.error["error"] == "CancelBetCancelled") this.__alert.openAlertInfo(AlertInfoType.CANCELBETCANCELLED);
            else if(errRes.error["error"] == "CancelBetEnded") this.__alert.openAlertInfo(AlertInfoType.CANCELBETENDED);
            else if(errRes.error["error"] == "CancelBetLastBetPassed") this.__alert.openAlertInfo(AlertInfoType.CANCELBETLASTBETPASSED);
            else if(errRes.error["error"] == "YoureBanned") this.__alert.openAlertInfo(AlertInfoType.YOUREBANNED);
            else if(errRes.error["error"] == "GroupBanned") this.__alert.openAlertInfo(AlertInfoType.GROUPBANNED);
            else if(errRes.error["error"] == "DeleteRequested") this.__alert.openAlertInfo(AlertInfoType.DELETEREQUEST);
            else if(errRes.error["error"] == "recvNotExist") this.__alert.openAlertInfo(AlertInfoType.RECVNOTEXIST);
            else if(errRes.error["error"] == "YouwereKickedGroup") this.__alert.openAlertInfo(AlertInfoType.YOUWEREKICKEDGROUP);
            else if(errRes.error["error"] == "YouhasleavedGroup") this.__alert.openAlertInfo(AlertInfoType.YOUHASLEAVEGROUP);
            else if(errRes.error["error"] == "CantCancelTheFootballBet") this.__alert.openAlertInfo(AlertInfoType.CANTCANCELTHEFOOTBALLBET);
            else if(errRes.error["error"] == "NotFullyRegister") this.__alert.openAlertInfo(AlertInfoType.NOTFULLYREGISTER);
        }
        else if(errRes.status == 400 && !errRes.error) this.__alert.openAlertInfo(AlertInfoType.VALIDATINGUSERERROR);
        else if(errRes.status == 500) this.__alert.openAlertInfo(AlertInfoType.SERVERERROR);
        else if(errRes.status == 0) this.__alert.openAlertInfo(AlertInfoType.LOSTCONNECTIONERROR);
        else if(errRes.status == 401) this.__alert.openAlertInfo(AlertInfoType.SESSIONEXPIRED);
    }


    //
    // ─── REDIRECT THE USER ──────────────────────────────────────────────────────────
    //
    
    /**
     * Redirect the user depending on the response 
     * provided
     * 
     * @access private
     * @param {HttpErrorResponse} errRes The response when
     * the response is an error
     */
    private errRedirect(errRes:HttpErrorResponse){
        if(errRes.status == 401){
            this.__authS.logOut();
            this.__router.navigate(['../logIn']);
        }
        if(errRes.url.includes("Authorization/Validate") || errRes.url.includes("Authorization/checkPasswordToken")) {
            this.__router.navigate(['']);
        }
        if(errRes.status == 400 && 
            (!errRes.error || errRes.error=="notAllowed" || errRes.error["error"]=="YoureBanned" || errRes.error["error"]=="GroupBanned")){
            this.__authS.logOut();
            this.__router.navigate(['../logIn']);
        }
    }


    //
    // ─── REFRESH TOKEN FUNCTION ─────────────────────────────────────────────────────
    //    
        
    /**
     * Handles a 401 http response. First tries to refresh the token and redo the 
     * last response before the refresh request. If the refresh request fails,
     * logs out the user.
     * 
     * @param {any} res The response of the request (The 401 request or the response
     * of the refresh request)
     * @param {HttpRequest<any>} req The request that has been done
     * @param {HttpHandler} next The http handler
     * @returns {Observable<any>} The new http event
     */
    private handleUnathorized(res:any, req:HttpRequest<any>, next:HttpHandler):Observable<any>{

        return this.__authS.refreshToken().pipe(
            switchMap(newToken=>{
                if(newToken){
                    this.__sessionS.renewToken({
                        "api_token": newToken.api_token,
                        "username": newToken.username,
                        "role" : newToken.role,
                        "groups" : newToken.groups
                    });
                    return next.handle(this.addToken(req, newToken.api_token));
                }

                this.__loading.stopLoading();
                this.showErrorAlert(res);
                this.errRedirect(res);
                return EMPTY;
            }),
            catchError(_=>{
                this.__loading.stopLoading();
                this.showErrorAlert(res);
                this.errRedirect(res);
                return EMPTY;
            }),
            finalize(()=>{
                return EMPTY;
            })
        );
    }

    /**
     * Adds the new token to the next request
     * 
     * @access private
     * @param {HttpRequest<any>} req The next request
     * @param {string} token The new token
     */
    private addToken(req:HttpRequest<any>, token:string){
        return req.clone({headers: req.headers.set('Authorization', "Bearer "+token)});
    }
}