<template lang="pug">
  .page
    .tools
      div(v-for='(item, index) in tools', :key='index')
        .title {{ item.group }}
        .buttons
          a(
            v-for='(btn, i) in item.children',
            :key='i',
            :title='btn.name',
            :draggable='btn.data',
            @dragstart='onDrag($event, btn)')
            img(
              v-if="btn.data.name === 'image'",
              :src='btn.data.image',
              style='wadth: 28px; height:28px;padding-top: 3px;')
            i(v-else='', :class='`iconfont ${btn.icon}`')
    #topology-canvas.full(@contextmenu='onContextMenu($event)')

    .props
      CanvasProps(
        :props.sync='props'
        @change='onUpdateProps'
        @animateChange='onAnimateChange'
        @align="onAlignNodes"
        @set-base-img='setBaseImg')

    .context-menu(v-if='contextmenu.left', :style='this.contextmenu')
      CanvasContextMenu(:canvas='canvas', :props.sync='props')
</template>

<script>
import { Topology } from 'topology-core'
import { Node } from 'topology-core/models/node'
// import { Line } from 'topology-core/models/line'
import * as FileSaver from 'file-saver'
import { alignNodes } from 'topology-layout';


import { Tools, canvasRegister } from '../../services/canvas'

import CanvasProps from '../../components/CanvasProps'
import CanvasContextMenu from '../../components/CanvasContextMenu'

export default {
  components: {
    CanvasProps,
    CanvasContextMenu
  },
  data () {
    return {
      tools: Tools,
      canvas: {},
      canvasOptions: {
        rotateCursor: '/img/rotate.cur',
        disableScale: true
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
  computed: {
    event () {
      return this.$store.state.canvas.event
    },
    globalData () {
      return this.$store.state.canvas.data
    }
  },
  watch: {
    event (curVal) {
      if (this['handle_' + curVal.name]) {
        this['handle_' + curVal.name](curVal.data)
      }
    }
  },
  created () {
    canvasRegister()
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.canvasOptions.on = this.onMessage
      this.canvas = new Topology('topology-canvas', this.canvasOptions)
      this.canvas.data = {
        ...this.canvas.data,
        lineName: this.globalData.lineName,
        fromArrowType: this.globalData.fromArrowType,
        toArrowType: this.globalData.toArrowType,
        scale: this.globalData.scale,
        locked: this.globalData.locked
      }
    },
    onDrag (event, node) {
      event.dataTransfer.setData('Text', JSON.stringify(node.data))
    },
    setBaseImg (val) {
      const node = {
        name: 'image',
        rect: {
          width: 1000,
          height: 800,
          x: 0,
          y: 0
        },
        data: {
          baseImg: true
        },
        image: val
      }
      let currBaseimgNode = this.canvas.data.pens.find(item => {
        return item.data.baseImg
      })
      if (currBaseimgNode) { // 已存在底图，则删除重建
        this.canvas.delete({
          lines: [],
          nodes: [currBaseimgNode]
        })
      }
      this.canvas.addNode(new Node(node), true);
    },
    changeLine (val) { // 改变连线样式，绘制水管
      if (this.globalData.lineStyle === 'pipe') {
        this.canvas.data.pens.map(item => {
          if (item.id === val) {
            item.strokeStyle = '#6cf'
            item.lineWidth = 15
            item.borderWidth = 5
            item.borderColor = '#dcdc'
            this.canvas.updateProps()
            return
          }
        })
      } else {
        return
      }
    },
    onMessage (event, data) {
      // console.log('onMessage:', event, data)
      switch (event) {
        case 'node':
          this.props = {
            node: data,
            line: null,
            multi: false,
            nodes: null,
            locked: data.locked
          }
          console.log('点击节点 --> node', data)
          break
        case 'addNode':
          this.props = {
            node: {
              ...data,
              data: {
                ...data.data,
                bid: '' // 默认添加bid属性
              }
            },
            line: null,
            multi: false,
            nodes: null,
            locked: data.locked
          }
          console.warn('添加节点-->addNode', this.props.node)
          break
        case 'line':
        case 'addLine':

          this.props = {
            node: null,
            line: data,
            multi: false,
            nodes: null,
            locked: data.locked
          }
          this.changeLine(data.id)
          console.warn('添加或点击连线 -->addLine', data)
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
            this.$store.commit('canvas/setData', {
              scale: this.canvas.data.scale || 1,
              lineName: this.canvas.data.lineName,
              fromArrowType: this.canvas.data.fromArrowType,
              toArrowType: this.canvas.data.toArrowType,
              locked: this.canvas.data.locked,
              lineStyle: this.canvas.data.lineStyle
            })
          }
          break
      }
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
    onAlignNodes (align) {
      alignNodes(this.canvas.activeLayer.pens, this.canvas.activeLayer.rect, align);
      this.canvas.updateProps()
      this.canvas.cache()
    },
    onUpdateProps (node) {
      // 如果是node属性改变，需要传入node，重新计算node相关属性值
      // 如果是line属性改变，无需传参
      this.canvas.updateProps(node)
    },
    onAnimateChange (line) {
      this.canvas.animate();
    },
    handle_new (data) {
      this.canvas.open({ nodes: [], lines: [] })
    },

    handle_open (data) {
      this.handle_replace(data)
    },

    handle_replace (data) {
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
                data &&
                Array.isArray(data.pens)
              ) {
                this.canvas.open(data)
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
      FileSaver.saveAs(
        new Blob([JSON.stringify(this.canvas.data)], {
          type: 'text/plain;charset=utf-8'
        }),
        `le5le.topology.json`
      )
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
      this.canvas.parse()
    },

    handle_state (data) {
      this.canvas.data[data.key] = data.value
      this.$store.commit('canvas/setData', {
        scale: this.canvas.data.scale || 1,
        lineName: this.canvas.data.lineName,
        fromArrowType: this.canvas.data.fromArrowType,
        toArrowType: this.canvas.data.toArrowType,
        locked: this.canvas.data.locked,
        lineStyle: this.canvas.data.lineStyle
      })
      this.canvas.updateProps()
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
  }
}
</script>

<style lang="scss">
.page {
  display: flex;
  width: 100%;
  height: calc(100% - 40px);

  .tools {
    flex-shrink: 0;
    width: 200px;
    background-color: #f8f8f8;
    border-right: 1px solid #d9d9d9;
    overflow-y: auto;

    .title {
      color: #0d1a26;
      font-weight: 600;
      font-size: 0.12rem;
      line-height: 1;
      padding: 0.05rem 0.1rem;
      margin-top: 0.08rem;
      border-bottom: 1px solid #ddd;

      &:first-child {
        border-top: none;
      }
    }

    .buttons {
      padding: 0.1rem 0;
      a {
        display: inline-block;
        color: #314659;
        line-height: 1;
        width: 0.4rem;
        height: 0.4rem;
        text-align: center;
        text-decoration: none !important;

        .iconfont {
          font-size: 0.24rem;
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
  }

  .props {
    flex-shrink: 0;
    width: 300px;
    background-color: #f8f8f8;
    border-left: 1px solid #d9d9d9;
    overflow-y: auto;
    position: relative;
  }

  .context-menu {
    position: fixed;
    z-index: 10;
  }
}
</style>
