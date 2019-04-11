import { BasicAlert } from './../basic-alert';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-group-alert',
  templateUrl: './create-group-alert.component.html',
  styles: []
})
export class CreateGroupAlertComponent extends BasicAlert implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
