import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';
import { Icons, IconModel } from 'src/app/models/models';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styles:[
    '.card-title{ font-size: 250%; }'
  ]
})
export class LogInComponent {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The form to log in
   * 
   * @access public
   * @var {FormGroup} logInForm
   */
  public logInForm: FormGroup;

  /**
   * The type of the password input
   * 
   * @access public
   * @var {string} passwordType
   */
  public passwordType: string;

  /**
   * An icon of an eye
   * 
   * @access public
   * @var {IconModel} eye_icon
   */
  public eye_icon:IconModel = Icons.EYE_OPEN_CLOSE;

  
  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {AuthenticationService} _authentication To do the log in request 
   */
  constructor(private _authentication:AuthenticationService) { 
    this.passwordType = "password"
    this.initializeForm();
  }

  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Logs the user in the app
   * 
   * @access public
   */
  public logIn(){
    this._authentication.logIn({
      'email' : this.logInForm.controls['email'].value,
      'password': this.logInForm.controls['password'].value
    }).subscribe(
      _=>{},
      _=> this.resetForm(false)
    );
  }

  /**
   * Changes the password input type
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
    this.logInForm = new FormGroup({
      'email': new FormControl(
        '',
        [
          Validators.required,
          Validators.email
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
      )
    })
  }

  /**
   * Resets the form
   * 
   * @param {Boolean} full True to also resets the
   * email input, false to keep its value.
   */
  private resetForm(full:Boolean){
    this.logInForm.reset({
      'email': full ? "": this.logInForm.controls['email'].value,
      'password': ''
    });
  }
}