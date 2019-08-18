import { Component, Input } from '@angular/core';
import { GroupBet } from 'src/app/models/models';
import { AlertService } from 'src/app/services/visualServices/alert.service';

@Component({
  selector: 'app-football-bet-card-info',
  templateUrl: './football-bet-card-info.component.html',
  styles: []
})
export class FootballBetCardInfoComponent{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The info of the bet
   * 
   * @access public
   * @var {GroupBet} bet
   */
  @Input() bet: GroupBet;

  /**
   * The id of the bet
   * 
   * @access public
   * @var {string} betId
   */
  @Input() betId:string = "";

  /**
   * Says if the bet is ended or not
   * 
   * @access public
   * @var {Boolean} ended
   */
  @Input() ended:Boolean = true;

  /**
   * Says if the actual bet can be
   * cancelled or not
   * 
   * @access public
   * @var {Boolean} canBeCancelled
   */
  @Input() canBeCancelled:Boolean  = false;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {AlertService} __alertS To launch the alert to cancel the bet
   */
  constructor(private __alertS:AlertService) { }


  //
  // ────────────────────────────────────────────────────────────────────────  ──────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Says if the bet is a jackpot bet
   * 
   * @access public
   * @param {Boolean} type The type of the bet
   */
  public isJackpotBet(type:string):Boolean{
    return type.includes("JACKPOT");
  }

  /**
   * Launchs the alert to cancel the bet
   * 
   * @access public
   */
  public cancel(){
    this.__alertS.cancelFootballBet(this.betId);
  }
}