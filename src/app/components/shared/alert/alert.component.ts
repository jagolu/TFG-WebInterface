import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent {
  @Input() superId:string;
  private message:string[];

  constructor() { }

  openTab(msg:any[]){
    this.message = msg;
    (document.querySelector('#navbarId') as HTMLElement).style.filter = "blur(6px)";
    (document.querySelector('#'+this.superId) as HTMLElement).style.filter = "blur(6px)";
    (document.querySelector("#openButton") as HTMLElement).click();
  }

  focusOut(){
    (document.querySelector('#navbarId') as HTMLElement).style.filter = "blur(0px)";
    (document.querySelector('#'+this.superId) as HTMLElement).style.filter = "blur(0px)";
  }
}
