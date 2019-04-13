import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService{

  private loading;
  private navbar;
  private outlet;
  private isLoading:boolean;

  constructor() { 
    this.isLoading = false;
  }

  startLoading(){
    if(this.isLoading) return;
    this.loading = (document.querySelector("#loading") as HTMLElement);
    this.navbar = (document.querySelector("#navbarId") as HTMLElement);
    this.outlet = (document.querySelector(".main") as HTMLElement);
    this.resize(true);
    this.isLoading = true;
  }

  stopLoading(){
    if(!this.isLoading) return;
    this.resize(false);
    this.isLoading = false;
  }

  private resize(hide:boolean){
    this.navbar.style.display = hide ? "none" : "flex";
    this.outlet.style.display = hide ? "none" : "block";
    this.loading.style.display = hide ? "block" : "none";
    this.loading.style.marginTop = hide ? "17%" : "0"; 
  }
}
