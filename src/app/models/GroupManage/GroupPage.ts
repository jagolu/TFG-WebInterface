import { GroupBet } from './GroupBet';
import { GroupUser } from './GroupUser';

export interface GroupPage{
    name:string;
    type:boolean;
    role:string;
    canPutPassword : boolean;
    hasPassword : boolean;
    maxCapacity : number;
    actualCapacity: number;
    bets:GroupBet[];
    members:GroupUser[];
}