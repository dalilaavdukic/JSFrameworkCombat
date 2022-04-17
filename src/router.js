import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './views/Home';
import Characters from './views/Characters';
import Play from './views/Play';
import Instructions from './views/Instructions';
import store from './store';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: { path: 'home' }
    },
    {
      name: 'home',
      path: '/home',
      component: Home
    },
    {
      name: 'instructions',
      path: '/instructions',
      component: Instructions
    },
    {
      name: 'characters',
      path: '/characters',
      component: Characters
    },
    {
      path: '/play',
      component: Play,
      beforeEnter(to, from, next) {
        if (store.getters.player.name) {
          next();
        } else {
          next({ name: 'characters' });
        }
      }
    }
  ]
});
