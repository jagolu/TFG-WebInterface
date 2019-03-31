import { Injectable } from '@angular/core';
import {
    HttpEvent, 
    HttpInterceptor, 
    HttpHandler, 
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    constructor(private _authS:AuthenticationService) { }
    
    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
    ):Observable<HttpEvent<any>> {
       
        let url = req.url.toString();
        let updateReq = req.clone();


        if(!this.requireToken(url)){
            updateReq = req.clone({
                headers: req.headers.set('Authorization', "Bearer "+this._authS.getAPIToken())
            })
        }

        return next.handle(updateReq);
    }

    requireToken(url:string):Boolean{
        let neededAuthUrl = [
            "LogIn", 
            "SignUp",
            "Validate",
            "SocialLog"
        ];
        
        return neededAuthUrl.some(subPath=>
            url.includes(subPath)
        );
    }
}