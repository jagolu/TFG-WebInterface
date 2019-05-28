import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/restServices/user.service';
import { UserInfoService } from 'src/app/services/userServices/user-info.service';
import { UserInfo } from 'src/app/models/models';
import { AlertService } from 'src/app/services/visualServices/alert.service';
import { SessionService } from 'src/app/services/userServices/session.service';


@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styles: []
})
export class UserInfoFormComponent implements OnInit {

  @Input()id:string;
  @Input()labelled:string;

  public nicknameForm:FormGroup;
  public passwordForm:FormGroup;
  public imageForm:FormGroup;
  public equalPasswords : boolean;
  public info:UserInfo;
  public username:string;

  private selectedFile;

  constructor(private _alertS:AlertService,
              private _userS:UserService,
              private  userInfoS:UserInfoService, private sessionS:SessionService) { }

  ngOnInit() {
    this.userInfoS.info.subscribe(info=> this.info = info);
    this.sessionS.User.subscribe(u=>{
      try{this.username = u.username}
      catch(Error){}
    });
    this.initializeNicknameForm();
    this.initializePasswordForm();
    this.initializeImageForm();
    this.equalPasswords = false;
    this.selectedFile = false;
  }

  public changeNickname(){
    this._userS.changeUserInfo({
      'nickname': this.nicknameForm.controls['nickname'].value,
      "oldPassword": null,
      "newPassword":null,
      "image": null
    }).subscribe(
      _=>{
        this.sessionS.updateUsername(this.nicknameForm.controls['nickname'].value);
        this.reload();
      },
      _=>this.resetForm()
    );
  }

  public changePassword(){
    this._userS.changeUserInfo({
      'nickname': null,
      "oldPassword": this.passwordForm.controls['oldPassword'].value,
      "newPassword":this.passwordForm.controls['newPassword'].value,
      "image": null
    }).subscribe(
      _=> this.reload()
    );
    this.resetForm();
  }
  

  public changeImg(){
    let fr = new FileReader();

    fr.onload = () =>{
      this._userS.changeUserInfo({
        "nickname": null,
        "oldPassword": null,
        "newPassword":null,
        "image": fr.result.toString()
      }).subscribe(
        _=> this.reload()
      );
      this.resetForm();
    }
    fr.readAsDataURL(this.selectedFile);
  }

  public equalPassword(){
    let password = this.passwordForm.controls['newPassword'].value;
    let repeatPassword = this.passwordForm.controls['repeatPassword'].value;
    this.equalPasswords = ((password == repeatPassword) && password.length>0 && repeatPassword.length>0);
  }

  public openAlert(){
    this._alertS.deleteAccount(this.info.email);
  }

  public loadFile(event){
    this.selectedFile = event.target.files[0];
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
  
  private initializeNicknameForm(){
    this.nicknameForm = new FormGroup({
      'nickname': new FormControl(
        this.username,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ]
      )
    })
  }
  
  private reload() { 
    this._userS.getUserOptions().subscribe(
      (user:any)=>{
        this.userInfoS.updateInfo({
          "email": user.email,
          "image": user.img
        })
      }
    );
  }
  
  private resetForm(){
    this.nicknameForm.reset({
      "nickname": this.username
    });
    this.passwordForm.reset({
      "oldPassword": "",
      "newPassword": "",
      "repeatPassword": ""
    });
    this.imageForm.reset({
      "userImage": ""
    });
  }
}
