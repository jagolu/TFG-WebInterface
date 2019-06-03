import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconModel, Icons } from 'src/app/models/models';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';
import { GroupService } from 'src/app/services/restServices/group.service';

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


  constructor(private aR:ActivatedRoute, private groupPageS:GroupInfoService, 
    private groupS:GroupService) { 

    this.aR.params.subscribe(
      param=>{
        if(param.group != this.groupName){
          this.groupS.getPageGroup(param.group);
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
  }
}
