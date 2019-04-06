import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styles: []
})
export class ViewUserComponent{

  public _user;

  constructor(private _userS:UserService) { 
    this._user = null;
    this._userS.getUserOptions().subscribe(
      (user)=>{
        this._user = user;
      }
    );
  }

}
