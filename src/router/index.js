import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/config',
    component: () => import('@/views/config/index')
  },
  {
    path: '/',
    component: () => import('@/views/config/index')
  },
  {
    path: '/demo',
    component: () => import('@/views/demo/index')
  }
]
export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...constantRoutes
  ]
})
