import { Group } from '../GroupManage/Group';

export interface SessionStorage{
    api_token:string;
    role:string;
    username:string;
    expires_at?:number;
    groups:Group[]
}