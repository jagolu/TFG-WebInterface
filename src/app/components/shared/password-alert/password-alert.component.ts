import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertComponent } from '../alert/alert.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-password-alert',
  templateUrl: './password-alert.component.html',
  styles: []
})
export class PasswordAlertComponent extends AlertComponent implements OnInit {

  private deleteForm:FormGroup;
  @Input() deleteTarget?:string;

  constructor(private _userS:UserService) { 
    super()
  }

  ngOnInit() {
    this.initializeForm();
  }

  private deleteAccount(){
    this._userS.deleteUser({
      "email": this.deleteTarget,
      "password": this.deleteForm.controls["password"].value
    }).subscribe(
      _=>{
        this.hideAlert();
      },
      _=>{
        this.hideAlert();
      }
    );
  }

  private deleteGroup(){
    console.log("deletegroup");
    this.hideAlert();
  }

  private hideAlert(){
    (document.querySelector("#hidePasswordAlertButton") as HTMLElement).click();
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
