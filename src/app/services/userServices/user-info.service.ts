import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to view the user info in all the components
 * like an observable
 * 
 * @class
 */
export class UserInfoService {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The behaviour of the user info
   * 
   * @access private
   * @var {BehaviorSubject<UserInfo>} information
   */
  private information = new BehaviorSubject<UserInfo>(null);

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
   * Update the user info of the service
   * 
   * @access public
   * @param {UserInfo} info The info to update
   */
  public updateInfo(info:UserInfo){
    //Update the user info which is at info var
    this.information.next(info);
  }
}
