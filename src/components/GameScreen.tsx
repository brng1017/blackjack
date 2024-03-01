import React, { useState, useEffect, FC } from 'react';
import {
  Game,
  Winner,
  checkWinner,
  createGame,
  handlePlayerHit,
  handlePlayerStand,
} from '../utils';

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

  useEffect(() => {
    const newGame = createGame();
    setGame(newGame);
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
      const winner = checkWinner(game.player.score, game.dealer.score);
      handlePayOut(winner.winner);
      setWinner(winner);
    }
  }, [gameEnd, game.player.score, game.dealer.score]);

  function handlePayOut(winner: string): void {
    if (winner === 'Player') setCash((currCash) => currCash + 2 * bet);
    else if (winner === 'Draw') setCash((currCash) => currCash + bet);
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
    <div>
      <h1>Game On!</h1>

      {gameEnd && (
        <div>
          <p>{winner.message}</p>
          <button onClick={() => setGameStarted(false)} disabled={!cash}>
            Play again
          </button>
          <button onClick={refreshPage}>Restart</button>
        </div>
      )}

      <h3>Player Hand</h3>
      <p>{JSON.stringify(game.player.hand)}</p>
      <p>{game.player.score}</p>
      <h3>Dealer Hand</h3>
      {gameEnd ? (
        <div>
          <p>{JSON.stringify(game.dealer.hand)}</p>
          <p>{game.dealer.score}</p>
        </div>
      ) : (
        <p>{JSON.stringify(game.dealer.hand[0])}</p>
      )}

      {!gameEnd && (
        <div>
          <button onClick={handleHit}>Hit</button>
          <button onClick={handleStand}>Stand</button>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
