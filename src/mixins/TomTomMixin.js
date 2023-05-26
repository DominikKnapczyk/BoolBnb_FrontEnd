import axios from 'axios';

export default {

  methods: {

    async searchLocation() {
      if (this.localita.length < 2) {
        return; // Esce dalla funzione se la condizione non è soddisfatta
      }

      try {
        const response = await axios.get(`https://api.tomtom.com/search/2/geocode/${this.localita}.json`, {
          params: {
            key: 'HDVAnH02lwrB4rN3a43S0u27wxPtLpRB',
            limit: 5,
          },
        });

        const coordinate = response.data.results[0].position;
        const coordinate_localita = response.data.results[0].address.freeformAddress;

        return { coordinate, coordinate_localita };
      } catch (error) {
        console.error(error);
      }
    },
  },
};

