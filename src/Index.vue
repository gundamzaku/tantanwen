<template>
  <div id="main" v-on:click="monitorDocumentClick">
    <div id="sidemenu" v-on:click="expand()"><i id="mimi" class="el-icon-caret-right"></i></div>
    <div id="sidebar">
      <el-menu
            default-active="1">
            <el-menu-item index="1">
              <i class="el-icon-arrow-right"></i>
              <a @click="isShow = 2">数据算法</a>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-arrow-right"></i>
              <a href="https://github.com/gundamzaku/tantanwen">GitHub源码</a>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-arrow-right"></i>
              <a href="/admin">后台地址</a>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-arrow-right"></i>
              <a @click="dialogVisible = true">关注我</a>
            </el-menu-item>
      </el-menu>
     </div>
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" mode="horizontal">
          <el-menu-item index="1" @click="isShow = 2"><a>数据算法</a></el-menu-item>
          <el-menu-item index="2"><a href="https://github.com/gundamzaku/tantanwen">GitHub源码</a></el-menu-item>
          <el-menu-item index="3"><a href="/admin">后台地址</a></el-menu-item>
          <el-menu-item index="4" @click="dialogVisible = true"><a>关注我</a></el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <div class="index-main" v-if="isShow === 1"></div>
        <div class="index-main-content" v-else-if="isShow === 2">
          <el-tabs type="border-card">
            <el-tab-pane label="数据结构">
              <el-collapse accordion>
                <el-collapse-item title="二叉树动画" name="1" class="el-collapse-item">
                  <div class="index-card-left">根据已知数据画出二叉树。并可以演算出前序、中序、后序二叉树的轨迹。</div>
                  <div><a href="/biTreeBase"> > > 点击进入 < < </a></div>
                </el-collapse-item>
                <el-collapse-item title="二叉树推算" name="2" class="el-collapse-item">
                  <div class="index-card-left">根据已知条件（已知前序、中序或是中序、后序二叉树树据），推算出整个二叉树结构。</div>
                  <div><a href="/biTreeOrder"> > > 点击进入 < < </a></div>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="算法">
              <el-collapse accordion>
                <el-collapse-item title="选择排序法" name="1">
                  <div><a href="/Sort?type=selection"> > > 点击进入 < < </a></div>
                </el-collapse-item>
                <el-collapse-item title="插入排序法" name="2">
                  <div><a href="/Sort?type=insertion"> > > 点击进入 < < </a></div>
                </el-collapse-item>
                <el-collapse-item title="希尔排序法" name="3">
                  <div><a href="/Sort?type=shell"> > > 点击进入 < < </a></div>
                </el-collapse-item>
                <el-collapse-item title="归并排序法" name="4">
                  <div><a href="/Sort?type=merge"> > > 点击进入 < < </a></div>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
    <el-dialog :visible.sync="dialogVisible" title="扫码关注" width="60%">
      <div class="weixin-qcode"></div>
    </el-dialog>
  </div>
</template>

<script>

  import Vue from 'vue'

  import { Header,Aside,Main,Footer,Container,Menu,MenuItem,Dialog,Tabs,TabPane,Collapse,CollapseItem} from 'element-ui';
  Vue.use(Menu)
  Vue.use(MenuItem)
  Vue.use(Container)
  Vue.use(Header);
  Vue.use(Main);
  Vue.use(Footer);
  Vue.use(Dialog);
  Vue.use(Tabs);
  Vue.use(TabPane);
  Vue.use(Collapse);
  Vue.use(CollapseItem);

  import '../static/css/Index.css';
  import 'element-ui/lib/theme-chalk/index.css';

  export default {
    data() {
      return {
        isShow:1,
        activeIndex: null,
        dialogVisible: false
      }
    },
    methods: {
      monitorDocumentClick(event){
        if(event.target.id == "sidemenu" || event.target.id == "mimi"){
          return false;
        }

        var sidemenu = document.querySelector("#sidemenu i");
        var sidebar = document.querySelector("#sidebar");
        if(sidemenu.className == "el-icon-caret-bottom"){
          sidemenu.className = "el-icon-caret-right";
          sidebar.className = "menu-move-to-left"
        }
      },
      handleSelect(key, keyPath){
        console.log(key, keyPath)
      },
      expand(){

        var sidemenu = document.querySelector("#sidemenu i");
        var sidebar = document.querySelector("#sidebar");

        if(sidemenu.className == "el-icon-caret-right"){
          sidemenu.className = "el-icon-caret-bottom";
          sidebar.className = "menu-move-to-right"
        }else{
          sidemenu.className = "el-icon-caret-right";
          sidebar.className = "menu-move-to-left";
        }
      }
    }
  }
</script>
<style>

  #main{
    width: 100%;
    height: 100%;
    display: flex;
    align-items:center;
    justify-content: center;
  }

</style>
