import { ChatMessage } from './ChatMessage';

export interface LogChatRoom{
    groupName:string;
    messages:ChatMessage[];
}