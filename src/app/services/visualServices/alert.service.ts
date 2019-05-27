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
   * @var {BehaviorSubject<AlertMode>} alertMode
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
   * @var {BehaviorSubject<AlertInfoType>} infoAlertType
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
   * The behaviour of the filter for alerts which needs or not
   * a form
   * 
   * @access private
   * @var {BehaviorSubject<Boolean>} formNeeded
   */
  private formNeeded = new BehaviorSubject<Boolean>(false);

  /**
   * The filter at which the other components will subscribe at
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
   * @var {BehaviorSubject<string>} alertTarget
   */
  private alertTarget = new BehaviorSubject<string>(null);

  /**
   * The extra info at which the other components will subscribe at
   * 
   * @access public
   * @var {Observable} target
   */
  public target = this.alertTarget.asObservable();

  /**
   * The behaviour of the title of the alert
   * 
   * @access private
   * @var {BehaviorSubject<string>} alertTitle
   */
  private alertTitle = new BehaviorSubject<string>("");

  /**
   * The alert title at which the other components will subscribe at
   * 
   * @access public
   * @var {Observable} title
   */
  public title = this.alertTitle.asObservable();
  
  /**
   * The behaviour of the trigger to reset the form of the alerts
   * 
   * @access private
   * @var {BehaviorSubject<boolean>} resetForm
   */
  private resetForm = new BehaviorSubject<boolean>(false);

  /**
   * The filter to reset the form of the alerts
   * at which the other components will subscribe at
   * 
   * @access public
   * @var {Observable} reset
   */
  public reset = this.resetForm.asObservable();
  

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
    this.setTitle("Attention!");
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
    this.setTitle("Create group");
    this.changeAlertMode(AlertMode.CREATEGROUP);
    this.openAlert();
  }

  /**
   * Open the alert showing the delete account 
   * alert with or without the form
   * 
   * @access public
   * @param {boolean} needPass Filter to show the
   * form or not. 
   * @param {string} email The email of the account
   * to delete
   */
  public deleteAccount(needPass:boolean, email:string){
    this.setTitle("Vas a eliminar tu cuenta de usuario. ¿Estás seguro?");
    this.changeAlertMode(AlertMode.DELETEACCOUNT);
    this.formNeeded.next(needPass);
    this.setTarget(email);
    this.openAlert();
  }

  /**
   * Open the alert showing the delete group 
   * alert with or without the form
   * 
   * @access public
   * @param {boolean} needPass Filter to show the
   * form or not. 
   * @param {string} GroupName The email of the account
   * to delete
   */
  public deleteGroup(groupName:string){
    this.setTitle(`Vas a eliminar el grupo ${groupName}. ¿Estás seguro?`);
    this.changeAlertMode(AlertMode.DELETEGROUP);
    this.setTarget(groupName);
    this.openAlert();
  }

  /**
   * Open the alert showing the join group alert
   * with or without the form
   * 
   * @access public
   * @param {boolean} needPass Filter to show the form or not 
   * @param {string} groupName The name of the group to join in
   */
  public joinGroup(needPass:boolean, groupName:string){
    this.setTitle("You are going to join at the group "+groupName);
    this.changeAlertMode(AlertMode.JOINGROUP);
    this.formNeeded.next(needPass);
    this.setTarget(groupName);
    this.openAlert();
  }

  /**
   * Open the alert showing the form to create a 
   * new virtual bet
   * 
   * @access public
   */
  public createVirtualBet(){
    this.setTitle("Create a new virtual bet");
    this.changeAlertMode(AlertMode.CREATEVIRTUALBET);
    this.openAlert();
  }

  /**
   * Open the alert showing the form to create a 
   * new official bet
   * 
   * @access public
   */
  public createOfficialBet(){
    this.setTitle("Create a new official bet");
    this.changeAlertMode(AlertMode.CREATEOFFICIALBET);
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
  // ────────────────────────────────────────────────────────────────────────────────────
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
    this.resetForms();
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

  /**
   * Sets the title of the alert
   * 
   * @param {string} title The title of the alert 
   */
  private setTitle(title:string){
    this.alertTitle.next(title);
  }

  /**
   * Acts like a trigger to reset the form of the alerts
   * 
   * @access private
   */
  private resetForms(){
    //First set true the rest form. The components which are
    //subscribed will catch the 'true' and will reset the form.
    this.resetForm.next(true);

    //When all the form will be reseted (aprox 0.5 seconds) change
    // the value to false for not being reseting all the time
    setTimeout(()=>{ this.resetForm.next(false); }, 500);
  }
}