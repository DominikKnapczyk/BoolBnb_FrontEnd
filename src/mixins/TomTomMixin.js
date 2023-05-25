import axios from 'axios';

export default {
  data() {
    return {
      lastCallTime: 0, // Variabile di controllo per tenere traccia dell'ultima chiamata
      searchTimeout: null, // Timeout per l'ultima chiamata dopo 300ms
    };
  },
  methods: {
    async searchLocation() {
      if (this.localita.length < 2) {
        return false;
      }

      const currentTime = Date.now();
      const timeSinceLastCall = currentTime - this.lastCallTime;

      // Verifica se è passato abbastanza tempo dalla chiamata precedente
      if (timeSinceLastCall < 300) {
        if (this.searchTimeout) {
          // Se c'è già un timeout in sospeso, cancellalo
          clearTimeout(this.searchTimeout);
        }

        // Imposta un nuovo timeout per l'ultima chiamata dopo 300ms
        this.searchTimeout = setTimeout(() => {
          this.makeLastCall();
        }, 300);

        return false;
      }

      // Esegue la chiamata immediatamente se il tempo trascorso è sufficiente
      return this.makeLastCall();
    },
    async makeLastCall() {
      try {
        const response = await axios.get(`https://api.tomtom.com/search/2/geocode/${this.localita}.json`, {
          params: {
            key: 'TyAuLPU0fDwhRivYyXjSFgM91eRVywYA',
            limit: 5,
          },
        });

        const coordinate = response.data.results[0].position;
        const coordinate_localita = response.data.results[0].address.freeformAddress;

        this.lastCallTime = Date.now(); // Aggiorna il tempo dell'ultima chiamata

        // Puoi anche ritornare le coordinate, se necessario
        return { coordinate, coordinate_localita };
      } catch (error) {
        if (error.response && error.response.status === 429) {
          // Errore 429 - Too Many Requests
          return false;
        }

        console.error(error);
      }
    },
  },
};

