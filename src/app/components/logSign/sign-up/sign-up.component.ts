import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertComponent } from '../../shared/alert/alert.component';


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

  constructor(private _authentication:AuthenticationService) {
    this.passwordType = "password"
    this.submited = false;
    this.passwordsAreEqual = false;
    this.emailAlreadyExists = false;

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
    let user = {
      'email' : this.signUpForm.controls['email'].value,
      'username': this.signUpForm.controls['username'].value,
      'password': this.signUpForm.controls['password'].value
    }
    this._authentication.setUserFromForm(user).subscribe(
      success=>{
        console.log("success", success)
        this.resetFullForm();
        this.verificationSent();
      },
      error=>{
        console.log("error", error);
        if(error.status == 400 && error.error["error"]=="EmailAlreadyExistsError") this.emailAlreadyTaken();
        if(error.status == 400 && (
          error.error['email'] || error.error['password'] || error.error['username']
        )) this.errorValidatingUser();
        if(error.status == 500 )this.serverError();
        this.resetPartialForm();
      }
    );
  }

  resetPartialForm(){
    this.signUpForm.reset({
      'email': this.signUpForm.controls['email'].value,
      'username': this.signUpForm.controls['username'].value,
      'password': '',
      'repeatPassword': ''
    })
  }

  resetFullForm(){
    this.signUpForm.reset({
      'email': '',
      'username': '',
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

  verificationSent(){
    var msg = [
      "Su registro se ha casi completado, solo es necesario un paso más.",
      "Verifique su correo mediante el enlace que se le ha enviado al mismo."
    ];
    this.child.openTab(msg);
  }

  emailAlreadyTaken(){
    this.emailAlreadyExists = true;
    var msg = [
      "El email con el que intenta registrarse ya está registrado"
    ];
    this.child.openTab(msg);
  }

  errorValidatingUser(){
    var msg = [
      `Ha habido un error validando los datos, vuelva a intentarlo
      más tarde.`
    ];
    this.child.openTab(msg);
  }

  serverError(){
    var msg = [
      `Ha habido interno del servidor, vuelva a intentarlo 
      más tarde.`
    ];
    this.child.openTab(msg);
  }
}
