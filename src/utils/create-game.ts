import { Card, Game, calculateScore } from '.';

function createGame(): Game {
  const suits = ['Spades', 'Clubs', 'Diamonds', 'Hearts'];
  const ranks = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
  ];

  const game: Game = {
    deck: [],
    player: {
      hand: [],
      score: 0,
    },
    dealer: {
      hand: [],
      score: 0,
    },
  };

  for (const suit of suits) {
    for (const rank of ranks) {
      const card: Card = {
        suit: suit,
        rank: rank,
        value: rank === 'A' ? 11 : isNaN(rank as any) ? 10 : parseInt(rank),
      };

      game.deck.push(card);
    }
  }

  // shuffle deck using Fisher-Yates shuffle
  let curr: number = game.deck.length,
    randomIndex: number;

  while (curr > 0) {
    randomIndex = Math.floor(Math.random() * curr);
    curr--;

    [game.deck[curr], game.deck[randomIndex]] = [
      game.deck[randomIndex],
      game.deck[curr],
    ];
  }

  // deal initial 2 cards
  game.player.hand.push(game.deck.pop() as Card);
  game.dealer.hand.push(game.deck.pop() as Card);
  game.player.hand.push(game.deck.pop() as Card);
  game.dealer.hand.push(game.deck.pop() as Card);

  game.player.score = calculateScore(game.player.hand);
  game.dealer.score = calculateScore(game.dealer.hand);

  return game;
}

export default createGame;
