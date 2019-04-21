import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  private information = new BehaviorSubject<UserInfo>(null);

  public info = this.information.asObservable();

  constructor() { }

  public updateInfo(info:UserInfo){
    this.information.next(info);
  }
}
