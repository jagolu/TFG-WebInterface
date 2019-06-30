import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { 
  ChatMessage, ChatRoomInfo, 
  SingleUserChatMessage, newSingleUserChatMessage, 
  ChatUserMessages, newChatUserMessages 
} from 'src/app/models/models';
import { hubConnection } from './hubConnection';
import { GROUP_SOCKET_ID } from 'src/environments/secret';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to manage the visual chat
 * and its info
 * 
 * @class
 * @extends hubConenction
 */
export class ChatService extends hubConnection{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The public user id of the logged user
   * 
   * @access private
   * @var {string} __publicUserId
   */
  private __publicUserId:string = "";

  /**
   * Contains the groups which http
   * request is on process
   * 
   * @access private
   * @var {string[]} __loadingGroups
   */
  private __loadingGroups:string[] = [];

  /**
   * The full info of all the group chats
   * that the user is joined
   * 
   * @access private
   * @var {ChatRoomInfo[]} __allRooms
   */
  private __allRooms : ChatRoomInfo[] =[];

  /**
   * The chat messages of the actual chat room
   * 
   * @access private
   * @var {BehaviorSubject<ChatMessage[]>} __chatRoom
   */
  private __chatRoom = new BehaviorSubject<ChatUserMessages[]>([]);

  /**
   * The var at which other components will subscribe to
   * get chat rooms messages 
   * 
   * @access public
   * @var {Observable} room
   */
  public room = this.__chatRoom.asObservable();

  /**
   * The name of the group and a boolean indicating if has to 
   * scroll down the chat
   * 
   * @access private
   * @var {BehaviorSubject<[string, boolean]>} __chatScrollDown
   */
  private __chatScrollDown = new BehaviorSubject<[string, boolean]>(["", false]);

  /**
   * The var at which other components will subscribe to
   * get the scroll down info
   * 
   * @access public
   * @var {Observable} reDown
   */
  public reDown = this.__chatScrollDown.asObservable();

  /**
   * A count of the new messages that the user 
   * hasn't read yet
   * 
   * @access private
   * @var {BehaviorSubject<[string, number][]>} __newMessagesCount
   */
  private __newMessagesCount = new BehaviorSubject<[string, number][]>([]);

  /**
   * The var at which other components will subscribe to
   * get the count of the unread messages
   * 
   * @access public
   * @var {Observable} newMsgs
   */
  public newMsgs = this.__newMessagesCount.asObservable();


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   */
  constructor() { 
      super("chatter", "BroadcastChartData", GROUP_SOCKET_ID);
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Adds a new group to the array which contains all the chat rooms,
   * and subscribe to the socket channel
   * 
   * @access public
   * @param {string} groupName The name of the group
   * @param {ChatRoomInfo} log The chat log info 
   * @param {boolean} addThis A filter to know if show this chat room messages
   */
  public addNewGroup(log:ChatRoomInfo, addThis:boolean){
    if(this.groupExists(log.group)) return;
    this.__publicUserId = log.callerPublicId;
    this.subscribeHub(log.group);
    this.__allRooms.push(log);
    if(addThis) this.setGroupMessages(log.group);
    this.__newMessagesCount.value.push([log.group, 0]);
    this.__newMessagesCount.next(this.__newMessagesCount.value);
    this.stopLoading(log.group);
  }

  /**
   * Set to 0 the unread messages in the specific chat room
   * 
   * @access public
   * @param {string} groupName The name of the group
   */
  public readMessagesGroup(groupName:string){
    if(!this.groupExists(groupName)) return;
    this.changeCount(groupName, true);
  }  

  /**
   * Load in the chat messages observable
   * the chat messages of the specific room
   * 
   * @access public
   * @param {string} groupName The name of the group 
   */
  public setGroupMessages(groupName:string){
    this.__allRooms.forEach(room=>{
      if(room.group == groupName){
        this.__chatRoom.next(room.userMessages);
      }
    });
  }

  /**
   * Send a message to the socket channel
   * 
   * @access public
   * @param {ChatMessage} message The message which
   * will be sent
   */
  public sendMessage(message:ChatMessage){
    message.publicUserId = this.__publicUserId;
    this.sendMessageToSocket(message);
  }

  /**
   * Exit from a room chat and unsubscribe from
   * its socket channel
   * 
   * @access public
   * @param {string} groupName The name of the group 
   */
  public exitChat(groupName:string){
    this.removeGroup(groupName);
    this.setConnectionOff(groupName);
  }

  /**
   * Send a message to scroll down all
   * the chats
   * 
   * @access public
   */
  public downThemAll(){
    this.__allRooms.forEach(room=> this.sendReDown(room.group));
  }

  /**
   * Says if its necessary do a logChat request for
   * this group
   * 
   * @access public
   * @param {string} groupName The name of the group 
   */
  public alreadyLogged(groupName:string){
    return this.groupExists(groupName) || this.isLoading(groupName);
  }

  /**
   * Set this group as its has started the
   * process to log in it
   * 
   * @access public
   * @param {string} groupName The name of the group 
   */
  public startLoading(groupName:string){
    this.__loadingGroups.push(groupName);
  }

  /**
   * Gets the public user id of the logged user
   * 
   * @access public
   */
  public getPublicUserId(){
    return this.__publicUserId;
  }

  /**
   * Resets all the class vars
   * 
   * @access public
   */
  public reset(){
    this.__publicUserId = "";
    this.__loadingGroups = [];
    this.__allRooms = [];
    this.__chatRoom.next([]);
    this.__chatScrollDown.next(["", false]);
    this.__newMessagesCount.next([]);
  }  

  //
  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────
  //   :::::: I M P L E M E N T E D   A B S T R A C T   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Implements the hubConenction function.
   * Subscribe to the channel hub and manage
   * the chat messages received
   * 
   * @access public
   * @param {string} event The name of the event (The group name) 
   */
  public subscribeHub(event:string){
    this.getConnection().on(GROUP_SOCKET_ID+event, (message:any)=> this.addMessage(event, message));
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Checks if the group is in the service data
   * 
   * @access private
   * @param {string} groupName The name of the group
   * @returns {boolean} True if the group is in the
   * service data, false otherwise
   */
  private groupExists(groupName){
    return this.__allRooms.some(r => r.group == groupName);
  }
  
  /**
   * Send a message to the obersavle to scroll down
   * an specific chat
   * 
   * @access private
   * @param {string} groupName The name of the group
   */
  private sendReDown(groupName:string){
    this.__chatScrollDown.next([groupName, true]);
    setTimeout(_=> this.__chatScrollDown.next([groupName, false]), 30);
  } 

  /**
   * Change the count of an specific chat room unread messages
   * 
   * @access private
   * @param {string} groupName The name of the group
   * @param {boolean} reset True to set the count to 0, false
   * to add 1 to the group count 
   */
  private changeCount(groupName:string, reset:boolean){
    this.__newMessagesCount.value.forEach(nmc=>{
      if(nmc[0] == groupName) nmc[1] = reset ? 0 : nmc[1] +1;
    });
    this.__newMessagesCount.next(this.__newMessagesCount.value);    
  }

  /**
   * Remove a group from the loading groups array
   * 
   * @access private
   * @param {string} groupName The name of the group
   */
  private stopLoading(groupName:string){
    this.__loadingGroups.splice(this.__loadingGroups.indexOf(groupName), 1);
  }

  /**
   * Checks if a group is loading
   * 
   * @access private
   * @param {string} groupName The name of the group
   * @returns {boolean} True if the group process to logging in
   * is on, false otherwise
   */
  private isLoading(groupName:string){
    return this.__loadingGroups.some(l => l == groupName);
  }

  /**
   * Remove a group from the service data
   * 
   * @access private
   * @param {string} groupName The name of the group to remove
   */
  private removeGroup(groupName:string){
    if(!this.groupExists(groupName)) return;
    
    let delI = -1; //Remove from allRooms array
    this.__allRooms.forEach((r, index) => delI = r.group == groupName ? index : delI);
    if(delI!=-1) this.__allRooms.splice(delI, 1);

    delI = -1; //Remove from newMessagesCount array
    this.__newMessagesCount.value.forEach((nmc, index)=>delI = nmc[0] == groupName ? index : delI);
    if(delI!=-1) this.__newMessagesCount.value.splice(delI, 1);
    this.__newMessagesCount.next(this.__newMessagesCount.value);
  }

  /**
   * Adds a message to an specific group in the service data
   * 
   * @access private
   * @param {string} groupName The name of the group
   * @param {ChatMessage} msg The message to add 
   */
  private addMessage(groupName:string, msg:ChatMessage){
    if(!this.groupExists(groupName)) return;
    
    this.__allRooms.forEach(room=>{
      if(room.group == groupName){
        if(this.canAddMessage(room.userMessages, msg)){
          if(this.isTheSameUserOfTheLastMessage(room.userMessages, msg)){
            room.userMessages[room.userMessages.length-1].messages.push(newSingleUserChatMessage(msg));
          }
          else room.userMessages.push(newChatUserMessages(msg));
          
          if(msg.username != "") this.changeCount(groupName, false); 
        }
      }
    });
    this.sendReDown(groupName);
  }

  /**
   * Function to know if we can add the new received message
   * to the service data
   * 
   * @access private
   * @param {ChatUserMessages[]} room The room messages
   * @param {ChatMessage} newMessage The new message to add
   * @returns {boolean} True if we can add the new message, 
   * false otherwise
   */
  private canAddMessage(room:ChatUserMessages[], newMessage:ChatMessage):boolean{
    let roomLength:boolean = room.length == 0;
    if(roomLength) return true;

    let lastUser:ChatUserMessages = room[room.length-1];
    let lastMsg:SingleUserChatMessage = lastUser.messages[lastUser.messages.length-1];
    
    let isOnlineMessage:boolean = lastUser.username!="" || newMessage.username!="";
    let notEqualMessage:boolean = lastMsg.message != newMessage.message;

    return roomLength || isOnlineMessage || notEqualMessage;
  }

  /**
   * Checks if the last message of the room comes from the same
   * user that sends the new message
   * 
   * @access private
   * @param {ChatUserMessages[]} room The messages of the chat room
   * @param {ChatMessage} newMessage The new message to add
   * @returns {boolean} True if the new message comes from the same user
   * than the last message, false otherwise
   */
  private isTheSameUserOfTheLastMessage(room:ChatUserMessages[], newMessage:ChatMessage):boolean{
    if(room.length == 0) return true;

    let lastUser:ChatUserMessages = room[room.length-1];
    let isSameUser:boolean = lastUser.publicUserId == newMessage.publicUserId;
    let notUserName:boolean = lastUser.username != "" && newMessage.username != "";
    return isSameUser && notUserName;
  }
}
