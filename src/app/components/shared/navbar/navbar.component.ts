import { Component, OnInit, HostListener } from '@angular/core';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';
import { CreateGroupAlertService } from 'src/app/services/visualServices/create-group-alert.service';
import { SessionService } from 'src/app/services/userServices/session.service';
import { Group } from 'src/app/models/Group';
import { RouterStateSnapshot, Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{

  public width:number;
  public actualGroup:string = "Groups";
  public groups:Group[];

  constructor(private authS:AuthenticationService, private createGroupS:CreateGroupAlertService,
              private sessionS:SessionService, private router:Router) { 

    this.router.events.subscribe( (activeRoute:any)=>{
      if(activeRoute instanceof NavigationEnd && activeRoute.urlAfterRedirects.includes("/group/")){
        this.actualGroup = activeRoute.urlAfterRedirects.substring(7);
      }
      else if(activeRoute instanceof NavigationEnd && !activeRoute.urlAfterRedirects.includes("/group/")) this.actualGroup = "Groups"
    })
  }

  ngOnInit(){
    this.sessionS.User.subscribe(u => {
      try{ this.groups = u.groups; }
      catch(Exception){ this.groups = []; }
    });
    this.width = window.innerWidth;
    
  }

  logOut(){
    this.authS.logOut();
  }

  isAuthenticated(){
    return this.authS.IsAuthenticated();
  }

  openCreateGroupAlert(){
    this.createGroupS.openAlert();
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.width = window.innerWidth;
  }

  disableActualGroup(groupName:string){
    return groupName.includes(this.actualGroup);
  }
}
