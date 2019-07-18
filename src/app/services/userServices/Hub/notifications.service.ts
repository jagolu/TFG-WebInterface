import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationMessage } from 'src/app/models/models';
import { hubConnection } from './hubConnection';
import { NOTIFICATION_SOCKET_ID } from 'src/environments/secret';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to manage the notifications
 * and their info
 * 
 * @class
 * @extends hubConnection
 */
export class NotificationsService extends hubConnection{

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
  private __publicUserId:string ="";

  /**
   * The notifications of the user
   * 
   * @access private
   * @var {BehaviorSubject<NotificationMessage[]>} __notifications
   */
  private __notifications = new BehaviorSubject<NotificationMessage[]>([]);

  /**
   * The notifications which the other components will subscribe to
   * get the notifications
   * 
   * @access public
   * @var {Observable} notifications
   */
  public notifications = this.__notifications.asObservable();


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   */
  constructor() { 
    super("notificatter", "BroadcastNotificationsData", NOTIFICATION_SOCKET_ID);
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Initializes the private vars and subscribes to the hub
   * 
   * @access public
   * @param {string} publicUserId The public user id of the logged user
   * @param {NotificationMessage[]} messages The unread notifications
   * that user already have
   */
  public initialize(publicUserId:string, messages:NotificationMessage[]){
    this.__publicUserId = publicUserId;
    this.__notifications.next(messages);
    this.subscribeHub();
  }

  /**
   * Remove a notification from the array of the notifications
   * 
   * @access public
   * @param {NotificationMessage} message The message to remove
   */
  public readNotification(message:NotificationMessage){
    let index = this.__notifications.value.indexOf(message, 0);
    if(index>-1) this.__notifications.value.splice(index, 1);
  }

  /**
   * Resets the private vars
   */
  public reset(){
    this.setConnectionOff(this.__publicUserId);
    this.__notifications.next([]);
    this.__publicUserId = "";
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────
  //   :::::: I M P L E M E N T E D   A B S T R A C T   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Implements the hubConnection function.
   * Subscribe to the channel hub and manage
   * the notifications received
   * 
   * @access public
   */
  public subscribeHub(){
    this.getConnection().on(NOTIFICATION_SOCKET_ID+this.__publicUserId, 
      (message:any)=> this.addMessage(message));
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //  
  
  /**
   * Adds a notification to the array of the notifications
   * 
   * @access private
   * @param {NotificationMessage} message The notification message
   */
  private addMessage(message:NotificationMessage){
    this.__notifications.value.push(message);
  }
}
