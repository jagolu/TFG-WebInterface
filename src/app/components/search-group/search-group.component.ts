import { Component } from '@angular/core';
import { GroupInfo, IconModel, Icons, GroupMemberAdmin } from 'src/app/models/models';
import { GroupService } from 'src/app/services/restServices/group.service';
import { AlertService } from 'src/app/services/visualServices/alert.service';
import { SessionService } from 'src/app/services/userServices/session.service';
import { AdminService } from 'src/app/services/restServices/admin.service';


@Component({
  selector: 'app-search-group',
  templateUrl: './search-group.component.html',
  styles: []
})
/**
 * Class to search groups by their name
 * 
 * @class
 */
export class SearchGroupComponent{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The groups which will show in the view and their info
   * 
   * @access public
   * @var {GroupInfo[]} groups
   */
  public groups:GroupInfo[];

  /**
   * To diferenciate the url from joinNewGroup and look groups (admin function)
   * 
   * @access public
   * @var {Boolean} joinGroups
   */
  public joinGroups:Boolean;

  /**
   * Var to get the ball icon
   * 
   * @access public
   * @var {IconModel} icon_ball
   */
  public icon_ball:IconModel = Icons.BALL;

  /**
   * Var to get the key icon
   * 
   * @access public
   * @var {IconModel} icon_key
   */
  public icon_key:IconModel = Icons.KEY;

  /**
   * The groups which the user is joined at
   * 
   * @var {string[]} userGroups
   */
  private userGroups:string[];

  /**
   * To know what was the last find
   * 
   * @access private
   * @var {string} _lastFind
   */
  private _lastFind:string = "";


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {GroupService} __groupS The service to get the groups
   * @param {AlertService} __alertS The service to manage the alerts
   * @param {SessionService} __sessionS The service to get the groups
   * at which the user is already joined
   * @param {AdminService} __adminS To ban unban the groups
   */
  constructor(private __groupS:GroupService, private __adminS:AdminService, 
              private __alertS:AlertService, private __sessionS:SessionService) { 
    this.getAllGroups();
    this.joinGroups = !this.__sessionS.isAdmin();
    this.__sessionS.User.subscribe(u => {
        if(u != null) this.userGroups = u.groups;
        else this.userGroups = [];
    });
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Function to search the groups by their name. If the name
   * is null or 0-length it will find all the groups.
   * 
   * @access public
   * @param {string} name The name of the groups to find 
   * @
   */
  public search(name:string){
    this._lastFind = name;
    if(name.length == 0 || name == null) this.getAllGroups();
    else this.getGroupsByName(name);
  }

  /**
   * Launch the alert to join in a group
   * 
   * @access public
   * @param {string} name The name of the group 
   * @param {boolean} needPass A filter to show or not
   * the form 
   */
  public joinGroup(name:string, needPass:boolean){
    this.__alertS.joinGroup(needPass, name);
  }

  /**
   * Check if the user is already joined in the
   * group
   * 
   * @access public
   * @param {string} groupName The name of the group
   * @return {Boolean} True if the user is already joined
   * in the group, false otherwise
   */
  public isJoinedInGroup(groupName:string):Boolean{
    let isIn = false;
    this.userGroups.forEach(group=>{
      if(group == groupName) isIn = true;
    });
    return isIn;
  }

  /**
   * Launch an alert to see the group members
   * 
   * @param {GroupMemberAdmin[]} members The members of the group
   * @param {string} name The name of the group
   */
  public watchUsers(members:GroupMemberAdmin[], name:string){
    this.__alertS.seeGroupMembers(members, name);
  }

  /**
   * Bans a group
   * 
   * @param {string} name The name of the group
   * @param {Boolean} ban True to ban the group, false to unban  it
   */
  public banGroup(name:string, ban:Boolean){
    this.__adminS.banGroup({
      "groupName": name,
      "ban": ban
    }).subscribe(_=> this.search(this._lastFind));
  }

  /**
   * Says if the current user is an admin or not
   */
  public isAdmin():Boolean{
    return this.__sessionS.isAdmin();
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Function to get all the groups in the app and
   * save them in the groups var
   * 
   * @access private
   */
  private getAllGroups(){
    this.__groupS.getAllGroups().subscribe(
      (groupsRes:any) =>  this.groups = groupsRes
    );
  }

  /**
   * Get the groups which include the words in
   * its name
   * 
   * @access private
   * @param {string} name The name of the groups to find 
   */
  private getGroupsByName(name:string){
    this.__groupS.getGroups(name).subscribe(
      (groupsRes:any)=> this.groups = groupsRes
    );
  }
}