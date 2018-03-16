import {Lib} from '../static/Lib.js';

class Canvas {

  constructor(containerId){

    this.counterId  = "__system_canvas_counter";
    this.counter = null;
    this.initCounter();

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
    ths.reduceCounter();
  }

  clearNodeClass(){
    this.node = this.box.getElementsByTagName("div");
    for(var i=0;i<this.node.length;i++){
      this.node[i].className = "box showNode";
    }
  }

  clear(){
    this.box.innerHTML = "";
    this.ctx.clearRect(0,0,document.documentElement.scrollWidth,document.documentElement.scrollHeight);

  }

}

function CanvasFactory(containerId) {
  return new Canvas(containerId);
}


export {
  CanvasFactory
}
