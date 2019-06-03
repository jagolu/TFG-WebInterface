import { Component, OnInit } from '@angular/core';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroupService } from 'src/app/services/restServices/group.service';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styles: []
})
export class PasswordFormComponent implements OnInit {

  public canPutPassword:boolean;
  public hasPassword:boolean;
  public setFirstPasswordForm:FormGroup;
  public removePasswordForm:FormGroup;
  public rePasswordForm:FormGroup;
  public equalPasswords : boolean;

  private groupName:string;

  constructor(private groupPage:GroupInfoService, private groupS:GroupService) { 
    this.equalPasswords = false;
    this.initializeForm();
  }

  ngOnInit() {
    this.groupPage.info.subscribe(page=>{
      try{
        this.canPutPassword = page.canPutPassword;
        this.hasPassword = page.hasPassword;
        this.groupName = page.name;
      }catch(Error){
        this.canPutPassword = false;
        this.hasPassword = false;
      }
    });
  }

  public setFirstPassword(){
    let newPass = this.setFirstPasswordForm.controls["newPassword"].value;
    this.setPassword(newPass, null);
    this.resetForm();
  }

  public changePassword(){
    let newPass = this.rePasswordForm.controls["newPassword"].value;
    let oldPass = this.rePasswordForm.controls["oldPassword"].value;
    this.setPassword(newPass, oldPass);
    this.resetForm();
  }

  public removePassword(){
    let oldPass = this.removePasswordForm.controls["oldPassword"].value;
    console.log(oldPass);
    this.setPassword(null, oldPass);
    this.resetForm();
  }

  public equalPassword(){
    let password = !this.hasPassword ? this.setFirstPasswordForm.controls['newPassword'].value : 
                                        this.rePasswordForm.controls['newPassword'].value;
    let repeatPassword = !this.hasPassword ? this.setFirstPasswordForm.controls['repeatPassword'].value : 
                                              this.rePasswordForm.controls['repeatPassword'].value;
    this.equalPasswords = ((password == repeatPassword) && password.length>0 && repeatPassword.length>0);
  }

  private setPassword(newPassword:string, oldPassword?:string){
    this.groupS.managePassword({
      "name": this.groupName,
      "newPassword": newPassword,
      "oldPassword": oldPassword
    });
  }

  private initializeForm(){
    let passValidators = [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
    ];

    this.setFirstPasswordForm = new FormGroup({
      'newPassword' : new FormControl('', passValidators),
      'repeatPassword' : new FormControl('', passValidators)
    });

    this.removePasswordForm = new FormGroup({
      "oldPassword": new FormControl('', passValidators)
    });

    this.rePasswordForm = new FormGroup({
      'oldPassword': new FormControl('', passValidators),
      'newPassword' : new FormControl('', passValidators),
      'repeatPassword' : new FormControl('', passValidators)
    });
  }

  private resetForm(){
    this.setFirstPasswordForm.reset({
      'newPassword' : "",
      'repeatPassword' : ""
    });

    this.removePasswordForm.reset({
      "oldPassword": ""
    });

    this.rePasswordForm.reset({
      'oldPassword': "",
      'newPassword' : "",
      'repeatPassword' : ""
    });
  }
}
