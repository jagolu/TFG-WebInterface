import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent {
  @Input() superId:string;
  private message:string[];

  constructor() { }

  private openTab(){
    (document.querySelector('#navbarId') as HTMLElement).style.filter = "blur(6px)";
    (document.querySelector('#'+this.superId) as HTMLElement).style.filter = "blur(6px)";
    (document.querySelector("#openButton") as HTMLElement).click();
  }

  private focusOut(){
    (document.querySelector('#navbarId') as HTMLElement).style.filter = "blur(0px)";
    (document.querySelector('#'+this.superId) as HTMLElement).style.filter = "blur(0px)";
  }

  openAlert(type:AlertType){
    this.message = null;
    this.message = type == AlertType.LOSTCONNECTIONERROR ? AlertMessage.lostConnectionErrorMessage() : this.message;
    this.message = type == AlertType.SERVERERROR ? AlertMessage.serverErrorMessage() : this.message;
    this.message = type == AlertType.VALIDATINGUSERERROR ? AlertMessage.validatingUserErrorMessage() : this.message;
    this.message = type == AlertType.EMAILTAKENERROR ? AlertMessage.emailTakenErrorMessage() : this.message;
    this.message = type == AlertType.VERIFICATIONSENT ? AlertMessage.verificationSentMessage() : this.message;
    if(this.message != null) this.openTab();
  }

}

class AlertMessage{
  static lostConnectionErrorMessage(){
    return [
      "Se ha perdido la conexión con el servidor.",
      "Por favor, revisa tu conexión a internet."
    ];
  }

  static serverErrorMessage(){
     return ["Ha habido interno del servidor, vuelva a intentarlo más tarde."]
  }

  static validatingUserErrorMessage(){
    return [ "Ha habido un error validando los datos, vuelva a intentarlo más tarde." ];
  }

  static emailTakenErrorMessage(){
    return [ "El email con el que intenta registrarse ya está registrado"];
  }

  static verificationSentMessage(){
    return [
      "Su registro se ha casi completado, solo es necesario un paso más.",
      "Verifique su correo mediante el enlace que se le ha enviado al mismo."
    ];
  }
}

export enum AlertType{
  LOSTCONNECTIONERROR = "LOSTCONNECTIONERROR",
  SERVERERROR = "SERVERERROR",
  VALIDATINGUSERERROR = "VALIDATINGUSERERROR",
  EMAILTAKENERROR = "EMAILTAKENERROR",
  VERIFICATIONSENT = "VERIFICATIONSENT",
}
