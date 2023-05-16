import axios from 'axios';

export default {
  methods: {
    async searchLocation() {
      try {
        const response = await axios.get(`https://api.tomtom.com/search/2/geocode/${this.localita}.json`, {
          params: {
            key: 'tg2x9BLlB0yJ4y7Snk5XhTOsnakmpgUO',
            limit: 5,
          },
        });

        const coordinate = response.data.results[0].position;
        console.log(`Latitudine: ${coordinate.lat}, Longitudine: ${coordinate.lon}`);
        // Qui puoi usare le coordinate per fare una richiesta al tuo backend

        // Puoi anche ritornare le coordinate, se necessario
        return coordinate;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
