<template lang="pug">
  #topology-client(ref="myCanvas" style="width:100%; height:100%")
</template>

<script>
import { Topology } from 'topology-core'
import { Node } from 'topology-core/models/node'
import { Line } from 'topology-core/models/line'
import { Point } from 'topology-core/models/point'
import '@/assets/css/base.scss'

export default {
  name: 'topology-view',
  props: {
    canvasData: {
      type: Object,
      default: () => { }
    },
    resize: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      canvasOptions: {
        lock: 1,
        activeColor: 'rgba(0,0,0,0)' // 去除选中边框
      },
      canvas: {}
    }
  },
  mounted () {
    this.canvasOptions.on = this.onMessage
    this.canvas = new Topology('topology-client', this.canvasOptions)
    this.onOpen()
  },
  methods: {
    onOpen () {
      const data = this.canvasData
      if (data && Array.isArray(data.pens)) {
        data.locked = 1
        console.log('json数据读取完毕', data)
        this.canvas.open(data)
        if (this.resize) {
          this.resizeCanvas()
        }
      } else {
        console.log('暂无可用配置')
      }
    },
    onMessage (event, data) {
      switch (event) {
        case 'dblclick':
          console.log('双击')
          break;
        case 'node':
          if (data.data.legendType && data.data.legendType === 'plane') {
            this.$emit('nodeClick', data)
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
      console.log('外层容器宽高', contianerWidth, contianerHeight)
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
        return item.tags.indexOf(tag) !== -1 // 关联tag
      })
      if (targetNode) {
        console.log('当前执行节点', targetNode)
        return targetNode
      } else {
        console.warn(`没有找到tag为${tag}的目标节点`)
        return
      }
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

    handle_changeStatus (tag, status) { // 设置状态
      let targetNode = this.getNode(tag)
      if (targetNode) {
        let arr = targetNode.image.split('.svg')[0].split('_')
        arr[arr.length - 1] = status
        targetNode.image = arr.join('_') + '.svg'
        this.canvas.render()
      }
    },

    // 设备图例对应的五种状态：
    // 告警： alarm : #ff4a4a
    // 故障： fault: #ffb300
    // 离线： offline: #9655ff
    // 运行： runing: #00dc94
    // 正常： normal: #999
    handle_changeIcon (tag, status) { // 改变icon状态
      let targetNode = this.getNode(tag)
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

    handle_changeFont (tag, status, text) { // 修改
      let targetNode = this.getNode(tag)
      if (targetNode) {
        if (text) {
          targetNode.font.text = text
        }
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
    handle_elevatorRun (tag, targetStep) {
      console.log('电梯运行', tag, targetStep)
      let elevatorNode = this.canvas.data.pens.find(item => {
        return item.tags.indexOf(`elevator#${tag}`) !== -1 // 关联tag
      })
      if (!elevatorNode) {
        return
      }
      let pointArr = [] // 所有坐标点
      let runStep = 1

      let data = elevatorNode.data
      console.log('目标楼层：', targetStep)
      let step = Math.round(Math.abs(data.elevatorStartY - data.elevatorEndY) / data.elevatorStep)
      let currY = elevatorNode.rect.ey
      let currStep = Math.round(data.elevatorStep - (currY - data.elevatorEndY) / step + 1)
      console.log('当前楼层：', currStep)
      runStep = currStep - targetStep
      console.log('运行方向', runStep < 0 ? `上行${-runStep}层` : `下行${runStep}层`)
      let temp = Math.abs(data.elevatorStartY - data.elevatorEndY) / Math.abs(data.elevatorStartX - data.elevatorEndX)
      let xPoint = 0
      let yPoint = 0
      for (let i = 1; i <= data.elevatorStep; i++) {
        if (data.elevatorEndX !== data.elevatorStartX) {
          if (data.elevatorEndX < data.elevatorStartX) { // 第二象限
            yPoint = data.elevatorEndY + step * i
            xPoint = data.elevatorEndX + step * i / temp
          } else { // 第一象限
            yPoint = data.elevatorEndY + step * i
            xPoint = data.elevatorStartX + step * (data.elevatorStep - i) / temp
          }
        } else {
          xPoint = data.elevatorStartX
          yPoint = step * i + data.elevatorEndY
        }
        pointArr.push(
          {
            num: (data.elevatorStep - i + 1),
            x: xPoint,
            y: yPoint
          }
        )
      }
      if (!elevatorNode.animateFrames.length) {
        pointArr.map(item => {
          this.canvas.addLine(
            new Line({
              name: 'line',
              fromArrow: '',
              toArrow: '',
              from: new Point(item.x - 2, item.y),
              to: new Point(item.x + 2, item.y),
              strokeStyle: '#999',
              lineWidth: 1
            })
          )
        })
        this.canvas.addLine(
          new Line({
            name: 'line',
            fromArrow: '',
            toArrow: '',
            from: new Point(data.elevatorStartX, data.elevatorStartY),
            to: new Point(data.elevatorEndX, data.elevatorEndY),
            strokeStyle: '#999',
            lineWidth: 1
          })
        )
        this.canvas.render()
      }

      elevatorNode.animateFrames = []
      const state = Node.cloneState(elevatorNode);
      let targetPoint = pointArr.find(item => {
        return item.num === targetStep
      })
      state.rect.x = targetPoint.x - state.rect.width / 2 // 设置为图例中点
      state.rect.y = targetPoint.y - state.rect.height
      console.log('动画时间', Math.round(300 * Math.abs(runStep)))
      elevatorNode.animateFrames.push({
        duration: Math.round(300 * Math.abs(runStep)),
        linear: true,
        state: Node.cloneState(state)
      });
      elevatorNode.animateCycle = 1
      elevatorNode.animateDuration = 0;
      for (const item of elevatorNode.animateFrames) {
        elevatorNode.animateDuration += item.duration;
      }
      elevatorNode.animateStart = Date.now()
      this.canvas.animate()
    },
  }

}
</script>

<style lang="scss">
.topology-client {
  height: 100%;
  width: 100%;
}
</style>