<script>
export default {
  data() {
    return {
      localita: ''
    }
  },
  methods: {
    ricerca() {
      // qui puoi inserire il codice per avviare la ricerca
    }
  }
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
