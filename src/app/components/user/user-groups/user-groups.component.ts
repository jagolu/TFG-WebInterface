import { Component, Input } from '@angular/core';
import { SessionService } from 'src/app/services/userServices/session.service';
import { IconModel, Icons } from 'src/app/models/models';


@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styles: []
})
export class UserGroupsComponent{

  @Input()id:string;
  @Input()labelled:string;

  public groups:string[];

  public icon_ball:IconModel = Icons.BALL;
  
  constructor(private sessionS:SessionService) { 
    this.sessionS.User.subscribe(u=>{
      try{
        this.groups = u.groups;
      }catch(Exception){
        this.groups = [];
      }
    });
  }
}
