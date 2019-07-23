import { Injectable } from '@angular/core';
import { Rest } from './Rest';
import { LoadingService } from '../visualServices/loading.service';
import { HttpClient } from '@angular/common/http';
import { LaunchFootballBet, UserFootballBet, GroupPage, CancelUserFootballBet } from 'src/app/models/models';
import { GroupInfoService } from '../userServices/group-info.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to do the bet requests
 * 
 * @class
 * @extends Rest
 */
export class BetService extends Rest{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The path to the bet requests
   * 
   * @access private
   * @readonly
   * @var {string} __betPath
   */
  private readonly __betPath : string = "Bet/";


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {HttpClient} http For RestService constructor
   * @param {LoadingService} loading For RestService constructor
   * @param {GroupInfoService} __groupPageS For update the group page info
   */
  constructor(http: HttpClient, loading: LoadingService, private __groupPageS:GroupInfoService) { 
    super(http, loading);
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Get the info of the group needed to fill the group page
   * 
   * @access public
   * @param {string} name The group name
   * @return {Observable} The result of the request
   */
  public getLaunchFootballBet(name:string){
    return this.getRequest(this.__betPath+"FootBallBetPage", 
    [
      {
        param: "groupName",
        value: name
      }
    ]);
  }

  /**
   * Launch a new football bet
   * 
   * @access public
   * @param {LaunchFootballBet} order The details of the request
   * @return {Observable} The result of the request
   */
  public launchBet(order:LaunchFootballBet){
    return this.postRequest(order, this.__betPath+"LaunchFootBallBet");
  }

  /**
   * Do a user football bet in a football bet
   * 
   * @access public
   * @param {UserFootballBet} order The details of the request
   */
  public doFootballBet(order:UserFootballBet){
    this.postRequest(order, this.__betPath+"DoFootballBet").subscribe(
      (page:GroupPage)=> this.__groupPageS.updateInfo(page)
    );
  }

  /**
   * Cancel a user football bet
   * 
   * @access public
   * @param {CancelUserFootballBet} order The details of the request
   */
  public cancelUserFootballBet(order:CancelUserFootballBet){
    this.postRequest(order, this.__betPath+"CancelUserFootballBet").subscribe(
      (page:GroupPage)=> this.__groupPageS.updateInfo(page)
    );
  }

  /**
   * Cancel a football bet
   * 
   * @access public
   * @param {string} betId The id of the bet to cancel
   */
  public cancelFootballBet(betId:string){
    this.getRequest(this.__betPath+"CancelFootballBet",[{
      param: "betId",
      value: betId
    }]).subscribe(
      (page:GroupPage)=> this.__groupPageS.updateInfo(page)
    );
  }
}
