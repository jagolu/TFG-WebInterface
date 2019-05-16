import { Component, Input, OnInit, HostListener } from '@angular/core';
import { GroupUser, IconModel, Icons } from 'src/app/models/models';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styles: []
})
export class GroupUsersComponent implements OnInit{

  @Input() members:GroupUser[];
  @Input() showHeader:boolean=false;
  public width:number;
  public icon_crown:IconModel = Icons.CROWN;
  public icon_wizard:IconModel = Icons.WIZARD;

  constructor() { }

  ngOnInit(){
    this.width = window.innerWidth;
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.width = window.innerWidth;
  }

}