import { Injectable } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { AlertType, AlertService } from './alert.service';
import { throwError } from 'rxjs';
import { LoadingService } from './loading.service';



@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private _baseURL : string = "https://localhost:44360/api/";
  private _user: SocialUser;

  private loggedIn:boolean;

  constructor(private _authS:AuthService, private _http:HttpClient,
              private loading:LoadingService, private alert:AlertService) { }

  isLogged(){
    //TODO implement this
  }



  signOut(){
    if(this.loggedIn) this._authS.signOut();
    this._authS.authState.subscribe( (user)=>{
      this._user = user;
      this.loggedIn  = (user!=null);
    });
    //TODO send request to unsign
  }

  logSocialMedia(providerId:any){
    this._authS.signIn(providerId).then(user=>{
      let bodyRequest = {
        "email": user.email,
        "username": user.firstName,
        "password": null
        
      }
      console.log(bodyRequest)
      //TODO ver que pasa aqui y ver que cuando se de el OK redirigir YA LOGUEADO al index
      // return this.postRequest({bodyRequest}, "SignUp");
    }).catch(Error);
  }

  checkEmailValidation(token:string){
    return this.postRequest({"token": token}, "EmailVerification");
  }

  signUp(user:UserSign){
    return this.postRequest({
      "email": user.email,
      "username": user.username,
      "password": user.password
    }, "Authentication/SignUp");
  }

  logIn(user:UserLog){
    return this.postRequest({
      "email": user.email,
      "password": user.password
    }, "Authentication/LogIn");
  }

  /*----------------------------------PRIVATE FUNCTIONS-------------------------------------*/

  private postRequest(body:any, path:string){
    this.loading.startLoading();
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
        "Content-Type": "application/json"
      })
    };
    return this._http.post(this._baseURL+path, body, httpOptions);
  }
}

export interface UserSign{
  "email": string,
  "username": string,
  "password": string
}

export interface UserLog{
  "email": string,
  "password": string
}
