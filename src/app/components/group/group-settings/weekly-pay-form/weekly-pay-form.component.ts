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

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The form to change the weekly pay
   * 
   * @access public
   * @var {FormGroup} changeWeeklyPayForm
   */
  public changeWeeklyPayForm:FormGroup;

  /**
   * The actual weekly pay of the group
   * 
   * @access private
   * @var {number} _actualPay
   */
  private _actualPay:number;

  /**
   * The name of the group
   * 
   * @access private
   * @var {string}  _groupName
   */
  private _groupName:string;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {GroupInfoService} __groupInfoS To get the info of the group
   * @param {GroupService} __groupS To do the group request
   */
  constructor(private __groupInfoS:GroupInfoService, private __groupS:GroupService) { 
    this.initializeForm();
  }

  /**
   * Get the info of the group
   * 
   * @OnInit
   */
  ngOnInit() {
    this.__groupInfoS.info.subscribe(page=>{
      try{
        this._actualPay = page.weeklyPay;
        this._groupName = page.name;
        this.initializeForm();
      }catch(Error){ this._actualPay = 0; }
    });
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Change the weekly pay
   * 
   * @access public
   */
  public changeWeekPay(){
    this.__groupS.changeWeekPay({
      groupName: this._groupName,
      weeklyPay: this.changeWeeklyPayForm.controls["newPay"].value
    });
    this.resetForm();
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Initializes the form
   * 
   * @access private
   */
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

  /**
   * Resets the form
   * 
   * @access private
   */
  private resetForm(){
    this.changeWeeklyPayForm.reset({'newPay' : ""});
  }
}