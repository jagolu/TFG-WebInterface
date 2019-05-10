import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../visualServices/loading.service';
import { BuyInfo } from 'src/app/models/models';

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
   * Function to do a buy
   * 
   * @access public
   * @param {BuyInfo} item The info of the item to buy
   * @return {Observable} The result of the request 
   */
  public doABuy(item:BuyInfo){
    return this.postRequest(item, this._shopPath+"Buy");
  }

  /**
   * Function to get all the offers which exists
   * 
   * @access public
   * @return {Observable} The result of the request
   */
  public getAllOffers(){
    return this.getRequest(this._shopPath+"GetAllOffers");
  }
}
