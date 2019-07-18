import { Component } from '@angular/core';
import { AliveService } from 'src/app/services/restServices/alive.service';
import { NotificationsService } from 'src/app/services/userServices/Hub/notifications.service';
import { NotificationBase } from '../NotificationBase';

@Component({
  selector: 'app-notifications-nav',
  templateUrl: './notifications-nav.component.html',
  styles: []
})
/**
 * Class to the dropdown of the notifications
 * 
 * @class
 * @extends NotificationBase
 */
export class NotificationsNavComponent extends NotificationBase{

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
