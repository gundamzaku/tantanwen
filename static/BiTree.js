import {CanvasFactory} from '../static/Canvas.js';
import {EventFactory} from '../static/Event.js';
import {QueueFactory} from '../static/Queue.js';

class BiTree{

  constructor(){

    //var object = function(){};

    //原型继承
    //object.prototype = new CanvasFactory("treeCanvas");
    //算了，独立使用
    this.canvas = new CanvasFactory("treeCanvas");
    //queue还是独立吧
    this.queue = new QueueFactory(this.canvas);

    //主数据和副数据
    this.data = "";
    this.supportData = "";//第二个树数据

    //定义一个结构体，二叉树的
    this.node = this.initNode();
    this.delayTime = 400;
    this.delayTimeOffset = 1;
    //要初始化一堆东西

    this.nodeWidth = 30;//结点的宽度
    this.nodeHeight = 100;//上层结点与下层结点的距离
    this.adjustHeight = 0;
    this.boxWidth = this.nodeWidth;//宽度
    this.treeHight = this.getTreeHeight(this.data.length);
    this.bottomCount = Math.pow(2,this.treeHight-1);
    //结点位于屏幕半当中的位置
    this.halfScrollWidth = parseInt(document.documentElement.scrollWidth/2)-this.nodeWidth/2;
    //结点根据高度算出根的位置,20写死了，算是空间
    this.nodeWidth = (this.nodeWidth*this.bottomCount+20*(this.bottomCount-1))/2;

    if(this.nodeWidth<this.halfScrollWidth){
      this.nodeWidth = this.halfScrollWidth;
    }

    this.leftOffsetDefault = 180;//初始化两个结点的间距
    this.scaleWidth = 42;
    this.correctWidth = 10;

    this.errCode = 0;
    this.errMsg = "";
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
  //分配副数据
  setSupportData(data){
    this.supportData = data;
  }
  //检查数据
  checkData(data){
    if(data.length<=0){
      this.setErr(1002,"缺少足够的数据。")
      return false;
    }
    if(data.length>30){
      this.setErr(1002,"数据过多，只允许30个结点。");
      return false;
    }
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

  //顺序二叉树
  createBiTree(offset)  {

    if(offset > this.data.length){
      return null;
    }
    var data = this.getData(offset-1);
    if(data == "#")return null;

    var nodeChild = this.initNode();
    nodeChild.index = offset-1;
    nodeChild.data = data;
    //console.log(nodeChild.index+"   "+nodeChild.data);
    nodeChild.lchild = this.createBiTree(2*offset);
    nodeChild.rchild = this.createBiTree(2*offset+1);
    return nodeChild;
  }

  draw(){
    this.canvas.draw(this.queue);
  }

  showBiTree(node,left,top,parentInfo){

    if(node == null)return;


    //再让下面的生成（下面的已经完成了）试试加到trigger里面
    var e = this.createEvent("create",node.data,"tree_"+node.index,this.delayTime*this.delayTimeOffset,"div","box",left,top,null);
    this.delayTimeOffset++;
    if(parentInfo != null){
      e.canvas["isDrawLine"] = 1;
      e.canvas["toX"] = parentInfo.offsetX;
      e.canvas["toY"] = parentInfo.offsetY;
    }

    this.queue.push(e);

    //var parentDiv = this.canvas.webDiv(node.data,left,top,parentDiv);
    /*
    这一段其实也没太多的意义，是为了修正树越向下显示异常所以越向下左右
    结点的距离就越缩小。
     */
    var leftOffset = this.leftOffsetDefault;
    if(top>this.nodeHeight){
      var offset = (top/this.nodeHeight)*this.scaleWidth;
      leftOffset = leftOffset+Math.pow(top/this.nodeHeight,2)-this.correctWidth;
    }else{
      var offset = 0;
    }
    top+=this.nodeHeight;
    this.showBiTree(node.lchild,left-leftOffset+offset,top,e);
    this.showBiTree(node.rchild,left+leftOffset-offset,top,e);
    //this.showBiTree(node.lchild,left-leftOffset+offset,top,parentDiv);
    //this.showBiTree(node.rchild,left+leftOffset-offset,top,parentDiv);
  }

  orderTraversel(node,type){

    this.delayTimeOffset = 0;
    if(type == "in"){
      this.inOrderTraverse1(node);
    }else if(type == "post"){
      this.postOrderTraverse1(node);
    }else{  //默认用前序
      this.preOrderTraverse1(node);
    }
    this.getQueueFactory().run();

  }
  //前序
  preOrderTraverse1(node){

    if (node != null) {
      var e = this.createEvent("force",node.data,"tree_"+node.index,this.delayTime*this.delayTimeOffset,"div","box",0,0,null);
      this.delayTimeOffset++;
      this.queue.push(e);
      this.preOrderTraverse1(node.lchild);
      this.preOrderTraverse1(node.rchild);
    }
  }
  //中序
  inOrderTraverse1(node){

    if (node != null) {
      this.inOrderTraverse1(node.lchild);
      var e = this.createEvent("force",node.data,"tree_"+node.index,this.delayTime*this.delayTimeOffset,"div","box",0,0,null);
      this.delayTimeOffset++;
      this.queue.push(e);
      this.inOrderTraverse1(node.rchild);
    }
  }
  //后序
  postOrderTraverse1(node){

    if (node != null) {
      this.postOrderTraverse1(node.lchild);
      this.postOrderTraverse1(node.rchild);
      var e = this.createEvent("force",node.data,"tree_"+node.index,this.delayTime*this.delayTimeOffset,"div","box",0,0,null);
      this.delayTimeOffset++;
      this.queue.push(e);
    }
  }

  getData(offset){
    return this.data[offset];
  }

  initNode(){
    return {
      index:0,//加一个坐标，方便遍历的时候去查
      lchild: {},
      rchild: {},
      data: ""
    };
  }

  //求解二叉树的高度
  getTreeHeight(allNum){
    var i = 1;
    var height = 0;
    while (allNum>0){
      allNum = allNum - i;
      i = i*2;
      height++;
    }
    return height;
  }

  showBiTreeV2(node,left,top,parentInfo){

    if(node == null)return;

    //先把列表中的同样的按钮挪掉

    for(var i = 0;i<this.data.length;i++){

      if(node.data == this.data[i]){
        //消失
        var e = this.createEvent("vanish",node.data,"mainTree_"+i,this.delayTime*this.delayTimeOffset,null,null,0,0,null);
        this.queue.push(e);
      }
    }

    for(var i = 0;i<this.supportData.length;i++){
      if(node.data == this.supportData[i]){
        //消失
        var e = this.createEvent("vanish",node.data,"supportTree_"+i,this.delayTime*this.delayTimeOffset,null,null,0,0,null);
        this.queue.push(e);

        //再让下面的生成（下面的已经完成了）试试加到trigger里面
        var trigger = this.createEvent("create",node.data,"tree_"+node.index,this.delayTime*this.delayTimeOffset+this.delayTime,"div","box",left,top,null);

        if(parentInfo != null){
          trigger.canvas["isDrawLine"] = 1;
          trigger.canvas["toX"] = parentInfo.offsetX;
          trigger.canvas["toY"] = parentInfo.offsetY;
        }

        e.trigger.push(trigger);
      }
    }
    this.delayTimeOffset++;

    /*
    这一段其实也没太多的意义，是为了修正树越向下显示异常所以越向下左右
    结点的距离就越缩小。
     */
    var leftOffset = this.leftOffsetDefault;
    if(top>this.nodeHeight+this.adjustHeight){
      var offset = (top/(this.nodeHeight+this.adjustHeight))*this.scaleWidth;
      leftOffset = leftOffset+Math.pow(top/(this.nodeHeight+this.adjustHeight),2)-this.correctWidth;
    }else{
      var offset = 0;
    }
    top+=this.nodeHeight;
    this.showBiTreeV2(node.lchild,left-leftOffset+offset,top,trigger);
    this.showBiTreeV2(node.rchild,left+leftOffset-offset,top,trigger);

  }

  makeMainList(offsetX,offsetY){
    var container = document.getElementById("mainTreeList");
    //配置应该放到外面一层吧，先不管了
    for(var i=0;i<this.data.length;i++){
      //加入队列
      var e = this.createEvent("create",this.data[i],"mainTree_"+i,0,"div","box",offsetX,offsetY,container);
      this.getQueueFactory().push(e);
      offsetX += this.boxWidth+this.correctWidth;
    }
  }

  makeSuupportList(offsetX,offsetY){
    //配置应该放到外面一层吧，先不管了
    var container = document.getElementById("supportTreeList");
    for(var i=0;i<this.supportData.length;i++){
      //加入队列
      var e = this.createEvent("create",this.supportData[i],"supportTree_"+i,0,"div","box",offsetX,offsetY,container);
      this.getQueueFactory().push(e);
      offsetX += this.boxWidth+this.correctWidth;
    }
  }

  createEvent (type,value,id,delayTime,tag,css,offsetX,offsetY,container) {
    var event = new EventFactory();
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
  handlePreIn(){

    var node = this.binaryTreeFromPreIn(0,0,this.data.length);
    this.adjustHeight = 100;
    this.getQueueFactory().run();
    this.showBiTreeV2(node,this.nodeWidth,this.nodeHeight+this.adjustHeight,null);
  }

  binaryTreeFromPreIn(index,sIndex,length){

    if(length == 0){
      return null;
    }

    var node = this.initNode();
    node.data = this.data[index]; //确认根结点
    node.index = index;
    node.lchild = null;
    node.rchild = null;

    //分割中序
    var rootIndex;
    for(rootIndex = 0;rootIndex<length;rootIndex++){
      if(this.supportData[sIndex+rootIndex] == this.data[index])break;
    }
    node.lchild = this.binaryTreeFromPreIn(index+1,sIndex,rootIndex);
    node.rchild = this.binaryTreeFromPreIn(index+rootIndex+1,sIndex+rootIndex+1,length-rootIndex-1);

    return node;
  }

  binaryTreeFromInPost(index,sIndex,length){

    if(length == 0){
      return null;
    }

    var node = this.initNode();
    node.data = this.supportData[sIndex+length-1]; //确认根结点
    node.index = index;
    node.lchild = null;
    node.rchild = null;

    //分割中序
    var rootIndex;
    for(rootIndex = 0;rootIndex<length;rootIndex++){
      if(this.data[index+rootIndex] == this.supportData[sIndex+length-1])break;
    }

    node.lchild = this.binaryTreeFromInPost(index,sIndex,rootIndex);
    node.rchild = this.binaryTreeFromInPost(index+rootIndex+1,sIndex+rootIndex,length-rootIndex-1);

    return node;
  }

  handleInPost(){
    var node = this.binaryTreeFromInPost(0,0,this.data.length);
    this.adjustHeight = 100;
    this.getQueueFactory().run();
    this.showBiTreeV2(node,this.nodeWidth,this.nodeHeight+this.adjustHeight,null);
  }

  //返回队列实例
  getQueueFactory(){
    return this.queue;
  }
  //返回画图实例
  getCanvasFactory(){
    return this.canvas;
  }

}

function BiTreefactory(data) {
  return new BiTree(data);
}
export {
  BiTreefactory
}
