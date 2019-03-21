import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private navbar;
  private outlet;
  private txtMessage;

  constructor() { 
    this.navbar = (document.querySelector("#navbar") as HTMLElement);
    this.outlet = (document.querySelector(".main") as HTMLElement);
    this.txtMessage = [
      (document.querySelector("#alertTextId1") as HTMLElement),
      (document.querySelector("#alertTextId2") as HTMLElement),
      (document.querySelector("#alertTextId3") as HTMLElement)
    ];
  }

  openAlert(type:AlertType){
    let txt = this.getText(type);
    for(let line of this.txtMessage) line.display = "none"; 
    for(let i=0;i<txt.length;i++){
      this.txtMessage[i].textContent = txt[i];
      this.txtMessage[i].display = "block";
    }
    (document.querySelector("#alertButton") as HTMLElement).click();
  }

  private getText(type:AlertType){
    if(type == AlertType.LOSTCONNECTIONERROR) {
      return ["Se ha perdido la conexión con el servidor.",
            "Por favor, revisa tu conexión a internet."]
    }
    else if(type == AlertType.SERVERERROR) {
      return ["Ha habido interno del servidor, vuelva a intentarlo más tarde."];
    }
    else if(type == AlertType.VALIDATINGUSERERROR) {
      return ["Ha habido un error validando los datos, vuelva a intentarlo más tarde."];
    }
    else if(type == AlertType.EMAILTAKENERROR) {
      return ["El email con el que intenta registrarse ya está registrado"];
    }
    else if(type == AlertType.VERIFICATIONSENT) {
      return ["Su registro se ha casi completado, solo es necesario un paso más.",
        "Verifique su correo mediante el enlace que se le ha enviado al mismo."];
    }
    else if(type == AlertType.GOOGLEERROR || type == AlertType.FACEBOOKERROR){
      return [`Ha habido un error con ${type}, vuelva a intentarlo más tarde.`];
    }

  }
}

export enum AlertType{
  LOSTCONNECTIONERROR = "LOSTCONNECTIONERROR",
  SERVERERROR = "SERVERERROR",
  VALIDATINGUSERERROR = "VALIDATINGUSERERROR",
  EMAILTAKENERROR = "EMAILTAKENERROR",
  VERIFICATIONSENT = "VERIFICATIONSENT",
  GOOGLEERROR = "Google",
  FACEBOOKERROR = "Facebook"
}