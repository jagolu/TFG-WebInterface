import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/visualServices/alert.service';

@Component({
  selector: 'app-cancel-football-bet',
  templateUrl: './cancel-football-bet.component.html',
  styles: []
})
export class CancelFootballBetComponent {

  constructor(private alertS:AlertService) { }

  public close(){
    this.alertS.hideAlert();
  }
}
