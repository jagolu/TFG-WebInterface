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

  lostConnection(){
    this.message = [
      `Se ha perdido la conexión con el servidor.`,
      "Por favor, revisa tu conexión a internet."
    ];
    this.openTab();
  }

  serverError(){
    this.message = [
      `Ha habido interno del servidor, vuelva a intentarlo 
      más tarde.`
    ];
    this.openTab();
  }

  errorValidatingUser(){
    this.message = [
      `Ha habido un error validando los datos, vuelva a intentarlo
      más tarde.`
    ];
    this.openTab();
  }

  emailAlreadyTaken(){
    this.message = [
      "El email con el que intenta registrarse ya está registrado"
    ];
    this.openTab();
  }

  verificationSent(){
    this.message = [
      "Su registro se ha casi completado, solo es necesario un paso más.",
      "Verifique su correo mediante el enlace que se le ha enviado al mismo."
    ];
    this.openTab();
  }
}
