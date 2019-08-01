import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';
import { IconModel, Icons } from 'src/app/models/models';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styles:[
    '.card-title{ font-size: 250%; }'
  ]
})
export class SignUpComponent{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The form to sign up
   * 
   * @access public
   * @var {FormGroup} signUpForm
   */
  public signUpForm: FormGroup;

  /**
   * The type of password inputs
   * 
   * @access public
   * @var {string} passwordType
   */
  public passwordType: string;

  /**
   * Says if both password are equal or not
   * 
   * @access public
   * @var {Boolean} passwordsAreEqual
   */
  public passwordsAreEqual: Boolean;

  /**
   * An icon of an eye
   * 
   * @access public
   * @var {IconModel}
   */
  public icon_eye:IconModel = Icons.EYE_OPEN_CLOSE;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {AuthenticationService} __authenticationS To do the
   * sign up request 
   */
  constructor(private __authenticationS:AuthenticationService) {
    this.passwordType = "password"
    this.passwordsAreEqual = false;

    this.initializeForm();
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Do the request to sign up the user
   * 
   * @access public
   */
  public signUp(){ 
    this.__authenticationS.signUp({
      'email' : this.signUpForm.controls['email'].value,
      'username': this.signUpForm.controls['username'].value,
      'password': this.signUpForm.controls['password'].value
    }).subscribe(
      _=> this.resetForm(true),
      _=> this.resetForm(false)
    );
  }

  /**
   * Checks if both passwords are equal and save
   * the result in the passwordAreEqual var
   * 
   * @access public
   */
  public equalPassword(){
    let password = this.signUpForm.controls['password'].value;
    let repeatPassword = this.signUpForm.controls['repeatPassword'].value;
    this.passwordsAreEqual = ((password == repeatPassword) && password.length>0 && repeatPassword.length>0);
  }

  /**
   * Change the type of the password input
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
   * Initializes the form
   * 
   * @access private
   */
  private initializeForm(){
    this.signUpForm = new FormGroup({
      'email': new FormControl(
        '',
        [
          Validators.required,
          Validators.email
        ]
      ),
      'username': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ]
      ),
      'password': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ]
      ),
      'repeatPassword': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ]
      )
    })
  }

  /**
   * Resets the form
   * 
   * 
   * @access private
   * @param {Boolean} full True to also resets the
   * email and username, false to don't reset them
   */
  private resetForm(full:Boolean){
    this.signUpForm.reset({
      'email': full ? "": this.signUpForm.controls['email'].value,
      'username': full ? "": this.signUpForm.controls['username'].value,
      'password': '',
      'repeatPassword': ''
    })
  }
}
