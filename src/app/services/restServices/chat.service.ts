import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { ChatMessage } from 'src/app/models/models';
import { URL } from 'src/environments/secret';
import { RestService } from './rest.service';
import { LoadingService } from '../visualServices/loading.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to do the chat requests & communicate with the chat socket
 * 
 * @class
 * @extends RestService
 */
export class ChatService extends RestService{

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
   * @access public
   * @var {HubConnection} hubConnection
   */
  public hubConnection: signalR.HubConnection;

  /**
   * To know if the connection is valid
   * 
   * @access public
   * @var {boolean} validConnection
   */
  public validConnection:boolean = false;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {HttpClient} http For the RestService constructor 
   * @param {LoadingService} loading For the RestService constructor
   */
  constructor(http: HttpClient, loading: LoadingService) {
    super(http, loading);
    this.startConnection();
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Log to an specific group chat
   * 
   * @access public
   * @param {string} groupName The name of the group
   * @return {Observable} The result of the request 
   */
  public logChat(groupName:string){
    return this.getRequest(this.__chatPath+"ChatLogin",
    [{
        param: "groupName",
        value: groupName
    }],
    true);
  }

  /**
   * Send a message to a group chat
   * 
   * @param {ChatModel} message The info of the chat message
   */
  public sendMessageToChat(message:ChatMessage) {
    this.hubConnection.invoke("BroadcastChartData", message)
    .catch( err=> {this.validConnection = false; console.log(err)});
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

    this.hubConnection
          .start()
          .then( _=> this.validConnection = true)
          .catch(_=>this.validConnection = false);
  }
}
