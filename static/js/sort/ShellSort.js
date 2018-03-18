import {Sort} from '../sort/Sort'

class ShellSort extends Sort{

  constructor() {
    //继承
    super();
    this.dfBlockNum = 3;
  }
  setDfBlockNum(dfBlockNum){
    this.dfBlockNum = dfBlockNum;
  }
  sort(){
    var n,h;
    var i,j;
    //配置变量，控制到底分成几块进行排序查找，可以更改
    this.dfBlockNum = 3;//5
    h = 1;
    n = this.data.length;

    while (h < n/this.dfBlockNum){
      h = this.dfBlockNum*h+1;
    }

    var dtime = this.delayTime+= this.delayTimeStart;
    while (h>=1){
      for (i = h;i<n;i++){
        for(j = i;j>=h && this.less(this.data[j],this.data[j-h]);j-=h){

          dtime = this.exch(j,j-h,dtime);
        }
      }
      h = parseInt(h/this.dfBlockNum);
    }

  }
}

export {
  ShellSort
}
