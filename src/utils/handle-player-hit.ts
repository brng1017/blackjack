import { Game, Card, calculateScore } from '../utils';

function handlePlayerHit(game: Game): Game {
  const newDeck: Card[] = [...game.deck];
  const newHand: Card[] = [...game.player.hand];
  let newScore: number = game.player.score;

  newHand.push(newDeck.pop() as Card);

  newScore = calculateScore(newHand);

  return {
    ...game,
    deck: newDeck,
    player: {
      hand: newHand,
      score: newScore,
    },
  };
}

export default handlePlayerHit;
