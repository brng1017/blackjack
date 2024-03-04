import { Player } from '../utils';

/**
 * Checks if a player has a "natural" in blackjack, which occurs if the player's initial two cards total to 21.
 *
 * A natural is a two-card hand that totals 21, typically an Ace paired with a 10 or a face card (Jack, Queen, King),
 * which is the best possible hand in blackjack. This function evaluates the player's hand and score to determine
 * if they have achieved a natural.
 *
 * @param {Player} player - The player whose hand is being checked for a natural. The `Player` object includes the hand (array of cards) and the current score.
 * @returns {boolean} Returns `true` if the player has a natural, otherwise `false`.
 */
function isNatural(player: Player): boolean {
  if (player.hand.length === 2 && player.score === 21) {
    return true;
  }
  return false;
}

export default isNatural;
