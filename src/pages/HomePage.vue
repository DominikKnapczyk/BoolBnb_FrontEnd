<template>
  <NavBar class="fixed-top" />
  <Jumbotron />
  <CardGroup />
  <Footer />
</template>

<script>
import NavBar from '../components/NavBar.vue'
import Jumbotron from '../components/Jumbotron.vue'
import CardGroup from '../components/CardGroup.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Homepage',
  components: {
    NavBar,
    Jumbotron,
    CardGroup,
    Footer,
  },
}
</script>



