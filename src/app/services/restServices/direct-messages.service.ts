import { Injectable } from '@angular/core';
import { Rest } from './Rest';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../visualServices/loading.service';
import { CreateDMTitle } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class DirectMessagesService extends Rest{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The path to the home http requests
   * 
   * @access private
   * @var {string} __dmPath
   */
  private __dmPath:string = "DirectMessages/";


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
   * Get the direct messages titles
   * 
   * @access public
   * @returns {Observable} The result of the request
   */
  public loadDMTitles(){
    return this.getRequest(this.__dmPath+"LoadDMTitles", null);
  }
  
  /**
   * Get the direct messages titles
   * 
   * @access public
   * @param {CreateDMTitle} order The order to launch the new DM
   * @returns {Observable} The result of the request
   */
  public launchDMTitle(order:CreateDMTitle){
    return this.postRequest(order, this.__dmPath+"CreateDMTitle");
  }
}
