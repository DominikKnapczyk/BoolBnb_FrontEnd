<script>

export default {
  components: {

  },
  data() {
    return {
      services_ids: [],
      rooms_num: null,
      single_beds: null,
      double_beds: null
    }
  },
}
</script>

<template>
  <div class="row">
    <div id="filters" class="col ms-4">
      <div class="card">
        <div class="card-header">Filtri Ricerca</div>

        <div class="card-body">
          <h3>Dettagli stanze</h3>
          <div id="numeroStanze">
            <div>
              <label for="rooms_num">Numero stanze</label>
              <input class="numType" type="number" id="rooms_num" v-model="rooms_num"
                @change="$emit('searchRooms', rooms_num)">
            </div>
          </div>
          <hr>
          <div id="numeroStanze">
            <div>
              <label for="single_beds">Numero letti singoli</label>
              <input class="numType" type="number" id="single_beds" v-model="single_beds"
                @change="$emit('searchSingleBeds', single_beds)">
            </div>
          </div>
          <hr>
          <div id="numeroStanze">
            <div>
              <label for="double_beds">Numero letti matrimoniali</label>
              <input class="numType" type="number" id="double_beds" v-model="double_beds"
                @change="$emit('searchDoubleBeds', double_beds)">
            </div>
          </div>
          <hr>
          <div id="listServices">
            <h3>Lista servizi</h3>
            <div>
              <input type="checkbox" v-model="services_ids" value="1" id="1"
                @change="$emit('searchServices', services_ids)">
              <label class="ms-2" for="1">Wi-Fi</label>
            </div>
            <div>
              <input type="checkbox" v-model="services_ids" value="2" id="2"
                @change="$emit('searchServices', services_ids)">
              <label class="ms-2" for="2">Piscina</label>
            </div>
            <div>
              <input type="checkbox" v-model="services_ids" value="3" id="3"
                @change="$emit('searchServices', services_ids)">
              <label class="ms-2" for="3">Posto auto</label>
            </div>
            <div>
              <input type="checkbox" v-model="services_ids" value="4" id="4"
                @change="$emit('searchServices', services_ids)">
              <label class="ms-2" for="4">Aria condizionata</label>
            </div>
            <div>
              <input type="checkbox" v-model="services_ids" value="5" id="5"
                @change="$emit('searchServices', services_ids)">
              <label class="ms-2" for="5">Terrazza panoramica</label>
            </div>
            <div>
              <input type="checkbox" v-model="services_ids" value="6" id="6"
                @change="$emit('searchServices', services_ids)">
              <label class="ms-2" for="6">Servizio di pulizia</label>
            </div>
            <div>
              <input type="checkbox" v-model="services_ids" value="7" id="7"
                @change="$emit('searchServices', services_ids)">
              <label class="ms-2" for="7">TV via cavo/satellite</label>
            </div>
            <div>
              <input type="checkbox" v-model="services_ids" value="8" id="8"
                @change="$emit('searchServices', services_ids)">
              <label class="ms-2" for="8">Servizio lavanderia</label>
            </div>
            <div>
              <input type="checkbox" v-model="services_ids" value="9" id="9"
                @change="$emit('searchServices', services_ids)">
              <label class="ms-2" for="9">Navetta aeroportuale</label>
            </div>
            <div>
              <input type="checkbox" v-model="services_ids" value="10" id="10"
                @change="$emit('searchServices', services_ids)">
              <label class="ms-2" for="10">Area barbecue</label>
            </div>
            <div>
              <input type="checkbox" v-model="services_ids" value="11" id="11"
                @change="$emit('searchServices', services_ids)">
              <label class="ms-2" for="11">Noleggio bici</label>
            </div>
            <div>
              <input type="checkbox" v-model="services_ids" value="12" id="12"
                @change="$emit('searchServices', services_ids)">
              <label class="ms-2" for="12">Self check-in</label>
            </div>
            <div>
              <input type="checkbox" v-model="services_ids" value="13" id="13"
                @change="$emit('searchServices', services_ids)">
              <label class="ms-2" for="13">Colazione inclusa</label>
            </div>
            <div>
              <input type="checkbox" v-model="services_ids" value="14" id="14"
                @change="$emit('searchServices', services_ids)">
              <label class="ms-2" for="14">Sauna</label>
            </div>
            <div>
              <input type="checkbox" v-model="services_ids" value="15" id="15"
                @change="$emit('searchServices', services_ids)">
              <label class="ms-2" for="15">Vista mare</label>
            </div>
            <div>
              <input type="checkbox" v-model="services_ids" value="16" id="16"
                @change="$emit('searchServices', services_ids)">
              <label class="ms-2" for="16">Portineria</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#filters {
  max-width: 15rem;
}

.numType {
  max-width: 5rem;
  margin-top: 0.3rem;
}
</style>