import {Lib} from '../lib/Lib.js';

class Canvas {

  constructor(containerId=null){

    this.counterId  = "__system_canvas_counter";
    this.counter = null;
    this.initCounter();

    if(containerId != null){
      //设置画板及大小
      this.canvas = document.getElementById(containerId);
      //默认
      this.canvas.width = document.documentElement.clientWidth;
      this.canvas.height = document.documentElement.clientHeight;

      //设置画板的风格
      this.ctx=this.canvas.getContext("2d");
      //线的粗细
      this.lineWidth = 2;
      //线的颜色
      this.strokeStyle = "#195eec";
    }
    //结点的半径
    this.correctCoordinateOffset = 15;

    this.panelId = "box";
    this.nodeClass = "box"
    this.box = document.getElementById(this.panelId);

    this.node = new Array();

    //延迟时间
    //this.delayTime = 400;
  }

  adjustCanvasScale(width,height){
    this.canvas.width = width;
    this.canvas.height = height;
  }
  /*
    初始化一个计数器
   */
  initCounter(){

    this.counter  = document.getElementById(this.counterId);
    if(this.counter == null){
      this.counter = document.createElement("input");
      this.counter.id = this.counterId;
      this.counter.type = "text";
      this.counter.value = 0;
      this.counter.hidden = true;
      document.body.appendChild(this.counter);
    }
  }
  /*
  设置一个计数器
 */
  setCounter(sum){
    if(this.counter == null){
      return false;
    }
    this.counter.value = parseInt(this.counter.value)+sum;
  }

  /*
    计数器递减
   */
  reduceCounter(){

    if(this.counter == null){
      return false;
    }

    this.counter.value--;
    if(this.counter.value<0)this.counter.value = 0;
  }

  /*
    返回计数器
   */
  getCounter(){
    if(this.counter == null){
      return 0;
    }
    return this.counter.value;
  }

  /*
    画线
   */
  drawLine(fromX,fromY,toX,toY){

    fromX = parseInt(fromX);
    fromX += this.correctCoordinateOffset;
    fromY = parseInt(fromY);
    fromY += this.correctCoordinateOffset;
    toX = parseInt(toX);
    toX += this.correctCoordinateOffset;
    toY = parseInt(toY);
    toY += this.correctCoordinateOffset;
    this.ctx.lineWidth = this.lineWidth;//线条的宽度
    this.ctx.strokeStyle = this.strokeStyle;//线条的颜色
    this.ctx.beginPath();
    this.ctx.moveTo(fromX,fromY);
    this.ctx.lineTo(toX,toY);
    this.ctx.stroke();
    this.ctx.closePath();
  }


  //迟早要用来替代下面的webDiv
  handle(node,ths){

    if(node.type == "create"){
      ths.create(node,ths);
    }else if(node.type == "vanish") {
      Lib.vanish(node.id,0);
    }else if(node.type == "force") {  //设置焦点
      Lib.addClass(document.getElementById(node.id), "forceNode");
    }else if(node.type == "unForce"){ //取消焦点
      Lib.removeClass(document.getElementById(node.id), "forceNode");
    }else if(node.type == "nothing"){
    }else if(node.type == "exchange"){
      ths.exchange(node,false);
    }else if(node.type == "move"){
      ths.exchange(node,true);
    }

    ths.reduceCounter(node,ths);
  }

  create(node,ths){
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
  }

  //移动元素
  exchange(node,onlyMove){

    //用时间轴来移动
    var toLeft,toTop,fromLeft,fromTop;

    toLeft = node.canvas["toX"];
    toTop = node.canvas["toY"];

    fromLeft = node.offsetX;
    fromTop = node.offsetY;

    var toElement = document.getElementById(node.toElementId);
    var element = document.getElementById(node.id);

    this.moveExchange(element,fromLeft,toLeft,fromTop,toTop,node.moveInterval);
    if(onlyMove == false){
      this.moveExchange(toElement,toLeft,fromLeft,fromTop,toTop,node.moveInterval);
    }
  }

  /*
    要算出平均值，否则在加减上有问题
    我预计在400毫秒内完成，也就是我只能做8次。不对，应该改这个毫秒。
    我预计在400毫秒内完成，因此我的间隔就是offsetLeft-toLeft的差值distance，由intervalTime/distance得到平均值
    然后就在这个时间段内进行减法操作直到完成
   */
  moveExchange(element,fromLeft,toLeft,fromTop,toTop,intervalAllTime){
    console.log(fromTop+"  "+toTop);
    var offsetLeft = fromLeft;
    var toLeft = toLeft;

    var offsetTop = fromTop;
    var toTop = toTop;

    var unit = 1;
    var intervalAllTime = intervalAllTime;
    var distance = Math.floor(Math.sqrt( Math.pow(Math.abs(offsetLeft - toLeft),2)+Math.pow(Math.abs(offsetTop - toTop),2) )) ;

    //var distance = Math.abs(offsetLeft - toLeft);
    //试下来如果距离超长的还是没有办法，这里加个双保险吧。
    var intervalTime = Math.floor(intervalAllTime/distance);
    if(intervalAllTime<distance){
      //要缩减递减的值
      intervalTime = intervalAllTime;
      unit = Math.ceil(distance/intervalAllTime);
      intervalTime = Math.floor(Math.ceil(intervalAllTime/Math.ceil(distance/unit)));
    }

    var intervalId = setInterval(doMove, intervalTime);

    function doMove() {

      if(offsetLeft == toLeft && offsetTop == toTop){
        element.style.left = offsetLeft+"px";
        element.style.top = offsetTop+"px";
        clearInterval(intervalId);
      } else {
        if(offsetLeft>toLeft){
          offsetLeft -= unit;
          if(offsetLeft<toLeft)offsetLeft = toLeft;
        }
        if(offsetLeft<toLeft){
          offsetLeft += unit;
          if(offsetLeft>toLeft)offsetLeft = toLeft;
        }
        if(offsetTop>toTop){
          offsetTop -= unit;
          if(offsetTop<toTop)offsetTop = toTop;
        }
        if(offsetTop<toTop){
          offsetTop += unit;
          if(offsetTop>toTop)offsetTop = toTop;
        }
        element.style.left = offsetLeft+"px";
        element.style.top = offsetTop+"px";
      }
    }
  }

  clearNodeClass(){
    this.node = this.box.getElementsByTagName("div");
    for(var i=0;i<this.node.length;i++){
      this.node[i].className = "box showNode";
    }
  }

  clear(){
    this.box.innerHTML = "";
    if(typeof(this.ctx)!="undefined"){
      this.ctx.clearRect(0,0,document.documentElement.scrollWidth,document.documentElement.scrollHeight);
    }
  }

}
/*
function CanvasFactory(containerId) {
  return new Canvas(containerId);
}*/

export {
  Canvas
}
