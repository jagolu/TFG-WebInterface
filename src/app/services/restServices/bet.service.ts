import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
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
 * @extends RestService
 */
export class BetService extends RestService{

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
   * @var {string} _betPath
   */
  private readonly _betPath : string = "Bet/";


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {HttpClient} http For RestService constructor
   * @param {LoadingService} loading For RestService constructor
   * @param {GroupInfoService} groupPageS For update the group page info
   */
  constructor(http: HttpClient, loading: LoadingService, private groupPageS:GroupInfoService) { 
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
    return this.getRequest(this._betPath+"FootBallBetPage", 
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
    return this.postRequest(order, this._betPath+"LaunchFootBallBet");
  }

  /**
   * Do a user football bet in a football bet
   * 
   * @access public
   * @param {UserFootballBet} order The details of the request
   */
  public doFootballBet(order:UserFootballBet){
    this.postRequest(order, this._betPath+"DoFootballBet").subscribe(
      (page:GroupPage)=> this.groupPageS.updateInfo(page)
    );
  }

  /**
   * Cancel a user football bet
   * 
   * @access public
   * @param {CancelUserFootballBet} order The details of the request
   */
  public cancelUserFootballBet(order:CancelUserFootballBet){
    this.postRequest(order, this._betPath+"CancelUserFootballBet").subscribe(
      (page:GroupPage)=> this.groupPageS.updateInfo(page)
    );
  }
}
