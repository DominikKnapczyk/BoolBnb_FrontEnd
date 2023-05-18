<script>
import Card from "./elements/SponsoredCard.vue";
// import data from "../../data.json";
import axios from "axios";

export default {
  components: {
    Card,
  },
  data() {
    return {
      apartments: [],
    };
  },
  created() {
    axios.get("http://127.0.0.1:8000/api/apartments").then((response) => {
      let apartmentsIndex = response.data.data;
      apartmentsIndex.forEach((apartment) => {
        if (apartment.plans.length > 0) {
          this.apartments.push(apartment);
        }
      });
    });
  },
};
</script>

<template>
  <div class="container card-container my-3">
    <h2 class="text-center mb-3">Appartamenti in evidenza</h2>
    <div class="card-grid">
      <div v-for="(apartment, index) in apartments" :key="apartment.id">
        <div class="card-column h-100" v-if="index < 4">
          <Card :apartment="apartment" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css");

.card-container {
  margin-top: 20px;
  margin-bottom: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.card-grid {
  display: grid;
  gap: 20px;
  margin: 0 auto;
  justify-content: center;
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
