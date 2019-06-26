import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styles: []
})
export class ChatWindowComponent{

  constructor(private authS:AuthenticationService) { }



  public isAuthenticated(){
    return this.authS.IsAuthenticated();
  }
}
