import { FootballMatch } from './FootballMatch';

export interface AvailableBet{
    competition:string;
    matches:FootballMatch[];
}