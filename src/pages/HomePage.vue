<script>
import NavBar from '../components/sections/NavBar.vue'
import Jumbotron from '../components/sections/Jumbotron.vue'
import CardGrid from '../components/sections/SponsoredCardGrid.vue'
import Footer from '../components/sections/Footer.vue'

export default {
  name: 'Homepage',
  components: {
    NavBar,
    Jumbotron,
    CardGrid,
    Footer,
  },
}
</script>

<template>
  <NavBar class="fixed-top" />
  <Jumbotron />
  <CardGrid />
  <Footer />
</template>