import { Injectable } from '@angular/core';
import { Rest } from './Rest';
import { LoadingService } from '../visualServices/loading.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to do the chat requests & communicate with the chat socket
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
   * @param {HttpClient} http For the RestService constructor 
   * @param {LoadingService} loading For the RestService constructor
   * @param {ChatMessagesService} userChat For the visual messages in the chat
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
   * Log to an specific group chat, subscribes to 
   * the response and get the public Id and initializes
   * a new group and its messages on the userChat service
   * 
   * @access public
   * @param {string} groupName The name of the group
   */
  public logChat(groupName:string){
    return this.getRequest(this.__alivePath+"ChatLogin",
    [{
        param: "groupName",
        value: groupName
    }], true);
  }
}
