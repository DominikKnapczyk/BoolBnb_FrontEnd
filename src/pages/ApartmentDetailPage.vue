<script>
import NavBar from '../components/sections/NavBar.vue';
import Footer from '../components/sections/Footer.vue';
import axios from 'axios';
//import SponsoredCard from '../components/sections/elements/SponsoredCard.vue';
//import Card from './elements/SponsoredCard.vue';
//import data from '../../data.json';

export default {
  name: 'ApartmentDetailPage',

  props: {
    apartment: Object,
  },

  components: {
    NavBar,
    Footer,
    //Card,
    //SponsoredCard,
  },

  created() {
    axios
      .get(`http://localhost:8000/api/apartments/21`)
      .then((response) => {
        this.appartment = response.data;
      })
  },
}
</script>

<template>
  <NavBar />

  <div class="card-container my-5">
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-end">
        <div>
          <h4 class="card-title">Titolo appartamento</h4>
          <p class="fw-semibold mt-3">Indirizzo: Milano</p>
        </div>
        <div class="fw-semibold mb-3">Prezzo: 50.00 € / notte</div>
      </div>
      <img class="card-img-top rounded-top w-100 p-5" src="https://picsum.photos/id/1015/800/600" alt="">
      <div class="card-body pb-4">
        <h5>Descrizione:</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, tempore nam?
          Rerum fugit, similique obcaecati reiciendis nihil dolorum vel nisi laudantium
          unde laboriosam explicabo corporis consequuntur culpa nam, temporibus tempora?
        </p>
        <hr>
        <h5>Caratteristiche: </h5>
        <ul>
          <li>caratteristica</li>
          <li>caratteristica</li>
          <li>caratteristica</li>
          <li>caratteristica</li>
        </ul>
        <hr>
        <h5>Servizzi aggiuntivi:</h5>
        piscina
      </div>
    </div>
  </div>

  <Footer />
</template>

<style scoped>
footer {}
</style>