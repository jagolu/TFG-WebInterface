import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { LoadingService } from '../visualServices/loading.service';
import { CreateGroup } from 'src/app/models/models';
import { SessionService } from '../userServices/session.service';


@Injectable({
  providedIn: 'root'
})
export class GroupService extends RestService{

  private _groupPath : string = "Group/";

  constructor(http: HttpClient, loading: LoadingService, 
              private sessionS:SessionService) { 
    super(http, loading);
  }

  createGroup(group:CreateGroup){
    return this.postRequest(group, this._groupPath+"CreateGroup").subscribe(
      ok=> this.sessionS.addGroup({
        "name": group.name,
        "type": group.type
      })
    );
  }

  checkGroupName(name:string){
    return this.getRequest(this._groupPath+"CheckGroupName?name="+name,null, true);
  }
}
