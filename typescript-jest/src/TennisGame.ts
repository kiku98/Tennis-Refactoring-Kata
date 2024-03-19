import { Player } from './Player';
import { ITennisGame } from './TennisGameInterface';

export interface ScoreRepresentation {
  isApplicable(tennisGame: TennisGame): boolean;
  getScore(tennisGame: TennisGame): string;
}

export class NormalRepresentation implements ScoreRepresentation {
  isApplicable(tennisGame: TennisGame): boolean {
    throw new Error('Method not implemented.');
  }
  getScore(tennisGame: TennisGame): string {
    throw new Error('Method not implemented.');
  }
}

export class DrawRepresentation implements ScoreRepresentation {
  isApplicable(tennisGame: TennisGame): boolean {
    throw new Error('Method not implemented.');
  }
  getScore(tennisGame: TennisGame): string {
    throw new Error('Method not implemented.');
  }
}

export class EndRepresentation implements ScoreRepresentation {
  isApplicable(tennisGame: TennisGame): boolean {
    throw new Error('Method not implemented.');
  }
  getScore(tennisGame: TennisGame): string {
    throw new Error('Method not implemented.');
  }
}

export class RepresentationHandler {
  representations: ScoreRepresentation[] = [];

  constructor() {
    this.representations.push(new NormalRepresentation());
    this.representations.push(new DrawRepresentation());
    this.representations.push(new EndRepresentation());
  }

  getRepresentation(game: TennisGame): ScoreRepresentation {
    for (const rep of this.representations) {
      if (rep.isApplicable(game)) {
        return rep;
      }
    }
    return this.representations[0];
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
