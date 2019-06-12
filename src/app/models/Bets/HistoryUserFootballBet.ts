export interface HistoryUserFootballBet{
    userFootballBet:string;
    username:string;
    bet?:number;
    homeGoals?:number;
    awayGoals?:number;
    winner?:number;
    dateDone?:Date;
    valid:boolean;
    dateInvalid?:Date;
    earnings?:number;
}