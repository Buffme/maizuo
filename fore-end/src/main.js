// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

// 加载中与 Toast 使用非常频繁，于是可以将其挂到 vue 的原型对象上。使得后续的组件使用起来更方便。
import { Indicator, Toast } from 'mint-ui';

Vue.prototype.$load = Indicator;
Vue.prototype.$pop = Toast;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
