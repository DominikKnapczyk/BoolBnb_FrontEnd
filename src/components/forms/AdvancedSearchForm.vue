<template>
  <div class="container my-5">
    <div class="row">
      <div :class="{'col-md-6': isRaggioValido && isLocalitaValida && localita !== '', 'col-12': !(isRaggioValido && isLocalitaValida && localita !== '')}">
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
            <span v-if="localita.length < 2 && localita.length !== 0" class="text-danger">Inserisci una località valida</span>
          </div>
          <div class="form-group my-2">
            <!-- Input per il raggio -->
            <label>Raggio (km):</label>
            <input type="number" class="form-control" v-model="raggio" min="1" max="999" />
            <span v-if="!isRaggioValido && raggio !== ''" class="text-danger">Il raggio deve essere compreso tra 1 e 999 km</span>
          </div>
        </form>
      </div>
      <div v-if="!isRaggioValido || !isLocalitaValida" class="text-center mt-5">
        <h2 class="fw-bold text-danger display-8">Inserisci una località e un raggio per avviare la ricerca</h2>
      </div>

      <div class="col-md-6 col-sm-12 d-none d-sm-block">
        <LiveMap ref="liveMap" :coordinate_localita="coordinate_localita" :localita="localita" :raggio="raggio" v-if="isRaggioValido && isLocalitaValida && localita !== ''" />
      </div>

      <div class="container">
        <AppartamentList  :localita="localita" :raggio="raggio !== '' ? Number(raggio) : 0" :homeRedirect1="homeRedirect1" v-if="isRaggioValido && isLocalitaValida" />
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
      timer: null, // variabile per memorizzare l'ID del timer
      filters: {
        roomsNum: '',
        singleBeds: '',
        doubleBeds: '',
        listServices: [],
      },
    };
  },

  computed: {
    isRaggioValido() {
      return this.raggio >= 1 && this.raggio <= 999;
    },
    isLocalitaValida() {
      return this.localita.length >= 2;
    },
  },

  mounted() {
    const query = this.$route.query;

    if (query.raggio && query.coordinate_localita && !this.autocompilato) {
      this.raggio = Number(query.raggio);
      this.localita = query.coordinate_localita;
      this.autocompilato = true;
    } else {
      this.localita = '';
    }

    this.homeRedirect = query.homeRedirect; // Assign the value to homeRedirect
    this.loadInputData();
  },


  watch: {
    raggio() {
      if (this.isRaggioValido && this.isLocalitaValida) {
        this.startTimer();
      }
    },

    localita() {
      if (this.isRaggioValido && this.isLocalitaValida) {
        this.startTimer();
      }
    },
  },

  methods: {
    async updateMap() {
      await new Promise(resolve => setTimeout(resolve, 300)); // Attendi 300 ms

      const response = await this.searchLocation();
      const coordinate = response.coordinate;
      const raggio = this.raggio;

      if (coordinate) {
        const mapComponent = this.$refs.liveMap; // Riferimento al componente LiveMap
        mapComponent.updateMap(coordinate); // Chiamiamo il metodo `updateMap` del componente LiveMap
      }

      this.saveInputData();
    },

    startTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(() => {
        this.updateMap();
        this.timer = null; // Resetta il timer
      }, 400);
   },

    loadInputData() {

      // Se si viene reindirizzati dalla Home il Local Storage viene resettato
      if (this.homeRedirect == 'true') {
        localStorage.clear();
        this.homeRedirect = 'false';
        this.homeRedirect1 = true;

      } else {

        const localita = sessionStorage.getItem('localita');
        const raggio = sessionStorage.getItem('raggio');
        if (localita) {
          this.localita = localita;
        }
        if (raggio) {
          this.raggio = raggio;
        }
      }

    },

    saveInputData() {
      sessionStorage.setItem('localita', this.localita);
      sessionStorage.setItem('raggio', this.raggio);
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