import { Player } from './Player';

export interface IScoreUpdater {
  updateScore(player: Player): void;
}
