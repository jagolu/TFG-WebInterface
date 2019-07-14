import { Component, OnInit } from '@angular/core';
import { IconModel, Icons } from 'src/app/models/models';
import { SessionService } from 'src/app/services/userServices/session.service';
import { ChatService } from 'src/app/services/userServices/Hub/chat.service';

@Component({
  selector: 'app-chat-collapse',
  templateUrl: './chat-collapse.component.html',
  styles: []
})
/**
 * Class to manage the collapse element in the chat window
 * 
 * @Class
 * @implements OnInit
 */
export class ChatCollapseComponent implements OnInit {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The user groups
   * 
   * @access public
   * @var {string[]} groups
   */
  public groups:string[] = [];

  /**
   * The unread messages in each group
   * 
   * @access public
   * @var {[string, number][]} groupNewMessages
   */
  public groupNewMessages:[string,number][] = [];

  /**
   * The group name of the actual chat room
   * 
   * @access public
   * @var {string} groupName
   */
  public groupName:string = "";

  /**
   * The icon of a ball
   * 
   * @access public
   * @var {IconModel} icon_ball
   */
  public icon_ball:IconModel = Icons.BALL;

  /**
   * The icon of a bell
   * 
   * @access public
   * @var {IconModel} bell_icon
   */
  public bell_icon:IconModel = Icons.BELL;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {SessionService} sessionS To know the actual user groups
   * @param {ChatService} _chatS To know the unread messages
   */
  constructor(private sessionS:SessionService, private _chatS:ChatService) { }

  /**
   * Set the correct chat room and
   * removes the dissapear chat rooms
   * 
   * @OnInit
   */
  ngOnInit() {
    this.sessionS.User.subscribe(u => {
      if(u!=null){
        this.checkAuxGroups(u.groups);
        this.groups = u.groups;
        this.setGroup(this.groups); 
      }
      this._chatS.newMsgs.subscribe(newMsgs=> this.groupNewMessages =  newMsgs);
    });
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Get the count of the unread messages of an
   * specific group
   * 
   * @access public
   * @param {string} name The name of the group 
   * @return {number} The count of the unread messages
   */
  public getCountMsgs(name:string){
    let number = 0;
    this.groupNewMessages.forEach(g=>{
      if(g[0] == name) number = g[1];
    });
    return number;
  }

  /**
   * Change the visualization of the chat to another
   * chat room
   * 
   * @access public
   * @param {string} name The name of the group
   */
  public changeGroupChat(name:string){
    if(!this.groups.some(g=> g == name)) return;
    this.groupName = name;
    this._chatS.setGroupMessages(name);
    this._chatS.readMessagesGroup(name);
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Set the html info to the chat room info
   * 
   * @access private
   * @param {string[]} newGroups The new groups in the session
   */
  private setGroup(newGroups:string[]){
    //If the actual group isn't in the new groups (means that the user has left the group)
    //Or the user isn't joined in any group ===> return
    if(newGroups.some(g => g == this.groupName) || newGroups.length == 0) return;

    //If the actual group isn't in the new groups (means that the user has left the group)
    //And at least there is one group
    // Change the room to that group chats
      this.groupName = newGroups[0];
      this.changeGroupChat(this.groupName);
  }

  /**
   * Checks if there is any group in the @var groups
   * that doesn't appear in the new user groups, and if
   * it is, delete it.
   * 
   * @access private
   * @param {GroupUserJoinedAt[]} newGroups The new groups in 
   * the user session
   */
  private checkAuxGroups(newGroups:string[]){
    this.groups.forEach(g=>{
      if(!newGroups.some(ng=> ng == g)) {
        this._chatS.exitChat(g);
      }
    });
  }
}
