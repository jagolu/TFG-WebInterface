import { Injectable } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { LogUser, SignUser, SocialLog } from 'src/app/models/models';
import { RestService } from './rest.service';
import { HttpClient} from '@angular/common/http';
import { LoadingService } from './loading.service';
import { SessionStorage } from '../models/SessionStorage';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService extends RestService {

  private _authPath : string = "Authorization/";

  constructor(_http:HttpClient, _loading:LoadingService, private _authS:AuthService){
    super(_http, _loading);
  }

  IsAuthenticated():Boolean{
    try{
      let session = JSON.parse(sessionStorage.getItem("session"));
      if(session.expires_at <= this.getUTCNow()) {this.removeSession();
        return false;
      }
      return true;
    }catch(Exception){
      return false;
    }
    // let session = JSON.parse(sessionStorage.getItem("session"));
    // if(session.expires_at <= this.getUTCNow()) {
    //   this.removeSession();
    //   return false;
    // }
    // return true;
  }

  logOut(){
    return this.getRequest(this._authPath+"LogOut");
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

  /* ----------------session functions------------------- */
  setSession(user: SessionStorage){
    sessionStorage.setItem("session", JSON.stringify({
      "api_token":user.api_token,
      "email":user.email,
      "nickname":user.nickname,
      //"role":user.role,
      "image_url":user.image_url,
      "expires_at": this.getUTCFromNow20Min()
    }));
  }

  removeSession(){
    sessionStorage.removeItem("session");
  }

  getAPIToken(){
    let session = JSON.parse(sessionStorage.getItem("session"));
    return session.api_token;
  }


/*---------------UTC TIME FUNCTIONS------------------- */
  private getUTCNow():number{
    return Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate(),
      new Date().getUTCHours(),
      new Date().getUTCMinutes()
    );
  }

  private getUTCFromNow20Min():number{
    return Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate(),
      new Date().getUTCHours(),
      new Date().getUTCMinutes()+20
    );
  }
}