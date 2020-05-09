<template lang="pug">
  .client
    .headers
      el-menu(mode='horizontal', background-color='#f8f8f8' @select='onMenu')
        el-menu-item(index='back') 返回
        el-menu-item(index='open') 打开本地文件

    .canvas-container
      .tools
        h5 操作指令
        el-input(v-model="deviceId")
        el-button(@click="startAllAnimate()") 触发所有动画
        el-button(@click="endAllAnimate()") 结束所有动画
        el-button(@click="handle_startAnimate()") 触发节点动画
        el-button(@click="handle_endAnimate()") 停止节点动画
        el-button(@click="resizeCanvas()") 缩放适配
        h5 平面图设备状态
        el-button(@click="handle_changeIcon('alarm')") 告警
        el-button(@click="handle_changeIcon('offline')") 离线
        el-button(@click="handle_changeIcon('fault')") 故障
        el-button(@click="handle_changeIcon('runing')") 运行
        el-button(@click="handle_changeIcon('normal')") 停止
        el-button(@click="handle_changeFont('alarm')") 文字告警
      .full(ref="myCanvas" style="width:100%; height:100%")
        topologyView(:canvasData="jsonContent" ref="topologyView")
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
// import topologyView from '../client'
const canvasData = require('./demo.json')
export default {
  components: {
    topologyView
  },
  data () {
    return {
      jsonContent: canvasData,
      deviceId: 'device001', // 默认设备
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
    console.log('aaa', this.jsonContent)
  },
  methods: {
    handle_changeIcon () {
      console.log(this.$refs.topologyView)
      this.$refs.topologyView.handle_elevatorRun('device005', 5)

    },
    onMenu (key, keyPath) {
      if (!key || key.indexOf('/') === 0) {
        return
      }
      switch (key) {
        case 'back':
          this.$router.push('/config')
          break
        case 'open':
          this.onOpen()
          break
        default:
          break
      }

    },
    onOpen (data) {
      const input = document.createElement('input')
      input.type = 'file'
      input.onchange = event => {
        const elem = event.srcElement || event.target
        if (elem.files && elem.files[0]) {
          const name = elem.files[0].name.replace('.json', '')
          const reader = new FileReader()
          reader.onload = e => {
            const text = e.target.result + ''
            try {
              const data = JSON.parse(text)
              if (
                data && Array.isArray(data.pens)
              ) {
                data.locked = 1
                console.log('json数据读取完毕', data)
                this.canvas.open(data)
                this.resizeCanvas()
              }
            } catch (e) {
              return false
            }
          }
          reader.readAsText(elem.files[0])
        }
      }
      input.click()
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