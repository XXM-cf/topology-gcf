<template>
  <div>
    <!-- 选中为空 -->
    <div v-if="!props.node && !props.line && !props.multi">
      <div class="title">欢迎使用le5le-topology！</div>
      <div class="bottom">
        <div class="title">小提示</div>
        <ul class="group">
          <li>方向键：控制节点移动5个像素</li>
          <li>Ctrl + 方向键：控制节点移动1个像素</li>
          <li>Ctrl + 鼠标移动：移动整个画布</li>
          <li>Ctrl + 鼠标滚轮：缩放</li>
          <li>添加或选中节点，右侧属性支持上传各种图片哦</li>
        </ul>
      </div>
    </div>
    <!-- 选中节点 -->
    <div v-if="props.node">
      <div class="title">位置和大小</div>
      <div class="items">
        <div class="flex grid">
          <div>X（px）</div>
          <div class="ml5">Y（px）</div>
        </div>
        <div class="flex grid">
          <div>
            <el-input-number
              v-model="props.node.rect.x"
              controls-position="right"
              @change="onChange"
            ></el-input-number>
          </div>
          <div class="ml5">
            <el-input-number
              v-model="props.node.rect.y"
              controls-position="right"
              @change="onChange"
            ></el-input-number>
          </div>
        </div>
      </div>
      <div class="items">
        <div class="flex grid">
          <div>宽（px）</div>
          <div class="ml5">高（px）</div>
        </div>
        <div class="flex grid">
          <div>
            <el-input-number
              v-model="props.node.rect.width"
              controls-position="right"
              @change="onChange"
            ></el-input-number>
          </div>
          <div class="ml5">
            <el-input-number
              v-model="props.node.rect.height"
              controls-position="right"
              @change="onChange"
            ></el-input-number>
          </div>
        </div>
      </div>
      <div class="title">图片属性</div>
      <div class="items">
        <div class="flex grid">
          <div>图片链接（px）</div>
          <el-input
            v-model="props.node.image"
            @change="onChange"
          ></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
export default {
  data () {
    return {}
  },
  props: {
    props: {
      type: Object,
      require: true
    }
  },
  methods: {
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
