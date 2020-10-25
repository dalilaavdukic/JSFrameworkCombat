import Vue from 'vue';
import Vuex from 'vuex';
import characters from '../assets/constants/characters';
import characterActions from '../assets/constants/characterActions';
import getters from './getters';
import mutations from './mutations';

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
    hasBeenDizzy: false,
    currentAnimation: characterActions.idle
  },
  enemy: {
    name: 'Enemy',
    character: characters.angular,
    health: 100,
    specialAttack: 0,
    facingDirection: 'left',
    canUseSpecialAttack: false,
    hasBeenDizzy: false,
    currentAnimation: characterActions.idle
  },
  positions: {
    player: {},
    enemy: {},
  },
  assetsLoaded: false
};

export default new Vuex.Store({
  state,
  mutations,
  getters
});