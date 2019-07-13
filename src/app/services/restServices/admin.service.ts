import { Injectable } from '@angular/core';
import { Rest } from './Rest';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../visualServices/loading.service';
import { BanUser, BanGroup } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to do the http requests to the admin functions 
 * 
 * @class
 * @extends Rest
 */
export class AdminService extends Rest{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The path to the home http requests
   * 
   * @access private
   * @var {string} __adminPath
   */
  private __adminPath:string = "Admin/";


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {HttpClient} http For the Rest constructor 
   * @param {LoadingService} loading For the Rest constructor
   */
  constructor(http: HttpClient, loading: LoadingService) {
    super(http, loading);
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Get the news
   * 
   * @access public
   * @param {string} message The message to publish
   * @returns {Observable} The result of the request
   */
  public publishNew(message:string){
    return this.postRequest({"message": message}, this.__adminPath+"LaunchNew");
  }
  
  /**
   * Ban or unban an user
   * 
   * @access public
   * @param {BanUser} ban The order to ban
   * @returns {Observable} The result of the request
   */
  public banUser(ban:BanUser){
    return this.postRequest(ban, this.__adminPath+"BanUser");
  }
  
  /**
   * Ban or unban a group
   * 
   * @access public
   * @param {BanGroup} ban The order to ban
   * @returns {Observable} The result of the request
   */
  public banGroup(ban:BanGroup){
    return this.postRequest(ban, this.__adminPath+"BanGroup");
  }
  
  /**
   * Get all the users
   * 
   * @access public
   * @returns {Observable} The result of the request
   */
  public getAllUsers(){
    return this.getRequest(this.__adminPath+"GetAllUsers", null);
  }

  /**
   * Get the users with similar username or email
   * 
   * @access public
   * @param {string} toFind The key word to find
   * @returns {Observable} The result of the request
   */
  public getUser(toFind:string){
    return this.getRequest(this.__adminPath+"SearchUser", [{
      param: "toFind",
      value: toFind
    }], true);
  }
}