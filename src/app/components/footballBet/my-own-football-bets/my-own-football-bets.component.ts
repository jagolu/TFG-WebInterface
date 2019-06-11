import { Component, OnInit } from '@angular/core';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';
import { EndedFootballBet, IconModel, Icons, GroupBet, HistoryUserFootballBet } from 'src/app/models/models';
import { MoneyBack } from 'src/app/models/Bets/MoneyBack';

@Component({
  selector: 'app-my-own-football-bets',
  templateUrl: './my-own-football-bets.component.html',
  styles: []
})
export class MyOwnFootballBetsComponent implements OnInit {

  public bets:EndedFootballBet[];  
  public coin_icon:IconModel = Icons.COIN;

  constructor(private groupPage:GroupInfoService) { }

  ngOnInit() {
    this.groupPage.info.subscribe(page=>{
      try{this.bets = page.myBets;}
      catch(Error){}
    });
  }

  public isJackpotBet(type:string):boolean{
    return type.includes("JACKPOT");
  }

  public isWinnerBet(type:string):boolean{
    return type.includes("WINNER");
  }

  public correctPart(type:string):string{
    return type.includes("FULLTIME") ? "Full match" : "First time";
  }

  public getWinnerWord(winner:number){
    if(winner==0) "Draw (X)";
    else if(winner==1) "Home (1)";
    else if(winner==2) "Away (2)";
  }

  public getJackpot(bet:GroupBet){
    return bet.minBet*bet.usersJoined;
  }

  public getWinRate(bet:GroupBet, own:HistoryUserFootballBet){
    return Math.round((bet.typeBet.winRate+bet.typePay.winRate)*own.bet);
  }

  public  howMuchMoneyBack(typeBetLose:number, typePayLose:number, coins:number){
    return MoneyBack.getMoneyBack(typeBetLose, typePayLose, coins);
  }
}
