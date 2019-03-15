import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertComponent } from '../../shared/alert/alert.component';
import { ChildActivationEnd } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styles:[
    '.card-title{ font-size: 250%; }'
  ]
})
export class SignUpComponent{

  @ViewChild(AlertComponent) child:AlertComponent;

  signUpForm: FormGroup;
  passwordType: string;
  submited: boolean;
  passwordsAreEqual: boolean;
  emailAlreadyExists: boolean;
  msg:string;

  constructor(private _authentication:AuthenticationService) {
    this.passwordType = "password"
    this.submited = false;
    this.passwordsAreEqual = false;
    this.emailAlreadyExists = false;
    this.msg = null;

    this.initializeForm();
  }

  initializeForm(){
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

  signUp(){
    //alert("se te ha")
    this.openTab();
    // let user = {
    //   'email' : this.signUpForm.controls['email'].value,
    //   'username': this.signUpForm.controls['username'].value,
    //   'password': this.signUpForm.controls['password'].value
    // }
    // this._authentication.setUserFromForm(user).subscribe(
    //   success=>{
    //     console.log(success);
    //   },
    //   error=>{
    //     this.emailAlreadyExists = true;
    //     this.resetForm();
    //   }
    // );
  }

  resetForm(){
    this.signUpForm.reset({
      'email': this.signUpForm.controls['email'].value,
      'username': this.signUpForm.controls['username'].value,
      'password': '',
      'repeatPassword': ''
    })
  }

  equalPassword(){
    let password = this.signUpForm.controls['password'].value;
    let repeatPassword = this.signUpForm.controls['repeatPassword'].value;
    this.passwordsAreEqual = ((password == repeatPassword) && password.length>0 && repeatPassword.length>0);
  }

  watchPassword(){
    this.passwordType = this.passwordType == "password" ? "text" : "password";
  }

  openTab(){
    this.msg="El registro se ha iniciado";
    this.child.openTab();
  }
}
