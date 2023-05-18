<template>
  <div>
    <div id="map-div"></div>
  </div>
</template>

<script>
export default {
  props: {
    raggio: {
      type: Number,
      required: true,
    },
    localita: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      API_KEY: 'tg2x9BLlB0yJ4y7Snk5XhTOsnakmpgUO',
      map: null, // Riferimento all'oggetto mappa
    };
  },
  mounted() {
    this.initializeMap();
  },
  watch: {
    localita: {
      handler(newLocalita) {
        if (this.map) {
          this.updateMap(newLocalita);
        }
      },
      immediate: true,
    },
    raggio: {
      handler(newRaggio) {
        if (this.map) {
          const zoom = this.calculateZoom(newRaggio);
          this.map.setZoom(zoom); // Aggiorna lo zoom della mappa
        }
      },
      immediate: true,
    },
  },
  methods: {
    async initializeMap() {
;

      let position = [41.9028, 12.4964]; // Coordinata di Roma come posizione predefinita

      if (this.localita) {
        // Cerca la posizione basata sull'input
        const searchResponse = await tt.services.fuzzySearch({
          key: this.API_KEY,
          query: this.localita,
        });

        if (searchResponse.results && searchResponse.results.length > 0) {
          position = searchResponse.results[0].position;
        }
      }

      this.map = tt.map({
        key: this.API_KEY,
        container: 'map-div',
        center: position,
        zoom: this.calculateZoom(this.raggio),
      });

      this.map.addControl(new tt.NavigationControl());
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
      let zoom = 12; // Zoom di default

      for (let i = 0; i < zoomValues.length; i++) {
        if (raggio <= zoomValues[i].raggioMax) {
          zoom = zoomValues[i].zoom;
          break;
        }
      }

      return zoom;
    },

    updateMap(localita) {
      const position = [41.9028, 12.4964]; // Coordinata di Roma come posizione predefinita

      if (localita) {
        // Cerca la posizione basata sull'input
        tt.services
          .fuzzySearch({
            key: this.API_KEY,
            query: localita,
          })
          .then((searchResponse) => {
            if (searchResponse.results && searchResponse.results.length > 0) {
              const newPosition = searchResponse.results[0].position;
              this.map.setCenter(newPosition); // Imposta il nuovo centro della mappa
            }
          });
      } else {
        this.map.setCenter(position); // Imposta la posizione di default
      }
    },
  },
};
</script>

<style>
#map-div {
  width: 100%;
  height: 300px;
  background-color: antiquewhite;
}
</style>
