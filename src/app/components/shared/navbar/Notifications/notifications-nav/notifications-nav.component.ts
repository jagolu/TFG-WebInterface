import { Component } from '@angular/core';
import { AliveService } from 'src/app/services/restServices/alive.service';
import { NotificationsService } from 'src/app/services/userServices/Hub/notifications.service';
import { NotificationMessage, LoginNotification } from 'src/app/models/models';

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
export class NotificationsNavComponent {

    //
    // ──────────────────────────────────────────────────────────────────────
    //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────
    //
    
    /**
     * The notifications that the user have
     * 
     * @access public
     * @var {NotificationMessage[]} notifications
     */
    public notifications:NotificationMessage[] = [];


    //
    // ──────────────────────────────────────────────────────────────────────────
    //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    
    /**
     * @constructor
     * @param {AliveService} aliveS To get the unread notifications of the user
     * @param {NotificationsService} notS To get the new incoming notifications
     */
    constructor(private aliveS:AliveService, private notS:NotificationsService){
        this.aliveS.getNotifications().subscribe((n:LoginNotification)=>
            this.notS.initialize(n.publicUserid, n.messages));

        this.notS.notifications.subscribe(msgs=>this.notifications = msgs);
    }

    //
    // ──────────────────────────────────────────────────────────────────────────────────
    //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────────
    //

    /**
     * Mark one notification as "Read" and delete it
     * 
     * @access public
     * @param {NotificationMessage} not The notification to read
     */
    public watchNotification(not:NotificationMessage){
        this.aliveS.readNotification(not.id).subscribe(_=>{
            let index = this.notifications.indexOf(not, 0);
            if(index>-1) this.notifications.splice(index, 1);
        });
    }
}
