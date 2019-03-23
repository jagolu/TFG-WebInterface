import { Injectable } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { LogUser, SignUser } from 'src/app/models/models';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private _baseURL : string = "https://localhost:5001/";
  private _user: SocialUser;
  private _authPath : string = "Authorization/";
  private loggedIn:boolean;

  
  constructor(private _authS:AuthService, private _http:HttpClient,
              private loading:LoadingService) { }

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

  /*----------------------------------PRIVATE FUNCTIONS-------------------------------------*/

  private postRequest(body:any, path:string){
    this.loading.startLoading();
    return this._http.post(this._baseURL+path, body, {
      headers: this.basicHeaders()
    });
  }

  private getRequest(path:string, params?:paramValue[]){
    this.loading.startLoading();
    let options = params ? {
      params: this.params(params),
      headers:this.basicHeaders()
    } : {headers:this.basicHeaders()};

    return this._http.get(this._baseURL+path,options);
  }

  private params(params:paramValue[]):HttpParams{
    let urlParams : HttpParams = new HttpParams();
    params.forEach(param => {
      urlParams = urlParams.append(param.param, param.value);
    });
    return urlParams;
  }

  private basicHeaders(){
    return new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
        "Content-Type": "application/json"
      })
    ;
  }
}

interface paramValue{
  param:string;
  value:string;
}




