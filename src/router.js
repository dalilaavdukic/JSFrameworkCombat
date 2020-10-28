﻿import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './views/Home';
import Characters from './views/Characters';
import Oponents from './views/Oponents';
import Play from './views/Play';
import Instructions from './views/Instructions';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: { path: 'home' }
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/instructions',
      component: Instructions
    },
    {
      path: '/characters',
      component: Characters
    },
    {
      path: '/oponents',
      component: Oponents
    },
    {
      path: '/play',
      component: Play
    }
  ]
});
