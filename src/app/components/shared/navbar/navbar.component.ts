import { Component, OnInit, HostListener } from '@angular/core';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';
import { SessionService } from 'src/app/services/userServices/session.service';
import { IconModel, Icons } from 'src/app/models/models';
import { Router, NavigationEnd } from '@angular/router';
import { AlertService } from 'src/app/services/visualServices/alert.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles:['.w-45{width:100%;margin-top:1%}']
})

export class NavbarComponent implements OnInit{

  public width:number;
  public actualGroup:string = "Groups";
  public groups:string[];
  public username:string;

  public icon_ball:IconModel = Icons.BALL;

  private actualUrl = null;

  constructor(private authS:AuthenticationService, private _alertS:AlertService,
              private sessionS:SessionService, private router:Router) { 

    this.router.events.subscribe( (activeRoute:any)=>{
      if(activeRoute instanceof NavigationEnd && activeRoute.urlAfterRedirects.includes("/group/")){
        this.actualGroup = decodeURIComponent(activeRoute.urlAfterRedirects.substring(7));
      }
      else if(activeRoute instanceof NavigationEnd && !activeRoute.urlAfterRedirects.includes("/group/")) this.actualGroup = "Groups";

      if(activeRoute.urlAfterRedirects && activeRoute.urlAfterRedirects != this.actualUrl) {
        this.actualUrl = activeRoute.urlAfterRedirects;
        this.resetNavbar();
      }
    })
  }

  ngOnInit(){
    this.sessionS.User.subscribe(u => {
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

  public notAdmin(){
    return !this.sessionS.isAdmin();
  }

  logOut(){
    this.authS.logOut();
  }

  isAuthenticated(){
    return this.authS.IsAuthenticated();
  }

  openCreateGroupAlert(){
    this._alertS.openCreateGroup();
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.width = window.innerWidth;
  }

  disableActualGroup(groupName:string){
    return groupName.includes(this.actualGroup);
  }

  private resetNavbar(){
    (document.querySelector("#navHamburgerButton") as HTMLElement).className = "navbar-toggler";
    (document.querySelector("#navbarSupportedContent") as HTMLElement).className = "collapse navbar-collapse";
  }
}
