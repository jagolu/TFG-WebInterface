import { Component, OnInit } from '@angular/core';
import { GroupUserJoinedAt, IconModel, Icons } from 'src/app/models/models';
import { SessionService } from 'src/app/services/userServices/session.service';
import { ChatMessagesService } from 'src/app/services/userServices/chat-messages.service';
import { ChatService } from 'src/app/services/restServices/chat.service';

@Component({
  selector: 'app-chat-collapse',
  templateUrl: './chat-collapse.component.html',
  styles: []
})
export class ChatCollapseComponent implements OnInit {

  
  public groups:GroupUserJoinedAt[];
  public groupName:string = "";
  public groupType:boolean = false;
  public icon_ball:IconModel = Icons.BALL;
  public icon_paper:IconModel = Icons.PAPER;

  constructor(private sessionS:SessionService, private userChat:ChatMessagesService, private chatS:ChatService) { }

  ngOnInit() {
    this.sessionS.User.subscribe(u => {
      try{ 
        this.groups = u.groups;
        this.setGroup(); 
        this.logInChats();
      }
      catch(Exception){ 
        this.groups = []; 
      }
    });
  }

  private setGroup(){
    this.groupName = this.groups.length >= 1 ? this.groups[0].name : "";
    this.groupType = this.groups.length >= 1 ? this.groups[0].type : false;
  }

  public changeGroupChat(name:string){
    this.groups.forEach(g=>{
      if(g.name == name){
        this.groupName = g.name;
        this.groupType = g.type;
        this.userChat.setGroupMessages(g.name);

      }
    });
  }

  private logInChats(){
    this.groups.forEach((group, index)=> {
      if(!this.userChat.groupExists(group.name)){
        this.chatS.logChat(group.name, index == 0).subscribe();
      }
    });
  }
}
