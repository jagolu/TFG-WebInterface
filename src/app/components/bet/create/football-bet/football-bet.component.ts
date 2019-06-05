import { Component, OnDestroy } from '@angular/core';
import { BetService } from 'src/app/services/restServices/bet.service';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';
import { AvailableBet, FootballMatch, NameWinRate } from 'src/app/models/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  public bets:AvailableBet[];
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

  //
  // ─── TO DO THE BACKEND REQUEST ──────────────────────────────────────────────────
  //
  private groupName:string = null;
  private match:FootballMatch = null;
  private maxDate:string = null;
  private betType:NameWinRate = null;
  private priceType:NameWinRate = null;

  constructor(private groupPageS:GroupInfoService, private betS:BetService) { 
    this.initializeForm();
    this.groupPageS.info.subscribe(page=>{
      try{
        if(this.groupName != page.name && page.name.length > 1){
          this.groupName = page.name;
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

  public selectCompetition(competition:number){
    if(!this.newBet_competitionMatches_launched){
      this.newBet_competitionMatches_launched = true;
      (document.querySelector("#newBet_competitionMatches_button") as HTMLElement).click();
    }
    this.resetForm();
    (document.querySelector("#newBet_competitionMatches_select") as HTMLSelectElement).selectedIndex = 0;
    this.matches = this.bets[competition].matches;
    this.allowedPays = this.bets[competition].allowedTypePays;
  }

  public selectMatchDay(matchday:number){
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

  public setBetType(type:NameWinRate){
    this.selectedBet = true;
    this.explanationBetType = type.description;
    this.betType = type;
    this.winRate = type.winRate;
    if(this.priceType != null) this.winRate+=this.priceType.winRate;
  }

  public setPriceType(type:NameWinRate){
    this.selectedPrice = true;
    this.explanationPriceType = type.description;
    this.priceType = type;
    this.winRate = type.winRate;
    if(this.betType != null) this.winRate+=this.betType.winRate;
  }

  public setDate(date:string){
    this.maxDate = date;
    this.selectedMaxDay = true;
  }

  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //

  
  private getPageGroup(name:string){
    this.betS.getPageGroup(name).subscribe(
      (bets:AvailableBet[])=> this.bets = bets
    );
  }
  
  private initializeForm(){
    this.maxs = this.mins = Array(100).fill(0).map((x,i)=>(i+1)*100);
    this.betForm = new FormGroup({
      'minBet': new FormControl(
        0,
        [
          Validators.required,
          Validators.min(100),
          Validators.max(10000)
        ]
      ),
      'maxBet': new FormControl(
        0,
        [
          Validators.required,
          Validators.min(100),
          Validators.max(10001)
        ]
      )
    })
  }

  private resetForm(){
    this.maxs = this.mins = Array(100).fill(0).map((x,i)=>(i+1)*100);
    this.selectedBet = false;
    this.selectedPrice = false;
    this.selectedMatch = false;
    this.selectedMaxDay = false;
    this.betType = null;
    this.priceType = null;
    this.betForm.reset({
      'minBet':0,
      'maxBet':0
    });
  }

  private setAllowedDays(match:FootballMatch){
    let endDate = new Date(match.date);
    let now = new Date();
    this.allowedDates = [];
    if(now.getDate() != endDate.getDate()){
      this.allowedDates.push(now.toISOString());
    }

    while(true){
      now = new Date(now.getTime() + (1000*60*60*24));
      if(now<=endDate && now.getDate() != endDate.getDate()) {
        this.allowedDates.push(now.toISOString());
      }
      else break;
    }
    this.allowedDates.push(endDate.toISOString());
  }
}
