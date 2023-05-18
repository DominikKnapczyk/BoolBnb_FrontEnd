<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-6">
        <form class="mt-4" @submit.prevent>
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

          <!-- <button @click="ricerca">CERCA</button> -->
        </form>
      </div>
      <div class="col-6">
        <LiveMap ref="liveMap" :coordinate_localita="coordinate_localita" :localita="localita" :raggio="raggio" />
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

export default {
  components: {
    LiveMap
  },

  mixins: [TomTomMixin, SuggestionMixin],

  data() {
    return {
      localita: '',
      raggio: '',
      coordinate_localita: '',
      autocompilato: false,
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

    calculateZoom(raggio) {
      // Definisci i valori di raggio e corrispondenti zoom
      const zoomValues = [
        { raggioMax: 1, zoom: 15 },
        { raggioMax: 5, zoom: 14 },
        { raggioMax: 10, zoom: 13 },
        { raggioMax: 20, zoom: 12 },
        { raggioMax: 50, zoom: 11 },
        { raggioMax: 100, zoom: 10 },
        { raggioMax: 200, zoom: 9 },
        { raggioMax: 500, zoom: 8 },
        { raggioMax: 1000, zoom: 7 },
        { raggioMax: 2000, zoom: 6 },
        { raggioMax: 5000, zoom: 5 },
        { raggioMax: 10000, zoom: 4 },
        { raggioMax: 20000, zoom: 3 },
        { raggioMax: 50000, zoom: 2 },
        { raggioMax: 100000, zoom: 1 },
        { raggioMax: 200000, zoom: 0 },
        // Aggiungi altri valori di raggio e zoom se necessario
      ];

      // Trova il valore di zoom corrispondente al raggio
      let zoom = 12; // Imposta uno zoom di default
      for (const value of zoomValues) {
        if (raggio <= value.raggioMax) {
          zoom = value.zoom;
          break;
        }
      }

      return zoom;
    },


    async ricerca() {
      const response = await this.searchLocation();
      const coordinate = response.coordinate;
      const raggio = this.raggio;

      if (coordinate) {
        const appartamenti = await getAppartamenti(coordinate, raggio);

        if (appartamenti !== null) {
          // GENERA LE CARD SE IL BACKEND RESTITUISCE UN ARRAY DI APPARTAMENTI
        }
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
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
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
</style>