import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GroupPage } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to view the group info in all the components
 * like an observable
 * 
 * @class
 */
export class GroupInfoService {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The behaviour of the group info
   * 
   * @access private
   * @var {BehaviorSubject<UserInfo>} __information
   */
  private __information = new BehaviorSubject<GroupPage>(null);

  /**
   * The info at which the other components will subscribe at
   * 
   * @access public
   * @var {Observable} info
   */
  public info = this.__information.asObservable();


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   */
  constructor() { }

  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Update the group info of the service
   * 
   * @access public
   * @param {GroupPage} info The info to update
   */
  public updateInfo(info:GroupPage){
    //Update the group page info which is at info var
    this.__information.next(info);
  }

  /**
   * Cleans the info of the observable
   * 
   * @access public
   */
  public removeInfo(){
    this.__information.next({
      "actualCapacity": 0,
      "myBets":[],
      "manageBets":[],
      "betsHistory": [],
      "bets":[],
      "createDate": "",
      "dateJoin": "",
      "dateRole": "",
      "hasPassword": false,
      "maxCapacity": 0,
      "members": [],
      "name": "",
      "news" : []
    });
  }
}
