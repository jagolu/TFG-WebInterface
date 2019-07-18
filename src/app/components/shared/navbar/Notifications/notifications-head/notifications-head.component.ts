import { Component, Input } from '@angular/core';
import { NotificationsService } from 'src/app/services/userServices/Hub/notifications.service';
import { IconModel, Icons, NotificationMessage } from 'src/app/models/models';

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
export class NotificationsHeadComponent{

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
     * The notifications that the user have
     * 
     * @access public
     * @var {NotificationMessage[]} notifications
     */
    public notifications:NotificationMessage[] = [];

    /**
     * The icon of a bell
     * 
     * @access public
     * @var {IconModel} icon_bell
     */
    public icon_bell:IconModel = Icons.BELL;


    //
    // ──────────────────────────────────────────────────────────────────────────
    //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    
    /**
     * @constructor
     * @param {NotificationsService} notS To know the count of unread notifications
     */
    constructor(private notS:NotificationsService){
        this.notS.notifications.subscribe(msgs=>this.notifications = msgs);
    }
}