<script>
import NavBar from '../components/sections/NavBar.vue'
import AdvancedSearchForm from '../components/forms/AdvancedSearchForm.vue'
import ApartmentList from '../components/sections/ApartmentList.vue'
import DetailsSearch from '../components/forms/DetailsSearch.vue'

export default {
  name: 'AdvancedSearch',
  components: {
    NavBar,
    AdvancedSearchForm,
    DetailsSearch,
    ApartmentList,
  },

  data() {
    return {
      services_ids: null,
      rooms_num: null,
      single_beds: null,
      double_beds: null
    }
  },

  methods: {
    searchServices(services_ids) {
      this.services_ids = services_ids;
    },
    searchRooms(rooms_num) {
      this.rooms_num = rooms_num;
    },
    searchSingleBeds(single_beds) {
      this.single_beds = single_beds;
    },
    searchDoubleBeds(double_beds) {
      this.double_beds = double_beds;
    }
  },
}
</script>

<template>
  <NavBar />
  <AdvancedSearchForm />
  <DetailsSearch @searchServices="searchServices" @searchRooms="searchRooms" @searchSingleBeds="searchSingleBeds"
    @searchDoubleBeds="searchDoubleBeds" />
  <ApartmentList :listServices="services_ids" :roomsNum="rooms_num" :singleBeds="single_beds" :doubleBeds="double_beds" />
</template>
