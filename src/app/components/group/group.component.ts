import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/app/services/restServices/group.service';
import { GroupUser, IconModel, Icons } from 'src/app/models/models';
import { AlertService } from 'src/app/services/visualServices/alert.service';

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


  constructor(private aR:ActivatedRoute, private groupS:GroupService, 
              private alertS:AlertService, private router:Router) { 
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

  public createBet(){
    if(!this.groupType) this.alertS.createVirtualBet();
    else this.alertS.createOfficialBet();
  }


  private getGroupInfo() {
    this.groupS.getPageGroup(this.groupName).subscribe(
      (group:any)=> {
        this.groupName = group.groupName;
        this.groupType = group.groupType;
        this.bets = group.bets;
        this.members = group.members;
        this.role = group.role;
      }
    );
  }
}
