import { ChatUserMessages } from '../models';

export interface ChatRoomInfo{
    callerPublicId:string;
    group:string;
    userMessages:ChatUserMessages[];
}
