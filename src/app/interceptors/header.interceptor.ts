import { Injectable } from '@angular/core';
import {
    HttpEvent, 
    HttpInterceptor, 
    HttpHandler, 
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../services/userServices/session.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    //
    // ──────────────────────────────────────────────────────────────────────────
    //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //

    /**
     * @constructor
     * @param {SessionService} __session To get the session token
     */
    constructor(private __session:SessionService) { }


    //
    // ──────────────────────────────────────────────────────────────────────────────────
    //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────────
    //

    /**
     * Add the auth token to every outcoming http request
     * 
     * @access public
     * @param {HttpRequest<any>} req The outcoming request
     * @param {HttpHandler} next The http handler
     */
    public intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
        let url = req.url.toString();
        let updateReq = req.clone();

        if(!this.requireToken(url)){
            updateReq = req.clone({
                headers: req.headers.set('Authorization', "Bearer "+this.__session.getAPIToken())
            });
        }

        return next.handle(updateReq);
    }


    //
    // ────────────────────────────────────────────────────────────────────────────────────
    //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────────────
    //

    /**
     * Says if the request need the to add the api token or not
     * 
     * @access private
     * @param {string} url The url of the request
     */    
    private requireToken(url:string):Boolean{
        let neededAuthUrl = [
            "LogIn", 
            "SignUp",
            "Validate",
            "SocialLog",
            "CheckGroupName"
        ];
        
        return neededAuthUrl.some(subPath=>
            url.includes(subPath)
        );
    }
}