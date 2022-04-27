import constants from '@/assets/constants/common';
import EventBus from '@/utils/eventBus';
import characters from '@/assets/constants/characters';

export default {
  exitGame(state) {
    state.player.name = '';
    state.player.character = '';
    state.paused = false;
    state.quitInitiated = false;
  },
  resetGame(state) {
    state.enemy.specialAttack = 0;
    state.enemy.canUseSpecialAttack = false;
    state.player.specialAttack = 0;
    state.player.canUseSpecialAttack = false;
    state.player.health = 100;
    state.player.hasBeenDizzy = false;
    state.enemy.health = 100;
    state.enemy.hasBeenDizzy = false;
    state.paused = false;
    state.quitInitiated = false;
  },
  damageHealth(state, payload) {
    const { mode, damage } = payload;
    state[mode].health -= damage;
    if (state[mode].health <= 0) {
      state[mode].health = 0;
    }
    if (
      state[mode].health < constants.dizzyHealth &&
      state[mode].health > 0 &&
      !state[mode].hasBeenDizzy
    ) {
      EventBus.$emit(`${mode}-dizzy`);
      state[mode].hasBeenDizzy = true;
    } else if (state[mode].health <= 0) {
      EventBus.$emit(`${mode}-died`);
      state[mode].hasBeenDizzy = false;
    }
  },
  increaseSpecialAttack(state, mode) {
    if (state[mode].specialAttack < constants.specialAttackMaxValue) {
      state[mode].specialAttack += constants.specialAttackIncreaseAmount;
    }
    if (state[mode].specialAttack === constants.specialAttackMaxValue) {
      state[mode].canUseSpecialAttack = true;
    }
  },
  decreaseSpecialAttack(state, mode) {
    state[mode].specialAttack -= constants.specialAttackDecreaseAmount;
    if (state[mode].specialAttack <= 0) {
      state[mode].specialAttack = 0;
      state[mode].canUseSpecialAttack = false;
    }
  },
  chooseCharacter(state, payload) {
    const availableOpponents = Object.keys(characters).filter(
      character => character !== payload.name
    );
    state.player.character = payload;
    state.enemy.character =
      characters[
        availableOpponents[(availableOpponents.length * Math.random()) << 0]
      ];
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
  },
  setPaused(state, payload) {
    state.paused = payload;
  },
  setQuitInitiated(state, payload) {
    state.quitInitiated = payload;
  },
  addPressedKey(state, payload) {
    state.pressedKeys.push(payload);
  },
  removeReleasedKey(state, payload) {
    state.pressedKeys = state.pressedKeys.filter(keys => keys !== payload);
  }
};
