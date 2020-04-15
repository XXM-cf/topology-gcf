<template lang="pug">
.canvas-props
  h3.tips 操作栏
  div(v-if="!props.node && !props.line && !props.multi")
    .group
      .title 选择底图
      .container
        .items.full-item
          el-select(v-model='baseImg', placeholder='选择底图', @change='handleBaseImg')
            el-option(v-for='item in baseImgList', :key='item.value', :label='item.label', :value='item.value')
    .bottom
      .title 小提示
      ul.group
        li 方向键：控制节点移动5个像素
        li Ctrl + 方向键：控制节点移动1个像素
        li Ctrl + 鼠标移动：移动整个画布
        li Ctrl + 鼠标滚轮：缩放
        li 添加或选中节点，右侧属性支持上传各种图片

  // 线条属性
  .props-container(v-if="props.line")
    .group
        .title 线条属性
        .item.full-item
          .label 外观

  // 节点属性
  .props-container(v-if="props.node")
    .group
      .title 业务属性
      .item.full-item
        .label 绑定设备（点位）
        el-select(v-model='props.node.tags',multiple  placeholder='关联设备', @change='onChange')
          el-option(
            v-for='item in deviceList',
            :key='item.value',
            :label='item.label',
            :value='item.value')

    .group
      .title 位置和大小
      .container
        .item
          .label X（px)
          el-input-number(v-model='props.node.rect.x', controls-position='right', @change='onChange')
        .item
          .label Y （px）
          el-input-number(v-model='props.node.rect.y', controls-position='right', @change='onChange')

        .item
          .label 宽（px）
          el-input-number(v-model='props.node.rect.width', controls-position='right', @change='onChange')
        .item
          .label 高（px）
          el-input-number(v-model='props.node.rect.height', controls-position='right', @change='onChange')

    .group
      .title 图片属性
      .item.full-item
        .label 图片链接（px）
        el-input(v-model='props.node.image', @change='onChange')

    .group
      .title 文字属性
      .container
        .item
          .label 颜色
          el-color-picker(v-model="props.node.font.color" @change='onChange')
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

    .group
      .title 预设动画
      .container
        .item
          .label 动画效果
          el-select(v-model="props.node.animateType" @change='onChangeAnimate')
            el-option(
              v-for="item in animateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value")


</template>

<script >
import { Node } from 'topology-core/models/node'

export default {
  data () {
    return {
      baseImg: '',
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
          label: '心跳'
        },
        {
          value: 'show',
          label: '炫耀'
        }
      ],
      // ---------- 业务数据 ------------- //
      baseImgList: [
        {
          label: '酒店1层',
          value: '/img/floor.png'
        },
        {
          label: '演示底图',
          value: '/img/yohuo.png'
        }
      ],
      deviceList: [
        {
          label: '设备1',
          value: 'device001'
        },
        {
          label: '设备2',
          value: 'device002'
        }
      ],
    }
  },
  props: {
    props: {
      type: Object,
      require: true
    }
  },
  methods: {
    handleBaseImg (val) {
      this.$emit('set-base-img', val)
    },

    onChangeAnimate () { // 动画效果
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
            duration: 10,
            linear: true,
            state: Node.cloneState(this.props.node)
          });
          break;
        case 'reverseRotate': // 逆时针旋转
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
        case 'heart':
          state.rect.x -= 5;
          state.rect.ex += 5;
          state.rect.y -= 5;
          state.rect.ey += 5;
          state.rect.width += 5;
          state.rect.height += 10;
          state.strokeStyle = '#237804';
          this.props.node.animateFrames.push({
            duration: 100,
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
    },
    onAnimateDuration () {
      this.props.node.animateDuration = 0;
      for (const item of this.props.node.animateFrames) {
        this.props.node.animateDuration += item.duration;
      }
    },
    onChange (value) {
      this.$emit('change', this.props.node)
    }
  }
}
</script>

<style lang="scss">
.props-container {
  overflow: auto;
}
.bottom {
  position: absolute;
  bottom: 0.1rem;
  .title {
    padding: 0.05rem 0.15rem;
    border-bottom: 1px solid #ccc;
  }
}
.tips {
  text-align: center;
  background: #ccc;
  padding: 10px;
  margin: 0 0 10px 0;
}
.group {
  .title {
    color: #0d1a26;
    font-weight: 600;
    padding: 0.05rem 0.15rem;
    border-bottom: 1px solid #ccc;
  }
  .container {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .item {
    width: 45%;
  }
  .full-item {
    padding: 10px;
    width: 100%;
    .el-select,
    .el-input {
      width: 100%;
    }
  }
}
</style>
