import { Component, OnInit, HostListener } from '@angular/core';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';
import { IconModel, Icons } from 'src/app/models/models';
import { SessionService } from 'src/app/services/userServices/session.service';
import { ChatService } from 'src/app/services/userServices/Hub/chat.service';
import { AliveService } from 'src/app/services/restServices/alive.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styles: []
})
export class ChatWindowComponent implements OnInit{

  public width:number;
  public totalNewMessages:number = 0;
  public thereIsAnyChat:boolean = false;
  public bell_icon:IconModel = Icons.BELL;

  constructor(private authS:AuthenticationService, private userChat:ChatService, private sessionS:SessionService, private _alive:AliveService) { 
    this.userChat.newMsgs.subscribe(allGroupNotReadMsgs=>{
      this.totalNewMessages = 0;
      allGroupNotReadMsgs.forEach(c=>this.totalNewMessages += c[1]);
    });
    this.sessionS.User.subscribe(u=> {
      try{
        this.thereIsAnyChat = u.groups.length > 0;
        u.groups.forEach((g, index)=>{
          if(!this.userChat.alreadyLogged(g.name)){
              this.userChat.startLoading(g.name);
              this._alive.logChat(g.name).subscribe((info:any)=>this.userChat.addNewGroup(g.name, info, index == 0));            
          }
        });
      }
      catch(Exception){this.thereIsAnyChat = false}
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
