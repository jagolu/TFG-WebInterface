import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rest } from './Rest';
import { LoadingService } from '../visualServices/loading.service';
import { JoinGroup, MakeUnmake_admin_block, KickUser, GroupPage, ManagePassword, RemoveGroup, ManageWeeklyPay } from 'src/app/models/models';
import { SessionService } from '../userServices/session.service';
import { GroupInfoService } from '../userServices/group-info.service';


@Injectable({
  providedIn: 'root'
})
/**
 * Service to do the group requests
 * 
 * @class
 * @extends Rest
 */
export class GroupService extends Rest{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The path to the group requests
   * 
   * @access private
   * @readonly
   * @var {string} __groupPath
   */
  private readonly __groupPath : string = "Group/";


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {HttpClient} http For RestService constructor 
   * @param {LoadingService} loading For RestService constructor 
   * @param {SessionService} __sessionS To get the user groups
   * @param {GroupInfoService} __groupInfoS To get the saved info of the group
   */
  constructor(http: HttpClient, loading: LoadingService, 
              private __sessionS:SessionService, private __groupInfoS:GroupInfoService) { 
    super(http, loading);
  }

  
  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Function to create a new group to the user
   * 
   * @access public
   * @param {CreateGroup} group The new group to create 
   * @return {Observable} The result of the request
   */
  public createGroup(group:string){
    return this.getRequest(this.__groupPath+"CreateGroup",[{
      param: "groupName",
      value: group
    }]).subscribe(
      _=> this.reloadGroups()
    );
  }

  /**
   * AJAX call to check the name of a group
   * 
   * @access public
   * @param {string} name The name of the group
   * @return {Observable} The result of the request
   */
  public checkGroupName(name:string){
    return this.getRequest(this.__groupPath+"CheckGroupName",
    [
      {
        param: "name",
        value : name
      }
    ], true);
  }

  /**
   * Get the info of the group needed to fill the group page
   * 
   * @access public
   * @param {string} name The group name
   * @return {Observable} The result of the request
   */
  public getPageGroup(name:string){
    this.getRequest(this.__groupPath+"GroupPage", 
    [
      {
        param:"groupName",
        value: name
      }
    ]).subscribe(
      (page:GroupPage)=> this.__groupInfoS.updateInfo(page)
    );
  }

  /**
   * AJAX call to search groups by group name
   * 
   * @access public
   * @param {string} name The name of the group
   * @return {Observable} The result of the request
   */
  public getGroups(name:string){
    return this.getRequest(this.__groupPath+"SearchGroup", 
    [
      {
        param : "name",
        value : name
      }
    ], true);
  }

  /**
   * Get request to get all the group in the app
   * 
   * @access public
   * @return {Observable} The result of the request
   */
  public getAllGroups(){
    return this.getRequest(this.__groupPath+"GetAllGroups", null, true);
  }
  
  /**
   * Post request to join a user in a group
   * 
   * @access public
   * @param {JoinGroup} joinGroupInfo The info to 
   * make the request 
   */
  public joinGroup(joinGroupInfo:JoinGroup){
    this.postRequest(joinGroupInfo, this.__groupPath+"JoinGroup", true).subscribe(
      _=> this.reloadGroups()
    );
  }
 
  /**
   * Get request for a user leaves a group
   * 
   * @access public
   * @param {string} groupName The name of the group
   */
  public leaveGroup(groupName:string){
    this.getRequest(this.__groupPath+"LeaveGroup", 
    [
      {
        param: "groupName",
        value: groupName
      }
    ]).subscribe(
      _=> this.reloadGroups()
    );
  }

  /**
   * Give to another user in a group the role of group admin
   * 
   * @access public
   * @param {MakeUnmake_admin_block} order The order to make or unmake 
   * the user 
   */
  public makeAdmin(order:MakeUnmake_admin_block){
    this.postRequest(order, this.__groupPath+"MakeAdmin").subscribe(
      (page:GroupPage)=>this.__groupInfoS.updateInfo(page)
    );
  }

  /**
   * Kick the user from the group
   * 
   * @access public
   * @param {KickUser} order The order to kick the user
   */
  public kickUser(order:KickUser){
    this.postRequest(order, this.__groupPath+"RemoveUser").subscribe(
      (page:GroupPage)=> this.__groupInfoS.updateInfo(page)
    );
  }

  /**
   * Kick the user from the group
   * 
   * @access public
   * @param {MakeUnmake_admin_block} order The order to block or
   * unblock the user
   */
  public blockUser(order:MakeUnmake_admin_block){
    this.postRequest(order, this.__groupPath+"BlockUser").subscribe(
      (page:GroupPage) => this.__groupInfoS.updateInfo(page)
    );
  }

  /**
   * Set a password to the group
   * 
   * @access public
   * @param {ManagePassword} order The order to manage the 
   * password of the group 
   */
  public managePassword(order:ManagePassword){
    this.postRequest(order, this.__groupPath+"ManagePassword").subscribe(
      (page:GroupPage) => this.__groupInfoS.updateInfo(page)
    );
  }

  /**
   * Removes a group
   * 
   * @access public
   * @param {RemoveGroup} order The order to remove group
   */
  public removeGroup(order:RemoveGroup){
    this.postRequest(order, this.__groupPath+"RemoveGroup").subscribe(
      _=> this.reloadGroups()
    );
  }

  /**
   * Changes the group pay
   * 
   * @access public
   * @param {ManageWeeklyPay} order The order to manage the 
   * weekly pay
   */
  public changeWeekPay(order:ManageWeeklyPay){
    this.postRequest(order, this.__groupPath+"ManageWeekPay").subscribe(
      (page:GroupPage) => this.__groupInfoS.updateInfo(page)
    );
  }

  /**
   * Reloads the user groups
   * 
   * @access public
   * @param {Boolean} load True to show the loading view, false otherwise
   * @returns {Observable} The result of the request
   */
  public reloadUserGroups(load:Boolean){
    return this.getRequest(this.__groupPath+"ReloadUserGroups", null, load);
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Function to update the groups of the user with all the groups which the user is
   * 
   * @access private
   */
  private reloadGroups(){
    this.reloadUserGroups(true).subscribe(
      (groups:string[])=>{
        this.__sessionS.updateGroups(groups);
      }
    );
  }
}