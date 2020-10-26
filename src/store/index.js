import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import initialState from './initialState';

Vue.use(Vuex);

const state = initialState;

export default new Vuex.Store({
  state,
  mutations,
  getters
});