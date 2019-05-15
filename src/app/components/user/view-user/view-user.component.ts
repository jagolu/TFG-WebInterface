import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/restServices/user.service';
import { UserInfoService } from 'src/app/services/userServices/user-info.service';
import { UserInfo } from 'src/app/models/models';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styles: []
})
export class ViewUserComponent implements OnInit{

  public _user:UserInfo;

  constructor(private _userS:UserService, private userInfoS:UserInfoService) { 
    this._userS.getUserOptions().subscribe(
      (user:any)=>{
        this.userInfoS.updateInfo({
          "email": user.email,
          "nickname": user.nickname,
          "image": user.img,
          "joinTime": user.timeSignUp,
          "hasPassword": user.password
        });
      }
    );
  }

  ngOnInit(){
    this.userInfoS.info.subscribe(info =>{
      this._user = info
    });
  }
}
