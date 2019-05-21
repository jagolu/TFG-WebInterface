import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GroupPage } from 'src/app/models/models';
import { GroupService } from '../restServices/group.service';

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
   * 
   * @param {GroupService} _groupS To do the request to get the group page info
   */
  constructor(private _groupS:GroupService) { }

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
   * Function to get the group info to fill the page and
   * set that info on the info observable
   * 
   * @access public
   * @param {string} name The name of the group
   */
  public getGroup(name:string){
    this._groupS.getPageGroup(name).subscribe((group:any)=>{
        this.updateInfo({
          "name": group.groupName,
          "type": group.groupType,
          "role": group.role,
          "members": group.members,
          "bets": group.bets
        });
    });
  }
}
