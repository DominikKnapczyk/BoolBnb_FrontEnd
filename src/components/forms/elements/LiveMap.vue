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
      map: null,
    };
  },
  mounted() {
    this.initializeMap().then(() => {
      setTimeout(() => {
        this.updateCircle(this.raggio);
      }, 1000);
    });
  },
  watch: {
    localita: {
      handler(newLocalita) {
        if (this.map) {
          this.searchLocation(newLocalita);
        }
      },
      immediate: true,
    },
    raggio: {
      handler(newRaggio) {
        if (this.map) {
          const zoom = this.calculateZoom(newRaggio);
          this.map.setZoom(zoom);
          this.updateCircle(newRaggio);
        }
      },
      immediate: true,
    },
  },
  methods: {
    // Inizializza la mappa
    async initializeMap() {
      let position = [41.9028, 12.4964]; // Coordinata di Roma come posizione predefinita

      if (this.localita) {
        const searchResponse = await tt.services.fuzzySearch({
          key: this.API_KEY,
          query: this.localita,
        });

        if (searchResponse.results && searchResponse.results.length > 0) {
          position = searchResponse.results[0].position;
        }
      }

      return new Promise((resolve) => {
        this.map = tt.map({
          key: this.API_KEY,
          container: 'map-div',
          center: position,
          zoom: this.calculateZoom(this.raggio),
          interactive: false, // Aggiungi questa linea per rendere la mappa non interattiva
        });

        this.map.addControl(new tt.NavigationControl());

        this.map.on('load', () => {
          this.updateCircle(this.raggio);
          resolve();
        });
      });
    },
    
    // Calcola lo zoom in base al raggio
    calculateZoom(raggio) {
      const zoomValues = [
        { raggioMax: 1, zoom: 13 },
        { raggioMax: 2, zoom: 12 },
        { raggioMax: 4, zoom: 11 },
        { raggioMax: 8, zoom: 10 },
        { raggioMax: 16, zoom: 9 },
        { raggioMax: 33, zoom: 8 },
        { raggioMax: 66, zoom: 7 },
        { raggioMax: 130, zoom: 6 },
        { raggioMax: 260, zoom: 5 },
        { raggioMax: 500, zoom: 4 },
        { raggioMax: 1000, zoom: 3 },
        { raggioMax: 2000, zoom: 6 },
        { raggioMax: 5000, zoom: 5 },
        { raggioMax: 10000, zoom: 4 },
      ];

      let zoom = 12;

      for (let i = 0; i < zoomValues.length; i++) {
        if (raggio <= zoomValues[i].raggioMax) {
          zoom = zoomValues[i].zoom;
          break;
        }
      }

      return zoom;
    },
    
    // Cerca la posizione specificata
    searchLocation(localita) {
      const query = localita || '';

      tt.services
        .fuzzySearch({
          key: this.API_KEY,
          query: query,
        })
        .then((searchResponse) => {
          if (searchResponse.results && searchResponse.results.length > 0) {
            const newPosition = searchResponse.results[0].position;
            this.updateMap(newPosition);
          }
        });
    },
    
    // Aggiorna la mappa con una nuova posizione
    updateMap(newPosition) {
      if (newPosition) {
        this.map.setCenter(newPosition);
        this.updateCircle(this.raggio);
      }
    },
    
    // Aggiorna il cerchio sulla mappa
    updateCircle(raggio) {
      if (!this.map.isStyleLoaded()) {
        return;
      }

      const center = this.map.getCenter();

      const polygonCoordinates = [];
      const numPoints = 250;
      const angleDelta = (Math.PI * 2) / numPoints;
      for (let i = 0; i < numPoints; i++) {
        const angle = i * angleDelta;
        const x =
          center.lng +
          (raggio / 111) *
            Math.cos(angle) /
            Math.cos(center.lat * (Math.PI / 180));
        const y = center.lat + (raggio / 111) * Math.sin(angle);
        polygonCoordinates.push([x, y]);
      }

      if (this.map.getLayer('circle')) {
        this.map.removeLayer('circle');
      }

      if (this.map.getSource('circle-source')) {
        this.map.removeSource('circle-source');
      }

      this.map.addSource('circle-source', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [polygonCoordinates],
          },
        },
      });

      this.map.addLayer({
        id: 'circle',
        type: 'fill',
        source: 'circle-source',
        layout: {},
        paint: {
          'fill-color': '#db356c',
          'fill-opacity': 0.3,
          'fill-outline-color': '#dc3555',
        },
      });
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

.mapboxgl-ctrl-top-right {
  display: none !important;
}
</style>
