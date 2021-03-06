import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertMode, AlertInfoType, GroupBet, UserInGroupSearch, GroupMemberAdmin } from 'src/app/models/models';


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
   * @var {BehaviorSubject<AlertMode>} __alertMode
   */
  private __alertMode = new BehaviorSubject<AlertMode>(null);

  /**
   * The alert mode at which the other components will subscribe at
   * 
   * @access public
   * @var {Observable} mode
   */
  public mode = this.__alertMode.asObservable();

  /**
   * The behaviour of the info-alert type
   * 
   * @access private
   * @var {BehaviorSubject<AlertInfoType>} __infoAlertType
   */
  private __infoAlertType = new BehaviorSubject<AlertInfoType>(null);
  
  /**
   * The info-alert type at which the other components will subscribe at
   * 
   * @access public
   * @var {Observable} alertType
   */
  public alertType = this.__infoAlertType.asObservable();

  /**
   * The behaviour of the filter for alerts which needs or not
   * a form
   * 
   * @access private
   * @var {BehaviorSubject<Boolean>} __formNeeded
   */
  private __formNeeded = new BehaviorSubject<Boolean>(false);

  /**
   * The filter at which the other components will subscribe at
   * 
   * @access public
   * @var {Observable} needForm
   */
  public needForm = this.__formNeeded.asObservable();

  /**
   * The behaviour of the target for alerts which needs
   * extra information like an email or group names
   * 
   * @access private
   * @var {BehaviorSubject<string>} __alertTarget
   */
  private __alertTarget = new BehaviorSubject<string>(null);

  /**
   * The extra info at which the other components will subscribe at
   * 
   * @access public
   * @var {Observable} target
   */
  public target = this.__alertTarget.asObservable();

  /**
   * The behaviour of the title of the alert
   * 
   * @access private
   * @var {BehaviorSubject<string>} __alertTitle
   */
  private __alertTitle = new BehaviorSubject<string>("");

  /**
   * The alert title at which the other components will subscribe at
   * 
   * @access public
   * @var {Observable} title
   */
  public title = this.__alertTitle.asObservable();
  
  /**
   * The behaviour of the trigger to reset the form of the alerts
   * 
   * @access private
   * @var {BehaviorSubject<boolean>} __resetForm
   */
  private __resetForm = new BehaviorSubject<boolean>(false);

  /**
   * The filter to reset the form of the alerts
   * at which the other components will subscribe at
   * 
   * @access public
   * @var {Observable} reset
   */
  public reset = this.__resetForm.asObservable();
  
  /**
   * The behaviour to fill the alert with an object info
   * 
   * @access private
   * @var {BehaviorSubject<any>} __objectInfo
   */
  private __objectInfo = new BehaviorSubject<any>(null);

  /**
   * The data to fill the alerts when they need extra info
   * at which the other components will subscribe at
   * 
   * @access public
   * @var {Observable} reset
   */
  public oInfo = this.__objectInfo.asObservable();
  

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
    this.setTitle("Atención!");
    this.changeAlertMode(AlertMode.ALERTINFO);
    this.__infoAlertType.next(AlertType);
    this.openAlert();
  }

  /**
   * Open the alert showing the form to create
   * a new group
   * 
   * @access public
   */
  public openCreateGroup(){
    this.setTitle("Crear grupo.");
    this.changeAlertMode(AlertMode.CREATEGROUP);
    this.openAlert();
  }

  /**
   * Open the alert showing the delete account 
   * alert with or without the form
   * 
   * @access public
   * @param {string} email The email of the account
   * to delete
   */
  public deleteAccount(email:string){
    this.setTitle("Vas a eliminar tu cuenta de usuario. ¿Estás seguro?");
    this.changeAlertMode(AlertMode.DELETEACCOUNT);
    this.setTarget(email);
    this.openAlert();
  }

  /**
   * Open the alert showing the set a social password form
   * alert 
   * 
   * @access public
   * @param {string} type The type of social log (Facebook or Google)
   */
  public socialPasswordForm(type:string){
    this.setTitle("Elige una contraseña");
    this.changeAlertMode(AlertMode.SOCIALPASSWORD);
    this.setTarget(type);
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
    this.setTitle(`Vas a unirte al grupo "${groupName}"`);
    this.changeAlertMode(AlertMode.JOINGROUP);
    this.__formNeeded.next(needPass);
    this.setTarget(groupName);
    this.openAlert();
  }

  /**
   * Open the alert showing a form to do a
   * user football bet
   * 
   * @param {GroupBet} bet The info of the bet 
   * @param {number} coins The actual coins of the user
   */
  public doAFootballBet(bet:GroupBet, coins:number){
    this.setTitle(bet.betName);
    this.changeAlertMode(AlertMode.FOOTBALLBET);
    this.__objectInfo.next({
      "bet":bet,
      "userCoins": coins
    });
    this.openAlert();
  }

  /**
   * Open the alert showing the info and button
   * to cancel a user football bet
   * 
   * @param {GroupBet} bet The info of the bet
   * @param {number} user_coins The coins bet by the user
   * @param {string} userFootballBetId The id of the userFootballBet
   */
  public cancelUserFootballBet(bet:GroupBet, user_coins:number, userFootballBetId:string){
    this.setTitle("Vas a cancelar tu apuesta!!");
    this.changeAlertMode(AlertMode.CANCELUSERFOOTBALLBET);
    this.__objectInfo.next({
      "bet":bet,
      "userCoins": user_coins
    });
    this.setTarget(userFootballBetId);
    this.openAlert();
  }

  /**
   * Open the alert showing the message when a user wants to
   * cancel a football bet
   * 
   * @param {string} betId The id of the football bet
   */
  public cancelFootballBet(betId:string){
    this.setTitle("Estas a punto de cancelar el evento de apuesta!");
    this.changeAlertMode(AlertMode.CANCELFOOTBALLBET);
    this.setTarget(betId);
    this.openAlert();
  }

  /**
   * Open the alert showing the groups of an
   * user and their info
   * 
   * @param {UserInGroupSearch[]} groups The info of the groups
   * @param {username} string The username of the user
   */
  public seeUserGroups(groups:UserInGroupSearch[], username:string){
    this.setTitle(`Grupos de "${username}"`);
    this.changeAlertMode(AlertMode.SEEUSERGROUPS_ADMIN);
    this.__objectInfo.next(groups);
    this.openAlert();
  }

  /**
   * Open the alert showing the members of an
   * group and their info
   * 
   * @param {GroupMemberAdmin[]} members The info of the members
   * @param {groupName} string The name of the group
   */
  public seeGroupMembers(members:GroupMemberAdmin[], groupName:string){
    this.setTitle(`Miembros de "${groupName}"`);
    this.changeAlertMode(AlertMode.SEEGROUPMEMBERS_ADMIN);
    this.__objectInfo.next(members);
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
    this.__alertMode.next(newMode);
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
    this.__alertTarget.next(target);
  }

  /**
   * Sets the title of the alert
   * 
   * @param {string} title The title of the alert 
   */
  private setTitle(title:string){
    this.__alertTitle.next(title);
  }

  /**
   * Acts like a trigger to reset the form of the alerts
   * 
   * @access private
   */
  private resetForms(){
    //First set true the rest form. The components which are
    //subscribed will catch the 'true' and will reset the form.
    this.__resetForm.next(true);

    //When all the form will be reseted (aprox 0.5 seconds) change
    // the value to false for not being reseting all the time
    setTimeout(()=>{ this.__resetForm.next(false); }, 500);
  }
}