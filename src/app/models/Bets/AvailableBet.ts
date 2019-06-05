import { FootballMatch } from './FootballMatch';
import { NameWinRate } from './NameWinRate';

export interface AvailableBet{
    competition:string;
    matches:FootballMatch[];
    allowedTypePays:NameWinRate[];
}