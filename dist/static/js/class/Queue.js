//队列
class Queue {

  constructor(machine){
    this.mq = new Array();
    this.machine = machine;
    this.delayTimeCustomExt = 0;
  }

  addDelayTime(delayTimeCustomExt){
    this.delayTimeCustomExt = parseInt(delayTimeCustomExt);
  }
  push(data){
    this.mq.push(data);
  }

  clear(){
    this.mq = new Array();
  }

  run(){

    var i,j;

    //设置计数
    this.machine.setCounter(this.mq.length);

    this.mq.reverse();
    var data;
    i = 1;
    while (this.mq.length >0){
      data = this.mq.pop();
      setTimeout(this.machine.handle,data.delayTime+this.delayTimeCustomExt*i,data,this.machine);
      i++;
      if(data.trigger.length>0){
        //@修正：有个小bug,trigger的没加到计数里面去
        this.machine.setCounter(data.trigger.length);
        for(j in data.trigger){
          setTimeout(this.machine.handle,data.trigger[j].delayTime+this.delayTimeCustomExt*i,data.trigger[j],this.machine);
          i++;
        }
      }
    }
  }

}
/*
function QueueFactory(machine) {
  return new Queue(machine);
}*/

export {
  Queue
}
