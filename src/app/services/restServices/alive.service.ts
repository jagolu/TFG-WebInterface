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
}
