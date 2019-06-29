import { LogChatMessage } from './LogChatMessage';
import { ChatMessage } from './ChatMessage';

export interface LogChatRoom{
    groupName:string;
    logMessages:LogChatMessage;
}

export function newLogChatRoom(groupName:string, messages:ChatMessage[]):LogChatRoom{
    return{
        "groupName": groupName,
        "logMessages":{
            "messages":messages,
            "newMessages": 0
        }
    }
}
