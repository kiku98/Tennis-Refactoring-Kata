import { Player } from './Player';

export class ScoreUpdater {
  updateScore(player: Player): void {
    player.setScore(player.getScore() + 1);
  }
}
