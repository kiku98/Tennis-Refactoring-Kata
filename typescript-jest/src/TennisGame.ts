import { ITennisGame } from './ITennisGame';
import { Player } from './Player';
import { GameRepresentation } from './Representations';

export class TennisGame implements ITennisGame {
  player1: Player;
  player2: Player;

  constructor(player1Name: string, player2Name: string) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1.getName()) this.player1.incrementScore();
    else this.player2.incrementScore();
  }

  getScore(): string {
    const gameRepresentation = new GameRepresentation();
    return gameRepresentation.getScore(this);
  }
}
