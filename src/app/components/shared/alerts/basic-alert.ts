import { AfterViewInit } from '@angular/core';


export class BasicAlert implements AfterViewInit{
  private navbar;
  private outlet;
  public init = true;

  constructor() { }

  ngAfterViewInit(){
    this.navbar = (document.querySelector("#navbarId") as HTMLElement);
    this.outlet = (document.querySelector(".main") as HTMLElement);
  }

  public focusIn(){
    this.navbar.style.filter = "blur(6px)";
    this.outlet.style.filter = "blur(6px)";
    this.init = false;
  }

  public focusOut(){
    this.navbar.style.filter = "blur(0px)";
    this.outlet.style.filter = "blur(0px)";
    this.init = true;
  }

  public setInitFalse(){
    this.init = false;
  }

}
