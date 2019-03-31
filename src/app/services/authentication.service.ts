import { Injectable } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { LogUser, SignUser, SocialLog } from 'src/app/models/models';
import { RestService } from './rest.service';
import { HttpClient} from '@angular/common/http';
import { LoadingService } from './loading.service';
import { SessionService } from './session.service';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService extends RestService {

  private _authPath : string = "Authorization/";

  constructor(_http:HttpClient, _loading:LoadingService, 
              private _authS:AuthService, private _sessionS:SessionService){
    super(_http, _loading);
  }

  IsAuthenticated():Boolean{
    try{
      if(this._sessionS.getExpiresAt() <= this.getUTCNow()) {
        this._sessionS.removeSession();
        return false;
      }
      return true;
    }catch(Exception){
      return false;
    }
  }

  logOut(){
    this.getRequest(this._authPath+"LogOut").subscribe();
    this._authS.signOut().catch(Error);
    this._sessionS.removeSession();
  }

  logSocialMedia(user:SocialLog){
    return this.postRequest(user, this._authPath+"SocialLog");
  }

  checkEmailValidation(token:string){
    return this.getRequest(this._authPath+"Validate",[
      {
        param: "emailToken",
        value: token
      }
    ]);
  }

  signUp(user:SignUser){
    return this.postRequest(user, this._authPath+"SignUp");
  }

  logIn(user:LogUser){
    return this.postRequest(user, this._authPath+"LogIn");
  }

  private getUTCNow():number{
    return Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate(),
      new Date().getUTCHours(),
      new Date().getUTCMinutes()
    );
  }
}