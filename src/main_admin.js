import Vue from 'vue'
import VueRouter from 'vue-router'

import Admin from './Admin'

import { Header,Aside,Main,Footer } from 'element-ui';
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);

//组件
import FooterV2 from './components/FooterV2'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueRouter);
Vue.config.productionTip = false

const routes = [
  { path: '/admin', component: Admin },
]

const router = new VueRouter({
  mode: 'history',
  routes // （缩写）相当于 routes: routes
})

Vue.component('footer-template', FooterV2)

const admin = new Vue({
  router,
}).$mount('#admin')
