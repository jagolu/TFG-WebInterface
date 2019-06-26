import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from 'src/app/models/models';
import { ChatService } from 'src/app/services/restServices/chat.service';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatMessagesService } from 'src/app/services/userServices/chat-messages.service';


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
  public valid:boolean = true;

  constructor(private _chatS:ChatService, private _authS:AuthenticationService, private userChat:ChatMessagesService) { 
    this.initializeForm();
    this.loading = true;
  }

  ngOnInit(){
    if(this._authS.IsAuthenticated() && !this._chatS.alreadyLogged(this.groupName)){
      this._chatS.logChat(this.groupName).subscribe(_=> {
        this.userChatSub();
        this._chatS.subscribeChatHub(this.groupName);
      });
    }
    else if(this._chatS.alreadyLogged(this.groupName)){
      this.userChatSub();
      this._chatS.subscribeChatHub(this.groupName);
    }
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
    setTimeout(_=> div.scrollTop = div.scrollHeight, 20); 
  }

  private userChatSub(){
    this.loading = false;
    this.publicUserId = this._chatS.getUserPublicId();
    this.userChat.room.subscribe(r=>{
      r.forEach(room=>{
        if(room.groupName == this.groupName) this.messages = room.messages;
        this.scrollDown();
      });
    });
    this.userChat.reDown.subscribe((down:[string,boolean])=>{
      if(down[0] == this.groupName && down[1] == true){
        this.scrollDown();
      }
    });
    this.userChat.connection.subscribe(ok=>this.valid = ok);
  }
}
