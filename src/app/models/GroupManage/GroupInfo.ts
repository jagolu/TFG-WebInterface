import { GroupMemberAdmin } from './GroupMemberAdmin';

export interface GroupInfo{
    name:string;
    password:boolean;
    placesOcupped:number;
    totalPlaces:number;
    dateCreate:Date;
    members?:GroupMemberAdmin[];
}