import { Component, AfterViewChecked } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styles: []
})
export class ViewUserComponent implements AfterViewChecked{

  private _user;

  constructor(private _userS:UserService) { 
    this._user = null;
    this._userS.getUserOptions().subscribe(
      (ok)=>{
        console.log(ok);
        this._user = ok;
      },
      err=>console.log("asdf")
    );
  }

  ngAfterViewChecked(){
    
  }

}
