import { Injectable } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user: SocialUser;
  private loggedIn:boolean;
  private baseURL : string = "https://localhost:44360/api/SignUp";

  constructor(private _authS:AuthService, private _http:HttpClient) { }

  isLogged(){
    console.log("asdf")
  }

  signOut(){
    if(this.loggedIn) this._authS.signOut();
    this._authS.authState.subscribe( (user)=>{
      this.user = user;
      this.loggedIn  = (user!=null);
    });
  }

  setUserFromSocialMedia(){
    this._authS.authState.subscribe(user=>{
      console.log(user);
    })
  }

  setUserFromForm(user:any){
    console.log(user.email);
    console.log(user.username);
    console.log(user.password);
    // let bodyRequest = {
    //   "email": user.email,
    //   "username": user.username,
    //   "password": user.password
    // };


    let bodyRequest = {
      "email": "javo123@gmail.com",
      "username": "username",
      "password": "asdfasdf1A"
    };
    this.postRequest(bodyRequest)
      .subscribe( (data)=>{
        console.log(data);
        console.log("caspa");
      } )
  }

  postRequest(body:any){
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
        "Content-Type": "application/json"
      })
    };
    return this._http.post(this.baseURL, body, httpOptions);
  }

  //TODO send data to backend

}
