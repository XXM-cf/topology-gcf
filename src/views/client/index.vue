<template lang="pug">
  .client
    .headers
      el-menu(mode='horizontal', background-color='#f8f8f8' @select='onMenu')
        el-menu-item(index='back') 返回
        el-menu-item(index='open') 打开本地文件

    .canvas-container
      .tools
        h3 操作指令
        el-input(v-model="deviceId")
        el-button(@click="startAllAnimate()") 触发所有动画
        el-button(@click="endAllAnimate()") 结束所有动画
        el-button(@click="handle_startAnimate()") 触发节点动画
        el-button(@click="handle_endAnimate()") 停止节点动画
        el-button(@click="resizeCanvas()") 缩放适配
        p 平面图设备状态
        el-button(@click="handle_changeIcon('alarm')") 告警
        el-button(@click="handle_changeIcon('offline')") 离线
        el-button(@click="handle_changeIcon('fault')") 故障
        el-button(@click="handle_changeIcon('runing')") 运行
        el-button(@click="handle_changeIcon('normal')") 停止
        el-button(@click="handle_changeFont('alarm')") 文字告警
      #topology-canvas.full(ref="myCanvas" style="width:100%; height:100%")
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

export default {
  data () {
    return {
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
    this.canvasOptions.on = this.onMessage
    this.canvas = new Topology('topology-canvas', this.canvasOptions)
  },
  methods: {
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
    },
    onMessage (event, data) {
      switch (event) {
        case 'dblclick':
          console.log('双击')
          break;
        case 'node':
          if (data.data.enable) {
            this.isShowDetail = true
            this.nodeDetail = data
            console.log('点击节点 --> node', data)
          } else {
            console.warn('该节点无点击操作', data)
          }
          break;
      }
    },
    resizeCanvas () { // 适配外框
      let canvasRect = this.canvas.getRect() // 画布大小
      console.log('原始画布', canvasRect)
      let contianerWidth = this.$refs.myCanvas.clientWidth
      let contianerHeight = this.$refs.myCanvas.clientHeight
      let widthNum = parseFloat((contianerWidth / canvasRect.width).toFixed(2))
      let heightNum = parseFloat((contianerHeight / canvasRect.height).toFixed(2))
      this.canvas.scaleTo(Math.min(widthNum, heightNum))
      let newCanvasRect = this.canvas.getRect() // 画布大小
      console.log('缩放后画布', newCanvasRect)
      this.canvas.translate(-newCanvasRect.x, -newCanvasRect.y) // 取相反数平移
      this.canvas.render()
    },

    getNode (tag) { // 寻找目标节点，用来操作动画，样式切换等
      let targetNode = this.canvas.data.pens.find(item => {
        return item.tags.indexOf(this.deviceId) !== -1 // 关联tag
      })
      if (targetNode) {
        console.log('当前执行节点', targetNode)
        return targetNode
      } else {
        console.warn(`没有找到tag为${tag}的目标节点`)
        return
      }
    },

    startAllAnimate () {
      this.canvas.data.pens.map(item => {
        item.animateStart = Date.now()
        this.canvas.animate()
      })
    },
    endAllAnimate () {
      this.canvas.data.pens.map(item => {
        item.animateStart = 0
        item.rotate = 0
        this.canvas.animate()
      })
    },

    handle_startAnimate (tag) { // 开始动画
      let targetNode = this.getNode(tag)
      targetNode.rotate = 0
      if (targetNode && targetNode.animateFrames.length) { // 目标节点，业务数据触发动画
        targetNode.animateStart = Date.now()
        this.canvas.animate()
      }
    },
    handle_endAnimate (tag) { // 结束动画
      let targetNode = this.getNode(tag)
      if (targetNode && targetNode.animateFrames.length) { // 目标节点，业务数据触发动画
        targetNode.animateStart = 0
        targetNode.rotate = 0
        this.canvas.animate()
      }
    },

    handle_changeImg (tag, url) { // 设置图片
      let targetNode = this.getNode(tag)
      if (targetNode) {
        targetNode.image = url
        this.canvas.render()
      }
    },

    // 设备图例对应的五种状态：
    // 告警： alarm
    // 故障： fault
    // 离线： offline
    // 运行： runing
    // 正常： normal
    handle_changeIcon (status) { // 改变icon状态
      let targetNode = this.getNode()
      if (targetNode) {
        const state = Node.cloneState(targetNode)
        switch (status) { // 告警
          case 'normal':
            targetNode.iconColor = '#999'
            targetNode.animateStart = 0
            targetNode.lineWidth = 0
            targetNode.strokeStyle = 'rgba(0,0,0,0)'
            this.canvas.render()
            break;
          case 'runing':
            targetNode.iconColor = '#00dc94'
            targetNode.animateStart = 0
            targetNode.lineWidth = 0
            targetNode.strokeStyle = 'rgba(0,0,0,0)'
            this.canvas.render()
            break;
          case 'offline':
            targetNode.iconColor = '#9655ff'
            targetNode.animateStart = 0
            targetNode.lineWidth = 0
            targetNode.strokeStyle = 'rgba(0,0,0,0)'
            this.canvas.render()
            break;
          case 'fault':
            targetNode.iconColor = '#ffb300'
            targetNode.animateStart = 0
            targetNode.lineWidth = 0
            targetNode.strokeStyle = 'rgba(0,0,0,0)'
            this.canvas.render()
            break;
          case 'alarm':
            targetNode.iconColor = '#ff4a4a'
            targetNode.animateType = 'heart'
            targetNode.animateStart = 0
            targetNode.animateDuration = 0
            targetNode.animateFrames = []
            state.strokeStyle = 'rgba(255,74,74,0.6)';
            state.lineWidth = 30;
            targetNode.animateFrames.push({
              duration: 400,
              linear: true,
              state
            });
            targetNode.animateFrames.push({
              duration: 400,
              linear: true,
              state: Node.cloneState(targetNode)
            });

            for (const item of targetNode.animateFrames) {
              targetNode.animateDuration += item.duration;
            }
            targetNode.animateStart = Date.now()
            this.canvas.animate()
            this.canvas.render()
            break;
        }
      }
    },

    handle_changeFont (status) { // 修改
      let targetNode = this.getNode()
      if (targetNode) {
        switch (status) { // 告警
          case 'normal':
            targetNode.font.color = '#999'
            break;
          case 'runing':
            targetNode.font.color = '#00dc94'
            break;
          case 'offline':
            targetNode.font.color = '#9655ff'
            break;
          case 'fault':
            targetNode.font.color = '#ffb300'
            break;
          case 'alarm':
            targetNode.font.color = '#ff4a4a'
            break;
        }
      }
    },

  }

}
</script>

<style lang="scss">
.client {
  height: 100%;
  .canvas-container {
    display: flex;
    width: 100%;
    height: calc(100% - 40px);
    border: 1px solid #dcdcdc;
    position: relative;
    .tools {
      width: 10%;
      min-width: 140px;
      height: 100%;
      background: #f5f5f5;
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 10px;
      .el-button {
        margin-bottom: 15px;
        margin-left: 0;
      }
    }

    .full {
      width: 90%;
      height: 100%;
      position: relative;
      overflow: hidden;
    }
    .business-container {
      width: 90%;
      height: 100%;
      position: absolute;
      left: 10%;
    }
  }
}
</style>