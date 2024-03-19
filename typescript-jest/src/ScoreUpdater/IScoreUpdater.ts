import { Player } from '../Player/Player';

export interface IScoreUpdater {
  updateScore(player: Player): void;
}
