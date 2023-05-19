<template>
  <div class="row">
    <div class="col-3">
        <div class="row">
           <div id="filters" class="col ms-4">
               <div class="card">
                  <div class="card-header">Filtri Ricerca</div>
                   <div class="card-body">
                      <h3>Dettagli stanze</h3>
                    <div>
                   <label for="rooms_num">Numero stanze</label>
                   <input class="numType" type="number" id="rooms_num" v-model="filters.roomsNum" @input="searchFilters">
                 </div>
                  <hr>
                 <div>
              <label for="single_beds">Numero letti singoli</label>
              <input class="numType" type="number" id="single_beds" v-model="filters.singleBeds" @input="searchFilters">
            </div>
            <hr>
            <div>
              <label for="double_beds">Numero letti matrimoniali</label>
              <input class="numType" type="number" id="double_beds" v-model="filters.doubleBeds" @input="searchFilters">
            </div>
            <hr>
            <div id="listServices">
              <h3>Lista servizi</h3>
              <div v-for="service in services" :key="service.id">
                <input type="checkbox" v-model="filters.listServices" :value="service.id" :id="service.id" @input="searchFilters">
                <label class="ms-2" :for="service.id">{{ service.name }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


    <!-- LISTA GENERATA -->
    <div class="col-8 m-3">
      <div class="card-grid">
        <div v-for="apartment in filteredApartments" :key="apartment.id" class="card-column">
          <div class="card">
            <img :src="apartment.image" class="card-img-top" alt="Apartment Image">
            <div class="card-body">
              <h5 class="card-title">{{ apartment.title }}</h5>
              <p class="card-text">{{ apartment.description }}</p>
              <p class="card-text">Price: {{ apartment.price }}</p>
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
    'filters.roomsNum': {
    handler: 'applyFilters',
    immediate: true
  },
  'filters.singleBeds': {
    handler: 'applyFilters',
    immediate: true
  },
  'filters.doubleBeds': {
    handler: 'applyFilters',
    immediate: true
  },
  'filters.listServices': {
    handler: 'applyFilters',
    immediate: true
  }
  },
  methods: {
    async updateList() {
      try {
        const coordinate = await this.searchLocation(this.localita);
        console.log('Coordinate:', coordinate);
        console.log('Raggio:', this.raggio);
        if (coordinate) {
          const response = await getAppartamenti(coordinate.coordinate, this.raggio);
          // console.log('Response:', response);
          if (response) {
            this.apartments = response;
            console.log(this.apartments);
            this.applyFilters();
            
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    applyFilters() {
  this.filteredApartments = this.apartments.filter(apartment => {
    // Filtro per il numero di stanze
    if (this.filters.roomsNum && apartment.rooms !== parseInt(this.filters.roomsNum)) {
      return false;
    }
    
    // Filtro per il numero di letti singoli
    if (this.filters.singleBeds && apartment.singleBeds !== parseInt(this.filters.singleBeds)) {
      return false;
    }
    
    // Filtro per il numero di letti matrimoniali
    if (this.filters.doubleBeds && apartment.doubleBeds !== parseInt(this.filters.doubleBeds)) {
      return false;
    }
    
    // Filtro per i servizi
    if (this.filters.listServices.length > 0) {
      for (const serviceId of this.filters.listServices) {
        if (!apartment.services.includes(serviceId)) {
          return false;
        }
      }
    }
    
    return true;
  });
}





  },
};
</script>

<style>
#filters {
  max-width: 15rem;
}

.numType {
  max-width: 5rem;
  margin-top: 0.3rem;
}
</style>
