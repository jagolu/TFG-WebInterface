import { GroupBet } from './GroupBet';
import { HistoryUserFootballBet, OtherUserBets } from '../models';

export interface EndedFootballBet{
    bet:GroupBet;
    users:OtherUserBets[];
    ownBet:HistoryUserFootballBet[];
    userWins?:boolean;
}