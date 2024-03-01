function checkWinner(playerScore: number, dealerScore: number): string {
  if (playerScore > 21) return 'You bust! Dealer wins.';
  if (dealerScore > 21) return 'Dealer busts! You win!';

  if (playerScore > dealerScore) return 'You win!';
  else if (playerScore < dealerScore) return 'Dealer wins.';
  else return 'Draw!';
}

export default checkWinner;
