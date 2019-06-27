import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';
import { ChatMessagesService } from 'src/app/services/userServices/chat-messages.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styles: []
})
export class ChatWindowComponent{

  public totalNewMessages:number = 0;

  constructor(private authS:AuthenticationService, private userChat:ChatMessagesService) { 
    this.userChat.newMsgs.subscribe(allGroupNotReadMsgs=>{
      this.totalNewMessages = 0;
      allGroupNotReadMsgs.forEach(c=>this.totalNewMessages += c[1]);
    });
  }

  public openChat(){
    this.userChat.downThemAll();
  }

  public isAuthenticated(){
    return this.authS.IsAuthenticated();
  }
}