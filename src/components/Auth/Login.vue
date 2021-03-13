<template>
  <div class="py-16 h-screen dark:bg-gray-600">
    <div
      class="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl"
    >
      <div
        class="hidden bg-cover lg:block lg:w-1/2"
        style="background-image:url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')"
      ></div>

      <form
        v-on:submit.prevent="onSubmit"
        class="w-full px-6 py-8 md:px-8 lg:w-1/2"
      >
        <h2
          class="text-2xl font-semibold text-center text-gray-700 dark:text-white"
        >
          Yet Another Note App
        </h2>

        <p class="text-xl text-center text-gray-600 dark:text-gray-200">
          Welcome back!
        </p>

        <div class="mt-4">
          <label
            class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
            for="email"
            >Email Address</label
          >
          <input
            id="email"
            v-model="email"
            class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            type="email"
          />
        </div>

        <div class="mt-4">
          <div class="flex justify-between">
            <label
              class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              for="password"
              >Password</label
            >
            <a
              href="#"
              class="text-xs text-gray-500 dark:text-gray-300 hover:underline"
              >Forget Password?</a
            >
          </div>

          <input
            id="password"
            v-model="password"
            class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            type="password"
          />
        </div>

        <div class="mt-8">
          <input
            type="submit"
            value="Submit"
            class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          />
        </div>

        <div class="flex items-center justify-between mt-4">
          <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

          <a
            href="#"
            class="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >or sign up</a
          >

          <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("login", formData);
    }
  }
};
</script>
