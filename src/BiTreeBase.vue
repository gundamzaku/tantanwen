
<template>
  <div id="main">
    <div class="control">
      <div class="section">
        <input type="text" placeholder="" v-model="agData">
        <div class="inputs">
          <input type="button" value="生成二叉树" @click="makeBiTree()">
        </div>
      </div>
      <div class="section">
        <div class="inputs">
          <input type="button" value="前序遍历" @click="preOrderTraverse1()">
          <input type="button" value="中序遍历" @click="inOrderTraverse1()">
          <input type="button" value="后序遍历" @click="postOrderTraverse1()">
        </div>
      </div>
      <div class="section">
        <div class="inputs">
          <!--<input type="button" value="重置" @click="clear()">-->
        </div>
      </div>
    </div>
    <canvas id="treeCanvas"></canvas>
    <div id="box"></div>
  </div>
</template>

<script>
  import {BiTreefactory} from '../static/BiTree.js';
  export default {
    data() {
      return {
        //agData:"a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,1,2,3,4,5",
        agData:"A,B,C,D,E,F,G,H,#,#,#,I,#,#,J,#,K",
        adDataArray: [],
        tree:""
      }
    },
    mounted() {
      //console.log(666);
    },
    methods: {
      makeBiTree: function () {
        this.adDataArray = this.agData.split(",");
        this.tree = new BiTreefactory();

        this.tree.setData(this.adDataArray);
        //var tree = new BiTreefactory(this.adDataArray);
        if(this.tree.canvas.watchDone() == false){//监控有没渲染完成
          return false;
        }
        this.tree.canvas.clear();
        this.tree.node = this.tree.createBiTree(1);

        //先定位根结点的位置
        this.tree.delayTimeOffset = 0;
        this.tree.showBiTree(this.tree.node,this.tree.nodeWidth,this.tree.nodeHeight,null);

        this.tree.run();
      },
      preOrderTraverse1:function () {
        if(this.tree == ""){
          return false;
        }
        if(this.tree.canvas.watchDone() == false){//监控有没渲染完成
          return false;
        }
        this.tree.canvas.clearNodeClass();
        this.tree.orderTraversel(this.tree.node,"pre");
      },
      inOrderTraverse1:function () {  //中序
        if(this.tree == ""){
          return false;
        }
        if(this.tree.canvas.watchDone() == false){//监控有没渲染完成
          return false;
        }
        this.tree.canvas.clearNodeClass();
        this.tree.orderTraversel(this.tree.node,"in");
      },
      postOrderTraverse1:function () {  //后序
        if(this.tree == ""){
          return false;
        }
        if(this.tree.canvas.watchDone() == false){//监控有没渲染完成
          return false;
        }
        this.tree.canvas.clearNodeClass();
        this.tree.orderTraversel(this.tree.node,"post");
      },
      clear:function () {
        this.tree.canvas.clearNodeClass();
      }
    }
  }

</script>
<style>
  @import "../static/css/BiTree.css";
</style>
