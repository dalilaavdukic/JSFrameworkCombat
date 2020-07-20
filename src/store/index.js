import Vue from 'vue';
import Vuex from 'vuex';
import characters from '../assets/constants/characters';
import constants from '../assets/constants/common';
import EventBus from '@/utils/eventBus';

Vue.use(Vuex);

// initial state, whole game
const state = {
  player: {
    name: '',
    character: '',
    health: 100,
    specialAttack: 0,
    facingDirection: 'right',
    canUseSpecialAttack: false,
    hasBeenDizzy: false
  },
  enemy: {
    name: '',
    character: characters.angular,
    health: 100,
    specialAttack: 0,
    facingDirection: 'left',
    canUseSpecialAttack: false,
    hasBeenDizzy: false
  },
  assetsLoaded: false
};
// mutations
const mutations = {
  damagePlayersHealth(state, damage) {
    state.player.health -= damage;
    if (state.player.health < 15 && state.player.health > 0 && !state.player.hasBeenDizzy) {
      EventBus.$emit('player-dizzy');
      state.player.hasBeenDizzy = true;
    } else if (state.player.health <= 0) {
      EventBus.$emit('player-died');
      state.player.hasBeenDizzy = false;
    }
  },
  damageEnemysHealth(state, damage) {
    state.enemy.health -= damage;
    if (state.enemy.health < 15 && state.enemy.health > 0 && !state.enemy.hasBeenDizzy) {
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
    state.player.specialAttack += constants.specialAttackIncreaseAmount;
    if (state.player.specialAttack === constants.specialAttackMaxValue) {
      state.player.canUseSpecialAttack = true;
    }
  },
  increaseEnemysSpecialAttack(state) {
    state.enemy.specialAttack += constants.specialAttackIncreaseAmount;
    if (state.enemy.specialAttack === constants.specialAttackMaxValue) {
      state.enemy.canUseSpecialAttack = true;
    }
  },
  decreasePlayersSpecialAttack(state) {
    state.player.specialAttack -= constants.specialAttackDecreaseAmount;
    if (state.player.specialAttack === 0) {
      state.player.canUseSpecialAttack = false;
    }
  },
  decreaseEnemysSpecialAttack(state) {
    state.enemy.specialAttack -= constants.specialAttackDecreaseAmount;
    if (state.enemy.specialAttack === 0) {
      state.enemy.canUseSpecialAttack = false;
    }
  },
  resetPlayersSpecialAttack(state) {
    state.player.specialAttack = 0;
  },
  resetEnemysSpecialAttack(state) {
    state.enemy.specialAttack = 0;
  },
  chooseCharacter(state, payload) {
    state[payload.type].character = payload.character
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
  }
};
// getters
const getters = {
  player: state => {
    return state.player
  },
  enemy: state => {
    return state.enemy
  },
  assetsLoaded: state => {
    return state.assetsLoaded;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  getters
});