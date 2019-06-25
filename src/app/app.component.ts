import { Component } from '@angular/core';
import { AuthenticationService } from './services/restServices/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent{ 

  constructor(private authS:AuthenticationService) { }
 

  public isAuthenticated(){
    return this.authS.IsAuthenticated();
  }
}
