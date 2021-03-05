import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import { store } from "../store/index";
import Login from "../components/Auth/Login.vue";
import Register from "../components/Auth/Register.vue";

export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  {
    path: "/dashboard",
    name: "Dashboard",
    beforeEnter(to, from, next) {
      if (store.state.accessToken) {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
export default router;
