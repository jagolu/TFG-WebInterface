import { Component, OnInit } from '@angular/core';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';
import { EndedFootballBet, HistoryUserFootballBet  } from 'src/app/models/models';

@Component({
  selector: 'app-my-own-football-bets',
  templateUrl: './my-own-football-bets.component.html',
  styles: []
})
export class MyOwnFootballBetsComponent implements OnInit {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The bets done by the user
   * 
   * @access public
   * @var {EndedFootballBet[]} bets
   */
  public bets:EndedFootballBet[];  

  
  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {GroupInfoService} __groupInfoS To get the group active bets 
   */
  constructor(private __groupInfoS:GroupInfoService) { }

  /**
   * Get the bets
   * 
   * @OnInit
   */
  ngOnInit() {
    this.__groupInfoS.info.subscribe(page=>{
      try{this.bets = page.myBets;}
      catch(Error){this.bets = []}
    });
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Checks if a bet is valir or not
   * 
   * @param {HistoryUserFootballBet[]} myBets The bets done by
   * the user in the football bet
   * @returns {Boolean} True if the bet is valid, false
   * otherwise
   */
  public isValid(myBets:HistoryUserFootballBet[]):Boolean{
    return myBets.some(b => b.valid);
  }
}