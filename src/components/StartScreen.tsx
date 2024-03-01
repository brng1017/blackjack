import React, { FC } from 'react';

interface StartScreenProps {
  onStart: () => void;
  bet: number;
  setBet: React.Dispatch<React.SetStateAction<number>>;
  cash: number;
}

const StartScreen: FC<StartScreenProps> = ({ onStart, bet, setBet, cash }) => {
  return (
    <div>
      <h1>Welcome to Blackjack!</h1>

      <p>Bet</p>
      <button onClick={() => setBet((curr) => curr - 5)} disabled={bet === 0}>
        -
      </button>
      <button
        onClick={() => setBet((curr) => curr + 5)}
        disabled={bet === cash}
      >
        +
      </button>

      <button onClick={onStart} disabled={bet <= 0}>
        Play
      </button>
    </div>
  );
};

export default StartScreen;
