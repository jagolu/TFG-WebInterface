import { Component, OnInit, HostListener } from '@angular/core';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';
import { ChatMessagesService } from 'src/app/services/userServices/chat-messages.service';
import { IconModel, Icons } from 'src/app/models/models';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styles: []
})
export class ChatWindowComponent implements OnInit{

  public width:number;
  public totalNewMessages:number = 0;
  public bell_icon:IconModel = Icons.BELL;

  constructor(private authS:AuthenticationService, private userChat:ChatMessagesService) { 
    this.userChat.newMsgs.subscribe(allGroupNotReadMsgs=>{
      this.totalNewMessages = 0;
      allGroupNotReadMsgs.forEach(c=>this.totalNewMessages += c[1]);
    });
  }

  ngOnInit(){
    this.width = window.innerWidth;
  }

  /**
   * Function to know the actual screen width
   * @param {any} event The event of resizing the screen
   */
  @HostListener('window:resize', ['$event']) onResize(event) {
    this.width = window.innerWidth;
  }

  public openChat(){
    this.userChat.downThemAll();
  }

  public isAuthenticated(){
    return this.authS.IsAuthenticated();
  }
}
