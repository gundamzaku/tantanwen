//队列
import {Lib} from "./Lib";

class Queue {

  constructor(machine){
    this.mq = new Array();
    this.running = new Array();
    this.machine = machine;
  }

  push(data){
    this.mq.push(data);
  }
  clear(){
    this.mq = new Array();
  }
  getPidList(){
    return this.running;
  }
  killAll(){
    for(var i in this.running){
      clearTimeout(this.running[i]);
    }
  }
  run(){

    var i,j;
    var pid;

    for(i in this.mq){
      //console.log(this.mq[i]);
      pid = setTimeout(this.machine.handle,this.mq[i].delayTime,this.mq[i],this.machine);
      this.running.push(pid);
      //this.machine.handle(this.mq[i]);
      if(this.mq[i].trigger.length>0){
        for(j in this.mq[i].trigger){
          pid = setTimeout(this.machine.handle,this.mq[i].trigger[j].delayTime,this.mq[i].trigger[j],this.machine);
          this.running.push(pid);
        }
      }
      delete this.mq[i];  //删除
    }
  }

}

function QueueFactory(machine) {
  return new Queue(machine);
}


export {
  QueueFactory
}
