<template>
  <div class="card px-4" style="width: 18rem; margin-top: 20px; border-radius: 10px;">
    <img class="card-img-top rounded-top my-2" :src="apartment.image" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden">{{ apartment.title }}</h5>
      <p class="card-text" style="margin-bottom: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden">{{ apartment.description }}</p>
      <p class="card-text">{{ apartment.price }} € / notte</p>
      <a href="#" class="btn btn-secondary">Scopri di più</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['apartment']
}
</script>