import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent{

  private news: littleNew[] = [];

  constructor() { 
    this.news.push({title:"title1", body:"body1", time:"14/01/19 14:32", owner:"SYS"});
    this.news.push({title:"title2", body:"body2", time:"14/01/19 14:32", owner:"SYS"});
    this.news.push({title:"title3", body:"body3", time:"14/01/19 14:32", owner:"GROUP1"});
    this.news.push({title:"title4", body:"body4", time:"14/01/19 14:32", owner:"GROUP1"});
    this.news.push({title:"title5", body:"body5", time:"14/01/19 14:32", owner:"SYS"});
    this.news.push({title:"title6", body:"body6", time:"14/01/19 14:32", owner:"GROUP2"});
  }

}

export class littleNew{
  title:string;
  body:string;
  time:string;
  owner:string;
}
