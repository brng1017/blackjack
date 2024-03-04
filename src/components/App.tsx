import React, { useState } from 'react';
import { StartScreen, GameScreen } from '../components/';

const App = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [bet, setBet] = useState<number>(0);
  const [cash, setCash] = useState<number>(500);

  const startGame = () => {
    setCash((currCash) => currCash - bet);
    setGameStarted(true);
  };

  return (
    <div className='App h-screen'>
      <div className=' absolute top-4 right-4'>
        <p>Cash: ${cash}</p>
        <p>Bet: ${bet}</p>
      </div>
      {!gameStarted ? (
        <StartScreen
          onStart={startGame}
          bet={bet}
          setBet={setBet}
          cash={cash}
        />
      ) : (
        <GameScreen
          bet={bet}
          setBet={setBet}
          cash={cash}
          setCash={setCash}
          setGameStarted={setGameStarted}
        />
      )}
    </div>
  );
};

export default App;
