import { Injectable } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { LogUser, SignUser, SocialLog } from 'src/app/models/models';
import { RestService } from './rest.service';
import { HttpClient} from '@angular/common/http';
import { LoadingService } from './loading.service';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService extends RestService {

  private _authPath : string = "Authorization/";
  private _logged:boolean;

  constructor(_http:HttpClient, _loading:LoadingService, private _authS:AuthService){
    super(_http, _loading);
    this._logged = false;
    //TODO Check if the user is already logged
  }

  
  isAuthenticated():boolean{
    return this._logged;
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

  setLoggedOut(){
    this._authS.signOut().catch(Error);
    this._logged = false;
  }

  setLogged(){
    this._logged = true;
  }
}