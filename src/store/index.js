import { createStore } from "vuex";
import axios from "axios";
import router from "../router/index";

export const store = createStore({
  state: {
    accessToken: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser(state, userData) {
      state.accessToken = userData.accessToken;
      state.userId = userData.userId;
    },
    clearAuth(state) {
      state.accessToken = null;
      state.userId = null;
    }
  },
  actions: {
    signup({ commit }, authData) {
      axios
        .post("http://localhost:8080/users/signup", {
          email: authData.email,
          fullname: authData.fullname,
          username: authData.username,
          password: authData.password,
          confirmPassword: authData.password2
        })
        .then(res => {
          commit("clearAuth");
          console.log(res);
          router.push("/login");
        })
        .catch(error => console.log(error));
    },
    login({ commit }, authData) {
      axios
        .post("http://localhost:8080/users/login", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          commit("authUser", {
            accessToken: res.data.accessToken,
            userId: res.data.userId
          });
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("userId", res.data.userId);
          router.push("/about");
        })
        .catch(error => console.log(error));
    },
    AutoLogin({ commit }) {
      const accesstoken = localStorage.getItem("accesstoken");
      if (!accesstoken) {
        return;
      }
      const userId = localStorage.getItem("userId");
      commit("authUser", { accesstoken, userId });
    },
    logout({ commit }) {
      commit("clearAuth");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      router.replace("/");
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    ifAuthenticated(state) {
      return state.accessToken !== null;
    }
  }
});
