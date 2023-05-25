<template>
  <div class="row justify-content-center w-100">
    <form class="col-md-9" @submit.prevent>
      <div class="input-group">
        <div class="autocomplete-wrapper">
          <input 
            type="text" 
            class="form-control"
            placeholder="Inserisci la località" 
            v-model="localita" 
            @input="autocomplete"
            @blur="onBlurInput"
            @focus="onFocusInput"
            @keydown.arrow-up.prevent="selezionaSuggerimentoPrecedente"
            @keydown.arrow-down.prevent="selezionaSuggerimentoSuccessivo"
            @keydown.enter="selezionaSuggerimentoAttuale"
          />

          <div v-if="suggerimenti.length > 0 && isInputFocused" class="autocomplete">
            <ul class="list-group">
              <li v-for="(suggerimento, index) in suggerimenti" :key="index" class="list-group-item" 
                  @mousedown="selezionaSuggerimento(suggerimento)"
                  :class="{ 'selected': index === suggerimentoAttualeIndex }">
                {{ suggerimento }}
              </li>
            </ul>
          </div>
        </div>
        <div class="button-wrapper">
          <button class="btn btn-outline-secondary" type="button" @click="ricercaHome">Cerca</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import TomTomMixin from '../../mixins/TomTomMixin.js';
import SuggestionMixin from '../../mixins/SuggestionMixin.js';
import router from '../../router';


export default {
  mixins: [TomTomMixin],
  mixins: [SuggestionMixin],

  data() {
    return {
      localita: '',
      homeRedirect: false,
    };
  },

  methods: {
    async ricercaHome() {
    const coordinate = await this.searchLocation();
    const raggio = 20;

    console.log(coordinate);

    router.push({
      path: '/advanced-search',
      query: {
        raggio: raggio,
        coordinate_localita: coordinate.coordinate_localita,
        homeRedirect: true,
      },
    });
  },

  },
};
</script>



<style lang="scss" scoped>
button {
  background-color: rgba($color: #000000, $alpha: 0.6);
  color: white;
  height: 60px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

input {
  height: 60px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

input:focus {
  outline: #323232;
  box-shadow: none;
}

.autocomplete-wrapper {
  position: relative;
  display: flex;
  align-items: stretch;
  flex: 1;
}

.autocomplete {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1;
}

.autocomplete ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.autocomplete li {
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  transition: 0.1s;
}

.autocomplete li:hover {
  background-color:  rgba($color: #000000, $alpha: 0.6);
  color: white;
}

.autocomplete li button {
  margin-left: auto;
  margin-right: 10px;
  background-color: rgba($color: #000000, $alpha: 0.6);
  
  border: none;
  padding: 5px 10px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.autocomplete li button:hover {
  background-color: rgba($color: #000000, $alpha: 0.2);
}

.autocomplete li.selected {
  background-color: rgba($color: #000000, $alpha: 0.6);
  color: white;
}

</style>










