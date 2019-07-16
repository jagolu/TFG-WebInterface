import { GroupBet } from './GroupBet';

export interface BetsManager{
    betId:string;
    bet:GroupBet;
    dateLaunch:Date;
    dateEnd:Date;
    ended:boolean;
    dateCancelled?:Date;
    cancelled:boolean;
}