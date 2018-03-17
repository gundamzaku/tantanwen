import Vue from 'vue'
import VueRouter from 'vue-router'
//import 'lib-flexible'

import BiTreeBase from './BiTreeBase'
import BiTreeOrder from './BiTreeOrder'
import Index from './Index'
import Sort from './Sort'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '../static/css/Common.css';

//组件
import Footer from './components/Footer'

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/', component: Index },
  { path: '/biTreeBase', component: BiTreeBase },
  { path:'/biTreeOrder',component:BiTreeOrder},
  { path:'/sort',component:Sort}
]

const router = new VueRouter({
  mode: 'history',
  routes // （缩写）相当于 routes: routes
})
Vue.component('footer-template', Footer)
const index = new Vue({
  router,
}).$mount('#app')
