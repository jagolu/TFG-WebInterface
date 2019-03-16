import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertComponent } from 'src/app/components/shared/alert/alert.component';
import { LoadingComponent } from 'src/app/components/shared/loading/loading.component';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styles:[
    '.card-title{ font-size: 250%; }'
  ]
})
export class SignUpComponent{

  @ViewChild(AlertComponent) alert:AlertComponent;
  @ViewChild(LoadingComponent) loading:LoadingComponent;

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

  private signUp(){ //TODO quitar los console log
    let user = {
      'email' : this.signUpForm.controls['email'].value,
      'username': this.signUpForm.controls['username'].value,
      'password': this.signUpForm.controls['password'].value
    }
    this.loading.startLoading();
    this._authentication.setUserFromForm(user).subscribe(
      success=>{
        console.log("success", success);
        this.resetForm(true);
        this.loading.stopLoading();
        this.alert.verificationSent();
      },
      error=>{
        console.log("error", error);
        if(error.status == 400 &&  error.error["error"]=="EmailAlreadyExistsError"){
          this.alert.emailAlreadyTaken();
        }
        if(error.status == 400 && (error.error['email'] || error.error['password'] || error.error['username'] )) this.alert.errorValidatingUser();
        if(error.status == 500) this.alert.serverError();
        if(error.status==0)  this.alert.lostConnection();
        this.resetForm(false);
        this.loading.stopLoading();
      }
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
