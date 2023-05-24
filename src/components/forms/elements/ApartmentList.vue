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
                  <div>
                    <label for="min_rooms_num">Numero minimo stanze</label>
                    <input class="numType d-block" type="number" id="min_rooms_num" v-model="filters.minRoomsNum"
                      @input="searchFilters" min="1" max="20">
                  </div>

                  <div>
                    <label for="max_rooms_num">Numero massimo stanze</label>
                    <input class="numType d-block" type="number" id="max_rooms_num" v-model="filters.maxRoomsNum"
                      @input="searchFilters" min="1" max="20">
                  </div>

                  <hr>

                  <div>
                    <label for="min_beds">Numero minimo posti letto</label>
                    <input class="numType d-block" type="number" id="min_beds" v-model="filters.minBeds"
                      @input="searchFilters" min="1" max="20">
                  </div>
                  <div>
                    <label for="max_beds">Numero massimo posti letto</label>
                    <input class="numType d-block" type="number" id="max_beds" v-model="filters.maxBeds"
                      @input="searchFilters" min="1" max="20">
                  </div>
                  <hr>

                  <div>
                    <label for="min_price">Prezzo minimo</label>
                    <input class="numType d-block" type="number" id="min_price" v-model="filters.minPrice"
                      @input="searchFilters" min="1" max="99999">
                  </div>
                  <div>
                    <label for="max_price">Prezzo massimo</label>
                    <input class="numType d-block" type="number" id="max_price" v-model="filters.maxPrice"
                      @input="searchFilters" min="1" max="99999">
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
      <div class="d-flex flex-wrap">

        <!-- Appartamenti filtrati -->
        <div
            v-for="apartment in filteredApartments"
            :key="apartment.id"
            class="card mb-3"
            :class="{ 'border-danger': apartment.isSponsored }"
            style="flex-basis: 100%;"
          >
          <div class="row no-gutters">
            <div class="col-md-4 d-flex align-items-center justify-content-center ps-3">
              <img :src="apartment.image" class="card-img p-2 h-100" alt="Apartment Image">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ apartment.title }}</h5>
                <p class="card-text">{{ apartment.description }}</p>
              </div>
              <div class="card-footer mt-xxl-5 pt-xxl-5">
                <p class="card-text mb-2">{{ apartment.price }} € / notte</p>
                <hr>
                <router-link :to="'/apartment/' + apartment.id">
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
  },

  data() {
    return {
      API_KEY: 'TyAuLPU0fDwhRivYyXjSFgM91eRVywYA',
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
      handler: 'applyFilters',
      immediate: true,
    },
    'filters.maxRoomsNum': {
      handler: 'applyFilters',
      immediate: true,
    },
    'filters.minBeds': {
      handler: 'applyFilters',
      immediate: true,
    },
    'filters.maxBeds': {
      handler: 'applyFilters',
      immediate: true,
    },
    'filters.minPrice': {
      handler: 'applyFilters',
      immediate: true,
    },
    'filters.maxPrice': {
      handler: 'applyFilters',
      immediate: true,
    },
    'filters.listServices': {
      handler: 'applyFilters',
      immediate: true,
    },
  },

  methods: {
    // AGGIORNA LISTA APPARTAMENTI
    async updateList() {
      try {
        this.coordinate = await this.searchLocation(this.localita);
        console.log('Coordinate:', this.coordinate.coordinate);
        console.log('Raggio:', this.raggio);
        if (this.coordinate) {
          const response = await getAppartamenti(
            this.coordinate.coordinate,
            this.raggio
          );
          if (response) {
            this.apartments = response;
            this.applyFilters();
            console.log(this.filteredApartments);
          }
        }
      } catch (error) {
        console.error(error);
      }
    },

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
    }
  },
};
</script>

<style>
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

</style>