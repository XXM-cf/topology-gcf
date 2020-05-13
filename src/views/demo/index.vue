<template lang="pug">
  .client
    .headers
      el-menu(mode='horizontal', background-color='#f8f8f8' @select='onMenu')
        el-menu-item(index='back') 返回

    .canvas-container
      .tools
        h5 操作指令
        el-input(v-model="deviceId")
        el-input(v-model="deviceStatus")
        el-input(v-model="deviceValue")

        el-button(@click="handleUpdate()") 更新

      .full(ref="myCanvas" style="width:100%; height:100%")
        topologyView(
          ref="topologyView"
          @nodeClick="handleClick"
          )
    .business-container
      el-dialog(
        :visible.sync="isShowDetail"
        title="点击获取设备实时状态"
        )
        pre {{ nodeDetail }}

</template>

<script>
import { Topology } from 'topology-core'
import { Node } from 'topology-core/models/node'

import topologyView from '../../../packages/topology-view/index.js'
const canvasData = require('./demo.json')
export default {
  components: {
    topologyView
  },
  data () {
    return {
      jsonContent: canvasData,
      deviceId: 'device001', // 默认设备
      deviceStatus: 'normal', // 默认设备
      deviceValue: '99', // 默认设备
      isShowDetail: false,
      nodeDetail: {},
      canvasOptions: {
        lock: 1,
        activeColor: 'rgba(0,0,0,0)' // 去除选中边框
      },
      canvas: {}
    }
  },
  mounted () {
    this.$refs.topologyView.open(this.jsonContent)
  },
  methods: {
    handleUpdate () {
      console.log(this.$refs.topologyView)
      this.$refs.topologyView.handle_update(this.deviceId, this.deviceStatus, this.deviceValue)
      this.$refs.topologyView.render()
    },
    handleClick (val) {
      this.isShowDetail = true
      this.nodeDetail = val
    },
    onMenu (key, keyPath) {
      if (!key || key.indexOf('/') === 0) {
        return
      }
      switch (key) {
        case 'back':
          this.$router.push('/config')
          break
        default:
          break
      }

    }
  }
}
</script>

<style lang="scss">
.client {
  height: 100%;
  .canvas-container {
    height: 100%;
    display: flex;
    .tools {
      width: 200px;
      border-right: 1px solid #dcdcdc;
      padding: 20px;
      display: flex;
      flex-direction: column;
      text-align: center;
      .el-button {
        margin: 10px 0;
      }
    }
  }
}
</style>