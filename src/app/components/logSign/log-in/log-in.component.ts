import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, UserLog } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styles:[
    '.card-title{ font-size: 250%; }'
  ]
})
export class LogInComponent {

  logInForm: FormGroup;
  passwordType: string;

  constructor(private _authentication:AuthenticationService) { 
    this.passwordType = "password"

    this.initializeForm();
  }

  private initializeForm(){
    this.logInForm = new FormGroup({
      'email': new FormControl(
        '',
        [
          Validators.required,
          Validators.email
        ]
      ),
      'password': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ]
      )
    })
  }

  private resetForm(full:boolean){
    this.logInForm.reset({
      'email': full ? "": this.logInForm.controls['email'].value,
      'password': ''
    });
  }

  private watchPassword(){
    this.passwordType = this.passwordType == "password" ? "text" : "password";
  }

  logIn(){
    let user:UserLog = {
      'email' : this.logInForm.controls['email'].value,
      'password': this.logInForm.controls['password'].value
    }
    this._authentication.logIn(user).subscribe();
  }
}
