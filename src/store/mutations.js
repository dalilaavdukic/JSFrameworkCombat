import constants from '@/assets/constants/common';
import EventBus from '@/utils/eventBus';
import initialState from './initialState';

export default {
  resetGame(state) {
    console.log('reset game called');
    state = {...state};
    state.player = initialState.player;
    state.enemy = initialState.enemy;
    state.positions = initialState.positions;
  },
  damagePlayersHealth(state, damage) {
    state.player.health -= damage;
    if (
      state.player.health < constants.dizzyHealth &&
      state.player.health > 0 &&
      !state.player.hasBeenDizzy
    ) {
      EventBus.$emit('player-dizzy');
      state.player.hasBeenDizzy = true;
    } else if (state.player.health <= 0) {
      EventBus.$emit('player-died');
      state.player.hasBeenDizzy = false;
    }
  },
  damageEnemysHealth(state, damage) {
    state.enemy.health -= damage;
    if (
      state.enemy.health < constants.dizzyHealth &&
      state.enemy.health > 0 &&
      !state.enemy.hasBeenDizzy
    ) {
      EventBus.$emit('enemy-dizzy');
      state.enemy.hasBeenDizzy = true;
    } else if (state.enemy.health <= 0) {
      EventBus.$emit('enemy-died');
      state.enemy.hasBeenDizzy = false;
    }
  },
  resetPlayersHealth(state) {
    state.player.health = 100;
    state.player.hasBeenDizzy = false;
  },
  resetEnemysHealth(state) {
    state.enemy.health = 100;
    state.enemy.hasBeenDizzy = false;
  },
  increasePlayersSpecialAttack(state) {
    if (state.player.specialAttack < constants.specialAttackMaxValue) {
      state.player.specialAttack += constants.specialAttackIncreaseAmount;
    }
    if (state.player.specialAttack === constants.specialAttackMaxValue) {
      state.player.canUseSpecialAttack = true;
    }
  },
  increaseEnemysSpecialAttack(state) {
    if (state.enemy.specialAttack < constants.specialAttackMaxValue) {
      state.enemy.specialAttack += constants.specialAttackIncreaseAmount;
    }
    if (state.enemy.specialAttack === constants.specialAttackMaxValue) {
      state.enemy.canUseSpecialAttack = true;
    }
  },
  decreasePlayersSpecialAttack(state) {
    state.player.specialAttack -= constants.specialAttackDecreaseAmount;
    if (state.player.specialAttack <= 0) {
      state.player.specialAttack = 0;
      state.player.canUseSpecialAttack = false;
    }
  },
  decreaseEnemysSpecialAttack(state) {
    state.enemy.specialAttack -= constants.specialAttackDecreaseAmount;
    if (state.enemy.specialAttack <= 0) {
      state.enemy.specialAttack = 0;
      state.enemy.canUseSpecialAttack = false;
    }
  },
  resetPlayersSpecialAttack(state) {
    state.player.specialAttack = 0;
    state.player.canUseSpecialAttack = false;
  },
  resetEnemysSpecialAttack(state) {
    state.enemy.specialAttack = 0;
    state.enemy.canUseSpecialAttack = false;
  },
  chooseCharacter(state, payload) {
    state[payload.type].character = payload.character;
  },
  giveName(state, name) {
    state.player.name = name;
  },
  setPlayersFacingDirection(state, direction) {
    state.player.facingDirection = direction;
  },
  setEnemysFacingDirection(state, direction) {
    state.enemy.facingDirection = direction;
  },
  setPlayersAnimation(state, animation) {
    state.player.currentAnimation = animation;
  },
  setEnemysAnimation(state, animation) {
    state.enemy.currentAnimation = animation;
  },
  setAssetsLoaded(state, loaded) {
    state.assetsLoaded = loaded;
  },
  setPositions(state, positions) {
    state.positions = positions;
  }
};
