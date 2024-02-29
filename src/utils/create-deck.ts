import { Card, Player, Game } from '../utils';

function createDeck() {
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

  const deck: Card[] = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      const card: Card = {
        suit: suit,
        rank: rank,
        value: isNaN(rank as any) ? 10 : rank === 'A' ? 11 : parseInt(rank),
      };

      deck.push(card);
    }
  }

  // shuffle deck using Fisher-Yates shuffle
  let curr: number = deck.length,
    randomIndex: number;

  while (curr > 0) {
    randomIndex = Math.floor(Math.random() * curr);
    curr--;

    [deck[curr], deck[randomIndex]] = [deck[randomIndex], deck[curr]];
  }

  return deck;
}

export default createDeck;
