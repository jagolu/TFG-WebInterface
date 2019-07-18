import { NotificationMessage } from './NotificationMessage';

export interface LoginNotification{
    publicUserid:string;
    messages:NotificationMessage[];
}