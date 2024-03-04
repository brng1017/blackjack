import React, { FC } from 'react';
import { Card } from '../utils';
import { GiSpades, GiHearts, GiDiamonds, GiClubs } from 'react-icons/gi';

interface CardProps {
  card?: Card;
}

interface IconMap {
  [key: string]: React.ComponentType;
}

const CardComponent: FC<CardProps> = ({ card }) => {
  const iconMap: IconMap = {
    Hearts: GiHearts,
    Spades: GiSpades,
    Diamonds: GiDiamonds,
    Clubs: GiClubs,
  };

  const SuitIcon = card ? iconMap[card.suit] : GiHearts;

  return (
    <div className=' fade-in w-36 h-56 bg-slate-900 outline outline-1 outline-slate-300 rounded-md text-text flex items-center justify-center relative overflow-hidden -ml-24 first:ml-auto'>
      {card ? (
        <>
          <p className=' absolute top-2 left-2 text-xl'>{card.rank}</p>
          <div className=' text-7xl'>
            <SuitIcon />
          </div>
          <p className=' absolute bottom-2 right-2 text-xl'>{card.rank}</p>
        </>
      ) : (
        <div className=' card-bg relative w-full h-full bg-slate-800'></div>
      )}
    </div>
  );
};

export default CardComponent;
