import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LogChatRoom, ChatMessage } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class ChatMessagesService {
  private allRooms : LogChatRoom[] =[];

  private chatRoom = new BehaviorSubject<ChatMessage[]>([]);
  public room = this.chatRoom.asObservable();

  private chatScrollDown = new BehaviorSubject<[string, boolean]>(["", false]);
  public reDown = this.chatScrollDown.asObservable();

  private newMessagesCount = new BehaviorSubject<[string, number][]>([]);
  public newMsgs = this.newMessagesCount.asObservable();

  constructor() { }

  public addNewGroup(groupName:string, msgs:ChatMessage[]){
    if(this.groupExists(groupName)) return;
    
    this.allRooms.push({
      "groupName": groupName,
      "logMessages": {
        "messages": msgs,
        "newMessages": 0
      }
    });

    let newMsgs_aux = this.newMessagesCount.value;
    newMsgs_aux.push([groupName, 0]);
    this.newMessagesCount.next(newMsgs_aux);
  }

  public removeGroup(groupName:string){
    if(!this.groupExists(groupName)) return;
    
    let delI = -1; //Remove from allRooms array
    this.allRooms.forEach((r, index) => delI = r.groupName == groupName ? index : delI);
    if(delI!=-1) this.allRooms.splice(delI, 1);

    delI = -1; //Remove from newMessagesCount array
    this.newMessagesCount.value.forEach((nmc, index)=>delI = nmc[0] == groupName ? index : delI);
    if(delI!=-1) this.newMessagesCount.value.splice(delI, 1);
  }

  public addMessage(groupName:string, msg:ChatMessage){
    if(!this.groupExists(groupName)) return;
    
    this.allRooms.forEach(r=>{
      if(r.groupName == groupName){
        let lastMsg = r.logMessages.messages[r.logMessages.messages.length-1];
        if(r.logMessages.messages.length == 0 || (lastMsg.username!="" || msg.username!="" || lastMsg.message != msg.message)){
          r.logMessages.messages.push(msg);
          r.logMessages.newMessages++;
        }
      }
    });

    if(msg.username != ""){
      let newMsgs_aux = this.newMessagesCount.value;
      newMsgs_aux.forEach(nmc=>{
        if(nmc[0] == groupName) nmc[1] = nmc[1] +1;
      });
      this.newMessagesCount.next(newMsgs_aux);      
    }

    this.sendReDown(groupName);
  }

  public readMessagesGroup(groupName:string){
    if(!this.groupExists(groupName)) return;
    this.allRooms.forEach(r=>{
      if(r.groupName == groupName) r.logMessages.newMessages = 0;
    });
    let newMsgs_aux = this.newMessagesCount.value;
    newMsgs_aux.forEach(nmc=>{
      if(nmc[0] == groupName) nmc[1] = 0;
    });
    this.newMessagesCount.next(newMsgs_aux);   
  }

  public setGroupMessages(groupName:string){
    if(!this.groupExists(groupName)) return;
    
    this.allRooms.forEach(room=>{
      if(room.groupName == groupName){
        this.chatRoom.next(room.logMessages.messages);
      }
    });
  }

  public groupExists(groupName){
    return this.allRooms.some(r => r.groupName == groupName);
  }

  public downThemAll(){
    this.allRooms.forEach(room=> this.sendReDown(room.groupName));
  }

  private sendReDown(groupName:string){
    this.chatScrollDown.next([groupName, true]);
    setTimeout(_=> this.chatScrollDown.next([groupName, false]), 30);
  }  
}
