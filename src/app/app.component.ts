import { Component, enableProdMode } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent{ 
  constructor(){
    if(environment.production){
      enableProdMode();
      window.console.log = function () {};
    }
  }
}
