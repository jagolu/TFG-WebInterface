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
    this.saveWindowSize();
    this.resize(true);
  }

  stopLoading(){
    this.resize(false)
  }

  private saveWindowSize(){
    this.mainH = (document.querySelector(".main") as HTMLElement).style.height;
    this.col_height = this.eR.nativeElement.children[0].children[0].style.height;
  }

  private resize(hide:boolean){
    (document.querySelector("#navbarId") as HTMLElement).style.display = hide? 
        "none":"flex";
    (document.querySelector("#"+this.superId) as HTMLElement).style.display = hide? 
        "none":"block";
    (document.querySelector(".main") as HTMLElement).style.height = hide ? 
        window.innerHeight+"px" : this.mainH+"px";
    this.eR.nativeElement.children[0].children[0].style.height = hide ?
        window.innerHeight+"px" : this.col_height+"px";
    this.eR.nativeElement.children[0].children[0].children[0].style.marginTop = hide?
        "25%" : "0";
    this.eR.nativeElement.style.display = hide ? "block" : "none";
  }
}
