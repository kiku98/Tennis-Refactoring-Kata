import { TennisGame } from './TennisGame';

export class TennisGame1 implements TennisGame {
  private mScore1: number = 0;
  private mScore2: number = 0;
  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  wonPoint(playerName: string): void {
    if (playerName === 'player1') this.mScore1 += 1;
    else this.mScore2 += 1;
  }

  getScore(): string {
    let score: string = '';
    let tempScore: number = 0;
    if (this.mScore1 === this.mScore2) {
      switch (this.mScore1) {
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
    } else if (this.mScore1 >= 4 || this.mScore2 >= 4) {
      const minusResult: number = this.mScore1 - this.mScore2;
      if (minusResult === 1) score = 'Advantage player1';
      else if (minusResult === -1) score = 'Advantage player2';
      else if (minusResult >= 2) score = 'Win for player1';
      else score = 'Win for player2';
    } else {
      for (let i = 1; i < 3; i++) {
        if (i === 1) tempScore = this.mScore1;
        else {
          score += '-';
          tempScore = this.mScore2;
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
