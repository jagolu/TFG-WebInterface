import { Component } from '@angular/core';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { AuthenticationService } from 'src/app/services/authentication.service';



@Component({
  selector: 'app-facebook',
  template: `
  <div id="gSignInWrapper">
    <div id="customBtn" class="customGPlusSignIn" (click)="signIn()">
      <span class="icon"></span>
      <span class="buttonText" [textContent]="msg"></span>
    </div>
  </div>`,
  styleUrls: ['facebook.component.css']
})

export class FacebookComponent{

  private msg:string = "Log in with Facebook";
  private user:SocialUser;
  private loggedIn: boolean;

  constructor(private _authS:AuthService, private _authenticationS:AuthenticationService) { 
    this._authS.authState.subscribe(user=>{
      this.user = user;
      this.loggedIn  = (user!=null);
      this.msg = (this.loggedIn && user.provider=="FACEBOOK") ? 
             `Continue as ${this.user.firstName}` : "Log in with Facebook";
    })
  }

  signIn(){    
    if(!this.loggedIn){
      this._authS.signIn(FacebookLoginProvider.PROVIDER_ID).catch(Error);
      this._authenticationS.setUserFromSocialMedia();
    }
    else console.log("Ya estas logueado");
  }

}
