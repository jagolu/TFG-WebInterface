import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { LoadingService } from '../visualServices/loading.service';
import { CreateGroup } from 'src/app/models/models';


@Injectable({
  providedIn: 'root'
})
export class GroupService extends RestService{

  private _groupPath : string = "Group/";

  constructor(http: HttpClient, loading: LoadingService) { 
    super(http, loading);
  }

  createGroup(group:CreateGroup){
    return this.postRequest(group, this._groupPath+"CreateGroup");
  }

  checkGroupName(name:string){
    return this.getRequest(this._groupPath+"CheckGroupName?name="+name,null, true);
  }
}
