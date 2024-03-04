import { Winner, Player, isNatural } from '../utils';

/**
 * Determines the winner of a round between a player and a dealer.
 *
 * The function evaluates the scores of both the player and the dealer, along with checking for a natural blackjack (an Ace with a 10, Jack, Queen, or King on the initial deal). The winner is determined based on the following rules:
 * - If the player has a natural blackjack and the dealer does not, the player wins with a 'Natural'.
 * - If the player's score exceeds 21, the player busts, and the dealer wins.
 * - If the dealer's score exceeds 21, the dealer busts, and the player wins.
 * - If neither busts, the higher score wins.
 * - If both have the same score, the result is a draw.
 *
 * @param {Player} player - The player's current game state, including their hand and score.
 * @param {Player} dealer - The dealer's current game state, including their hand and score.
 * @param {number} bet - The current bet amount.
 * @returns {Winner} An object containing the result of the game ('Natural', 'Player', 'Dealer', 'Draw') and a message describing the outcome.
 */
function checkWinner(player: Player, dealer: Player, bet: number): Winner {
  const playerScore = player.score,
    dealerScore = dealer.score;

  if (isNatural(player) && !isNatural(dealer))
    return { winner: 'Natural', message: `Blackjack! You win $${bet * 2.5}!` };

  if (playerScore > 21)
    return { winner: 'Dealer', message: 'You bust! Dealer wins.' };
  if (dealerScore > 21)
    return { winner: 'Player', message: `Dealer busts! You win $${bet * 2}!` };

  if (playerScore > dealerScore)
    return { winner: 'Player', message: `You win $${bet * 2}!` };
  else if (playerScore < dealerScore)
    return { winner: 'Dealer', message: 'Dealer wins.' };
  else return { winner: 'Draw', message: "It's a draw!" };
}

export default checkWinner;
