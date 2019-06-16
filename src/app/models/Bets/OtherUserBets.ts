import { HistoryUserFootballBet } from './HistoryUserFootballBet';

export interface OtherUserBets{
    username:string;
    winner:boolean;
    bets:HistoryUserFootballBet[];
}