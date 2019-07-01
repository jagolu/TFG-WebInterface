import { ChatMessage } from './ChatMessage';

export interface SingleUserChatMessage{
    message:string;
    time:Date;
}

/**
 * Creates a new SingleUserChatMessage from a ChatMessage
 * 
 * @param {ChatMessage} message The message to get the data
 * @returns {SingleUserChatMessage}
 */
export function newSingleUserChatMessage(message:ChatMessage):SingleUserChatMessage{
    return {
        message: message.message,
        time: message.time
    }
}