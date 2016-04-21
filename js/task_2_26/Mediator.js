 var Mediator = {
	sendCommand : function(message){
		function adapter(message){
			var command;
			switch(message.command){
				case 'start':
				    command = parseInt('111'+message.id+'0001');
				break;
				case 'stop':
				    command = parseInt('111'+message.id+'0010');
				break;
				case 'destroy':
				    command = parseInt('111'+message.id+'1100');
				break;
				case 'create':
				    command = message;
				break;
			}
			return command;
		}
		var timer = setInterval(function(){
	 			if(Math.random()<0.1){
	 				var p = document.createElement('p');
	 				p.innerText = '向轨道'+message.id+'发送'+message.command+'信息传输失败，已丢包,正在重试';
	 				p.style.color = 'red';
	 				$('#console').appendChild(p);
	 				$('#console').scrollTop = $('#console').scrollHeight;
	 			}else{
	 				clearInterval(timer);
	 				var p = document.createElement('p');
	 				p.innerText = '向轨道'+message.id+'发送'+message.command+'信息传输成功';
	 				p.style.color = 'green';
	 				$('#console').appendChild(p);
	 				$('#console').scrollTop = $('#console').scrollHeight;
	 				//翻译指令到二进制形式
	 				var command = adapter(message);
	 				spaceShipManager.sendCommand(command);
	 			}
	 		},300);
		},
} 