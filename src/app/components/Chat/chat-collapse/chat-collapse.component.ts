import { Component, OnInit } from '@angular/core';
import { GroupUserJoinedAt, IconModel, Icons } from 'src/app/models/models';
import { SessionService } from 'src/app/services/userServices/session.service';
import { ChatMessagesService } from 'src/app/services/userServices/chat-messages.service';

@Component({
  selector: 'app-chat-collapse',
  templateUrl: './chat-collapse.component.html',
  styles: []
})
export class ChatCollapseComponent implements OnInit {

  
  public groups:GroupUserJoinedAt[];
  public groupNewMessages:[string,number][] = [];
  public groupName:string = "";
  public groupType:boolean = false;
  public icon_ball:IconModel = Icons.BALL;
  public icon_paper:IconModel = Icons.PAPER;
  public bell_icon:IconModel = Icons.BELL;

  constructor(private sessionS:SessionService, private userChat:ChatMessagesService) { }

  ngOnInit() {
    this.sessionS.User.subscribe(u => {
      this.userChat.newMsgs.subscribe(newMsgs=>{
        try{ 
          this.groups = u.groups;
          this.groupNewMessages = newMsgs;
          this.setGroup(); 
        }
        catch(Exception){this.groups = [];}
      });

    });
  }

  private setGroup(){
    this.groupName = this.groups.length >= 1 && this.groupName== "" ? this.groups[0].name : this.groupName;
    this.groupType = this.groups.length >= 1 && this.groupName== "" ? this.groups[0].type :  this.groupType;
  }

  public getCountMsgs(name:string){
    let number = 0;
    this.groupNewMessages.forEach(g=>{
      if(g[0] == name) number = g[1];
    });
    return number;
  }

  public changeGroupChat(name:string){
    this.groups.forEach(g=>{
      if(g.name == name){
        this.groupName = g.name;
        this.groupType = g.type;
        this.userChat.setGroupMessages(g.name);
        this.userChat.readMessagesGroup(g.name);
      }
    });
  }
}
