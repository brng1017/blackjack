import React, { FC } from 'react';
import { GiSpades, GiHearts, GiDiamonds, GiClubs } from 'react-icons/gi';

interface StartScreenProps {
  onStart: () => void;
  bet: number;
  setBet: React.Dispatch<React.SetStateAction<number>>;
  cash: number;
}

/**
 * The start screen component for the game, allowing the user to set their bet and start the game.
 *
 * Displays the game's title, the current bet amount with buttons to increase or decrease the bet,
 * and a button to start the game. The bet amount can be adjusted within the limits of 0 and the available cash.
 * The start button is disabled if the bet is 0 or less.
 *
 * @param {StartScreenProps} props - The props for the StartScreen component.
 * @param {() => void} props.onStart - Function to call when the game is to be started.
 * @param {number} props.bet - The current bet amount.
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setBet - Function to set the bet amount.
 * @param {number} props.cash - The total cash available to the user.
 * @returns {React.ReactElement} The StartScreen component.
 */
const StartScreen: FC<StartScreenProps> = ({ onStart, bet, setBet, cash }) => {
  return (
    <div className=' w-full h-screen m-auto flex items-center justify-center'>
      <div className=' flex flex-col items-center justify-center gap-4'>
        <div className=' text-5xl mb-8 flex flex-row gap-2'>
          <GiClubs />
          <GiDiamonds className=' text-red-600' />
          <h1>BLACKJACK</h1>
          <GiHearts className=' text-red-600' />
          <GiSpades />
        </div>

        <p>BET</p>

        <div className=' flex flex-row items-center justify-center gap-3'>
          <button
            onClick={() => setBet((curr) => curr - 100)}
            disabled={bet - 100 < 0}
            className=' px-3 py-1.5'
          >
            -100
          </button>
          <button
            onClick={() => setBet((curr) => curr - 10)}
            disabled={bet - 10 < 0}
            className=' px-3 py-1.5'
          >
            -10
          </button>
          <p className=' bg-slate-500 rounded-sm px-3 py-1.5'>${bet}</p>
          <button
            onClick={() => setBet((curr) => curr + 10)}
            disabled={bet + 10 > cash}
            className=' px-3 py-1.5'
          >
            +10
          </button>
          <button
            onClick={() => setBet((curr) => curr + 100)}
            disabled={bet + 100 > cash}
            className=' px-3 py-1.5'
          >
            +100
          </button>
        </div>

        <button className=' mt-8' onClick={onStart} disabled={bet <= 0}>
          Play
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
