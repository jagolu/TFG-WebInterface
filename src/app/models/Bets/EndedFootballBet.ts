import { GroupBet } from './GroupBet';
import { HistoryUserFootballBet } from '../models';

export interface EndedFootballBet{
    bet:GroupBet;
    users:HistoryUserFootballBet[];
    ownBet:HistoryUserFootballBet[];
}