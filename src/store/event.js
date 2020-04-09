
const event = {
  namespaced: true,
  state: {
    event: {
      name: '',
      data: null
    }
  },
  mutations: {
    emit (state, event) {
      state.event = event
    }
  }
}
export default event