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
              name: 'NowPlaying',
              component: () => import('../components/NowPlaying/index.vue')
            },
            {
              path: 'comingSoon',
              name: 'ComingSoon',
              component: () => import('../components/ComingSoon/index.vue')
            }
          ]
        },
        {
          // 影院页
          path: 'cinemas',
          name: 'Cinemas',
          component: () => import('../views/Cinema.vue')
        },
        {
          // 个人中心页
          path: 'center',
          name: 'Center',
          component: () => import('../views/Center.vue')
        }
      ]
    },
    {
      path: '/cinema/search',
      name: 'Search',
      component: () => import('../views/Search.vue')
    },
    {
      // 详情页面
      path: '/film/:filmId',
      name: 'filmDetail',
      component: () => import('../views/FilmDetail.vue')
    },
    {
      // 购物车页面
      path: '/cart/filmId:filmId',
      name: 'Cart',
      component: () => import('../views/Cart.vue')
    },
    {
      // 城市页面
      path: '/city',
      name: 'City',
      component: () => import('../views/City.vue')
    },
    {
      // 用户页面
      path: '/user',
      component: () => import('../views/User.vue'),
      children: [
        {
          path: 'card',
          name: 'Card',
          component: () => import('../views/Card.vue')
        },
        {
          path: 'balance',
          name: 'Balance',
          component: () => import('../views/Balance.vue')
        },
        {
          path: 'settings',
          name: 'Settings',
          component: () => import('../views/Settings.vue')
        }
      ]
    },
    {
      // 登录页面
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      // 拼团页
      path: '/uugroupon',
      name: 'Uugroupon',
      component: () => import('../views/Uugroupon.vue')
    },
    {
      path: '*',
      redirect: '/films/nowPlaying'
    }
  ]
})
