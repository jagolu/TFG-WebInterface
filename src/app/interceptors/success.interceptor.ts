import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, 
        HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertService } from 'src/app/services/visualServices/alert.service';
import { LoadingService } from 'src/app/services/visualServices/loading.service';
import { SessionService } from '../services/userServices/session.service';
import { AuthenticationService } from '../services/restServices/authentication.service';
import { AlertInfoType } from '../models/models';

@Injectable()
export class SuccessInterceptor implements HttpInterceptor {

    //
    // ──────────────────────────────────────────────────────────────────────────
    //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //

    /**
     * @constructor
     * @param {AlertService} __alert To launch the alerts
     * @param {LoadingService} __loading To start loading
     * @param {Router} __router To redirect the user
     * @param {SessionService} __sessionS To set the session info
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
        return next.handle(req).pipe(tap(
            (ok)=>{
                if(ok instanceof HttpResponse) {
                    this.showSuccessAlert(ok);
                    this.__loading.stopLoading();
                    this.handleAuthentication(ok);
                    this.successRedirect(ok.url);
                }
            }
        ));
    }


    //
    // ────────────────────────────────────────────────────────────────────────────────────
    //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────────────
    //

    //
    // ─── AUTHENTICATION ─────────────────────────────────────────────────────────────
    //

    /**
     * Manage a http response for authenticate
     * 
     * @access private
     * @param {any} request The response response
     */
    private handleAuthentication(request:any){
        if(request.body != null && request.body.api_token!=null){
            this.__sessionS.setSession({
                "api_token": request.body.api_token,
                "username": request.body.username,
                "role": request.body.role,
                "groups": request.body.groups
            });
        }
        if((request.url.includes("DeleteAccount"))){
            this.__authS.logOut();
        }
    }

    //
    // ─── ALERTS ─────────────────────────────────────────────────────────────────────
    //

    /**
     * Show the correct alert for the correct response
     * 
     * @access private
     * @param {any} successRes The success response of the request
     */
    private showSuccessAlert(successRes){
        if(successRes.body && successRes.body.success){
            if(successRes.body.success == "PassChanged") this.__alert.openAlertInfo(AlertInfoType.PASSWORDCHANGED);
            else if(successRes.body.success == "SuccesfullBuy") this.__alert.openAlertInfo(AlertInfoType.SUCCESFULLBUY);
            else if(successRes.body.success == "EnabledGroupPassword") this.__alert.openAlertInfo(AlertInfoType.ENABLEDGROUPPASSWORD);
            else if(successRes.body.success == "SuccesfullJoinGroup") this.__alert.openAlertInfo(AlertInfoType.SUCCESFULLJOINGROUP);
            else if(successRes.body.success == "SuccesfullCreatedGroup") this.__alert.openAlertInfo(AlertInfoType.SUCCESFULLCREATEDGROUP);
            else if(successRes.body.success == "SucessFullPasswordEmail") this.__alert.openAlertInfo(AlertInfoType.SUCCESSPASSWORDEMAIL);
            else if(successRes.body.success == "SuccesfullGroupRemoved") this.__alert.openAlertInfo(AlertInfoType.SUCCESFULLGROUPREMOVED);
            else if(successRes.body.success == "SuccesfullGroupLeave") this.__alert.openAlertInfo(AlertInfoType.SUCCESFULLGROUPLEAVE);
            else if(successRes.body.success == "SuccessfullUserBan") this.__alert.openAlertInfo(AlertInfoType.USERSUCCESFULLYBANNED);
            else if(successRes.body.success == "SuccessfullUserUnban") this.__alert.openAlertInfo(AlertInfoType.USERSUCCESFULLYUNBANNED);
            else if(successRes.body.success == "SuccessfullGroupBan") this.__alert.openAlertInfo(AlertInfoType.GROUPSUCCESFULLYBANNED);
            else if(successRes.body.success == "SuccessfullGroupUnban") this.__alert.openAlertInfo(AlertInfoType.GROUPSUCCESFULLYUNBANNED);
        }
        else if(successRes.url.includes("Authorization/SignUp")) this.__alert.openAlertInfo(AlertInfoType.VERIFICATIONSENT);
        else if(successRes.url.includes("User/DeleteAccount")) this.__alert.openAlertInfo(AlertInfoType.DELETEDACCOUNT);
        else if(successRes.url.includes("Bet/LaunchFootBallBet")) this.__alert.openAlertInfo(AlertInfoType.SUCCESFULLFOOTBALLBET);
        else if(successRes.url.includes("Bet/DoFootballBet")) this.__alert.openAlertInfo(AlertInfoType.SUCCESFULLDOFOOTBALLBET);
        else if(successRes.url.includes("Bet/CancelUserFootballBet")) this.__alert.openAlertInfo(AlertInfoType.SUCCESFULLCANCELFOOTBALLBET);
        else if(successRes.url.includes("DirectMessages/CreateDMTitle")) this.__alert.openAlertInfo(AlertInfoType.DMCREATED);
        else if(successRes.url.includes("Group/ManageWeekPay")) this.__alert.openAlertInfo(AlertInfoType.SUCCESSFULLWEEKLYPAYCHANGE);
        else if(successRes.url.includes("Group/ManagePassword")) this.__alert.openAlertInfo(AlertInfoType.SUCCESSFULLMANAGEPASSWORD);
    }

    //
    // ─── REDIRECT ───────────────────────────────────────────────────────────────────
    //

    /**
     * Redirects the user to another page
     * 
     * @access private
     * @param {string} url The url of the response
     */
    private successRedirect(url:string){
        if(url.includes("Authorization/LogIn") || url.includes("Authorization/SocialLog")) this.__router.navigate(['']);
        else if(url.includes("User/DeleteAccount")) this.__router.navigate(['']);
        else if(url.includes("Authorization/ResetPassword")) this.__router.navigate(['logIn']);
        else if(url.includes("Group/RemoveGroup")) this.__router.navigate(['']);
        else if(url.includes("Group/LeaveGroup")) this.__router.navigate(['']);
    }
}