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
  normalRepresentation = new NormalRepresentation();
  drawRepresentationo = new DrawRepresentation();
  endRepresentation = new EndRepresentation();

  getScore(game: TennisGame): string {
    const player1Score = game.player1.getScore();
    const player2Score = game.player2.getScore();

    if (player1Score == player2Score) {
      return this.drawRepresentationo.getScore(game);
    } else if (Math.max(player1Score, player2Score) > 4) {
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
    let score: string = '';
    let tempScore: number = 0;
    if (this.player1.getScore() === this.player2.getScore()) {
      switch (this.player1.getScore()) {
        case 0:
          score = 'Love-All';
          break;
        case 1:
          score = 'Fifteen-All';
          break;
        case 2:
          score = 'Thirty-All';
          break;
        default:
          score = 'Deuce';
          break;
      }
    } else if (this.player1.getScore() >= 4 || this.player2.getScore() >= 4) {
      const minusResult: number =
        this.player1.getScore() - this.player2.getScore();
      if (minusResult === 1) score = 'Advantage player1';
      else if (minusResult === -1) score = 'Advantage player2';
      else if (minusResult >= 2) score = 'Win for player1';
      else score = 'Win for player2';
    } else {
      for (let i = 1; i < 3; i++) {
        if (i === 1) tempScore = this.player1.getScore();
        else {
          score += '-';
          tempScore = this.player2.getScore();
        }
        switch (tempScore) {
          case 0:
            score += 'Love';
            break;
          case 1:
            score += 'Fifteen';
            break;
          case 2:
            score += 'Thirty';
            break;
          case 3:
            score += 'Forty';
            break;
        }
      }
    }
    return score;
  }
}
