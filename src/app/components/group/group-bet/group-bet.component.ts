import { Component, OnInit } from '@angular/core';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';
import { GroupBet } from 'src/app/models/models';
import { AlertService } from 'src/app/services/visualServices/alert.service';

@Component({
  selector: 'app-group-bet',
  templateUrl: './group-bet.component.html',
  styles: []
})
export class GroupBetComponent implements OnInit {
  public bets:GroupBet[] = [];
  public userCoins:number = 0;

  constructor(private groupPage:GroupInfoService, private alertS:AlertService) { }

  ngOnInit() {
    this.groupPage.info.subscribe(page=>{
      try{
        this.userCoins =  page.members ? page.members[page.members.length-1].coins : 0;
        this.bets = page.bets;
      }catch(Error){}
    })
  }

  public doBet(bet:GroupBet){
    this.alertS.doAFootballBet(bet, this.userCoins);
  }
}
