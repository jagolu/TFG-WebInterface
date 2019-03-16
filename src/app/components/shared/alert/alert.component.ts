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
    if(type == AlertType.LOSTCONNECTIONERROR) this.message = this.text(AlertType.LOSTCONNECTIONERROR);
    else if(type == AlertType.SERVERERROR) this.message = this.text(AlertType.SERVERERROR);
    else if(type == AlertType.VALIDATINGUSERERROR) this.message = this.text(AlertType.VALIDATINGUSERERROR);
    else if(type == AlertType.EMAILTAKENERROR) this.message = this.text(AlertType.EMAILTAKENERROR);
    else if(type == AlertType.VERIFICATIONSENT) this.message = this.text(AlertType.VERIFICATIONSENT);
    else this.message = null;

    if(this.message != null) this.openTab();
  }

  private text(type:AlertType){
    if(type == AlertType.LOSTCONNECTIONERROR) {
      return ["Se ha perdido la conexión con el servidor.",
            "Por favor, revisa tu conexión a internet."];
    }
    else if(type == AlertType.SERVERERROR) {
      return ["Ha habido interno del servidor, vuelva a intentarlo más tarde."]
    }
    else if(type == AlertType.VALIDATINGUSERERROR) {
      return [ "Ha habido un error validando los datos, vuelva a intentarlo más tarde." ];
    }
    else if(type == AlertType.EMAILTAKENERROR) {
      return [ "El email con el que intenta registrarse ya está registrado"];
    }
    else if(type == AlertType.VERIFICATIONSENT) {
      return ["Su registro se ha casi completado, solo es necesario un paso más.",
        "Verifique su correo mediante el enlace que se le ha enviado al mismo."];
    }
    return null;
  }
}

export enum AlertType{
  LOSTCONNECTIONERROR = "LOSTCONNECTIONERROR",
  SERVERERROR = "SERVERERROR",
  VALIDATINGUSERERROR = "VALIDATINGUSERERROR",
  EMAILTAKENERROR = "EMAILTAKENERROR",
  VERIFICATIONSENT = "VERIFICATIONSENT",
}
