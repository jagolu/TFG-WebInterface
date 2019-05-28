import { Component, OnInit } from '@angular/core';
import { GroupUser, IconModel, Icons } from 'src/app/models/models';
import { GroupService } from 'src/app/services/restServices/group.service';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';
import { SessionService } from 'src/app/services/userServices/session.service';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styles: []
})
export class GroupUsersComponent implements OnInit{

  public user_role:string;
  public icon_crown:IconModel = Icons.CROWN;
  public icon_wizard:IconModel = Icons.WIZARD;
  public icon_cog:IconModel = Icons.COG;
  public icon_user:IconModel = Icons.USER;
  public icon_info:IconModel = Icons.INFO;
  private groupName:string;
  public members:GroupUser[] = [];
  public username:string;

  constructor(private groupS:GroupService, private groupPage:GroupInfoService,
              private sessionS:SessionService) { }

  ngOnInit(){
    this.groupPage.info.subscribe(page=>{
        this.user_role = page.role;
        this.groupName = page.name;
        this.members = page.members;
    });
    this.sessionS.User.subscribe(u=>{
      try{this.username = u.username}
      catch(Error){}
    })
  }

  public manageAdmin(publicUserId:string, make:boolean){
    this.groupS.makeAdmin({
      "publicid" : publicUserId,
      "groupName": this.groupName,
      "make_unmake": make
    });
  }

  public kick(publicUserId:string){
    this.groupS.kickUser({
      "groupName": this.groupName,
      "publicId": publicUserId
    });
  }

  public block(publicUserId:string, block:boolean){
    this.groupS.blockUser({
      "groupName": this.groupName,
      "publicid": publicUserId,
      "make_unmake": block
    });
  }
}