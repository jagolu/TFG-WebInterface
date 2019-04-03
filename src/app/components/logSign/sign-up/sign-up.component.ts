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
  passwordsAreEqual: boolean;

  constructor(private _authentication:AuthenticationService) {
    this.passwordType = "password"
    this.passwordsAreEqual = false;

    this.initializeForm();
  }

  private initializeForm(){
    this.signUpForm = new FormGroup({
      'email': new FormControl(
        '',
        [
          Validators.required,
          Validators.email
        ]
      ),
      'username': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
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

  private signUp(){ 
    this._authentication.signUp({
      'email' : this.signUpForm.controls['email'].value,
      'username': this.signUpForm.controls['username'].value,
      'password': this.signUpForm.controls['password'].value
    }).subscribe(
      _=> this.resetForm(true),
      _=> this.resetForm(false)
    );
  }

  private resetForm(full:boolean){
    this.signUpForm.reset({
      'email': full ? "": this.signUpForm.controls['email'].value,
      'username': full ? "": this.signUpForm.controls['username'].value,
      'password': '',
      'repeatPassword': ''
    })
  }

  private equalPassword(){
    let password = this.signUpForm.controls['password'].value;
    let repeatPassword = this.signUpForm.controls['repeatPassword'].value;
    this.passwordsAreEqual = ((password == repeatPassword) && password.length>0 && repeatPassword.length>0);
  }

  private watchPassword(){
    this.passwordType = this.passwordType == "password" ? "text" : "password";
  }
}
