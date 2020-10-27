import characters from '../assets/constants/characters';
import characterActions from '../assets/constants/characterActions';

export default {
  player: {
    name: '',
    character: '',
    health: 100,
    specialAttack: 0,
    facingDirection: 'right',
    canUseSpecialAttack: false,
    hasBeenDizzy: false,
    currentAnimation: characterActions.idle
  },
  enemy: {
    name: 'Enemy',
    character: characters.angular,
    health: 100,
    specialAttack: 0,
    facingDirection: 'left',
    canUseSpecialAttack: false,
    hasBeenDizzy: false,
    currentAnimation: characterActions.idle
  },
  positions: {
    player: {},
    enemy: {}
  },
  paused: false,
  quitInitiated: false,
  assetsLoaded: false
};
