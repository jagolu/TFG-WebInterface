import { Component } from '@angular/core';
import { BasicAlertComponent } from 'src/app/components/shared/alerts/basic-alert.component';

@Component({
  selector: 'app-info-alert',
  templateUrl: './infoAlert.component.html'
})
export class InfoAlertComponent extends BasicAlertComponent{

  constructor() { 
    super();
  }
}
