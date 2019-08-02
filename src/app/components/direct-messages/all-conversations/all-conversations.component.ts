import { Component } from '@angular/core';
import { DirectMessagesService } from 'src/app/services/restServices/direct-messages.service';
import { DMTitle, SearchUserDM, ComponentID } from 'src/app/models/models';
import { FormGroup, FormControl, Validators, Validator } from '@angular/forms';
import { SessionService } from 'src/app/services/userServices/session.service';
import { AdminService } from 'src/app/services/restServices/admin.service';
import { Router } from '@angular/router';
import { ReloadService } from 'src/app/services/userServices/reload.service';

@Component({
  selector: 'app-all-conversations',
  templateUrl: './all-conversations.component.html',
  styles: [`.closedConv{background-color:#F2F2F2}`]
})
export class AllConversationsComponent {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The direct conversations of the
   * current user
   * 
   * @access public
   * @var {DMTitle[]} dmTitles
   */
  public dmTitles:DMTitle[] = [];

  /**
   * (For admin users) The result user-search
   * 
   * @access public
   * @var {SearchUserDM[]} suggestions
   */
  public suggestions:SearchUserDM[] = [];

  /**
   * The form to create a Direct Conversation
   * 
   * @access public
   * @var {FormGroup} createDMForm
   */
  public createDMForm:FormGroup;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * Load the direct conversations
   * 
   * @constructor
   * @param {DirectMessagesService} __dmS To do the direct messages requests
   * @param {SessionService} __sessionS To know if the current user is an admin or not
   * @param {AdminService} __adminS To search the users
   * @param {Router} __router To redirect the user after creating a new DM
   * @param {ReloadService} __reloadS To get the events to reload the page
   */
  constructor(
    private __dmS:DirectMessagesService, 
    private __sessionS:SessionService, 
    private __adminS:AdminService, 
    private __router:Router,
    private __reloadS:ReloadService
  ) { 
    this.loadDMs();
    this.initializeForm();
    this.__reloadS.reloadComponent.subscribe(r=>{
      if(r == ComponentID.ALL_DM) this.loadDMs();
    });
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Creates a new direct conversation
   * 
   * @access public
   */
  public createDMTitle(){
    let title = this.createDMForm.controls["title"].value;
    let receiver = this.isAdmin() ? this.createDMForm.controls["receiver"].value : null;
    this.__dmS.launchDMTitle({
      "title": title,
      "emailReceiver": receiver
    }).subscribe(dmId=>this.__router.navigate(['directConversation', dmId]));
  }

  /**
   * Says if the current user is an admin or not
   * 
   * @access public
   * @returns {Boolean} True if the current user
   * is an admin, false otherwise
   */
  public isAdmin():Boolean{
    return this.__sessionS.isAdmin();
  }

  /**
   * Ajax function to search a user (Only for admins) and
   * change the selected index to 0
   * 
   * @access public
   */
  public findDM(){
    let find = this.createDMForm.controls["receiver"].value;
    this.__adminS.searchUserDM(find).subscribe((suggs:SearchUserDM[])=>this.suggestions = suggs);
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Do the http request to get all the dm which the
   * current user has
   * 
   * @access private
   */
  private loadDMs(){
    this.__dmS.loadDMTitles().subscribe((dmS:DMTitle[])=> this.dmTitles = dmS);
  }

  /**
   * Initializes the form to create 
   * a new direct conversation
   * 
   * @access private
   */
  private initializeForm(){
    let recvValidator = this.isAdmin() ? Validators.required : Validators.nullValidator;
    this.createDMForm = new FormGroup({
      "receiver": new FormControl(
        '',
        [
          recvValidator
        ]
      ),
      "title": new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64)
        ]
      )
    });
  }
}