import Vue from "vue";
import App from "./App.vue";
import plugins from "./plugins";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

plugins(Vue);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
