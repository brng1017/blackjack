import { Game, handlePlayerHit } from '../utils';

/**
 * Handles the "stand" action for the player in a blackjack game, signifying the player's decision to end their turn.
 *
 * After the player stands, the dealer will automatically take hits until the dealer's score reaches 17 or higher.
 * The function uses `handlePlayerHit` to add cards to the dealer's hand until the dealer's score is at least 17.
 * It ensures the game rules are followed, specifically the rule that requires the dealer to hit until their score is 17 or more.
 *
 * @param {Game} game - The current game state, including the deck, player hands, and scores.
 * @returns {Game} The updated game state after processing the dealer's hits post-player stand. This includes any changes to the dealer's hand and the deck as the dealer takes additional cards to meet or exceed a score of 17.
 */
function handlePlayerStand(game: Game): Game {
  let newGame: Game = { ...game };
  let newScore: number = game.dealer.score;

  while (newScore < 17) {
    newGame = handlePlayerHit(newGame, 'dealer');
    newScore = newGame.dealer.score;
  }

  return newGame;
}

export default handlePlayerStand;
