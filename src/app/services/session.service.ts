import { Injectable } from '@angular/core';
import { SessionStorage } from '../models/SessionStorage';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private sessionStorageKey = "session";

  constructor() { }

  getAPIToken(){
    return this.getSession().api_token;
  }

  getExpiresAt(){
    return this.getSession().expires_at;
  }

  setSession(user: SessionStorage){
    sessionStorage.setItem("session", JSON.stringify({
      "api_token":user.api_token,
      "role":user.role,
      "expires_at": this.getUTCFromNow20Min()
    }));
  }

  removeSession(){
    sessionStorage.removeItem("session");
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