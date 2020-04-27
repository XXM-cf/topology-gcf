
const canvars = {
  namespaced: true,
  state: {
    data: {
      scale: 1,
      lineName: 'polyline',
      fromArrowType: '',
      toArrowType: '',
      locked: 0,
      lineStyle: 'default'
    }
  },
  mutations: {
    setData (state, data) {
      state.data = data
    }
  }
}
export default canvars