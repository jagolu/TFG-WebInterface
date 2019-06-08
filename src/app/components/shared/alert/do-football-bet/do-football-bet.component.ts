import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/visualServices/alert.service';
import { BetService } from 'src/app/services/restServices/bet.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IconModel, Icons } from 'src/app/models/models';

@Component({
  selector: 'app-do-football-bet',
  templateUrl: './do-football-bet.component.html',
  styles: []
})
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
   * The winrate of the bet
   * 
   * @access private
   * @var {number} win_rate
   */
  private win_rate:number = 0;

  /**
   * Coin icon
   * 
   * @access public
   * @var {IconModel} coin_icon
   */
  public coin_icon:IconModel = Icons.COIN;


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
  constructor(private _alertS:AlertService, private _userS:BetService) { 
    this._alertS.fBet.subscribe(bet=>{
      this.show1X2 = bet.bet.typeBet.name.includes("WINNER");
      this.win_rate = bet.bet.typeBet.winRate+bet.bet.typePay.winRate;
      this.user_coins = bet.userCoins;
      this.min = bet.bet.minBet;
      this.max = Math.min(bet.bet.maxBet, this.user_coins);
      this.initializeForm();
    });
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
    setTimeout(this.remove.bind(this), 350);

    //When the alert do the fade out, the user can see the reset of
    // the form, waiting 0.75 seconds the user doesn't see that
    setTimeout(this.resetForm.bind(this), 750);
  }

  public setBetCoins(){
    let coins = this.doAFootballBetForm.controls["coinsBet"];
    if(coins.valid) {
      this.coins_bet = coins.value;
      this.max_win = Math.round(this.coins_bet*this.win_rate);
    }
    else this.coins_bet = 0;
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
        '',
        [
          this.requiredNumber,
          Validators.min(this.min),
          Validators.max(this.max)
        ]
      )
    });
  }

  /**
   * Reset the doAFootballBetForm
   * 
   * @access private
   */
  private resetForm(){
    this.doAFootballBetForm.reset({
      "winner": '',
      "homeGoals": 'Home team goals',
      "awayGoals": 'Away team goals',
      "coinsBet": 'Your bet',
    })
  }
  
  /**
   * Do the request to remove the user account
   * 
   * @access private
   */
  private remove(){
    // this._userS.deleteUser({
    //   "email": '',
    //   "homeGoals": '',
    //   "awayGoals": '',
    //   "coinsBet": '',
    // }).subscribe();
  }

  private requiredNumber(control:FormControl):{[ret:string]:boolean}{
    let num = control.value;
    if(num == null || isNaN(num) || num%1 !== 0) {
      return {"requiredNumber":true}
    }
    return null;
  }
}