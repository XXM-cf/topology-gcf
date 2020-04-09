const notice = {
  namespaced: true,
  state: {
    error: {
      text: ''
    }
  },
  mutations: {
    error (state, error) {
      state.error = error
    }
  }
}
export default notice