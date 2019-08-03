import { Component, OnInit, HostListener } from '@angular/core';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';
import { IconModel, Icons, ChatRoomInfo } from 'src/app/models/models';
import { SessionService } from 'src/app/services/userServices/session.service';
import { ChatService } from 'src/app/services/userServices/Hub/chat.service';
import { AliveService } from 'src/app/services/restServices/alive.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styles: []
})
/**
 * Class to manage the chat "window". The button and
 * what is collapsed
 * 
 * @implements OnInit
 * @Class
 */
export class ChatWindowComponent implements OnInit{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The screen width
   * 
   * @access public
   * @var {number} width
   */
  public width:number;

  /**
   * The total of the unread messages
   * 
   * @access public
   * @var {number} totalNewMessages
   */
  public totalNewMessages:number = 0;

  /**
   * Checks if the user is logged in any 
   * chat room
   * 
   * @access public
   * @var {Boolean} thereIsAnyChat
   */
  public thereIsAnyChat:Boolean = false;

  /**
   * The icon of a bell
   * 
   * @access public
   * @var {IconModel} bell_icon
   */
  public bell_icon:IconModel = Icons.BELL;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T U R C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Gets the the unread messages count.
   * Manage the chat log requests.
   * Checks if the user is authenticated
   * 
   * @constructor
   * @param {AuthenticationService} __authS To check if the user is authenticated 
   * @param {ChatService} __chatS To get the unread messages
   * @param {SessionService} __sessionS To get the user groups
   * @param {AliveService} __alive To do the log chat request 
   */
  constructor(
    private __authS:AuthenticationService, 
    private __chatS:ChatService, 
    private __sessionS:SessionService, 
    private __alive:AliveService
  ) { 
    this.__chatS.newMsgs.subscribe(allGroupNotReadMsgs=>{
      this.totalNewMessages = 0;
      allGroupNotReadMsgs.forEach(c=>this.totalNewMessages += c[1]);
    });
    this.__sessionS.User.subscribe(u=> {
      try{
        this.thereIsAnyChat = u.groups.length > 0;
        u.groups.forEach((g, index)=>{
          if(!this.__chatS.alreadyLogged(g)){
            this.__chatS.startLoading(g);
            this.__alive.logChat(g).subscribe((info:ChatRoomInfo)=>this.__chatS.addNewGroup(info, index == 0, u.username));            
          }
        });
      }catch(Error){this.thereIsAnyChat = false}
    });
  }

  /**
   * Gets the innerWidth window
   * 
   * @OnInit
   */
  ngOnInit(){
    this.width = window.innerWidth;
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Function to know the actual screen width
   * 
   * @param {any} event The event of resizing the screen
   */
  @HostListener('window:resize', ['$event']) onResize(event) {
    this.width = window.innerWidth;
  }

  /**
   * Open a chat room
   * 
   * @access public
   */
  public openChat(){
    this.__chatS.downThemAll();
  }

  /**
   * Says if the user is authenticated
   * 
   * @access public
   * @returns {Boolean} True if the user is authenticated,
   * false otherwise
   */
  public isAuthenticated():Boolean{
    return this.__authS.IsAuthenticated();
  }

  /**
   * Says if the user has the "Admin" role
   * 
   * @returns {Boolean} True if the user has not 
   * the "Admin" role, false otherwise
   */
  public notAdmin():Boolean{
    return !this.__sessionS.isAdmin();
  }
}
