import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('../views/Home.vue'),
      children: [
        {
          path: '',
          redirect: '/films/nowPlaying'
        },
        {
          // 首页
          path: 'films',
          // name: 'films',
          component: () => import('../views/Films.vue'),
          children: [
            {
              path: '',
              redirect: '/films/nowPlaying'
            },
            {
              path: 'nowPlaying',
              name: 'nowPlaying',
              component: () => import('../components/NowPlaying/index.vue')
            },
            {
              path: 'comingSoon',
              name: 'comingSoon',
              component: () => import('../components/ComingSoon/index.vue')
            }
          ]
        },
        {
          // 影院页
          path: 'cinemas',
          name: 'cinemas',
          component: () => import('../views/Cinema.vue')
        },
        {
          // 个人中心页
          path: 'center',
          name: 'center',
          component: () => import('../views/Center.vue')
        }
      ]
    },
    {
      // 详情页面
      path: '/film/:filmId',
      name: 'filmDetail',
      component: () => import('../views/FilmDetail.vue')
    },
    {
      // 用户页面
      path: '/user',
      component: () => import('../views/Center.vue'),
      children: [
        {
          path: 'card',
          name: 'card',
          component: () => import('../views/Card.vue')
        },
        {
          path: 'balance',
          name: 'balance',
          component: () => import('../views/Balance.vue')
        }
      ]
    },
    {
      // 拼团页
      path: '/uugroupon',
      name: 'uugroupon',
      component: () => import('../views/Uugroupon.vue')
    },
    {
      path: '*',
      redirect: '/films/nowPlaying'
    }
  ]
})
