<script>
import axios from 'axios';

export default {
  data() {
    return {
      localita: '',
    }
  },
  methods: {
    async ricerca() {
      try {
        const response = await axios.get(`https://api.tomtom.com/search/2/geocode/${this.localita}.json`, {
          params: {
            key: 'tg2x9BLlB0yJ4y7Snk5XhTOsnakmpgUO',
            limit: 1,
          },
        });


        const coordinate = response.data.results[0].position;
        console.log(`Latitudine: ${coordinate.lat}, Longitudine: ${coordinate.lon}`);
        // qui puoi usare le coordinate per fare una richiesta al tuo backend
      } catch (error) {
        console.error(error);
      }
    },
  },
}
</script>


<template>
  <div class="row justify-content-center w-100">
    <form class="col-md-9">
      <div class="input-group  px-3">
        <input type="text" class="form-control" placeholder="Inserisci la località" v-model="localita">
        <button class="btn btn-outline-secondary" type="button" @click="ricerca">Cerca</button>
      </div>
    </form>
  </div>
</template>



<style lang="scss" scoped>

button {
  background-color: rgba($color: #000000, $alpha: 0.6);
  color: white;
}

input {
  height: 60px;
}

input:focus {
  outline: #323232;
  box-shadow: none;
}

</style>