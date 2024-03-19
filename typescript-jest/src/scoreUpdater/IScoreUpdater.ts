import { Player } from '../player/Player';

export interface IScoreUpdater {
  updateScore(player: Player): void;
}
