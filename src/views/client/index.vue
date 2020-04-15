<template lang="pug">
  .client
    .headers
      el-menu(mode='horizontal', background-color='#f8f8f8' @select='onMenu')
        el-menu-item(index='back') 返回
        el-menu-item(index='open') 打开本地文件

    .canvas-container
      .tools
        el-button(@click="handle_startAnimate('device001')") 触发动画
        el-button(@click="handle_endAnimate('device001')") 停止动画
        el-button(@click="set_image('device001', 'img/fj_normal.png')") 触发告警
        el-button(@click="set_image('device001', 'img/fengji.png')") 停止告警
      #topology-canvas.full
</template>

<script>
import { Topology } from 'topology-core'

export default {
  data () {
    return {
      canvasOptions: {
        lock: 1
      },
      canvas: {}
    }
  },
  mounted () {
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
                data.scale = 0.2
                console.log('json数据读取完毕', data)
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
    getNode (tag) { // 寻找目标节点，用来操作动画，样式切换等
      let targetNode = this.canvas.data.pens.find(item => {
        console.log(item.data, tag)
        return item.tags.indexOf(tag) !== -1 // 关联tag
      })
      console.log('当前执行节点', targetNode)
      return targetNode
    },
    handle_startAnimate (tag) { // 开始动画
      let targetNode = this.getNode(tag)
      if (targetNode && targetNode.animateFrames.length) { // 目标节点，业务数据触发动画
        targetNode.animateStart = Date.now()
        this.canvas.animate()
      }
    },
    handle_endAnimate (tag) { // 结束动画
      let targetNode = this.getNode(tag)
      if (targetNode && targetNode.animateFrames.length) { // 目标节点，业务数据触发动画
        targetNode.animateStart = 0
        this.canvas.animate()
      }
    },
    set_image (tag, url) { // 设置图片
      let targetNode = this.getNode(tag)
      if (targetNode) {
        targetNode.image = url
        this.canvas.render()
      }
    }

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
    .tools {
      width: 10%;
      height: 100%;
      background: #f5f5f5;
      display: flex;
      flex-direction: column;
      padding: 10px;
      .el-button {
        margin-bottom: 20px;
      }
    }

    .full {
      width: 90%;
      height: 100%;
      position: relative;
      overflow: auto;
      background: #fff;
    }
  }
}
</style>