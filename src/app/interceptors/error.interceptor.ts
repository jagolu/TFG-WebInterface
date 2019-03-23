import { Injectable } from '@angular/core';
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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private alert:AlertService, private loading:LoadingService) { }

    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
    ):Observable<HttpEvent<any>> {

        return next.handle(req).pipe(tap(
            (ok)=>{ if(ok instanceof HttpResponse) {
                console.log("url1",req.url)
                if(req.url.includes("SignUp")) this.alert.openAlert(AlertType.VERIFICATIONSENT);
                this.loading.stopLoading();
                
                // if(!ok.body.token){

                // }
                // else{
                //     this.setToken(ok.body.token);
                // }
            }},
            (err:HttpErrorResponse)=>{
                this.handleError(err);
                this.loading.stopLoading();
            }
        ));
    }

    
    private setToken(token:string){
        localStorage.setItem("token", token);
    }

    private getToken():string{
        return localStorage.getItem("token");
    }

    private handleError(err:HttpErrorResponse){
        if(err.status == 400 &&  err.error["error"] == "EmailAlreadyExistsError"){
            this.alert.openAlert(AlertType.EMAILTAKENERROR);
        }
        if(err.status == 400 &&  err.error["error"] == "WrongEmailOrPassword"){
            this.alert.openAlert(AlertType.WRONGEMAILORPASSWORD);
        }
        if(err.status == 400 &&  err.error["error"] == "NotValidatedYet"){
            this.alert.openAlert(AlertType.NOTVALIDATEDYET);
        }
        if(err.status == 400 && (err.error['email'] || err.error['password'] || err.error['username'] )) {
            this.alert.openAlert(AlertType.VALIDATINGUSERERROR);
        }
        if(err.status == 500) this.alert.openAlert(AlertType.SERVERERROR);
        if(err.status == 0) this.alert.openAlert(AlertType.LOSTCONNECTIONERROR);
    }
}