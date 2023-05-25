<script>
import NavBar from "../components/sections/NavBar.vue";
import LoginForm from "../components/forms/LoginForm.vue";
import Footer from "../components/sections/Footer.vue";

export default {
  name: "Login",
  components: {
    NavBar,
    LoginForm,
    Footer,
  },
  created() {},
};
</script>

<template>
  <NavBar class="fixed-top" />
  <LoginForm />
  <Footer />
</template>
