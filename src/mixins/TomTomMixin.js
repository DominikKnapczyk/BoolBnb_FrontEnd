import axios from 'axios';

export default {
  data() {
    return {
      lastCallTime: 0, // Variabile di controllo per tenere traccia dell'ultima chiamata
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
        return false;
      }

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
