import { GroupBet } from './GroupBet';
import { HistoryUserFootballBet } from '../models';

export interface EndedFootballBet{
    bet:GroupBet;
    usersJoined:number;
    ended:boolean;
    users:HistoryUserFootballBet[];
    ownBet:HistoryUserFootballBet[];
}