import { Component, OnInit } from '@angular/core';
import { GroupUserJoinedAt, IconModel, Icons } from 'src/app/models/models';
import { SessionService } from 'src/app/services/userServices/session.service';
import { ChatService } from 'src/app/services/userServices/Hub/chat.service';

@Component({
  selector: 'app-chat-collapse',
  templateUrl: './chat-collapse.component.html',
  styles: []
})
export class ChatCollapseComponent implements OnInit {

  
  public groups:GroupUserJoinedAt[] = [];
  public groupNewMessages:[string,number][] = [];
  public groupName:string = "";
  public groupType:boolean = false;
  public icon_ball:IconModel = Icons.BALL;
  public icon_paper:IconModel = Icons.PAPER;
  public bell_icon:IconModel = Icons.BELL;

  constructor(private sessionS:SessionService, private userChat:ChatService) { }

  ngOnInit() {
    this.sessionS.User.subscribe(u => {
      if(u!=null){
        this.checkAuxGroups(u.groups);
        this.groups = u.groups;
        this.setGroup(this.groups); 
      }
      this.userChat.newMsgs.subscribe(newMsgs=> this.groupNewMessages =  newMsgs);
    });
  }

  private setGroup(newGroups){
    if(newGroups.some(g => g.name == this.groupName)) return;
    this.groupType = newGroups.length >= 1 && this.groupName== "" ? newGroups[0].type :  this.groupType;
    this.groupName = newGroups.length >= 1 && this.groupName== "" ? newGroups[0].name : this.groupName;

    if(!newGroups.some(g => g.name == this.groupName) && newGroups.length > 0){
      this.groupName = newGroups[0].name;
      this.groupType = newGroups[0].type;
      this.changeGroupChat(this.groupName, this.groupType);
    }
  }

  public getCountMsgs(name:string){
    let number = 0;
    this.groupNewMessages.forEach(g=>{
      if(g[0] == name) number = g[1];
    });
    return number;
  }

  public changeGroupChat(name:string, type:boolean){
    if(!this.groups.some(g=> g.name == name)) return;
    this.groupName = name;
    this.groupType = type;
    this.userChat.setGroupMessages(name);
    this.userChat.readMessagesGroup(name);
  }

  private checkAuxGroups(newGroups:GroupUserJoinedAt[]){
    this.groups.forEach(g=>{
      if(!newGroups.some(ng=> ng.name == g.name)) {
        this.userChat.exitChat(g.name);
      }
    });
  }

}
