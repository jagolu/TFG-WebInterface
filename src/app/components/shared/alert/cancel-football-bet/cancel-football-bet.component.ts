import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/visualServices/alert.service';
import { BetService } from 'src/app/services/restServices/bet.service';

@Component({
  selector: 'app-cancel-football-bet',
  templateUrl: './cancel-football-bet.component.html',
  styles: []
})
export class CancelFootballBetComponent {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The id of the bet to cancel
   * 
   * @access private
   * @var {string} _betId
   */
  private _betId:string = "";


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {AlertService} __alertS To close the alert
   * @param {BetService} __betS To do the http request
   */
  constructor(private __alertS:AlertService, private __betS:BetService) { 
    this.__alertS.target.subscribe(id=> this._betId = id);
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //


  /**
   * Cancels the bet
   * 
   * @access public
   */
  public cancel(){
    this.__alertS.hideAlert();
    this.__betS.cancelFootballBet(this._betId);
  }
}