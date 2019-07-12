import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/restServices/home.service';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';
import { NewMessage } from 'src/app/models/models';
import { SessionService } from 'src/app/services/userServices/session.service';

@Component({
  selector: 'app-home',
  template: `<app-home-viewer [news]="news"></app-home-viewer>`,
  styleUrls: []
})
export class HomeComponent{

  public news: NewMessage[] = [];

  constructor(private homeS:HomeService, private authS:AuthenticationService, private sessionS:SessionService) {
    let isAuth = this.authS.IsAuthenticated();
    let isAdmin = this.sessionS.isAdmin();
    this.homeS.getNews(isAuth && !isAdmin).subscribe((news:any)=> this.news = news);
  }
}