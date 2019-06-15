import { Component, OnInit } from '@angular/core';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';
import { EndedFootballBet  } from 'src/app/models/models';

@Component({
  selector: 'app-my-own-football-bets',
  templateUrl: './my-own-football-bets.component.html',
  styles: []
})
export class MyOwnFootballBetsComponent implements OnInit {

  public bets:EndedFootballBet[];  
  constructor(private groupPage:GroupInfoService) { }

  ngOnInit() {
    this.groupPage.info.subscribe(page=>{
      try{this.bets = page.myBets;}
      catch(Error){}
    });
  }
}
