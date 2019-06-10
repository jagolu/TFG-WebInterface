import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GroupPage } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
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
   * @var {BehaviorSubject<UserInfo>} information
   */
  private information = new BehaviorSubject<GroupPage>(null);

  /**
   * The info at which the other components will subscribe at
   * 
   * @access public
   * @var {Observable} info
   */
  public info = this.information.asObservable();


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
    this.information.next(info);
  }

  /**
   * Cleans the info of the observable
   * 
   * @access public
   */
  public removeInfo(){
    this.information.next({
      "actualCapacity": 0,
      "myBets":[],
      "bets":[],
      "canPutPassword": false,
      "createDate": "",
      "dateJoin": "",
      "dateRole": "",
      "hasPassword": false,
      "maxCapacity": 0,
      "members": [],
      "name": "",
      "type": true
    });
  }
}
