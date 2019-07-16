import { Component } from '@angular/core';
import { DirectMessagesService } from 'src/app/services/restServices/direct-messages.service';
import { DMTitles, SearchUserDM } from 'src/app/models/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/userServices/session.service';
import { AdminService } from 'src/app/services/restServices/admin.service';

@Component({
  selector: 'app-direct-messages',
  templateUrl: './direct-messages.component.html',
  styles: []
})
export class DirectMessagesComponent {

  public dmTitles:DMTitles[] = [];
  public suggestions:SearchUserDM[] = [];
  private createDMForm:FormGroup;
  public validSelect:boolean = false;

  constructor(private _dmS:DirectMessagesService, private sessionS:SessionService, private adminS:AdminService) { 
    this._dmS.loadDMTitles().subscribe((dmS:DMTitles[])=> this.dmTitles = dmS);
    this.initializeForm();
    this.validSelect = this.isAdmin() ? false : true;
  }

  public createDMTitle(){
    let title = this.createDMForm.controls["title"].value;
    let receiver = this.isAdmin() ? (document.querySelector("#selectSuggsUserIdDMSearch") as HTMLSelectElement).value : null;
    this._dmS.launchDMTitle({
      "title": title,
      "emailReceiver": receiver
    }).subscribe((dmS:DMTitles[])=>{
      this.dmTitles = dmS;
      this.resetForm();
    });
  }

  public changeInputSelect(){
    let index = (document.querySelector("#selectSuggsUserIdDMSearch") as HTMLSelectElement).selectedIndex;
    this.changeSelectIndex(index);
  }

  public changeSelectIndex(index:number){
    (document.querySelector("#selectSuggsUserIdDMSearch") as HTMLSelectElement).selectedIndex = index;
    this.validSelect = index!=0;
  }

  public isAdmin(){
    return this.sessionS.isAdmin();
  }

  public findDM(){
    this.changeSelectIndex(0);
    let find = (document.querySelector("#findUserDMId") as HTMLInputElement).value;
    this.adminS.searchUserDM(find).subscribe((suggs:SearchUserDM[])=>this.suggestions = suggs);
  }

  private initializeForm(){
    this.createDMForm = new FormGroup({
      "title": new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64)
        ]
      )
    });
  }

  private resetForm(){
    this.createDMForm.reset({"title": ""});
    (document.querySelector("#findUserDMId") as HTMLInputElement).value = "";
    this.changeSelectIndex(0);
    this.suggestions = [];
  }
}
