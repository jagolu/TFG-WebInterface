import { ChatMessage } from './ChatMessage';

export interface LogChatMessages{
    groupName:string;
    messages:ChatMessage[];
    newMessages:number;
}