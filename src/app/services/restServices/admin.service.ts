import { Injectable } from '@angular/core';
import { Rest } from './Rest';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../visualServices/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends Rest{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The path to the home http requests
   * 
   * @access private
   * @var {string} __adminPath
   */
  private __adminPath:string = "Admin/";


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
   * Get the news
   * 
   * @access public
   * @param {string} message The message to publish
   * @returns {Observable} The result of the request
   */
  public publishNew(message:string){
    return this.postRequest({"message": message}, this.__adminPath+"LaunchNew");
  }
}