<template>
  <div class="card-container">
    <div class="card px-4" :class="[isMobile ? 'horizontal' : 'vertical']">
      <img class="card-img-top rounded-top my-2" :src="apartment.image" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden">{{ apartment.title }}</h5>
        <p class="card-text" style="margin-bottom: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden">{{ apartment.description }}</p>
        <p class="card-text">{{ apartment.price }} € / notte</p>
        <a href="#" class="btn btn-secondary">Scopri di più</a>
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
}

.card.horizontal {
  display: flex;
  flex-direction: row;
  border-radius: 10px;
}


.card.horizontal .card-img-top {
  width: 45%;
}

.card.horizontal .card-body {
  width: 60%;
  padding-left: 20px;
}

@media (max-width: 767px) {

  .card-img-top {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    object-fit: cover;
    height: auto;
  }
}

@media (min-width: 768px) {

  .card-img-top {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    object-fit: cover;
    height: auto;
  }
}
</style>
