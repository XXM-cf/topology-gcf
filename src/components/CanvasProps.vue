<template lang="pug">
.canvas-props
  div
    .title 欢迎使用le5le-topology！
    .title 选择底图
    .items
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
  div(v-if='props.node')
    .title 位置和大小
    .items
      .flex.grid
        div X（px）
        .ml5 Y（px）
      .flex.grid
        div
          el-input-number(v-model='props.node.rect.x', controls-position='right', @change='onChange')
        .ml5
          el-input-number(v-model='props.node.rect.y', controls-position='right', @change='onChange')
    .items
      .flex.grid
        div 宽（px）
        .ml5 高（px）
      .flex.grid
        div
          el-input-number(v-model='props.node.rect.width', controls-position='right', @change='onChange')
        .ml5
          el-input-number(v-model='props.node.rect.height', controls-position='right', @change='onChange')
    .title 图片属性
    .items
      .flex.grid
        div 图片链接（px）
        el-input(v-model='props.node.image', @change='onChange')

</template>

<script >
export default {
  data () {
    return {
      baseImg: '',
      baseImgList: [
        {
          label: '酒店1层',
          value: '/img/floor.png'
        },
        {
          label: '演示底图',
          value: '/img/yohuo.png'
        }
      ]
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
      this.$emit('setBaseImg', val)
    },
    onChange (value) {
      this.$emit('change', this.props.node)
    }
  }
}
</script>

<style lang="scss">
.star {
  display: block;
  color: #f60 !important;
  text-decoration: underline;
  margin-bottom: 0.1rem;
}

.title {
  color: #0d1a26;
  font-weight: 600;
  padding: 0.05rem 0.15rem;
  border-bottom: 1px solid #ccc;
}

.group {
  margin: 0.1rem 0 0.2rem 0.3rem;
  padding: 0;

  a,
  li {
    line-height: 2;
  }

  li {
    list-style: initial;
  }
}

.bottom {
  position: absolute;
  bottom: 0.1rem;
}

.items {
  padding: 0.05rem 0.15rem;

  .el-input-number {
    width: initial;
    line-height: 0.32rem;

    .el-input__inner {
      padding-left: 0;
      height: 0.34rem;
      line-height: 0.34rem;
    }

    .el-input-number__increase {
      line-height: 0.16rem;
    }
  }
}

.formItem {
  margin-bottom: 0.1rem;
}
</style>
