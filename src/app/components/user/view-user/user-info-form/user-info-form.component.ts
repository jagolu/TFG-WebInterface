import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styles: []
})
export class UserInfoFormComponent implements OnInit {

  @Input()id:string;
  @Input()labelled:string;
  @Input()show:boolean;

  constructor() { }

  ngOnInit() {
  }

}
