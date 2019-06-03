import { GroupUserJoinedAt } from '../GroupManage/GroupUserJoinedAt';

export interface Session{
    role:string;
    username:string;
    groups:GroupUserJoinedAt[];
}