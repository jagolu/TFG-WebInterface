import { Injectable } from '@angular/core';
import { SessionStorage } from 'src/app/models/Identity/SessionStorage';
import { BehaviorSubject } from 'rxjs';
import { Session, Group } from 'src/app/models/models';

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
   * @var {string} sessionStorageKey
   */
  private sessionStorageKey = "session";

  /**
   * The var to save the sessionStorage info
   * 
   * @access private
   * @var {BehaviorSubject<Session>} user
   */
  private user = new BehaviorSubject<Session>(null);

  /**
   * The var at which other components will subscribe to
   * get the user info
   * 
   * @access public
   * @var {Observable} User
   */
  public User = this.user.asObservable();


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
  
  /**
   * Gets the API Session Token
   * 
   * @access public
   * @return {string} The api session token or an 0-lenght string
   * if the token doesn't exists
   */
  public getAPIToken(){
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
  public getExpiresAt(){
    try{
      return this.getSession().expires_at;
    }catch(Exception){
      return 0;
    }
  }

  /**
   * Sets the session info at the sessionStorage
   * 
   * @access public
   * @param {SessionStorage} user The info to store
   */
  public setSession(user: SessionStorage){
    sessionStorage.setItem(
      this.sessionStorageKey, JSON.stringify({
        "api_token":user.api_token,
        "role":user.role,
        "expires_at": this.getUTCFromNow20Min(),
        "groups": user.groups
      })
    );

    this.updateUser({
      "role": user.role,
      "groups": user.groups
    });
  }

  /**
   * Renew an existing token 
   * 
   * @access public
   * @param {SessionStorage} user The session info 
   */
  public renewToken(user: SessionStorage){
    this.removeSession();
    this.setSession(user);
    this.updateUser({
      "role": user.role,
      "groups": user.groups
    });
  }

  /**
   * Update the session of an user
   * 
   * @access public
   * @param {Session} user The session info to update 
   */
  public updateUser(user:Session):void{
    this.user.next(user);
  }

  /**
   * Add a gruop to the session info
   * 
   * @access public
   * @param {Group} group The group to add 
   */
  public addGroup(group:Group){
    let nowGroups:Group[] = this.getSession().groups;
    nowGroups.push(group);
    this.renewToken({
      "api_token": this.getAPIToken(),
      "role": this.getSession().role,
      "groups": nowGroups
    });
  }

  // removeGroup(group:Group){
    // TODO Implementar la funcion de borrar un grupo cuando tengamos la funcionalidad de añadir miembros y tal
  // }

  /**
   * Removes the session info stored at sessionStorage
   * 
   * @access public
   */
  public removeSession(){
    sessionStorage.removeItem(this.sessionStorageKey);
    this.updateUser(null);
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
  private getSession(){
    return JSON.parse(sessionStorage.getItem(this.sessionStorageKey));
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
}