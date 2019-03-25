import { Component, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styles: []
})
export class LoadingComponent implements OnInit{

  constructor() { }


  ngOnInit(){
    (document.querySelector("#loading") as HTMLElement).style.display = "none";
  }
}
