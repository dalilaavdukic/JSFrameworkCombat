import characters from '../assets/constants/characters';
import characterActions from '../assets/constants/characterActions';
import constants from '../assets/constants/common';

export default {
  player: {
    name: '',
    character: '',
    health: 100,
    specialAttack: 0,
    facingDirection: constants.side.right,
    canUseSpecialAttack: false,
    hasBeenDizzy: false,
    currentAnimation: characterActions.idle
  },
  enemy: {
    name: 'Enemy',
    character: characters.angular,
    health: 100,
    specialAttack: 0,
    facingDirection: constants.side.left,
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
  assetsLoaded: false,
  pressedKeys: []
};
