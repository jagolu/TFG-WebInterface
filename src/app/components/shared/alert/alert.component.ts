import { Component, AfterViewInit } from '@angular/core';
import { AlertMode } from 'src/app/models/models';
import { AlertService } from 'src/app/services/visualServices/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: []
})
/**
 * Class for Bootstrap modals acting like alerts
 * 
 * @class
 * @implements AfterViewInit
 */
export class AlertComponent  implements AfterViewInit {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * For interact with the navbar tag
   * 
   * @access private
   * @var {HTMLElement} navbar
   */
  private navbar:HTMLElement;

  /**
   * For intercat with the outlet tag
   * 
   * @access private
   * @var {HTMLElement} outlet
   */
  private outlet:HTMLElement;

  /**
   * The mode of the alert to show the
   * correct alert
   * 
   * @access public
   * @var {AlertMode} mode
   */
  public mode:AlertMode;

  /**
   * The title of the alert
   * 
   * @access public
   * @var {string} title
   */
  public title:string;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {AlertService} AlertS To get the info of the alert
   */
  constructor(private AlertS:AlertService) { 
    AlertS.mode.subscribe(
      mod => this.mode = mod
    );
    AlertS.title.subscribe(
      alertTitle => this.title = alertTitle
    );
  }

  /**
   * Gets the navbar & outlet tags
   * 
   * @AfterViewInit
   */
  ngAfterViewInit(){
    this.navbar = (document.querySelector("#navbarId") as HTMLElement);
    this.outlet = (document.querySelector(".main") as HTMLElement);
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Focus the screen on the alert
   * 
   * @access public
   */
  public focusIn(){
    this.navbar.style.filter = "blur(6px)";
    this.outlet.style.filter = "blur(6px)";
  }

  /**
   * Blur the screen of the alert
   * 
   * @access public
   */
  public focusOut(){
    this.navbar.style.filter = "none";
    this.outlet.style.filter = "none";
  }
}
