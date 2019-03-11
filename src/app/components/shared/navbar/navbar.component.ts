import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor(private authS:AuthService) { }

  ngOnInit() {
  }

  signOut(){
    this.authS.signOut();
  }

}
