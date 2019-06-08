import { Component, OnDestroy } from '@angular/core';
import { BetService } from 'src/app/services/restServices/bet.service';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';
import { AvailableBet, FootballMatch, NameWinRate, AlertInfoType } from 'src/app/models/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isString } from 'util';
import { AlertService } from 'src/app/services/visualServices/alert.service';

@Component({
  selector: 'app-football-bet',
  templateUrl: './football-bet.component.html',
  styles: []
})
export class FootballBetComponent implements OnDestroy {

  //
  // ─── EXPLANATION VARS ───────────────────────────────────────────────────────────
  //
  public explanationBetType:string;
  public explanationPriceType:string;
  public winRate:number = 0.0;
  public errorMessage:string;

  //
  // ─── SELECT VARS ────────────────────────────────────────────────────────────────
  //
  public allowedDates : string[];
  public mins:number[];
  public maxs:number[];

  //
  // ─── SHOW BACKEND INFO ──────────────────────────────────────────────────────────
  //
  public betForm:FormGroup;
  public bets:AvailableBet[] = [];
  public matches : FootballMatch[];
  public allowedBets : NameWinRate[];
  public allowedPays : NameWinRate[];

  //
  // ─── VALIDATORS FOR SHOW OR NOT FORMS ───────────────────────────────────────────
  //
  private newBet_competitionMatches_launched = false;
  public selectedBet:boolean = false;
  public selectedMatch:boolean = false;
  public selectedPrice:boolean = false; 
  public selectedMaxDay:boolean = false;
  public type_group_bet:boolean = false;

  //
  // ─── TO DO THE BACKEND REQUEST ──────────────────────────────────────────────────
  //
  private groupName:string = null;
  private match:FootballMatch = null;
  private betType:NameWinRate = null;
  private priceType:NameWinRate = null;

  //
  // ─── TO NOW THE ACTUAL USER COINS ───────────────────────────────────────────────
  //
  private userCoins:number = 0;

  constructor(private groupPageS:GroupInfoService, private betS:BetService, private alertS:AlertService) { 
    this.initializeForm();  
    this.groupPageS.info.subscribe(page=>{
      try{
        if(this.groupName != page.name && page.name.length > 1){
          this.groupName = page.name;
          this.userCoins = page.members[page.members.length-1].coins;
          let role = page.members ? page.members[page.members.length-1].role : "";
          if(!page.type && role == "GROUP_MAKER") this.getPageGroup(this.groupName);  
        }
      }
      catch(Error){}
    });
  }

  ngOnDestroy(){
    this.groupPageS.removeInfo();
  }

  public launchBet(){
    let date = (document.querySelector("#newBet_allowedDates_select") as HTMLSelectElement).value;

    this.betS.launchBet({
      "groupName": this.groupName,
      "matchDay": this.match.matchday,
      "typeBet": this.betType.name,
      "typePay": this.priceType.name,
      "minBet": !this.type_group_bet ? this.betForm.controls["minBet"].value : this.betForm.controls["exactBet"].value,
      "maxBet": !this.type_group_bet ? this.betForm.controls["maxBet"].value : this.betForm.controls["exactBet"].value,
      "lastBetTime": new Date(date)
    }).subscribe(
      _=>{
        this.resetForm();
        this.getPageGroup(this.groupName);
        this.newBet_competitionMatches_launched = false;
        (document.querySelector("#newBet_competitionMatches_button") as HTMLElement).click();
        (document.querySelector("#launchFootBallBetButton") as HTMLElement).click();
        (document.querySelector("#newBet_competitionSelect") as HTMLSelectElement).selectedIndex = 0;
      }
    );
  }

  public selectCompetition(){
    let competition = (document.querySelector("#newBet_competitionMatches_select") as HTMLSelectElement).selectedIndex;
    if(!this.newBet_competitionMatches_launched){
      this.newBet_competitionMatches_launched = true;
      (document.querySelector("#newBet_competitionMatches_button") as HTMLElement).click();
    }
    this.resetForm();
    (document.querySelector("#newBet_competitionMatches_select") as HTMLSelectElement).selectedIndex = 0;
    this.matches = this.bets[competition].matches;
    this.allowedPays = this.bets[competition].allowedTypePays;
  }

  public selectMatchDay(){
    let matchday = (document.querySelector("#newBet_competitionMatches_select") as HTMLSelectElement).selectedIndex;
    if(this.selectedMatch) (document.querySelector("#newBet_betType_select") as HTMLSelectElement).selectedIndex = 0;
    this.resetForm();
    this.match = this.matches[matchday];
    this.setAllowedDays(this.match);
    this.allowedBets = this.match.allowedTypeBets;
    this.selectedMatch = true;
  }

  public setMaxBet(){
    let max = parseInt(this.betForm.controls["maxBet"].value);
    let min = parseInt(this.betForm.controls["minBet"].value);
    if(max == 0 || (max<min && max!=0)){
      let minOut = min/100;
      this.maxs = Array(100-minOut+1).fill(0).map((x,i)=>(i+minOut)*100);
      this.betForm.controls["maxBet"].setValue(0);
    }
    if(min>this.userCoins) this.alertS.openAlertInfo(AlertInfoType.BETHIGHERTHANYOURCOINS);
  }

  public setExactBet(){
    let minMax = parseInt(this.betForm.controls["exactBet"].value);
    if(minMax>this.userCoins) this.alertS.openAlertInfo(AlertInfoType.BETHIGHERTHANYOURCOINS);
  }

  public setMinBet(){
    let max = parseInt(this.betForm.controls["maxBet"].value);
    let min = parseInt(this.betForm.controls["minBet"].value);
    if(min == 0 || (min>max && min!=0)){
      let minOut = max/100;
      this.mins = Array(minOut).fill(0).map((x,i)=>(i+1)*100);
      this.betForm.controls["minBet"].setValue(0);
    }
  }

  public setBetType(){
    let typeid = (document.querySelector("#newBet_betType_select") as HTMLSelectElement).selectedIndex-1;
    let type:NameWinRate = this.allowedBets[typeid];
    this.selectedBet = true;
    this.explanationBetType = type.description;
    this.betType = type;
    this.winRate = type.winRate;
    if(this.priceType != null) this.winRate+=this.priceType.winRate;
  }

  public setPriceType(){    
    let typeid = (document.querySelector("#newBet_priceType_select") as HTMLSelectElement).selectedIndex-1;
    let type:NameWinRate = this.allowedPays[typeid];
    this.type_group_bet = type.name.includes("GROUP");
    this.selectedPrice = true;
    this.explanationPriceType = type.description;
    this.priceType = type;
    this.winRate = type.winRate;
    if(this.betType != null) this.winRate+=this.betType.winRate;
    this.initializeForm();
  }

  public setDate(){
    this.selectedMaxDay = true;
  }

  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //

  
  private getPageGroup(name:string){
    this.betS.getPageGroup(name).subscribe(
      (bets:AvailableBet[])=> {
        if(bets.length == 1 && bets[0].competition=="MaximunWeekBetsReached"){
          this.bets = [];
          this.errorMessage = "Has alcanzado el cupo máximo de apuestas que puedes lanzar esta semana.";
        }
        else if(bets.length == 0){
          this.bets = [];
          this.errorMessage = "No hay apuestas disponibles esta semana.";
        }
        else if(bets.length>0){
          this.bets = bets;
        } 
      }
    );
  }
  
  private initializeForm(){
    this.maxs = this.mins = Array(100).fill(0).map((x,i)=>(i+1)*100);
    this.betForm = new FormGroup({
      'minBet': new FormControl(
        0,
        [
          !this.type_group_bet ? Validators.required : Validators.nullValidator,
          Validators.min(!this.type_group_bet ? 100 : -1),
          Validators.max(10000)
        ]
      ),
      'maxBet': new FormControl(
        0,
        [
          !this.type_group_bet ? Validators.required : Validators.nullValidator,
          Validators.min(!this.type_group_bet ? 100 : -1),
          Validators.max(10001)
        ]
      ),
      'exactBet': new FormControl(
        0,
        [
          this.type_group_bet ? Validators.required : Validators.nullValidator,
          Validators.min(this.type_group_bet ? 100 : -1),
          Validators.max(10001)
        ]
      ),
    })
  }

  private resetForm(){
    this.maxs = this.mins = Array(100).fill(0).map((x,i)=>(i+1)*100);
    this.selectedBet = false;
    this.selectedPrice = false;
    this.selectedMatch = false;
    this.selectedMaxDay = false;
    this.type_group_bet = false;
    this.betType = null;
    this.priceType = null;
    this.initializeForm();
    // this.betForm.reset({
    //   'minBet':0,
    //   'maxBet':0,
    //   "exactBet": 0
    // });
  }

  private setAllowedDays(match:FootballMatch){
    this.allowedDates = [];
    let endDate = new Date(match.date);
    let now = new Date();
    now = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 25, 59, 59, 0);
    endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 
                      endDate.getHours()+2, endDate.getMinutes(), 0, 0);
                      
    if(now.getUTCDate() != endDate.getUTCDate()){
      this.allowedDates.push(now.toISOString());
    }

    while(true){
      now = new Date(now.getTime() + (1000*60*60*24));
      if(now<=endDate && now.getUTCDate() != endDate.getUTCDate()) {
        this.allowedDates.push(now.toISOString());
      }
      else break;
    }
    this.allowedDates.push(endDate.toISOString());
  }
}
