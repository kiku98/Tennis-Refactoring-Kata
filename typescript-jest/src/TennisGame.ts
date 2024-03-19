import { Player } from './Player';
import { ITennisGame } from './TennisGameInterface';

export interface ScoreRepresentation {
  getScore(game: TennisGame): string;
}

export class NormalRepresentation implements ScoreRepresentation {
  getScore(game: TennisGame): string {
    const scoreNames = ['Love', 'Fifteen', 'Thirty', 'Forty'];
    return `${scoreNames[game.player1.getScore()]}-${scoreNames[game.player2.getScore()]}`;
  }
}

export class DrawRepresentation implements ScoreRepresentation {
  getScore(game: TennisGame): string {
    const scoreNames = ['Love', 'Fifteen', 'Thirty'];
    const scoreMap: { [key: number]: string } = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      0: `${scoreNames[0]}-All`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      1: `${scoreNames[1]}-All`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      2: `${scoreNames[2]}-All`,
    };
    return scoreMap[game.player1.getScore()] || 'Deuce';
  }
}

export class EndRepresentation implements ScoreRepresentation {
  getScore(game: TennisGame): string {
    const difference: number =
      game.player1.getScore() - game.player2.getScore();

    const leader: string =
      difference > 0 ? game.player1.getName() : game.player2.getName();

    if (Math.abs(difference) === 1) {
      return `Advantage ${leader}`;
    } else {
      return `Win for ${leader}`;
    }
  }
}

export class GameRepresentation implements ScoreRepresentation {
  private normalRepresentation = new NormalRepresentation();
  private drawRepresentationo = new DrawRepresentation();
  private endRepresentation = new EndRepresentation();

  getScore(game: TennisGame): string {
    const player1Score = game.player1.getScore();
    const player2Score = game.player2.getScore();

    if (player1Score == player2Score) {
      return this.drawRepresentationo.getScore(game);
    } else if (Math.max(player1Score, player2Score) >= 4) {
      return this.endRepresentation.getScore(game);
    } else {
      return this.normalRepresentation.getScore(game);
    }
  }
}

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
