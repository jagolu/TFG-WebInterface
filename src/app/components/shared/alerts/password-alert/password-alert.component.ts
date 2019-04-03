import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { BasicAlertComponent } from 'src/app/components/shared/alerts/basic-alert.component';

@Component({
  selector: 'app-password-alert',
  templateUrl: './password-alert.component.html',
  styles: []
})
export class PasswordAlertComponent extends BasicAlertComponent implements OnInit {

  private deleteForm:FormGroup;
  private hasPassword:boolean;
  @Input() deleteTarget?:string;

  constructor(private _userS:UserService) { 
    super();
  }

  ngOnInit() {
    this.initializeForm();
  }

  private deleteAccount(){
    // console.log("hi", this.deleteForm.controls["password"].value)
    this._userS.deleteUser({
      "email": this.deleteTarget,
      "password": this.deleteForm.controls["password"].value
    }).subscribe(
      _=>{
      },
      _=>{
      }
    );
  }

  private deleteGroup(){
    console.log("deletegroup");
    this.hideClicking();
  }

  private hideClicking(){
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

  private setPassword(pass:boolean){
    this.hasPassword = pass;
    super.setInitFalse();
  }
}