function getStyle(ele, attr){
		// ele 表示需要获取属性的对象
		// attr 属性名
	if(window.getComputedStyle){
		return window.getComputedStyle(ele, null)[attr];
		}else{
			return ele.currentStyle[attr];
		}
}
function Move(ele, attr, target, speed, callback){
	// ele 对象
	// attr 需要改变的属性
	// target 表示移动到什么位置
	// speed 改变属性的速度
	// callback 回调函数，move结束之后执行的fun
	var time = 30;
	// 获取该对象的当前的位置
	var curr_position = parseInt(getStyle(ele, attr));
	// console.log(curr_position);
	if(curr_position > target){
		// 当前位置比目标位置大
		speed = -speed;
	}
	clearInterval(ele.timer);
	ele.timer = setInterval(function(){
		var new_postion = parseInt(getStyle(ele, attr));
		// 改变以后的位置
		var old_positon = new_postion + speed;

		ele.style[attr] = old_positon + 'px';

		if((old_positon > target && speed > 0) || (old_positon < target && speed < 0)){
			ele.style[attr] = target + 'px';
			clearInterval(ele.timer);
			callback();
		}
	}, time);
}