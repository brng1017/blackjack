import React, { useState, useEffect, FC } from 'react';
import {
  Game,
  Winner,
  checkWinner,
  createGame,
  decidedWinner,
  handlePlayerHit,
  handlePlayerStand,
  isNatural,
} from '../utils';
import { CardComponent } from '../components';

interface GameScreenProps {
  bet: number;
  setBet: React.Dispatch<React.SetStateAction<number>>;
  cash: number;
  setCash: React.Dispatch<React.SetStateAction<number>>;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Represents the game screen where the user interacts with the game, including making bets, hitting, standing, and doubling down.
 *
 * This component manages the game state, including the deck, player and dealer hands, scores, and game outcome. It utilizes various
 * utility functions imported from '../utils' to manage game logic.
 *
 * @param {GameScreenProps} props - The props for the GameScreen component.
 * @param {number} props.bet - The current bet amount.
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setBet - Function to update the bet amount.
 * @param {number} props.cash - The total available cash.
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setCash - Function to update the cash amount.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setGameStarted - Function to update the game started state.
 * @returns {React.ReactElement} The rendered game screen with dealer and player hands, controls for the player actions, and displays the outcome when the game ends.
 */
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
  const [doubleDown, setDoubleDown] = useState<boolean>(true);

  useEffect(() => {
    const newGame = createGame();
    setGame(newGame);
    setGameEnd(false);
    setWinner({ winner: '', message: '' });
    setDoubleDown(true);
    if (cash - bet < 0) {
      setDoubleDown(false);
    }
    // If either hits natural, end game
    if (newGame.dealer.score === 21 || newGame.player.score === 21) {
      setGameEnd(true);
    }
  }, []);

  useEffect(() => {
    if (game.player.score > 21) {
      setGameEnd(true);
    } else if (game.player.score === 21 && !isNatural(game.player)) {
      handleStand();
    }
  }, [game.player.score]);

  useEffect(() => {
    if (gameEnd) {
      const winner = checkWinner(game.player, game.dealer, bet);
      handlePayOut(winner.winner);
      setWinner(winner);
    }
  }, [gameEnd]);

  /**
   * Initializes the game by resetting state values to their defaults, bringing up the start screen, and starting a new game.
   */
  function initializeGame() {
    setGameStarted(false);
  }

  /**
   * Handles the payout to the player based on the game outcome.
   * @param {decidedWinner} winner - The result of the game, determining the payout.
   */
  function handlePayOut(winner: decidedWinner): void {
    if (winner === 'Player') setCash((currCash) => currCash + 2 * bet);
    else if (winner === 'Draw') setCash((currCash) => currCash + bet);
    else if (winner === 'Natural') setCash((currCash) => currCash + 2.5 * bet);
    setBet(0);
  }

  /**
   * Processes the player's decision to hit, drawing another card from the deck.
   */
  function handleHit(): void {
    setGame((currentGame) => handlePlayerHit(currentGame, 'player'));
    setDoubleDown(false);
  }

  /**
   * Processes the player's decision to stand, concluding the player's turn.
   */
  function handleStand(): void {
    setGame((currentGame) => handlePlayerStand(currentGame));
    setGameEnd(true);
  }

  /**
   * Handles the player's decision to double down, doubling the bet and proceeding with the game accordingly.
   */
  function handleDoubleDown(): void {
    setCash((curr) => curr - bet);
    setBet((curr) => curr * 2);
    handleHit();
    handleStand();
  }

  /**
   * Refreshes the page to restart the game from the beginning.
   */
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
        <h3>DEALER</h3>
        {gameEnd ? (
          <>
            <div className=' flex flex-row py-4'>
              {game.dealer.hand.map((card, index) => (
                <CardComponent card={card} key={index} />
              ))}
            </div>
            <p>Score: {game.dealer.score}</p>
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
          <button onClick={handleDoubleDown} disabled={!doubleDown}>
            Double Down
          </button>
        </div>
      )}

      <div className=' flex flex-col items-center justify-end pb-4'>
        <h3>PLAYER</h3>
        <div className=' flex flex-row py-4'>
          {game.player.hand.map((card, index) => (
            <CardComponent card={card} key={index} />
          ))}
        </div>
        <p>Score: {game.player.score}</p>
      </div>
    </div>
  );
};

export default GameScreen;
