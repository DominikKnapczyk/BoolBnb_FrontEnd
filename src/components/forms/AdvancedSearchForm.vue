<template>
  <div class="container">
    <form class="mt-4 col-6" @submit.prevent>
      <div class="form-group">
        <label>Posizione selezionata:</label>
        <!-- Input per la località -->
        <div class="autocomplete-wrapper">
          <input 
            type="text" 
            class="form-control"
            placeholder="Inserisci la località" 
            v-model="localita" 
            @input="autocomplete"
            @blur="onBlurInput"
            @focus="onFocusInput"
            @keydown.arrow-up.prevent="selezionaSuggerimentoPrecedente"
            @keydown.arrow-down.prevent="selezionaSuggerimentoSuccessivo"
            @keydown.enter="selezionaSuggerimentoAttuale"
          /> 

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

      <button @click="ricerca">CERCA</button>

    </form>

    <div class="map">
      <!-- QUI MAPPA TOMTOM -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import TomTomMixin from '../../mixins/TomTomMixin.js';
import SuggestionMixin from '../../mixins/SuggestionMixin.js';
import { getAppartamenti } from '../../mixins/api.js';
import router from '../../router';

export default {
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
      console.log(query.coordinate_localita);
      this.autocompilato = true;
    }
  },

  methods: {
    async ricerca() {
      const coordinate = await this.searchLocation();
      const raggio = this.raggio;
      console.log(coordinate);

      if (coordinate) {
        const appartamenti = await getAppartamenti(coordinate, raggio);
        console.log(appartamenti);

        if (appartamenti != null) {
          // GENERA LE CARD SE IL BACKEND RESTITUISCE UN ARRAY DI APPARTAM
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
</style>



