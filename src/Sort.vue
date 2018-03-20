<template>
  <div id="main">
    <div class="control">
      <div class="section">

        <b-navbar toggleable=""  type="dark" variant="info">
          <b-navbar-nav id="nav_collapse">
            <b-btn v-b-modal.modal1>输入排序数据</b-btn>
            <b-modal id="modal1" title="输入排序数据" @ok="makeOriginalSort()">
              <p class="my-4">请用如下格式[A,B,C,D,E]来列出排序数据<br>例：<br>A,B,C,D,E,F,G</p>
              <p class="my-4">
                <b-form-select v-model="supportType" :options="optionsSupport" v-on:change="dynamicOptions($event)"  class="mb-3"/>
                <b-form-input v-if="isShow" v-model="dfBlockNum" type="text" class="mb-3 sort-input-delayTime"></b-form-input>
                <b-form-textarea id="textarea1"
                                 v-model="agData"
                                 placeholder="Please Use 逗号 To Explode"
                                 :rows="3"
                                 :max-rows="6">
                </b-form-textarea>
              </p>
            </b-modal>
          </b-navbar-nav>
          <b-navbar-nav id="nav_collapse">
            <b-navbar-nav is-nav id="nav_collapse" style="width:50px"></b-navbar-nav>
            <b-navbar-nav id="nav_collapse">
              <b-button-group>
                增加动画延时（毫秒）<b-form-input id="delayTimeConfig" v-model="newDelayTime" type="text" class="sort-input-delayTime"></b-form-input>
              </b-button-group>
            </b-navbar-nav>
          </b-navbar-nav>
        </b-navbar>
      </div>
      <div class="section">
        <b-alert show variant="warning">{{errMsg}}</b-alert>
      </div>
    </div>
    <div class="sort-tips" v-html="tips">
    </div>
    <div id="box">
      <div id="mainList"></div>
      <div id="sortList"></div>
    </div>
    <div id="sortChild"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import BootstrapVue from 'bootstrap-vue'
  import {SelectionSort} from "../static/js/sort/SelectionSort";
  import {InsertionSort} from "../static/js/sort/InsertionSort";
  import {ShellSort} from "../static/js/sort/ShellSort";
  import {MergeSort} from "../static/js/sort/MergeSort";

  import '../static/css/Sort.css';

  Vue.use(BootstrapVue);

  export default {
    data() {
      return {
        supportType:null,
        optionsSupport: [
          { value:null, text: "请选择" },
          { value:1, text: "选择排序" },
          { value:2, text: "插入排序" },
          { value:3, text: "希尔排序" },
          { value:4, text: "分治排序" }
        ],
        tips:null,
        tipsDesc:{
          1:"<span>TIPS：</span>\n" +
          "      选择排序（Selection sort）是一种简单直观的排序算法。它的工作原理是每一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，直到全部待排序的数据元素排完。<br>\n" +
          "      <div>\n" +
          "        <a href=\"https://github.com/gundamzaku/algorithms/blob/master/selectionSort.go\" target=\"_blank\">查看Golang代码实现</a>\n" +
          "      </div>",
          2:"<span>TIPS：</span>\n" +
          "      插入排序（Insertion sort）的工作原理是将一组数据分成两组，分别将其称为有序组与待插入组。每次从待插入组中取出一个元素，与有序组的元素进行比较，并找到合适的位置，将该元素插到有序组当中。就这样，每次插入一个元素，有序组增加，待插入组减少。直到待插入组元素个数为0。<br>\n" +
          "      <div>\n" +
          "        <a href=\"https://github.com/gundamzaku/algorithms/blob/master/insertionSort.go\" target=\"_blank\">查看Golang代码实现</a>\n" +
          "      </div>",
          3:"<span>TIPS：</span>\n" +
          "      希尔排序（Shell's Sort）的工作原理是把记录按下标的一定增量分组，对每组使用直接插入排序算法排序；随着增量逐渐减少，每组包含的关键词越来越多，当增量减至1时，整个文件恰被分成一组，算法便终止。<br>\n" +
          "      <div>\n" +
          "        <a href=\"https://github.com/gundamzaku/algorithms/blob/master/shellSort.go\" target=\"_blank\">查看Golang代码实现</a>\n" +
          "      </div>",
          4:"分治排序，太蛋疼了，搞了我一天。动画效果不是很理想，我先想想怎么弄比较好。"
        },
        isShow : false,
        dfBlockNum : 3,
        //agData:"S,O,R,T,E,X,A,M,P,L,E",
        agData:"M,E,R,G,E,S,O,R,T,E,X,A,M,P,L,E",//,T,E,X,A,M,P,L,E
        adDataArray: [],
        tree:"",
        errMsg:"手机上看有点异常，用电脑最佳",
        newDelayTime:0
      }
    },
    mounted() {
      //console.log(666);
    },
    methods: {
      dynamicOptions: function (event) {
        if(event == 3){
          this.isShow = true;
        }else{
          this.isShow = false;
        }
      },
      makeOriginalSort: function () {

        //转成数组
        this.adDataArray = this.agData.split(",");

        //if(typeof(this.sort) != "object"){
        if(this.supportType == 2){
          this.sort = new InsertionSort();
        }else if(this.supportType == 3){
          this.sort = new ShellSort();
          if(parseInt(this.dfBlockNum)>0){
            this.sort.setDfBlockNum(parseInt(this.dfBlockNum));
          }
        }else if(this.supportType == 4){
          this.sort = new MergeSort();
        }else{
          this.supportType = 1;
          this.sort = new SelectionSort();
        }

        if(this.sort.watchDone() == false){//监控有没渲染完成
          this.errMsg = this.sort.getErrMsg();
          return false;
        }

        this.tips = this.tipsDesc[this.supportType];
        //清除画板
        this.sort.getCanvasFactory().clear();
        this.errMsg = "开始渲染";
        //分配数据
        this.sort.setData(this.adDataArray);
        //画图
        this.sort.makeMainList(50,150);
        this.sort.makeSortList(50,200);
        this.sort.getQueueFactory().run();
        if(this.supportType == 4){
          this.sort.sortInit();
        }else{
          this.sort.sort();
        }
        this.sort.getQueueFactory().addDelayTime(this.newDelayTime);
        this.sort.getQueueFactory().run();
        this.sort.show();
      }
    }
  }
</script>
