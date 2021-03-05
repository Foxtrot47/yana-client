<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class=" is-size-4 navbar-item"
        >Yet Another Note App</router-link
      >

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link v-if="!auth" to="/about" class="navbar-item"
          >About</router-link
        >
        <router-link v-if="auth" to="/dashboard" class="navbar-item"
          >Dashboard</router-link
        >
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link v-if="!auth" to="/register" class="button is-primary">
              <strong>Sign up</strong>
            </router-link>
            <router-link v-if="!auth" to="/login" class="button is-light">
              Log in
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
