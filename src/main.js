import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "tailwindcss/tailwind.css";
import CKEditor from "ckeditor4-vue";
Vue.use(CKEditor);
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
