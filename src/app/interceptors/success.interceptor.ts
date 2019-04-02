import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, 
        HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertService, AlertType } from '../services/alert.service';
import { LoadingService } from '../services/loading.service';
import { SessionService } from '../services/session.service';

@Injectable()
export class SuccessInterceptor implements HttpInterceptor {

    constructor(private alert:AlertService, private loading:LoadingService,
                private _router:Router, private _sessionS:SessionService) { }

    intercept( req: HttpRequest<any>, next: HttpHandler ):Observable<HttpEvent<any>> {
        return next.handle(req).pipe(tap(
            (ok)=>{
                if(ok instanceof HttpResponse && !req.url.includes("Refresh")) {
                    this.showSuccessAlert(req.url);
                    this.loading.stopLoading();
                    this.handleAuthentication(ok);
                    this.successRedirect(ok.url);
                }
            }
        ));
    }

/*----------------------------AUTHENTICATION------------------------------- */

    private handleAuthentication(request:any){
        if(request.body != null && request.body.api_token!=null){
            this._sessionS.setSession({
                "api_token": request.body.api_token,
                "role": request.body.role
            });
        }
    }

/*-----------------------------------------ALERTS----------------------------------- */

    private showSuccessAlert(url:string){
        if(url.includes("Authorization/SignUp")) this.alert.openAlert(AlertType.VERIFICATIONSENT);
    }

/*------------------------------------ REDIRECT------------------------------ */
    
    private successRedirect(url:string){
        if(url.includes("Authorization/LogIn") || url.includes("Authorization/SocialLog")) this._router.navigate(['']);
        if(url.includes("ChangeUserInfo")) window.location.reload();
    }
}