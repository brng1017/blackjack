import { Card, Game, handlePlayerHit } from '.';

/**
 * Initializes and returns a new game object with a shuffled deck, and deals initial cards to both player and dealer.
 *
 * The function creates a standard deck of 52 playing cards, shuffles the deck using the Fisher-Yates shuffle algorithm,
 * and then deals 2 cards to both the player and the dealer by calling the `handlePlayerHit` function twice for each.
 *
 * @returns {Game} An object representing the initial state of a new game. This object includes the shuffled deck,
 * and the initial hands and scores for both the player and the dealer.
 */
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

  let game: Game = {
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

  // Shuffle deck using the Fisher-Yates shuffle algorithm
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

  // Deal initial 2 cards to both player and dealer
  game = handlePlayerHit(game, 'player');
  game = handlePlayerHit(game, 'dealer');
  game = handlePlayerHit(game, 'player');
  game = handlePlayerHit(game, 'dealer');

  return game;
}

export default createGame;
