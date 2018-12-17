import Vue from 'vue';
import Router from 'vue-router';

import Films from '../views/Films.vue';
import Cinemas from '../views/Cinemas.vue';
import Center from '../views/Center.vue';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/films',
      name: 'films',
      component: Films
    },
    {
      path: '/cinemas',
      name: 'cinemas',
      component: Cinemas
    },
    {
      path: '/center',
      name: 'center',
      component: Center
    },
    {
      path: '*',
      redirect: '/films'
    }

  ]
})
