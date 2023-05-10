<script>
import NavBar from './components/NavBar.vue'
import Jumbotron from './components/Jumbotron.vue'
import Card from './components/Card.vue'
import CardGroup from './components/CardGroup.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Jumbotron,
    Card,
    CardGroup,
    Footer,
  }
}
</script>

<template>
  <header>
    <NavBar class="fixed-top" />
    <Jumbotron class="jubotron"/>
  </header>

    <CardGroup />
    <Footer />
</template>



<style lang="scss" scoped>
header {  
    height: 500px;
  .fixed-top {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
  }
}
</style>
