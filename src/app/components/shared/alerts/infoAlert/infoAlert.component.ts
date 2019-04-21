import { Component } from '@angular/core';
import { BasicAlert } from 'src/app/components/shared/alerts/basic-alert';

@Component({
  selector: 'app-info-alert',
  templateUrl: './infoAlert.component.html'
})
export class InfoAlertComponent extends BasicAlert{

  constructor() { 
    super();
  }
}
