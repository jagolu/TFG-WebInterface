import { Component, Input, OnInit } from '@angular/core';
import { SocialUser, AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-social-button',
  templateUrl: './social-button.component.html',
  styleUrls: ['./social-button.component.css']
})
export class SocialButtonComponent implements OnInit{

  @Input() superId:string;

  private googleMsg:string = "Log in with Google";
  private facebookMsg:string = "Log in with Facebook";
  private user:SocialUser;
  private loggedIn:boolean;

  constructor(private _authS:AuthService, private _authenticationS:AuthenticationService) { }

  ngOnInit(){
    this.sign();
  }

  private socialSignIn(type:SocialType){
    if(!this.loggedIn){
      let providerId = type == SocialType.FACEBOOK ?
        FacebookLoginProvider.PROVIDER_ID : GoogleLoginProvider.PROVIDER_ID;

      this._authS.signIn(providerId).then(user=>{
        
        this._authenticationS.logSocialMedia({
          "authToken": type==SocialType.FACEBOOK ? user.authToken : user.idToken,
          "email": user.email,
          "firstName": user.firstName,
          "id": user.id,
          "socialProvider": type 
        }).subscribe(
          ok=>console.log(ok),
          err=>console.log(err)
        )
      }).catch(Error=>{
        //TODO launch alert
        console.log(Error);
      })
    }
  }

  private sign(){
    this._authS.authState.subscribe( user=>{
      console.log(user);
      this.user = user;
      this.loggedIn = (user!=null);
      this.googleMsg = (this.loggedIn && user.provider=="GOOGLE") ?
      `Continue as ${this.user.firstName}` : `Log in with Google`;
      this.facebookMsg = (this.loggedIn && user.provider=="FACEBOOK") ?
      `Continue as ${this.user.firstName}` : `Log in with Facebook`;
    });
  }
}

export enum SocialType{
  GOOGLE = "GOOGLE",
  FACEBOOK = "FACEBOOK"
}
