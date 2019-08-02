import { Component, OnInit } from '@angular/core';
import { GroupUser, IconModel, Icons } from 'src/app/models/models';
import { GroupService } from 'src/app/services/restServices/group.service';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styles: []
})
export class GroupUsersComponent implements OnInit{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * A icon of a crown
   * 
   * @access public
   * @var {IconModel} icon_crown
   */
  public icon_crown:IconModel = Icons.CROWN;

  /**
   * A icon of a wizard hat
   * 
   * @access public
   * @var {IconModel} icon_wizard
   */
  public icon_wizard:IconModel = Icons.WIZARD;

  /**
   * A icon of a cog
   * 
   * @access public
   * @var {IconModel} icon_cog
   */
  public icon_cog:IconModel = Icons.COG;

  /**
   * A icon of a normal user
   * 
   * @access public
   * @var {IconModel} icon_user
   */
  public icon_user:IconModel = Icons.USER;

  /**
   * A icon of a blue i
   * 
   * @access public
   * @var {IconModel} icon_info
   */
  public icon_info:IconModel = Icons.INFO;

  /**
   * A icon of a coin
   * 
   * @access public
   * @var {IconModel} icon_coin
   */
  public icon_coin:IconModel = Icons.COIN;

  /**
   * The members of the group
   * 
   * @access public
   * @var {GroupUser[]} members
   */
  public members:GroupUser[] = [];

  /**
   * The role of the user in the group`
   * 
   * @access public
   * @var {string} user_role
   */
  public user_role:string;

  /**
   * The name of the group
   * 
   * @access private
   * @var {string} _groupName
   */
  private _groupName:string;
  

  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {GroupService} __groupS To the group http requests
   * @param {GroupInfoService} __groupPage To get the members of the group
   */
  constructor(private __groupS:GroupService, private __groupPage:GroupInfoService) { }

  /**
   * Get the info of the group
   * 
   * @OnInit
   */
  ngOnInit(){
    this.__groupPage.info.subscribe(page=>{
      try{
        this._groupName = page.name;
        this.members = page.members;
        this.user_role = page.members ? page.members[page.members.length-1].role : "";
      }catch(Error){}
    });
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Give to remove the group admin role to 
   * a member of the group
   * 
   * @access public
   * @param {string} publicUserId The public id of the user
   * @param {Boolean} make True to give the role, false to remove it
   */
  public manageAdmin(publicUserId:string, make:Boolean){
    this.__groupS.makeAdmin({
      "publicid" : publicUserId,
      "groupName": this._groupName,
      "make_unmake": make
    });
  }

  /**
   * Kicks a user from the group
   * 
   * @access public
   * @param {string} publicUserId The public id of the user
   */
  public kick(publicUserId:string){
    this.__groupS.kickUser({
      "groupName": this._groupName,
      "publicId": publicUserId
    });
  }

  /**
   * Blocks a user from the group
   * 
   * @access public
   * @param {string} publicUserId The public id of the user
   * @param {Boolean} block True to block the user, false to unblock him
   */
  public block(publicUserId:string, block:Boolean){
    this.__groupS.blockUser({
      "groupName": this._groupName,
      "publicid": publicUserId,
      "make_unmake": block
    });
  }
}