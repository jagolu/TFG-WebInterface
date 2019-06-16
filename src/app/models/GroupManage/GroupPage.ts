import { GroupBet } from '../Bets/GroupBet';
import { GroupUser } from './GroupUser';
import { EndedFootballBet } from '../models';
import { BetsManager } from '../Bets/BetsManager';

export interface GroupPage{
    name:string;
    type:boolean;
    dateJoin:string;
    dateRole:string;
    canPutPassword : boolean;
    hasPassword : boolean;
    maxCapacity : number;
    actualCapacity: number;
    createDate:string;
    bets:GroupBet[];
    manageBets:BetsManager[];
    myBets:EndedFootballBet[];
    betsHistory:EndedFootballBet[];
    members:GroupUser[];
}