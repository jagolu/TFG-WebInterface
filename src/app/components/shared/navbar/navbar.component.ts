import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent {

  constructor(public authS:AuthenticationService) { }

  logOut(){
    this.authS.logOut();
  }
}
