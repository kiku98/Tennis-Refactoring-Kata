import { Player } from '../Player/Player';

export class ScoreUpdater {
  updateScore(player: Player): void {
    player.setScore(player.getScore() + 1);
  }
}
