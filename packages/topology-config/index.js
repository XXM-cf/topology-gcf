import topologyConfig from './index.vue'
topologyConfig.install = function (Vue) {
  Vue.component(topologyConfig.name, topologyConfig)
}
export default topologyConfig