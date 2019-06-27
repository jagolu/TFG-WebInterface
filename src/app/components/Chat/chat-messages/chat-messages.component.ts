import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from 'src/app/models/models';
import { ChatService } from 'src/app/services/restServices/chat.service';
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
  private timerReset = null;

  constructor(private _chatS:ChatService, private userChat:ChatMessagesService) { 
    this.initializeForm();
  }

  ngOnInit(){
    this.userChatSub();
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
    this.userChat.room.subscribe(msgs=>{
      this.publicUserId = this._chatS.getUserPublicId();
      this.messages = msgs;
      this.scrollDown();
    });
    this.userChat.reDown.subscribe((down:[string,boolean])=>{
      if(down[0] == this.groupName && down[1] == true){
        this.scrollDown();
      }
    });
  }
  
  public isOtherUser(index:number){
    if(index == 0) return true;
    let nowMsg = this.messages[index];
    let lastMsg = this.messages[index-1];

    if(nowMsg.publicUserId == lastMsg.publicUserId && lastMsg.username != ""){
      return false;
    }

    return true;
  }

  public startReseting(){
    this.timerReset = setInterval(_=>this.userChat.readMessagesGroup(this.groupName), 50);
  }
  public stopReseting(){
    clearInterval(this.timerReset);
  }
}