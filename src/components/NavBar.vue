<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img src="path/to/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
        <span class="ms-2">Logo</span>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" @click="redirectToLogin">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="redirectToRegister">Register</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    redirectToLogin() {
      window.location.href = '/login';
    },
    redirectToRegister() {
      window.location.href = '/register';
    }
  }
}

// LATO LARAVEL!!!
// Aggiungere queste rotte nel file routes/web.php

// Route::get('/login', function () {
//     return view('auth.login');
// });

// Route::get('/register', function () {
//     return view('auth.register');
// });
</script>


<style scoped>
</style>
