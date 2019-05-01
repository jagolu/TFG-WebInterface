import { Injectable } from '@angular/core';
import { SessionStorage } from 'src/app/models/Identity/SessionStorage';
import { BehaviorSubject } from 'rxjs';
import { Session, Group } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private sessionStorageKey = "session";
  private user = new BehaviorSubject<Session>(null);

  public User = this.user.asObservable();


  constructor() { 
    try{
      let u = this.getSession();
      this.updateUser({
        "role": u.role,
        "groups": u.groups
      });
    }catch(Exception){
      this.updateUser(null);
    }
  }


  public getAPIToken(){
    try{
      return this.getSession().api_token;
    }catch(Exception){
      return "";
    }
  }


  public getExpiresAt(){
    try{
      return this.getSession().expires_at;
    }catch(Exception){
      return 0;
    }
  }


  setSession(user: SessionStorage){
    sessionStorage.setItem(
      this.sessionStorageKey, JSON.stringify({
        "api_token":user.api_token,
        "role":user.role,
        "expires_at": this.getUTCFromNow20Min(),
        "groups": user.groups
      })
    );

    this.updateUser({
      "role": user.role,
      "groups": user.groups
    });
  }

  renewToken(user: SessionStorage){
    this.removeSession();
    this.setSession(user);
    this.updateUser({
      "role": user.role,
      "groups": user.groups
    });
  }

  updateUser(u:Session):void{
    this.user.next(u);
  }

  addGroup(group:Group){
    let nowGroups:Group[] = this.getSession().groups;
    nowGroups.push(group);
    this.renewToken({
      "api_token": this.getAPIToken(),
      "role": this.getSession().role,
      "groups": nowGroups
    });
  }

  // removeGroup(group:Group){
  //   //TODO
  // }

  public removeSession(){
    sessionStorage.removeItem(this.sessionStorageKey);
    this.updateUser(null);
  }

  /*---------------Private functions------------------- */
  private getSession(){
    return JSON.parse(sessionStorage.getItem(this.sessionStorageKey));
  }

  private getUTCFromNow20Min():number{
    return Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate(),
      new Date().getUTCHours(),
      new Date().getUTCMinutes()+20
    );
  }
}