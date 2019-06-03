import { GroupBet } from './GroupBet';
import { GroupUser } from './GroupUser';

export interface GroupPage{
    name:string;
    type:boolean;
    role:string;
    dateJoin:string;
    dateRole:string;
    canPutPassword : boolean;
    hasPassword : boolean;
    maxCapacity : number;
    actualCapacity: number;
    createDate:string;
    bets:GroupBet[];
    members:GroupUser[];
}