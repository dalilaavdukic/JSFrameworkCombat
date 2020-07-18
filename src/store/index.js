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
    canUseSpecialAttack: false
  },
  enemy: {
    name: '',
    character: characters.angular,
    health: 100,
    specialAttack: 0,
    facingDirection: 'left',
    canUseSpecialAttack: false
  },
  assetsLoaded: false
};
// mutations
const mutations = {
  damagePlayersHealth(state, damage) {
    state.player.health -= damage;
    if (state.player.health <= 0) {
      EventBus.$emit('player-died');
    }
  },
  damageEnemysHealth(state, damage) {
    state.enemy.health -= damage;
  },
  resetPlayersHealth(state) {
    state.player.health = 100;
  },
  resetEnemysHealth(state) {
    state.enemy.health = 100;
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