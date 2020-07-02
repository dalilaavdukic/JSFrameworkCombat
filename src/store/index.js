import Vue from 'vue';
import Vuex from 'vuex';
import characters from '../assets/constants/characters';

Vue.use(Vuex);

// initial state, whole game
const state = {
  player: {
    name: '',
    character: '',
    health: 100,
    specialAttack: 0,
    facingDirection: 'right'
  },
  enemy: {
    name: '',
    character: characters.angular,
    health: 100,
    specialAttack: 0,
    facingDirection: 'left'
  },
  assetsLoaded: false
};
// mutations
const mutations = {
  damagePlayersHealth(state, damage) {
    state.player.health -= damage;
  },
  damageEnemysHealth(state, damage) {
    state.enemy.health -= damage;
  },
  increasePlayersSpecialAttack(state, increment) {
    state.player.specialAttack += increment;
  },
  increaseEnemysSpecialAttack(state, increment) {
    state.enemy.specialAttack += increment;
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