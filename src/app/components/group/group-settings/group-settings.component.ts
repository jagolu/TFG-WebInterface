import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/visualServices/alert.service';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';


@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styles: []
})
export class GroupSettingsComponent implements OnInit {

  private groupName:string;

  constructor(private alertS:AlertService, private groupPage:GroupInfoService){}

  ngOnInit(){
    this.groupPage.info.subscribe(page=>{
      try{ this.groupName = page.name; }
      catch(Error){ this.groupName = "" }
    });
  }

  public openDeleteGroupAlert(){
    this.alertS.deleteGroup(this.groupName);
  }
}
