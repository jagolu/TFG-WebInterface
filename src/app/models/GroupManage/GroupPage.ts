import { GroupBet } from '../Bets/GroupBet';
import { GroupUser } from './GroupUser';
import { EndedFootballBet } from '../models';
import { BetsManager } from '../Bets/BetsManager';
import { NewMessage } from '../News/NewMessage';

export interface GroupPage{
    name:string;
    dateJoin:string;
    dateRole:string;
    hasPassword : boolean;
    maxCapacity : number;
    weeklyPay:number;
    actualCapacity: number;
    createDate:string;
    bets:GroupBet[];
    manageBets:BetsManager[];
    myBets:EndedFootballBet[];
    betsHistory:EndedFootballBet[];
    members:GroupUser[];
    news:NewMessage[];
}