import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import ideas from './ideas';


Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    ideas,
  },
  strict: process.env.NODE_ENV !== 'production',
});

export default store;
