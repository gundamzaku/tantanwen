var poolThreads = 0;
var allQueue = 0;

import {Lib} from '../static/Lib.js';

class Canvas {
  constructor(containerId){
    //设置画线
    if(this.watchDone() == false)return;
    var canvas = document.getElementById(containerId);
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    this.ctx=canvas.getContext("2d");
    this.lineWidth = 2;
    this.strokeStyle = "#195eec";
    this.correctCoordinateOffset = 5;
    this.panelId = "box";
    this.nodeClass = "box"
    this.box = document.getElementById(this.panelId);
    this.node = new Array();
    this.delayTime = 400;
  }

  drawLine(fromX,fromY,toX,toY){

    fromX = parseInt(fromX);
    fromX += this.correctCoordinateOffset;
    fromY = parseInt(fromY);
    fromY -= this.correctCoordinateOffset;
    toX = parseInt(toX);
    toX += this.correctCoordinateOffset;
    toY = parseInt(toY);
    toY -= this.correctCoordinateOffset;
    //console.log("draw :"+fromX+" "+fromY+" "+toX+" "+toY)
    this.ctx.lineWidth = this.lineWidth;//线条的宽度
    this.ctx.strokeStyle = this.strokeStyle;//线条的颜色
    this.ctx.moveTo(fromX,fromY);
    this.ctx.lineTo(toX,toY);
    this.ctx.stroke();
  }

  //迟早要用来替代下面的webDiv
  handle(node,ths){

    if(node.type == "create"){
      //生成
      var element = document.createElement(node.elementTag);
      element.innerHTML = node.value;
      element.className = node.elementCss
      //这个动画效果也要配置化
      element.className = element.className+" showNode";
      element.style.left = node.offsetX+"px";
      element.style.top = node.offsetY+"px";
      if(node.id != null){
        element.setAttribute("id",node.id);
      }
      if(node.container == null){
        ths.box.appendChild(element);
      }else{
        node.container.appendChild(element);
      }

      if(node.canvas["isDrawLine"] == 1){
        ths.drawLine(node.offsetX,node.offsetY,node.canvas["toX"],node.canvas["toY"]);
      }
    }else if(node.type == "vanish") {

      Lib.vanish(node.id,0);
    }else if(node.type == "force"){
      Lib.addClassNoCheck(document.getElementById(node.id),"forceNode");
    }
  }
  //@deprecated
  webDiv(node,element){

    //console.log(typeof(element));
    if(typeof(element) == "undefined" || element == null){
      element = this;
    }
    //////////
    var div = document.createElement("DIV");
    div.innerHTML = node.data;
    div.className = element.nodeClass;
    div.className = div.className+" showNode";
    div.style.left = node.left+"px";
    div.style.top = node.top+"px";
    div.setAttribute("id","node_"+node.index);
    this.box.appendChild(div);
    if(node.parentLeft>0 && node.parentTop>0){
      //i can draw
      this.drawLine(node.left,node.top,node.parentLeft,node.parentTop);
    }
  }

  clearNodeClass(){
    this.node = this.box.getElementsByTagName("div");
    for(var i=0;i<this.node.length;i++){
      this.node[i].className = "box showNode";
    }
  }

  //没能低耦合，要改
  //@deprecated
  /*
  forceNode(queue){

    var delayTime = this.delayTime;
    var i;
    for(i = 0;i<queue.length;i++){
      //console.log(queue[i]);
      setTimeout(Lib.addClassNoCheck,delayTime*i,document.getElementById("node_"+queue[i]),"forceNode");
      //Lib.addClass(this.node[queue[i]],"forceNode");
    }
  }
  */

  drawBiTree(queue,i,timeDelay,element){

    if(i>=queue.length)return;
    element.webDiv(queue[i],null);
    i++;

    poolThreads++;
    //console.log(element.poolThreads);
    setTimeout(element.drawBiTree,timeDelay,queue,i,timeDelay,element)
    //this.drawBiTree(queue,i,timeDelay)
  }

  clear(){
    poolThreads = 0;
    this.box.innerHTML = "";
    this.ctx.clearRect(0,0,document.documentElement.scrollWidth,document.documentElement.scrollHeight);
    //this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
  }

  //@deprecated
  draw(queue){

    var timeDelay = this.delayTime;
    var i = 0;
    allQueue = queue.length;
    setTimeout(this.drawBiTree,timeDelay,queue,i,timeDelay,this)
    //this.drawBiTree(queue,i,timeDelay);//递归
  }

  watchDone(){

    if(poolThreads< allQueue){
      console.log("还在渲染中");
      return false;
    }
    return true;
  }
}

function CanvasFactory(containerId) {
  return new Canvas(containerId);
}


export {
  CanvasFactory
}
