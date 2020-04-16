<template lang="pug">
  .confing-layout
    .headers
      el-menu(mode='horizontal', @select='onMenu', background-color='#f8f8f8')
        el-submenu(index='file')
          template(slot='title') 文件
          el-menu-item(index='new') 新建文件
          el-menu-item(index='open') 打开本地文件（新建）
          el-menu-item(index='replace') 导入本地文件...
          el-menu-item.separator
          el-menu-item(index='save') 保存到本地
          el-menu-item(index='savePng') 下载为PNG
          el-menu-item(index='saveSvg') 下载为SVG
        el-submenu(index='edit')
          template(slot='title') 编辑
          el-menu-item(index='undo') 撤消
          el-menu-item(index='redo') 重做
          el-menu-item.separator
          el-menu-item(index='copy') 复制
          el-menu-item(index='cut') 剪切
          el-menu-item(index='parse') 粘贴

      el-menu.full(mode='horizontal', background-color='#f8f8f8')
        el-menu-item(@click="handleView") 查看效果

      el-menu(mode='horizontal', background-color='#f8f8f8')
        el-menu-item 视图：{{scale}}%
        el-menu-item(index='scale', @click="onState('scale', 1)") 还原
        el-menu-item(index='locked', @click="onState('locked', locked ? 0 : 1)") {{ locked ? '解锁' : '锁定'}}
        el-submenu(index='state', title='默认连线类型')
          template(slot='title')
            i(:class='`iconfont icon-${lineName}`')
          el-menu-item(v-for='(item, index) in lineNames', :key='index', :index='`line-${item}`', @click="onState('lineName', item)")
            i(:class='`iconfont icon-${item}`')

      el-menu(mode='horizontal', background-color='#f8f8f8')
        el-submenu(index='state', title='默认起点箭头')
          template(slot='title')
            i(:class='`iconfont icon-from-${fromArrowType}`')
          el-menu-item(v-for='(item, index) in arrowTypes', :key='index', :index='`fromArrow-${item}`', @click="onState('fromArrowType', item)")
            i(:class='`iconfont icon-from-${item}`')

      el-menu(mode='horizontal', background-color='#f8f8f8')
        el-submenu(index='state', title='默认终点箭头')
          template(slot='title')
            i(:class='`iconfont icon-to-${toArrowType}`')
          el-menu-item(v-for='(item, index) in arrowTypes', :key='index', :index='`toArrow-${item}`', @click="onState('toArrowType', item)")
            i(:class='`iconfont icon-to-${item}`')
    workspace
</template>

<script >
import workspace from './workspace'
import '../../assets/css/base.scss'

export default {
  components: {
    workspace
  },
  data () {
    return {
      about: false,
      license: false,
      joinin: false,
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
      user: null
    }
  },
  computed: {
    scale () {
      return Math.floor(this.$store.state.canvas.data.scale * 100)
    },
    lineName () {
      return this.$store.state.canvas.data.lineName
    },
    fromArrowType () {
      return this.$store.state.canvas.data.fromArrowType
    },
    toArrowType () {
      return this.$store.state.canvas.data.toArrowType
    },
    locked () {
      return this.$store.state.canvas.data.locked
    }
  },
  methods: {
    handleView () {
      this.$router.push({
        path: '/client'
      })
    },
    onMenu (key, keyPath) {
      if (!key || key.indexOf('/') === 0) {
        return
      }

      switch (key) {
        case 'new':
          this.$router.push('/config')
          break
        case 'open':
          setTimeout(() => {
            this.$store.commit('canvas/setEvent', {
              name: key
            })
          }, 100)
          break
        default:
          this.$store.commit('canvas/setEvent', {
            name: key
          })
          break
      }

    },
    onState (key, value) {
      this.$store.commit('canvas/setEvent', {
        name: 'state',
        data: {
          key,
          value
        }
      })
    }
  }
}
</script>

<style lang="scss">
.confing-layout {
  height: 100%;
}
</style>
