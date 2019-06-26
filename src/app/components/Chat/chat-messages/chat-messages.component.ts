import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from 'src/app/models/models';
import { ChatService } from 'src/app/services/restServices/chat.service';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styles: []
})
export class ChatMessagesComponent implements OnInit{

  @Input() groupName:string ="";
  public messages:ChatMessage[] = [];
  private publicUserId:string ="";
  public sendChatMessageForm:FormGroup;
  public loading:boolean = true;

  constructor(private _chatS:ChatService, private _authS:AuthenticationService) { 
    this.initializeForm();
    this.loading = true;
  }

  ngOnInit(){
    if(this._authS.IsAuthenticated()){
      this._chatS.logChat(this.groupName).subscribe((chatInfo:any)=>{
        this.publicUserId = chatInfo.callerPublicId;
        this.messages = chatInfo.messages;
        this.loading = false;
        this.scrollDown();
      });
      this.getMessages();
    }
  }

  public isValid(){
    return this._chatS.validConnection;
  }

  private getMessages(){
    this._chatS.hubConnection.on(this.groupName, (message:ChatMessage)=>{
      this.messages.push(message);
      setTimeout(_=>this.scrollDown(), 10);
    });
  }

  private initializeForm(){
    this.sendChatMessageForm = new FormGroup({
      'message': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(150)
        ]
      )
    })
  }

  public send(){
    if(this.sendChatMessageForm.valid){
      this._chatS.sendMessageToChat({
        "group": this.groupName,
        "message": this.sendChatMessageForm.controls["message"].value,
        "username": "",
        "publicUserId": this.publicUserId,
        "role": "",
        "time": new Date()
      });
      
      this.sendChatMessageForm.reset({
        "message" : ""
      });
    }
  }

  private scrollDown(){
    let div = (document.querySelector("#chatScroll") as HTMLElement);
    div.scrollTop = div.scrollHeight;
  }

}
