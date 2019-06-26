import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LogChatRoom, ChatMessage } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class ChatMessagesService {
  public allRooms : LogChatRoom[] =[];

  private chatRoom = new BehaviorSubject<ChatMessage[]>([]);
  public room = this.chatRoom.asObservable();

  private chatScrollDown = new BehaviorSubject<[string, boolean]>(["", false]);
  public reDown = this.chatScrollDown.asObservable();

  private validConnection = new BehaviorSubject<boolean>(true);
  public connection = this.validConnection.asObservable();

  constructor() { }

  public addNewGroup(groupName:string, msgs:ChatMessage[]){
    if(this.groupExists(groupName)){
      this.setConnection(false);
      return;
    }
    
    this.allRooms.push({
      "groupName": groupName,
      "logMessages": {
        "messages": msgs,
        "newMessages": 0
      }
    });
  }

  public addMessage(groupName:string, msg:ChatMessage){
    if(!this.groupExists(groupName)){
      this.setConnection(false);
      return;
    }
    this.allRooms.forEach(r=>{
      if(r.groupName == groupName){
        r.logMessages.messages.push(msg);
        r.logMessages.newMessages++;
      }
    });
    this.sendReDown(groupName);
  }

  public setGroupMessages(groupName:string){
    if(!this.groupExists(groupName)){
      this.setConnection(false);
      return;
    }
    this.allRooms.forEach(room=>{
      if(room.groupName == groupName){
        this.chatRoom.next(room.logMessages.messages);
      }
    });
  }

  public setConnection(value:boolean){
    return this.validConnection.next(value);
  }

  public groupExists(groupName){
    let exists = false;
    this.allRooms.forEach(r=> exists = r.groupName == groupName && !exists ? true : exists);

    return exists;
  }

  public downThemAll(){
    this.allRooms.forEach(room=> this.sendReDown(room.groupName));
  }

  private sendReDown(groupName:string){
    this.chatScrollDown.next([groupName, true]);
    setTimeout(_=> this.chatScrollDown.next([groupName, false]), 30);
  }  
}
