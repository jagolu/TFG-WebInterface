import { Injectable } from '@angular/core';
import { Rest } from './Rest';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from 'src/app/services/visualServices/loading.service';
import { ChangeUserInfo, DeleteUser } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to do the user requests
 * 
 * @class
 * @extends Rest
 */
export class UserService extends Rest{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The path to the user requests
   * 
   * @access private
   * @readonly
   * @var {string} _userPath
   */
  private readonly _userPath : string = "User/";


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {HttpClient} _http For RestService constructor 
   * @param {LoadingService} _loading For RestService constructor 
   */
  constructor(_http:HttpClient, _loading:LoadingService) { 
    super(_http, _loading);
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Function to get the account options of the user
   * 
   * @access public
   * @return {Observable} The result of the request
   */
  public getUserOptions(){
    return this.getRequest(this._userPath+"UserInfo");
  }

  /**
   * Change the account options of the user
   * 
   * @access public
   * @param {ChangeUserInfo} info The new account options 
   * @return {Observable} The result of the request
   */
  public changeUserInfo(info:ChangeUserInfo){
    return this.postRequest(info,this._userPath+"ChangeUserInfo");
  }

  /**
   * Delete the user account
   * 
   * @access public
   * @param {DeleteUser} user The user to delete
   * @return {Observable} The result of the request
   */
  public deleteUser(user:DeleteUser){
    return this.postRequest(user, this._userPath+"DeleteAccount");
  }
}
