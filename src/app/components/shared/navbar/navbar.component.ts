import { Component, OnInit, HostListener } from '@angular/core';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';
import { SessionService } from 'src/app/services/userServices/session.service';
import { IconModel, Icons } from 'src/app/models/models';
import { Router, NavigationEnd } from '@angular/router';
import { AlertService } from 'src/app/services/visualServices/alert.service';
import { ReloadService } from 'src/app/services/userServices/reload.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles:['.w-45{width:100%;margin-top:1%}']
})

export class NavbarComponent implements OnInit{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The actual width of the screen
   * 
   * @access public
   * @var {number} width
   */
  public width:number;

  /**
   * The dynamic name for the groups nav-item
   * 
   * @access public
   * @var {string} actualGroup
   */
  public actualGroup:string = "Tus grupos";

  /**
   * The groups of the logged user
   * 
   * @access public
   * @var {string[]} groups
   */
  public groups:string[];

  /**
   * The username of the logged user
   * 
   * @access public
   * @var {string} username
   */
  public username:string;

  /**
   * A icon of a ball
   * 
   * @access public
   * @var {IconModel} icon_ball
   */
  public icon_ball:IconModel = Icons.BALL;

  /**
   * The actual url
   * 
   * @access private
   * @var {any} actualUrl
   */
  private actualUrl:any = null;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {AuthenticationService} __authS To know if the user is an admin or if he is authenticated
   * @param {AlertService} __alertS To launch the create group alert
   * @param {SessionService} __sessionS To log out the ouser
   * @param {Router} __router To know the actual url and redirect in log out
   * @param {ReloadService} __reloadS To send the events to reload the pages
   */
  constructor(
    private __authS:AuthenticationService, 
    private __alertS:AlertService, 
    private __sessionS:SessionService, 
    private __router:Router,
    private __reloadS:ReloadService
  ) { 
    this.__router.events.subscribe( (activeRoute:any)=>{
      if(activeRoute instanceof NavigationEnd && activeRoute.urlAfterRedirects.includes("/group/")){
        this.actualGroup = decodeURIComponent(activeRoute.urlAfterRedirects.substring(7));
      }
      else if(activeRoute instanceof NavigationEnd && !activeRoute.urlAfterRedirects.includes("/group/")) this.actualGroup = "Tus grupos";

      if(activeRoute.urlAfterRedirects && activeRoute.urlAfterRedirects != this.actualUrl) {
        this.actualUrl = activeRoute.urlAfterRedirects;
        this.resetNavbar();
      }
    })
  }

  ngOnInit(){
    this.__sessionS.User.subscribe(u => {
      try{ 
        this.groups = u.groups; 
        this.username = u.username;
      }
      catch(Exception){ 
        this.groups = []; 
        this.username = "";
      }
    });
    this.width = window.innerWidth;
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.width = window.innerWidth;
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Says lif the current is a normal user or not
   * 
   * @access public
   * @returns {Boolean} True if the user is a normal user,
   * false if the user is a admin user
   */
  public notAdmin():Boolean{
    return !this.__sessionS.isAdmin();
  }

  /**
   * Logs out the current user
   * 
   * @access public
   */
  public logOut(){
    this.__authS.logOut();
    this.reloadHome();
    this.__router.navigate(['home']);

  }

  /**
   * Says if the current user
   * is authenticated or not
   * 
   * @access public
   * @returns {Boolean} True if the current user
   * is authenticated, false otherwise
   */
  public isAuthenticated():Boolean{
    return this.__authS.IsAuthenticated();
  }

  /**
   * Launchs the alert to create a new group
   * 
   * @access public
   */
  public openCreateGroupAlert(){
    this.__alertS.openCreateGroup();
  }

  /**
   * Send event to reload the home page
   * 
   * @access public
   */
  public reloadHome(){
    if(this.actualUrl.includes("/home") || this.actualUrl == "/"){
      this.__reloadS.reloadHome();
    }
  }

  /**
   * Send event to reload the group page
   * 
   * @access public
   */
  public reloadGroup(name:string){
    if(name == "Tus grupos") return;
    
    let param = decodeURIComponent(this.actualUrl).substr(7);
    if(name == param) this.__reloadS.reloadGroup();
  }

  /**
   * Send event to reload the search groups page
   * 
   * @access public
   */
  public reloadSearchGroups(){
    if(this.actualUrl.includes("/searchGroup") || this.actualUrl.includes("/joinNewGroup")){
      this.__reloadS.reloadSearchGroups();
    }
  }

  /**
   * Send event to reload the search users page
   * 
   * @access public
   */
  public reloadSearchUsers(){
    if(this.actualUrl.includes("/searchUser")){
      this.__reloadS.reloadSearchUsers();
    }
  }

  /**
   * Send event to reload the all DM page
   * 
   * @access public
   */
  public reloadAllDM(){
    if(this.actualUrl.includes("/directMessages")){
      this.__reloadS.reloadAllDMs();
    }
  }

  /**
   * Send event to reload the user info page
   * 
   * @access public
   */
  public reloadUserInfo(){
    if(this.actualUrl.includes("/myUserInfo")){
      this.__reloadS.reloadUserInfo();
    }
  }

  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Closes the navbar
   * 
   * @access private
   */
  private resetNavbar(){
    (document.querySelector("#navHamburgerButton") as HTMLElement).className = "navbar-toggler";
    (document.querySelector("#navbarSupportedContent") as HTMLElement).className = "collapse navbar-collapse";
  }
}
