import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { ChatMessage, GroupUserJoinedAt } from 'src/app/models/models';
import { URL } from 'src/environments/secret';
import { Rest } from './Rest';
import { LoadingService } from '../visualServices/loading.service';
import { HttpClient } from '@angular/common/http';
import { ChatMessagesService } from '../userServices/chat-messages.service';
import { SessionService } from '../userServices/session.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to do the chat requests & communicate with the chat socket
 * 
 * @class
 * @extends RestService
 */
export class AliveService extends Rest{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The connection to the socket path
   * 
   * @access private
   * @var {string} urlConnection
   */
  private urlConnection:string = URL.baseURL+"chatter";

  /**
   * The path to the alive http requests
   * 
   * @access private
   * @var {string} __chatPath
   */
  private __chatPath:string = "Alive/";
  
  /**
   * The connection to the socket
   * 
   * @access private
   * @var {HubConnection} hubConnection
   */
  private hubConnection: signalR.HubConnection;

  /**
   * The public id of the user who is logged
   * 
   * @access private
   * @var {string} userPublicId
   */
  private userPublicId:string = "";

  private alreadyLoggedGroups:GroupUserJoinedAt[] = [];

  private loading:string[] = [];


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {HttpClient} http For the RestService constructor 
   * @param {LoadingService} loading For the RestService constructor
   * @param {ChatMessagesService} userChat For the visual messages in the chat
   */
  constructor(http: HttpClient, loading: LoadingService, 
              private userChat:ChatMessagesService, private sessionS:SessionService) {
    super(http, loading);
    this.startConnection();
    this.logInChats();
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Log to an specific group chat, subscribes to 
   * the response and get the public Id and initializes
   * a new group and its messages on the userChat service
   * 
   * @access public
   * @param {string} groupName The name of the group
   */
  public logChat(groupName:string, setThis:boolean){
    this.getRequest(this.__chatPath+"ChatLogin",
    [{
        param: "groupName",
        value: groupName
    }], true)
    .subscribe((chatInfo:any)=>{
      this.userPublicId = chatInfo.callerPublicId;
      this.userChat.addNewGroup(groupName, chatInfo.messages);
      this.subscribeChatHub(groupName);
      if(setThis) this.userChat.setGroupMessages(groupName);
      this.loading.splice(this.loading.indexOf(groupName), 1);
    });
  }

  /**
   * Send a message to a group chat
   * 
   * @param {ChatModel} message The info of the chat message
   */
  public sendMessageToChat(message:ChatMessage) {
    message.publicUserId = this.userPublicId;
    this.hubConnection.invoke("BroadcastChartData", message);
  }

  /**
   * Subscribe to a socket channel of an specific group
   * 
   * @access public
   * @param {string} groupName The name of the group
   */
  public subscribeChatHub(groupName:string){
    this.hubConnection.on(groupName, 
      (message:ChatMessage)=> this.userChat.addMessage(groupName, message));
  }

  public unsubscribeChatHub(groupName:string){
    if(!this.alreadyLogged(groupName)) return;
    this.hubConnection.off(groupName);
  }

  /**
   * Gets the public id of the user 
   * who is logged
   * 
   * @access public
   * @returns {string} The public id of the 
   * user whos logged
   */
  public getUserPublicId(){
    return this.userPublicId;
  }

  /**
   * To know if the group there already is
   * on the log messages
   * 
   * @access public
   * @param {string} groupName The name of 
   * the group to check
   * @returns {boolean} True if the group
   * is already logged, false otherwise 
   */
  public alreadyLogged(groupName:string){
    return this.userChat.groupExists(groupName);
  }

  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Function to start a connection against the chat socket
   * 
   * @access private
   */
  private startConnection () {
    this.hubConnection = new signalR.HubConnectionBuilder()
                        .withUrl(this.urlConnection)
                        .build();

    this.hubConnection.start();
  }

  private logInChats(){
    this.sessionS.User.subscribe(u=>{
      try{
        this.checkAuxGroups(u.groups);
        u.groups.forEach((group, index)=>{
          if(!this.userChat.groupExists(group.name)){
            if(!this.loading.some(g => g == group.name)){
              this.logChat(group.name, index == 0);
              this.loading.push(group.name);
            }
          } 
        });
      }catch(Exception){}
    })
  }
  
  private checkAuxGroups(newGroups:GroupUserJoinedAt[]){
    this.alreadyLoggedGroups.forEach(g=>{
      if(!newGroups.some(ng=> ng.name == g.name)) {
        this.userChat.removeGroup(g.name);
        this.unsubscribeChatHub(g.name);
      }
    });
    
    this.alreadyLoggedGroups = newGroups;
  }
}
