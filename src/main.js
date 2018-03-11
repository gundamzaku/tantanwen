import Vue from 'vue'
import Index from './Index'

Vue.config.productionTip = false
var author = "dan";

var index = new Vue({
  el:'#main',
  components: { Index },
  template: '<Index/>',
  data:{
    divCount:'',
    boxs:[],
  }
})
