 var spaceShipManager = {
	 spaceShipList : [],
	 createSpaceship : function(message){
		var tag = true;
		for(var i = 0;i < spaceShipManager.spaceShipList.length;i++){
			if(spaceShipManager.spaceShipList[i]['_id'] == message.id){
				var p = document.createElement('p');
 				p.innerText = '轨道'+shipId+'中飞船已存在';
 				p.style.color = 'red';
 				$('#console').appendChild(p);
 				$('#console').scrollTop = $('#console').scrollHeight;
				tag = false;
				return;
			}
		}
		if(tag){
			var shipId = spaceShipManager.spaceShipList.push(new spaceShip(message));
			console.log(spaceShipManager.spaceShipList);
			interface.render();
		}
 	},
 	sendCommand : function(message){
		if(message.command == 'create'){
			spaceShipManager.createSpaceship(message);
		}else{
			for(var i = 0;i < spaceShipManager.spaceShipList.length;i++){
				if(spaceShipManager.spaceShipList[i]['_destroyed'] == false){
					var mes = spaceShipManager.spaceShipList[i].telegraph.adapter(message);
					spaceShipManager.spaceShipList[i].telegraph.receiveCommand(mes);
				}
			}
		}
	}
}; 