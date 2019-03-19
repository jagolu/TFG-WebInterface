import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent {
  @Input() superId:string;
  private message:string[];

  constructor(private eR:ElementRef) { }

  private openTab(){
    this.focusIn();
    this.eR.nativeElement.children[0].click();
  }

  private focusIn(){
    (document.querySelector('#navbarId') as HTMLElement).style.filter = "blur(6px)";
    (document.querySelector('#'+this.superId) as HTMLElement).style.filter = "blur(6px)";
  }

  private focusOut(){
    (document.querySelector('#navbarId') as HTMLElement).style.filter = "blur(0px)";
    (document.querySelector('#'+this.superId) as HTMLElement).style.filter = "blur(0px)";
  }

  openAlert(type:AlertType){
    if(type == AlertType.LOSTCONNECTIONERROR) {
      this.message = ["Se ha perdido la conexión con el servidor.",
            "Por favor, revisa tu conexión a internet."];
    }
    else if(type == AlertType.SERVERERROR) {
      this.message = ["Ha habido interno del servidor, vuelva a intentarlo más tarde."]
    }
    else if(type == AlertType.VALIDATINGUSERERROR) {
      this.message = [ "Ha habido un error validando los datos, vuelva a intentarlo más tarde." ];
    }
    else if(type == AlertType.EMAILTAKENERROR) {
      this.message = [ "El email con el que intenta registrarse ya está registrado"];
    }
    else if(type == AlertType.VERIFICATIONSENT) {
      this.message = ["Su registro se ha casi completado, solo es necesario un paso más.",
        "Verifique su correo mediante el enlace que se le ha enviado al mismo."];
    }
    else if(type == AlertType.GOOGLEERROR || type == AlertType.FACEBOOKERROR){
      this.message = [`Ha habido un error con ${type}, vuelva a intentarlo más tarde.`];
    }
    this.openTab();
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
