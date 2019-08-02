import { Injectable } from '@angular/core';
import { SessionStorage } from 'src/app/models/Identity/SessionStorage';
import { BehaviorSubject } from 'rxjs';
import { Session } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to manage the user session
 * 
 * @class
 */
export class SessionService {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The key with which the info will be saved
   * in the sessionStorage
   * 
   * @access private
   * @readonly
   * @var {string} __sessionStorageKey
   */
  private readonly __sessionStorageKey = "session";

  /**
   * The var to save the sessionStorage info
   * 
   * @access private
   * @var {BehaviorSubject<Session>} __user
   */
  private __user = new BehaviorSubject<Session>(null);

  /**
   * The var at which other components will subscribe to
   * get the user info
   * 
   * @access public
   * @var {Observable} User
   */
  public User = this.__user.asObservable();


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Tries to update a session if the user token is still valid
   * else, set a null value at the sessionStorage
   * 
   * @constructor
   */
  constructor() { 
    try{
      let u = this.getSession();
      this.updateUser({
        "role": u.role,
        "username": u.username,
        "groups": u.groups
      });
    }catch(Exception){
      this.updateUser(null);
    }
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  

  //
  // ─── SESSIONSTORAGE GETTERS ─────────────────────────────────────────────────────
  //
  
  /**
   * Gets the API Session Token
   * 
   * @access public
   * @return {string} The api session token or an 0-lenght string
   * if the token doesn't exists
   */
  public getAPIToken():string{
    try{
      return this.getSession().api_token;
    }catch(Exception){
      return "";
    }
  }

  /**
   * Get the time in miliseconds that the token
   * will expires at
   * 
   * @access public 
   * @return {int} The time in miliseconds when the
   * token expires at or 0 if there is any exception
   */
  public getExpiresAt():number{
    try{
      return this.getSession().expires_at;
    }catch(Exception){
      return 0;
    }
  }



  //
  // ─────────────────────────────────────────────────── SESSIONSTORAGE GETTERS ─────
  //


  //
  // ─── SESSION MANAGEMENT ─────────────────────────────────────────────────────────
  //  

  /**
   * Sets the session info at the sessionStorage
   * 
   * @access public
   * @param {SessionStorage} user The info to store
   */
  public setSession(user: SessionStorage):void{
    sessionStorage.setItem(
      this.__sessionStorageKey, JSON.stringify({
        "api_token":user.api_token,
        "role":user.role,
        "username": user.username,
        "expires_at": this.getUTCFromNow20Min(),
        "groups": user.groups
      })
    );

    this.updateUser({
      "role": user.role,
      "username": user.username,
      "groups": user.groups
    });
  }

  /**
   * Renew an existing token 
   * 
   * @access public
   * @param {SessionStorage} user The session info 
   */
  public renewToken(user: SessionStorage):void{
    this.removeSession();
    this.setSession(user);
    this.updateUser({
      "role": user.role,
      "username": user.username,
      "groups": user.groups
    });
  }

  /**
   * Removes the session info stored at sessionStorage
   * 
   * @access public
   */
  public removeSession():void{
    sessionStorage.removeItem(this.__sessionStorageKey);
    this.updateUser(null);
  }

  //
  // ─────────────────────────────────────────────────────── SESSION MANAGEMENT ─────
  //


  //
  // ─── USERSESSION MANAGEMENT ─────────────────────────────────────────────────────
  //

  /**
   * Function to fully update the groups of the user
   * 
   * @access public
   * @param {string[]} groups ALL the groups of the user 
   */
  public updateGroups(groups:string[]):void{
    this.renewToken({
      "api_token": this.getAPIToken(),
      "role": this.getRole(),
      "username": this.getUsername(),
      "expires_at": this.getExpiresAt(),
      "groups": groups
    });
  }

  /**
   * Function to update de username of the user
   * 
   * @access public
   * @param {string} username The new username of the user
   */
  public updateUsername(username:string):void{
    this.renewToken({
      "api_token": this.getAPIToken(),
      "role": this.getRole(),
      "username": username,
      "expires_at": this.getExpiresAt(),
      "groups": this.getGroups(),
    });
  }

  //
  // ─────────────────────────────────────────────────── USERSESSION MANAGEMENT ─────
  //  

  /**
   * Says if the actual user is an admin or not
   * 
   * @returns {Boolean} True if the user is an admin,
   * false otherwise.
   */
  public isAdmin():Boolean{
    return this.getRole() == "ADMIN";
  }

  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Gets the session info stored in the sessionStorage
   * 
   * @access private
   * @return {Object} The session info
   */
  private getSession():SessionStorage{
    return JSON.parse(sessionStorage.getItem(this.__sessionStorageKey));
  }

  /**
   * Get the time in miliseconds from now to 20 mins later
   * 
   * @access private
   * @return {int} The time in miliseconds from now to 20 mins later
   */
  private getUTCFromNow20Min():number{
    return Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate(),
      new Date().getUTCHours(),
      new Date().getUTCMinutes()+20
    );
  }

  /**
   * Update the session of an user
   * 
   * @access private
   * @param {Session} user The session info to update 
   */
  private updateUser(user:Session):void{
    this.__user.next(user);
  }
  
  /**
   * Gets the role of the session
   * 
   * @access private
   * @return {string} The role of the user
   */
  private getRole():string{
    try{
      return this.getSession().role;
    }catch(Exception){
      return "";
    }
  }

  /**
   * Get the username of the session
   * 
   * @access private
   * @return {string} The username of the user
   */
  private getUsername():string{
    try{
      return this.getSession().username;
    }catch(Exception){
      return "";
    }
  }

  /**
   * Get the groups of the user
   * 
   * @access private
   * @return {string[]} The groups of the user
   */
  private getGroups():string[]{
    try{
      return this.getSession().groups;
    }catch(Exception){
      return [];
    }
  }
}