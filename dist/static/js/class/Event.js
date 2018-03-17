//事件
class Event {

  constructor(){

    //先这些吧，以后有要的再加
    this.container = null;//要填充的容器
    this.type = ""; //事件类型[生成|移除|移动]
    this.value = "";
    this.id = null;
    this.delayTime = 0; //延迟几秒执行
    this.offsetX = 0; //X坐标
    this.offsetY = 0; //Y坐标
    this.elementTag = "";
    this.elementCss = "";  //元素的样式
    this.trigger = new Array(); //触发事件[数组]
    this.canvas = new Array();
    this.canvas["isDrawLine"] = 0;  //是否画线
    this.canvas["toX"] = 0;
    this.canvas["toY"] = 0;
    this.toElementId = null;//目标元素
    this.moveInterval = 200;
  }
}

function EventFactory() {
  return new Event();
}

export {
  Event
}
