import { TennisGame } from './TennisGame';

export interface IRepresentation {
  getScore(game: TennisGame): string;
}
