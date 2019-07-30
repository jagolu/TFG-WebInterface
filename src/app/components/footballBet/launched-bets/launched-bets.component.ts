import { Component, OnInit } from '@angular/core';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';
import { GroupBet } from 'src/app/models/models';
import { AlertService } from 'src/app/services/visualServices/alert.service';

@Component({
  selector: 'app-launched-bets',
  templateUrl: './launched-bets.component.html',
  styles: []
})
export class LaunchedBetsComponent implements OnInit {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The new bets in the group
   * 
   * @access public
   * @var {GroupBet[]} bets
   */
  public bets:GroupBet[] = [];

  /**
   * The coins of the actual user
   * 
   * @access public
   * @var {number} userCoins
   */
  public userCoins:number = 0;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {GroupInfoService} __groupInfoS To get the info of the group
   * @param {AlertService} __alertS To launch the alerts
   */
  constructor(private __groupInfoS:GroupInfoService, private __alertS:AlertService) { }

  /**
   * Gets the bets from the service
   * 
   * @OnInit
   */
  ngOnInit() {
    this.__groupInfoS.info.subscribe(page=>{
      try{
        this.userCoins =  page.members ? page.members[page.members.length-1].coins : 0;
        this.bets = page.bets;
      }catch(Error){}
    });
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Launchs the alert to do a user football bet
   * 
   * @access public
   * @param {GroupBet} bet The bet which the user want to bet 
   */  
  public doBet(bet:GroupBet){
    this.__alertS.doAFootballBet(bet, this.userCoins);
  }
}
