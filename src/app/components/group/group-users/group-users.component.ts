import { Component, Input, OnInit, HostListener } from '@angular/core';
import { GroupUser, IconModel, Icons } from 'src/app/models/models';
import { SessionService } from 'src/app/services/userServices/session.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styles: []
})
export class GroupUsersComponent implements OnInit{

  @Input() members:GroupUser[];
  @Input() groupName:string;
  @Input() showHeader:boolean=false;

  public width:number;
  public user_role:string;
  public icon_crown:IconModel = Icons.CROWN;
  public icon_wizard:IconModel = Icons.WIZARD;
  public icon_cog:IconModel = Icons.COG;
  public icon_user:IconModel = Icons.USER;

  private actualGroupUrl:string;

  constructor(private aR:ActivatedRoute, private _sessionS:SessionService) { 
    this.actualGroupUrl = null;
  }

  ngOnInit(){
    this.width = window.innerWidth;
    this.aR.params.subscribe(
      param=>{
        if(param.group != this.actualGroupUrl){
          this.actualGroupUrl = param.group;
          this.getUserRole();
        }
      }
    )
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


  private getUserRole(){
    this._sessionS.User.subscribe(u=>{
      u.groups.forEach(group => {
        if(group.name == this.groupName){
          this.user_role = group.role;
        }
      });
    });
    // this._sessionS.getGroups().forEach(group => {
    //   if(group.name == this.groupName){
    //     this.user_role = group.role;
    //   }
    // });
  }
}