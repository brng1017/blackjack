import React, { FC } from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div>
      <h1>Welcome to Blackjack!</h1>
      <button onClick={onStart}>Play</button>
    </div>
  );
};

export default StartScreen;
