export interface DMTitles{
    id:string;
    receiver:string;
    emailReceiver?:string;
    openDate:Date;
    closed:Boolean;
    unreadMessages:number;
    title:string;
}