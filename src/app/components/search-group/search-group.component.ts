import { Component } from '@angular/core';
import { GroupInfo } from 'src/app/models/models';
import { GroupService } from 'src/app/services/restServices/group.service';


@Component({
  selector: 'app-search-group',
  templateUrl: './search-group.component.html',
  styles: []
})
export class SearchGroupComponent{

  public groups:GroupInfo[];

  constructor(private groupS:GroupService) { }

  public search(name:string){
    this.groupS.getGroups(name).subscribe(
      (ok:any)=> {
        this.groups = ok
      }
    );
  }
}
