import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { LoadingService } from '../visualServices/loading.service';
import { CreateGroup } from 'src/app/models/models';
import { SessionService } from '../userServices/session.service';


@Injectable({
  providedIn: 'root'
})
/**
 * Service to do the group requests
 * 
 * @class
 * @extends RestService
 */
export class GroupService extends RestService{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The path to the group requests
   * 
   * @access private
   * @var {string} _groupPath
   */
  private _groupPath : string = "Group/";


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {HttpClient} http For RestService constructor 
   * @param {LoadingService} loading For RestService constructor 
   * @param {SessionService} sessionS To get the user groups
   */
  constructor(http: HttpClient, loading: LoadingService, 
              private sessionS:SessionService) { 
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
  public createGroup(group:CreateGroup){
    return this.postRequest(group, this._groupPath+"CreateGroup").subscribe(
      ok=> this.sessionS.addGroup({
        "name": group.name,
        "type": group.type
      })
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
    return this.getRequest(this._groupPath+"CheckGroupName?name="+name,null, true);
  }

  /**
   * Get the info of the group needed to fill the group page
   * 
   * @access public
   * @param {string} name The group name
   * @return {Observable} The result of the request
   */
  public getPageGroup(name:string){
    return this.getRequest(this._groupPath+"GroupPage?groupName="+name, null);
  }

  /**
   * AJAX call to search groups by group name
   * 
   * @access public
   * @param {string} name The name of the group
   * @return {Observable} The result of the request
   */
  public getGroups(name:string){
    return this.getRequest(this._groupPath+"SearchGroup?name="+name, null, true);
  }

  /**
   * Get request to get all the group in the app
   * 
   * @access public
   * @return {Observable} The result of the request
   */
  public getAllGroups(){
    return this.getRequest(this._groupPath+"GetAllGroups", null, true);
  }
}