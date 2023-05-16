<template>
  <div class="row justify-content-center w-100">
    <form class="col-md-9">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Inserisci la località" v-model="localita">
        <button class="btn btn-outline-secondary" type="button" @click="ricerca">Cerca</button>
      </div>
    </form>
  </div>
</template>

<script>
import TomTomMixin from '../../mixins/TomTomMixin.js';
import { getAppartamenti } from '../../mixins/api.js';
import router from '../../router';

export default {
  mixins: [TomTomMixin],

  data() {
    return {
      localita: '',
    }
  },

  methods: {
    async ricerca() {
      const coordinate = await this.searchLocation();

      if (coordinate) {
        const appartamenti = await getAppartamenti(coordinate, 20);
        console.log(appartamenti); // Puoi fare qualcos'altro con i dati ottenuti dal backend

        if (appartamenti == null) {
          // Reindirizza l'utente alla pagina AdvancedSearchForm solo se l'array degli appartamenti è restituito con successo
          router.push('/advanced-search');
        }
      }
    },
  },
}
</script>

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
