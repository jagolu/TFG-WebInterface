import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor(private authS:AuthenticationService) { }

  ngOnInit() {
  }

  logOut(){
    this.authS.logOut().subscribe(
      ok=>console.log("logOutOk", ok),
      err=>console.log("logOutErr", err)
    );
  }
}
