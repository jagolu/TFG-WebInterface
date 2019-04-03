import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styles: []
})
export class UserGroupsComponent implements OnInit {

  @Input()id:string;
  @Input()labelled:string;
  
  constructor() { }

  ngOnInit() { }

}
