import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
// import { cloneDeep } from 'lodash'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import routes from './router'

// import '@/icons' // icon
// import '@/permission' // permission control

Vue.use(ElementUI)
Vue.use(Vuex)

Vue.config.productionTip = false

// console.log('base', baseUrl)
const router = new VueRouter({
  base: process.env.VUE_APP_ROUTER_PATH,
  mode: 'history',
  routes
})


new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
})
