import Vue from "vue";
import Vuex from "vuex";
import notification from "./notification";
import task from "./task";
import user from "./user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { notification, user, task }
});
