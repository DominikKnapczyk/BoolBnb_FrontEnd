import axios from 'axios';
import TomTomMixin from './TomTomMixin.js';
import { getAppartamenti } from './api.js';
import router from '../router';

export default {
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

    // AUTOCOMPLETE
    async autocomplete() {
      if (this.localita.length > 0) {
        const currentTime = Date.now();
        const timeSinceLastCall = currentTime - this.lastCallTime;

        // Verifica se è passato abbastanza tempo dalla chiamata precedente
        if (timeSinceLastCall < 300) {
          return;
        }

        try {
          const response = await axios.get(`https://api.tomtom.com/search/2/geocode/${this.localita}.json`, {
            params: {
              key: 'TyAuLPU0fDwhRivYyXjSFgM91eRVywYA',
              limit: 5,
            },
          });

          this.suggerimenti = response.data.results.slice(0, 5).map(result => result.address.freeformAddress);
          const suggerimentiArray = Object.values(this.suggerimenti);
          console.log(suggerimentiArray);

          this.lastCallTime = Date.now(); // Aggiorna il tempo dell'ultima chiamata

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
      } 
    },
  },
}
