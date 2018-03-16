<template>
  <div id="main">
    <img src="/static/img/feed.jpg" style="display: none"/>
    <div class="idx">
      <transition name="in-out-translate-fade" mode="in-out">
        <div v-if="on" key="on" class="timg"><img src="/static/img/timg.png"/></div>
        <div v-else="" key="off" class="menu">
          <b-card-group deck class="card-group">
            <b-card header="<b>二叉树</b>">
              <b-list-group>
                <b-list-group-item href="/biTreeBase">常规画二叉树</b-list-group-item>
                <b-list-group-item href="/biTreeOrder">根据排序画二叉树</b-list-group-item>
              </b-list-group>
              <p class="card-text mt-2">
                关于二叉树的一些操作的图形化展示
              </p>
            </b-card>
          </b-card-group>
        </div>
      </transition>
    </div>
    <div class="btn_menu">
      <b-btn variant="success" v-on:click="on = !on">数据结构</b-btn>
      <b-btn variant="outline-success" href="https://github.com/gundamzaku/tantanwen">GitHub源码</b-btn>
      <b-btn variant="outline-success" v-on:click="on = !on">关注我</b-btn>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue'
  import BootstrapVue from 'bootstrap-vue'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import "../static/css/Index.css";

  Vue.use(BootstrapVue);
  export default {
    data() {
      return {
        on: true
      }
    }
  }
</script>
