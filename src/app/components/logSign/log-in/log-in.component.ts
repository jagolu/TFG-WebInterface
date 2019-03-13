import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styles:[
    '.card-title{ font-size: 250%; }'
  ]
})
export class LogInComponent {

  signUpForm: FormGroup;
  passwordType: string;
  submited: boolean;
  passwordsAreEqual: boolean;

  constructor(private _authentication:AuthenticationService) { 
    this.passwordType = "password"
    this.submited = false;
    this.passwordsAreEqual = false;

    this.initializeForm();
  }

  watchPassword(){
    this.passwordType = this.passwordType == "password" ? "text" : "password";
  }

  initializeForm(){
    this.signUpForm = new FormGroup({
      'email': new FormControl(
        '',
        [
          Validators.required,
          Validators.email
        ]
        //TODO add validador asincrono para que no registre emails existentes
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

  logIn(){
    let user = {
      'email' : this.signUpForm.controls['email'].value,
      'password': this.signUpForm.controls['password'].value
    }
    this._authentication.setUserFromForm(user);
  }
}
