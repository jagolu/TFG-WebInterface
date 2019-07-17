import { Component, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DirectMessagesService } from 'src/app/services/restServices/direct-messages.service';
import { DMRoom, DMTitle, DMMessageCluster } from 'src/app/models/models';
import { SessionService } from 'src/app/services/userServices/session.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-direct-conversation',
  templateUrl: './direct-conversation.component.html',
  styles: [`
    .closedConv{background-color:#F2F2F2}
    .closedMsg{background-color:#F7F6F6}
  `]
})
export class DirectConversationComponent implements AfterViewChecked {

  private id:string = "";
  private loading :boolean = false;
  private sendDMMessageForm: FormGroup;

  public room:DMTitle;
  public clusters:DMMessageCluster[] = [];
  public thisIsAdmin :Boolean = false;

  constructor(private aR:ActivatedRoute, private dmS:DirectMessagesService, private sessionS:SessionService) { 
    this.id = this.aR.snapshot.paramMap.get('id');
    this.thisIsAdmin = this.sessionS.isAdmin();
}

  ngAfterViewChecked() {
    if(!this.loading){
      this.dmS.loadDMMessages(this.id).subscribe((dmr:DMRoom)=>{
        this.setData(dmr);
        if(!this.room.closed) this.initializeForm();
      });
    }
    this.loading = true;
  }

  public sendMessage(){
    this.dmS.launchDMMessage({
      "dmId": this.id,
      "message": this.sendDMMessageForm.controls["message"].value
    }).subscribe((dmr:DMRoom)=>this.setData(dmr));
    this.resetForm();
  }

  public closeConversation(){
    this.dmS.openCloseConversation(this.room.id, false).subscribe((dmr:DMRoom)=>this.setData(dmr));
    this.resetForm();
  }

  public openConversation(){
    this.dmS.openCloseConversation(this.room.id, true).subscribe((dmr:DMRoom)=>this.setData(dmr));
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

  private setData(dmr:DMRoom){
    try{
      this.room = dmr.title;
      this.clusters = dmr.clusters;   
      this.scrollDown();   
    }catch(Error){this.clusters = []}
  }

  private scrollDown(){
    let div = (document.querySelector("#DMMessagesScroll") as HTMLElement);
    if(div!=null) setTimeout(_=> div.scrollTop = div.scrollHeight, 20); 
  }
}
