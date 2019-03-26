import { Injectable } from '@angular/core';
import {
    HttpEvent, 
    HttpInterceptor, 
    HttpHandler, 
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    constructor() { }
    
    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
    ):Observable<HttpEvent<any>> {
       
        let url = req.url.toString();
        let updateReq = req.clone();


        if(!url.includes("LogIn") && !url.includes("SignUp") && !url.includes("Validate")){
            updateReq = req.clone({
                headers: req.headers.set('Authorization', "Bearer "+this.getToken())
            })
        }

        return next.handle(updateReq);
    }

    
    private setToken(token:string){
        localStorage.setItem("token", token);
    }

    private getToken():string{
        return localStorage.getItem("token");
    }
}