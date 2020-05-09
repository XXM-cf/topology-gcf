import topologyView from '@/views/client/index.vue'
topologyView.install = function (Vue) {
  Vue.component(topologyView.name, topologyView)
}
export default topologyView