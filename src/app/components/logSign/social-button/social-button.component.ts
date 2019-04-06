import { Component } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService, AlertType } from 'src/app/services/alert.service';



@Component({
  selector: 'app-social-button',
  templateUrl: './social-button.component.html',
  styleUrls: ['./social-button.component.css']
})
export class SocialButtonComponent{

  constructor(private _authS:AuthService, 
              private _authenticationS:AuthenticationService,
              private _alert:AlertService) { }

  public socialSignIn(typeS:string){
    let type = typeS == "FACEBOOK" ? SocialType.FACEBOOK : SocialType.GOOGLE
    let providerId = type == SocialType.FACEBOOK ?
      FacebookLoginProvider.PROVIDER_ID : GoogleLoginProvider.PROVIDER_ID;

    this._authS.signIn(providerId).then(user=>{
      
      this._authenticationS.logSocialMedia({
        "authToken": type==SocialType.FACEBOOK ? user.authToken : user.idToken,
        "email": user.email,
        "firstName": user.firstName,
        "id": user.id,
        "socialProvider": type,
        "urlImage":user.photoUrl
      });
    }).catch(_=> this._alert.openAlert(AlertType.SOCIALERROR));
  }
}

export enum SocialType{
  GOOGLE = "GOOGLE",
  FACEBOOK = "FACEBOOK"
}
