import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { IconModel, Icons, SocialType } from 'src/app/models/models';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { AlertService } from 'src/app/services/visualServices/alert.service';

@Component({
  selector: 'app-social-sign-password',
  templateUrl: './social-sign-password.component.html',
  styles: []
})
/**
 * Class to fill the alert with a form to ask
 * a password to a new social user
 * 
 * @class
 */
export class SocialSignPasswordComponent{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The form to set the new password
   * 
   * @access public
   * @var {FormGroup} socialPasswordForm
   */
  public socialPasswordForm:FormGroup;

  /**
   * Check if both passwords are equal
   * 
   * @access public
   * @var {boolean} equalPasswords
   */
  public equalPasswords:boolean;

  /**
   * The type of the password input. To show
   * the real letters of the dots
   * 
   * @access public
   * @var {string} passwordType
   */
  public passwordType: string;

  /**
   * The type of socialLog (Facebook or Google)
   * 
   * @access public
   * @var {string} providerId
   */
  public providerId: string;

  /**
   * The Eye icon
   * 
   * @access public
   * @var {IconModel} icon_eye
   */
  public icon_eye:IconModel = Icons.EYE_OPEN_CLOSE;

  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {AuthenticationService} _authenticationS To do the request to set the password 
   * @param {AuthService} _authS To do the request to Google or Facebook
   * @param {AlertService} _alertS To get the data to rightly do the alert
   */
  constructor(private _authenticationS:AuthenticationService, private _authS:AuthService, private _alertS:AlertService) { 
      this.equalPasswords = false;
      this.passwordType = "password"
      this.initializeForm();
      this._alertS.target.subscribe(
        target => this.providerId = target
      );
      this._alertS.reset.subscribe(
        reset=>{ if(reset) this.resetForm(); }
      );
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Do the request to ask to the social user
   * a password 
   * 
   * @access public
   */
  public setPassword(){
    this._alertS.hideAlert();
    
    //Bootstrap modal close on form submit. So, I have to
    //show 2 modals, so first hide that and in 0.35 seconds
    //send the petition and show the modal of the response
    setTimeout(this.setPasswordRequest.bind(this), 350);

    //When the alert do the fade out, the user can see the reset of
    // the form, waiting 0.75 seconds the user doesn't see that
    setTimeout(this.resetForm.bind(this), 750);
  }

  /**
   * Check if both password are equals and set 
   * this value on the equalPasswords var
   * 
   * @access public
   */
  public equalPassword(){
    let password = this.socialPasswordForm.controls['password'].value ;
    let repeatPassword = this.socialPasswordForm.controls['repeatPassword'].value;
    this.equalPasswords = ((password == repeatPassword) && password.length>0 && repeatPassword.length>0);
  }

  /**
   * Change the input type from password to text
   * and from text to password
   * 
   * @access public
   */
  public watchPassword(){
    this.passwordType = this.passwordType == "password" ? "text" : "password";
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Do the request to set the new password 
   * 
   * @access private
   */
  private setPasswordRequest(){
    let pass = this.socialPasswordForm.controls["password"].value;
    let type = this.providerId == "FACEBOOK" ? SocialType.FACEBOOK : SocialType.GOOGLE
    let providerId = type == SocialType.FACEBOOK ?
      FacebookLoginProvider.PROVIDER_ID : GoogleLoginProvider.PROVIDER_ID;
    this._authS.signIn(providerId).then(user=>{
      
      this._authenticationS.logSocialMedia({
        "authToken": type==SocialType.FACEBOOK ? user.authToken : user.idToken,
        "email": user.email,
        "firstName": user.firstName,
        "id": user.id,
        "socialProvider": type,
        "urlImage":user.photoUrl,
        "password": pass
      });
    });
  }
  
  /**
   * Initialize the form
   * 
   * @access private
   */
  private initializeForm(){
    let passValidators = [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
    ];

    this.socialPasswordForm = new FormGroup({
      'password' : new FormControl('', passValidators),
      'repeatPassword' : new FormControl('', passValidators)
    });
  }

  /**
   * Resets the form
   * 
   * @access private
   */
  private resetForm(){
    this.socialPasswordForm.reset({
      'password' : "",
      'repeatPassword' : ""
    });
  }
}
