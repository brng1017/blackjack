import { Winner, Player, isNatural } from '../utils';

function checkWinner(player: Player, dealer: Player): Winner {
  const playerScore = player.score,
    dealerScore = dealer.score;

  if (isNatural(player) && !isNatural(dealer))
    return { winner: 'Natural', message: 'Blackjack!' };

  if (playerScore > 21)
    return { winner: 'Dealer', message: 'You bust! Dealer wins.' };
  if (dealerScore > 21)
    return { winner: 'Player', message: 'Dealer busts! You win!' };

  if (playerScore > dealerScore)
    return { winner: 'Player', message: 'You win!' };
  else if (playerScore < dealerScore)
    return { winner: 'Dealer', message: 'Dealer wins.' };
  else return { winner: 'Draw', message: "It's a draw!" };
}

export default checkWinner;
