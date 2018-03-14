<template>
  <div id="main">
    <div class="control">
      <div class="section">

        <b-navbar toggleable="md" type="dark" variant="info">
          <b-btn v-b-modal.modal1>输入二叉树数据</b-btn>
          <b-modal id="modal1" title="Enter BiTree Data" @ok="makeBiTree()">
            <p class="my-4">请用如下格式[A,B,C,D,E]来列出二叉树数据</p>
            <p class="my-4">
              <b-form-textarea id="textarea1"
                               v-model="agData"
                               placeholder="Please Use 逗号 To Explode"
                               :rows="3"
                               :max-rows="6">
              </b-form-textarea>
            </p>
          </b-modal>
          <b-collapse is-nav id="nav_collapse" style="width:100px"></b-collapse>
          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
              <b-button-group>
                <b-button @click="preOrderTraverse1()">前序遍历</b-button>
                <b-button @click="inOrderTraverse1()">中序遍历</b-button>
                <b-button @click="postOrderTraverse1()">后序遍历</b-button>
              </b-button-group>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
      <div class="section">
        <b-alert show variant="warning">{{errMsg}}</b-alert>
      </div>
    </div>
    <canvas id="treeCanvas"></canvas>
    <div id="box" style="background: antiquewhite"></div>
  </div>
</template>

<script>

  import Vue from 'vue'
  import BootstrapVue from 'bootstrap-vue'
  import {BiTreefactory} from '../static/BiTree.js';
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import "../static/css/BiTree.css";

  Vue.use(BootstrapVue);

  export default {
    data() {
      return {
        //agData:"a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,1,2,3,4,5",
        agData:"",//A,B,C,D,E,F,G,H,#,#,#,I,#,#,J,#,K
        adDataArray: [],
        tree:"",
        errMsg:"提示"
      }
    },
    mounted() {
      //console.log(666);
    },
    methods: {
      makeBiTree: function () {

        this.adDataArray = this.agData.split(",");
        if(typeof(this.tree) != "object"){
          this.tree = new BiTreefactory();
        }
        //分配数据
        this.tree.setData(this.adDataArray);

        //检查数据
        if(this.tree.checkData(this.adDataArray) == false){
          this.errMsg = this.tree.getErrMsg();
          return false;
        }

        if(this.tree.watchDone() == false){//监控有没渲染完成
          this.errMsg = this.tree.getErrMsg();
          return false;
        }

        //清除画板
        this.tree.getCanvasFactory().clear();
        this.errMsg = "开始渲染";

        //创建二叉树
        this.tree.node = this.tree.createBiTree(1);

        //先定位根结点的位置
        this.tree.delayTimeOffset = 0;

        //画出二叉树
        this.tree.showBiTree(this.tree.node,this.tree.nodeWidth,this.tree.nodeHeight,null);

        //启动动画
        this.tree.getQueueFactory().run();
      },

      //前序遍历
      preOrderTraverse1:function () {

        if(typeof(this.tree) != "object"){
          this.errMsg = "请先绘制一个二叉树";
          return false;
        }
        if(this.tree.watchDone() == false){//监控有没渲染完成
          this.errMsg = this.tree.getErrMsg();
          return false;
        }
        //初始化
        this.tree.getCanvasFactory().clearNodeClass();
        this.tree.orderTraversel(this.tree.node,"pre");

      },

      //中序遍历
      inOrderTraverse1:function () {

        if(typeof(this.tree) != "object"){
          this.errMsg = "请先绘制一个二叉树";
          return false;
        }
        if(this.tree.watchDone() == false){//监控有没渲染完成
          this.errMsg = this.tree.getErrMsg();
          return false;
        }
        this.tree.getCanvasFactory().clearNodeClass();
        this.tree.orderTraversel(this.tree.node,"in");
      },

      //后序遍历
      postOrderTraverse1:function () {
        if(typeof(this.tree) != "object"){
          this.errMsg = "请先绘制一个二叉树";
          return false;
        }
        if(this.tree.watchDone() == false){//监控有没渲染完成
          this.errMsg = this.tree.getErrMsg();
          return false;
        }
        this.tree.getCanvasFactory().clearNodeClass();
        this.tree.orderTraversel(this.tree.node,"post");
      }

    }
  }
</script>
