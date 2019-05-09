import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to manage the alerts to create a new group
 * 
 * @class
 */
export class CreateGroupAlertService {

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
  // ────────────────────────────────────────────────────────────────────────  ──────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Opens the alert
   * 
   * @access public
   */
  public openAlert(){
    (document.querySelector("#createGroupAlert") as HTMLElement).click();
  }
}
