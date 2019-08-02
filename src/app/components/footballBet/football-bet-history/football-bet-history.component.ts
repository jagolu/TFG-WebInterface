import { Component, OnInit } from '@angular/core';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';
import { EndedFootballBet } from 'src/app/models/models';

@Component({
  selector: 'app-football-bet-history',
  templateUrl: './football-bet-history.component.html',
  styles: []
})
export class FootballBetHistoryComponent implements OnInit {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The history of bets of the user
   * 
   * @access public
   * @var {EndedFootballBet[]} betsHistory
   */
  public betsHistory:EndedFootballBet[];


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {GroupInfoService} __groupInfoS To get the history-bets
   */
  constructor(private __groupInfoS:GroupInfoService) { }

  /**
   * Gets the history-bets
   * 
   * @OnInit
   */
  ngOnInit() {
    this.__groupInfoS.info.subscribe(page=>{
      try{ this.betsHistory = page.betsHistory;}
      catch(Error){this.betsHistory = []}
    });
  }
}