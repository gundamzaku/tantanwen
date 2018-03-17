import {Event} from "./Event";

class Father{

  constructor(){
    this.errCode = null;
    this.errMsg = null;
    this.data = null;
    this.nodeWidth = 30;//结点的宽度
    this.queue = null;
    this.canvas = null;
  }

  //设置错误
  setErr(code,msg){
    this.errCode = code;
    this.errMsg = msg;
  }
  //得到错误码
  getErrCode(){
    return this.errCode;
  }
  //得到错误提示
  getErrMsg(){
    return this.errMsg;
  }
  //分配数据
  setData(data){
    this.data = data;
  }

  //返回队列实例
  getQueueFactory(){
    return this.queue;
  }
  //返回画图实例
  getCanvasFactory(){
    return this.canvas;
  }

  /*
  监控动画
 */
  watchDone(){
    if(this.getCanvasFactory().getCounter()>0){
      this.setErr(1003,"动画渲染未完成。")
      return false;
    }
    return true;
  }

  createEvent (type,value,id,delayTime,tag,css,offsetX,offsetY,container) {
    var event = new Event();
    event.container = container;
    event.type = type;
    event.value = value;
    event.id = id;
    event.delayTime = delayTime;
    event.offsetX = offsetX;
    event.offsetY = offsetY;
    event.elementTag = tag;
    event.elementCss = css;
    return event;
  }

}

export {
  Father
}
