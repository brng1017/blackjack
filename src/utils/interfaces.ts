export interface Card {
  suit: string;
  rank: string;
  value: number;
}

export interface Player {
  hand: Card[];
  score: number;
}

export interface Game {
  deck: Card[];
  player: Player;
  dealer: Player;
}

export type decidedWinner = 'Player' | 'Dealer' | 'Natural' | 'Draw' | '';

export interface Winner {
  winner: decidedWinner;
  message: string;
}
