import { Component } from '@angular/core';
import { AlertMode, IconModel, Icons } from 'src/app/models/models';
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
export class AlertComponent{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

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

  /**
   * Var to get the cross icon
   * 
   * @access public
   * @var {IconModel} icon_cross
   */
  public icon_cross:IconModel = Icons.CROSS;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {AlertService} AlertS To get the info of the alert
   */
  constructor(AlertS:AlertService) { 
    AlertS.mode.subscribe(
      mod => this.mode = mod
    );
    AlertS.title.subscribe(
      alertTitle => this.title = alertTitle
    );
  }

  /**
   * The focus-in & the focus-out is done on 
   * the src/assets/auxJs.js
   */
}
