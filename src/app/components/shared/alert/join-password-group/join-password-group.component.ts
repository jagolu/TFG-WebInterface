import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/services/visualServices/alert.service';
import { GroupService } from 'src/app/services/restServices/group.service';

@Component({
  selector: 'app-join-password-group',
  templateUrl: './join-password-group.component.html',
  styles: []
})
/**
 * Class to fill the alert with the join form
 * 
 * @class
 */
export class JoinPasswordGroupComponent{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The form to join the group if it's needed
   * 
   * @access public
   * @var {FormGroup} joinGroupForm
   */
  public joinGroupForm:FormGroup;

  /**
   * The filter to know if it's needed to show the password form
   * 
   * @access public
   * @var {Boolean} hasPassword
   */
  public hasPassword:Boolean;

  /**
   * The name of the group to join in
   * 
   * @access private
   * @var {string} groupName
   */
  private groupName:string;


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
  constructor(private _alertS:AlertService, private _groupS:GroupService) { 
    this._alertS.needForm.subscribe(needPassword=>{
      this.initializeForm();
      this.hasPassword = needPassword;
    });
    this._alertS.target.subscribe(
      target => this.groupName = target
    );
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Do the request to join in the group and close
   * the alert
   * 
   * @access public
   */
  public joinGroup(){
    this._alertS.hideAlert();
    
    //Bootstrap modal close on form submit. So, I have to
    //show 2 modals, so first hide that and in 0.35 seconds
    //send the petition and show the modal of the response
    setTimeout(this.join.bind(this), 350);
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Initializes the form to join the group
   * 
   * @access private
   */
  private initializeForm(){
    this.joinGroupForm = new FormGroup({
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
   * Do the request to remove the user account
   * 
   * @access private
   */
  private join(){
    this._groupS.joinGroup({
      "groupName": this.groupName,
      "password": this.joinGroupForm.controls["password"].value
    });
  }
}
