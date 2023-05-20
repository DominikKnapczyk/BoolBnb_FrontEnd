<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-6">
        <form class="mt-4" @submit.prevent @submit="submitForm">
          <div class="form-group">

            <label>Posizione selezionata:</label>
            <!-- Input per la località -->
            <div class="autocomplete-wrapper">
              <input type="text" class="form-control" placeholder="Inserisci la località" v-model="localita"
                @input="autocomplete" @blur="onBlurInput" @focus="onFocusInput"
                @keydown.arrow-up.prevent="selezionaSuggerimentoPrecedente"
                @keydown.arrow-down.prevent="selezionaSuggerimentoSuccessivo"
                @keydown.enter="selezionaSuggerimentoAttuale" />

              <div v-if="suggerimenti.length > 0 && isInputFocused" class="autocomplete">
                <ul class="list-group">
                  <li v-for="(suggerimento, index) in suggerimenti" :key="index" class="list-group-item"
                    @mousedown="selezionaSuggerimento(suggerimento)"
                    :class="{ 'selected': index === suggerimentoAttualeIndex }">
                    {{ suggerimento }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="form-group my-2">
            <!-- Input per il raggio -->
            <label>Raggio (km):</label>
            <input type="number" class="form-control" v-model="raggio" />
          </div>


        </form>
      </div>
      <div class="col-md-6 col-sm-12 d-none d-sm-block">
        <LiveMap ref="liveMap" :coordinate_localita="coordinate_localita" :localita="localita" :raggio="raggio" />
      </div>

      <div class="container">
      <AppartamentList :filters="filters" :localita="localita" :raggio="raggio" />
      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios';
import TomTomMixin from '../../mixins/TomTomMixin.js';
import SuggestionMixin from '../../mixins/SuggestionMixin.js';
import { getAppartamenti } from '../../mixins/api.js';
import router from '../../router';
import LiveMap from './elements/LiveMap.vue';
import AppartamentList from './elements/ApartmentList.vue';

export default {
  components: {
    LiveMap,
    AppartamentList,
  },

  mixins: [TomTomMixin, SuggestionMixin],

  data() {
    return {
      localita: '',
      raggio: '',
      coordinate_localita: '',
      autocompilato: false,
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

  mounted() {
    const query = this.$route.query;
    if (query.raggio && query.coordinate_localita && !this.autocompilato) {
      this.raggio = query.raggio;
      this.localita = query.coordinate_localita;
      this.autocompilato = true;
    } else {
      // Imposta la posizione di Roma come predefinita
      this.localita = '';
    }
  },



  methods: {
    async updateMap() {
      const response = await this.searchLocation();
      const coordinate = response.coordinate;
      const raggio = this.raggio;

      if (coordinate) {
        const mapComponent = this.$refs.liveMap; // Riferimento al componente LiveMap
        mapComponent.updateMap(coordinate); // Chiamiamo il metodo `updateMap` del componente LiveMap

        // Calcola lo zoom in base al raggio
        const zoom = this.calculateZoom(raggio);

        // Aggiorna lo zoom della mappa
        mapComponent.updateZoom(zoom);
      }
    },


  },
};
</script>

<style lang="scss" scoped>
button {
  background-color: rgba($color: #000000, $alpha: 0.6);
  color: white;
  height: 60px;
}

input {
  height: 60px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

input:focus {
  outline: #323232;
  box-shadow: none;
}

.autocomplete-wrapper {
  position: relative;
  display: flex;
  align-items: stretch;
  flex: 1;
}

.autocomplete {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1;
}

.autocomplete ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.autocomplete li {
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  transition: 0.1s;
}

.autocomplete li:hover {
  background-color: rgba($color: #000000, $alpha: 0.6);
  color: white;
}

.autocomplete li button {
  margin-left: auto;
  margin-right: 10px;
  background-color: rgba($color: #000000, $alpha: 0.6);

  border: none;
  padding: 5px 10px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.autocomplete li button:hover {
  background-color: rgba($color: #000000, $alpha: 0.2);
}

.autocomplete li.selected {
  background-color: rgba($color: #000000, $alpha: 0.6);
  color: white;
}

.map {
  height: 400px;
  /* Aggiungi un'altezza appropriata alla mappa */
  width: 100%;
  /* Assicurati che la mappa si estenda completamente all'interno del contenitore */
}

#filters {
  max-width: 15rem;
}

.numType {
  max-width: 5rem;
  margin-top: 0.3rem;
}
</style>