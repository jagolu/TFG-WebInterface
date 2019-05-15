import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/services/restServices/group.service';
import { GroupUser, IconModel, Icons } from 'src/app/models/models';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: []
})
export class GroupComponent {

  public groupName:string;
  public groupType:boolean;
  public members:GroupUser[];
  public bets:any[];
  public role:string;

  public icon_ball:IconModel = Icons.BALL;
  public icon_paper:IconModel = Icons.PAPER;

  private actualGroupUrl:string;


  constructor(private aR:ActivatedRoute, private groupS:GroupService) { 
    this.actualGroupUrl = null;

    this.aR.params.subscribe(
      param=>{
        if(param.group != this.actualGroupUrl){
          this.actualGroupUrl = param.group;
          this.groupName = this.aR.snapshot.paramMap.get('group');
          this.getGroupInfo();
        }
      }
    );
  }

  private getGroupInfo() {
    this.groupS.getPageGroup(this.groupName).subscribe(
      (ok:any)=> {
        this.groupName = ok.groupName;
        this.groupType = ok.groupType;
        this.bets = ok.bets;
        this.members = ok.members;
        this.role = ok.role;
      },
      err=>console.log(err)
    );
  }
}
