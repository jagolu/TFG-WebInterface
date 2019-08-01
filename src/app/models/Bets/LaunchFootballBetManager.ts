import { NameWinRate } from './NameWinRate';
import { AvailableBet } from './AvailableBet';

export interface LaunchFootballBetManager{
    typeBets:NameWinRate[];
    typePays:NameWinRate[];
    competitionMatches:AvailableBet[];
}