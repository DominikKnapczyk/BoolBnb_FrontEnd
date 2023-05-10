<script>
import SearchForm from './SearchForm.vue'

export default {
  name: 'Jumbotron',
  components: {
    SearchForm,
  },
  data() {
    return {
      currentBackground: 0,
      backgrounds: [
        '/public/backgrounds/background0.jpg',
        '/public/backgrounds/background1.jpg',
        '/public/backgrounds/background2.jpg',
        '/public/backgrounds/background3.jpg',
        '/public/backgrounds/background4.jpg',
        '/public/backgrounds/background5.jpg',
      ]
    }
  },
  mounted() {
    setInterval(() => {
      this.currentBackground = (this.currentBackground + 1) % this.backgrounds.length;
      const backgroundUrl = `url('${this.backgrounds[this.currentBackground]}')`;
      document.querySelector('.jumbotron').style.backgroundImage = backgroundUrl;
    }, 10000);
  }
}
</script>


<template>
  <div class="jumbotron d-flex justify-content-center align-items-center">
    <div class="container d-flex flex-column align-items-center">
      <h1 class="title mb-4">BoolBnB</h1>
      <SearchForm />
      <router-link to="/advanced-search">
        <button class="btn btn-secondary mt-4 d-flex align-items-center justify-content-center">
          Ricerca avanzata
        </button>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.jumbotron {
  height: 500px;
  background: linear-gradient(to bottom, #888, #fff);
  background-image: url("/public/backgrounds/background0.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  transition: background-image 1s ease-in-out;
}

.title {
  font-family: Arial, sans-serif;
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
  color: #fff;
  text-shadow: 1px 1px 1px #888;
}

button {
  background-color: rgba($color: #000000, $alpha: 0.6);
  color: white;
}
</style>
