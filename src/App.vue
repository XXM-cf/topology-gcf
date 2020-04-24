<template lang="pug">
  router-view
</template>

<script>
import './assets/css/base.scss'

export default {

}
</script>

<style lang="scss">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 100px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  font-size: 0.12rem;
  line-height: 2;
}
li {
  list-style: none;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.headers {
  display: flex;
  background-color: #dcdcdc;
  font-size: 0.13rem;
  height: 0.4rem;
  .el-menu {
    display: flex;
  }
  .full {
    flex: 1;
  }

  .logo {
    img {
      height: 0.22rem;
      position: relative;
      top: -0.04rem;
    }
  }
}

.el-menu-item,
.el-submenu__title {
  color: #314659 !important;
  font-size: 0.13rem;
  padding: 0 0.1rem;
  height: 0.39rem !important;
  line-height: 0.39rem !important;

  &.separator {
    border-top: 1px solid #e8e8e8;
    margin: 0 0.1rem;
    height: 0.01rem !important;
    line-height: 0.01rem !important;
  }

  a {
    text-decoration: none;
    color: #314659;
  }

  .iconfont {
    color: #314659;
    font-size: 0.26rem;
  }
}

body {
  height: 100vh;
}
</style>