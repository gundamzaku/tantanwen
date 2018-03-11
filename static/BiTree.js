import {CanvasFactory} from '../static/Canvas.js';

class BiTree {

  constructor(){

    this.data = "";
    //定义一个结构体，二叉树的
    this.node = this.initNode();
    this.canvas = new CanvasFactory("treeCanvas");

    //要初始化一堆东西
    this.nodeWidth = 30;//结点的宽度
    this.nodeHeight = 100;//上层结点与下层结点的距离

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

    this.queue = Array();
  }

  setData(data){
    this.data = data;
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

    var currentInfo = {
      data:node.data,
      index:node.index,
      left:left,
      top:top,
      parentLeft:0,
      parentTop:0
    }

    if(parentInfo != null){
      currentInfo.parentLeft = parentInfo.left;
      currentInfo.parentTop = parentInfo.top;
    }

    this.queue.push(currentInfo);

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
    this.showBiTree(node.lchild,left-leftOffset+offset,top,currentInfo);
    this.showBiTree(node.rchild,left+leftOffset-offset,top,currentInfo);
    //this.showBiTree(node.lchild,left-leftOffset+offset,top,parentDiv);
    //this.showBiTree(node.rchild,left+leftOffset-offset,top,parentDiv);
  }

  orderTraversel(node,type){

    this.queue = new Array();//重置

    if(type == "in"){
      this.inOrderTraverse1(node);
    }else if(type == "post"){
      this.postOrderTraverse1(node);
    }else{  //默认用前序
      this.preOrderTraverse1(node);
    }


    this.canvas.forceNode(this.queue);
  }
  //前序
  preOrderTraverse1(node){

    if (node != null) {
      //this.canvas.forceNode(node.index);
      this.queue.push(node.index);
      this.preOrderTraverse1(node.lchild);
      this.preOrderTraverse1(node.rchild);
    }
  }
  //中序
  inOrderTraverse1(node){

    if (node != null) {
      //this.canvas.forceNode(node.index);
      this.inOrderTraverse1(node.lchild);
      console.log(node.index);
      this.queue.push(node.index);
      this.inOrderTraverse1(node.rchild);
    }
  }
  //后序
  postOrderTraverse1(node){

    if (node != null) {
      //this.canvas.forceNode(node.index);
      this.postOrderTraverse1(node.lchild);
      this.postOrderTraverse1(node.rchild);
      this.queue.push(node.index);
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

}

function BiTreefactory(data) {
  return new BiTree(data);
}
export {
  BiTreefactory
}
