import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/restServices/user.service';
import { UserInfoService } from 'src/app/services/userServices/user-info.service';
import { UserInfo, IconModel, Icons } from 'src/app/models/models';
import { AlertService } from 'src/app/services/visualServices/alert.service';
import { SessionService } from 'src/app/services/userServices/session.service';


@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styles: []
})
export class UserInfoFormComponent implements OnInit {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The id of the collapse item (HTML ID)
   * 
   * @access public
   * @var {string} id
   */
  @Input()id:string;

  /**
   * The labelled id (HTML ID)
   * 
   * @access public
   * @var {string} labelled
   */
  @Input()labelled:string;

  /**
   * The nickname form
   * 
   * @access public
   * @var {FormGroup} nicknameForm
   */
  public nicknameForm:FormGroup;

  /**
   * The form of the password
   * 
   * @access public
   * @var {FormGroup} passwordForm
   */
  public passwordForm:FormGroup;

  /**
   * The form to change the user image
   * 
   * @access public
   * @var {FormGroup} imageForm
   */
  public imageForm:FormGroup;

  /**
   * To know if both password are equals
   * 
   * @access public
   * @var {Boolean} equalPasswords
   */
  public equalPasswords : Boolean;

  /**
   * The info of the actual user
   * 
   * @access public
   * @var {UserInfo} info
   */
  public info:UserInfo;

  /**
   * The nickname of the user
   * 
   * @access public
   * @var {string} username
   */
  public username:string;

  /**
   * The type of the password input
   * 
   * @access public
   * @var {string} passwordType
   */
  public passwordType:string="password";

  /**
   * A icon of a open & closed eye
   * 
   * @access public
   * @var {IconModel} icon_eye
   */
  public icon_eye:IconModel = Icons.EYE_OPEN_CLOSE;

  /**
   * The tag of the eye icon
   * 
   * @access public
   * @var {any} eye
   */
  @ViewChild('changeUserPasswordEye') eye;

  /**
   * To know if there is any file selected, also
   * works for save in the selected file
   * 
   * @access private
   * @var {any} _selectedFile
   */
  private _selectedFile;

  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {AlertService} __alertS To launch the alert to delete the account
   * @param {UserService} __userS To do the change-info requests
   * @param {UserInfoService} __userInfoS To get the user info
   * @param {SessionService} __sessionS To get the session info
   */
  constructor(
    private __alertS:AlertService, 
    private __userS:UserService,
    private  __userInfoS:UserInfoService, 
    private __sessionS:SessionService
  ) { }

  /**
   * Get the user info and initializes all
   * the forms
   * 
   * @OnInit
   */
  ngOnInit() {
    this.__userInfoS.info.subscribe(info=> this.info = info);
    this.__sessionS.User.subscribe(u=>{
      try{this.username = u.username}
      catch(Error){}
    });
    this.initializeNicknameForm();
    this.initializePasswordForm();
    this.initializeImageForm();
    this.equalPasswords = false;
    this._selectedFile = false;
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Do the request to change the nickname of the user. 
   * After that, reloads or cleans the view
   * 
   * @access public
   */
  public changeNickname(){
    this.__userS.changeUserInfo({
      'nickname': this.nicknameForm.controls['nickname'].value,
      "oldPassword": null,
      "newPassword":null,
      "image": null
    }).subscribe((res:any)=>{
      this.reload(res.info);
      this.resetForm();
    },_=>this.resetForm());
  }

  /**
   * Do the request to change the password of the user.
   * After that, reloads or cleans the view
   * 
   * @access public
   */
  public changePassword(){
    this.__userS.changeUserInfo({
      'nickname': null,
      "oldPassword": this.passwordForm.controls['oldPassword'].value,
      "newPassword":this.passwordForm.controls['newPassword'].value,
      "image": null
    }).subscribe((res:any)=> this.reload(res.info));
    this.resetForm();
  }
  
  /**
   * Do the request to change the image profile
   * of the user.
   * After that, reloads or cleans the view.
   * 
   * @access public
   */
  public changeImg(){
    let fr = new FileReader();

    fr.onload = () =>{
      this.__userS.changeUserInfo({
        "nickname": null,
        "oldPassword": null,
        "newPassword":null,
        "image": fr.result.toString()
      }).subscribe((res:any)=> this.reload(res.info));
      this.resetForm();
    }
    fr.readAsDataURL(this._selectedFile);
  }

  /**
   * Set true (if both passwords are equal) or
   * false (if both password are not equal) to the
   * equalPasswords var.
   * 
   * @access public
   */
  public equalPassword(){
    let password = this.passwordForm.controls['newPassword'].value;
    let repeatPassword = this.passwordForm.controls['repeatPassword'].value;
    this.equalPasswords = ((password == repeatPassword) && password.length>0 && repeatPassword.length>0);
  }

  /**
   * Opens the alert to delete the account
   * 
   * @access public
   */
  public openAlert(){
    this.__alertS.deleteAccount(this.info.email);
  }

  /**
   * Load the image that the user
   * has chosen
   * 
   * @access public
   * @param event The event of choose the image 
   */
  public loadFile(event){
    this._selectedFile = event.target.files[0];
  }

  /**
   * Says if the actual user is admin or not
   * 
   * @access public
   * @returns {Boolean} True if the user is an admin,
   * false otherwise
   */
  public isAdmin():Boolean{
    return this.__sessionS.isAdmin();
  }

  /**
   * Changes the password input type
   * 
   * @access public
   */
  public watchPassword(){
    this.passwordType = this.passwordType=="text" ? "password": "text";
  }

  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Initializes the form of the password
   * 
   * @access private
   */
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

  /**
   * Initializes the form of the image
   * 
   * @access private
   */
  private initializeImageForm(){
    this.imageForm = new FormGroup({
      "userImage": new FormControl('', Validators.required)
    });
  }
  
  /**
   * Initializes the form of the nickname
   * 
   * @access private
   */
  private initializeNicknameForm(){
    this.nicknameForm = new FormGroup({
      'nickname': new FormControl(
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          Validators.pattern('^[A-Za-z0-9_-]*$')
        ]
      )
    })
  }
  
  /**
   * Reloads the view after the user info changes
   * 
   * @access private
   * @param {any} res The response with the updated user info
   */
  private reload(res:any) { 
    this.__userInfoS.updateInfo({
      "email": res.email,
      "image": res.img
    });
    this.__sessionS.updateUsername(res.nickname);
  }
  
  /**
   * Resets all the forms
   * 
   * @access private
   */
  private resetForm(){
    if(this.passwordType != "password"){
      this.eye.eR.nativeElement.click();
      this.eye.icon.style.color = "black"
    }
    this.passwordType = "password";
    this.nicknameForm.reset({
      "nickname": ""
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
