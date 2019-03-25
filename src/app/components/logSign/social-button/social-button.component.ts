import { Component, OnInit } from '@angular/core';
import { SocialUser, AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { AuthenticationService } from 'src/app/services/authentication.service';



@Component({
  selector: 'app-social-button',
  templateUrl: './social-button.component.html',
  styleUrls: ['./social-button.component.css']
})
export class SocialButtonComponent implements OnInit{

  private user:SocialUser;
  private loggedIn:boolean;

  constructor(private _authS:AuthService, private _authenticationS:AuthenticationService) { }

  ngOnInit(){
    // this._authS.signOut().catch(Error);
  }

  private socialSignIn(type:SocialType){
    let providerId = type == SocialType.FACEBOOK ?
      FacebookLoginProvider.PROVIDER_ID : GoogleLoginProvider.PROVIDER_ID;

    this._authS.signIn(providerId).then(user=>{
      
      this._authenticationS.logSocialMedia({
        "authToken": type==SocialType.FACEBOOK ? user.authToken : user.idToken,
        "email": user.email,
        "firstName": user.firstName,
        "id": user.id,
        "socialProvider": type 
      }).subscribe()
    }).catch(Error=>{
      //TODO launch alert
      console.log("catchError",Error);
    });
  }
}

export enum SocialType{
  GOOGLE = "GOOGLE",
  FACEBOOK = "FACEBOOK"
}
