import { Component, HostListener } from '@angular/core';
import { AliveService } from 'src/app/services/restServices/alive.service';
import { NotificationsService } from 'src/app/services/userServices/Hub/notifications.service';
import { NotificationMessage, LoginNotification } from 'src/app/models/models';

@Component({
  selector: 'app-notifications-nav',
  templateUrl: './notifications-nav.component.html',
  styles: [`.whiteS {white-space: normal;}`]
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
    
    /**
     * The screen width
     * 
     * @access public
     * @var {number} width
     */
    public width:number;
  
  
    //
    // ──────────────────────────────────────────────────────────────────────────
    //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    
    /**
     * @constructor
     * @param {AliveService} __aliveS To get the unread notifications of the user
     * @param {NotificationsService} __notS To get the new incoming notifications
     */
    constructor(private __aliveS:AliveService, private __notS:NotificationsService){
        this.__aliveS.getNotifications().subscribe((n:LoginNotification)=>
            this.__notS.initialize(n.publicUserid, n.messages));
  
        this.__notS.notifications.subscribe(msgs=>this.notifications = msgs);
    }
  
    //
    // ──────────────────────────────────────────────────────────────────────────────────
    //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────────
    //
  
      
   /**
    * Function to know the actual screen width
    * 
    * @param {any} event The event of resizing the screen
    */
    @HostListener('window:resize', ['$event']) onResize(event) {
        this.width = window.innerWidth;
    }
  
    /**
     * Mark one notification as "Read" and delete it
     * 
     * @access public
     * @param {NotificationMessage} not The notification to read
     */
    public watchNotification(not:NotificationMessage){
        let index = this.notifications.indexOf(not, 0);
        if(index>-1) this.notifications.splice(index, 1);
        this.__aliveS.readNotification(not.id);
    }
}