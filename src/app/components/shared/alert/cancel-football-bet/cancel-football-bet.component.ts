import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/visualServices/alert.service';
import { BetService } from 'src/app/services/restServices/bet.service';

@Component({
  selector: 'app-cancel-football-bet',
  templateUrl: './cancel-football-bet.component.html',
  styles: []
})
export class CancelFootballBetComponent {

  private betId:string = "";

  constructor(private alertS:AlertService, private betS:BetService) { 
    this.alertS.target.subscribe(id=> this.betId = id);
  }

  public close(){
    this.alertS.hideAlert();
  }

  public cancel(){
    this.alertS.hideAlert();
    this.betS.cancelFootballBet(this.betId);
  }
}
