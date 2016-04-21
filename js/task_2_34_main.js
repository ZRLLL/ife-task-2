controller.init();
document.getElementById('go').onclick = function(){
	controller.go();
}
document.getElementById('exec').onclick = function(){
	if(document.getElementById('order').value == ''){
		alert('请输入指令');
	}else{
		var order = document.getElementById('order').value
		var str = 'TUN RIG TUN LEF TUN BAC TRA LEF TRA RIG TRA TOP TRA BOT MOV LEF MOV TOP MOV RIG MOV BOT';
		var re = new RegExp(order, 'g');
		if(!re.test(str)||order.length!==7){
			alert('请输入正确的指令');
		}else{
			controller.turn(order);
		}
	}
}
