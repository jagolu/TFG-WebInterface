import { Group } from '../GroupManage/Group';

export interface Session{
    role:string;
    groups:Group[];
}