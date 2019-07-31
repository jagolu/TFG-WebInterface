import { Component, Input } from '@angular/core';
import { HistoryUserFootballBet, GroupBet, IconModel, Icons } from 'src/app/models/models';
import { MoneyBack } from 'src/app/models/Bets/MoneyBack';
import { AlertService } from 'src/app/services/visualServices/alert.service';

@Component({
  selector: 'app-user-football-bet-card-info',
  templateUrl: './user-football-bet-card-info.component.html',
  styles: []
})
export class UserFootballBetCardInfoComponent{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The user bet to see
   * 
   * @access public
   * @var {HistoryUserFootballBet[]} userBet
   */
  @Input() userBet:HistoryUserFootballBet[] = [];

  /**
   * The footballbet event that the user bet
   * belongs to
   *
   * @access public
   * @var {GroupBet[]} footballBet
   */
  @Input() footballBet:GroupBet = null;

  /**
   * Says if the football bet has ended
   * 
   * @access public
   * @var {Boolean} ended
   */
  @Input() ended:Boolean;

  /**
   * A icon of a coin
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
   * @param {AlertService} __alertS To launch the alert to
   * cancel the user bet
   */
  constructor(private __alertS:AlertService) { }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Says is the footballbet is jackpot bet
   * 
   * @access public
   * @param {string} type The type of the football bet
   * @returns {Boolean} True if the football bet
   * is a jackpot bet, false otherwise
   */
  public isJackpotBet(type:string):Boolean{
    return type.includes("JACKPOT");
  }

  /**
   * Says if the football bet is a winner bet
   * 
   * @param {string} type The type of the bet
   * @returns {Boolean} True if the football bet
   * is a winner bet, false otherwise
   */
  public isWinnerBet(type:string):Boolean{
    return type.includes("WINNER");
  }

  /**
   * Gets the correct message for the correct
   * time of the bet
   * 
   * @access public
   * @param {string} type The type of the bet
   * @returns {string} The correct message 
   */
  public correctPart(type:string):string{
    if(type.includes("FULLTIME")) return "l partido";
    if(type.includes("FIRSTHALF")) return " la primera parte";
    if(type.includes("SECONDHALF")) return " la segunda parte";
  }

  /**
   * Gets the correct winner message
   * 
   * @access public
   * @param {string} winner The winner id
   * @returns {string} The correct winner message
   */
  public getWinnerWord(winner:number):string{
    if(winner==0) return "Empate (X)";
    else if(winner==1) return "Local (1)";
    else if(winner==2) return "Visitante (2)";
  }

  /**
   * Gets the jackpot of the bet
   * 
   * @access public
   * @param {GroupBet} bet The bet
   * @returns {number} The jackpot of the bet
   */
  public getJackpot(bet:GroupBet):number{
    return bet.minBet*bet.usersJoined;
  }

  /**
   * Gets the winrate of the bet
   * 
   * @access public
   * @param {GroupBet} bet The bet 
   * @param {HistoryUserFootballBet} own The user football bet
   */
  public getWinRate(bet:GroupBet, own:HistoryUserFootballBet){
    return Math.round((bet.typeBet.winRate+bet.typePay.winRate)*own.bet);
  }

  /**
   * Says how much money can get the user if the would
   * cancel the user bet
   * 
   * @access public
   * @param {number} typeBetLose The bet-type of the bet
   * @param {number} typePayLose The pay-type of the bet
   * @param {number} coins The coins that user has bet
   * @returns {number} The coins that the user would get back
   */
  public howMuchMoneyBack(typeBetLose:number, typePayLose:number, coins:number):number{
    return MoneyBack.getMoneyBack(typeBetLose, typePayLose, coins);
  }

  /**
   * Launchs the alert to cancel a user football bet
   * 
   * @access public
   * @param {GroupBet} footballBet The football bet
   * @param {number} coins The coins that user has bet
   * @param {string} userFootballBetId The id of the football bet
   */
  public cancelUserFootballBet(footballBet:GroupBet, coins:number, userFootballBetId:string){
    this.__alertS.cancelUserFootballBet(footballBet, coins, userFootballBetId);
  }
}