import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../components/Auth/Login.vue";
import Register from "../components/Auth/Register.vue";
import Notes from "../components/Dashboard/Notes.vue";
import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  {
    path: "/notes",
    name: "Notes",
    component: Notes,
    beforeEnter(to, from, next) {
      if (store.state.idToken !== null) {
        next();
      } else {
        next("/login");
      }
    }
  }
];

export default new VueRouter({ mode: "history", routes });
