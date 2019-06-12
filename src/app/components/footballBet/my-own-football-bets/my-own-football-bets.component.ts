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

  public isJackpotBet(type:string):boolean{
    return type.includes("JACKPOT");
  }

  public isWinnerBet(type:string):boolean{
    return type.includes("WINNER");
  }

  public correctPart(type:string):string{
    if(type.includes("FULLTIME")) return "Full match";
    if(type.includes("FIRSTHALF")) return "First half";
    if(type.includes("SECONDHALF")) return "Second half";
  }

  public getWinnerWord(winner:number){
    console.log(winner);
    if(winner==0) return "Draw (X)";
    else if(winner==1) return "Home (1)";
    else if(winner==2) return "Away (2)";
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

  public cancelUserFootballBet(footballBet:GroupBet, coins:number, userFootballBet:string){
    this.alertS.cancelUserFootballBet(footballBet, coins, userFootballBet);
  }
}
