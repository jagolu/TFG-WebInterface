import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from 'src/app/services/visualServices/loading.service';
import { ChangeUserInfo, DeleteUser } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService extends RestService{

  private _userPath : string = "User/";

  constructor(_http:HttpClient, _loading:LoadingService) { 
    super(_http, _loading);
  }

  getUserOptions(){
    return this.getRequest(this._userPath+"UserInfo");
  }

  changeUserInfo(info:ChangeUserInfo){
    return this.postRequest(info,this._userPath+"ChangeUserInfo");
  }

  deleteUser(user:DeleteUser){
    return this.postRequest(user, this._userPath+"DeleteAccount");
  }
}
