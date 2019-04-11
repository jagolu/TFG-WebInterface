import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordAlertService {

  private txtMessage;
  private idButtons;
  private hasPassword;

  constructor() { 
    this.txtMessage = (document.querySelector("#alertTextId") as HTMLElement);
    this.idButtons = [
      PasswordAlertType.DELETEACCOUNT,
      PasswordAlertType.DELETEGROUP
    ]
  }

  openAlert(type:PasswordAlertType, hasPassword:boolean){
    this.hasPassword = hasPassword;
    let txt = this.getText(type);
    this.txtMessage.textContent = txt;

    this.showButton(type);
    if(hasPassword) (document.querySelector("#passwordAlertButtonWithPassword") as HTMLElement).click();
    else (document.querySelector("#passwordAlertButtonWithoutPassword") as HTMLElement).click();
  }

  private getText(type:PasswordAlertType){
    if(type == PasswordAlertType.DELETEACCOUNT){
      return "Vas a eliminar tu cuenta de usuario. ¿Estás seguro?";
    }
  }

  private showButton(type:PasswordAlertType){
    this.idButtons
      .filter(
        button=> button != type.toString()
      )
      .forEach(buttonId => {
        (document.querySelector("#"+buttonId) as HTMLElement).style.display="none";
        (document.querySelector("#"+buttonId+"NOTPASSWORD") as HTMLElement).style.display="none";
      }
    );
    (document.querySelector("#"+type.toString()) as HTMLElement).style.display="block";
    (document.querySelector("#"+type.toString()+"NOTPASSWORD") as HTMLElement).style.display="block";
  }
}

export enum PasswordAlertType{
  DELETEACCOUNT = "DELETEACCOUNT",
  DELETEGROUP = "DELETEGROUP"
}