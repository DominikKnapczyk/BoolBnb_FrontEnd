<script>
import Card from "./elements/SponsoredCard.vue";
import Slider from "./elements/SliderCard.vue";
import axios from "axios";
// import data from "../../data.json";

export default {
  components: {
    Card,
    Slider,
  },
  data() {
    return {
      apartments: [],
      apartment: "",
      currentPage: 1,
      apartmentsPerPage: 3,
    };
  },
  created() {
    axios.get("http://127.0.0.1:8000/api/sponsored/all").then((response) => {
      this.apartments = response.data;
      this.updateApartmentsPerPage(); // Aggiorniamo apartmentsPerPage all'inizio
    })
      .catch((error) => {
        console.error(error);
      });

    window.addEventListener("resize", this.updateApartmentsPerPage); // Aggiorniamo apartmentsPerPage durante il ridimensionamento dello schermo

    // axios
    //   .get("http://127.0.0.1:8000/api/sponsored/gold/4/random")
    //   .then((response) => {
    //     let apartmentsIndex = response.data;
    //     apartmentsIndex.forEach((apartment) => {
    //       if (apartment.plans.length > 0) {
    //         apartment.piano = "gold";
    //         this.apartments.push(apartment);
    //       }
    //     });
    //     axios
    //       .get("http://127.0.0.1:8000/api/sponsored/silver/4/random")
    //       .then((response) => {
    //         let silverIndex = response.data;
    //         silverIndex.forEach((apartment) => {
    //           if (apartment.plans.length > 0) {
    //             apartment.piano = "silver";
    //             this.apartments.push(apartment);
    //           }
    //         });
    //       })
    //       .finally(() => {
    //         axios
    //           .get("http://127.0.0.1:8000/api/sponsored/bronze/4/random")
    //           .then((response) => {
    //             let bronzeIndex = response.data;
    //             bronzeIndex.forEach((apartment) => {
    //               if (apartment.plans.length > 0) {
    //                 apartment.piano = "bronze";
    //                 this.apartments.push(apartment);
    //               }
    //             });
    //           });
    //       });
    //   });
    // console.log(this.apartments);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.updateApartmentsPerPage); // Rimuoviamo l'ascoltatore durante la distruzione del componente
  },

  computed: {
    currentPageApartments() {
      const startIndex = (this.currentPage - 1) * this.apartmentsPerPage;
      const endIndex = startIndex + this.apartmentsPerPage;
      return this.apartments.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.apartments.length / this.apartmentsPerPage);
    },
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    updateApartmentsPerPage() {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 992) {
        this.apartmentsPerPage = 3;
      } else if (screenWidth >= 768) {
        this.apartmentsPerPage = 2;
      } else {
        this.apartmentsPerPage = 1;
      }
    },
  },
};
</script>

<template>
  <!-- CAROSELLO -->
  <div class="container card-container my-3">
    <h2 class="text-center mb-4">Appartamenti consigliati da noi</h2>
    <div class="position-relative">
      <button @click="prevPage()" class="btn btn-outline-secondary position-absolute top-50 start-0 translate-middle ">
        <i class="bi bi-chevron-left"></i>
      </button>
      <div class="card-grid">
        <div v-for="(apartment, index) in currentPageApartments" :key="apartment.id">
          <div class="card-column h-100">
            <Slider :apartment="apartment" />
          </div>
        </div>
      </div>
      <button @click="nextPage()" class="btn btn-outline-secondary position-absolute top-50 start-100 translate-middle">
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  </div>

  <hr class="my-5">

  <div class="container card-container my-2">
    <h2 class="text-center mb-3">Appartamenti in evidenza</h2>
    <div class="card-grid">
      <div v-for="(apartment, index) in apartments" :key="apartment.id">
        <div class="card-column h-100">
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
