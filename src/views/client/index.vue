<template lang="pug">
  .client
    .headers
      el-menu(mode='horizontal', background-color='#f8f8f8' @select='onMenu')
        el-menu-item(index='back') 返回
        el-menu-item(index='open') 打开本地文件

    .canvas-container
      .tools
        h3 操作指令
        el-button(@click="startAllAnimate()") 触发所有动画
        el-button(@click="endAllAnimate()") 结束所有动画
        el-button(@click="handle_startAnimate('device001')") 触发节点动画
        el-button(@click="handle_endAnimate('device001')") 停止节点动画
        el-button(@click="handke_changeImg('device001', 'img/fj_normal.png')") 触发告警
        el-button(@click="handke_changeImg('device001', 'img/fengji.png')") 停止告警
        el-button(@click="resizeCanvas()") 缩放适配
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
export default {
  data () {
    return {
      isShowDetail: false,
      nodeDetail: {},
      canvasOptions: {
        lock: 1,
        activeColor: 'rgba(0,0,0,0)'
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
          this.isShowDetail = true
          this.nodeDetail = data
          console.log('点击节点 --> node', data)
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
        console.log(item.data, tag)
        return item.tags.indexOf(tag) !== -1 // 关联tag
      })
      console.log('当前执行节点', targetNode)
      return targetNode
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
    handle_changeIcon (tag, iconSize, iconColor) { // 设置图片
      let targetNode = this.getNode(tag)
      if (targetNode) {
        targetNode.iconSize = iconSize
        targetNode.iconColor = iconColor
      }
    },
    handle_changeFont (tag, fontSize, color) { // 修改
      let targetNode = this.getNode(tag)
      if (targetNode) {
        targetNode.font.color = color
        targetNode.fontSize = fontSize
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