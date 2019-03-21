import { Injectable } from '@angular/core';
import { AuthService, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user: SocialUser;
  private loggedIn:boolean;
  private baseURL : string = "https://localhost:44360/api/";

  constructor(private _authS:AuthService, private _http:HttpClient) { }

  isLogged(){
    console.log("asdf");
  }

  signOut(){
    if(this.loggedIn) this._authS.signOut();
    this._authS.authState.subscribe( (user)=>{
      this.user = user;
      this.loggedIn  = (user!=null);
    });
  }

  setUserFromSocialMedia(type:string){
    this._authS.signIn(GoogleLoginProvider.PROVIDER_ID).then(user=>{
      let bodyRequest = {
        "email": user.email,
        "username": user.firstName,
        "password": null
      }
      //TODO ver que pasa aqui y ver que cuando se de el OK redirigir YA LOGUEADO al index
      return this.postRequest(bodyRequest, "SignUp");

    }).catch(Error);
  }

  setUserFromForm(user:any){
    let bodyRequest = {
      "email": user.email,
      "username": user.username,
      "password": user.password
    };
    return this.postRequest(bodyRequest, "SignUp");
  }

  checkEmailValidation(token:string){
    let bodyRequest = {
      "token": token
    }
    return this.postRequest(bodyRequest, "EmailVerification");
  }

  postRequest(body:any, path:string){
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
        "Content-Type": "application/json"
      })
    };
    return this._http.post(this.baseURL+path, body, httpOptions);
  }
}
