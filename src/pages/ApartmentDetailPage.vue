<script>
import NavBar from '../components/sections/NavBar.vue';
//import SponsoredCard from '../components/sections/elements/SponsoredCard.vue';
import Footer from '../components/sections/Footer.vue';
//import Card from './elements/SponsoredCard.vue';
//import data from '../../data.json';

export default {
  props: ['apartment'],

  name: 'ApartmentDetailPage',

  components: {
    //SponsoredCard,
    NavBar,
    Footer,
    //Card,
  },
}
</script>

<template>
  <NavBar />
  <div class="card-container">
    <div class="card">
      <img class="card-img-top rounded-top p-2" src="" alt="">
      <div class="card-body">
        <h5 class="card-title">dettaglio</h5>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
footer {
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>