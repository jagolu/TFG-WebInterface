import { Component, Input } from '@angular/core';
import { NotificationBase } from '../NotificationBase';
import { AliveService } from 'src/app/services/restServices/alive.service';
import { NotificationsService } from 'src/app/services/userServices/Hub/notifications.service';

@Component({
  selector: 'app-notifications-head',
  templateUrl: './notifications-head.component.html',
  styles: []
})
/**
 * Class to the bell and unread notification count
 * 
 * @class
 * @extends NotificationBase
 */
export class NotificationsHeadComponent extends NotificationBase{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Filter to show or not the bell 
   * when there is not unread notifications.
   * True to always show the bell, false to hide
   * it when there is not unread notifications.
   * 
   * @var {Boolean} alwaysShow
   */
  @Input() alwaysShow:Boolean = true;

  /**
   * The "notifications" array and the bell_icon come
   * from the NotificationBase class
   */

  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {AliveService} aliveS To initialize NotificationBase
   * @param {NotificationsService} notS To initialize NotificationBase
   */
  constructor(aliveS:AliveService, notS:NotificationsService) { 
    super(aliveS, notS);
  }
}
