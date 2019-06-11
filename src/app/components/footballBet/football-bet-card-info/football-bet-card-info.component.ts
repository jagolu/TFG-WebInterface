import { Component, Input } from '@angular/core';
import { GroupBet } from 'src/app/models/models';

@Component({
  selector: 'app-football-bet-card-info',
  templateUrl: './football-bet-card-info.component.html',
  styles: []
})
export class FootballBetCardInfoComponent{

  @Input() bet: GroupBet;

  constructor() { }

  public isJackpotBet(type:string){
    return type.includes("JACKPOT");
  }

}
