import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from './loading.service';

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
}
