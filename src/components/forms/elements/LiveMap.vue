<template>
  <div>
    <div id="map-div"></div> <!-- Div in cui verrà visualizzata la mappa -->
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
      API_KEY: 'TyAuLPU0fDwhRivYyXjSFgM91eRVywYA', // Chiave API per il servizio di mappe
      map: null, // Oggetto mappa
    };
  },

  mounted() {
    this.initializeMap().then(() => {
      // Dopo che la mappa è stata inizializzata, esegue le seguenti azioni in ritardo
      setTimeout(() => {
        this.updateCircle(this.raggio); // Aggiorna il cerchio dopo 1 secondo
      }, 1000);
      setTimeout(() => {
        this.updateCircle(this.raggio); // Aggiorna il cerchio dopo 5 secondi
      }, 5000);
    });
  },

  watch: {
    localita: {
      handler(newLocalita) {
        // Osserva i cambiamenti nella proprietà 'localita'
        if (this.map) {
          this.searchLocation(newLocalita); // Esegue la ricerca della nuova posizione
        }
      },

      immediate: true, // Esegue immediatamente al caricamento del componente
    },

    raggio: {
      handler(newRaggio) {
        // Osserva i cambiamenti nella proprietà 'raggio'
        if (this.map) {
          const zoom = this.calculateZoom(newRaggio); // Calcola lo zoom in base al raggio
          this.map.setZoom(zoom); // Imposta lo zoom sulla mappa
          this.updateCircle(newRaggio); // Aggiorna il cerchio sulla mappa
        }
      },
      immediate: true, // Esegue immediatamente al caricamento del componente
    },
  },

  methods: {
    // Inizializza la mappa
    async initializeMap() {
      let position = [41.9028, 12.4964]; // Coordinata di Roma come posizione predefinita

      if (this.localita) {
        // Se è specificata una località, esegue una ricerca approssimativa
        const searchResponse = await tt.services.fuzzySearch({
          key: this.API_KEY,
          query: this.localita,
        });

        if (searchResponse.results && searchResponse.results.length > 0) {
          position = searchResponse.results[0].position; // Ottiene la posizione della località trovata
        }
      }

      return new Promise((resolve) => {
        this.map = tt.map({
          key: this.API_KEY,
          container: 'map-div',
          center: position,
          zoom: this.calculateZoom(this.raggio), // Imposta lo zoom in base al raggio
          interactive: false, // Imposta la mappa come non interattiva
        });

        this.map.addControl(new tt.NavigationControl()); // Aggiunge i controlli di navigazione alla mappa

        this.map.on('load', () => {
          this.updateCircle(this.raggio); // Aggiorna il cerchio sulla mappa dopo che la mappa è stata caricata
          resolve(); // Risolve la promise
        });
      });
    },
    
    // Calcola lo zoom in base al raggio
    calculateZoom(raggio) {
      const zoomValues = [
        { raggioMax: 0.2, zoom: 15 },
        { raggioMax: 0.5, zoom: 14 },
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
        { raggioMax: 15000, zoom: 3 },
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
            const newPosition = searchResponse.results[0].position; // Ottiene la posizione della località trovata
            this.updateMap(newPosition); // Aggiorna la mappa con la nuova posizione
          }
        });
    },
    
    // Aggiorna la mappa con una nuova posizione
    updateMap(newPosition) {
      if (newPosition) {
        this.map.setCenter(newPosition); // Imposta il centro della mappa sulla nuova posizione
        this.updateCircle(this.raggio); // Aggiorna il cerchio sulla mappa
      }
    },
    
    // Aggiorna il cerchio sulla mappa
    updateCircle(raggio) {
      if (!this.map.isStyleLoaded()) {
        return;
      }

      const center = this.map.getCenter(); // Ottiene il centro della mappa

      const polygonCoordinates = []; // Array che conterrà le coordinate dei punti del poligono
      const numPoints = 250; // Numero di punti da generare per il poligono
      const angleDelta = (Math.PI * 2) / numPoints; // Angolo incrementale tra i punti del poligono
      for (let i = 0; i < numPoints; i++) {
        const angle = i * angleDelta; // Calcola l'angolo per il punto corrente
        const x =
          center.lng +
          (raggio / 111) * // Calcola la coordinata X del punto
            Math.cos(angle) /
            Math.cos(center.lat * (Math.PI / 180)); // Formula per calcolare la coordinata X in base alla longitudine e alla latitudine
        const y = center.lat + (raggio / 111) * Math.sin(angle); // Calcola la coordinata Y del punto
        polygonCoordinates.push([x, y]); // Aggiunge le coordinate del punto all'array dei punti del poligono
      }

      /* 
      Questo ciclo for genera una serie di punti sul cerchio con il centro nella posizione della mappa e il raggio specificato. Questi punti vengono quindi utilizzati per creare un poligono, dove ogni punto rappresenta un angolo sull'anello del cerchio.
      */

      if (this.map.getLayer('circle')) {
        this.map.removeLayer('circle'); // Rimuove il layer del cerchio se esiste già
      }

      if (this.map.getSource('circle-source')) {
        this.map.removeSource('circle-source'); // Rimuove la sorgente del cerchio se esiste già
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