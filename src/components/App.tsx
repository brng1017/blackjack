import React, { useState } from 'react';
import { StartScreen, GameScreen } from '../components/';

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className='App'>
      {!gameStarted ? <StartScreen onStart={startGame} /> : <GameScreen />}
    </div>
  );
};

export default App;
