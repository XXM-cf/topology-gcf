
const canvars = {
  namespaced: true,
  state: {
    data: {
      scale: 1,
      lineName: 'curve',
      fromArrowType: '',
      toArrowType: 'triangleSolid',
      locked: 0
    }
  },
  mutations: {
    setData (state, data) {
      state.data = data
    }
  }
}
export default canvars