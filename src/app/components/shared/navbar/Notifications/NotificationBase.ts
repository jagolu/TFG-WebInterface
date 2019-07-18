import { AliveService } from 'src/app/services/restServices/alive.service';
import { NotificationsService } from 'src/app/services/userServices/Hub/notifications.service';
import { NotificationMessage, IconModel, Icons, LoginNotification } from 'src/app/models/models';

/**
 * Base class to the notifications components
 * 
 * @class
 */
export class NotificationBase{

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