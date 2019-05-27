import { Injectable } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { LogUser, SignUser, SocialLog, ResetPassword } from 'src/app/models/models';
import { RestService } from './rest.service';
import { HttpClient} from '@angular/common/http';
import { LoadingService } from 'src/app/services/visualServices/loading.service';
import { SessionService } from 'src/app/services/userServices/session.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

/**
 * Service to do the authentication requests
 * 
 * @class
 * @extends RestService
 */
export class AuthenticationService extends RestService {

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
   * @var {string} _authPath 
   */
  private readonly _authPath : string = "Authorization/";


  //
  // ────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor 
   * @param {HttpClient} _http For RestService constructor 
   * @param {LoadingService} _loading For RestService constructor
   * @param {AuthService} _authS For log the user with social media 
   * @param {SessionService} _sessionS For set and remove the session
   * @param {Router} _router For when the user logs out, redirect him to index
   */
  constructor(_http:HttpClient,  _loading:LoadingService, 
              private _authS:AuthService, private _sessionS:SessionService, private _router:Router){
    super(_http, _loading);
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
      if(this._sessionS.getExpiresAt() <= this.getUTCNow()) {
        this._sessionS.removeSession();
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
    this._authS.signOut().catch(Error);
    this._sessionS.removeSession();
    this._router.navigate(['']);
  }

  /**
   * Logs in or signs up an user with his social user (Facebook or Google)
   * 
   * @access public
   * @param {SocialLog} user The user account on Facebook or Google
   */
  public logSocialMedia(user:SocialLog){
    this.postRequest(user, this._authPath+"SocialLog").subscribe();
  }

  /**
   * Check an email to validate it
   * 
   * @access public
   * @param {string} token The token associated to the user and his email
   */
  public checkEmailValidation(token:string){
    this.getRequest(this._authPath+"Validate",[
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
    this.getRequest(this._authPath+"checkPasswordToken",[
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
    return this.postRequest(user, this._authPath+"SignUp");
  }

  /**
   * Logs an existing user by the form
   * 
   * @access public
   * @param {LogUser} user The object of the user to log
   * @return {Observable} The result of the request
   */
  public logIn(user:LogUser){
    return this.postRequest(user, this._authPath+"LogIn");
  }

  /**
   * Refresh the token asking to the server for a new one 
   * 
   * @access public
   * @return {Observable} The result of the request
   */
  public refreshToken():Observable<any>{
    return this.postRequest({
      "token": this._sessionS.getAPIToken()
    }, this._authPath+"Refresh");
  }

  /**
   * Remember the password associated an user
   * The backend will send an email with a token to reset the password
   * 
   * @access public
   * @param {string} email The email which password which be remembered
   */
  public rememberPassword(email:string){
    this.postRequest({"email":email}, this._authPath+"RememberPassword").subscribe();
  }

  /**
   * Change the password of an user account
   * 
   * @access public
   * @param {ResetPassword} newPass The password token & the new password
   */
  public resetPassword(newPass:ResetPassword){
    this.postRequest(newPass, this._authPath+"ResetPassword").subscribe();
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