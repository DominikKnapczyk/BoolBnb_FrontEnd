import { createApp } from "vue";
import { createStore } from "vuex";
import "./style.css";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

const store = createStore({
  state() {
    return {
      token: "",
      user: "",
      isLogged: false,
    };
  },
  mutations: {
    doLogin(state, user) {
      this.state.token = user.token;
      this.state.user = user.loggedUser;
    },
    logout() {
      this.state.token = "";
      this.state.user = "";
      this.state.isLogged = false;
    },
  },
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
