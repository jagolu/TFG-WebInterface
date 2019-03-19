import { Injectable } from '@angular/core';
import { AuthService, SocialUser, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private _baseURL : string = "https://localhost:44360/api/";
  private _user: SocialUser;

  private _accessToken: string;
  private loggedIn:boolean;

  constructor(private _authS:AuthService, private _http:HttpClient) { }

  isLogged(){
    console.log("asdf");
  }

  signOut(){
    if(this.loggedIn) this._authS.signOut();
    this._authS.authState.subscribe( (user)=>{
      this._user = user;
      this.loggedIn  = (user!=null);
    });
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

  signUp(user:User){
    return this.postRequest({
      "email": user.email,
      "username": user.username,
      "password": user.password
    }, "SignUp");
  }

  /*----------------------------------PRIVATE FUNCTIONS-------------------------------------*/
  private postRequest(body:any, path:string){
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

// export enum SocialType {
//   GOOGLE = "GOOGLE",
//   FACEBOOK = "FACEBOOK"
// }

interface User{
  "email": string,
  "username": string,
  "password": string
}
