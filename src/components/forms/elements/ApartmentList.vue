<template>
  <div class="container card-container my-3">
    <div class="card-grid">
      <div v-for="apartment in apartments" :key="apartment.id" class="card-column">
        <div class="card">
          <img :src="apartment.image" class="card-img-top" alt="Apartment Image">
          <div class="card-body">
            <h5 class="card-title">{{ apartment.title }}</h5>
            <p class="card-text">{{ apartment.description }}</p>
            <p class="card-text">Price: {{ apartment.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAppartamenti } from '../../../mixins/api.js';
import TomTomMixin from '../../../mixins/TomTomMixin.js';

export default {
  mixins: [TomTomMixin], // Aggiungi il mixin al componente
  props: {
    localita: {
      type: String,
      default: '',
    },
    raggio: {
      type: Number,
      required: true,
    },
    listServices: Array,
    roomsNum: Number,
    singleBeds: Number,
    doubleBeds: Number
  },
  data() {
    return {
      API_KEY: 'tg2x9BLlB0yJ4y7Snk5XhTOsnakmpgUO',
      apartments: [],
    };
  },
  watch: {
    localita: {
      handler: 'updateList',
      immediate: true,
    },
    raggio: {
      handler: 'updateList',
      immediate: true,
    },
  },
  methods: {
    async updateList() {
      try {
        const coordinate = await this.searchLocation(this.localita);
        console.log('Coordinate:', coordinate);
        console.log('Raggio:', this.raggio);
        if (coordinate) {
          const response = await getAppartamenti(coordinate.coordinate, this.raggio);
          console.log('Response:', response);
          if (response) {
            this.apartments = response;
          }
        }
      } catch (error) {
        console.error(error);
      }
    },

  },
};
</script>

<style>
/* Stili del componente */
</style>
