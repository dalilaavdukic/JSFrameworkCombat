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
    position: {},
    facingDirection: ''
  },
  enemy: {
    name: '',
    character: characters.angular,
    health: 100,
    specialAttack: 0,
    position: {},
    facingDirection: ''
  },
  assetsLoaded: false
};
// mutations
const mutations = {
  damageHealth(state, damage) {
    state.player.health -= damage;
  },
  increaseSpecialAttack(state, increment) {
    state.player.specialAttack += increment;
  },
  chooseCharacter(state, payload) {
    state[payload.type].character = payload.character
  },
  giveName(state, name) {
    state.player.name = name;
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