import { Card } from '../utils';

function calculateScore(hand: Card[]): number {
  let score: number = hand.reduce(
    (sum: number, card: Card) => sum + card.value,
    0
  );

  hand.forEach((card: Card) => {
    if (card.rank === 'A' && score > 21) {
      score -= 10;
    }
  });

  return score;
}

export default calculateScore;
