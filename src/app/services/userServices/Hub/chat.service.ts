import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LogChatRoom, ChatMessage, LogChatter } from 'src/app/models/models';
import { hubConnection } from './hubConnection';
import { newLogChatRoom } from 'src/app/models/Chat/LogChatRoom';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends hubConnection{
  private publicUserId:string = "";
  private loading:string[] = [];
  private allRooms : LogChatRoom[] =[];

  private chatRoom = new BehaviorSubject<ChatMessage[]>([]);
  public room = this.chatRoom.asObservable();

  private chatScrollDown = new BehaviorSubject<[string, boolean]>(["", false]);
  public reDown = this.chatScrollDown.asObservable();

  private newMessagesCount = new BehaviorSubject<[string, number][]>([]);
  public newMsgs = this.newMessagesCount.asObservable();

  constructor() { 
      super("chatter", "BroadcastChartData");
  }

  public addNewGroup(groupName:string, log:LogChatter, addThis:boolean){
    if(this.groupExists(groupName)) return;
    this.publicUserId = log.callerPublicId;
    this.subscribeHub(groupName);
    this.allRooms.push(newLogChatRoom(groupName, log.messages));
    if(addThis) this.setGroupMessages(groupName);
    this.newMessagesCount.value.push([groupName, 0]);
    this.newMessagesCount.next(this.newMessagesCount.value)
  }

  private removeGroup(groupName:string){
    if(!this.groupExists(groupName)) return;
    
    let delI = -1; //Remove from allRooms array
    this.allRooms.forEach((r, index) => delI = r.groupName == groupName ? index : delI);
    if(delI!=-1) this.allRooms.splice(delI, 1);

    delI = -1; //Remove from newMessagesCount array
    this.newMessagesCount.value.forEach((nmc, index)=>delI = nmc[0] == groupName ? index : delI);
    if(delI!=-1) this.newMessagesCount.value.splice(delI, 1);
    this.newMessagesCount.next(this.newMessagesCount.value);
  }

  private addMessage(groupName:string, msg:ChatMessage){
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

    if(msg.username != "") this.changeCount(groupName, false); 

    this.stopLoading(groupName);
    this.sendReDown(groupName);
  }

  public readMessagesGroup(groupName:string){
    if(!this.groupExists(groupName)) return;
    this.allRooms.forEach(r=>{
      if(r.groupName == groupName) r.logMessages.newMessages = 0;
    });
    this.changeCount(groupName, true);
  }
 

  //
  // ──────────────────────────────────────────────────────────────────────  ──────────
  //   :::::: V A L I D   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────
  //
  

  public setGroupMessages(groupName:string){
    this.allRooms.forEach(room=>{
      if(room.groupName == groupName){
        this.chatRoom.next(room.logMessages.messages);
      }
    });
  }

  private groupExists(groupName){
    return this.allRooms.some(r => r.groupName == groupName);
  }
  
  public downThemAll(){
    this.allRooms.forEach(room=> this.sendReDown(room.groupName));
  }

  private sendReDown(groupName:string){
    this.chatScrollDown.next([groupName, true]);
    setTimeout(_=> this.chatScrollDown.next([groupName, false]), 30);
  } 



  //
  // ──────────────────────────────────────────────────────────────────  ──────────
  //   :::::: N E W   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────
  //

  private changeCount(groupName:string, reset:boolean){
    this.newMessagesCount.value.forEach(nmc=>{
      if(nmc[0] == groupName) nmc[1] = reset ? 0 : nmc[1] +1;
    });
    this.newMessagesCount.next(this.newMessagesCount.value);    
  }

  public exitChat(groupName:string){
    this.removeGroup(groupName);
    this.setConnectionOff(groupName);
  }

  public sendMessage(message:ChatMessage){
    message.publicUserId = this.publicUserId;
    this.sendMessageToSocket(message);
  }

  public alreadyLogged(groupName:string){
    return this.groupExists(groupName) || this.isLoading(groupName);
  }

  public startLoading(groupName:string){
    this.loading.push(groupName);
  }

  private stopLoading(groupName:string){
    this.loading.splice(this.loading.indexOf(groupName), 1);
  }

  private isLoading(groupName:string){
    this.loading.some(l => l == groupName);
  }

  public getPublicUserId(){
    return this.publicUserId;
  }

  public subscribeHub(event:string){
    this.getConnection().on(event, (message:any)=> this.addMessage(event, message));
  }

  public reset(){
    this.publicUserId = "";
    this.loading = [];
    this.allRooms = [];
    this.chatRoom.next([]);
    this.chatScrollDown.next(["", false]);
    this.newMessagesCount.next([]);
  }
}
