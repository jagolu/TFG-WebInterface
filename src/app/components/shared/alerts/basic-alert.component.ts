import { AfterViewInit } from '@angular/core';


export class BasicAlertComponent implements AfterViewInit{
  private navbar;
  private outlet;
  private init = true;

  constructor() { }

  ngAfterViewInit(){
    this.navbar = (document.querySelector("#navbarId") as HTMLElement);
    this.outlet = (document.querySelector(".main") as HTMLElement);
  }

  protected focusIn(){
    this.navbar.style.filter = "blur(6px)";
    this.outlet.style.filter = "blur(6px)";
    this.init = false;
  }

  protected focusOut(){
    this.navbar.style.filter = "blur(0px)";
    this.outlet.style.filter = "blur(0px)";
    this.init = true;
  }

  protected setInitFalse(){
    this.init = false;
  }

}
