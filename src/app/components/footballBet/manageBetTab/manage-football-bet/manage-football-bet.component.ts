import { Component } from '@angular/core';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';
import { BetsManager } from 'src/app/models/models';

@Component({
  selector: 'app-manage-football-bet',
  templateUrl: './manage-football-bet.component.html',
  styles: []
})
export class ManageFootballBetComponent  {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The bets launched in the group
   * 
   * @access public
   * @var {BetsManager[]} betsM
   */
  public betsM:BetsManager[];


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {GroupInfoService} __groupInfoS To get the bets launched
   */
  constructor(private __groupInfoS:GroupInfoService) { 
    this.__groupInfoS.info.subscribe(page=>{
      try{this.betsM = page.manageBets}
      catch(Error){this.betsM = []}
    });
  }
}