import { Component, Input } from '@angular/core';
import { GroupUser } from 'src/app/models/models';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styles: []
})
export class GroupUsersComponent{

  @Input() members:GroupUser[];

  constructor() { }
}