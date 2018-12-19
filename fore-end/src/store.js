import Vue from 'vue';

import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    page: ''
  },

  mutations: {
    getPage (state, payload) {
      state.page = payload.pageName;
    }

  }
});

export default store;
