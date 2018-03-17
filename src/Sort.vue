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
    <div class="sort-tips"><spa>TIPS：</spa>选择排序（Selection sort）是一种简单直观的排序算法。它的工作原理是每一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，直到全部待排序的数据元素排完。<br>

      <div>
        <b-link href="https://github.com/gundamzaku/algorithms/blob/master/selectionSort.go" target="_blank">查看Golang代码实现</b-link>
      </div>
    </div>
    <div id="box">
      <div id="mainList"></div>
      <div id="sortList"></div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import BootstrapVue from 'bootstrap-vue'
  import {SelectionSort} from "../static/js/sort/SelectionSort";
  import '../static/css/Sort.css';

  Vue.use(BootstrapVue);

  export default {
    data() {
      return {
        agData:"S,O,R,T,E,X,A,M,P,L,E",
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

      makeOriginalSort: function () {
        //转成数组
        this.adDataArray = this.agData.split(",");
        if(typeof(this.sort) != "object"){
          this.sort = new SelectionSort();
        }

        if(this.sort.watchDone() == false){//监控有没渲染完成
          this.errMsg = this.sort.getErrMsg();
          return false;
        }
        //清除画板
        this.sort.getCanvasFactory().clear();
        this.errMsg = "开始渲染";
        //分配数据
        this.sort.setData(this.adDataArray);
        //画图
        this.sort.makeMainList(50,100);
        this.sort.makeSortList(50,150);
        this.sort.getQueueFactory().run();
        this.sort.sort();
        this.sort.getQueueFactory().addDelayTime(this.newDelayTime);
        this.sort.getQueueFactory().run();
        //this.sort.show();
      }
    }
  }
</script>
