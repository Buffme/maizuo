import Vue from 'vue';

import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // center页中卖座卡等组件跳转到不同页
    page: '',
    // 所选的城市
    selectedCity: ''
  },

  mutations: {
    getPage (state, payload) {
      state.page = payload.pageName;
    },

    getSelectedCity (state, payload) {
      state.selectedCity = payload.city;
    }
  }
});

export default store;
