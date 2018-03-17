import {Canvas} from "../class/Canvas";
import {Queue} from "../class/Queue";
import {Father} from "../class/Father";

class Sort extends Father{

  constructor(){
    super();
    this.correctWidth = 1;
    this.boxWidth = this.nodeWidth;//宽度
    this.canvas = new Canvas();
    this.canvas.nodeClass = "sort-box";
    this.queue = new Queue(this.canvas);
    this.delayTimeStart = 1000;//什么时候启动

    this.sortNode = new Array();

    this.delayTime = 1000;
    this.delayTimeInterval = 400;//每个动作的间隔是多少

  }

  changeDelay(customDelayTimeExt){
    this.getQueueFactory().addDelayTime(customDelayTimeExt);
  }

  makeMainList(offsetX,offsetY){

    var container = document.getElementById("mainList");

    for(var i=0;i<this.data.length;i++){
      //加入队列
      var e = this.createEvent("create",this.data[i],"main_"+i,0,"div",this.getCanvasFactory().nodeClass,offsetX,offsetY,container);
      this.getQueueFactory().push(e);
      offsetX += this.boxWidth+this.correctWidth;
    }
  }

  makeSortList(offsetX,offsetY){

    var container = document.getElementById("sortList");

    for(var i=0;i<this.data.length;i++){
      //加入队列
      var e = this.createEvent("create",this.data[i],"sort_"+i,0,"div",this.getCanvasFactory().nodeClass,offsetX,offsetY,container);
      this.getQueueFactory().push(e);
      //this.sortNode[i] = e; //这TM是传引用的，这坑吃亏
      this.sortNode[i] = {
        "id":e.id,
        "value":e.value,
        "offsetX":e.offsetX,
        "offsetY":e.offsetY,
      }
      offsetX += this.boxWidth+this.correctWidth;
    }
  }

  less(v,w){
    return v<w;
  }

  exch(i,j,delayTime){

    var t = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = t;

    //临时变量也一起交换
    t = this.sortNode[i];
    this.sortNode[i] = this.sortNode[j];
    this.sortNode[j] = t;

    return this.exchAni(i,j,delayTime);
  }

  exchAni(i,j,delayTime){

    var e;
    //标亮i
    e = this.createEvent("force",this.data[i],this.sortNode[i]["id"],delayTime,"div",null,0,0,null);
    this.getQueueFactory().push(e);

    //标亮j
    e = this.createEvent("force",this.data[j],this.sortNode[j]["id"],delayTime,"div",null,0,0,null);
    this.getQueueFactory().push(e);

    delayTime = delayTime+this.delayTimeInterval;
    //交换元素

    e = this.createEvent("exchange",this.data[i],this.sortNode[i]["id"],delayTime,"div",null,this.sortNode[i]["offsetX"],this.sortNode[i]["offsetY"],null);
    e.canvas["toX"] = this.sortNode[j]["offsetX"];
    e.canvas["toY"] = this.sortNode[j]["offsetY"];

    //有BUG，在机器卡的情况下显示异常，不能去抓DOM
    this.sortNode[j]["offsetX"] = this.sortNode[i]["offsetX"];
    //this.sortNode[j].offsetY = this.sortNode[i].offsetY;
    this.sortNode[i]["offsetX"] = e.canvas["toX"];
    //this.sortNode[i].offsetY = e.canvas["toY"];

    e.toElementId = this.sortNode[j]["id"];
    e.moveInterval = this.delayTimeInterval;
    this.getQueueFactory().push(e);

    delayTime = delayTime+this.delayTimeInterval;
    //取消标亮i
    e = this.createEvent("unForce",this.data[i],this.sortNode[i]["id"],delayTime,"div",null,0,0,null);
    this.getQueueFactory().push(e);

    //取消标亮j
    e = this.createEvent("unForce",this.data[j],this.sortNode[j]["id"],delayTime,"div",null,0,0,null);
    this.getQueueFactory().push(e);
    delayTime = delayTime+this.delayTime+this.delayTimeInterval;

    return delayTime;
  }

  show(a){
    for(var i = 0;i<this.data.length;i++){
      console.log(this.data[i]+" ");
    }
  }

  nothing(delayTime){
    var e = this.createEvent("nothing",0,null,delayTime,null,null,0,0,0);
    this.getQueueFactory().push(e);
  }
}

export {
  Sort
}
