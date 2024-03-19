import { TennisGame } from './TennisGame';

export class TennisGame2 implements TennisGame {
  p1point: number = 0;
  p2point: number = 0;

  p1res: string = '';
  p2res: string = '';

  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  getScore(): string {
    let score: string = '';
    if (this.p1point === this.p2point && this.p1point < 4) {
      if (this.p1point === 0) score = 'Love';
      if (this.p1point === 1) score = 'Fifteen';
      if (this.p1point === 2) score = 'Thirty';
      score += '-All';
    }
    if (this.p1point === this.p2point && this.p1point >= 3) score = 'Deuce';

    if (this.p1point > 0 && this.p2point === 0) {
      if (this.p1point === 1) this.p1res = 'Fifteen';
      if (this.p1point === 2) this.p1res = 'Thirty';
      if (this.p1point === 3) this.p1res = 'Forty';

      this.p2res = 'Love';
      score = this.p1res + '-' + this.p2res;
    }
    if (this.p2point > 0 && this.p1point === 0) {
      if (this.p2point === 1) this.p2res = 'Fifteen';
      if (this.p2point === 2) this.p2res = 'Thirty';
      if (this.p2point === 3) this.p2res = 'Forty';

      this.p1res = 'Love';
      score = this.p1res + '-' + this.p2res;
    }

    if (this.p1point > this.p2point && this.p1point < 4) {
      if (this.p1point === 2) this.p1res = 'Thirty';
      if (this.p1point === 3) this.p1res = 'Forty';
      if (this.p2point === 1) this.p2res = 'Fifteen';
      if (this.p2point === 2) this.p2res = 'Thirty';
      score = this.p1res + '-' + this.p2res;
    }
    if (this.p2point > this.p1point && this.p2point < 4) {
      if (this.p2point === 2) this.p2res = 'Thirty';
      if (this.p2point === 3) this.p2res = 'Forty';
      if (this.p1point === 1) this.p1res = 'Fifteen';
      if (this.p1point === 2) this.p1res = 'Thirty';
      score = this.p1res + '-' + this.p2res;
    }

    if (this.p1point > this.p2point && this.p2point >= 3) {
      score = 'Advantage player1';
    }

    if (this.p2point > this.p1point && this.p1point >= 3) {
      score = 'Advantage player2';
    }

    if (
      this.p1point >= 4 &&
      this.p2point >= 0 &&
      this.p1point - this.p2point >= 2
    ) {
      score = 'Win for player1';
    }
    if (
      this.p2point >= 4 &&
      this.p1point >= 0 &&
      this.p2point - this.p1point >= 2
    ) {
      score = 'Win for player2';
    }
    return score;
  }

  SetP1Score(score: number): void {
    for (let i = 0; i < score; i++) {
      this.P1Score();
    }
  }

  SetP2Score(score: number): void {
    for (let i = 0; i < score; i++) {
      this.P2Score();
    }
  }

  P1Score(): void {
    this.p1point++;
  }

  P2Score(): void {
    this.p2point++;
  }

  wonPoint(player: string): void {
    if (player === 'player1') this.P1Score();
    else this.P2Score();
  }
}
