import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styles:[
    '.card-title{ font-size: 250%; }'
  ]
})
export class SignUpComponent{

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
      'username': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ]
        //TODO add validador asincrono para que no registre nicksames existentes
      ),
      'password': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ]
      ),
      'repeatPassword': new FormControl(
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

  signUp(){
    let user = {
      'email' : this.signUpForm.controls['email'].value,
      'username': this.signUpForm.controls['username'].value,
      'password': this.signUpForm.controls['password'].value
    }
    this._authentication.setUserFromForm(user);
  }

  equalPassword(){
    let password = this.signUpForm.controls['password'].value;
    let repeatPassword = this.signUpForm.controls['repeatPassword'].value;
    this.passwordsAreEqual = ((password == repeatPassword) && password.length>0 && repeatPassword.length>0);
  }

  /**
   * Debug function
   * Show the form data
   */
  //TODO ERASE FUNCTION
  // see():Promise<any>{
  //   let p= new Promise(
  //     (resolve, reject)=>{
  //       resolve(this.signUpForm);
  //       reject("nova");
  //     }
  //   )
  //   return p;
  // }
}
