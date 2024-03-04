import React, { FC } from 'react';
import { Card } from '../utils';
import { GiSpades, GiHearts, GiDiamonds, GiClubs } from 'react-icons/gi';

interface CardProps {
  card?: Card;
}

interface IconMap {
  [key: string]: React.ComponentType;
}

/**
 * Displays a single card with its suit and rank, utilizing specific icons for each suit.
 * If no card is provided, a placeholder card design is displayed instead.
 *
 * @param {CardProps} props - The props for the CardComponent.
 * @param {Card} [props.card] - The card to display. If not provided, a placeholder is shown.
 * @returns {React.ReactElement} The rendered card component with suit icon and rank.
 */
const CardComponent: FC<CardProps> = ({ card }) => {
  const iconMap: IconMap = {
    Hearts: GiHearts,
    Spades: GiSpades,
    Diamonds: GiDiamonds,
    Clubs: GiClubs,
  };

  const SuitIcon = card ? iconMap[card.suit] : GiHearts;

  return (
    <div
      className={` fade-in w-36 h-56 bg-slate-900 outline outline-1 outline-slate-300 rounded-md flex items-center justify-center relative overflow-hidden -ml-24 first:ml-auto ${
        card?.suit === 'Hearts' || card?.suit === 'Diamonds'
          ? 'text-red-600'
          : 'text-text'
      }`}
    >
      {card ? (
        <>
          <div className=' absolute top-2 left-2 text-xl flex flex-col items-center'>
            <p>{card.rank}</p>
            <SuitIcon />
          </div>
          <div className=' text-7xl'>
            <SuitIcon />
          </div>
          <div className=' absolute bottom-2 right-2 text-xl flex flex-col items-center'>
            <SuitIcon />
            <p>{card.rank}</p>
          </div>
        </>
      ) : (
        <div className=' card-bg relative w-full h-full bg-slate-800'></div>
      )}
    </div>
  );
};

export default CardComponent;
