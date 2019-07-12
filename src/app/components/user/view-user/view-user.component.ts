import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/restServices/user.service';
import { UserInfoService } from 'src/app/services/userServices/user-info.service';
import { UserInfo } from 'src/app/models/models';
import { SessionService } from 'src/app/services/userServices/session.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styles: []
})
export class ViewUserComponent implements OnInit{

  public _user:UserInfo;

  public email:string;
  public username:string;
  public joinTime:string;

  constructor(private _userS:UserService, private userInfoS:UserInfoService, 
              private sessionS:SessionService) { 
                
    this._userS.getUserOptions().subscribe((user:any)=>{
        this.email = user.email;
        this.joinTime = user.timeSignUp;      
        this.userInfoS.updateInfo({
          "email": user.email,
          "image": user.img
        });

    });
  }

  ngOnInit(){
    this.sessionS.User.subscribe(u=>{
      try{this.username = u.username}
      catch(Exception){this.username = ""}
    });

    this.userInfoS.info.subscribe(info =>{
      this._user = info
    });
  }

  public isAdmin(){
    return this.sessionS.isAdmin();
  }
}
