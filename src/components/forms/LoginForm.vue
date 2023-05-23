<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      api: "http://localhost:8000",
      error: "",
    };
  },
  methods: {
    login() {
      axios.get(`${this.api}/sanctum/csrf-cookie`).then((response) => {
        (this.error = ""), // Reset
          axios
            .post(`${this.api}/api/login`, {
              email: this.email,
              password: this.password,
            })
            .then((response) => {
              // Token di accesso e utente salvati nello store
              if (response.data.token) {
                this.$store.commit("doLogin", {
                  token: response.data.token,
                  loggedUser: response.data.user,
                });
                localStorage.setItem("token", this.$store.state.token);
                this.$store.state.isLogged = true;
                this.$router.push({ name: "Home" });
              }
            })
            .catch((error) => {
              if (error.response.data.error)
                this.error = error.response.data.error;
              else this.error = error.message;
            });
      });
    },
  },
};
</script>

<template>
  <div class="container login">
    <div class="row justify-content-center align-items-center">
      <div class="card col-6 py-3">
        <h1 class="text-center">Login</h1>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label"
            >Email address</label
          >
          <input
            v-model="email"
            type="email"
            name="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>

        <label for="inputPassword5" class="form-label">Password</label>
        <input
          @keyup.enter="login()"
          v-model="password"
          type="password"
          name="password"
          id="inputPassword5"
          class="form-control"
          aria-labelledby="passwordHelpBlock"
        />
        <div id="passwordHelpBlock" class="form-text">
          <div v-if="error" class="div text-danger">{{ error }}</div>
        </div>
        <input
          type="button"
          @click="login()"
          class="btn btn-primary align-self-center mt-2"
          value="Invia"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  padding-top: 100px;
  padding-bottom: 100px;
}
</style>
