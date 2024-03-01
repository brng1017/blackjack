import React, { useState, useEffect } from 'react';
import {
  checkWinner,
  createGame,
  Game,
  handlePlayerHit,
  handlePlayerStand,
} from '../utils';

const GameScreen = () => {
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
  const [winnerMessage, setWinnerMessage] = useState<string>('');

  const initializeGame = () => {
    const newGame = createGame();
    setGame(newGame);
    setGameEnd(false);
    setWinnerMessage('');
  };

  useEffect(() => {
    initializeGame();
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
      const message = checkWinner(game.player.score, game.dealer.score);
      setWinnerMessage(message);
    }
  }, [gameEnd, game.player.score, game.dealer.score]);

  const handleHit = (): void => {
    setGame((currentGame) => handlePlayerHit(currentGame));
  };

  const handleStand = (): void => {
    setGame((currentGame) => handlePlayerStand(currentGame));
    setGameEnd(true);
  };

  const refreshPage = (): void => {
    if (typeof window !== 'undefined') window.location.reload();
  };

  return (
    <div>
      <h1>Game On!</h1>

      {gameEnd && (
        <div>
          <p>{winnerMessage}</p>
          <button onClick={initializeGame}>Play again</button>
          <button onClick={refreshPage}>Restart</button>
        </div>
      )}

      <h3>Player Hand</h3>
      <p>{JSON.stringify(game.player.hand)}</p>
      <p>{game.player.score}</p>
      <h3>Dealer Hand</h3>
      <p>{JSON.stringify(game.dealer.hand)}</p>
      <p>{game.dealer.score}</p>

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
