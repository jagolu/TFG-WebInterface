import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconModel, Icons } from 'src/app/models/models';
import { AlertService } from 'src/app/services/visualServices/alert.service';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: []
})
export class GroupComponent {

  public groupName:string = null;
  public groupType:boolean;
  public role:string;

  public icon_ball:IconModel = Icons.BALL;
  public icon_paper:IconModel = Icons.PAPER;


  constructor(private aR:ActivatedRoute, private alertS:AlertService, private groupPageS:GroupInfoService) { 

    this.aR.params.subscribe(
      param=>{
        if(param.group != this.groupName){
          this.groupPageS.getGroup(param.group);
        }
      }
    );

    this.groupPageS.info.subscribe(page=>{
      try{
        this.role = page.role;
        this.groupName = page.name;
        this.groupType = page.type;
      }
      catch(Error){}
    });
  }

  public createBet(){
    if(!this.groupType) this.alertS.createVirtualBet();
    else this.alertS.createOfficialBet();
  }
}
