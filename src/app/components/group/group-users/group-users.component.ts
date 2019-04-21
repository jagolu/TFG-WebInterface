import { Component, Input, OnInit, HostListener } from '@angular/core';
import { GroupUser } from 'src/app/models/models';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styles: []
})
export class GroupUsersComponent implements OnInit{

  @Input() members:GroupUser[];

  public width:number;

  constructor() { }

  ngOnInit(){
    this.width = window.innerWidth;
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.width = window.innerWidth;
  }

}