import { Injectable } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { LogUser, SignUser, SocialLog } from 'src/app/models/models';
import { RestService } from './rest.service';
import { HttpClient} from '@angular/common/http';
import { LoadingService } from 'src/app/services/visualServices/loading.service';
import { SessionService } from 'src/app/services/userServices/session.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService extends RestService {

  private _authPath : string = "Authorization/";
  private init:boolean = false;

  constructor(_http:HttpClient, 
              _loading:LoadingService, 
              private _authS:AuthService, 
              private _sessionS:SessionService,
              private _router:Router){
    super(_http, _loading);
    this.init = true;
    if(this.IsAuthenticated() && !this.init){
      this.refreshToken().subscribe();
    }
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
    this._authS.signOut().catch(Error);
    this._sessionS.removeSession();
    this._router.navigate(['']);
  }

  logSocialMedia(user:SocialLog){
    this.postRequest(user, this._authPath+"SocialLog").subscribe();
  }

  checkEmailValidation(token:string){
    this.getRequest(this._authPath+"Validate",[
      {
        param: "emailToken",
        value: token
      }
    ]).subscribe();
  }

  signUp(user:SignUser){
    return this.postRequest(user, this._authPath+"SignUp");
  }

  logIn(user:LogUser){
    return this.postRequest(user, this._authPath+"LogIn");
  }

  refreshToken():Observable<any>{
    return this.postRequest({
      "token": this._sessionS.getAPIToken()
    }, this._authPath+"Refresh");
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