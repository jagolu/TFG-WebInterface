import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateGroupAlertService {

  constructor() { }

  openAlert(){
    (document.querySelector("#createGroupAlert") as HTMLElement).click();
  }
}
