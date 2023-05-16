<script>
import NavBar from '../components/sections/NavBar.vue'
import AdvancedSearchForm from '../components/forms/AdvancedSearchForm.vue'
import ApartmentList from '../components/sections/ApartmentList.vue'

export default {
  name: 'AdvancedSearch',
  components: {
    NavBar,
    AdvancedSearchForm,
    ApartmentList,
  },
}
</script>

<template>
  <NavBar />
  <AdvancedSearchForm />
  <ApartmentList />
</template>
