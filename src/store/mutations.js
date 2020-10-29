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
  damagePlayersHealth(state, damage) {
    state.player.health -= damage;
    if (state.player.health <= 0) {
      state.player.health = 0;
    }
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
    if (state.enemy.health <= 0) {
      state.enemy.health = 0;
    }
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
  chooseCharacter(state, payload) {
    const availableOponents = Object.keys(characters).filter(
      character => character !== payload.name
    );
    state.player.character = payload;
    state.enemy.character =
      characters[
        availableOponents[(availableOponents.length * Math.random()) << 0]
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
  }
};
