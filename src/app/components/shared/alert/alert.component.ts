import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements AfterViewInit{
  private navbar;
  private outlet;

  constructor() { }

  ngAfterViewInit(){
    this.navbar = (document.querySelector("#navbarId") as HTMLElement);
    this.outlet = (document.querySelector(".main") as HTMLElement);
  }

  protected focusIn(){
    this.navbar.style.filter = "blur(6px)";
    this.outlet.style.filter = "blur(6px)";
  }

  protected focusOut(){
    this.navbar.style.filter = "blur(0px)";
    this.outlet.style.filter = "blur(0px)";
  }
}
