<template>
  <div>
    <div id="map-div"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      API_KEY: 'tg2x9BLlB0yJ4y7Snk5XhTOsnakmpgUO',
      map: null, // Riferimento all'oggetto mappa
    };
  },
  mounted() {
    this.initializeMap();
  },
  methods: {
    async initializeMap() {
  const APPLICATION_NAME = 'My Application';
  const APPLICATION_VERSION = '1.0';

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
    zoom: 12,
  });

  this.map.addControl(new tt.NavigationControl());
},

    updateMap(coordinate) {
      if (this.map) {
        this.map.setCenter(coordinate); // Imposta il nuovo centro della mappa
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

