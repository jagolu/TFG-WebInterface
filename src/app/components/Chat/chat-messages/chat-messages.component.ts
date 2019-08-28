import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatService } from 'src/app/services/userServices/Hub/chat.service';
import { ChatUserMessages, IconModel, Icons } from 'src/app/models/models';
import { ChatTimePipe } from 'src/app/pipes/chat-time.pipe';
import { SessionService } from 'src/app/services/userServices/session.service';


@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styles: []
})
/**
 * Class to manage the chat messages view
 * 
 * @Class
 * @implements OnInit
 */
export class ChatMessagesComponent implements OnInit{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The name of the group
   * 
   * @Input
   * @access public
   * @var {string} groupName
   */
  @Input() groupName:string ="";

  /**
   * The messages of the actual chat room
   * 
   * @access public
   * @var {ChatUserMessages[]} messages
   */
  public messages:ChatUserMessages[] = [];

  /**
   * The form to enter a message
   * 
   * @access public
   * @var {FormGroup} sendChatMessageForm
   */
  public sendChatMessageForm:FormGroup;

  /**
   * To do the time transformation
   * 
   * @access private
   * @var {ChatTimePipe} chatTimePipe
   */
  private chatTimePipe = new ChatTimePipe();
  
  /**
   * The icon of a a crown
   * 
   * @access public
   * @var {IconModel} icon_crown
   */
  public icon_crown:IconModel = Icons.CROWN;
  
  /**
   * The icon of a wizard hat
   * 
   * @access public
   * @var {IconModel} icon_wizard
   */
  public icon_wizard:IconModel = Icons.WIZARD;

  /**
   * The nickname of the current user
   * 
   * @access private
   * @var {string} _username
   */
  private _username:string;

  /**
   * The var which contains the reset unread messages count intervar
   * 
   * @access private
   * @var {any} timerReset
   */
  private _timerReset:any = null;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {ChatService} __chatS To get the chat room info 
   * @param {SessionService} __sessionS To get the nickname of the user
   */
  constructor(private __chatS:ChatService, private __sessionS:SessionService) { 
    this.initializeForm();
    this.__sessionS.User.subscribe(u=>{
      try{this._username = u.username}
      catch(Error){this._username = ""}
    });
  }

  /**
   * Calls the function to start the info subscription
   * 
   * @OnInit
   */
  ngOnInit(){
    this.userChatSub();
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Sends a message to the chat socket
   * 
   * @access public
   */
  public send(){
    if(this.sendChatMessageForm.valid){
      this.__chatS.sendMessage({
        "group": this.groupName,
        "message": this.sendChatMessageForm.controls["message"].value,
        "username": this._username,
        "publicUserId": "",
        "role": "",
        "time": new Date()
      })
      
      this.sendChatMessageForm.reset({"message" : ""});
    }
  }

  /**
   * Starts the interval of reseting the
   * unread chat messages count
   * 
   * @access public
   */
  public startReseting(){
    this._timerReset = setInterval(_=>this.__chatS.readMessagesGroup(this.groupName), 50);
  }

  /**
   * Clears the interval of reseting the
   * unread messages count
   * 
   * @access public
   */
  public stopReseting(){
    clearInterval(this._timerReset);
  }

  /**
   * Gets the public user id of the logged user
   * 
   * @access public
   * @returns {string} The public user id
   */
  public getPublicUserid():string{
    return this.__chatS.getPublicUserId();
  }

  /**
   * Gets the chat time to show in the chat window
   * 
   * @access public
   * @param {ChatUserMessages} userMessages The cluster of messages of 
   * for an specific user
   * @param {number} index The index of the message to get the time
   * 
   * @returns {string} If the next message of that user was at the same
   * time that this one returns an empty string, else returns the
   * time date of the message
   */
  public showTime(userMessages:ChatUserMessages, index:number):string{
    let size:number = userMessages.messages.length;
    let nowDate = this.chatTimePipe.transform(userMessages.messages[index].time.toString());
    if(index == size-1) return nowDate;

    let nextDate = this.chatTimePipe.transform(userMessages.messages[index+1].time.toString());
    return nowDate == nextDate ? "" : nowDate;
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
    this.sendChatMessageForm = new FormGroup({
      'message': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(120)
        ]
      )
    })
  }

  /**
   * Scrolls down the messages screen
   * 
   * @access private
   */
  private scrollDown(){
    let div = (document.querySelector("#chatScroll") as HTMLElement);
    if(div!=null) setTimeout(_=> div.scrollTop = div.scrollHeight, 20); 
  }

  /**
   * Subscribes to the chat messages info and
   * to the scroll down trigger
   * 
   * @access private
   */
  private userChatSub(){
    this.__chatS.room.subscribe(msgs=>{
      this.messages = msgs;
      this.scrollDown();
    });
    this.__chatS.reDown.subscribe((down:[string,boolean])=>{
      if(down[0] == this.groupName && down[1] == true){
        this.scrollDown();
      }
    });
  }
}