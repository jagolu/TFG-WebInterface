import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../visualServices/loading.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService extends RestService{

  private _shopPath : string = "Shop/";

  constructor(http:HttpClient, loading:LoadingService) { 
    super(http, loading);
  }

  addGroupCapacity(groupName:string, morePlaces:number){
    return this.getRequest(this._shopPath+"AddGroupCapacity?"+
          "groupName="+groupName+"&morePlaces="+morePlaces, null, true);
  }
}
