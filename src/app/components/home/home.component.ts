import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/restServices/home.service';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';
import { NewMessage } from 'src/app/models/models';
import { SessionService } from 'src/app/services/userServices/session.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/restServices/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent{

  public news: NewMessage[] = [];
  public publishNewForm :FormGroup;

  constructor(private homeS:HomeService, private authS:AuthenticationService, 
              private sessionS:SessionService, private adminS: AdminService) {
    let isAuth = this.authS.IsAuthenticated();
    let isAdmin = this.sessionS.isAdmin();
    this.homeS.getNews(isAuth && !isAdmin).subscribe((news:any)=> this.news = news);
    this.initializeForm();
  }

  public launchNew(){
    let message = this.publishNewForm.controls["message"].value;
    this.adminS.publishNew(message).subscribe((news:any)=>this.news = news);
    this.resetForm();
  }

  public isAdmin(){
    return this.sessionS.isAdmin();
  }

  private initializeForm(){
    this.publishNewForm = new FormGroup({
      "message": new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(250)
        ]
      )
    });
  }

  private resetForm(){
    this.publishNewForm.reset({
      "message": ""
    })
  }
}