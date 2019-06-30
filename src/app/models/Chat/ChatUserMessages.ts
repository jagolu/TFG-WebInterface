export interface ChatUserMessages{
    username:string;
    publicUserId:string;
    role:string;
    messages:SingleUserChatMessage[];
}

export interface SingleUserChatMessage{
    message:string;
    time:Date;
}