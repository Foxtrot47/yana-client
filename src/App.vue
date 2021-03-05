<template>
  <navbar />
  <router-view />
</template>

<style lang="scss"></style>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  name: "app",
  components: {
    navbar: Navbar
  },
  methods: {
    created() {
      this.$store.dispatch("AutoLogin");
    }
  }
};
</script>
