import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';
import { CreateGroupAlertService } from 'src/app/services/visualServices/create-group-alert.service';
import { SessionService } from 'src/app/services/userServices/session.service';
import { Group } from 'src/app/models/Group';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit{

  public groups:Group[];

  constructor(private authS:AuthenticationService, 
              private createGroupS:CreateGroupAlertService,
              private sessionS:SessionService) { }

  ngOnInit(){
    this.sessionS.User.subscribe(u => {
      try{
        this.groups = u.groups;
      }catch(Exception){
        this.groups = [];
      }
      
    });
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
}
