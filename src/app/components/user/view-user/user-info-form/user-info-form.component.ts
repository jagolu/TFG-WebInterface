import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordAlertService, PasswordAlertType } from 'src/app/services/password-alert.service';
import { UserService } from 'src/app/services/user.service';


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
  private selectedFile;

  constructor(private _passwordAlertS:PasswordAlertService,
              private _userS:UserService) { }

  ngOnInit() {
    this.initializeNicknameForm();
    this.initializePasswordForm();
    this.initializeImageForm();
    this.equalPasswords = false;
    this.selectedFile = false;
  }

  private changeNickname(){
    this._userS.changeUserInfo({
      'nickname': this.nicknameForm.controls['nickname'].value,
      "oldPassword": null,
      "newPassword":null,
      "repeatNewPassword":null,
      "image": null
    }).subscribe(
      ok=>{
        window.location.reload();
        console.log(ok)
      },
      err=> console.log(err)
    )
  }

  private changePassword(){
    this._userS.changeUserInfo({
      'nickname': null,
      "oldPassword": this.passwordForm.controls['oldPassword'].value,
      "newPassword":this.passwordForm.controls['newPassword'].value,
      "repeatNewPassword":this.passwordForm.controls['repeatPassword'].value,
      "image": null
    }).subscribe(
      ok=>{
        window.location.reload();
        console.log(ok)
      },
      err=> console.log(err)
    )
  }

  private changeImg(){
    let fr = new FileReader();

    fr.onload = () =>{
      this._userS.changeUserInfo({
        "nickname": null,
        "oldPassword": null,
        "newPassword":null,
        "repeatNewPassword":null,
        "image": fr.result.toString()
      }).subscribe(
        ok=> {
          window.location.reload();
          console.log("ok, reload it",ok)
        },
        err=>console.log("fail", err)
      );

    }
    fr.readAsDataURL(this.selectedFile);
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

  private openAlert(){
    this._passwordAlertS.openAlert(PasswordAlertType.DELETEACCOUNT);
  }

  private loadFile(event){
    this.selectedFile = event.target.files[0];
    
  }
}
