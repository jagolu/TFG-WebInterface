import { Component } from '@angular/core';
import { IconModel, Icons, NotificationMessage } from 'src/app/models/models';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';
import { AliveService } from 'src/app/services/restServices/alive.service';

@Component({
  selector: 'app-notifications-nav',
  templateUrl: './notifications-nav.component.html',
  styles: []
})
export class NotificationsNavComponent{

  public notifications:NotificationMessage[] = [];
  public icon_bell:IconModel = Icons.BELL;

  constructor(private authS:AuthenticationService, private aliveS:AliveService) { 
    this.aliveS.getNotifications().subscribe((n:NotificationMessage[])=>this.notifications = n);
  }

  public watchNotification(not:NotificationMessage){
    this.aliveS.readNotification(not.id).subscribe(_=>{
      let index = this.notifications.indexOf(not, 0);
      if(index>-1) this.notifications.splice(index, 1);
    });
  }

}
