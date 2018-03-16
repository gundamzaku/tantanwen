var Lib = {

  hasClass(ele, cls) {
    return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
  },

  //为指定的dom元素添加样式
  addClass(ele, cls) {
    if (!this.hasClass(ele, cls)) ele.className += " " + cls;
  },

  //为指定的dom元素添加样式
  addClassNoCheck(ele, cls) {
    ele.className += " " + cls;
  },

  //删除指定dom元素的样式
  removeClass(ele, cls) {
    if (this.hasClass(ele, cls)) {
      var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
      ele.className = ele.className.replace(reg, "");
    }
  },

  //如果存在(不存在)，就删除(添加)一个样式
  toggleClass(ele,cls){
    if(hasClass(ele,cls)){
      removeClass(ele, cls);
    }else{
      addClass(ele, cls);
    }
  },

  vanish(objId,target){

    var box = document.getElementById(objId);
    var speed = 1;
    var timer = null;
    var alpha = 100;

    clearInterval(timer);
    timer = setInterval(function(){
      if(target > alpha){
        speed = 2;
      }else{
        speed = -2;
      }
      if(alpha == target){
        clearInterval(timer);
      }else{
        alpha = alpha + speed;
        box.style.filter = 'alpha(opacity='+alpha+')';
        box.style.opacity = alpha/100;
        //console.log(box.style.opacity);
      }
    },30)
  }

}

export {
  Lib
}
