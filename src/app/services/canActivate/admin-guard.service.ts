import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ActivatedRouteSnapshot } from '@angular/router';
import { SessionService } from '../userServices/session.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to ban a user to a route
 * 
 * @class 
 */
export class AdminGuardService implements CanActivate{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The activated url paths
   * 
   * @access public
   * @var {ActivatedRouteSnapshot[]} path
   */
  public path: ActivatedRouteSnapshot[];

  /**
   * The activated url path
   * 
   * @access public
   * @var {ActivatedRouteSnapshot} route
   */
  public route: ActivatedRouteSnapshot;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {Router} router 
   * @param {SessionService} sessionS
   */
  constructor(private sessionS:SessionService) { }


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
   * @return {Boolean} True if the user can access to the path, false otherwise
   */
  public canActivate(next:ActivatedRouteSnapshot){
    let url = next.url.toString();
    let isAdmin = this.sessionS.isAdmin();
     if(url.includes("group/")) return !isAdmin;
     if(url.includes("searchGroup")) return !isAdmin;
     if(url.includes("joinNewGroup")) return !isAdmin;


    return true;
  }
}
