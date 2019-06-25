import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { ChatModel } from 'src/app/models/models';
import { URL } from 'src/environments/secret';
import { RestService } from './rest.service';
import { LoadingService } from '../visualServices/loading.service';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../userServices/session.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends RestService{

  public data: ChatModel[];
  public hubConnection: signalR.HubConnection;

  private urlConnection:string = URL.baseURL+"chatter";
  private __chatPath:string = "Alive/";
  private validConnection:boolean = false;
  private username:string = "";

  constructor(http: HttpClient, loading: LoadingService, private sessionS:SessionService) {
    super(http, loading);
    this.startConnection();
    this.sessionS.User.subscribe(u => {
      try{ 
        this.username = u.username;
      }
      catch(Exception){ 
        this.username = "";
      }
    });
  }

  
  private startConnection () {
    this.hubConnection = new signalR.HubConnectionBuilder()
                        .withUrl(this.urlConnection)
                        .build();

    this.hubConnection
          .start()
          .then( _=> this.validConnection = true)
          .catch(_=>this.validConnection = false);
  }

  public isValid(){
    return this.validConnection;
  }

  public logChat(groupName:string){
    this.getRequest(this.__chatPath+"ChatLogin",
    [{
        param: "groupName",
        value: groupName
    }]).subscribe();
  }

  public getConnection(){
    return this.hubConnection;
  }

  public addTransferChartDataListener (groupName:string){
    this.hubConnection.on(groupName, (data)=>{
      this.data = data;
      console.log("------------------------------------------------------",data);
    });
  }

  public broadcastChartData (message:ChatModel) {
    message.user = this.username;
    this.hubConnection.invoke("BroadcastChartData", message)
    .catch( err=> {this.validConnection = false; console.log(err)});
  }
}
