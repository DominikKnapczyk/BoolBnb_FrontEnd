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
  <div class="container card-container gx-4">
    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4 px-md-2" v-for="apartment in apartments" :key="apartment.id">
        <Card :apartment="apartment" />
      </div>
    </div>
  </div>
</template>



<style>
.card-container {
  margin-top: 20px;
  margin-bottom: 20px;
}

.card {
  margin-bottom: 20px;
}
</style>