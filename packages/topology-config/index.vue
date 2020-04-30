<template lang="pug">
  topologyConfig(:imgList="imgList" :deviceList="deviceList")
</template>

<script>
import topologyConfig from '../../src/views/config/index.vue'
import '@/assets/css/base.scss'
export default {
  props: {
    imgList: {
      type: Array,
      default: () => []
    },
    deviceList: {
      type: Array,
      default: () => []
    }
  },
  name: 'topology-config',
  components: {
    topologyConfig
  }
}
</script>

<style>
</style>