import { Component, ElementRef, Input } from '@angular/core';



@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent {
  @Input() msg:string;
  @Input() superId:string;

  constructor(private eR:ElementRef) { 
  }

  openTab(){
    (document.querySelector('#navbarId') as HTMLElement).style.filter = "blur(6px)";
    (document.querySelector('#'+this.superId) as HTMLElement).style.filter = "blur(6px)";
    (document.querySelector("#openButton") as HTMLElement).click();
  }

  focusOut(){
    (document.querySelector('#navbarId') as HTMLElement).style.filter = "blur(0px)";
    (document.querySelector('#'+this.superId) as HTMLElement).style.filter = "blur(0px)";
  }
}
