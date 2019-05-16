import { Group } from '../GroupManage/Group';

export interface Session{
    role:string;
    username:string;
    groups:Group[];
}