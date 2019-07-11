import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconModel, Icons, NewMessage } from 'src/app/models/models';
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
  public news:NewMessage[] = [];
  public role:string;
  public coins?:number;

  public icon_ball:IconModel = Icons.BALL;
  public icon_paper:IconModel = Icons.PAPER;
  public icon_coin:IconModel = Icons.COIN;


  constructor(private aR:ActivatedRoute, private groupPageS:GroupInfoService, private groupS:GroupService) { 

    this.aR.params.subscribe(
      param=>{
        if(decodeURIComponent(param.group) != this.groupName){
          this.groupS.getPageGroup(param.group);
        }
      }
    );

    this.groupPageS.info.subscribe(page=>{
      try{
        this.role = page.members ? page.members[page.members.length-1].role : "";
        this.groupName = page.name;
        this.groupType = page.type;
        this.coins = page.members ? page.members[page.members.length-1].coins : 0;
        this.news = page.news;
      }
      catch(Error){}
    });
  }
}
