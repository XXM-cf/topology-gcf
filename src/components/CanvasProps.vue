<template lang="pug">
.topology-canvas-props
  .tips 操作栏
  .group
    .title 快捷操作
    .container
      .item.full-item
       el-button(@click="onAddPipeLine") 绘制水管
       el-button(@click="handleChangeLine('horizontal')") 垂直线条
       el-button(@click="handleChangeLine('vertical')") 水平线条

  .group
    .title 基础配置
    .container
      .item.full-item
        .label 选择底图
        el-select(v-model='baseImg', placeholder='选择底图', @change='handleBaseImg')
          el-option(v-for='item in imgList', :key='item.value', :label='item.label', :value='item.value')
      .item
        .label 禁用滚轮缩放
        el-switch(v-model="canvasOptions.disableScale" @change='onChangeOptions')

  div(v-if="!props.node && !props.line && !props.multi")
    .bottom
      .title 小提示
      ul.group
        li 方向键：控制节点移动5个像素
        li Ctrl + 方向键：控制节点移动1个像素
        li Ctrl + 鼠标移动：移动整个画布
        li Ctrl + 鼠标滚轮：缩放
        li 双击连线，添加一条线段
        li 添加或选中节点，右侧支持各种属性修改

  // 多节点对齐
  .props-container(v-if="props.multi")
    .group
      .title 节点对齐
      .item.full-item
        span(
          v-for="item of nodesAlgin" :key="item"
          style="padding-left: 20px;cursor: pointer")
          i(:class="`iconfont icon-align-${ item }`"
            @click="onAlignNodes(item)")
    .group
      .title 排版（单位：px）
      .container
        .item
          .label 最大宽度
          el-input-number(v-model='layoutParams.maxWidth', controls-position='right', @change='onChange')
        .item
          .label 图例宽度
          el-input-number(v-model='layoutParams.nodeWidth', controls-position='right', @change='onChange')
        .item
          .label 图例高度
          el-input-number(v-model='layoutParams.nodeHeight', controls-position='right', @change='onChange')
        .item
          .label 水平个数
          el-input-number(v-model='layoutParams.maxCount', controls-position='right', @change='onChange')
        .item
          .label 水平间距
          el-input-number(v-model='layoutParams.spaceWidth', controls-position='right', @change='onChange')
        .item
          .label 垂直间距
          el-input-number(v-model='layoutParams.spaceHeight', controls-position='right', @change='onChange')
        .item.full-item
          el-button(type="primary" @click="onLayoutNodes" style="width:100%") 立即排版
  // 线条属性
  .props-container(v-if="props.line")
    .group
      .title 业务属性
      .item.full-item
        .label 关联业务（点位）
        el-select(
          v-model='props.line.data.tag'
          placeholder='关联设备'
          filterable
          clearable
          @change='onChange')
          el-option(
            v-for='(item,index) in deviceList',
            :key='index',
            :label='item.label',
            :value='item.value')
    .group
      .title 位置和大小
      .container
        .item
          .label 起点X（px)
          el-input-number(v-model='props.line.from.x', controls-position='right', @change='onChange')
        .item
          .label 起点Y （px）
          el-input-number(v-model='props.line.from.y', controls-position='right', @change='onChange')
        .item
          .label 终点X（px)
          el-input-number(v-model='props.line.to.x', controls-position='right', @change='onChange')
        .item
          .label 终点Y （px）
          el-input-number(v-model='props.line.to.y', controls-position='right', @change='onChange')

    .group
      .title 线条属性
      .container
        .item
          .label 连线类型
          el-select(v-model='props.line.name', placeholder='选择连线类型', @change='onChange')
            el-option(v-for='item in lineTypeOptions', :key='item.value', :label='item.label', :value='item.value')
              span {{ item.label }}
              svg(xmlns="http://www.w3.org/2000/svg" version="1.1" style="width: 100px")
                  g(fill="none" stroke="black" stroke-width="1")
                    path(d="M0 9 l100 0" v-if="item.value === 'line'")
                    path(d="M0 9 a100,50 0 0,1 85,0" v-if="item.value === 'curve'")
                    path(d="M0 4 l40 0 l0 12 l40 0" v-if="item.value === 'polyline'")
        .item
          .label 连线样式
          el-select(v-model='props.line.dash', placeholder='选择连线类型', @change='onChange')
            el-option(v-for='index in 4', :key='index', :label='index', :value='index -1')
              svg(xmlns="http://www.w3.org/2000/svg" version="1.1" style="width: 100px")
                  g(fill="none" stroke="black" stroke-width="1")
                    path(d="M0 9 l85 0" v-if="index ===  1")
                    path(stroke-dasharray="5,5" d="M0 9 l85 0" v-if="index === 2")
                    path(stroke-dasharray="10,10" d="M0 9 l85 0" v-if="index === 3")
                    path(stroke-dasharray="10,10,2,10" d="M0 9 l85 0" v-if="index === 4")
        .item
          .label 连线颜色
          el-color-picker(v-model="props.line.strokeStyle" show-alpha @change='onChange')
        .item
          .label 连线宽度（px）
          el-input-number(v-model="props.line.lineWidth" @change='onChange')
        .item
          .label 边框颜色
          el-color-picker(v-model="props.line.borderColor" show-alpha @change='onChange')
        .item
          .label 边框宽度（px）
          el-input-number(v-model="props.line.borderWidth" @change='onChange')
        .item.full-item
          .label 透明度（0-1）
          el-input-number(:min="0" :max="1" v-model="props.line.globalAlpha" @change='onChange')

    .group
      .title 预设动画
      .container
        .item.full-item
          .label 动画效果
          el-select(v-model="props.line.animateType" @change='onChangeLineAnimate')
            el-option(
              v-for="item in lineAnimateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value")
        .item
          .label 动画效果
          el-color-picker(v-model="props.line.animateColor" show-alpha @change='onChangeLineAnimate')
        .item
          .label 圆点大小（px）
          el-input-number(v-model="props.line.animateDotSize" @change='onChangeLineAnimate')
        .item
          .label 动画速度
          el-input-number(
            :min="1" :max="5"
            v-model="props.line.animateSpan"
            @change='onChangeLineAnimate')
        .item
          .label 循环次数
          el-input-number(
            v-model="props.line.animateCycle"
            placeholder="<1表示无限循环"
            @change='onChangeLineAnimate')

  // 节点属性
  .props-container(v-if="props.node")
    .group
      .title 业务属性
      .item.full-item
        .label 关联业务（点位）
        el-select(
          v-model='props.node.data.tag',
          clearable
          filterable
          placeholder='关联设备'
          @change='onChange')
          el-option(
            v-for='(item,index) in deviceList',
            :key='index',
            :label='item.label',
            :value='item.value')
    .group
      .title 位置和大小
      .container
        .item
          .label 左上角X（px)
          el-input-number(v-model='props.node.rect.x', controls-position='right', @change='onChange')
        .item
          .label 左上角Y （px）
          el-input-number(v-model='props.node.rect.y', controls-position='right', @change='onChange')
        .item
          .label 右下角X（px)
          el-input-number(v-model='props.node.rect.ex', controls-position='right', @change='onChange')
        .item
          .label 右下角Y （px）
          el-input-number(v-model='props.node.rect.ey', controls-position='right', @change='onChange')

        .item
          .label 宽（px）
          el-input-number(v-model='props.node.rect.width', controls-position='right', @change='onChange')
        .item
          .label 高（px）
          el-input-number(v-model='props.node.rect.height', controls-position='right', @change='onChange')

    .group
      .title 边框属性
      .container
        .item
          .label 边框样式
          el-select(v-model='props.node.dash', placeholder='选择连线类型', @change='onChange')
            el-option(v-for='index in 4', :key='index', :label='index', :value='index -1')
              svg(xmlns="http://www.w3.org/2000/svg" version="1.1" style="width: 100px")
                  g(fill="none" stroke="black" stroke-width="1")
                    path(d="M0 9 l85 0" v-if="index ===  1")
                    path(stroke-dasharray="5,5" d="M0 9 l85 0" v-if="index === 2")
                    path(stroke-dasharray="10,10" d="M0 9 l85 0" v-if="index === 3")
                    path(stroke-dasharray="10,10,2,10" d="M0 9 l85 0" v-if="index === 4")
        .item
          .label 边框颜色
          el-color-picker(v-model="props.node.strokeStyle" show-alpha @change='onChange')
        .item
          .label 边框宽度（px）
          el-input-number(v-model="props.node.lineWidth" show-alpha @change='onChange')
        .item
          .label 背景颜色
          el-color-picker(v-model="props.node.fillStyle" show-alpha @change='onChange')
        .item
          .label 透明度（0-1）
          el-input-number(v-model="props.node.globalAlpha" @change='onChange')
        .item
          .label 旋转角度（0-360）
          el-input-number(:min="0" :max="360" v-model="props.node.rotate" @change='onChange')
    .group
      .title 图片属性
      .item.full-item
        .label 图片链接（px）
        el-input(v-model='props.node.image', @change='onChange')

    .group
      .title 字体图标属性
      .container
        .item
          .label 图标大小（px）
          el-input-number(:min="6" :max="100" v-model='props.node.iconSize', @change='onChange')
        .item
          .label 图标颜色
          el-color-picker(v-model="props.node.iconColor" show-alpha @change='onChange')

    .group
      .title 文字属性
      .container
        .item
          .label 颜色
          el-color-picker(v-model="props.node.font.color" show-alpha @change='onChange')
        .item
          .label 大小（px）
          el-input-number(v-model="props.node.font.fontSize" @change='onChange')
        .item
          .label 加粗
          el-select(v-model="props.node.font.fontWeight" @change='onChange')
            el-option(
              v-for="item in fontWeightOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value")
        .item
          .label 倾斜
          el-select(v-model="props.node.font.fontStyle" @change='onChange')
            el-option(
              v-for="item in fontStyleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value")
        .item
          .label 水平对齐
          el-select(v-model="props.node.font.textAlign" @change='onChange')
            el-option(
              v-for="item in textAlignOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value")
        .item
          .label 垂直对齐
          el-select(v-model="props.node.font.textBaseline" @change='onChange')
            el-option(
              v-for="item in textBaselineOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value")
        .item.full-item
          .label 文字内容
          el-input(type="textarea" v-model="props.node.text" @change='onChange')

    .group
      .title 预设动画
      .container
        .item.full-item
          .label 动画效果
          el-select(v-model="props.node.animateType" @change='onChangeAnimate')
            el-option(
              v-for="item in animateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value")
    .group
      .title 媒体资源
      .container
        .item.full-item
          .label 音频URL
          el-input(v-model="props.node.audio" @change='onChange')
        .item.full-item
          .label 视频URL
          el-input(v-model="props.node.video" @change='onChange')
        .item.full-item
          .label 联动视频地址
          el-select(v-model="props.node.video" @change='onChange')
            el-option(
              v-for="item in videoList"
              :key="item.value"
              :label="item.label"
              :value="item.value")
        .item.full-item
          .label 网页URL
          el-input(v-model="props.node.iframe" @change='onChange')

    .group(v-if="props.node.data.legendType === 'elevatorTrack'")
      .title 电梯配置
      .container
        .item
          .label 设置楼层
          el-input-number(v-model="props.node.data.elevatorStep" @change='onChange')
        .item(v-show="props.node.data.elevatorStep")
          .label 操作
          el-button( @click="handleAddElvator") 生成轨道
        .item(v-show="props.node.data.elevatorStep")
          .label 测试
          el-button(@click="handleElevatorRunTest") 测试运行

</template>

<script >
import { Node } from 'topology-core/models/node'
import { Line } from 'topology-core/models/line'
import { Point } from 'topology-core/models/point'
import { alignNodes, layout, spaceBetween } from 'topology-layout'

export default {
  props: {
    imgList: {
      type: Array,
      default: () => []
    },
    deviceList: {
      type: Array,
      default: () => []
    },
    canvas: {
      type: Object,
      require: true
    },
    options: {
      type: Object,
      require: true
    },
    props: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      baseImg: '', // 地图
      layoutParams: {
        maxWidth: 0, // 布局
        nodeWidth: 0,
        nodeHeight: 0,
        maxCount: 0,
        spaceWidth: 30,
        spaceHeight: 30
      },
      canvasOptions: {
        disableScale: this.options.disableScale
      },

      // 属性枚举值
      fontWeightOptions: [
        {
          value: 'normal',
          label: '正常'
        },
        {
          value: 'bold',
          label: '加粗'
        }
      ],
      fontStyleOptions: [
        {
          value: 'normal',
          label: '正常'
        },
        {
          value: 'italic',
          label: '倾斜'
        }
      ],
      textAlignOptions: [
        {
          value: 'left',
          label: '左对齐'
        },
        {
          value: 'center',
          label: '居中'
        },
        {
          value: 'right',
          label: '右对齐'
        }
      ],
      textBaselineOptions: [
        {
          value: 'top',
          label: '顶部对齐'
        },
        {
          value: 'middle',
          label: '居中'
        },
        {
          value: 'bottom',
          label: '底部对齐'
        }
      ],
      lineAnimateOptions: [
        {
          value: 'beads',
          label: '水珠流动'
        },
        {
          value: 'dot',
          label: '圆点'
        },
        {
          value: 'comet',
          label: '彗星'
        }
      ],
      animateOptions: [
        {
          value: 'forwardRotate',
          label: '顺时针旋转'
        },
        {
          value: 'reverseRotate',
          label: '逆时针旋转'
        },
        {
          value: 'heart',
          label: '告警'
        },
        {
          value: 'show',
          label: '炫耀'
        }

      ],
      lineTypeOptions: [
        { label: '直线', value: 'line' },
        { label: '曲线', value: 'curve' },
        { label: '线段', value: 'polyline' }
      ],
      nodesAlgin: ['left', 'right', 'top', 'bottom', 'center', 'middle', 'between'],
      nodeEnable: false,
      // ---------- 业务数据 ------------- //
      videoList: [
        {
          label: '火灾联动',
          value: 'https://media.w3.org/2010/05/sintel/trailer.mp4'
        },
        {
          label: '动物世界',
          value: 'http://vjs.zencdn.net/v/oceans.mp4'
        }
      ]
    }
  },

  methods: {
    handleBaseImg (val) {
      this.$emit('changeBaseImg', val)
    },
    onChangeLineAnimate () { // 线条动画
      this.props.line.animateStart = 0;
      this.canvas.animate()
      setTimeout(() => {
        this.props.line.animateStart = Date.now();
        this.canvas.animate()
      }, 100);
    },


    onChangeAnimate () { // 节点动画效果
      if (this.props.node.animateType === 'custom') { // 自定义
        return;
      }
      this.props.node.animateFrames = [];
      const state = Node.cloneState(this.props.node);
      switch (this.props.node.animateType) {
        case 'forwardRotate': // 顺时针旋转
          state.rotate = 360;
          this.props.node.animateFrames.push({
            duration: 1000,
            linear: true,
            state
          });
          this.props.node.animateFrames.push({
            duration: 0,
            linear: true,
            state: Node.cloneState(this.props.node)
          });
          break;
        case 'reverseRotate': // 逆时针旋转
          state.rotate = -360;
          this.props.node.animateFrames.push({
            duration: 1000,
            linear: true,
            state
          });
          this.props.node.animateFrames.push({
            duration: 0,
            linear: true,
            state: Node.cloneState(this.props.node)
          });
          break;
        case 'heart':
          state.rect.x -= 5;
          state.rect.ex += 5;
          state.rect.y -= 5;
          state.rect.ey += 5;
          state.rect.width += 10;
          state.rect.height += 10;
          state.strokeStyle = 'rgba(255,74,74,0.6)';
          state.lineWidth = 10;
          this.props.node.animateFrames.push({
            duration: 400,
            linear: true,
            state
          });

          this.props.node.animateFrames.push({
            duration: 400,
            linear: true,
            state: Node.cloneState(this.props.node)
          });
          break;
        case 'show':
          state.strokeStyle = '#fa541c';
          state.rotate = -10;
          this.props.node.animateFrames.push({
            duration: 100,
            linear: true,
            state: Node.cloneState(state)
          });
          state.rotate = 10;
          this.props.node.animateFrames.push({
            duration: 100,
            linear: true,
            state: Node.cloneState(state)
          });
          state.rotate = 0;
          this.props.node.animateFrames.push({
            duration: 100,
            linear: true,
            state: Node.cloneState(state)
          });
          break;
      }
      this.onAnimateDuration()
      this.props.node.animateStart = Date.now()
      this.canvas.animate()
    },
    onAnimateDuration () {
      this.props.node.animateDuration = 0;
      for (const item of this.props.node.animateFrames) {
        this.props.node.animateDuration += item.duration;
      }
    },
    onAlignNodes (align) { // 多节点对齐
      if (align === 'between') {
        this.onSpaceBetween()
      } else {
        alignNodes(this.canvas.activeLayer.pens, this.canvas.activeLayer.rect, align);
        this.canvas.updateProps()
      }
    },
    onLayoutNodes () {
      this.layoutParams.maxWidth = this.canvas.activeLayer.rect.width
      layout(this.canvas.activeLayer.pens, this.layoutParams)
      this.canvas.updateProps()
    },
    onSpaceBetween () {
      spaceBetween(this.canvas.activeLayer.pens, this.canvas.activeLayer.rect.width);
      this.canvas.updateProps();
    },
    onChange (value) {
      this.$emit('change', this.props.node)
    },
    onChangeOptions () {
      this.$emit('changeOptions', this.canvasOptions)
    },

    handleChangeLine (state) { // 改变线条
      if (this.props.line) {
        if (state === 'vertical') {
          this.props.line.to.y = this.props.line.from.y
        } else {
          this.props.line.to.x = this.props.line.from.x
        }
        this.$emit('change', this.props.node)
      }
    },

    handleAddElvator () { // 添加电梯及轨道
      let parentNode = this.props.node
      if (!parentNode.data.tag) {
        this.$message({
          message: '该轨道暂未绑点，无法添加',
          type: 'error'
        })
        return
      }
      let startPoint = parentNode.anchors[3].rotate(parentNode.rotate, {
        x: parentNode.rect.center.x,
        y: parentNode.rect.center.y
      })
      let endPoint = parentNode.anchors[1].rotate(parentNode.rotate, {
        x: parentNode.rect.center.x,
        y: parentNode.rect.center.y
      })

      let node = new Node({
        rect: {
          width: parentNode.rect.width,
          height: parentNode.rect.width,
          x: startPoint.x - parentNode.rect.width / 2,
          y: startPoint.y - parentNode.rect.width
        },
        rotate: parentNode.rotate,
        data: {
          legendType: 'elevator',
          elevatorStartX: startPoint.x, // 起点坐标
          elevatorStartY: startPoint.y, // 终点坐标
          elevatorEndX: endPoint.x,
          elevatorEndY: endPoint.y,
          elevatorStep: parentNode.data.elevatorStep,
          tag: parentNode.data.tag // 复制轨道绑点至电梯图例
        },
        image: 'http://113.31.118.32:9000/test/topology/HVAC/Elevator/elevator_running.svg',
        name: 'image',
      })
      parentNode.data.tag = '' // 去除电梯轨道绑点
      this.canvas.addNode(node)
      this.canvas.render()
    },
    handleElevatorRunTest () {
      let randomNum = Math.ceil(Math.random() * 5) // 随机模拟1-5层
      this.handleElevatorRun(randomNum)
    },
    handleElevatorRun (targetStep) {
      let elevatorNodeArr = this.canvas.data.pens.filter(item => {
        return item.data.legendType === 'elevator' // 关联tag
      })
      if (!elevatorNodeArr.length) {
        return
      }
      elevatorNodeArr.map(elevatorNode => {
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
      })

    },


    onAddPipeLine () {
      this.canvas.addLine(
        new Line({
          name: 'line',
          fromArrow: '',
          toArrow: '',
          from: new Point(100, 100),
          to: new Point(300, 100),
          controlPoints: [
            new Point(200, 100),
            new Point(200, 300),
          ],
          strokeStyle: '#B4B5B0',
          lineWidth: 15,
          borderWidth: 5,
          borderColor: '#51514E'
        })
      )
      this.canvas.render()
    }
  }
}
</script>

<style lang="scss">
.topology-canvas-props {
  .props-container {
    overflow-x: hidden;
    overflow-y: auto;
    font-size: 12px;
  }
  .bottom {
    position: absolute;
    bottom: 20px;
    .title {
      padding: 10px;
      border-bottom: 1px solid #ccc;
    }
    .group {
      li {
        padding: 5px 0;
      }
    }
  }
  .tips {
    background: rgb(219, 224, 225);
    padding: 10px;
    font-size: 14px;
    text-align: left;
    font-weight: bold;
  }
  .group {
    .title {
      color: #0d1a26;
      font-weight: 600;
      padding: 10px;
      font-size: 12px;
      margin-top: 5px;
      border-bottom: 1px solid #ccc;
    }
    .container {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .item {
      padding: 5px 10px;
      width: 50%;
      .label {
        padding-bottom: 10px;
      }
    }
    .full-item {
      padding: 5px 10px;
      width: 100%;
      .el-select,
      .el-input {
        width: 100%;
      }
    }
    .el-color-picker__trigger,
    .el-color-picker {
      width: 100%;
    }
  }
}
</style>
