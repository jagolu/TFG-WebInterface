import { NameWinRate } from './NameWinRate';

export interface FootballMatch{
    competition:string;
    match_name:string;
    date:string;
    matchday:string;
    allowedTypeBets:NameWinRate[];
}