import { Injectable } from '@angular/core';
import { SessionStorage } from 'src/app/models/SessionStorage';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private sessionStorageKey = "session";

  constructor() { }

  getAPIToken(){
    try{
      return this.getSession().api_token;
    }catch(Exception){
      return "";
    }
  }

  getExpiresAt(){
    try{
      return this.getSession().expires_at;
    }catch(Exception){
      return 0;
    }
  }

  setSession(user: SessionStorage){
    sessionStorage.setItem(this.sessionStorageKey, JSON.stringify({
      "api_token":user.api_token,
      "role":user.role,
      "expires_at": this.getUTCFromNow20Min()
    }));
  }

  renewToken(token:string, role:string){
    this.removeSession();
    this.setSession({
      "api_token": token,
      "role": role
    })
  }

  removeSession(){
    sessionStorage.removeItem(this.sessionStorageKey);
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