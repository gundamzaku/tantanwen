
<template>
  <div id="main">
    <div class="control">
      <div id="treeDataDiv" class="section">
        <li>
          前序遍历：<input type="text" placeholder="" v-model="preData">
          主<input type="radio" name="mRadio" value="0" v-on:click="confirmData">
          副<input type="radio" name="sRadio" value="0" v-on:click="confirmData">
        </li>
        <li>
          中序遍历：<input type="text" placeholder="" v-model="inData">
          主<input type="radio" name="mRadio" value="1" v-on:click="confirmData">
          副<input type="radio" name="sRadio" value="1" v-on:click="confirmData">
        </li>
        <li>
          后序遍历：<input type="text" placeholder="" v-model="postData">
          主<input type="radio" name="mRadio" value="2" v-on:click="confirmData">
          副<input type="radio" name="sRadio" value="2" v-on:click="confirmData">
        </li>
      </div>
      <div class="section">
        <div class="inputs">
          <input type="button" value="生成" @click="makeTree()">
        </div>
      </div>
      <div class="section">
        <div>{{errorMsg}}</div>
      </div>
    </div>
    <canvas id="treeCanvas"></canvas>
    <div id="banner"><div id="mainTreeList"></div><div id="supportTreeList"></div></div>
    <div id="box"></div>
  </div>
</template>

<script>
  import {BiTreefactory} from '../static/BiTree.js';

  export default {
    data() {
      return {
        //agData:"a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,1,2,3,4,5",
        //preData:"1,2,4,7,3,5,6,8",
        //inData:"4,7,2,1,5,3,8,6",
        preData:"G,D,A,F,E,M,H,Z",
        inData:"A,D,E,F,G,H,M,Z",
        postData:"A,E,F,D,H,Z,M,G",
        mainType:"",
        mainDataArray:"",
        supportType:"",
        supportDataArray:"",
        errorMsg:"",
        errorCode:0
      }
    },
    mounted() {
      //console.log(666);
    },
    methods: {
      makeTree:function () {

        this.tree = new BiTreefactory();
        this.tree.clear();
        this.tree.killAll();

        if(this.errorCode == 1002){
          return false;
        }
        //得到所有的Input
        var treeData = new Array();
        treeData[0] = this.preData; //前序
        treeData[1] = this.inData; //中序
        treeData[2] = this.postData; //后序

        //过滤出符合条件的数据
        var mainData = treeData[this.mainType];
        var supportData = treeData[this.supportType];

        //分解成数组
        this.mainDataArray = mainData.split(",");
        this.supportDataArray = supportData.split(",");

        if(this.mainDataArray[0] == "" || this.supportDataArray[0] == ""){
          this.errorMsg = "数据不全";
          this.errorCode = 1003;
          return false;
        }
        var container = document.getElementById("mainTreeList");
        container.innerHTML = null;
        container = document.getElementById("supportTreeList");
        container.innerHTML = null;

        this.tree.setData(this.mainDataArray);
        this.tree.setSupportData(this.supportDataArray);

        this.tree.makeMainList(100,100); //生成主线的数据
        this.tree.makeSuupportList(100,150); //生成副线的数据
        if(this.handleOrder()==false)return false;

        //最后
        this.tree.run();
      },
      handleOrder:function(){

        if(this.mainType == 0 && this.supportType == 1){
          this.tree.handlePreIn();//前序-中序
        }else if(this.mainType == 0 && this.supportType == 2){
          this.errorMsg = "无法确定二叉树（有多种结果）";
          this.errorCode = 1005;
          return false;
          //this.tree.handlePrePost();//前序-后序
        }else if(this.mainType == 1 && this.supportType == 0){
          this.errorMsg = "请参考前序-中序";
          this.errorCode = 1005;
          return false;
          //this.tree.handleInPre();//中序-前序
        }else if(this.mainType == 1 && this.supportType == 2){
          this.tree.handleInPost();//中序-后序
        }else if(this.mainType == 2 && this.supportType == 0){
          this.errorMsg = "无法确定二叉树（有多种结果）";
          this.errorCode = 1005;
          return false;
        }else if(this.mainType == 2 && this.supportType == 1){
          this.errorMsg = "请参考中序-后序";
          this.errorCode = 1005;
          return false;
          //this.tree.handlePostPre();//后序-中序
        }else{
          this.errorMsg = "参数错误";
          this.errorCode = 1004;
          return false;
        }

      },

      confirmData:function (event) {

        if(event.target.name == "mRadio"){
          this.mainType = event.target.value;
        }
        if(event.target.name == "sRadio"){
          this.supportType = event.target.value;
        }

        if((this.mainType == this.supportType) &&
          (this.mainType != ""  && this.supportType != "")){
          this.errorMsg = "不能同时选择一个顺序";
          this.errorCode = 1002;
        }else{
          this.errorMsg = "";
          this.errorCode = 0;
        }
        //console.log(this.mainData+" "+this.supportData)
      }
    }
  }

</script>
<style>
  @import "../static/css/BiTree.css";
</style>
