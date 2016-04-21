//获取结点方法
var $ = function(el){return document.querySelector(el)};
//存储数据数组
var house = [];
//处理数组的方法 插入 删除
var houseHandle = {
	leftIn : function(data){
		house.unshift(data); 
	},
	rightIn : function(data){
		house.push(data);
	},
	leftOut : function(data){
		house.shift();
	},
	rightOut : function(data){
		house.pop();
	},
	clickOut : function(index){
		house.splice(index,1);
	}
};
//对点击事件的响应
var controller = {
	btnclick : function(event){
		var event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		switch(target.id){
			case 'left-in':
				if(testValue()){
					houseHandle.leftIn($('#in').value);
					$('#in').value = '';
				}
				render(house,$('#val-list'));
			break;
			case 'right-in':
				if(testValue()){
					houseHandle.rightIn($('#in').value);
					$('#in').value = '';
				}
				render(house,$('#val-list'));
			break;
			case 'left-out':
				houseHandle.leftOut();
				render(house,$('#val-list'));
			break;
			case 'right-out':
 				houseHandle.rightOut();
				render(house,$('#val-list'));
			break;
			case 'sort':
				var i = 0,
					j = 1;
//					var i = 0,
//					j = house.length-1;
				// var i = 0;
				// var	j = i+1;
				var	len = house.length;
				var timer = setInterval(run,10);
				var	temp = i;
				function run(){
					if(i<len){
						if(j<len){
							if(house[j]<house[i]){
								swap(house,i,j);
								render(house,$('#val-list'));								
							}
							j++;
						}else{
							i++;
							j=i+1;
						}
					}else{
						clearInterval(timer);return;
					}
				}
				//冒泡
				function run1(){
					if(i < house.length-1){
						if(j > i){
							if(house[j] < house[j-1]){
								swap(house,j,j-1);
								render(house,$('#val-list'));	
							}
							j--;
						}else{
							i++;
							j = house.length-1;
						}
					}else{
						clearInterval(timer);return;
					}
				}
			break;
			case 'random':
				randomHouse();
				render(house,$('#val-list'));
			break;
		}
	},
	itemClick : function(){
		var event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		var index = getIndex(target,$('#val-list').childNodes);
		houseHandle.clickOut(index);
		render(house,$('#val-list'));
	},
};
//检测输入
function testValue(){
	var input = $('#in').value;
	if(input<10 || input>100){
		alert('输入应该大10小于100');
	}else{
		return /^\d+$/.test($('#in').value)				
	}
}
//排序时数组的交换动作
function swap(arr,i,j){
	var temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}
//生成随机的数组
function randomHouse(){
	for(var i = 0;i < 30;i++){
		house[i] = Math.floor(Math.random()*90+10);
	}
}
//获取被点击的item在数组中的位置
function getIndex(node,nodeList){
	var result;
	for(var i = 0;i<nodeList.length;i++){
		if(nodeList[i] == node){
			result = i;
		}
	}
	return result;
}
//渲染结点
function render(props,node){
	
	node.innerHTML = itemList(props);
	console.log(itemList(props));
}
//构建结点内容
function item(prop){
	return '<li class="item" style="height:'+prop+'px"></li>';
}
function itemList(props){

	return props.map(item).join('');
}

EventUtil.addHandler('click',$('#btns'),controller.btnclick);
EventUtil.addHandler('click',$('#val-list'),controller.itemClick);