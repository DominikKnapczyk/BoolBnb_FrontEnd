<template>
  <div class="card-container">
    <div class="card" :class="[isMobile ? 'horizontal' : 'vertical']">
      <img class="card-img-top rounded-top p-2" :src="apartment.image" alt="Card image cap">
      <div class="card-body d-flex flex-column justify-content-between">
        <h5 class="card-title">{{ apartment.title }}</h5>
        <p class="card-text"
          style="margin-bottom: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden">
          {{ apartment.description }}</p>
        <div class="card-footer mt-4">
          <p class="card-text">{{ apartment.price }} € / notte</p>
          <router-link to="/apartment/:id">
            <a href="#" class="btn btn-secondary">Scopri di più</a>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ['apartment'],
  data() {
    return {
      isMobile: false,
    };
  },
  created() {
    this.isMobile = window.innerWidth <= 767;
    window.addEventListener('resize', this.handleResize);
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.isMobile = window.innerWidth <= 767;
    },
  },
};
</script>

<style>
.card-container {
  margin-top: 20px;
}

.card {
  border-radius: 10px;
  width: 100%;
  min-height: 100%;
}

.card.horizontal {
  display: flex;
  flex-direction: row;
  border-radius: 10px;
}

.card-img-top {
  object-fit: cover;
  height: auto;
  border-radius: 10px;
}

.card.horizontal .card-img-top {
  width: 45%;
}

.card.horizontal .card-body {
  width: 60%;
  padding-left: 20px;
}

.card-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>