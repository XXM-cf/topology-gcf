<template lang="pug">
  #topology-client(ref="myCanvas" style="width:100%; height:100%;overflow:hidden")
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
    resize: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      canvasOptions: {
        lock: 1,
        disableScale: true,
        activeColor: 'transparent' // 去除选中边框
      },
      canvas: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.canvasOptions.on = this.onMessage
      this.canvas = new Topology('topology-client', this.canvasOptions)
    },
    open (data) {
      this.$nextTick(() => {
        if (data && Array.isArray(data.pens)) {
          data.locked = 1 // 锁定画布
          console.log('json数据读取完毕', data)
          this.canvas.open(data)
          this.canvas.divLayer.canvas.focus()
          if (this.resize) {
            this.resizeCanvas()
          }
          this.canvas.render()
        } else {
          console.log('暂无可用配置')
        }
      })
    },
    onMessage (event, data) {
      switch (event) {
        case 'node':
          this.$emit('nodeClick', data)
          console.log('当前点击节点 -->', data)
          break;
        case 'space':
          this.$emit('spaceClick', data)
          break
      }
    },
    render () {
      this.canvas.render()
      this.canvas.animate()
    },
    resizeCanvas () { // 适配外框
      let canvasRect = this.canvas.getRect() // 画布大小
      console.log('原始画布宽高', canvasRect.width, canvasRect.height)
      // 限制最大画布为1920 * 1080
      let canvasWidth = parseInt(canvasRect.width)
      let canvasHeight = parseInt(canvasRect.height)

      let contianerWidth = this.$refs.myCanvas.clientWidth
      let contianerHeight = this.$refs.myCanvas.clientHeight

      console.log('外层容器宽高', contianerWidth, contianerHeight)

      let widthNum = parseFloat((canvasWidth / contianerWidth).toFixed(2))
      let heightNum = parseFloat((canvasHeight / contianerHeight).toFixed(2))

      let scaleWidthNum = parseFloat((contianerWidth / canvasWidth).toFixed(2))
      let scaleHeightNum = parseFloat((contianerHeight / canvasHeight).toFixed(2))
      console.log('宽高比例', widthNum, heightNum)

      if (widthNum <= 1 && heightNum <= 1) { // 需放大
        console.log('范围内，需放大', Math.min(scaleWidthNum, scaleHeightNum))
        this.canvas.scaleTo(Math.min(scaleWidthNum, scaleHeightNum)) // 缩放
      } else if (heightNum > 1 && widthNum <= 1) { // 高度超出
        console.log('高度超出', scaleHeightNum)
        this.canvas.scaleTo(scaleHeightNum) // 缩小
      } else if (widthNum > 1 && heightNum <= 1) { // 宽度超出
        console.log('宽度超出', (scaleWidthNum))
        this.canvas.scaleTo(scaleWidthNum) // 缩小
      } else { // 宽高都超出
        console.log('全部超出', Math.min(scaleWidthNum, scaleHeightNum))
        this.canvas.scale(Math.min(scaleWidthNum, scaleHeightNum)) // 缩放
      }

      let newCanvasRect = this.canvas.getRect() // 画布大小
      console.log('新画布宽高', newCanvasRect.width, newCanvasRect.height)
      this.canvas.translate(-newCanvasRect.x + Math.abs(parseInt(newCanvasRect.width) - contianerWidth) / 2,
        -newCanvasRect.y + Math.abs(parseInt(newCanvasRect.height) - contianerHeight) / 2) // 平移至外层画布中间
    },

    getNode (tag) { // 寻找目标节点，用来操作动画，样式切换等
      let targetNodeArr = this.canvas.data.pens.filter(item => {
        if (item.data.tag) {
          return item.data.tag === tag // 关联tag
        }
      })
      if (targetNodeArr.length) {
        console.log('当前执行节点', targetNodeArr)
        return targetNodeArr
      } else {
        console.warn(`没有找到tag为${tag}的目标节点`)
        return false
      }
    },
    // 设备图例对应的五种状态：
    // 告警： alarm : #ff4a4a
    // 故障： fault: #ffb300
    // 离线： offline: #9655ff
    // 运行： running: #00dc94
    // 正常： normal: #333

    handle_update (tag, status, value) { // 更新数据: 文案，图标，多态图片、多档图片
      let nodes = this.getNode(tag)
      if (nodes.length) {
        nodes.map(node => {
          switch (node.data.legendType) {
            case 'plane': // 平面图图标
              this.handle_changeIcon(node, status)
              break;
            case 'text': // 文字
              this.handle_changeFont(node, status, value)
              break;
            case 'animateImg': // 风机图片
              this.handle_circle(node, status)
              break;
            case 'enumImg': // 多档图片
            case 'statusImg': // 多态图片
              this.handle_changeImg(node, status)
              break;
            case 'elevator': // 电梯
              this.handle_elevatorRun(node, status, value)
              break
            case 'waterLevel': // 液位
              this.handle_changeWaterLevel(node, value)
              break
          }
          this.canvas.updateProps(node)
        })
      }
    },
    handle_circle (targetNode, status) { // 旋转
      if (status === 'running') {
        if (targetNode.animateFrames.length) {
          targetNode.rotate = 0
          targetNode.animateStart = Date.now()
          this.canvas.animate()
        } else {
          const state = Node.cloneState(targetNode)
          targetNode.rotate = 0
          targetNode.animateType = 'forwardRotate'
          state.rotate = 360;
          targetNode.animateFrames.push({
            duration: 1000,
            linear: true,
            state
          });
          targetNode.animateFrames.push({
            duration: 0,
            linear: true,
            state: Node.cloneState(targetNode)
          });
          for (const item of targetNode.animateFrames) {
            targetNode.animateDuration += item.duration;
          }
          targetNode.animateStart = Date.now()
          this.canvas.animate()
        }
      } else {
        targetNode.animateStart = 0
        targetNode.rotate = 0
        this.canvas.animate()
      }
    },
    handle_changeImg (targetNode, status) { // 改变图片
      if (!status) {
        console.error(`节点状态错误，当前状态${status}`)
        return
      } else {
        let arr = targetNode.image.split('.svg')[0].split('_')
        arr[arr.length - 1] = status
        targetNode.image = arr.join('_') + '.svg'
      }
    },
    handle_changeIcon (targetNode, status) { // 改变icon状态
      targetNode.animateStart = 0
      targetNode.fillStyle = 'rgba(0,0,0,0)'
      targetNode.animateCycleIndex = 0
      const state = Node.cloneState(targetNode)
      switch (status) { // 告警
        case 'normal':
          targetNode.iconColor = '#333'
          break;
        case 'running':
          targetNode.iconColor = '#00dc94'
          break;
        case 'offline':
          targetNode.iconColor = '#9655ff'
          break;
        case 'fault':
          targetNode.iconColor = '#ffb300'
          break;
        case 'alarm':
          targetNode.iconColor = '#ff4a4a' // 改为红色
          if (targetNode.animateFrames.length) {
            targetNode.animateStart = Date.now()
            this.canvas.animate()
          } else {
            targetNode.animateType = 'heart'
            state.rect.x -= 10;
            state.rect.ex += 10;
            state.rect.y -= 10;
            state.rect.ey += 10;
            state.rect.width += 20;
            state.rect.height += 20;
            state.fillStyle = 'rgba(255,74,74,0.5)';
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
            break;
          }
          break;
      }
    },
    handle_changeFont (targetNode, status, text) { // 修改文案
      if (text) {
        targetNode.text = text
      }
      switch (status) { // 告警
        case 'normal':
          targetNode.font.color = '#333'
          break;
        case 'running':
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
    },
    handle_elevatorRun (elevatorNode, status, value) {
      let targetStep = parseInt(value)
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
      elevatorNode.animateFrames = []
      elevatorNode.animateDuration = 0;
      elevatorNode.animateStart = 0;

      const state = Node.cloneState(elevatorNode);
      let targetPoint = pointArr.find(item => {
        return item.num === targetStep
      })
      if (targetPoint) {
        state.rect.x = targetPoint.x - state.rect.width / 2 // 设置为图例中点
        state.rect.y = targetPoint.y - state.rect.height
        console.log('动画时间', Math.round(300 * Math.abs(runStep)))

        elevatorNode.animateType = 'elevatorRun';
        elevatorNode.animateFrames.push({
          duration: Math.round(300 * Math.abs(runStep)),
          linear: true,
          state: Node.cloneState(state)
        });

        elevatorNode.animateCycle = 1
        for (const item of elevatorNode.animateFrames) {
          elevatorNode.animateDuration += item.duration;
        }
        elevatorNode.animateStart = Date.now()
        this.canvas.animate()
      } else {
        console.error(`上报楼层不在指定范围内，指定楼层：${targetStep}，该电梯最大楼层：${data.elevatorStep}`)
        return
      }
    },
    handle_changeWaterLevel (targetNode, value) { // 液位变化
      if (Number(value) > targetNode.data.waterLevelNum) {
        this.$message({
          message: '参数值超出指定范围',
          type: 'error'
        })
        return
      }
      targetNode.rect.height = Number(value) * targetNode.data.step
      targetNode.rect.y = targetNode.rect.ey - targetNode.rect.height
      targetNode.text = Number(value) / targetNode.data.waterLevelNum * 100 + '%'
      this.canvas.updateProps()
    },
  },
  destroyed () {
    this.canvas.destroy()
  }
}
</script>