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
        this.tree.showBiTree(this.tree.node,this.tree.nodeWidth,this.tree.nodeHeight,null);
        this.tree.draw();
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
  .control{
    position: absolute;
  }
  .section{
    display: inline-block;
  }
  .box{
    width: 30px;
    height: 30px;
    text-align: center; /*设置文本水平居中*/
    line-height: 30px; /*设置line-height与父级元素的height相等*/
    overflow: hidden; /*防止内容超出容器或者产生自动换行*/
    position: absolute;
    background-color: yellow;
    display: inline-block;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    border-bottom-left-radius: 50px;

  }

  .showNode{
    background-color: yellow;
    animation:showNode 1s;
    -moz-animation:showNode 1s; /* Firefox */
    -webkit-animation:showNode 1s; /* Safari and Chrome */
    -o-animation:showNode 1s; /* Opera */
  }

  .forceNode{
    background-color: red;
    animation:forceNode 1s;
    -moz-animation:forceNode 1s; /* Firefox */
    -webkit-animation:forceNode 1s; /* Safari and Chrome */
    -o-animation:forceNode 1s; /* Opera */
  }

  @keyframes showNode{
    from {background:red;}
    to {background:yellow;}
  }
  @-moz-keyframes showNode{ /* Firefox */
    from {background:red;}
    to {background:yellow;}
  }
  @-webkit-keyframes showNode{ /* Safari and Chrome */
    from {background:red;}
    to {background:yellow;}
  }
  @-o-keyframes showNode{ /* Opera */
    from {background:red;}
    to {background:yellow;}
  }

  @keyframes forceNode{
    from {background:yellow;}
    to {background:red;}
  }
  @-moz-keyframes forceNode{ /* Firefox */
    from {background:yellow;}
    to {background:red;}
  }
  @-webkit-keyframes forceNode{ /* Safari and Chrome */
    from {background:yellow;}
    to {background:red;}
  }
  @-o-keyframes forceNode{ /* Opera */
    from {background:yellow;}
    to {background:red;}
  }
</style>
