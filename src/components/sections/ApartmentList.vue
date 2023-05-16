<template>
  <div class="container card-container my-3">
    <div class="card-grid">
      <div v-for="apartment in apartments" :key="apartment.id" class="card-column">
        <Card :apartment="apartment" />
      </div>
    </div>
  </div>
</template>

<script>
import Card from './elements/SponsoredCard.vue';
import data from '../../data.json';

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