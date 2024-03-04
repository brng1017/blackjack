import { Card } from '../utils';

/**
 * Calculates the total score of a given hand.
 *
 * This function sums up the value of each card in the hand array. If the hand contains an Ace (`rank` of 'A')
 * and the total score exceeds 21, the function treats the Ace as having a value of 1 instead of 11 to prevent busting,
 * reducing the score by 10 for each Ace until the score is 21 or less.
 *
 * @param {Card[]} hand - An array of Card objects representing the hand to calculate the score for.
 * @returns {number} The total score of the hand.
 */
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
