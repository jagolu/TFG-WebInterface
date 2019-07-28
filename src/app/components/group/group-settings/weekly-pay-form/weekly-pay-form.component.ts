import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';
import { GroupService } from 'src/app/services/restServices/group.service';

@Component({
  selector: 'app-weekly-pay-form',
  templateUrl: './weekly-pay-form.component.html',
  styles: []
})
export class WeeklyPayFormComponent implements OnInit {

  public changeWeeklyPayForm:FormGroup;

  private _actualPay:number;
  private _groupName:string;

  constructor(private __groupInfoS:GroupInfoService, private __groupS:GroupService) { 
    this.initializeForm();
  }

  ngOnInit() {
    this.__groupInfoS.info.subscribe(page=>{
      try{
        this._actualPay = page.weeklyPay;
        this._groupName = page.name;
        this.initializeForm();
      }catch(Error){ this._actualPay = 0; }
    });
  }

  public changeWeekPay(){
    this.__groupS.changeWeekPay({
      groupName: this._groupName,
      weeklyPay: this.changeWeeklyPayForm.controls["newPay"].value
    });
    this.resetForm();
  }

  private initializeForm(){
    this.changeWeeklyPayForm = new FormGroup({
      "newPay": new FormControl(
        this._actualPay,
        [
          Validators.required,
          Validators.min(100),
          Validators.max(2000)
        ]
      )
    });
  }

  private resetForm(){
    this.changeWeeklyPayForm.reset({'newPay' : ""});
  }
}
