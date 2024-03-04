import React, { FC } from 'react';

interface StartScreenProps {
  onStart: () => void;
  bet: number;
  setBet: React.Dispatch<React.SetStateAction<number>>;
  cash: number;
}

const StartScreen: FC<StartScreenProps> = ({ onStart, bet, setBet, cash }) => {
  return (
    <div className=' w-full h-screen m-auto flex items-center justify-center'>
      <div className=' flex flex-col items-center justify-center gap-4'>
        <h1 className=' text-5xl'>BLACKJACK</h1>

        <p>Bet ${bet}</p>
        <div>
          <button
            onClick={() => setBet((curr) => curr - 100)}
            disabled={bet - 100 < 0}
          >
            --
          </button>
          <button
            onClick={() => setBet((curr) => curr - 10)}
            disabled={bet - 10 < 0}
          >
            -
          </button>
          <button
            onClick={() => setBet((curr) => curr + 10)}
            disabled={bet + 10 > cash}
          >
            +
          </button>
          <button
            onClick={() => setBet((curr) => curr + 100)}
            disabled={bet + 100 > cash}
          >
            ++
          </button>
        </div>

        <button onClick={onStart} disabled={bet <= 0}>
          Play
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
