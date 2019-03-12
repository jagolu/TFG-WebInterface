import { Component } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-google',
  styleUrls: ['google.component.css'],
  template: `
  <div id="gSignInWrapper">
    <div id="customBtn" class="customGPlusSignIn" (click)="signIn()">
      <span class="icon"></span>
      <span class="buttonText">{{msg}}</span>
    </div>
  </div>`
})


export class GoogleComponent{

  private msg:string = "Log in with Google";
  private user:SocialUser;
  private loggedIn: boolean;

  constructor(private _authS:AuthService, private _authenticationS:AuthenticationService) { 
    this._authS.authState.subscribe( (user)=>{
      this.user = user;
      this.loggedIn  = (user!=null);
      this.msg = (this.loggedIn && user.provider=="GOOGLE") ? `Continue as ${this.user.firstName}` : "Log in with Google";
    });
  }

  signIn(){
    if(!this.loggedIn){
      console.log("google");
      //this._authS.signIn(GoogleLoginProvider.PROVIDER_ID).catch(Error);
      this._authenticationS.setUserFromSocialMedia("Google");
    }
    else console.log("ya estas logueado");
  }
}
