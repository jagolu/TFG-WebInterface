import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styles: []
})
export class LoadingComponent{

  @Input() superId:string;
  private mainH:string;
  private col_height:string;

  constructor(private eR:ElementRef) { 
    this.eR.nativeElement.style.display ="none";
  }

  startLoading(){
    this.saveH();
    this.resize(true);
  }

  stopLoading(){
    this.resize(false)
  }

  private saveH(){
    this.mainH = (document.querySelector(".main") as HTMLElement).style.height;
    this.col_height = (document.querySelector("#colId") as HTMLElement).style.height ;
  }

  private resize(hide:boolean){
    (document.querySelector("#navbarId") as HTMLElement).style.display = hide? 
        "none":"block";
    (document.querySelector("#"+this.superId) as HTMLElement).style.display = hide? 
        "none":"block";
    (document.querySelector(".main") as HTMLElement).style.height = hide ? 
        window.innerHeight+"px" : this.mainH+"px";
    (document.querySelector("#colId") as HTMLElement).style.height = hide ?
        window.innerHeight+"px" : this.col_height+"px";
    (document.querySelector("#loadingIconId") as HTMLElement).style.marginTop = hide?
        "25%" : "0";
    this.eR.nativeElement.style.display = hide ? "block" : "none";
  }
}
