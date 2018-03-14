
<template>
  <div id="main">
    <div class="control">
      <div id="treeDataDiv" class="section">
        <div class="section">

          <b-navbar toggleable="md" type="dark" variant="info">
            <b-btn v-b-modal.modal1>输入二叉树数据</b-btn>
            <b-modal id="modal1" title="Enter BiTree Data" @ok="makeTree()">
              <p class="my-4">请用如下格式[A,B,C,D,E]来列出二叉树数据</p>
              <p class="my-4">
                <b-row class="mb-1 text-center">
                  <b-col sm="3"><b-form-select v-model="mainType" :options="optionsMain" class="mb-3" v-on:change="dynamicOptions($event,'main')"/></b-col>
                  <b-col>
                    <b-form-textarea id="textarea1"
                                     v-model="mainData"
                                     placeholder="Please Use 逗号 To Explode"
                                     :rows="3"
                                     :max-rows="6">
                    </b-form-textarea>
                  </b-col>
                </b-row>
                <b-row class="mb-1">
                  <b-col sm="3"><b-form-select v-model="supportType" :options="optionsSupport" class="mb-3" v-on:change="dynamicOptions($event,'support')" /></b-col>
                  <b-col>
                    <b-form-textarea id="textarea1"
                                     v-model="supportData"
                                     placeholder="Please Use 逗号 To Explode"
                                     :rows="3"
                                     :max-rows="6">
                    </b-form-textarea>
                  </b-col>
                </b-row>
              </p>
            </b-modal>
            <b-collapse is-nav id="nav_collapse" style="width:100px"></b-collapse>
          </b-navbar>
        </div>
      </div>
      <div class="section">
        <b-alert show variant="warning">{{errMsg}}</b-alert>
      </div>
    </div>
    <canvas id="treeCanvas"></canvas>
    <div id="banner"><div id="mainTreeList"></div><div id="supportTreeList"></div></div>
    <div id="box"></div>
  </div>
</template>

<script>
  import {BiTreefactory} from '../static/BiTree.js';
  import "../static/css/BiTree.css";

  var optionsType = [
    { value:null, text: "请选择" },
    { value:0, text: "前序数据" },
    { value:1, text: "中序数据" },
    { value:2, text: "后序数据" }
  ];
  export default {
    data() {
      return {

        mainType: null,
        supportType:null,
        optionsMain:optionsType,
        optionsSupport:optionsType,

        mainData:"",
        supportData:"",
        //mainData:"A,D,E,F,G,H,M,Z",
        //supportData:"G,D,A,F,E,M,H,Z",

        mainDataArray:"",
        supportDataArray:"",

        errMsg:"提示",
        errCode:0
      }
    },
    mounted() {
      //console.log(666);
    },
    methods: {
      dynamicOptions:function (event,type) {

        //重置
        this.optionsMain = optionsType;
        this.optionsSupport = optionsType;

        var temp = new Array();

        for(var i in optionsType){
          if(optionsType[i].value == event && optionsType[i].value != null){
            continue;
          }
          temp.push(optionsType[i]);
        }
        if(type == "main"){
          //改副的
          this.optionsSupport = temp;
        }else{
          //改主的
          this.optionsMain = temp;
        }
      },
      makeTree:function () {

        if(typeof(this.tree) != "object"){
          this.tree = new BiTreefactory();
        }

        //分解成数组
        this.mainDataArray = this.mainData.split(",");
        this.supportDataArray = this.supportData.split(",");

        //检查数据
        if(this.tree.checkData(this.mainDataArray) == false){
          this.errMsg = this.tree.getErrMsg();
          return false;
        }

        //检查数据
        if(this.tree.checkData(this.supportDataArray) == false){
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

        var container = document.getElementById("mainTreeList");
        container.innerHTML = null;
        container = document.getElementById("supportTreeList");
        container.innerHTML = null;
        if(this.handleOrder()==false)return false;
        this.tree.getQueueFactory().run();

      },

      initData:function (mainDataArray,supportDataArray) {
        this.tree.setData(mainDataArray);
        this.tree.setSupportData(supportDataArray);
        this.tree.makeMainList(100,100); //生成主线的数据
        this.tree.makeSuupportList(100,150); //生成副线的数据
      },

      handleOrder:function(){

        if(this.mainType == 0 && this.supportType == 1){

          this.initData(this.mainDataArray,this.supportDataArray);
          this.tree.handlePreIn();//前序-中序

        }else if(this.mainType == 0 && this.supportType == 2){

          this.errMsg = "无法确定二叉树（有多种结果）";
          this.errCode = 1005;
          return false;

        }else if(this.mainType == 1 && this.supportType == 0){

          this.initData(this.supportDataArray,this.mainDataArray);
          this.tree.handlePreIn();//中序-后序

        }else if(this.mainType == 1 && this.supportType == 2){

          this.initData(this.mainDataArray,this.supportDataArray);
          this.tree.handleInPost();//中序-后序

        }else if(this.mainType == 2 && this.supportType == 0){

          this.errMsg = "无法确定二叉树（有多种结果）";
          this.errCode = 1005;
          return false;

        }else if(this.mainType == 2 && this.supportType == 1){

          this.initData(this.supportDataArray,this.mainDataArray);
          this.tree.handleInPost();//中序-后序

        }else{

          this.errMsg = "参数错误";
          this.errCode = 1004;
          return false;

        }
      }
    }
  }
</script>
