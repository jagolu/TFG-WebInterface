import { Component, OnInit } from '@angular/core';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';
import { GroupService } from 'src/app/services/restServices/group.service';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styles: []
})
export class GroupInfoComponent implements OnInit {

  public groupName:string;
  public dateJoin:string;
  public dateRole:string;
  public maxCapacity:number;
  public actualCapacity:number;
  public createDate:string;
  public role:string;

  constructor(private groupPage:GroupInfoService, private groupS:GroupService) { }

  ngOnInit() {
    this.groupPage.info.subscribe(page=>{
      try{
        this.role = page.role;
        this.groupName = page.name;
        this.dateJoin = page.dateJoin;
        this.dateRole = page.dateRole;
        this.maxCapacity = page.maxCapacity;
        this.actualCapacity = page.actualCapacity;
        this.createDate = page.createDate;
      }catch(Error){}
    });
  }

  public leaveGroup(){
    this.groupS.leaveGroup(this.groupName);
  }
}
