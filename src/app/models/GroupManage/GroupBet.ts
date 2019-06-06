import { NameWinRate } from '../Bets/NameWinRate';

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
}