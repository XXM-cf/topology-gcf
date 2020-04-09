import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import canvas from './canvas'
import event from './event'
import notice from './notice'
import getters from './getters'

const store = new Vuex.Store({
  modules: {
    canvas,
    event,
    notice
  },
  getters
})

export default store