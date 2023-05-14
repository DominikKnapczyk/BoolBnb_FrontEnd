<script>
import HomeSearchForm from '../forms/HomeSearchForm.vue'

export default {
  name: 'Jumbotron',
  components: {
    HomeSearchForm,
  },
  data() {
    return {
      currentBackground: 0,
      backgrounds: [
        '/backgrounds/background0.jpg',
        '/backgrounds/background1.jpg',
        '/backgrounds/background2.jpg',
        '/backgrounds/background3.jpg',
        '/backgrounds/background4.jpg',
        '/backgrounds/background5.jpg',
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
      <HomeSearchForm />
      <router-link to="/advanced-search">
        <button class="btn btn-outline-secondary mt-4">
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
  background-image: url("/backgrounds/background0.jpg");
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