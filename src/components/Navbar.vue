<template>
  <nav v-if="!mainapp" class="bg-white shadow dark:bg-gray-800 ">
    <div class="container px-6 py-3 mx-auto">
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex items-center justify-between">
          <div class="text-xl font-semibold text-gray-700">
            <router-link
              to="/"
              class="text-xl font-bold text-gray-800 dark:text-white md:text-2xl hover:text-gray-700 dark:hover:text-gray-300"
              href="#"
              >Yet Another Note App</router-link
            >
          </div>

          <!-- Mobile menu button -->
          <div class="flex md:hidden">
            <button
              type="button"
              class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                <path
                  fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <div class="flex-1 md:flex md:items-center md:justify-between">
          <div class="flex flex-col -mx-4 md:flex-row md:items-center md:mx-8">
            <router-link
              to="/"
              class="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
              >Home</router-link
            >
            <a
              href="#"
              class="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
              >About</a
            >
          </div>
          <div v-if="!auth" class="flex items-center  -mx-1 md:mx-0">
            <router-link
              to="/login"
              class="block px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-blue-600 md:mx-2 md:w-auto"
              >Login</router-link
            >
            <a
              class="block px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 md:mx-0 md:w-auto"
              href="#"
              >Sign up</a
            >
          </div>
          <div v-if="auth" class="flex items-center mt-4 md:mt-0">
            <button
              type="button"
              class="flex items-center focus:outline-none"
              aria-label="toggle profile dropdown"
            >
              <div class="text-3xl overflow-hidden">
                <i class="far fa-user-circle object-cover " />
              </div>

              <h3
                class="mx-2 text-sm font-medium text-gray-700 dark:text-gray-200 md:hidden"
              >
                Hello User
              </h3>
            </button>
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
    },
    mainapp() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.$route.path === "/notes" ? true : false;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
