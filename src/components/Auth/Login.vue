<template>
  <div class="columns p-6 has-background-grey-lighter ">
    <div class="column  mx-6  is-three-fifths">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel
      tristique lectus. Integer egestas vitae quam id rhoncus. Etiam rutrum ac
      dui vel ornare. Etiam ullamcorper lacus nisl, fringilla posuere enim
      rutrum eget. Aliquam ac tortor quam. Ut venenatis ex a libero dignissim
      mattis. Pellentesque iaculis eleifend tellus. Morbi eget nisl vitae est
      scelerisque varius non at tellus. Vivamus laoreet, orci ac ornare
      facilisis, nibh libero egestas erat, in suscipit nunc tellus sed mi.
      Aenean quis arcu nec lorem laoreet tempus. Etiam non enim et libero
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      tristique elementum. Curabitur vestibulum nisl ut lorem scelerisque, sed
      consequat enim porta. Morbi sollicitudin pretium dignissim. Mauris
      volutpat lacus vitae venenatis egestas. Nulla blandit a diam eget dictum.
      Curabitur consectetur consectetur diam et consectetur. Morbi vitae est
      odio. Nulla sed augue quis justo commodo dapibus eget eget neque. Donec
      tempor sagittis purus quis volutpat. Proin mi nisi, hendrerit et placerat
      vel, viverra vitae libero.
    </div>
    <div class="coloumn">
      <div class="card">
        <div class="card-header">
          <h2 class="card-header-title">
            Login
          </h2>
        </div>
        <div class="card-content">
          <form @submit.prevent="onSubmit">
            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-left">
                <input
                  class="input"
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  v-model="email"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label">Password: </label>
              <div class="control has-icons-left">
                <input
                  class="input"
                  id="password"
                  v-model="password"
                  type="password"
                  placeholder="Enter passowrd"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-key"></i>
                </span>
              </div>
            </div>
            <div class="field ">
              <div class="control">
                <button type="submit" class="button is-primary ">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
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
