import { Component, OnInit } from '@angular/core';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';
import { EndedFootballBet } from 'src/app/models/models';

@Component({
  selector: 'app-football-bet-history',
  templateUrl: './football-bet-history.component.html',
  styles: []
})
export class FootballBetHistoryComponent implements OnInit {

  public betsHistory:EndedFootballBet[];

  constructor(private groupPage:GroupInfoService) { }

  ngOnInit() {
    this.groupPage.info.subscribe(page=>{
      try{ this.betsHistory = page.betsHistory;}
      catch(Error){}
    });
  }
}
