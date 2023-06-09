import axios from 'axios';
import TomTomMixin from './TomTomMixin.js';
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
      if (this.localita.length > 2) {
        const currentTime = Date.now();
        const timeSinceLastCall = currentTime - this.lastCallTime;
    
        // Verifica se è passato abbastanza tempo dalla chiamata precedente
        if (timeSinceLastCall < 500) {
          if (this.timeoutId) {
            clearTimeout(this.timeoutId);
          }
    
          // Imposta un timeout per eseguire un'ultima chiamata dopo 500ms
          this.timeoutId = setTimeout(async () => {
            await this.makeRequest();
            this.timeoutId = null;
          }, 500);
          return;
        }
    
        await this.makeRequest();
      } else {
        this.suggerimenti = [];
      }
    },
    
    async makeRequest() {
      try {
        const response = await axios.get(`https://api.tomtom.com/search/2/geocode/${this.localita}.json`, {
          params: {
            key: 'HDVAnH02lwrB4rN3a43S0u27wxPtLpRB',
            limit: 5,
          },
        });
    
        this.suggerimenti = response.data.results.slice(0, 5).map(result => result.address.freeformAddress);
        const suggerimentiArray = Object.values(this.suggerimenti);
        console.log(suggerimentiArray);
    
        this.lastCallTime = Date.now(); // Aggiorna il tempo dell'ultima chiamata
      } catch (error) {
        console.error(error);
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
