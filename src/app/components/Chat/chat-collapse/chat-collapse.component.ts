import { Component, OnInit } from '@angular/core';
import { GroupUserJoinedAt, IconModel, Icons } from 'src/app/models/models';
import { SessionService } from 'src/app/services/userServices/session.service';

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

  constructor(private sessionS:SessionService) { }

  ngOnInit() {
    this.sessionS.User.subscribe(u => {
      try{ 
        this.groups = u.groups;
        this.setGroup(); 
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
      }
    });
  }
}
