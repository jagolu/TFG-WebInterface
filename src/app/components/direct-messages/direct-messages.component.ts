import { Component } from '@angular/core';
import { DirectMessagesService } from 'src/app/services/restServices/direct-messages.service';
import { DMTitles } from 'src/app/models/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-direct-messages',
  templateUrl: './direct-messages.component.html',
  styles: []
})
export class DirectMessagesComponent {

  public dmTitles:DMTitles[] = [];
  private createDMForm:FormGroup;

  constructor(private _dmS:DirectMessagesService) { 
    console.log("hello");
    this._dmS.loadDMTitles().subscribe(
      (dmS:any[])=>{
        console.log("ret", dmS);
        this.dmTitles = dmS;
      });
    this.initializeForm();
  }

  public createDMTitle(receiver:string){
    let title = this.createDMForm.controls["title"].value;
    this._dmS.launchDMTitle({
      "title": title,
      "emailReceiver": receiver
    }).subscribe((dmS:DMTitles[])=>this.dmTitles = dmS);
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
  }
}
