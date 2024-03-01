import { Winner } from '../utils';

function checkWinner(playerScore: number, dealerScore: number): Winner {
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
