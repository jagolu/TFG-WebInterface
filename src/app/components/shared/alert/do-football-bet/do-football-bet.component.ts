import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/visualServices/alert.service';
import { BetService } from 'src/app/services/restServices/bet.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IconModel, Icons } from 'src/app/models/models';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';

@Component({
  selector: 'app-do-football-bet',
  templateUrl: './do-football-bet.component.html',
  styles: []
})
/**
 * Class to fill an alert with a form to do a football bet
 * 
 * @class
 */
export class DoFootballBetComponent{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The form to do a football bet
   * 
   * @access public
   * @var {FormGroup} doAFootballBetForm
   */
  public doAFootballBetForm:FormGroup;

  /**
   * A filter to show one form or other
   * 
   * @access public
   * @var {boolean} show1X2
   */
  public show1X2:boolean = false;

  /**
   * A filter know if the bet
   * is a group bet or a solo bet
   * 
   * @access public
   * @var {boolean} jackpotBet
   */
  public jackpotBet:boolean = false;

  /**
   * To know the actual jackpot
   * 
   * @access public
   * @var {number} jackpot
   */
  public jackpot:number = 0;

  /**
   * To know the actual time
   * (first time, second time, full match)
   * 
   * @access public
   * @var {string} timeMessage
   */
  public timeMessage:string = "";

  /**
   * The min of the bet
   * 
   * @access public
   * @var {number} min
   */
  public min:number = 0;

  /**
   * The max of the bet
   * 
   * @access public
   * @var {number} max
   */
  public max:number = 0;

  /**
   * The max what user can bet
   * 
   * @access public
   * @var {number} max_user
   */
  public max_user:number = 0;

  /**
   * The coins of the user
   * 
   * @access public
   * @var {number} user_coins
   */
  public user_coins:number = 0;

  /**
   * The coins bet by the user
   * 
   * @access public
   * @var {number} coins_bet
   */
  public coins_bet:number = 0;

  /**
   * The maximun number of coins that 
   * the user can wins with the coins bet
   * 
   * @access public
   * @var {number} max_win
   */
  public max_win:number = 0;

  /**
   * The winrate of a solo bet
   * 
   * @access private
   * @var {number} win_rate
   */
  private win_rate:number = 0;

  /**
   * Info message for winner bet options
   * 
   * @access public
   * @var {string} info_winner_msg
   */
  public info_winner_msg:string;

  /**
   * Coin icon
   * 
   * @access public
   * @var {IconModel} coin_icon
   */
  public coin_icon:IconModel = Icons.COIN;

  //
  // ─── VARS TO DO THE REQUEST ─────────────────────────────────────────────────────
  //

  /**
   * The name of the group
   * 
   * @access private
   * @var {string} _groupName 
   */
  private _groupName:string;

  /**
   * The id of the bet
   * 
   * @access private
   * @var {string} _bet
   */
  private _bet:string;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {AlertService} _alertS To get the alert info
   * @param {UserService} _userS To do the user requests
   */
  constructor(private _alertS:AlertService, private groupInfo:GroupInfoService, private _betS:BetService) { 
    this._alertS.oInfo.subscribe(bet=>{
      try{
        this.info_winner_msg = "";
        //Check if the bet is about the match winner 
        this.show1X2 = bet.bet.typeBet.name.includes("WINNER");
        //Get the winrate of the bet
        this.win_rate = bet.bet.typeBet.winRate+bet.bet.typePay.winRate;
        //Check if the bet is a group bet or a solo bet
        this.jackpotBet = bet.bet.typePay.name.includes("JACKPOT");
        //The min of the bet (No user can reach this point if his actual coins
        // are less than the min of the bet)
        this.min = bet.bet.minBet;
        //The max of the bet
        this.max = bet.bet.maxBet;
        // If it is a group bet, it calculate the jackpot
        this.jackpot = this.jackpotBet ? bet.bet.usersJoined * this.min : 0;
        //The actual user coins (If is a group bet, the actual user coins would be 
        // the actual 'user_coins-min_bet', else the actual user coins)
        this.user_coins = this.jackpotBet ? bet.userCoins-this.min : bet.userCoins;
        //The max what user can bet (the min value of the maxBet and the actual user coins)
        this.max_user = Math.min(bet.bet.maxBet, bet.userCoins);
        //The id of the bet
        this._bet = bet.bet.bet;
        //The message to correct time
        this.timeMessage = this.correctPart(bet.bet.typeBet.name);
        this.initializeForm();        
      }catch(Error){
        this.info_winner_msg = this.timeMessage = "";
        this.show1X2 = this.jackpotBet = false;
        this.win_rate = this.min = this.max = 0;
        this.jackpot = this.user_coins = this.max_user = 0;
        this._bet = null;
      }

    });
    this.groupInfo.info.subscribe(group=>this._groupName = group.name);
    this._alertS.reset.subscribe(
      reset=>{ if(reset) this.resetForm(); }
    );
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Do the request to do a new football bet
   * close the alert
   * 
   * @access public
   */
  public doBet(){
    this._alertS.hideAlert();
    //Bootstrap modal close on form submit. So, I have to
    //show 2 modals, so first hide that and in 0.35 seconds
    //send the petition and show the modal of the response
    setTimeout(this.betReq.bind(this), 350);

    //When the alert do the fade out, the user can see the reset of
    // the form, waiting 0.75 seconds the user doesn't see that
    setTimeout(this.resetForm.bind(this), 750);
  }

  /**
   * Change the value of the actual coins of the user
   * and the value of the possible coins won
   * 
   * @access public
   */
  public setBetCoins(){
    let coins = this.doAFootballBetForm.controls["coinsBet"];
    if(coins.valid) {
      this.coins_bet = coins.value;
      this.max_win = Math.round(this.coins_bet*this.win_rate);
    }
    else this.coins_bet = 0;
  }

  /**
   * Sets the message to the correct bet type
   * 
   * @access public
   */
  public setMessage(){
    let winner:number = this.doAFootballBetForm.controls['winner'].value;
    if(winner==1) this.info_winner_msg = "El equipo local ganará";
    else if(winner==2) this.info_winner_msg = "El equipo visitante ganará";
    else if(winner==0) this.info_winner_msg = "Ambos equipos empatarán";
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Initializes the form to do a football bet
   * 
   * @access private
   */
  private initializeForm(){
    let coinsBetValue = this.jackpot ? {value: this.min, disabled: this.jackpotBet} : {value: ''};
    
    this.doAFootballBetForm = new FormGroup({
      'winner': new FormControl(
        '',
        [
          this.show1X2 ? Validators.required : Validators.nullValidator
        ]
      ),
      "homeGoals": new FormControl(
        '',
        [
          !this.show1X2 ? this.requiredNumber : Validators.nullValidator,
          Validators.min(0),
          Validators.max(20)
        ]
      ),
      "awayGoals": new FormControl(
        '',
        [
          !this.show1X2 ? this.requiredNumber : Validators.nullValidator,
          Validators.min(0),
          Validators.max(20)
        ]
      ),
      "coinsBet": new FormControl(
        coinsBetValue,
        [
          this.requiredNumber,
          Validators.min(this.min),
          Validators.max(this.max_user)
        ]
      )
    });
  }

  /**
   * Reset the coinsbet
   * 
   * @access private
   */
  private resetForm(){
    this.coins_bet = 0;
  }
  
  /**
   * Do the request to do the bet
   * 
   * @access private
   */
  private betReq(){
    this._betS.doFootballBet({
      "groupName": this._groupName,
      "footballBet": this._bet,
      "bet": this.doAFootballBetForm.controls["coinsBet"].value,
      "homeGoals": this.show1X2 ? null : parseInt(this.doAFootballBetForm.controls["homeGoals"].value),
      "awayGoals": this.show1X2 ? null : parseInt(this.doAFootballBetForm.controls["awayGoals"].value),
      "winner": !this.show1X2 ? null : parseInt(this.doAFootballBetForm.controls["winner"].value),
    });
  }

  /**
   * Custom validator to do a required for input type number
   * 
   * @access private
   * @param {FormControl} control The value of the input
   * @returns {[string]:boolean} The id of the error and the result if
   * the input is empty, null otherwise
   */
  private requiredNumber(control:FormControl):{[ret:string]:Boolean}{
    let num = control.value;
    if(num == null || isNaN(num) || num%1 !== 0 || control.pristine) {
      return {"requiredNumber":true}
    }
    return null;
  }

  /**
   * Function to set the correct time message
   * 
   * @access private
   * @param {string} type The type bet of the bet
   * @returns {string} The correct message for the 
   * correct part. 
   */
  private correctPart(type:string):string{
    if(type.includes("FULLTIME")) return "Partido completo";
    if(type.includes("FIRSTHALF")) return "Primera parte";
    if(type.includes("SECONDHALF")) return "Segunda parte";
  }
}