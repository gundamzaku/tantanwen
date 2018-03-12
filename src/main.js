import Vue from 'vue'
import VueRouter from 'vue-router'

import BiTreeBase from './BiTreeBase'
import BiTreeOrder from './BiTreeOrder'
import Index from './Index'

Vue.use(VueRouter)
Vue.config.productionTip = false



const routes = [
  { path: '/', component: Index },
  { path: '/biTreeBase', component: BiTreeBase },
  { path:'/biTreeOrder',component:BiTreeOrder}
]

const router = new VueRouter({
  mode: 'history',
  routes // （缩写）相当于 routes: routes
})

const index = new Vue({
  router
}).$mount('#app')
