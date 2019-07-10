import { Component, Input } from '@angular/core';
import { HomeService } from 'src/app/services/restServices/home.service';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';
import { NewMessage } from 'src/app/models/models';

@Component({
  selector: 'app-home',
  template: `<app-home-viewer [news]="news"></app-home-viewer>`,
  styleUrls: []
})
export class HomeComponent{

  public news: NewMessage[] = [];

  constructor(private homeS:HomeService, private authS:AuthenticationService) {
    let isAuth = this.authS.IsAuthenticated();
    this.homeS.getNews(isAuth).subscribe((news:any)=> this.news = news);
  }
}