import { Component, OnInit } from '@angular/core';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';
import { EndedFootballBet, IconModel, Icons, GroupBet, HistoryUserFootballBet } from 'src/app/models/models';
import { AlertService } from 'src/app/services/visualServices/alert.service';
import { MoneyBack } from 'src/app/models/Bets/MoneyBack';

@Component({
  selector: 'app-my-own-football-bets',
  templateUrl: './my-own-football-bets.component.html',
  styles: []
})
export class MyOwnFootballBetsComponent implements OnInit {

  public bets:EndedFootballBet[];  
  public coin_icon:IconModel = Icons.COIN;

  constructor(private groupPage:GroupInfoService, private alertS:AlertService) { }

  ngOnInit() {
    this.groupPage.info.subscribe(page=>{
      try{this.bets = page.myBets;}
      catch(Error){}
    });
  }
}
