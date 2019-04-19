import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';
import { GroupService } from 'src/app/services/restServices/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: []
})
export class GroupComponent {

  public groupName:string;
  public groupType:boolean;
  public members:any[];
  public bets:any[];


  constructor(private aR:ActivatedRoute, private groupS:GroupService) { 
    this.groupName = this.aR.snapshot.paramMap.get('group');
    this.groupS.getPageGroup(this.groupName).subscribe(
      (ok:any)=> {
        this.groupName = ok.groupName;
        this.groupType = ok.groupType;
        this.bets = ok.bets;
        this.members = ok.members;
      },
      err=>console.log(err)
    );
  }
}
