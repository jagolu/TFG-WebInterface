import { Group } from '../GroupManage/Group';

export interface SessionStorage{
    api_token:string;
    role:string;
    groups:Group[]
}