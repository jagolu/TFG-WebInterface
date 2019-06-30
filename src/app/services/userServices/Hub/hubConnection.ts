
import * as signalR from "@aspnet/signalr";
import { URL } from 'src/environments/secret';

/**
 * Class to define the basics socket function
 * 
 * @class
 */
export abstract class hubConnection{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  private urlConnection:string;

  private hubConnection: signalR.HubConnection;

  private broadcastFunction:string;

  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {string} hubConnection Socket url path
   * @param {string} broadCastFunction The name of backend
   * socket function at which send the messages
   */
  constructor(hubConnection:string, broadCastFunction:string) {
      this.urlConnection = URL.baseURL+hubConnection;
      this.broadcastFunction = broadCastFunction;
      this.startConnection();
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R O T E C T E D   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Sends a message to an specific backend socket function
   * 
   * @access protected
   * @param {any} message The message to send to the 
   * backend function 
   */
  protected sendMessageToSocket(message:any):void{
    this.hubConnection.invoke(this.broadcastFunction, message);
  }

  abstract subscribeHub(event:string);

  /**
   * Unsubscribe to a specific socket channel
   * 
   * @access protected
   * @param {string} event The name of the event
   * to which we gonna unsubscribe 
   */
  protected setConnectionOff(event:string):void{
    this.hubConnection.off(event);
  }

  public getConnection(){
    return this.hubConnection;
  }

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
    this.hubConnection = new signalR.HubConnectionBuilder()
                        .withUrl(this.urlConnection)
                        .build();

    this.hubConnection.start();
  }
}
