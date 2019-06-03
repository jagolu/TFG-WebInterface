import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';
import { IconModel, Icons } from 'src/app/models/models';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styles:[
    '.card-title{ font-size: 250%; }'
  ]
})
/**
 * Class to show the form to set a new password
 * 
 * @class
 */
export class ResetPasswordFormComponent implements AfterViewInit {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The password token
   * 
   * @access private
   * @var {string} token
   */
  private token:string;
  
  /**
   * The form to set the new password
   * 
   * @access public
   * @var {FormGroup} changePasswordForm
   */
  public changePasswordForm:FormGroup;

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
   * @param {ActivatedRoute} aR To get the value of the token from the url 
   * @param {AuthenticationService} _authS To do the request to set the new password 
   */
  constructor(private aR:ActivatedRoute, private _authS:AuthenticationService) { 
      this.token = this.aR.snapshot.paramMap.get('token');
      this.equalPasswords = false;
      this.passwordType = "password"
      this.initializeForm();
  }

  /**
   * @ngAfterViewInit
   */
  ngAfterViewInit() {
    this._authS.checkPasswordToken(this.token);
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Do the request to set the new password 
   * 
   * @access public
   */
  public resetPassword(){
    let password = this.changePasswordForm.controls['password'].value ;
    this._authS.resetPassword({
      "tokenPassword": this.token,
      "password": password
    });
    this.resetForm();
  }

  /**
   * Check if both password are equals and set 
   * this value on the equalPasswords var
   * 
   * @access public
   */
  public equalPassword(){
    let password = this.changePasswordForm.controls['password'].value ;
    let repeatPassword = this.changePasswordForm.controls['repeatPassword'].value;
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

    this.changePasswordForm = new FormGroup({
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
    this.changePasswordForm.reset({
      'password' : "",
      'repeatPassword' : ""
    });
  }
}
