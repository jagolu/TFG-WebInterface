import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: []
})
export class GroupComponent {

  public groupName:string;

  constructor(private aR:ActivatedRoute) { 
    this.groupName = this.aR.snapshot.paramMap.get('group');
  }
}
