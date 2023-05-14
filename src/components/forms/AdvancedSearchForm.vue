<template>
  <div class="container">
    <!-- Form di ricerca avanzata -->
    <form @submit.prevent="searchApartments" class="mt-4">
      <div class="form-group">
        <!-- Input per la località -->
        <label>Località:</label>
        <input type="text" class="form-control" v-model="localita" />
      </div>

      <div class="form-group">
        <!-- Input per il raggio -->
        <label>Raggio (km):</label>
        <input type="number" class="form-control" v-model="radius" />
      </div>

      <div class="form-group">
        <!-- Select per la fascia di prezzo -->
        <label>Fascia di prezzo:</label>
        <select class="form-control" v-model="priceRange">
          <option value="">Tutti</option>
          <option value="0-50">0 - 50</option>
          <option value="50-100">50 - 100</option>
          <!-- Aggiungi altre opzioni di prezzo se necessario -->
        </select>
      </div>

      <!-- Altri filtri di ricerca -->
      <!-- ... -->

      <!-- Bottone per avviare la ricerca -->
      <button type="submit" class="btn btn-primary my-3">Cerca</button>
    </form>

    <!-- Elenco degli appartamenti trovati -->
    <div class="mt-4">
      <h3>Appartamenti trovati:</h3>
      <div v-for="apartment in filteredApartments" :key="apartment.id" class="card mt-3">
        <!-- Mostra le informazioni dell'appartamento -->
        <div class="card-body">
          <h5 class="card-title">{{ apartment.title }}</h5>
          <p class="card-text">{{ apartment.description }}</p>
          <!-- Aggiungi altre informazioni se necessario -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import TomTomMixin from '../../mixins/TomTomMixin.js';

export default {
  mixins: [TomTomMixin],

  data() {
    return {
      localita: '',
      radius: 20,
      priceRange: '',
      apartments: [],
    };
  },

  methods: {
    async searchApartments() {
      try {
        const coordinates = await this.searchLocation();

        // Stampa le coordinate su console
        console.log(`Latitudine: ${coordinates.lat}, Longitudine: ${coordinates.lon}`);

        // Esegui la chiamata al tuo backend per ottenere gli appartamenti filtrati
        const response = await axios.get('/api/apartments', {
          params: {
            radius: this.radius,
            priceRange: this.priceRange,
            latitude: coordinates.lat,
            longitude: coordinates.lon,
          },
        });

        this.apartments = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>


