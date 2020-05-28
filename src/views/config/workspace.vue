<template lang="pug">
  .topology-workspace
    .tools
      el-collapse(v-model="activeNames")
        el-collapse-item(
          v-for='(item, index) in tools', :key='index'
          :title="item.group"  Consistency :name="item.group")
          .buttons
            a(
              v-for='(btn, i) in item.children',
              :key='i',
              :title='btn.name',
              :class="{'imgContent' : btn.data.name === 'image'}"
              :draggable='btn.data',
              @dragstart='onDrag($event, btn)')
              .content
                img(
                  v-if="btn.data.name === 'image'",
                  :src='btn.data.image')
                i(v-else-if='btn.data.iconClass', :class='`iconfont ${btn.data.iconClass}`')
                i(v-else='', :class='`iconfont ${btn.icon}`' style="font-size:26px")
                .name {{ btn.name }}



    .full
      #topology-canvas(@contextmenu='onContextMenu($event)')
      svg(
        class="svg-grid"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style="z-index: 0"
        )
        defs
          pattern(id="grid" width="10" height="10" patternUnits="userSpaceOnUse")
            path(d="M 10 0 L 0 0 0 10" fill="none" stroke="#f0f0f0" stroke-width="1")
        rect(width="100%" height="100%" fill="url(#grid)")
    .props

      CanvasProps(
        :imgList="imgList"
        :deviceList="deviceList"
        :canvas='canvas'
        :options="canvasOptions"
        :props.sync='props'
        @change='onUpdateProps'
        @changeOptions="onChangeOptions"
        @changeBaseImg='onSetBaseImg')
    .context-menu(v-if='contextmenu.left', :style='this.contextmenu')
      CanvasContextMenu(:canvas='canvas', :props.sync='props')
</template>

<script>
import { Topology } from '@topology/core'
import { Node } from '@topology/core'
import { Line } from '@topology/core'
import { Point } from '@topology/core'
import { Direction } from '@topology/core'
import * as FileSaver from 'file-saver'
import { Store } from 'le5le-store'


import { Tools, canvasRegister } from '../../services/canvas'

import CanvasProps from '../../components/CanvasProps'
import CanvasContextMenu from '../../components/CanvasContextMenu'
export default {
  props: {
    globalCanvasConfig: {
      type: Object,
      default: () => { }
    },
    imgList: {
      type: Array,
      default: () => []
    },
    deviceList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    CanvasProps,
    CanvasContextMenu
  },
  data () {
    return {
      eventSubscribe: null,
      currCanvasEvent: {}, // 事件通信，储存当前触发事件
      activeNames: [],
      tools: Tools,
      canvas: {},
      canvasOptions: {
        cacheLen: 10, // 缓存十步操作
        rotateCursor: 'http://113.31.118.32:9000/test/topology/HVAC/rotate.cur',
        disableScale: true,
        canvasSize: 'custom', // 画布大小：standard：标准，不允许缩放，custom:自定义代销
      },
      props: {
        node: null,
        line: null,
        nodes: null,
        multi: false,
        locked: false
      },
      contextmenu: {
        left: null,
        top: null,
        bottom: null
      }
    }
  },
  watch: {
    currCanvasEvent (curVal) { // 事件系统，通过订阅触发相应事件
      if (this['handle_' + curVal.name]) {
        this['handle_' + curVal.name](curVal.data)
      }
    }
  },

  mounted () {
    this.init()
    this.eventSubscribe = Store.subscribe('canvasEvent', value => { // 订阅事件
      this.currCanvasEvent = value
    })
  },
  methods: {
    init () {
      this.canvasOptions.on = this.onMessage
      this.canvas = new Topology('topology-canvas', this.canvasOptions)
      this.canvas.render()
    },
    onDrag (event, node) { // 拖拽布局
      event.dataTransfer.setData('Text', JSON.stringify(node.data))
    },
    onSetBaseImg (val) { // 设置底图
      const node = new Node({
        name: 'image',
        rect: {
          width: this.canvas.options.canvasSize === 'standard' ? 1500 : 1000,
          height: this.canvas.options.canvasSize === 'standard' ? 640 : 500,
          x: 0,
          y: 0
        },
        data: {
          baseImg: true
        },
        locked: 1,
        hideAnchor: true,
        image: val
      })
      let currBaseimgNode = this.canvas.data.pens.find(item => {
        return item.data.baseImg
      })
      if (currBaseimgNode) { // 已存在底图，则替换底图
        currBaseimgNode.image = val
      } else {
        this.canvas.addNode(node, false) // 新建
        this.canvas.bottom(node) // 手动置底
      }
      this.canvas.render()
    },
    onChangeOptions (obj) { // 修改基础配置
      this.canvas.options = {
        ...this.canvas.options,
        ...obj
      }
      this.canvas.render()
    },
    changeLine (id) { // 改变连线样式，绘制水管,配电线
      let targetLine = this.canvas.data.pens.find(item => {
        return item.id === id
      })
      switch (this.globalCanvasConfig.lineStyle) {
        case 'pipe': // 水管
          targetLine.strokeStyle = '#A6E1FF '
          targetLine.lineWidth = 15
          targetLine.borderWidth = 5
          targetLine.borderColor = '#51514E  '
          targetLine.animateColor = '#46B8FF'
          targetLine.toArrow = ''
          targetLine.fromArrow = ''
          break
        case 'electricity': // 变配电原理图
          targetLine.strokeStyle = 'rgba(244, 105, 6, 1)'
          break
      }
    },
    onMessage (event, data) {
      let e = window.event
      switch (event) {
        case 'dblclick':
          if (this.props.line) {
            this.canvas.options.hideInput = true
            this.handleAddaidLine(window.event)
          } else {
            this.canvas.options.hideInput = false
          }
          break;
        case 'node':
          this.props = {
            node: data,
            line: null,
            multi: false,
            nodes: null,
            locked: data.locked
          }
          this.contextmenu.left = null // 清除右键菜单
          console.log('点击节点 --> node', data)
          break
        case 'addNode':
          this.props = {
            node: data,
            line: null,
            multi: false,
            nodes: null,
            locked: data.locked
          }
          console.warn('添加节点-->addNode', this.props.node)
          break
        case 'line':
          this.props = {
            node: null,
            line: data,
            multi: false,
            nodes: null,
            locked: data.locked
          }
          console.warn('点击连线 -->addLine', data)
          break
        case 'addLine':
          this.props = {
            node: null,
            line: data,
            multi: false,
            nodes: null,
            locked: data.locked
          }
          this.changeLine(data.id)
          console.warn('添加连线 -->addLine', data)
          break
        case 'multi':
          console.warn('多选节点 -->multi', data.length)
          this.props = {
            node: null,
            line: null,
            multi: true,
            nodes: data.length > 1 ? data : null,
            locked: this.getLocked(data)
          }
          break
        case 'space':
          this.contextmenu.left = null // 清除右键菜单
          break
        case 'moveOut':
          break
        case 'delete':
          console.warn('删除节点 -->delete')
          this.canvas.render()
          break
        case 'moveNodes':
        case 'resizeNodes':
          if (data.length > 1) {
            this.props = {
              node: null,
              line: null,
              multi: true,
              nodes: data,
              locked: this.getLocked({ nodes: data })
            }
          } else {
            this.props = {
              node: data[0],
              line: null,
              multi: false,
              nodes: null,
              locked: false
            }
          }
          break
        case 'resize':
        case 'scale':
        case 'locked':
          if (this.canvas && this.canvas.data) {
            Store.set('canvasData', {
              scale: this.canvas.data.scale || 1,
              lineName: this.canvas.data.lineName,
              fromArrowType: this.canvas.data.fromArrowType,
              toArrowType: this.canvas.data.toArrowType,
              locked: this.canvas.data.locked,
              lineStyle: this.globalCanvasConfig.lineStyle || 'pipe'
            })
          }
          break
      }
    },
    getData () {
      this.canvas.data.canvasSize = this.canvas.options.canvasSize
      return this.canvas.data
    },
    setData (data) {
      this.canvas.open(data)
    },
    getLocked (data) {
      let locked = true
      if (data.nodes && data.nodes.length) {
        for (const item of data.nodes) {
          if (!item.locked) {
            locked = false
            break
          }
        }
      }
      if (locked && data.lines) {
        for (const item of data.lines) {
          if (!item.locked) {
            locked = false
            break
          }
        }
      }

      return locked
    },

    onUpdateProps (node) { // 改变属性
      // 如果是node属性改变，需要传入node，重新计算node相关属性值
      // 如果是line属性改变，无需传参
      if (node) {
        this.canvas.updateProps(node)
      } else {
        this.canvas.render()
      }
    },
    handleAddaidLine (e) { // 添加辅助线，方便绘制配电图
      let x = e.clientX - 200
      let y = e.clientY - 40
      this.canvas.addLine(
        new Line({
          name: 'line',
          fromArrow: '',
          toArrow: '',
          from: new Point(x, y),
          to: new Point(x + 100, y + 100),
          strokeStyle: 'rgba(244, 105, 6, 1)'
        })
      )
      this.canvas.render()
    },

    //------------------- 菜单事件 ------------------//
    handle_new (data) {
      this.canvas.open({ nodes: [], lines: [] })
    },

    handle_open (data) {
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
              console.log('数据读取完毕', data)
              if (
                data && Array.isArray(data.pens)
              ) {
                this.canvas.open(data)
                this.$message({
                  type: 'success',
                  message: '导入成功'
                })
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

    handle_save (data) { // 保存到本地
      this.canvas.data.canvasSize = this.canvas.options.canvasSize
      FileSaver.saveAs(
        new Blob([JSON.stringify(this.canvas.data)], {
          type: 'text/plain;charset=utf-8'
        }),
        `PleaseRename.json`)
    },
    handle_saveComponent () { // 导出组件
      FileSaver.saveAs(
        new Blob([JSON.stringify(this.canvas.data.pens)], {
          type: 'text/plain;charset=utf-8'
        }),
        `le5le.topology.json`
      )

    },
    handle_importComponent () { // 导入组件
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
              const node = JSON.parse(text)
              if (
                node && Array.isArray(node)
              ) {
                this.canvas.addNode(node[0])
                this.canvas.render()
                this.$message({
                  type: 'success',
                  message: '导入成功'
                })
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
    handle_clearCanvas () { // 清空画布
      this.canvas.open({})
    },
    handle_savePng (data) {
      this.canvas.saveAsImage('le5le.topology.png')
    },
    handle_undo (data) {
      this.canvas.undo()
    },

    handle_redo (data) {
      this.canvas.redo()
    },

    handle_copy (data) {
      this.canvas.copy()
    },

    handle_cut (data) {
      this.canvas.cut()
    },

    handle_paste (data) {
      this.canvas.paste()
    },

    handle_state (data) {
      if (data.key === 'scale') {
        this.canvas.scaleTo(1)
      } else {
        this.canvas.data[data.key] = data.value
      }
      Store.set('canvasData', {
        scale: this.canvas.data.scale || 1,
        lineName: this.canvas.data.lineName,
        fromArrowType: this.canvas.data.fromArrowType,
        toArrowType: this.canvas.data.toArrowType,
        locked: this.canvas.data.locked,
        lineStyle: this.canvas.data.lineStyle || 'pipe'
      })
      this.canvas.render()
    },

    onContextMenu (event) {
      event.preventDefault()
      event.stopPropagation()

      if (event.clientY + 360 < document.body.clientHeight) {
        this.contextmenu = {
          left: event.clientX + 'px',
          top: event.clientY + 'px'
        }
      } else {
        this.contextmenu = {
          left: event.clientX + 'px',
          bottom: document.body.clientHeight - event.clientY + 'px'
        }
      }
    }
  },
  destroyed () {
    this.eventSubscribe.unsubscribe()
  }
}
</script>

<style lang="scss">
.topology-workspace {
  display: flex;
  width: 100%;
  height: calc(100% - 40px);

  .tools {
    flex-shrink: 0;
    width: 200px;
    background-color: #f8f8f8;
    border-right: 1px solid #d9d9d9;
    overflow-y: auto;
    .el-collapse {
      border-top: none;

      .el-collapse-item__wrap {
        background: #f8f8f8;
      }

      .el-collapse-item__header {
        color: #0d1a26;
        font-size: 12px;
        line-height: 1;
        padding: 5px 10px;
        background-color: #f8f8f8;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
      }
      .is-active {
        color: #409eff;
      }
    }

    .buttons {
      padding: 5px 0;
      a {
        display: inline-block;
        text-align: center;
        width: 60px;
        height: 60px;
        text-decoration: none !important;
        cursor: pointer;
        .content {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          img {
            width: 50px;
            height: 50px;
            padding-top: 4px;
          }
          .name {
            font-size: 10px;
            margin-top: -5px;
          }
        }

        .iconfont {
          color: rgba(123, 126, 125, 0.8);
          font-size: 30px;
          padding-bottom: 0;
        }
      }
      .imgContent {
        width: 90px;
        height: 90px;
        .name {
          margin-top: 0 !important;
        }
      }
    }
  }

  .full {
    flex: 1;
    width: initial;
    position: relative;
    overflow: auto;
    background: #fff;
    #topology-canvas {
      width: 100%;
      height: 100%;
      z-index: 10;
    }
    svg {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 0;
    }
  }

  .props {
    flex-shrink: 0;
    width: 300px;
    background-color: #f5f5f5;
    border-left: 1px solid #d9d9d9;
    overflow-y: auto;
    position: relative;
    font-size: 12px;
  }

  .context-menu {
    position: fixed;
    z-index: 10;
  }
}
</style>
