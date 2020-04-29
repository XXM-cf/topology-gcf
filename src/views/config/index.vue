<template lang="pug">
  .confing-layout
    .headers
      el-menu(mode='horizontal', @select='onMenu', background-color='#f8f8f8')
        el-submenu(index='file')
          template(slot='title') 文件
          //- el-menu-item(index='new') 新建文件
          el-menu-item(index='replace') 导入本地文件
          el-menu-item.separator
          el-menu-item(index='save') 保存到本地
          el-menu-item(index='savePng') 下载为PNG
        el-submenu(index='edit')
          template(slot='title') 编辑
          el-menu-item(index='undo') 撤消
          el-menu-item(index='redo') 重做
          el-menu-item.separator
          el-menu-item(index='copy') 复制
          el-menu-item(index='cut') 剪切
          el-menu-item(index='paste') 粘贴

      el-menu.full(mode='horizontal', background-color='#f8f8f8')
        //- el-menu-item(@click="handleView") 查看效果

      el-menu(mode='horizontal', background-color='#f8f8f8')
        el-menu-item 视图：{{scale}}%
        el-menu-item(index='scale', v-show="scale !== 100" @click="onState('scale',1)") 还原
        el-menu-item(index='locked', @click="onState('locked', locked ? 0 : 1)") {{ locked ? '解锁' : '锁定'}}

        el-submenu(index='lineName', title='默认连线类型')
          template(slot='title')
            i(:class='`iconfont icon-${lineName}`')
          el-menu-item(v-for='(item, index) in lineNames', :key='index', :index='`line-${item}`', @click="onState('lineName', item)")
            i(:class='`iconfont icon-${item}`')

      el-menu(mode='horizontal', background-color='#f8f8f8')
        el-submenu(index='fromArrowType', title='默认起点箭头')
          template(slot='title')
            i(:class='`iconfont icon-from-${fromArrowType}`')
          el-menu-item(v-for='(item, index) in arrowTypes', :key='index', :index='`fromArrowType-${item}`', @click="onState('fromArrowType', item)")
            i(:class='`iconfont icon-from-${item}`')

      el-menu(mode='horizontal', background-color='#f8f8f8')
        el-submenu(index='toArrowType', title='默认终点箭头')
          template(slot='title')
            i(:class='`iconfont icon-to-${toArrowType}`')
          el-menu-item(v-for='(item, index) in arrowTypes', :key='index', :index='`toArrowType-${item}`', @click="onState('toArrowType', item)")
            i(:class='`iconfont icon-to-${item}`')

      el-menu(mode='horizontal', background-color='#f8f8f8')
        el-submenu(index='lineStyle', title='连线样式')
          template(slot='title')
            span {{ lineStyle.label }}
          el-menu-item(v-for='(item, index) in lineStyleOptions', :key='item.value', @click="onState('lineStyle', item.value)")
            span {{ item.label }}
    workspace(:currCanvasData="currCanvasData" :imgList="imgList" :deviceList="deviceList")
</template>

<script >
import workspace from './workspace'
import { Store } from 'le5le-store';
export default {
  props: {
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
    workspace
  },
  data () {
    return {
      demoImgList: [
        {
          label: '酒店1层',
          value: require('@/assets/images/baseImg/floor.png')
        }
      ],
      demoDeviceList: [
        {
          label: '点位1',
          value: 'device001'
        },
        {
          label: '点位2',
          value: 'device002'
        },
        {
          label: '点位3',
          value: 'device003'
        },
        {
          label: '点位4',
          value: 'device004'
        },
        {
          label: '点位5',
          value: 'device005'
        },
      ],
      lineStyleOptions: [
        { label: '默认', value: 'default' },
        { label: '水管', value: 'pipe' },
        { label: '变配电', value: 'electricity' },
      ],
      lineNames: ['curve', 'polyline', 'line'],
      arrowTypes: [
        '',
        'triangleSolid',
        'triangle',
        'diamondSolid',
        'diamond',
        'circleSolid',
        'circle',
        'line',
        'lineUp',
        'lineDown'
      ],
      subscribe: null, // 事件订阅实例
      currCanvasData: {
        scale: 1,
        lineName: 'polyline',
        fromArrowType: '',
        toArrowType: '',
        locked: 0,
        lineStyle: 'default'
      }, // 初始化实时全局值
    }
  },
  computed: {
    scale () {
      return Math.floor(this.currCanvasData.scale * 100)
    },
    lineName () {
      return this.currCanvasData.lineName
    },
    fromArrowType () {
      return this.currCanvasData.fromArrowType
    },
    toArrowType () {
      return this.currCanvasData.toArrowType
    },
    locked () {
      return this.currCanvasData.locked
    },
    lineStyle () {
      let lineStyle = this.currCanvasData.lineStyle
      let obj = this.lineStyleOptions.find(item => item.value === lineStyle)
      return obj || {}
    }
  },
  created () {
    Store.set('canvasData', this.currCanvasData)
  },
  mounted () {
    this.subscribe = Store.subscribe('canvasData', value => { // 订阅
      this.currCanvasData = value
    })
  },
  methods: {
    onMenu (key, keyPath) {
      if (!key || key.indexOf('/') === 0) {
        return
      }
      Store.set('canvasEvent', {
        name: key
      })
    },
    onState (key, value) {
      Store.set('canvasEvent', {
        name: 'state',
        data: {
          key,
          value
        }
      })
    }
  },
  destroyed () {
    this.subscribe.unsubscribe()
  }
}
</script>

<style lang="scss">
.confing-layout {
  width: 100%;
  height: 100%;
}
</style>
