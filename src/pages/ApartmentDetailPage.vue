<script>
import NavBar from '../components/sections/NavBar.vue';
import Footer from '../components/sections/Footer.vue';
import axios from 'axios';
//import SponsoredCard from '../components/sections/elements/SponsoredCard.vue';
import SponsoredCard from '../components/sections/elements/SponsoredCard.vue';
//import data from '../../data.json';

export default {
  name: 'ApartmentDetailPage',

  /*props: {
    id: {
      type: String,
      required: true,
    },
  },*/

  data() {
    return {
      apartment: [],
    }
  },

  components: {
    NavBar,
    Footer,
    //Card,
    SponsoredCard,
  },

  created() {
    const apartmentId = this.$route.params.id;
    console.log(apartmentId);

    axios
      .get(`http://localhost:8000/api/apartments/${apartmentId}`)
      .then(response => {
        let appartamento = response.data;
        this.apartment = appartamento[0];
        console.log(appartamento);
      })
      .catch(error => {
        console.error(error);
      });
    /*.get(`http://localhost:8000/api/apartments/15`)
    .then((response) => {
      this.apartment = response.data[0];
      console.log(this.apartment);
    })*/
  },
}
</script>

<template>
  <NavBar />

  <div class="card-container my-5">
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-end">
        <div>
          <h4 class="card-title">{{ apartment.title }}</h4>
          <p class="fw-semibold mt-3">Indirizzo: {{ apartment.address }}</p>
        </div>
        <div class="fw-semibold mb-3">
          Prezzo: <span class="text-success">{{ apartment.price }} €</span> / notte
        </div>
      </div>
      <img class="card-img-top rounded-top w-100 p-5" :src="apartment.image" alt="">
      <div class="card-body pb-4">
        <h5>Descrizione:</h5>
        <p>
          {{ apartment.description }}
        </p>
        <hr>
        <h5>Caratteristiche: </h5>
        <ul>
          <li>Metratura: {{ apartment.square_meters }} mq</li>
          <li>Stanze: {{ apartment.rooms }}</li>
          <li>Bagni: {{ apartment.bathrooms }}</li>
          <li>Letti doppi: {{ apartment.double_beds }}</li>
          <li>Letti singoli: {{ apartment.single_beds }}</li>
        </ul>
        <hr>
        <h5>Servizzi aggiuntivi:</h5>
        <i v-for="service in apartment.services" :class="'me-3 text-dark bi ' + service.icon" :title="service.title"></i>
      </div>
    </div>
  </div>

  <Footer />
</template>

<style scoped>
footer {}
</style>