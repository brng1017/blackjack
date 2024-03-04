import { Player } from '../utils';

function isNatural(player: Player) {
  if (player.hand.length === 2 && player.score === 21) {
    return true;
  }
  return false;
}

export default isNatural;
