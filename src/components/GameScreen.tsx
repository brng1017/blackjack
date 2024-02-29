import React, { useState, useEffect } from 'react';
import { createDeck } from '../utils';
import { Card } from '../utils';

const GameScreen = () => {
  const [deck, setDeck] = useState<Card[]>([]);

  useEffect(() => {
    const newDeck = createDeck();
    setDeck(newDeck);
  }, []);

  return (
    <div>
      <h1>Game On!</h1>
      <p>{JSON.stringify(deck)}</p>
    </div>
  );
};

export default GameScreen;
