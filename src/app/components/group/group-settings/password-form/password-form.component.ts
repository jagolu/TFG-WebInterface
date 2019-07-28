import { Component, OnInit } from '@angular/core';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroupService } from 'src/app/services/restServices/group.service';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styles: []
})
export class PasswordFormComponent implements OnInit {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The form to set a new passsword
   * 
   * @access public
   * @var {FormGroup} setFirstPasswordForm
   */
  public setFirstPasswordForm:FormGroup;

  /**
   * The form to remove the group password
   * 
   * @access public
   * @var {FormGroup} removePasswordForm
   */
  public removePasswordForm:FormGroup;

  /**
   * The form to change the group password
   * 
   * @access public
   * @var {FormGroup} rePasswordForm
   */
  public rePasswordForm:FormGroup;

  /**
   * Says if the group has password
   * or not
   * 
   * @access public
   * @var {Boolean} hasPassword
   */
  public hasPassword:Boolean;

  /**
   * Says if both password (in each form) 
   * are equals
   * 
   * @access public
   * @var {Boolean} equalPasswords
   */
  public equalPasswords:Boolean;

  /**
   * The name of the group
   * 
   * @access private
   * @var {string} _groupName
   */
  private _groupName:string;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {GroupInfoService} __groupInfoS To get the info of the group
   * @param {GroupService} __groupS To do the group requests
   */
  constructor(private __groupInfoS:GroupInfoService, private __groupS:GroupService) { 
    this.equalPasswords = false;
    this.initializeForm();
  }

  /**
   * Gets the group info
   * 
   * @OnInit
   */
  ngOnInit() {
    this.__groupInfoS.info.subscribe(page=>{
      try{
        this.hasPassword = page.hasPassword;
        this._groupName = page.name;
      }catch(Error){
        this.hasPassword = false;
      }
    });
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Set a new password to a group
   * when the group has no password
   * 
   * @access public
   */
  public setFirstPassword(){
    let newPass = this.setFirstPasswordForm.controls["newPassword"].value;
    this.setPassword(newPass, null);
    this.resetForm();
  }

  /**
   * Changes the password of the group
   * 
   * @access public
   */
  public changePassword(){
    let newPass = this.rePasswordForm.controls["newPassword"].value;
    let oldPass = this.rePasswordForm.controls["oldPassword"].value;
    this.setPassword(newPass, oldPass);
    this.resetForm();
  }

  /**
   * Removes the password of the group
   * 
   * @access public
   */
  public removePassword(){
    let oldPass = this.removePasswordForm.controls["oldPassword"].value;
    this.setPassword(null, oldPass);
    this.resetForm();
  }

  /**
   * Says if both password are equals
   * 
   * @access public
   */
  public equalPassword(){
    let password = !this.hasPassword ? this.setFirstPasswordForm.controls['newPassword'].value : 
                                        this.rePasswordForm.controls['newPassword'].value;
    let repeatPassword = !this.hasPassword ? this.setFirstPasswordForm.controls['repeatPassword'].value : 
                                              this.rePasswordForm.controls['repeatPassword'].value;
    this.equalPasswords = ((password == repeatPassword) && password.length>0 && repeatPassword.length>0);
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Do the request to change the group password
   * 
   * @access private
   * @param {string} newPassword The new password of the group
   * @param {string} oldPassword The old password of the group (null
   * if the group has no password)
   */
  private setPassword(newPassword:string, oldPassword?:string){
    this.__groupS.managePassword({
      "name": this._groupName,
      "newPassword": newPassword,
      "oldPassword": oldPassword
    });
  }

  /**
   * Initializes all the forms
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

    this.setFirstPasswordForm = new FormGroup({
      'newPassword' : new FormControl('', passValidators),
      'repeatPassword' : new FormControl('', passValidators)
    });

    this.removePasswordForm = new FormGroup({
      "oldPassword": new FormControl('', passValidators)
    });

    this.rePasswordForm = new FormGroup({
      'oldPassword': new FormControl('', passValidators),
      'newPassword' : new FormControl('', passValidators),
      'repeatPassword' : new FormControl('', passValidators)
    });
  }

  /**
   * Resets all the forms
   * 
   * @access private
   */
  private resetForm(){
    this.setFirstPasswordForm.reset({
      'newPassword' : "",
      'repeatPassword' : ""
    });

    this.removePasswordForm.reset({
      "oldPassword": ""
    });

    this.rePasswordForm.reset({
      'oldPassword': "",
      'newPassword' : "",
      'repeatPassword' : ""
    });
  }
}
