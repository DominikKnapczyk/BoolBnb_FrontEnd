<script>
import Card from './Card.vue';
import data from '../data.json';

export default {
  components: {
    Card
  },
  data() {
    return {
      apartments: data.apartments
    }
  }
}
</script>

<template>
  <div class="container card-container my-3">
    <div class="card-grid">
      <div v-for="apartment in apartments" :key="apartment.id" class="card-column">
        <Card :apartment="apartment" />
      </div>
    </div>
  </div>
</template>

<style>
.card-container {
  margin-top: 20px;
  margin-bottom: 20px;
  max-width: 1200px; /* limita la larghezza massima della griglia */
  margin: 0 auto; /* centra il contenitore della griglia */
}

.card-grid {
  display: grid;
  gap: 20px;
  margin: 0 auto;
  justify-content: center; /* Aggiunto per allineare al centro */
}

.card-column {
  display: flex;
  justify-content: center;
  width: 100%;
}

@media (max-width: 767px) {
  .card-column {
    width: 100%;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .card-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 2fr));
  }
}

@media (min-width: 992px) {
  .card-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, calc(25% - 20px)));
  }
}

.card-column {
  display: flex;
  justify-content: center;
}
</style>




