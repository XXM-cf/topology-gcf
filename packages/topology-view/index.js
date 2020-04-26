import topologyView from './index.vue'
topologyView.install = function (Vue) {
  Vue.component(topologyView.name, topologyView)
}
export default topologyView