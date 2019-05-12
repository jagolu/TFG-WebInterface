import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertMode, AlertInfoType } from 'src/app/models/models';


@Injectable({
  providedIn: 'root'
})
/**
 * Service to manage the alerts
 * 
 * @class
 */
export class AlertService {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The behaviour of the alert mode
   * 
   * @access private
   * @var {BehaviorSubject<UserInfo>} alertMode
   */
  private alertMode = new BehaviorSubject<AlertMode>(null);

  /**
   * The alert mode at which the other components will subscribe at
   * 
   * @access public
   * @var {Observable} mode
   */
  public mode = this.alertMode.asObservable();

  /**
   * The behaviour of the info-alert type
   * 
   * @access private
   * @var {BehaviorSubject<UserInfo>} infoAlertType
   */
  private infoAlertType = new BehaviorSubject<AlertInfoType>(null);
  
  /**
   * The info-alert type at which the other components will subscribe at
   * 
   * @access public
   * @var {Observable} alertType
   */
  public alertType = this.infoAlertType.asObservable();

  /**
   * The behaviour of the filt for alerts which needs or not
   * a form
   * 
   * @access private
   * @var {BehaviorSubject<UserInfo>} formNeeded
   */
  private formNeeded = new BehaviorSubject<Boolean>(false);

  /**
   * The filt at which the other components will subscribe at
   * 
   * @access public
   * @var {Observable} needForm
   */
  public needForm = this.formNeeded.asObservable();

  /**
   * The behaviour of the target for alerts which needs
   * extra information like an email or group names
   * 
   * @access private
   * @var {BehaviorSubject<UserInfo>} alertTarget
   */
  private alertTarget = new BehaviorSubject<string>(null);

  /**
   * The extra info at which the other components will subscribe at
   * 
   * @access public
   * @var {Observable} target
   */
  public target = this.alertTarget.asObservable();
  

  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   */
  constructor() { }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Open the alert showing an info-alert
   * 
   * @access public
   * @param {AlertInfoType} AlertType The type of 
   * the info alert to show the correct message
   */
  public openAlertInfo(AlertType:AlertInfoType){
    this.changeAlertMode(AlertMode.ALERTINFO);
    this.infoAlertType.next(AlertType);
    this.openAlert();
  }

  /**
   * Open the alert showing the form to create
   * a new group
   * 
   * @access public
   */
  public openCreateGroup(){
    this.changeAlertMode(AlertMode.CREATEGROUP);
    this.openAlert();
  }

  /**
   * Open the alert showing the delete account 
   * alert with or without the form
   * 
   * @access public
   * @param {boolean} needPass Filt to show the
   * form or not. 
   * @param {string} email The email of the account
   * to delete
   */
  public deleteAccount(needPass:boolean, email:string){
    this.changeAlertMode(AlertMode.DELETEACCOUNT);
    this.formNeeded.next(needPass);
    this.setTarget(email);
    this.openAlert();
  }
  
  /**
   * Close the alert clicking a hide button
   * 
   * @access public
   */
  public hideAlert(){
    (document.querySelector("#hideAlert") as HTMLElement).click();
  }


  //
  // ──────────────────────────────────────────────────────────────────────────  ──────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Change the alert mode of the var alertMode
   * 
   * @access private
   * @param {AlertMode} newMode The new alert mode 
   */
  private changeAlertMode(newMode:AlertMode){
    this.alertMode.next(newMode);
  }

  /**
   * Open the alert clicking a hide button
   * 
   * @access private
   */
  private openAlert(){
    (document.querySelector("#openAlert") as HTMLElement).click();
  }

  /**
   * Set the target for the extra info on the
   * alertTarget var
   * 
   * @access public
   * @param {string} target The info to set
   * in the var 
   */
  private setTarget(target:string){
    this.alertTarget.next(target);
  }
}