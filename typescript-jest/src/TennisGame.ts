import { ITennisGame } from './ITennisGame';
import { Player } from './Player/Player';
import { IRepresentation } from './Representation/IRepresentation';
import { GameRepresentation } from './Representation/Representations';
import { IScoreUpdater } from './ScoreUpdater/IScoreUpdater';
import { ScoreUpdater } from './ScoreUpdater/ScoreUpdater';

export class TennisGame implements ITennisGame {
  player1: Player;
  player2: Player;

  gameRepresentation: IRepresentation = new GameRepresentation();
  scoreUpdater: IScoreUpdater = new ScoreUpdater();

  constructor(player1Name: string, player2Name: string) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1.getName())
      this.scoreUpdater.updateScore(this.player1);
    else this.scoreUpdater.updateScore(this.player2);
  }

  getScore(): string {
    return this.gameRepresentation.getScore(this);
  }
}
