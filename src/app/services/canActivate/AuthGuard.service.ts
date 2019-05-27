import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../restServices/authentication.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to ban a user to a route
 * 
 * @class 
 */
export class AuthGuardService implements CanActivate{
  
  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The activated url paths
   * 
   * @var {ActivatedRouteSnapshot[]} path
   */
  path: ActivatedRouteSnapshot[];

  /**
   * The activated url path
   * 
   * @var {ActivatedRouteSnapshot} route
   */
  route: ActivatedRouteSnapshot;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {AuthenticationService} authService 
   * @param {Router} router 
   */
  constructor(private authService:AuthenticationService, private router:Router) { }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Check if an user can access to a especific uri
   * 
   * @access public
   * @param {ActivatedRouteSnapshot} next The url the user is trying to access
   * @return {Boolean} True if the user is authenticated, false otherwise
   */
  public canActivate(next:ActivatedRouteSnapshot){
    let url = next.url.toString();
    if(url.includes("signUp") && this.authService.IsAuthenticated()) return false;
    if(url.includes("signUp") && !this.authService.IsAuthenticated()) return true;
    if(url.includes("logIn") && this.authService.IsAuthenticated()) return false;
    if(url.includes("logIn") && !this.authService.IsAuthenticated()) return true;
    if(url.includes("emailVerification") && this.authService.IsAuthenticated()) return false;
    if(url.includes("emailVerification") && !this.authService.IsAuthenticated()) return true;
    if(url.includes("rememberPassword") && this.authService.IsAuthenticated()) return false;
    if(url.includes("rememberPassword") && !this.authService.IsAuthenticated()) return true;

    return this.authService.IsAuthenticated();
  }
}
