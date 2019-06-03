import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/visualServices/alert.service';
import { UserService } from 'src/app/services/restServices/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-delete-account-alert',
  templateUrl: './delete-account-alert.component.html',
  styles: []
})
/**
 * Class for fill the alert with the delete account form
 * 
 * @class
 */
export class DeleteAccountAlertComponent{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The form to delete the account if it's needed
   * 
   * @access public
   * @var {FormGroup} deleteAccountForm
   */
  public deleteAccountForm:FormGroup;

  /**
   * The email of the account which will be deleted
   * 
   * @access private
   * @var {string} email
   */
  private email:string;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {AlertService} _alertS To get the alert info
   * @param {UserService} _userS To do the user requests
   */
  constructor(private _alertS:AlertService, private _userS:UserService) { 
    this.initializeForm();
    this._alertS.target.subscribe(
      target => this.email = target
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
   * Do the request to remove the user account and 
   * close the alert
   * 
   * @access public
   */
  public deleteAccount(){
    // this._alertS.hideAlert();
    this._alertS.hideAlert();
    
    //Bootstrap modal close on form submit. So, I have to
    //show 2 modals, so first hide that and in 0.35 seconds
    //send the petition and show the modal of the response
    setTimeout(this.remove.bind(this), 350);

    //When the alert do the fade out, the user can see the reset of
    // the form, waiting 0.75 seconds the user doesn't see that
    setTimeout(this.resetForm.bind(this), 750);
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Initializes the form to delete the user account
   * 
   * @access private
   */
  private initializeForm(){
    this.deleteAccountForm = new FormGroup({
      'password': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ]
      )
    });
  }

  /**
   * Reset the remove account form to emtpy
   * 
   * @access private
   */
  private resetForm(){
    this.deleteAccountForm.reset({
      'password': ""
    })
  }
  
  /**
   * Do the request to remove the user account
   * 
   * @access private
   */
  private remove(){
    this._userS.deleteUser({
      "email": this.email,
      "password": this.deleteAccountForm.controls["password"].value
    }).subscribe();
  }
}
