export interface DMTitle{
    id:string;
    receiver:string;
    emailReceiver?:string;
    lastUpdate:Date;
    closed:Boolean;
    unreadMessages:number;
    title:string;
}