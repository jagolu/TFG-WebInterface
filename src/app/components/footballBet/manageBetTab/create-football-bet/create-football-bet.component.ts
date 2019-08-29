import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { BetService } from 'src/app/services/restServices/bet.service';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';
import { AvailableBet, FootballMatch, NameWinRate, AlertInfoType, GroupPage, LaunchFootballBetManager, ComponentID } from 'src/app/models/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/visualServices/alert.service';
import { ReloadService } from 'src/app/services/userServices/reload.service';

@Component({
  selector: 'app-create-football-bet',
  templateUrl: './create-football-bet.component.html',
  styles: []
})
/**
 * Class to show the form to launch a new football bet
 * 
 * @class
 * @implements OnDestroy
 * @implements OnInit
 */
export class CreateFootballBetComponent implements OnDestroy, OnInit {

  //
  // ────────────────────────────────────────────────────────────  ──────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
    //
    // ─── WINDOW SIZE ─────────────────────────────────────────────────
    //
  /**
   * To know the actual width of the screen 
   *  
   * @access public
   * @var {number} width
   */ 
  public width:number;

    //
    // ─── EXPLANATION BET VARS ────────────────────────────────────────
    //
  /**
   * To show the explanation of the 
   * selected type of the bet
   * 
   * @access public
   * @var {string} explanationBetType
   */
  public explanationBetType:string;

  /**
   * To show the explanation of the 
   * selected type of pay
   * 
   * @access public
   * @var {string} explanationPriceType
   */
  public explanationPriceType:string;

  /**
   * To show the win rate of the bet
   * for 'solo' bets
   * 
   * @access public
   * @var {number} winRate
   */
  public winRate:number = 0.0;

  /**
   * To show an specific message
   * if there is not available matches
   * or the group has reached the max
   * number of bets this week
   * 
   * @access public
   * @var {string} errorMessage
   */
  public errorMessage:string;

    //
    // ─── VARS TO THE OPTIONS OF THE SELECT ───────────────────────────
    //
  
  /**
   * The options of the allowed dates
   * for the dates select
   * 
   * @access public
   * @var {string[]} allowedDates
   */
  public allowedDates : string[];

  /**
   * The options of the min bet options
   * of the select
   * 
   * @access public
   * @var {number[]} mins
   */
  public mins:number[];

  /**
   * The options of the max bet options
   * of the select
   * 
   * @access public
   * @var {number[]} maxs
   */
  public maxs:number[];

    //
    // ─── VARS TO SHOW BETS INFO ──────────────────────────────────────
    //
    
  /**
   * The form to launch a 
   * new football bet
   * 
   * @access public
   * @var {FormGroup} betForm
   */
  public betForm:FormGroup;

  /**
   * The allowed bets and its info
   * 
   * @access public
   * @var {AvailableBet[]} bets
   */
  public bets:AvailableBet[] = [];

  /**
   * The allowed matches for an
   * specific competition
   * 
   * @access public
   * @var {FootballMatch[]} matches
   */
  public matches : FootballMatch[];

  /**
   * The allowed bets for an specific
   * match
   * 
   * @access public
   * @var {NameWinRate[]} allowedBets
   */
  public allowedBets : NameWinRate[];

  /**
   * The allowed pays for an specific
   * match
   * 
   * @access public
   * @var {NameWinRate[]} allowedPays
   */
  public allowedPays : NameWinRate[];

    //
    // ─── FILTER TO SHOW SOME SELECTS OR NOT ──────────────────────────
    //
  
  /**
   * To know if the collapse for a competition
   * is launched or not
   * 
   * @access private
   * @var {boolean} newBet_competitionMatches_launched
   */
  private newBet_competitionMatches_launched:boolean = false;

  /**
   * Filter to show the select of the type bet
   * 
   * @access public
   * @var {boolean} selectedMatch
   */
  public selectedMatch:boolean = false;

  /**
   * Filter to show the description 
   * of the bet type.
   * selectedBet && selectedPrice => shows the select
   * for the max day to do the bet
   * 
   * @access public
   * @var {boolean} selectedBet
   */
  public selectedBet:boolean = false;

  /**
   * Filter to show the description 
   * of the price type.
   * selectedBet && selectedPrice => shows the select
   * for the max day to do the bet
   * 
   * @access public
   * @var {boolean} selectedPrice
   */
  public selectedPrice:boolean = false; 

  /**
   * Filter to show the form for
   * the select of the minMax/exact bet
   * 
   * @access public
   * @var {boolean} selectedMaxDay
   */
  public selectedMaxDay:boolean = false;

  /**
   * Filter to show a "group" bet form
   * or a "solo" bet form
   * @access public
   * @var {boolean} type_jackpot_bet
   */
  public type_jackpot_bet:boolean = false;

    //
    // ─── VARS TO DO THE LAUNCH BET REQUEST ───────────────────────────
    //

  /**
   * The name of the group
   * 
   * @access private
   * @var {string} _groupName
   */
  private _groupName:string = null;

  /**
   * The selected match for do the bet
   * 
   * @access private
   * @var {FootballMatch} _match
   */
  private _match:FootballMatch = null;

  /**
   * The bet type selected for do the bet
   * 
   * @access private
   * @var {NameWinRate} _betType
   */
  private _betType:NameWinRate = null;

  /**
   * The price type selected for do the bet
   * 
   * @access private
   * @var {NameWinRate} _priceType
   */
  private _priceType:NameWinRate = null;
  
  /**
   * The actual coins of the user
   * 
   * @access private
   * @var {number} _userCoins
   */
  private _userCoins:number = 0;

  //
  // ──────────────────────────────────────────────────────────── ALL THE TYPES ─────
  //

  /**
   * All the football bet types
   * 
   * @access private
   * @var {NameWinRate[]} _typeFootballBets
   */
  private _typeFootballBets:NameWinRate[];

  /**
   * All the type pays
   * 
   * @access private
   * @var {NameWinRate[]} _typePays
   */
  private _typePays:NameWinRate[];

  //
  // ─── ROLE OF THE USER ───────────────────────────────────────────────────────────
  //

  /**
   * Role of the actual user
   * 
   * @access private
   * @var {string} _role
   */
  private _role:string = "";


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {GroupInfoService} __groupInfoS For get the available bets info
   * @param {BetService} __betS For launch de bet
   * @param {AlertService} __alertS For show the alert when a user tries to launch
   * a bet with higher minimum bet than his coins
   * @param {ReloadService} __reloadS To get the events to reload the group page
   */
  constructor(
    private __groupInfoS:GroupInfoService, 
    private __betS:BetService, 
    private __alertS:AlertService,
    private __reloadS:ReloadService
  ) { 
    this.initializeForm();  
    this.__groupInfoS.info.subscribe(page=>{
      try{
        if(this._groupName != page.name && page.name.length > 1){
          this._groupName = page.name;
          this._userCoins = page.members[page.members.length-1].coins;
          this._role = page.members ? page.members[page.members.length-1].role : "";
          //Only football matches and for the group maker
          if(this._role == "GROUP_MAKER") this.getPageGroup(this._groupName);  
        }
      }
      catch(Error){}
    });

    this.__reloadS.reloadComponent.subscribe(r=>{
      if(r == ComponentID.GROUP && this._role == "GROUP_MAKER") this.getPageGroup(this._groupName);  
    });
  }

  /**
   * @OnInit
   */
  ngOnInit(){
    this.width = window.innerWidth;
  }

  /**
   * @OnDestroy
   */
  ngOnDestroy(){
    this.__groupInfoS.removeInfo();
  }

  /**
   * Function to know the actual screen width
   * @param {any} event The event of resizing the screen
   */
  @HostListener('window:resize', ['$event']) onResize(event) {
    this.width = window.innerWidth;
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Function to do the request to launch the football bet, and closes the 
   * collapse form
   * 
   * @access public
   */
  public launchBet(){
    let date = (document.querySelector("#newBet_allowedDates_select") as HTMLSelectElement).value;

    this.__betS.launchBet({
      "groupName": this._groupName,
      "matchDay": this._match.matchday,
      "typeBet": this._betType.name,
      "typePay": this._priceType.name,
      "minBet": !this.type_jackpot_bet ? this.betForm.controls["minBet"].value : this.betForm.controls["exactBet"].value,
      "maxBet": !this.type_jackpot_bet ? this.betForm.controls["maxBet"].value : this.betForm.controls["exactBet"].value,
      "lastBetTime": new Date(date)
    }).subscribe(
      (page:GroupPage)=>{
        this.__groupInfoS.updateInfo(page);
        this.resetForm();
        this.getPageGroup(this._groupName);
        this.newBet_competitionMatches_launched = false;
        (document.querySelector("#newBet_competitionMatches_button") as HTMLElement).click();
        (document.querySelector("#launchFootBallBetButton") as HTMLElement).click();
        (document.querySelector("#newBet_competitionSelect") as HTMLSelectElement).selectedIndex = 0;
      }
    );
  }

  /**
   * Reset the next parts of the form, hide them but and only show
   * the select to show the match. Also sets to matches & allowedPays its 
   * correct value
   * 
   * @access public
   */
  public selectCompetition(){
    let competition = (document.querySelector("#newBet_competitionSelect") as HTMLSelectElement).selectedIndex-1;
    if(!this.newBet_competitionMatches_launched){
      this.newBet_competitionMatches_launched = true;
      (document.querySelector("#newBet_competitionMatches_button") as HTMLElement).click();
    }
    this.resetForm();
    (document.querySelector("#newBet_competitionMatches_select") as HTMLSelectElement).selectedIndex = 0;
    this.matches = this.bets[competition].matches;
  }

  /**
   * Reset the next parts of the form, hide them and show the part of
   * the select type bet. Also set to allowedBets and match 
   * their correct value.
   * 
   * @access public
   */
  public selectMatchDay(){
    let matchday = (document.querySelector("#newBet_competitionMatches_select") as HTMLSelectElement).selectedIndex-1;
    if(this.selectedMatch) (document.querySelector("#newBet_betType_select") as HTMLSelectElement).selectedIndex = 0;
    this.resetForm();
    this._match = this.matches[matchday];
    this.setAllowedDays(this._match);
    this.allowedBets = this.getAllowedTypeBets(this._match.allowedTypeBets);
    this.selectedMatch = true;
  }

  /**
   * Show the part of the select of price type. Set to
   * explanationBetType, betType & winRate their correctValue
   * 
   * @access public
   */
  public setBetType(){
    let typeid = (document.querySelector("#newBet_betType_select") as HTMLSelectElement).selectedIndex-1;
    let type:NameWinRate = this.allowedBets[typeid];
    this.selectedBet = true;
    this.selectedMaxDay = false;
    this.explanationBetType = type.description;
    this._betType = type;
    this.winRate = this.selectedPrice ? type.winRate + this._priceType.winRate : type.winRate;
    this.addAllPriceType(this.allowedBets[typeid].name);  
  }

  /**
   * Show the part of the select of max day. Set to
   * explanationPriceType, type_jackpot_bet, priceType & winRate their correctValue.
   * Also reset the form.
   * 
   * @access public
   */
  public setPriceType(){
    let typeid = (document.querySelector("#newBet_priceType_select") as HTMLSelectElement).selectedIndex-1;
    let type:NameWinRate = this.allowedPays[typeid];
    this.type_jackpot_bet = type.name.includes("JACKPOT");
    this.selectedPrice = true;
    this.explanationPriceType = type.description;
    this._priceType = type;
    this.winRate = this.selectedBet ? type.winRate + this._betType.winRate : type.winRate;
    this.initializeForm();
  }

  /**
   * Set to max select its correct options (if it's not already correct) 
   * to "Without max" and higher than the min bet selected. 
   * Launch an alert if the min is to high
   * 
   * @access public
   */
  public setMaxBet(){
    let max = parseInt(this.betForm.controls["maxBet"].value);
    let min = parseInt(this.betForm.controls["minBet"].value);
    if(max == 0 || (max<min && max!=0)){
      let minOut = min/100;
      this.maxs = Array(100-minOut+1).fill(0).map((x,i)=>(i+minOut)*100);
      this.betForm.controls["maxBet"].setValue(0);
    }
    if(min>this._userCoins) this.__alertS.openAlertInfo(AlertInfoType.BETHIGHERTHANYOURCOINS);
  }

  /**
   * Check if the exactbet is too high and launch an alert if it is
   * 
   * @access public
   */
  public setExactBet(){
    let minMax = parseInt(this.betForm.controls["exactBet"].value);
    if(minMax>this._userCoins) this.__alertS.openAlertInfo(AlertInfoType.BETHIGHERTHANYOURCOINS);
  }

  /**
   * Set the min select its correct options (if it's not already correct)
   * to be at least less or equal than the max
   * 
   * @access public
   */
  public setMinBet(){
    let max = parseInt(this.betForm.controls["maxBet"].value);
    let min = parseInt(this.betForm.controls["minBet"].value);
    if(min == 0 || (min>max && min!=0)){
      let minOut = max/100;
      this.mins = Array(minOut).fill(0).map((x,i)=>(i+1)*100);
      this.betForm.controls["minBet"].setValue(0);
    }
  }

  /**
   * Show the form to select the coin bets
   * 
   * @access public
   */
  public setDate(){
    this.selectedMaxDay = true;
  }

  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Function to set the allowed prices to the selected bet type
   * 
   * @param {string} betType 
   */
  private addAllPriceType(betType:string){
    this.allowedPays = [];
    let winner = betType.includes("WINNER");
    this._typePays.forEach(x=>{
      if(!x.name.includes("CLOSER") || !winner) this.allowedPays.push(x);
    });
    if(this.selectedPrice){
      (document.querySelector("#newBet_priceType_select") as HTMLSelectElement).selectedIndex = 0;
      this.selectedPrice = false;
    } 
  }

  /**
   * Get the info for the
   * form for this group. If there is
   * not available bets, set the correct message.
   * 
   * @access private
   * @param {string} name The name of the group 
   */
  private getPageGroup(name:string){
    this.__betS.getLaunchFootballBet(name).subscribe(
      (bets:LaunchFootballBetManager)=> {
        this._typeFootballBets = bets.typeBets;
        this._typePays = bets.typePays;

        if(bets.competitionMatches.length == 1 && bets.competitionMatches[0].competition == "MaximunWeekBetsReached"){
            this.bets = [];
            this.errorMessage = "Has alcanzado el cupo máximo de apuestas que puedes lanzar esta semana.";
        }
        else if(bets.competitionMatches.length > 0){
          this.bets = bets.competitionMatches;
        }
        else{
          this.bets = [];
          this.errorMessage = "No hay apuestas disponibles esta semana.";
        }
      }
    );
  }
  
  /**
   * Initializes the form, depending on the
   * type of the bet
   * 
   * @access private
   */
  private initializeForm(){
    this.maxs = this.mins = Array(100).fill(0).map((x,i)=>(i+1)*100);
    this.betForm = new FormGroup({
      'minBet': new FormControl(
        0,
        [
          !this.type_jackpot_bet ? Validators.required : Validators.nullValidator,
          Validators.min(!this.type_jackpot_bet ? 100 : -1),
          Validators.max(10000)
        ]
      ),
      'maxBet': new FormControl(
        0,
        [
          !this.type_jackpot_bet ? Validators.required : Validators.nullValidator,
          Validators.min(!this.type_jackpot_bet ? 100 : -1),
          Validators.max(10000)
        ]
      ),
      'exactBet': new FormControl(
        0,
        [
          this.type_jackpot_bet ? Validators.required : Validators.nullValidator,
          Validators.min(this.type_jackpot_bet ? 100 : -1),
          Validators.max(10000)
        ]
      ),
    })
  }

  /**
   * Resets the form and set all the filter vars to false
   * 
   * @access private
   */
  private resetForm(){
    this.maxs = this.mins = Array(100).fill(0).map((x,i)=>(i+1)*100);
    this.selectedBet = false;
    this.selectedPrice = false;
    this.selectedMatch = false;
    this.selectedMaxDay = false;
    this.type_jackpot_bet = false;
    this._betType = null;
    this._priceType = null;
    this.initializeForm();
  }

  /**
   * Set the allowed days to the select input of max day
   * 
   * @access private
   * @param {FootballMatch} match The match until the bet will be on. 
   */
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

  /**
   * Gets all the objects NameWinRate for all
   * the ids getted
   * 
   * @access private
   * @param {string[]} typeBets The ids of the allowed type bets
   */
  private getAllowedTypeBets(typeBets:string[]){
    let retTypes:NameWinRate[] = [];

    this._typeFootballBets.forEach(t=>{
      if(typeBets.some(tt => tt == t.id)) retTypes.push(t);
    });

    return retTypes;
  }
}
