import React, { useState, useEffect, FC } from 'react';
import {
  Game,
  Winner,
  checkWinner,
  createGame,
  decidedWinner,
  handlePlayerHit,
  handlePlayerStand,
} from '../utils';
import { CardComponent } from '../components';

interface GameScreenProps {
  bet: number;
  setBet: React.Dispatch<React.SetStateAction<number>>;
  cash: number;
  setCash: React.Dispatch<React.SetStateAction<number>>;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameScreen: FC<GameScreenProps> = ({
  bet,
  setBet,
  cash,
  setCash,
  setGameStarted,
}) => {
  const [game, setGame] = useState<Game>({
    deck: [],
    player: {
      hand: [],
      score: 0,
    },
    dealer: {
      hand: [],
      score: 0,
    },
  });
  const [gameEnd, setGameEnd] = useState<boolean>(false);
  const [winner, setWinner] = useState<Winner>({ winner: '', message: '' });

  function initializeGame() {
    setGameEnd(false);
    setWinner({ winner: '', message: '' });
    setGameStarted(false);
  }

  useEffect(() => {
    const newGame = createGame();
    setGame(newGame);
    // if either hits natural, end game
    if (newGame.dealer.score === 21 || newGame.player.score === 21) {
      setGameEnd(true);
    }
  }, []);

  useEffect(() => {
    if (game.player.score > 21) {
      setGameEnd(true);
    } else if (game.player.score === 21) {
      handleStand();
    }
  }, [game.player.score]);

  useEffect(() => {
    if (gameEnd) {
      const winner = checkWinner(game.player, game.dealer);
      handlePayOut(winner.winner);
      setWinner(winner);
    }
  }, [gameEnd]);

  function handlePayOut(winner: decidedWinner): void {
    if (winner === 'Player') setCash((currCash) => currCash + 2 * bet);
    else if (winner === 'Draw') setCash((currCash) => currCash + bet);
    else if (winner === 'Natural') setCash((currCash) => currCash + 2.5 * bet);
    setBet(0);
  }

  function handleHit(): void {
    setGame((currentGame) => handlePlayerHit(currentGame));
  }

  function handleStand(): void {
    setGame((currentGame) => handlePlayerStand(currentGame));
    setGameEnd(true);
  }

  function refreshPage(): void {
    if (typeof window !== 'undefined') window.location.reload();
  }

  return (
    <div className=' w-full h-screen m-auto flex flex-col items-center justify-between text-center z-50'>
      {/* Endgame screen */}
      {gameEnd && (
        <div className=' absolute w-full h-screen bg-black bg-opacity-50 flex flex-col items-center justify-center'>
          <p className=' text-3xl mb-6'>{winner.message}</p>
          <div className=' flex flex-row gap-6'>
            <button onClick={initializeGame} disabled={!cash}>
              Play again
            </button>
            <button onClick={refreshPage}>Restart</button>
          </div>
        </div>
      )}

      <div className=' flex flex-col items-center justify-start pt-4'>
        <h3>Dealer Hand</h3>
        {gameEnd ? (
          <>
            <div className=' flex flex-row py-4'>
              {game.dealer.hand.map((card, index) => (
                <CardComponent card={card} key={index} />
              ))}
            </div>
            <p>{game.dealer.score}</p>
          </>
        ) : (
          <div className=' flex flex-row py-4'>
            <CardComponent card={game.dealer.hand[0]} />
            <CardComponent />
          </div>
        )}
      </div>

      {!gameEnd && (
        <div className=' flex flex-row gap-6'>
          <button onClick={handleHit}>Hit</button>
          <button onClick={handleStand}>Stand</button>
        </div>
      )}

      <div className=' flex flex-col items-center justify-end pb-4'>
        <h3>Player Hand</h3>
        <div className=' flex flex-row py-4'>
          {game.player.hand.map((card, index) => (
            <CardComponent card={card} key={index} />
          ))}
        </div>
        <p>{game.player.score}</p>
      </div>
    </div>
  );
};

export default GameScreen;
