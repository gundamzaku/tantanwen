import {Sort} from '../sort/Sort'

class MergeSort extends Sort{

  constructor() {
    //继承
    super();
    this.aux = new Array();
  }

  merge(lo,mid,hi,dtime,layer){

    var i = lo;
    var j = mid+1;
    var ths = this;

    for(var k = lo;k<=hi;k++){
      this.aux[k] = this.sortNode[k];

    }

    var moveTo =  function(index,offset,from,dtime){

      //移动
      var e = ths.createEvent("move",from["value"],from["id"],dtime,"div",ths.getCanvasFactory().nodeClass,from["offsetX"],from["offsetY"],null);

      e.canvas["toX"] = ths.sortNode[index]["offsetX"];
      e.canvas["toY"] = ths.sortNode[index]["offsetY"];

      temp[from["index"]] = new Array();
      temp[from["index"]]["bindIndex"] = offset;
      temp[from["index"]]["offsetX"] = ths.sortNode[index]["offsetX"];
      temp[from["index"]]["offsetY"] = ths.sortNode[index]["offsetY"];
      ths.queue.push(e);

      dtime += 1000;
      return dtime;
    }

    var temp = new Array();

    for(var k = lo;k<=hi;k++){

      if(i>mid){
        dtime = moveTo(k,j,this.aux[j],dtime);
        this.sortNode[k] = this.aux[j];
        j++;
      }else if(j>hi){
        dtime = moveTo(k,i,this.aux[i],dtime)
        this.sortNode[k] = this.aux[i];
        i++;
      }else if(this.less(this.aux[j]["value"],this.aux[i]["value"])){
        dtime = moveTo(k,j,this.aux[j],dtime)
        this.sortNode[k] = this.aux[j];
        j++;
      }else{
        dtime = moveTo(k,i,this.aux[i],dtime)
        this.sortNode[k] = this.aux[i];
        i++;
      }
    }

    for(var i in this.sortNode){
      //更改坐标
      if(typeof temp[this.sortNode[i]["index"]] != "undefined"){
        this.sortNode[i]["offsetX"] = temp[this.sortNode[i]["index"]]["offsetX"];
        this.sortNode[i]["offsetY"] = temp[this.sortNode[i]["index"]]["offsetY"];
      }
    }

    return dtime;
  }

  sortInit(){

    //初始化时间
    var dtime = this.delayTime+= this.delayTimeStart;
    //从第一层开始
    //this.data不能传入，把sortNode传进去吧
    dtime = this.sort(0,this.data.length-1,dtime,1);

    for(var i in this.sortNode){
      this.data[i] = this.sortNode[i]["value"];
    }
  }

  sort(lo,hi,dtime,layer){

    if(hi <= lo){
      return false;
    }
    var mid = parseInt(lo+(hi-lo)/2);
    ++layer;
    dtime = this.sort(lo,mid,dtime,layer);
    dtime = dtime+this.delayTimeInterval;
    dtime = this.sort(mid+1,hi,dtime,layer);
    dtime = this.merge(lo,mid,hi,dtime,--layer);
    dtime = dtime+this.delayTimeInterval;
    return dtime;
  }

  min(x,y){
    if(x < y){
      return x;
    }
    return y;
  }
}

export {
  MergeSort
}
