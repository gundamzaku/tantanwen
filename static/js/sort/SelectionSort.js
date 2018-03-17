import {Sort} from '../sort/Sort'

class SelectionSort extends Sort{

  constructor() {
    //继承
    super();
  }

  sort(){
    var n;
    var i,j;
    var min;
    n = this.data.length;

    var dtime = this.delayTime+= this.delayTimeStart;
    for(i=0;i<n;i++) {
      min = i;
      for(j=i+1;j<n;j++) {
        if(this.less(this.data[j],this.data[min]) == true) {
          min = j;
        }
      }
      dtime = this.exch(i,min,dtime);
    }
  }
}

export {
  SelectionSort
}
