import { Injectable } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { LogUser, SignUser, SocialLog, ResetPassword } from 'src/app/models/models';
import { Rest } from './Rest';
import { HttpClient} from '@angular/common/http';
import { LoadingService } from 'src/app/services/visualServices/loading.service';
import { SessionService } from 'src/app/services/userServices/session.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GroupInfoService } from '../userServices/group-info.service';
import { UserInfoService } from '../userServices/user-info.service';
import { ChatService } from '../userServices/Hub/chat.service';
import { NotificationsService } from '../userServices/Hub/notifications.service';


@Injectable({
  providedIn: 'root'
})
/**
 * Service to do the authentication requests
 * 
 * @class
 * @extends Rest
 */
export class AuthenticationService extends Rest {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The base path to authorization requests
   * 
   * @access private
   * @readonly
   * @var {string} __authPath 
   */
  private readonly __authPath : string = "Authorization/";


  //
  // ────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor 
   * @param {HttpClient} http For RestService constructor 
   * @param {LoadingService} loading For RestService constructor
   * @param {AuthService} __authS For log the user with social media 
   * @param {SessionService} __sessionS For set and remove the session
   * @param {Router} __router For when the user logs out, redirect him to index
   * @param {GroupInfoService} __groupInfoS To reset the service info on logout
   * @param {UserInfoService} __userInfoS To reset the service info on logout
   * @param {ChatService} __chatS To reset the service info on logout
   * @param {NotificationsService} __notS To reset the service info on logout
   */
  constructor(http:HttpClient,  
              loading:LoadingService, 
              private __authS:AuthService, 
              private __sessionS:SessionService, 
              private __router:Router, 
              private __groupInfoS:GroupInfoService, 
              private __userInfoS:UserInfoService, 
              private __chatS:ChatService, 
              private __notS:NotificationsService){
    super(http, loading);
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Checks if the user is already authenticated, checks also if
   * the token has expired, if it is, remove the session
   * 
   * @access public
   * @return {Boolean} True if the user is already authenticated, false otherwise
   */
  public IsAuthenticated():Boolean{
    try{
      if(this.__sessionS.getExpiresAt() <= this.getUTCNow()) {
        this.__sessionS.removeSession();
        return false;
      }
      return true;
    }catch(Exception){
      return false;
    }
  }

  /**
   * Logs out an user, removing its session and redirecting him
   * to the index.
   * 
   * @access public
   */
  public logOut(){
    if(this.IsAuthenticated()) this.__authS.signOut().catch(Error);
    this.__sessionS.removeSession();
    this.__groupInfoS.removeInfo();
    this.__userInfoS.removeInfo();
    this.__router.navigate(['']);
    this.__chatS.reset();
    this.__notS.reset();
  }

  /**
   * Logs in or signs up an user with his social user (Facebook or Google)
   * 
   * @access public
   * @param {SocialLog} user The user account on Facebook or Google
   */
  public logSocialMedia(user:SocialLog){
    this.postRequest(user, this.__authPath+"SocialLog").subscribe();
  }

  /**
   * Check an email to validate it
   * 
   * @access public
   * @param {string} token The token associated to the user and his email
   */
  public checkEmailValidation(token:string){
    this.getRequest(this.__authPath+"Validate",[
      {
        param: "emailToken",
        value: token
      }
    ]).subscribe();
  }

  /**
   * Check an password token
   * 
   * @access public
   * @param {string} token The token associated to the user and his email
   */
  public checkPasswordToken(token:string){
    this.getRequest(this.__authPath+"checkPasswordToken",[
      {
        param: "passwordToken",
        value: token
      }
    ]).subscribe();
  }

  /**
   * Signs up a new user by the form
   * 
   * @access public
   * @param {SignUser} user The user object to sign up
   * @return {Observable} The result of the request 
   */
  public signUp(user:SignUser){
    return this.postRequest(user, this.__authPath+"SignUp");
  }

  /**
   * Logs an existing user by the form
   * 
   * @access public
   * @param {LogUser} user The object of the user to log
   * @return {Observable} The result of the request
   */
  public logIn(user:LogUser){
    return this.postRequest(user, this.__authPath+"LogIn");
  }

  /**
   * Refresh the token asking to the server for a new one 
   * 
   * @access public
   * @return {Observable} The result of the request
   */
  public refreshToken():Observable<any>{
    return this.postRequest({
      "token": this.__sessionS.getAPIToken()
    }, this.__authPath+"Refresh");
  }

  /**
   * Remember the password associated an user
   * The backend will send an email with a token to reset the password
   * 
   * @access public
   * @param {string} email The email which password which be remembered
   */
  public rememberPassword(email:string){
    this.postRequest({"email":email}, this.__authPath+"RememberPassword").subscribe();
  }

  /**
   * Change the password of an user account
   * 
   * @access public
   * @param {ResetPassword} newPass The password token & the new password
   */
  public resetPassword(newPass:ResetPassword){
    this.postRequest(newPass, this.__authPath+"ResetPassword").subscribe();
  }
  
  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Function to get the actual date-time in UTC in miliseconds
   * 
   * @access private
   * @return {int} The actual date-time in miliseconds
   */
  private getUTCNow():number{
    return Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate(),
      new Date().getUTCHours(),
      new Date().getUTCMinutes()
    );
  }
}