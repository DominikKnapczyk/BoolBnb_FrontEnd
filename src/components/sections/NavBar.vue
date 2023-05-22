<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <h3 class="text-danger mb-1">BoolBnB</h3>
        <!-- <img
          src="path/to/logo.png"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt=""
        />
        <span class="ms-2">Logo</span> -->
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
        </ul>
        <ul v-if="!this.$store.state.isLogged" class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" :href="backendUrl + '/register'">Register</a>
          </li>
        </ul>
        <ul v-if="this.$store.state.isLogged" class="navbar-nav">
          <li class="nav-item">
            <small class="nav-link"
              >Ciao, {{ this.$store.state.user.name }}</small
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="logout()">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      backendUrl: "http://localhost:8000",
    };
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push({ name: "Login" });
    },
  },
  created() {},
  watch: {
    "$store.state.isLogged": function (newValue, oldValue) {
      // Quando isLogged cambia, lo validiamo di nuovo
      if (!newValue) {
        this.$store.state.isLogged = false;
      } else {
        axios
          .get("http://localhost:8000/api/check-token", {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          })
          .then((response) => {
            if (response.request.status != 200)
              this.$store.state.isLogged = false;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
