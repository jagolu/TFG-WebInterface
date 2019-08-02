import { Component, Input } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider, AuthService } from 'angularx-social-login';
import { AlertService } from 'src/app/services/visualServices/alert.service';
import { AlertInfoType, SocialType } from 'src/app/models/models';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';


@Component({
  selector: 'app-social-button',
  templateUrl: './social-button.component.html',
  styleUrls: ['./social-button.component.css']
})
/**
 * Class to show the Google & Facebook buttons
 * and log/sign with them
 * 
 * @class
 */
export class SocialButtonComponent{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * To know if is a button to signup or login
   * 
   * @access public
   * @var {Boolean} log
   */
  @Input() log:Boolean = false;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {AlertService} __alert To launch the social password alert if it is necessary
   * @param {AuthenticationService} __authenticationS To do the request to set the password 
   * @param {AuthService} __authS To do the request to Google or Facebook
   */
  constructor(private __alert:AlertService,
        private __authS:AuthService, private __authenticationS:AuthenticationService) { }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Log or sign a user with Google or Facebook
   * 
   * @param {string} typeS The type of log/sign (Google or Facebook) 
   */
  public socialSignIn(typeS:string){
    let type = typeS == "FACEBOOK" ? SocialType.FACEBOOK : SocialType.GOOGLE
    let providerId = type == SocialType.FACEBOOK ?
      FacebookLoginProvider.PROVIDER_ID : GoogleLoginProvider.PROVIDER_ID;
      
    if(!this.log){
      this.__alert.socialPasswordForm(providerId);
    }
    else{
      this.__authS.signIn(providerId).then(user=>{
      
        this.__authenticationS.logSocialMedia({
          "authToken": type==SocialType.FACEBOOK ? user.authToken : user.idToken,
          "email": user.email,
          "firstName": user.firstName,
          "id": user.id,
          "socialProvider": type,
          "urlImage":user.photoUrl,
          "password": null
        });
      }).catch(_=> this.__alert.openAlertInfo(AlertInfoType.SOCIALERROR));
    }
  }
}