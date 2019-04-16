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
export class NavbarComponent {

  constructor(private authS:AuthenticationService, 
              private createGroupS:CreateGroupAlertService) { }

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
