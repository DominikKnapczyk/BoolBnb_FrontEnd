<script>

export default {
  components: {

  },
  data() {
    return {
      email: null,
      message: null,
      name: null,
      // apartment id??
      apiMessageURL: 'http://localhost:8000/api/messages/'
    }
  },

  props: {
    apartmentId: Number,
  },

  methods: {
    sendMessage() {
      axios.post(this.apiMessageURL, {
        email: this.email,
        message: this.message,
        name: this.name
        // apartment_id: {{ apartmentId }}??
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      )
    }
  }
}
</script>

<template>
  <div class="card">
    <div class="card-header">Invia un messaggio al proprietario.</div>

    <div class="card-body">
      <form action="">
        <div>
          <label for="email" class="mb-2">Inserisci la tua email</label>
          <!-- value="todo: email utente loggato" -->
          <input id="email" type="email" class="form-control" name="email" required v-model="email">
        </div>
        <div>
          <label for="name" class="mb-2">Inserisci il tuo nome</label>
          <!-- value="todo: name utente loggato" -->
          <input id="name" type="name" class="form-control" name="name" v-model="name">
        </div>
        <div>
          <label for="message" class="mb-2">Inserisci il messaggio per il proprietario</label>
          <input id="message" type="text" class="form-control" name="message" required v-model="message">
        </div>
        <input type="submit" value="Invia" class="btn btn-success mt-2" @click="sendMessage">
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>