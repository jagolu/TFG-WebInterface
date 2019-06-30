import { ChatMessage } from './ChatMessage';

export interface LogChatter{
    callerPublicId:string;
    messages:ChatMessage[];
}