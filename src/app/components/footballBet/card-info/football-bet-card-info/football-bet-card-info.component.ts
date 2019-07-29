import { Component, Input } from '@angular/core';
import { GroupBet } from 'src/app/models/models';
import { AlertService } from 'src/app/services/visualServices/alert.service';

@Component({
  selector: 'app-football-bet-card-info',
  templateUrl: './football-bet-card-info.component.html',
  styles: []
})
export class FootballBetCardInfoComponent{

  @Input() bet: GroupBet;
  @Input() betId:string = "";
  @Input() ended:Boolean = true;

  constructor(private alertS:AlertService) { }

  public isJackpotBet(type:string):boolean{
    return type.includes("JACKPOT");
  }

  public cancel(){
    this.alertS.cancelFootballBet(this.betId);
  }
}
