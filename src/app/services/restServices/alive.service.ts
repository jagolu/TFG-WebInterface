import { Injectable } from '@angular/core';
import { Rest } from './Rest';
import { LoadingService } from '../visualServices/loading.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to do the http requests to the sockets functions 
 * 
 * @class
 * @extends Rest
 */
export class AliveService extends Rest{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The path to the alive http requests
   * 
   * @access private
   * @var {string} __alivePath
   */
  private __alivePath:string = "Alive/";


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {HttpClient} http For the Rest constructor 
   * @param {LoadingService} loading For the Rest constructor
   */
  constructor(http: HttpClient, loading: LoadingService) {
    super(http, loading);
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
   * @returns {Observable} The result of the request
   */
  public logChat(groupName:string){
    return this.getRequest(this.__alivePath+"ChatLogin",
    [{
        param: "groupName",
        value: groupName
    }], true);
  }
  
  /**
   * Get the notifications of the user
   * 
   * @access public
   * @returns {Observable} The result of the request
   */
  public getNotifications(){
    return this.getRequest(this.__alivePath+"NotificationsLogin", null, true);
  }
  
  /**
   * Reads a notification
   * 
   * @access public
   * @param {string} notId The id of the notification
   */
  public readNotification(notId:string){
    return this.getRequest(this.__alivePath+"WatchNotification", [{
      param: "id",
      value: notId
    }], true).subscribe();
  }
  
  /**
   * Reads all the notifications that the user has
   * 
   * @access public
   */
  public readAllNotifications(){
    return this.getRequest(this.__alivePath+"WatchAllNotifications", null, true).subscribe();
  }
}
