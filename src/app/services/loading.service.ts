import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService implements OnInit{

  private loading;
  private navbar;
  private outlet;

  constructor() { 
    this.loading = (document.querySelector("#loading") as HTMLElement);
    this.navbar = (document.querySelector("#navbarId") as HTMLElement);
    this.outlet = (document.querySelector(".main") as HTMLElement);
  }

  ngOnInit(){
    this.loading.style.display = "none";
  }

  startLoading(){
    this.resize(true);
  }

  stopLoading(){
    this.resize(false);
  }

  private resize(hide:boolean){
    this.navbar.style.display = hide ? "none" : "flex";
    this.outlet.style.display = hide ? "none" : "block";
    this.loading.style.display = hide ? "block" : "none";
    this.loading.style.marginTop = hide ? "17%" : "0"; 
  }
}
