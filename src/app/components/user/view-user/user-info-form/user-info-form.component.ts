import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordAlertService, PasswordAlertType } from 'src/app/services/password-alert.service';


@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styles: []
})
export class UserInfoFormComponent implements OnInit {

  @Input()id:string;
  @Input()labelled:string;
  @Input()nickname:string;

  private nicknameForm:FormGroup;
  private passwordForm:FormGroup;
  private imageForm:FormGroup;
  private equalPasswords : boolean;
  private selectedFile = null;

  constructor(private _passwordAlertS:PasswordAlertService) { }

  ngOnInit() {
    this.initializeNicknameForm();
    this.initializePasswordForm();
    this.initializeImageForm();
    this.equalPasswords = false;
  }

  private changeNickname(){
    //TODO
    console.log("Deberiamos cambiar el nickname");
  }

  private changePassword(){
    //TODO
    console.log(this.passwordForm);
    console.log(this.equalPasswords)
    console.log("Deberiamos cambiar la contraseña");
  }

  private openAlert(){
    this._passwordAlertS.openAlert(PasswordAlertType.DELETEACCOUNT);
  }

  private initializeNicknameForm(){
    this.nicknameForm = new FormGroup({
      'nickname': new FormControl(
        this.nickname,[
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ]
      )
    })
  }

  private initializePasswordForm(){
    let passValidators = [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
    ];

    this.passwordForm = new FormGroup({
      'oldPassword': new FormControl('', passValidators),
      'newPassword' : new FormControl('', passValidators),
      'repeatPassword' : new FormControl('', passValidators)
    });
  }

  private initializeImageForm(){
    this.imageForm = new FormGroup({
      "userImage": new FormControl('', Validators.required)
    });
  }

  private equalPassword(){
    let password = this.passwordForm.controls['newPassword'].value;
    let repeatPassword = this.passwordForm.controls['repeatPassword'].value;
    this.equalPasswords = ((password == repeatPassword) && password.length>0 && repeatPassword.length>0);
  }

}
