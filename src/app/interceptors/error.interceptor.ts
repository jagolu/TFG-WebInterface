import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpEvent, 
    HttpInterceptor, 
    HttpHandler, 
    HttpRequest, 
    HttpResponse, 
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertService, AlertType } from '../services/alert.service';
import { LoadingService } from '../services/loading.service';
import { SessionService } from '../services/session.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private alert:AlertService, 
                private loading:LoadingService,
                private _router:Router,
                private _sessionS:SessionService) { }

    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
    ):Observable<HttpEvent<any>> {
        return next.handle(req).pipe(tap(
            (ok)=>{ 
                if(ok instanceof HttpResponse) {
                    this.showSuccessAlert(req.url);
                    this.loading.stopLoading();
                    this.handleAuthentication(ok);
                    this.successRedirect(ok.url);
                }
            },
            (err:HttpErrorResponse)=>{
                this.errRedirect(req.url);
                this.showErrorAlert(err);
                this.loading.stopLoading();
            }
        ));
    }

/*----------------------------AUTHNETICATION------------------------------- */

    private handleAuthentication(ok:any){
        if(ok.body != null && ok.body.api_token!=null){
            this._sessionS.setSession({
                "api_token": ok.body.api_token,
                "role": ok.body.role
            });
        }
        if(ok.url.includes("Authorization/LogOut")) {
            this._sessionS.removeSession();
        }
    }

/*-----------------------------------------ALERTS----------------------------------- */

    private showSuccessAlert(url:string){
        if(url.includes("Authorization/SignUp")) this.alert.openAlert(AlertType.VERIFICATIONSENT);
    }

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
    }

/*------------------------------------ REDIRECT------------------------------ */
    
    private successRedirect(url:string){
        if(url.includes("Authorization/LogIn") || url.includes("Authorization/SocialLog")) this._router.navigate(['']);
        if(url.includes("ChangeUserInfo")) window.location.reload();
    }


    private errRedirect(url:string){
        if(url.includes("Authorization/Validate")) this._router.navigate(['']);
        if(url.includes("Authorization/Refresh")) this._router.navigate(['logIn']);
    }
}