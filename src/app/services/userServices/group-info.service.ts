import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GroupPage, GroupUserJoinedAt } from 'src/app/models/models';
import { GroupService } from '../restServices/group.service';
import { SessionService } from './session.service';

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
   * @param {SessionService} _sessionS To get the role of the group
   */
  constructor(private _groupS:GroupService, private _sessionS:SessionService) { }

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
      this._sessionS.User.subscribe(u=>{
        try{
          this.updateInfo({
            "name": group.groupName,
            "type": group.groupType,
            "role": this.getGroupRole(u.groups, group.groupName),
            "members": group.members,
            "bets": group.bets
          });
        }catch(Error){}
      });
    });
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Funtion to get the role from a specific group
   * 
   * @access private
   * @param {GroupUserJoinedAt[]} groups The groups which the user is
   * joined at 
   * @param {string} name The name of the group 
   * @return {string} The role of the group
   */
  private getGroupRole(groups:GroupUserJoinedAt[], name:string){
    let role = "";
    groups.forEach(group=>{
      if(group.name == name){
        role = group.role;
      }
    });
    return role;
  }
}
