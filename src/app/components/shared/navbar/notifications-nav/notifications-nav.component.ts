import { Component } from '@angular/core';
import { IconModel, Icons, NotificationMessage, LoginNotification } from 'src/app/models/models';
import { AliveService } from 'src/app/services/restServices/alive.service';
import { NotificationsService } from 'src/app/services/userServices/Hub/notifications.service';

@Component({
  selector: 'app-notifications-nav',
  templateUrl: './notifications-nav.component.html',
  styles: []
})
export class NotificationsNavComponent{

  public notifications:NotificationMessage[] = [];
  public icon_bell:IconModel = Icons.BELL;

  constructor(private aliveS:AliveService, private notS:NotificationsService) { 
    this.aliveS.getNotifications().subscribe((n:LoginNotification)=>this.notS.initialize(n.publicUserid, n.messages));

    this.notS.notifications.subscribe(msgs=>this.notifications = msgs);
  }

  public watchNotification(not:NotificationMessage){
    this.aliveS.readNotification(not.id).subscribe(_=>{
      let index = this.notifications.indexOf(not, 0);
      if(index>-1) this.notifications.splice(index, 1);
    });
  }
}
