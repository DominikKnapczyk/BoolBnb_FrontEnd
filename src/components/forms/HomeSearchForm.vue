<template>
  <div class="row justify-content-center w-100">
    <form class="col-md-9" @submit.prevent>
      <div class="input-group">
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
        <div class="button-wrapper">
          <button class="btn btn-outline-secondary" type="button" @click="ricerca">Cerca</button>
        </div>
      </div>
    </form>
  </div>
</template>




<script>
import axios from 'axios';
import TomTomMixin from '../../mixins/TomTomMixin.js';
import { getAppartamenti } from '../../mixins/api.js';
import router from '../../router';

export default {
  mixins: [TomTomMixin],
  mixins: [TomTomMixin],

  data() {
    return {
      localita: '',
      suggerimenti: [],
      isInputFocused: false,
      suggerimentoAttualeIndex: null,
      
    };
  },

  methods: {
    async autocomplete() {
      if (this.localita.length > 0) {
        try {
          const response = await axios.get(`https://api.tomtom.com/search/2/geocode/${this.localita}.json`, {
          params: {
            key: 'tg2x9BLlB0yJ4y7Snk5XhTOsnakmpgUO',
            limit: 5,
          },
        });

          this.suggerimenti = response.data.results.slice(0, 5).map(result => result.address.freeformAddress);
          const suggerimentiArray = Object.values(this.suggerimenti);
          console.log(suggerimentiArray);


        } catch (error) {
          // console.error(error);
        }
      } else {
        this.suggerimenti = [];
      }
    },


    selezionaSuggerimento(suggerimento) {
    this.localita = suggerimento;
    this.suggerimenti = [];
  },

    resetSuggerimenti() {
      if (!this.isInputFocused) {
        this.suggerimenti = [];
      }
    },

    onFocusInput() {
      this.isInputFocused = true;
    },

    onBlurInput() {
    this.isInputFocused = false;
    },

    selezionaSuggerimento(suggerimento) {
      this.localita = suggerimento;
      this.suggerimenti = [];
      console.log('Suggerimento selezionato:', suggerimento);
    },

    hideSuggerimenti(event) {
      if (!this.$el.contains(event.target)) {
        this.suggerimenti = [];
      }
    },

    selezionaSuggerimentoPrecedente() {
  if (this.suggerimenti.length > 0) {
    // Calcola l'indice del suggerimento precedente
    const indicePrecedente = (this.suggerimentoAttualeIndex === null ? this.suggerimenti.length - 1 : this.suggerimentoAttualeIndex - 1 + this.suggerimenti.length) % this.suggerimenti.length;

    // Imposta il suggerimento precedente come suggerimento attuale
    this.suggerimentoAttualeIndex = indicePrecedente;
  }
},

selezionaSuggerimentoSuccessivo() {
  if (this.suggerimenti.length > 0) {
    // Calcola l'indice del suggerimento successivo
    const indiceSuccessivo = (this.suggerimentoAttualeIndex === null ? 0 : this.suggerimentoAttualeIndex + 1) % this.suggerimenti.length;

    // Imposta il suggerimento successivo come suggerimento attuale
    this.suggerimentoAttualeIndex = indiceSuccessivo;
  }
},


selezionaSuggerimentoAttuale() {
  if (this.suggerimenti.length > 0 && this.suggerimentoAttualeIndex !== null) {
    const suggerimentoAttuale = this.suggerimenti[this.suggerimentoAttualeIndex];
    this.localita = suggerimentoAttuale;
    this.suggerimenti = [];
  } else {
    this.ricerca();
  }
},

    

    async ricerca() {
      const coordinate = await this.searchLocation();

      if (coordinate) {
        const appartamenti = await getAppartamenti(coordinate, 20);
        console.log(appartamenti);

        if (appartamenti == null) {
          router.push('/advanced-search');
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
  background-color:  rgba($color: #000000, $alpha: 0.6);
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










