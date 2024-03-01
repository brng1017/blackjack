import { Game, Card, calculateScore } from '../utils';

function handlePlayerStand(game: Game): Game {
  const newDeck: Card[] = [...game.deck];
  const newHand: Card[] = [...game.dealer.hand];
  let newScore: number = game.dealer.score;

  while (newScore < 17) {
    newHand.push(newDeck.pop() as Card);
    newScore = calculateScore(newHand);
  }

  return {
    ...game,
    deck: newDeck,
    dealer: {
      hand: newHand,
      score: newScore,
    },
  };
}

export default handlePlayerStand;
