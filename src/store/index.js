import Vue from 'vue';
import Vuex from 'vuex';
import characters from '../assets/constants/characters';

Vue.use(Vuex);

// initial state, whole game
const state = {
  player: {
    name: 'Player One',
    character: characters.vue,
    health: 80,
    specialAttack: 50
  }
};
// mutations
const mutations = {
  damageHealth(state, damage) {
    state.player.health -= damage;
  },
  increaseSpecialAttack(state, increment) {
    state.player.specialAttack += increment;
  }
};
// getters
const getters = {
  player: state => {
    return state.player
  }
};

export default new Vuex.Store({
  state,
  mutations,
  getters
});