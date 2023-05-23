<script>
import NavBar from "../components/sections/NavBar.vue";
import MessageForm from "../components/forms/MessageForm.vue";
import Footer from "../components/sections/Footer.vue";
import axios from "axios";
import SponsoredCard from "../components/sections/elements/SponsoredCard.vue";
//import SponsoredCard from '../components/sections/elements/SponsoredCard.vue';
//import data from '../../data.json';

export default {
  //name: "ApartmentDetailPage",
  name: "apartmentDetails",

  data() {
    return {
      apartment: "",
      /* Script per cambiare colore a seconda della sponsorizzazione */
      isActive: false,
      goldColor: "gold",
      silverColor: "silver",
      bronzeColor: "bronze",
    };
  },

  components: {
    NavBar,
    Footer,
    MessageForm,
    SponsoredCard,
  },

  created() {
    const apartmentId = this.$route.params.id;
    console.log(apartmentId);

    axios
      .get(`http://localhost:8000/api/apartments/${apartmentId}`)
      .then((response) => {
        this.apartment = response.data;
        console.log(this.apartment);

        /* Script per cambiare colore a seconda della sponsorizzazione */
        const goldPlan = this.apartment.plans.find(
          (plan) => plan.title === "Gold"
        );
        const silverPlan = this.apartment.plans.find(
          (plan) => plan.title === "Silver"
        );
        const bronzePlan = this.apartment.plans.find(
          (plan) => plan.title === "Bronze"
        );

        const currentDate = new Date().toISOString();

        this.isActive = goldPlan && goldPlan.pivot.end_date > currentDate;
        this.goldColor = this.isActive ? "gold-active" : "gold";
        /*const goldPlan = this.apartment.plans.find((plan) => plan.title === "Gold");
        const currentDate = new Date().toISOString();
        this.isActive = goldPlan && goldPlan.pivot.end_date > currentDate;*/
      })

      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<template>
  <NavBar />

  <div class="card-container my-5">
    <router-link :to="'/advanced-search'">
      <button class="btn btn-outline-secondary mb-3">Torna alla ricerca</button>
    </router-link>
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-end" :class="{
        'gold': isActive,
        'silver': !isActive && apartment.plans.some((plan) => plan.title === 'Silver'),
        'bronze': !isActive && apartment.plans.some((plan) => plan.title === 'Bronze'),
      }">
        <div>
          <h4 class="card-title">{{ apartment.title }}</h4>
          <p class="fw-semibold mt-3">Indirizzo: {{ apartment.address }}</p>
        </div>
        <div class="fw-semibold mb-3">
          Prezzo: <span class="text-success">{{ apartment.price }} €</span> /
          notte
        </div>
      </div>
      <img class="card-img-top rounded-top w-100 p-5" :src="apartment.image" alt="" />
      <div class="card-body pt-0 pb-4">
        <h5>Descrizione:</h5>
        <p>
          {{ apartment.description }}
        </p>
        <hr />
        <h5>Caratteristiche:</h5>
        <ul>
          <li>Metratura: {{ apartment.square_meters }} mq</li>
          <li>Stanze: {{ apartment.rooms }}</li>
          <li>Bagni: {{ apartment.bathrooms }}</li>
          <li>Letti doppi: {{ apartment.double_beds }}</li>
          <li>Letti singoli: {{ apartment.single_beds }}</li>
        </ul>
        <hr />
        <h5>Servizzi aggiuntivi:</h5>
        <!--<i v-for="service in apartment.services" :class="'me-3 text-dark bi ' + service.icon" :title="service.title"></i>-->
        <div class="card d-flex flex-row justify-content-between text-center p-2" v-if="apartment.services.length">
          <p class="m-0" v-for="service in apartment.services" :key="service.id">
            <i :class="'bg-secondary rounded text-light fs-5 me-2 p-1 bi ' + service.icon" :title="service.title"></i><br>
            {{ service.title }}
          </p>
        </div>
        <div v-else>
          <p>Nessun servizio aggiuntivo.</p>
        </div>

        <div class="my-2">
          <MessageForm :apartmentId="apartment.id" />
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<style scoped>
.gold {
  background: linear-gradient(45deg, #ffd700, #e6ac00);
}

.silver {
  background: linear-gradient(45deg, #808080, #c0c0c0);
}

.bronze {
  background: linear-gradient(45deg, #aa591f, #cb833c);
}
</style>
