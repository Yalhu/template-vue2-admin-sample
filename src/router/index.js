import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@view/Home'
import demoRoutes from './demo'
import demo2Routes from './demo2'

Vue.use(VueRouter)

// 根据权限加载的页面
export const asyncRoutes = [demoRoutes, demo2Routes]

/**
 * hidden: true                   if set true, item will not show in the navbar(default is false)
 * redirect: noRedirect           if set noRedirect will no redirect
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in navbar
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar (todo)
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    redirect: '/demoapp',
    hidden: true
  },
  {
    path: '/demoapp',
    name: 'Home',
    meta: { title: '首页', icon: 's-home' },
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// export const createRouter = () => new Router({
//   mode: 'history', // require service support
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRoutes.concat(asyncRoutes)
// })

const routes = constantRoutes.concat(asyncRoutes)

export default routes
