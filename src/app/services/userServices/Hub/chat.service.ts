import { Injectable, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { 
  ChatMessage, 
  ChatRoomInfo, 
  SingleUserChatMessage, 
  newSingleUserChatMessage, 
  ChatUserMessages, 
  newChatUserMessages 
} from 'src/app/models/models';
import { hubConnection } from './hubConnection';
import { GROUP_SOCKET_ID, NOTIFICATION_KICK_CHAT } from 'src/environments/secret';

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
   * @var {string} _publicUserId
   */
  private _publicUserId:string = "";

  /**
   * Contains the groups which http
   * request is on process
   * 
   * @access private
   * @var {string[]} _loadingGroups
   */
  private _loadingGroups:string[] = [];

  /**
   * The full info of all the group chats
   * that the user is joined
   * 
   * @access private
   * @var {ChatRoomInfo[]} _allRooms
   */
  private _allRooms : ChatRoomInfo[] =[];

  /**
   * The chat messages of the actual chat room
   * 
   * @access private
   * @var {BehaviorSubject<ChatMessage[]>} _chatRoom
   */
  private _chatRoom = new BehaviorSubject<ChatUserMessages[]>([]);

  /**
   * The var at which other components will subscribe to
   * get chat rooms messages 
   * 
   * @access public
   * @var {Observable} room
   */
  public room = this._chatRoom.asObservable();

  /**
   * The name of the actual chat room
   * 
   * @access private
   * @var {BehaviorSubject<string>} _chatRoom
   */
  private _roomName = new BehaviorSubject<string>("");

  /**
   * The var at which other components will subscribe to
   * get chat room name
   * 
   * @access public
   * @var {Observable} name
   */
  public name = this._roomName.asObservable();

  /**
   * The name of the group and a boolean indicating if has to 
   * scroll down the chat
   * 
   * @access private
   * @var {BehaviorSubject<[string, boolean]>} _chatScrollDown
   */
  private _chatScrollDown = new BehaviorSubject<[string, boolean]>(["", false]);

  /**
   * The var at which other components will subscribe to
   * get the scroll down info
   * 
   * @access public
   * @var {Observable} reDown
   */
  public reDown = this._chatScrollDown.asObservable();

  /**
   * A count of the new messages that the user 
   * hasn't read yet
   * 
   * @access private
   * @var {BehaviorSubject<[string, number][]>} _newMessagesCount
   */
  private _newMessagesCount = new BehaviorSubject<[string, number][]>([]);

  /**
   * The var at which other components will subscribe to
   * get the count of the unread messages
   * 
   * @access public
   * @var {Observable} newMsgs
   */
  public newMsgs = this._newMessagesCount.asObservable();

  /**
   * Event emiter to sends the name of the group chat
   * that the user has been kicked
   * 
   * @access public
   * @var {EventEmitter<string>} groupKicked
   */
  @Output() groupKicked: EventEmitter<string> = new EventEmitter();


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
   */
  public addNewGroup(log:ChatRoomInfo, username:string){
    if(this.groupExists(log.group)) return;

    //Save the public id of the user
    this._publicUserId = log.callerPublicId; 
    //Subscribe to the chat room hub
    this.subscribeHub(log.group); 
    //Save the chat room info on the var
    this._allRooms.push(log); 
    
    //Add the unread messages from the new chat room
    this._newMessagesCount.value.push([log.group, 0]); 
    this._newMessagesCount.next(this._newMessagesCount.value);

    //Stops loading it
    this.stopLoading(log.group);

    //Sends the hello message
    this.sendHelloMessage(log.group, username);
    
    //Change the actual chat room to it
    this.changeRoom(log.group);
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
   * Change the name of the actual room, set messages
   * for the correct room and read it
   * 
   * @access public
   * @param {string} groupName The name of the group
   * to change the chat to its room
   */
  public changeRoom(groupName:string){
    this._roomName.next(groupName);
    this.setGroupMessages(groupName);
    this.readMessagesGroup(groupName);
  }

  /**
   * Send a message to the socket channel
   * 
   * @access public
   * @param {ChatMessage} message The message which
   * will be sent
   */
  public sendMessage(message:ChatMessage){
    message.publicUserId = this._publicUserId;
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

    //load another available chat room
    if(this._allRooms.length>0) this.changeRoom(this._allRooms[0].group);
  }

  /**
   * Send a message to scroll down all
   * the chats
   * 
   * @access public
   */
  public downThemAll(){
    this._allRooms.forEach(room=> this.sendReDown(room.group));
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
    this._loadingGroups.push(groupName);
  }

  /**
   * Gets the public user id of the logged user
   * 
   * @access public
   */
  public getPublicUserId(){
    return this._publicUserId;
  }

  /**
   * Resets all the class vars
   * 
   * @access public
   */
  public reset(){
    this._publicUserId = "";
    this._loadingGroups = [];
    this._allRooms = [];
    this._chatRoom.next([]);
    this._chatScrollDown.next(["", false]);
    this._newMessagesCount.next([]);
    this._roomName.next("");
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
   * Load in the chat messages observable
   * the chat messages of the specific room
   * 
   * @access private
   * @param {string} groupName The name of the group 
   */
  private setGroupMessages(groupName:string){
    this._allRooms.forEach(room=>{
      if(room.group == groupName) this._chatRoom.next(room.userMessages);
    });
  }

  /**
   * Checks if the group is in the service data
   * 
   * @access private
   * @param {string} groupName The name of the group
   * @returns {Boolean} True if the group is in the
   * service data, false otherwise
   */
  private groupExists(groupName:string):Boolean{
    return this._allRooms.some(room => room.group == groupName);
  }
  
  /**
   * Send a message to the obersavle to scroll down
   * an specific chat
   * 
   * @access private
   * @param {string} groupName The name of the group
   */
  private sendReDown(groupName:string){
    this._chatScrollDown.next([groupName, true]);
    setTimeout(_=> this._chatScrollDown.next([groupName, false]), 30);
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
    this._newMessagesCount.value.forEach(nmc=>{
      if(nmc[0] == groupName) nmc[1] = reset ? 0 : nmc[1] +1;
    });
    this._newMessagesCount.next(this._newMessagesCount.value);    
  }

  /**
   * Remove a group from the loading groups array
   * 
   * @access private
   * @param {string} groupName The name of the group
   */
  private stopLoading(groupName:string){
    this._loadingGroups.splice(this._loadingGroups.indexOf(groupName), 1);
  }

  /**
   * Checks if a group is loading
   * 
   * @access private
   * @param {string} groupName The name of the group
   * @returns {Boolean} True if the group process to logging in
   * is on, false otherwise
   */
  private isLoading(groupName:string):Boolean{
    return this._loadingGroups.some(loading => loading == groupName);
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
    this._allRooms.forEach((r, index) => delI = r.group == groupName ? index : delI);
    if(delI!=-1) this._allRooms.splice(delI, 1);

    delI = -1; //Remove from newMessagesCount array
    this._newMessagesCount.value.forEach((nmc, index)=>delI = nmc[0] == groupName ? index : delI);
    if(delI!=-1) this._newMessagesCount.value.splice(delI, 1);
    this._newMessagesCount.next(this._newMessagesCount.value);
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

    if(msg.message == NOTIFICATION_KICK_CHAT){
      if(msg.publicUserId == this._publicUserId){
        this.exitChat(groupName);
        this.groupKicked.emit(groupName);
      }
      return;
    }
    
    this._allRooms.forEach(room=>{
      let isTheGroup:Boolean = room.group == groupName;
      let canAdd:Boolean = !isTheGroup ? false : this.canAddMessage(room.userMessages, msg);
      let sameUser:Boolean = !isTheGroup ? false : this.isTheSameUserOfTheLastMessage(room.userMessages, msg);

      if(!canAdd) return;
      if(sameUser && room.userMessages.length>1) room.userMessages[room.userMessages.length-1].messages.push(newSingleUserChatMessage(msg));
      else room.userMessages.push(newChatUserMessages(msg));
      if(msg.username != "") this.changeCount(groupName, false); 
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
   * @returns {Boolean} True if we can add the new message, false otherwise
   */
  private canAddMessage(room:ChatUserMessages[], newMessage:ChatMessage):Boolean{
    let roomLength:boolean = room.length == 0;
    if(roomLength) return true;

    let lastUser:ChatUserMessages = room[room.length-1];
    let lastMsg:SingleUserChatMessage = lastUser.messages[lastUser.messages.length-1];
    
    return lastMsg.message != newMessage.message;
  }

  /**
   * Checks if the last message of the room comes from the same
   * user that sends the new message
   * 
   * @access private
   * @param {ChatUserMessages[]} room The messages of the chat room
   * @param {ChatMessage} newMessage The new message to add
   * @returns {Boolean} True if the new message comes from the same user
   * than the last message, false otherwise
   */
  private isTheSameUserOfTheLastMessage(room:ChatUserMessages[], newMessage:ChatMessage):Boolean{
    if(room.length == 0) return true;

    let lastUser:ChatUserMessages = room[room.length-1];
    let isSameUser:boolean = lastUser.publicUserId == newMessage.publicUserId;
    let notUserName:boolean = lastUser.username != "" && newMessage.username != "";
    return isSameUser && notUserName;
  }

  /**
   * Sends a hello message to the group chat
   * 
   * @access private
   * @param {string} groupName The name of the group
   * @param {string} username The nickname of the user
   */
  private sendHelloMessage(groupName:string, username:string){
    setTimeout(_=>this.sendMessage({
      group: groupName,
      role: "Conexión",
      time: new Date(),
      username : username,
      publicUserId: this._publicUserId,
      message: `${username} está conectado.`
    }), 2000);
  }
}
