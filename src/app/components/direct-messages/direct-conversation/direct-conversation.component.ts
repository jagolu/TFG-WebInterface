import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DirectMessagesService } from 'src/app/services/restServices/direct-messages.service';
import { DMRoom, DMTitle, DMMessageCluster } from 'src/app/models/models';
import { SessionService } from 'src/app/services/userServices/session.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-direct-conversation',
  templateUrl: './direct-conversation.component.html',
  styles: [`
    .closedConv{background-color:#F2F2F2}
    .closedMsg{background-color:#F7F6F6}
  `]
})
export class DirectConversationComponent{

  //
  // ────────────────────────────────────────────────────────────  ──────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The id of the conversation
   * 
   * @access private
   * @var {string} _id
   */
  private _id:string = "";

  /**
   * The form to send the direct message
   * 
   * @access public
   * @var {FormGroup} sendDMMessageForm
   */
  public sendDMMessageForm: FormGroup;

  /**
   * The info of the direct conversation
   * 
   * @access public
   * @var {DMTitle} room
   */
  public room:DMTitle;

  /**
   * The clustered messages of the conversation
   * 
   * @access public
   * @var {DMMessageCluster[]} clusters
   */
  public clusters:DMMessageCluster[] = [];

  /**
   * Says if the actual user is an admin or not
   * 
   * @access public
   * @var {Boolean} thisIsAdmin
   */
  public thisIsAdmin :Boolean = false;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {ActivatedRoute} __aR To get the id param (id of the direct conversation)
   * @param {DirectMessagesService} __dmS To do the DM requests
   * @param {SessionService} __sessionS To know if the actual user is an admin or not
   */
  constructor(
    private __aR:ActivatedRoute, 
    private __dmS:DirectMessagesService, 
    private __sessionS:SessionService
  ) { 
    this._id = this.__aR.snapshot.paramMap.get('id');
    this.loadConversation();
    this.thisIsAdmin = this.__sessionS.isAdmin();
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Sends a message to the conversation
   * 
   * @access public
   */
  public sendMessage(){
    this.__dmS.launchDMMessage({
      "dmId": this._id,
      "message": this.sendDMMessageForm.controls["message"].value
    }).subscribe((dmr:DMRoom)=>this.setData(dmr));
    this.resetForm();
  }

  /**
   * "Closes" the conversation if its open
   * 
   * @access public
   */
  public closeConversation(){
    this.__dmS.openCloseConversation(this.room.id, false).subscribe((dmrRes:DMRoom)=>this.setData(dmrRes));
    this.resetForm();
  }

  /**
   * "Open" the conversation if its closed
   * 
   * @access public
   */
  public openConversation(){
    this.__dmS.openCloseConversation(this.room.id, true).subscribe((dmrRes:DMRoom)=>this.setData(dmrRes));
    this.resetForm();
  }

  /**
   * Says if the current user is
   * an admin
   * 
   * @access public
   * @returns {Boolean} True if the current user
   * is an admin, false otherwise
   */
  public isAdmin():Boolean{
    return this.__sessionS.isAdmin();
  }

  /**
   * Do the http request to load the
   * DM conversation
   * 
   * @access public
   */
  public loadConversation(){
    this.__dmS.loadDMMessages(this._id).subscribe((dmrRes:DMRoom)=>{
      this.setData(dmrRes);
      if(!this.room.closed) this.initializeForm();
    });
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
    this.sendDMMessageForm = new FormGroup({
      "message": new FormControl(
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(510)
        ]
      )
    })
  }

  /**
   * Resets the form
   */
  private resetForm(){
    this.sendDMMessageForm.reset({"message": ""});
  }

  /**
   * Sets the data to the private
   * vars scrolls down the window
   * 
   * @access private
   * @param {DMRoom} dmr The info of the conversation 
   */
  private setData(dmr:DMRoom){
    try{
      this.room = dmr.title;
      this.clusters = dmr.clusters;   
      setTimeout(_ => this.scrollDown(), 200);   
    }catch(Error){this.clusters = []}
  }

  /**
   * Scrolls down the window
   * 
   * @access private
   */
  private scrollDown(){
    let div = (document.querySelector("#DMMessagesScroll") as HTMLElement);
    if(div!=null) setTimeout(_=> div.scrollTop = div.scrollHeight, 20); 
  }
}
