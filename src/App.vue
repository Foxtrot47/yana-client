<template>
  <div>
    <navbar />
    <router-view />
  </div>
</template>

<style lang="scss"></style>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  name: "app",
  components: {
    navbar: Navbar
  },
  created() {
    this.$store.dispatch("AutoLogin");
  },
  updated() {
    console.log("fsf");
  }
};
</script>
