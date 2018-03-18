import {Sort} from '../sort/Sort'

class InsertionSort extends Sort{

  constructor() {
    //继承
    super();
  }

  sort(){
    var n;
    var i,j;
    n = this.data.length;

    var dtime = this.delayTime+= this.delayTimeStart;
    for(i=0;i<n;i++) {
      for(j=i;j>0 && this.less(this.data[j],this.data[j-1]);j--) {
        dtime = this.exch(j,j-1,dtime);
      }
    }
  }
}

export {
  InsertionSort
}
