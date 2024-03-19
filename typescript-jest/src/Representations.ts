import { IRepresentation } from './IRepresentation';
import { TennisGame } from './TennisGame';

export class NormalRepresentation implements IRepresentation {
  getScore(game: TennisGame): string {
    const scoreNames = ['Love', 'Fifteen', 'Thirty', 'Forty'];
    return `${scoreNames[game.player1.getScore()]}-${scoreNames[game.player2.getScore()]}`;
  }
}

export class DrawRepresentation implements IRepresentation {
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

export class EndRepresentation implements IRepresentation {
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

export class GameRepresentation implements IRepresentation {
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
