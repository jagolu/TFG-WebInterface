import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private txtMessage;

  constructor() { 
    this.txtMessage = [
      (document.querySelector("#alertTextId1") as HTMLElement),
      (document.querySelector("#alertTextId2") as HTMLElement),
      (document.querySelector("#alertTextId3") as HTMLElement)
    ];
  }

  openAlert(type:AlertType){
    let txt = this.getText(type);
    console.log(this.txtMessage);
    for(let line of this.txtMessage) line.style.display = "none"; 
    for(let i=0;i<txt.length;i++){
      this.txtMessage[i].textContent = txt[i];
      this.txtMessage[i].style.display = "block";
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
    else if(type == AlertType.SOCIALERROR){
      return [`Ha habido un error con la red social con la que intentabas iniciar sesión`, 
            `vuelva a intentarlo más tarde.`];
    }
    else if(type == AlertType.WRONGEMAILORPASSWORD){
      return ["El correo o contraseña introducidos no son correctos.",
          "Vuelva a intentarlo"];
    }
    else if(type == AlertType.NOTVALIDATEDYET){
      return ["El correo no se ha validado aun, revise su correo."];
    }
    else if(type == AlertType.CANTDELETEACCOUNT){
      return ["No se pudo eliminar tu cuenta de usuario.",
              "Vuelva a intentarlo más tarde."];
    }
    else if(type == AlertType.DELETEDACCOUNT){
      return ["Sentimos que te vayas.",
              "Ojalá vuelvas pronto."];
    }
    else if(type == AlertType.SESSIONEXPIRED){
      return ["Tu sesión ha expirado.",
              "Vuelva a registrarte"];
    }
    else if(type == AlertType.LIMITATIONCREATEGROUP){
      return ["No puedes crear más grupos de este tipo.",
              "Si deseas crear más grupos dirigete a la tienda."]
    }
    else if(type == AlertType.INCORRECTOLDPASSWORD){
      return ["La contraseña es incorrecta"];
    }
    else if(type == AlertType.PASSWORDCHANGED){
      return ["Tu contraseña ha cambiado"];
    }
  }
}

export enum AlertType{
  LOSTCONNECTIONERROR = "LOSTCONNECTIONERROR",
  SERVERERROR = "SERVERERROR",
  VALIDATINGUSERERROR = "VALIDATINGUSERERROR",
  EMAILTAKENERROR = "EMAILTAKENERROR",
  VERIFICATIONSENT = "VERIFICATIONSENT",
  SOCIALERROR = "SOCIALERROR",
  WRONGEMAILORPASSWORD = "WRONGEMAILORPASSWORD",
  NOTVALIDATEDYET = "NOTVALIDATEDYET",
  CANTDELETEACCOUNT = "CANTDELETEACCOUNT",
  DELETEDACCOUNT = "DELETEDACCOUNT",
  SESSIONEXPIRED = "SESSIONEXPIRED",
  LIMITATIONCREATEGROUP = "LIMITATIONCREATEGROUP",
  INCORRECTOLDPASSWORD = "INCORRECTOLDPASSWORD",
  PASSWORDCHANGED = "PASSWORDCHANGED" 
}