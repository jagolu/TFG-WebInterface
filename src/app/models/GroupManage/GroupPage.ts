import { GroupBet } from './GroupBet';
import { GroupUser } from './GroupUser';

export interface GroupPage{
    name:string;
    type:boolean;
    role:string;
    bets:GroupBet[];
    members:GroupUser[];
}