import {Sort} from '../sort/Sort'

class MergeSort extends Sort{

  constructor() {
    //继承
    super();
    this.aux = new Array();
    this.staticSortNode = new Array();
    this.fluid = 1;
    this.left = 50;
    this.delayTime = 1000;
    this.container = document.getElementById("sortChild")
    this.vessel = new Array();
    this.vesselX = new Array();
    this.equeue = new Array();

  }

  tail(e){
    console.log("移动轨迹"+e.value+" 从 "+e.offsetX+" 到 "+e.canvas['toX']+" ； "+e.offsetY+" 到 "+e.canvas['toY']+" ： "+e.delayTime)
  }

  merge(lo,mid,hi,dtime,layer){

    var layer = 200+50*layer;//表示在第几层
    var from,to;
    var i = lo;
    var j = mid+1;
    var indexLayer = layer/100;
    var changeQueue = new Array();

    for(var k = lo;k<=hi;k++){
      this.aux[k] = this.sortNode[k];
    }

    for(var k = lo;k<=hi;k++) {

      to = this.sortNode[k];

      if (i > mid) {
        from = this.aux[j];
        this.sortNode[k] = this.aux[j];
        j++;
      } else if (j > hi) {
        from = this.aux[i];
        this.sortNode[k] = this.aux[i];
        i++;
      } else if (this.less(this.aux[j]["value"], this.aux[i]["value"])) {
        from = this.aux[j];
        this.sortNode[k] = this.aux[j];
        j++;
      } else {
        from = this.aux[i];
        this.sortNode[k] = this.aux[i];
        i++;
      }

      //标亮i
      e = this.createEvent("force",from["value"],"sort_"+layer+"_"+from["index"],dtime,"div",null,0,0,null);
      this.getQueueFactory().push(e);
      dtime = dtime+this.delayTimeInterval;

      //第几层，哪个ID，值变成了什么。
      var e = this.createEvent("move", from["value"], "sort_"+layer+"_"+from["index"], dtime, "div", this.getCanvasFactory().nodeClass, this.vesselX["sort_"+layer+"_"+from["index"]],layer, null);
      e.canvas["toX"] = this.vesselX["sort_"+layer+"_"+to["index"]];
      e.canvas["toY"] = layer;
      this.getQueueFactory().push(e);
      dtime = dtime+this.delayTimeInterval;

      //取消标亮
      //e = this.createEvent("unforce",from["value"],"sort_"+layer+"_"+from["index"],dtime,"div",null,0,0,null);
      //this.getQueueFactory().push(e);
      //dtime = dtime+this.delayTimeInterval;

      this.mappingFatherLoop(layer,from,to,dtime);
    }

    for(var i in this.equeue){
      if(typeof this.equeue[i] == "undefined")continue;
      //console.log("对应的坐标发生了变化：发生于 "+changeQueue[i][0]+" ，变更为"+changeQueue[i][1])
      this.vesselX[this.equeue[i][0]] = this.equeue[i][1];
    }

    dtime+=this.delayTime;
    return dtime;
  }

  mappingFatherLoop(layer,from,to,dtime){

    this.mappingFather(layer,from,to,dtime);
  }

  mappingFather(layer,from,to,dtime){

    //向上投射
    while(layer<=250) {
      return;
    }

    var layerMother = layer - 50;
    var e = this.createEvent("move", from["value"], "sort_"+layerMother+"_"+from["index"], dtime,
        "div", this.getCanvasFactory().nodeClass, this.vesselX["sort_"+layerMother+"_"+from["index"]],layerMother, null);
    e.canvas["toX"] = this.vesselX["sort_"+layerMother+"_"+to["index"]];
    e.canvas["toY"] = layerMother;
    this.getQueueFactory().push(e);
    this.equeue.push(["sort_"+layerMother+"_"+from["index"],this.vesselX["sort_"+layerMother+"_"+to["index"]]]);
    this.mappingFather(layerMother,from,to,dtime);

  }

  sortInit(){

    //初始化
    var sortChild = document.querySelector("#sortChild");
    sortChild.innerHTML = "";

    //初始化时间
    var dtime = this.delayTime+= this.delayTimeStart;

    for(var i in this.sortNode){
      this.staticSortNode[i] = this.clone(this.sortNode[i]);
    }

    //先构筑原型图
    dtime = this.sortBackGround(0,this.data.length-1,dtime,1);
    var positionTop = this.make();

    var sortTips = document.querySelector(".sort-tips");

    sortTips.style.top = (this.vessel.length*100+30)+"px";
    //sort-tips

    //重置
    this.fluid = 1;
    dtime = this.sort(0,this.data.length-1,dtime,1);

    for(i in this.sortNode){
      this.data[i] = this.sortNode[i]["value"];
    }
  }

  make(){
    var positionTop;//位置
    var data;
    var left;
    for(var i in this.vessel){
      positionTop = i*100;
      left = 50;
      for(var j in this.vessel[i]){

        for(var k in this.vessel[i][j]){
          data = this.vessel[i][j][k];
          var e = this.createEvent("create",data.value,"sort_"+positionTop+"_"+data.index,0,"div",this.getCanvasFactory().nodeClass,left+1,positionTop,this.container);

          //每一个都会产生一个新的坐标
          this.vesselX["sort_"+positionTop+"_"+data.index] = left+1;

          this.getQueueFactory().push(e);
          left += 31;
        }
        left += 50;
      }
    }

  }

  draw(lo,mid,hi,dtime,layer){

    var layer = 200+50*layer;//表示在第几层
    var from,to;
    var i = lo;
    var j = mid+1;
    var indexLayer = layer/100;

    if(typeof this.vessel[indexLayer] == "undefined"){
      this.vessel[indexLayer] = new Array()
    }
    this.vessel[indexLayer][this.fluid] = new Array();
    for(var k = lo;k<=hi;k++){
      this.vessel[indexLayer][this.fluid].push(this.staticSortNode[k]);
    }
    return dtime;
  }

  sortBackGround(lo,hi,dtime,layer){

    if(hi <= lo){
      return dtime;
    }

    var mid = parseInt(lo+(hi-lo)/2);
    ++layer;
    dtime = this.sortBackGround(lo,mid,dtime,layer);
    dtime = this.sortBackGround(mid+1,hi,dtime,layer);
    dtime = this.draw(lo,mid,hi,dtime,--layer);
    this.fluid++;
    return dtime;
  }

  sort(lo,hi,dtime,layer){

    if(hi <= lo){
      return dtime;
    }

    var mid = parseInt(lo+(hi-lo)/2);
    ++layer;
    dtime = this.sort(lo,mid,dtime,layer);
    dtime = this.sort(mid+1,hi,dtime,layer);
    dtime = this.merge(lo,mid,hi,dtime,--layer);
    this.fluid++;
    return dtime;
  }

  min(x,y){
    if(x < y){
      return x;
    }
    return y;
  }

  clone(obj) {
    var o;
    if (typeof obj == "object") {
      if (obj === null) {
        o = null;
      } else {
        if (obj instanceof Array) {
          o = [];
          for (var i = 0, len = obj.length; i < len; i++) {
            o.push(this.clone(obj[i]));
          }
        } else {
          o = {};
          for (var j in obj) {
            o[j] = this.clone(obj[j]);
          }
        }
      }
    } else {
      o = obj;
    }
    return o;
  }
}

export {
  MergeSort
}
