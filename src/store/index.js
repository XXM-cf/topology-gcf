import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import canvas from './canvas'

const store = new Vuex.Store({
  modules: {
    canvas
  }
})

export default store