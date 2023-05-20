<template>
  <div class="row my-3">
    <div class="col-lg-3 mb-5">
      <!-- Filtro Ricerca -->
      <div class="row">
        <div
          id="filters"
          class="w-100"
          :class="{ 'd-none': !showFilters, 'd-lg-block': !showFilters }"
        >
          <div class="card">
            <div class="card-header">Filtri Ricerca</div>

            <div class="card-body">
              <div class="row">
                <div class="col-md-6 col-sm-6 col-lg-12">
                  <h4>Dettagli stanze</h4>
                  <hr>
                  <div>
                    <label for="min_rooms_num">Numero minimo stanze</label>
                    <input
                      class="numType d-block"
                      type="number"
                      id="min_rooms_num"
                      v-model="filters.minRoomsNum"
                      @input="searchFilters"
                      min="1"
                      max="20"
                    >
                  </div>

                  <div>
                    <label for="max_rooms_num">Numero massimo stanze</label>
                    <input
                      class="numType d-block"
                      type="number"
                      id="max_rooms_num"
                      v-model="filters.maxRoomsNum"
                      @input="searchFilters"
                      min="1"
                      max="20"
                    >
                  </div>

                  <hr>

                  <div>
                    <label for="min_beds">Numero minimo posti letto</label>
                    <input
                      class="numType d-block"
                      type="number"
                      id="min_beds"
                      v-model="filters.minBeds"
                      @input="searchFilters"
                      min="1"
                      max="20"
                    >
                  </div>
                  <div>
                    <label for="max_beds">Numero massimo posti letto</label>
                    <input
                      class="numType d-block"
                      type="number"
                      id="max_beds"
                      v-model="filters.maxBeds"
                      @input="searchFilters"
                      min="1"
                      max="20"
                    >
                  </div>
                  <hr>

                    <div>
                      <label for="min_price">Prezzo minimo</label>
                      <input
                        class="numType d-block"
                        type="number"
                        id="min_price"
                        v-model="filters.minPrice"
                        @input="searchFilters"
                        min="1"
                        max="99999"
                      >
                    </div>
                    <div>
                      <label for="max_price">Prezzo massimo</label>
                      <input
                        class="numType d-block"
                        type="number"
                        id="max_price"
                        v-model="filters.maxPrice"
                        @input="searchFilters"
                        min="1"
                        max="99999"
                      >
                    </div>
                    <hr>
                </div>
                <div class="col-md-6 col-sm-6 col-lg-12">
                  <h4>Lista servizi</h4>
                  <!-- Iterazione dei servizi -->
                  <div v-for="service in services" :key="service.id">
                    <input
                      type="checkbox"
                      v-model="filters.listServices"
                      :value="service.id"
                      :id="service.id"
                      @input="searchFilters"
                    >
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
        <!-- Iterazione degli appartamenti filtrati -->
        <div
          v-for="apartment in filteredApartments"
          :key="apartment.id"
          class="card mb-3"
          style="flex-basis: 100%;"
        >
          <div class="row no-gutters">
            <div class="col-md-4 d-flex align-items-center justify-content-center ps-3">
              <img
                :src="apartment.image"
                class="card-img p-2 h-100"
                alt="Apartment Image"
              >
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ apartment.title }}</h5>
                <p class="card-text">{{ apartment.description }}</p>
              </div>
              <div class="card-footer mt-xxl-5 pt-xxl-5">
                <p class="card-text mb-2">{{ apartment.price }} € / notte</p>
                <hr>
                <a href="#" class="btn btn-secondary">Scopri di più</a>
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
    async updateList() {
      try {
        const coordinate = await this.searchLocation(this.localita);
        console.log('Coordinate:', coordinate);
        console.log('Raggio:', this.raggio);
        if (coordinate) {
          const response = await getAppartamenti(
            coordinate.coordinate,
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
applyFilters() {
  this.filteredApartments = this.apartments.filter((apartment) => {
    // Filtro per il numero di stanze
    if (
      (this.filters.minRoomsNum && apartment.rooms < parseInt(this.filters.minRoomsNum)) ||
      (this.filters.maxRoomsNum && apartment.rooms > parseInt(this.filters.maxRoomsNum))
    ) {
      return false;
    }

    // Calcolo del numero di posti letto
    const calculatedBeds = apartment.single_beds + apartment.double_beds * 2;

    // Filtro per il numero di posti letto
    if (
      (this.filters.minBeds && calculatedBeds < parseInt(this.filters.minBeds)) ||
      (this.filters.maxBeds && calculatedBeds > parseInt(this.filters.maxBeds))
    ) {
      return false;
    }

    // Filtro per il numero di posti letto
    if (
    (this.filters.minPrice && parseInt(apartment.price) < parseInt(this.filters.minPrice)) ||
    (this.filters.maxPrice && parseInt(apartment.price) > parseInt(this.filters.maxPrice))
    ) {
      return false;
    }


    // Filtro per i servizi
    if (this.filters.listServices.length > 0) {
      console.log("ciao")
      for (const serviceId of this.filters.listServices) {
        if (!apartment.services.some(service => service.id === serviceId)) {
          return false;
        }

      }
    }
    console.log("Letto");
    console.log(this.apartments[0].double_beds);
    console.log(this.apartments);
    console.log(this.filteredApartments);
    return true;
  });
},


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
</style>