import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../visualServices/loading.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to do the shop requests
 * 
 * @class
 * @extends RestService
 */
export class ShopService extends RestService{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The path to the shop requests
   * 
   * @access private
   * @var {string} _shopPath
   */
  private _shopPath : string = "Shop/";


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {HttpClient} http For RestService constructor 
   * @param {LoadingService} loading For RestService constructor 
   */
  constructor(http:HttpClient, loading:LoadingService) { 
    super(http, loading);
  }

  
  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Function to add buy more capacity to an existing group
   * 
   * @access public
   * @param {string} groupName The name of the group 
   * @param {int} morePlaces How much places add to the actual capacity of the group
   * @return {Observable} The result of the request 
   */
  public addGroupCapacity(groupName:string, morePlaces:number){
    return this.getRequest(this._shopPath+"AddGroupCapacity?"+
          "groupName="+groupName+"&morePlaces="+morePlaces, null, true);
  }
}
