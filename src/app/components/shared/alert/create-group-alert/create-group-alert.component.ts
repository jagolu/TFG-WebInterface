import { GroupService } from 'src/app/services/restServices/group.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { AlertService } from 'src/app/services/visualServices/alert.service';

@Component({
  selector: 'app-create-group-alert',
  templateUrl: './create-group-alert.component.html',
  styles: []
})
/**
 * Class for fill the alert with the create group form
 * 
 * @class
 */
export class CreateGroupAlertComponent{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The form to create a new group
   * 
   * @access public
   * @var {FormGroup} createGroupForm
   */
  public createGroupForm:FormGroup;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {GroupService} groupS To do the group requests 
   * @param {AlertService} _alertS To get the alert info
   */
  constructor(private groupS:GroupService, private _alertS:AlertService) { 
    this.initializeForm();
    this._alertS.reset.subscribe(
      reset=>{ if(reset) this.resetForm() }
    );
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Create a new group
   * 
   * @access public
   */
  public createGroup(){
    this._alertS.hideAlert();
    
    //Bootstrap modal close on form submit. So, I have to
    //show 2 modals, so first hide that and in 0.35 seconds
    //send the petition and show the modal of the response
    setTimeout(this.create.bind(this), 350);
    
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
   * Initializes the form to create the new group
   * 
   * @access private
   */
  private initializeForm(){
    this.createGroupForm = new FormGroup({
      'name': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ],
        [this.validateNameNotTaken.bind(this)]
      )
    });
  }

  /**
   * Validate by AJAX that the name that the user is
   * trying to taken isn't taken
   * 
   * @access private
   * @param {FormControl} control The input of the group name
   */
  private validateNameNotTaken(control: FormControl) {
    return this.groupS.checkGroupName(control.value).pipe(map(res => {
      return res ? null : { groupNameTaken: true };
    }));
  }

  /**
   * Reset the create group form to emtpy
   * 
   * @access private
   */
  private resetForm(){
    this.createGroupForm.reset({
      'name': ""
    })
  }
  
  /**
   * Do the request to create the group
   * 
   * @access private
   */
  private create(){
    this.groupS.createGroup(this.createGroupForm.controls["name"].value);
  }
}
