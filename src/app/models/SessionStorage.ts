import { groups } from './UserInfoGroups';

export interface SessionStorage{
    api_token:string;
    role:string;
    groups:groups[]
}