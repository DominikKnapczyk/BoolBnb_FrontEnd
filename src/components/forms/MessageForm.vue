<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      email: this.$store.state.user.email,
      name: this.$store.state.user.name,
      message: null,
      apiMessageURL: "http://127.0.0.1:8000/api/messages/",
      messageSent: false,
    };
  },
  watch: {
    "$store.state.isLogged"(newValue) {
      if (newValue == true) {
        this.email = this.$store.state.user.email;
        this.name = this.$store.state.user.name;
      }
    },
  },

  props: {
    apartmentId: Number,
  },

  methods: {
    sendMessage() {
      axios
        .post(this.apiMessageURL, {
          email: this.email,
          name: this.name,
          text: this.message,
          apartment_id: this.apartmentId,
        })
        .then((response) => {
          // Handle the response from the server
          this.messageSent = true;
        });
    },
  },
};
</script>

<template>
  <div class="card">
    <div class="card-header">Invia un messaggio al proprietario.</div>

    <div class="card-body">
      <form @submit.prevent="sendMessage">
        <div>
          <label for="email" class="mb-2">Inserisci la tua email</label>
          <input
            id="email"
            type="email"
            class="form-control"
            name="email"
            required
            v-model="email"
          />
        </div>
        <div>
          <label for="name" class="mb-2">Inserisci il tuo nome</label>
          <input
            id="name"
            type="name"
            class="form-control"
            name="name"
            v-model="name"
          />
        </div>
        <div>
          <label for="message" class="mb-2"
            >Inserisci il messaggio per il proprietario</label
          >
          <input
            id="message"
            type="text"
            class="form-control"
            name="message"
            required
            v-model="message"
          />
        </div>
        <input type="submit" value="Invia" class="btn btn-success mt-2" />
        <span v-if="messageSent" class="m-4"
          >Messaggio inviato correttamente!</span
        >
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
