import { GroupBet } from './GroupBet';

export interface BetsManager{
    bet:GroupBet;
    dateLaunch:Date;
    ended:boolean;
    dateCancelled?:Date;
    cancelled:boolean;
}