import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';
import { CreateGroupAlertService } from 'src/app/services/visualServices/create-group-alert.service';



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
}
