import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to manage the alerts to delete an user account or a group
 * 
 * @class
 */
export class PasswordAlertService {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The HTML tag asociated to the main message
   * 
   * @access private
   * @var {HTMLElement} txtMessage
   */
  private txtMessage;

  /**
   * The ids of the buttons to open one kind of alert or other one. The ids buttons
   * are the id for the delete account alert and the delete group alert
   * 
   * @access private
   * @var {string[]} idButtons
   */
  private idButtons;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   */
  constructor() { 
    this.txtMessage = (document.querySelector("#alertTextId") as HTMLElement);
    this.idButtons = [
      PasswordAlertType.DELETEACCOUNT,
      PasswordAlertType.DELETEGROUP
    ]
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Opens the alert
   * 
   * @access public
   * @param {PasswordAlertType} type The type of password alert
   * @param {boolean} hasPassword True if the form need the password input, false otherwise
   */
  public openAlert(type:PasswordAlertType, hasPassword:boolean){
    let txt = this.getText(type);
    this.txtMessage.textContent = txt;

    this.showButton(type);
    if(hasPassword) (document.querySelector("#passwordAlertButtonWithPassword") as HTMLElement).click();
    else (document.querySelector("#passwordAlertButtonWithoutPassword") as HTMLElement).click();
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Get the texts depending the type of the alert
   * 
   * @access private
   * @param {PasswordAlertType} type The type of the alert
   * @return {string} The main text of the alert
   */
  private getText(type:PasswordAlertType){
    if(type == PasswordAlertType.DELETEACCOUNT){
      return "Vas a eliminar tu cuenta de usuario. ¿Estás seguro?";
    }
  }

  /**
   * Show the buttons we wanna show and hide the others
   * The buttons on the view has the same id of the types of the
   * enum 'PasswordAlertType'+NOTPASSWORD, so is easy hide or show them
   * 
   * @access private
   * @param {PasswordAlertType} type The alert type.
   */
  private showButton(type:PasswordAlertType){
    this.idButtons
      //Filter the buttons with distinct type of the specified one
      //in other words, the buttons we don't wanna show
      .filter( 
        button=> button != type.toString()
      )
      //Hide those buttons we don't wanna show
      .forEach(buttonId => {
        (document.querySelector("#"+buttonId) as HTMLElement).style.display="none";
        (document.querySelector("#"+buttonId+"NOTPASSWORD") as HTMLElement).style.display="none";
      }
    );
    //Show the buttons we wanna show
    (document.querySelector("#"+type.toString()) as HTMLElement).style.display="block";
    (document.querySelector("#"+type.toString()+"NOTPASSWORD") as HTMLElement).style.display="block";
  }
}


//
// ────────────────────────────────────────────────────────────
//   :::::: E N U M S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────
//

/**
 * Enum to categorize that alerts
 * 
 * @enum
 */
export enum PasswordAlertType{
  /**
   * @summary For the form to delete user accounts
   */
  DELETEACCOUNT = "DELETEACCOUNT",

  /**
   * @summary For the form to delete groups
   */
  DELETEGROUP = "DELETEGROUP"
}
