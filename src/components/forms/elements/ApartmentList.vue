<template>
  <div class="row my-3">
    <div class="col-lg-3 mb-5">

      <!-- Filtro Ricerca -->
      <div class="row">
        <div id="filters" class="w-100" :class="{ 'd-none': !showFilters, 'd-lg-block': !showFilters }">
          <div class="card">
            <div class="card-header">Filtri Ricerca</div>

            <div class="card-body">
              <div class="row">
                <div class="col-md-6 col-sm-6 col-lg-12">
                  <!-- Dettagli stanze -->
                  <h4>Dettagli stanze</h4>
                  <hr>

                  <div class="row">
                    <div class="col-md-6 col-lg-12">
                      <label for="min_rooms_num">Numero minimo stanze</label>
                      <input class="form-control" type="number" id="min_rooms_num" v-model="filters.minRoomsNum"
                        @input="searchFilters" min="1" max="20">
                    </div>
                    <div class="col-md-6 col-lg-12">
                      <label for="max_rooms_num">Numero massimo stanze</label>
                      <input class="form-control" type="number" id="max_rooms_num" v-model="filters.maxRoomsNum"
                        @input="searchFilters" min="1" max="20">
                    </div>
                  </div>

                  <hr>

                  <div class="row">
                    <div class="col-md-6 col-lg-12">
                      <label for="min_beds">Numero minimo posti letto</label>
                      <input class="form-control" type="number" id="min_beds" v-model="filters.minBeds"
                        @input="searchFilters" min="1" max="20">
                    </div>
                    <div class="col-md-6 col-lg-12">
                      <label for="max_beds">Numero massimo posti letto</label>
                      <input class="form-control" type="number" id="max_beds" v-model="filters.maxBeds"
                        @input="searchFilters" min="1" max="20">
                    </div>
                  </div>

                  <hr>

                  <div class="row">
                    <div class="col-md-6 col-lg-12">
                      <label for="min_price">Prezzo minimo</label>
                      <input class="form-control" type="number" id="min_price" v-model="filters.minPrice"
                        @input="searchFilters" min="1" max="99999">
                    </div>
                    <div class="col-md-6 col-lg-12">
                      <label for="max_price">Prezzo massimo</label>
                      <input class="form-control" type="number" id="max_price" v-model="filters.maxPrice"
                        @input="searchFilters" min="1" max="99999">
                    </div>
                  </div>

                  <hr>
                </div>

                <div class="col-md-6 col-sm-6 col-lg-12">

                  <!-- Servizi -->
                  <h4>Lista servizi</h4>
                  <div v-for="service in services" :key="service.id">
                    <input type="checkbox" v-model="filters.listServices" :value="service.id" :id="service.id"
                      @input="searchFilters">
                    &nbsp;
                    <label :for="service.id">{{ service.name }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Aggiunta del pulsante per mostrare/nascondere i filtri -->
        <div class="toggle-filters-btn">
          <button @click="showFilters = !showFilters" class="d-lg-none mt-2">
            {{ showFilters ? 'Nascondi filtri' : 'Mostra filtri' }}
          </button>
        </div>
      </div>
    </div>
    <div class="col-lg-9 my">
      <h3>Apartamenti</h3> <!-- Aggiunta della scritta sopra le card -->
      <p>Trovat{{ filteredApartments.length !== 1 ? 'i' : 'o' }} {{ filteredApartments.length }} risultat{{
        filteredApartments.length !== 1 ? 'i' : 'o' }}.</p>
      <div class="d-flex flex-wrap">

        <!-- Appartamenti filtrati -->
        <div v-for="apartment in filteredApartments" :key="apartment.id" class="card mb-3" style="flex-basis: 100%;">
          <div class="row no-gutters">
            <!-- <div class="img-container position-relative">
              <img class="card-img-top rounded-top" :src="apartment.image" alt="Card image cap" />
              <div class="services">
                  <i v-for="service in apartment.services" :class="'me-3 text-light bi ' + service.icon"
                      :title="service.title"></i>
                  <div class="featured bg-warning bg-opacity-50">Consigliato</div>
              </div>
          </div> -->
            <div class="col-md-4 d-flex align-items-center justify-content-center position-relative">
              <img :src="apartment.image" class="card-img h-100" alt="Apartment Image">
              <div v-if="apartment.isSponsored"
                class="featured bg-warning bg-opacity-50 position-absolute start-50 translate-middle-x">
                Consigliato
              </div>
              <div class="services">
                <i v-for="service in apartment.services" :class="'me-3 text-light bi ' + service.icon"
                  :title="service.title"></i>
              </div>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ apartment.title }}</h5>
                <p class="card-text">{{ apartment.description }}</p>
                <div class="container">
                  <div class="row row-cols-4">
                    <div class="col">
                      <strong>Posti letto</strong>:
                      {{ apartment.single_beds + apartment.double_beds }}
                    </div>
                    <div class="col">
                      <strong>Bagni</strong>: {{ apartment.bathrooms }}
                    </div>
                    <div class="col">
                      <strong>Camere</strong>: {{ apartment.rooms }}
                    </div>
                    <div class="col">
                      <strong>mq</strong>: {{ apartment.square_meters }}
                    </div>
                  </div>
                </div>
                <div class="mt-3">
                  <p class="mb-0">
                    <strong>Servizi: </strong>
                    <span v-for="(service, index) in apartment.services">{{ service.title
                    }}<span v-if="index != apartment.services.length - 1">, </span>
                      <span v-else>.</span>
                    </span>
                  </p>
                </div>
              </div>
              <div class="card-footer mt-xxl-5 pt-xxl-5">
                <p class="card-text mb-2 text-success"><strong>{{ apartment.price }}</strong><span class="text-dark"> € /
                    notte</span></p>
                <hr>
                <router-link :to="'/apartment/' + apartment.id + '?advancedredirect'">
                  <span class="btn btn-secondary">Scopri di più</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAppartamenti } from '../../../mixins/api.js';
import TomTomMixin from '../../../mixins/TomTomMixin.js';
import { calculateDistance, degreesToRadians } from '../../../mixins/DistanceMixin';


export default {
  mixins: [TomTomMixin],
  props: {
    localita: {
      type: String,
      default: '',
    },
    raggio: {
      type: Number,
      required: true,
    },
    homeRedirect1: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      API_KEY: 'tg2x9BLlB0yJ4y7Snk5XhTOsnakmpgUO',
      apartments: [],
      filteredApartments: [],
      filters: {
        roomsNum: '',
        singleBeds: '',
        doubleBeds: '',
        listServices: [],
      },

      services: [
        { id: 1, name: 'Wi-Fi' },
        { id: 2, name: 'Piscina' },
        { id: 3, name: 'Posto auto' },
        { id: 4, name: 'Aria condizionata' },
        { id: 5, name: 'Terrazza panoramica' },
        { id: 6, name: 'Servizio di pulizia' },
        { id: 7, name: 'TV via cavo/satellite' },
        { id: 8, name: 'Servizio lavanderia' },
        { id: 9, name: 'Navetta aeroportuale' },
        { id: 10, name: 'Area barbecue' },
        { id: 11, name: 'Noleggio bici' },
        { id: 12, name: 'Self check-in' },
        { id: 13, name: 'Colazione inclusa' },
        { id: 14, name: 'Sauna' },
        { id: 15, name: 'Vista mare' },
        { id: 16, name: 'Portineria' },
      ],

      showFilters: false,
      coordinate: null,
    };
  },

  mounted() {
    setTimeout(() => {
      if (this.homeRedirect1 == true) {
        localStorage.clear();
        this.inputReset();
      }
    }, 100);
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

    'filters.minRoomsNum': {
      handler: function (newVal) {
        this.applyFilters();
        // Salva il valore corrente in sessionStorage
        sessionStorage.setItem('minRoomsNum', newVal);
      },
      immediate: true,
    },

    'filters.maxRoomsNum': {
      handler: function (newVal) {
        this.applyFilters();
        // Salva il valore corrente in sessionStorage
        sessionStorage.setItem('maxRoomsNum', newVal);
      },
      immediate: true,
    },

    'filters.minBeds': {
      handler: function (newVal) {
        this.applyFilters();
        // Salva il valore corrente in sessionStorage
        sessionStorage.setItem('minBeds', newVal);
      },
      immediate: true,
    },

    'filters.maxBeds': {
      handler: function (newVal) {
        this.applyFilters();
        // Salva il valore corrente in sessionStorage
        sessionStorage.setItem('maxBeds', newVal);
      },
      immediate: true,
    },

    'filters.minPrice': {
      handler: function (newVal) {
        this.applyFilters();
        // Salva il valore corrente in sessionStorage
        sessionStorage.setItem('minPrice', newVal);
      },
      immediate: true,
    },

    'filters.maxPrice': {
      handler: function (newVal) {
        this.applyFilters();
        // Salva il valore corrente in sessionStorage
        sessionStorage.setItem('maxPrice', newVal);
      },
      immediate: true,
    },

    'filters.listServices': {
      handler: function (newVal) {
        this.applyFilters();
        // Salva il valore corrente in sessionStorage
        sessionStorage.setItem('listServices', JSON.stringify(newVal));
      },
      immediate: true,
    },
  },

  methods: {
    // AGGIORNA LISTA APPARTAMENTI
    async updateList() {

      this.filters.minRoomsNum = sessionStorage.getItem('minRoomsNum') || '';
      this.filters.maxRoomsNum = sessionStorage.getItem('maxRoomsNum') || '';
      this.filters.minBeds = sessionStorage.getItem('minBeds') || '';
      this.filters.maxBeds = sessionStorage.getItem('maxBeds') || '';
      this.filters.minPrice = sessionStorage.getItem('minPrice') || '';
      this.filters.maxPrice = sessionStorage.getItem('maxPrice') || '';
      this.filters.listServices = JSON.parse(sessionStorage.getItem('listServices')) || [];
      try {
        // Continua con il normale processo di ricerca

        this.coordinate = await this.searchLocation(this.localita);
        if (this.coordinate) {
          const response = await getAppartamenti(
            this.coordinate.coordinate,
            this.raggio
          );
          if (response) {
            this.apartments = response;
            this.applyFilters();
          }
        }
      } catch (error) {
        console.error(error);
      }
    },

    // Verifica se l'appartamento ha una sponsorizzazione in corso
    checkSponsorship(apartment) {
      const currentDate = new Date();
      return apartment.plans.some((plan) => {
        const endDate = new Date(plan.pivot.end_date);
        return endDate > currentDate;
      });
    },

    applyFilters() {

      // Validazione dei valori di input
      const minRoomsNum = parseInt(this.filters.minRoomsNum);
      const maxRoomsNum = parseInt(this.filters.maxRoomsNum);
      const minBeds = parseInt(this.filters.minBeds);
      const maxBeds = parseInt(this.filters.maxBeds);
      const minPrice = parseInt(this.filters.minPrice);
      const maxPrice = parseInt(this.filters.maxPrice);



      // APPLICA FILTRI APPARTAMENTI
      this.filteredApartments = this.apartments.filter((apartment) => {
        // Filtro per il numero di stanze
        if (minRoomsNum && apartment.rooms < minRoomsNum) {
          return false;
        }

        // Filtro per il numero massimo di stanze
        if (maxRoomsNum && apartment.rooms > maxRoomsNum) {
          return false;
        }


        // Calcolo del numero di posti letto
        const calculatedBeds = apartment.single_beds + (apartment.double_beds * 2);

        // Filtro per il numero di posti letto
        if (
          (minBeds && calculatedBeds < minBeds) ||
          (maxBeds && calculatedBeds > maxBeds)
        ) {
          return false;
        }

        // Filtro per il prezzo
        if ((minPrice && parseInt(apartment.price) < minPrice) || (maxPrice && parseInt(apartment.price) > maxPrice)) {
          return false;
        }

        // Filtro per i servizi
        if (this.filters.listServices.length > 0) {
          for (const serviceId of this.filters.listServices) {
            if (!apartment.services.some((service) => service.id === serviceId)) {
              return false;
            }
          }
        }
        return true;
      });

      // Aggiorna la proprietà isSponsored per ogni appartamento
      for (const apartment of this.filteredApartments) {
        apartment.isSponsored = this.checkSponsorship(apartment);
      }

      // Ordina gli appartamenti per sponsorizzazione attiva e distanza
      this.filteredApartments.sort((a, b) => {
        // Ordina per sponsorizzazione attiva (decrescente)
        if (a.isSponsored && !b.isSponsored) {
          return -1;
        } else if (!a.isSponsored && b.isSponsored) {
          return 1;
        }

        // Ordina per distanza (seguendo il tuo codice originale)
        const distanceA = calculateDistance(
          this.coordinate.coordinate.lat,
          this.coordinate.coordinate.lon,
          a.latitude,
          a.longitude
        );
        const distanceB = calculateDistance(
          this.coordinate.coordinate.lat,
          this.coordinate.coordinate.lon,
          b.latitude,
          b.longitude
        );

        // Se entrambi gli appartamenti sono sponsorizzati o non sponsorizzati, ordina per distanza
        if (distanceA === distanceB) {
          return 0;
        } else {
          return distanceA < distanceB ? -1 : 1;
        }
      });
    },

    // RESETTA GLI INPUT DEI FILTRI
    inputReset() {
      this.filters.minRoomsNum = '';
      this.filters.maxRoomsNum = '';
      this.filters.minBeds = '';
      this.filters.maxBeds = '';
      this.filters.minPrice = '';
      this.filters.maxPrice = '';
      this.filters.listServices = [];
    },
  },
};
</script>

<style scoped>
.numType {
  max-width: 5rem;
  margin-top: 0.3rem;
}

.toggle-filters-btn {
  margin-top: 1rem;
  text-align: center;
}

.toggle-filters-btn button {
  background-color: #dc3555;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.border-red {
  border: 1px solid red;
  background-color: #dc3555;
}

.featured {
  color: white;
  text-align: center;
  bottom: 1.5rem;
  width: 92.5%;
  border-radius: 30px 30px 0px 0px;
  background-color: silver;
}

.services {
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 92.5%;
  text-align: center;
  border-radius: 0px 0px 5px 5px;
}
</style>