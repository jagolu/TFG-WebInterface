import * as signalR from "@aspnet/signalr";
import { URL } from 'src/environments/secret';

/**
 * Class to define the basics socket function
 * 
 * @abstract
 * @class
 */
export abstract class hubConnection{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The connection path to the socket
   * 
   * @access private
   * @var {string} __urlConnection
   */
  private __urlConnection:string;

  /**
   * The hub connection to the socket
   * 
   * @access private 
   * @var {signalR.HubConnection} __hubConnection
   */
  private __hubConnection: signalR.HubConnection;

  /**
   * The function name where send the messages in the backend
   * 
   * @access private
   * @var {string} __broadcastFunction
   */
  private __broadcastFunction:string;

  /**
   * The id of the sub socket channel
   * 
   * @access private
   * @var {string} __socketId
   */
  private __socketId:string;

  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {string} hubConnection The path to the socket connection
   * @param {string} broadCastFunction The name of the socket function
   * @param {string} socketId The subId of the socket id
   */
  constructor(hubConnection:string, broadCastFunction:string, socketId:string) {
      this.__urlConnection = URL.baseURL+hubConnection;
      this.__broadcastFunction = broadCastFunction;
      this.__socketId = socketId;
      this.startConnection();
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Sends a message to an specific backend socket function
   * 
   * @access public
   * @param {any} message The message to send to the 
   * backend function 
   */
  public sendMessageToSocket(message:any):void{
    this.__hubConnection.invoke(this.__broadcastFunction, message);
  }

  /**
   * Unsubscribe to a specific socket channel
   * 
   * @access public
   * @param {string} event The name of the event
   * to which we gonna unsubscribe 
   */
  public setConnectionOff(event:string):void{
    this.__hubConnection.off(this.__socketId+event);
  }

  /**
   * Gets the signalR.HubConnection connection
   * 
   * @access public
   * @return {signalR.HubConnection} The hub connection to
   * the socket
   */
  public getConnection(){
    return this.__hubConnection;
  }

  //
  // ──────────────────────────────────────────────────────────────────────────────────────
  //   :::::: A B S T R A C T   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Function to subscribe to the socket channel
   * 
   * @param {string} event The name of the event 
   */
  abstract subscribeHub(event:string);

  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Function to start a connection against the socket
   * 
   * @access private
   */
  private startConnection () {
    this.__hubConnection = new signalR.HubConnectionBuilder()
                        .withUrl(this.__urlConnection)
                        .build();

    this.__hubConnection.start();
  }
}
