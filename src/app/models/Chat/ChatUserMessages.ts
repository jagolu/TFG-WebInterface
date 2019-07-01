import { SingleUserChatMessage, ChatMessage, newSingleUserChatMessage } from '../models';

export interface ChatUserMessages{
    username:string;
    publicUserId:string;
    role:string;
    messages:SingleUserChatMessage[];
}

/**
 * Creates a ChatUserMessage object by a ChatMessage object
 * 
 * @param {ChatMessage} message The message to get the data
 * @returns {ChatUserMessages} 
 */
export function newChatUserMessages(message:ChatMessage):ChatUserMessages{
    return {
        publicUserId:message.publicUserId,
        role: message.role,
        username: message.username,
        messages:[{
            message: message.message,
            time: message.time
        }]
    }
}