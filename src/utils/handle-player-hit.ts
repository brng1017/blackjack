import { Game, Card, calculateScore } from '../utils';

/**
 * Processes a "hit" action for the current player or dealer in a blackjack game, adding a card to their hand and recalculating their score.
 *
 * This function takes the current game state and the identifier for the current player ('player' or 'dealer'). It then:
 * - Removes the top card from the deck and adds it to the current player's hand.
 * - Recalculates the score of the current player's hand using the `calculateScore` function.
 * - Returns the updated game state with the new hand and score for the current player, and the updated deck.
 *
 * @param {Game} game - The current game state, including the deck, player hands, and scores.
 * @param {'player' | 'dealer'} currPlayer - Identifier for the current player; either 'player' or 'dealer'.
 * @returns {Game} The updated game state after the current player has taken a hit.
 */
function handlePlayerHit(game: Game, currPlayer: 'player' | 'dealer'): Game {
  const newDeck: Card[] = [...game.deck];
  const newHand: Card[] = [...game[currPlayer].hand];
  let newScore: number = game[currPlayer].score;

  newHand.push(newDeck.pop() as Card);

  newScore = calculateScore(newHand);

  return {
    ...game,
    deck: newDeck,
    [currPlayer]: {
      hand: newHand,
      score: newScore,
    },
  };
}

export default handlePlayerHit;
