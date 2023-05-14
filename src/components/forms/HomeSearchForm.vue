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
import TomTomMixin from '../../mixins/TomTomMixin.js'; // Assicurati di impostare il percorso corretto

export default {
  mixins: [TomTomMixin], // Aggiungi il mixin

  data() {
    return {
      localita: '',
    }
  },

  methods: {
    async ricerca() {
      const coordinate = await this.searchLocation();
      // Usa le coordinate qui o fai altro con esse
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