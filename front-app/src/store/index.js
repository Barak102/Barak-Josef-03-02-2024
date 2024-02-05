import Vue from "vue";
import Vuex from "vuex";
import webSocket from "./modules/webSocket.store";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    webSocket,
  },
});
