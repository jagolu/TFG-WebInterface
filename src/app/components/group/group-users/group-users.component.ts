import { Component } from '@angular/core';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styles: []
})
export class GroupUsersComponent{
  
  public members = [
    1,2,3,4,5,6,7,8,9,10
  ]

  constructor() { }
}
