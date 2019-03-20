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
    this.txtMessage = (document.querySelector("#alertTextId") as HTMLElement);
  }

  openAlert(type:AlertType){
    this.txtMessage.textContent = this.getText(type);
    (document.querySelector("#alertButton") as HTMLElement).click();
  }

  private getText(type:AlertType){
    if(type == AlertType.LOSTCONNECTIONERROR) {
      return "Se ha perdido la conexión con el servidor. \r\n"+
            "Por favor, revisa tu conexión a internet.";
    }
    else if(type == AlertType.SERVERERROR) {
      return "Ha habido interno del servidor, vuelva a intentarlo más tarde.";
    }
    else if(type == AlertType.VALIDATINGUSERERROR) {
      return "Ha habido un error validando los datos, vuelva a intentarlo más tarde.";
    }
    else if(type == AlertType.EMAILTAKENERROR) {
      return "El email con el que intenta registrarse ya está registrado";
    }
    else if(type == AlertType.VERIFICATIONSENT) {
      return "Su registro se ha casi completado, solo es necesario un paso más.\r\n"+
        "Verifique su correo mediante el enlace que se le ha enviado al mismo.";
    }
    else if(type == AlertType.GOOGLEERROR || type == AlertType.FACEBOOKERROR){
      return `Ha habido un error con ${type}, vuelva a intentarlo más tarde.`;
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