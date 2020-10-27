import constants from '@/assets/constants/common';
import characterActions from '@/assets/constants/characterActions';

export default {
  player: state => {
    return state.player;
  },
  enemy: state => {
    return state.enemy;
  },
  positions: state => {
    return state.positions;
  },
  distance: state => {
    return state.positions.enemy.left - state.positions.player.left;
  },
  heightDifference: state => {
    return state.positions.enemy.top - state.positions.player.top;
  },
  enemyIsFacingPlayer: (state, getters) => {
    const playerSide = getters.distance > 0 ? 'left' : 'right';
    return state.enemy.facingDirection === playerSide;
  },
  playerIsFacingEnemy: (state, getters) => {
    const enemySide = getters.distance < 0 ? 'left' : 'right';
    return state.player.facingDirection === enemySide;
  },
  attackCanDamageEnemy: (state, getters) => {
    if (
      state.enemy.currentAnimation === characterActions.roll ||
      state.enemy.currentAnimation === characterActions.slide
    ) {
      return false;
    }
    return (
      Math.abs(getters.distance) <= constants.minimumAttackDamageDistance &&
      getters.playerIsFacingEnemy
    );
  },
  attackCanDamagePlayer: (state, getters) => {
    if (
      state.player.currentAnimation === characterActions.roll ||
      state.player.currentAnimation === characterActions.slide
    ) {
      return false;
    }
    return (
      Math.abs(getters.distance) <= constants.minimumAttackDamageDistance &&
      getters.enemyIsFacingPlayer
    );
  },
  shotCanDamageEnemy: (state, getters) => {
    if (
      state.enemy.currentAnimation === characterActions.roll ||
      state.enemy.currentAnimation === characterActions.slide
    ) {
      return false;
    }
    return (
      Math.abs(getters.heightDifference) < constants.damageHeight &&
      getters.playerIsFacingEnemy
    );
  },
  shotCanDamagePlayer: (state, getters) => {
    if (
      state.player.currentAnimation === characterActions.roll ||
      state.player.currentAnimation === characterActions.slide
    ) {
      return false;
    }
    return (
      Math.abs(getters.heightDifference) < constants.damageHeight &&
      getters.enemyIsFacingPlayer
    );
  },
  gameOver: state => {
    return state.enemy.health <= 0 || state.player.health <= 0;
  },
  game: (state, getters) => {
    return {
      distance: getters.distance,
      enemyIsFacingPlayer: getters.enemyIsFacingPlayer,
      playerIsFacingEnemy: getters.playerIsFacingEnemy,
      attackCanDamageEnemy: getters.attackCanDamageEnemy,
      attackCanDamagePlayer: getters.attackCanDamagePlayer,
      shotCanDamageEnemy: getters.shotCanDamageEnemy,
      shotCanDamagePlayer: getters.shotCanDamagePlayer,
      over: getters.gameOver,
      paused: state.paused,
      quitInitiated: state.quitInitiated
    };
  },
  assetsLoaded: state => {
    return state.assetsLoaded;
  }
};
