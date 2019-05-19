import { Component, OnInit, HostListener } from '@angular/core';
import { GroupUser, IconModel, Icons } from 'src/app/models/models';
import { GroupService } from 'src/app/services/restServices/group.service';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styles: []
})
export class GroupUsersComponent implements OnInit{

  public width:number;
  public user_role:string;
  public icon_crown:IconModel = Icons.CROWN;
  public icon_wizard:IconModel = Icons.WIZARD;
  public icon_cog:IconModel = Icons.COG;
  public icon_user:IconModel = Icons.USER;
  public icon_info:IconModel = Icons.INFO;

  private groupName:string;
  public members:GroupUser[] = [];

  constructor(private groupS:GroupService, private groupPage:GroupInfoService) { }

  ngOnInit(){
    this.width = window.innerWidth;
    this.groupPage.info.subscribe(page=>{
      try{
        this.user_role = page.role;
        this.groupName = page.name;
        this.members = page.members;
      }
      catch(Error){}
    });
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.width = window.innerWidth;
  }

  public makeAdmin(user:GroupUser){
    console.log("making admin to ->"+user.userName);
  }

  public kick(user:GroupUser){
    console.log("kick to ->"+user.userName);
  }
}