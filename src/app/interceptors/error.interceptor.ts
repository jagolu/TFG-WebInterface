import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, 
        HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable, Subject, observable, EMPTY } from 'rxjs';
import { tap, switchMap, catchError, filter, take, finalize } from 'rxjs/operators';
import { AlertService, AlertType } from '../services/alert.service';
import { LoadingService } from '../services/loading.service';
import { SessionService } from '../services/session.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {



    constructor(private alert:AlertService, private loading:LoadingService,
                private _router:Router, private _sessionS:SessionService,
                private _authS:AuthenticationService) { }

    intercept( req: HttpRequest<any>, next: HttpHandler ):Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(err=>{
                if(err instanceof HttpErrorResponse){
                        this.loading.stopLoading();
                        this.showErrorAlert(err);
                        this.errRedirect(req.url);
                        return Observable.throw(err);
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
    }

/*------------------------------------ REDIRECT------------------------------ */
    
    private errRedirect(url:string){
        if(url.includes("Authorization/Validate")) this._router.navigate(['']);
        if(url.includes("Authorization/Refresh")) this._router.navigate(['logIn']);
    }
}