import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-password-alert',
  templateUrl: './password-alert.component.html',
  styles: []
})
export class PasswordAlertComponent extends AlertComponent implements OnInit {

  private deleteForm:FormGroup;

  constructor() { 
    super()
  }

  ngOnInit() {
    this.initializeForm();
  }

  private deleteAccount(){
    console.log("delete account");
  }

  private deleteGroup(){
    console.log("deletegroup");
  }


  private initializeForm(){
    this.deleteForm = new FormGroup({
      'password': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ]
      )
    });
  }
}
