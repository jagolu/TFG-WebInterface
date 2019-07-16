import { Component, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DirectMessagesService } from 'src/app/services/restServices/direct-messages.service';
import { DMMessage } from 'src/app/models/models';
import { SessionService } from 'src/app/services/userServices/session.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-direct-conversation',
  templateUrl: './direct-conversation.component.html',
  styles: []
})
export class DirectConversationComponent implements AfterViewChecked {

  private id:string = "";
  private loading :boolean = false;
  private messages :DMMessage[] = [];
  private thisIsAdmin :Boolean = false;
  private sendDMMessageForm: FormGroup;

  constructor(private aR:ActivatedRoute, private dmS:DirectMessagesService, private sessionS:SessionService) { 
    this.id = this.aR.snapshot.paramMap.get('id');
    this.thisIsAdmin = this.sessionS.isAdmin();
    this.initializeForm();
}

  ngAfterViewChecked() {
    if(!this.loading){
      this.dmS.loadDMMessages(this.id).subscribe((msgs:DMMessage[])=>this.messages = msgs);
    }
    this.loading = true;
  }

  public sendMessage(){
    this.dmS.launchDMMessage({
      "dmId": this.id,
      "message": this.sendDMMessageForm.controls["message"].value
    }).subscribe(x=>console.log(x));
    this.resetForm();
  }

  private initializeForm(){
    this.sendDMMessageForm = new FormGroup({
      "message": new FormControl(
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256)
        ]
      )
    })
  }

  private resetForm(){
    this.sendDMMessageForm.reset({"message": ""});
  }
}
