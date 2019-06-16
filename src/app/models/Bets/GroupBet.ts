import { NameWinRate } from './NameWinRate';

export interface GroupBet{
    bet:string;
    competition:string;
    betName:string;
    typeBet:NameWinRate;
    typePay:NameWinRate;
    minBet:number;
    maxBet:number;
    matchdayDate:Date;
    lastBetTime:Date;
    usersJoined?:number;
    firstHalfHomeGoals?:number;
    firstHalfAwayGoals?:number;
    secondHalfHomeGoals?:number;
    secondHalfAwayGoals?:number;
    fullTimeHomeGoals?:number;
    fullTimeAwayGoals?:number;
}