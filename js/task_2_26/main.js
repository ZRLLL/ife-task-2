 //面板按钮点击事件函数及绑定
(function(){
	var buttonClick = function(event){
		var event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		var shipId = target.parentNode.dataset.id;
		var energySys = target.parentNode.childNodes[3].selectedIndex;
		var solarSys = target.parentNode.childNodes[6].selectedIndex;
		switch(target.dataset.type){
			case 'create':
				var message = {
					id : shipId,
					command : 'create',
					energySys : energySys,
					solarSys : solarSys 
				};
				commander.sendCommand(message);
			break;
			case 'start':
				var message = {
					id : shipId,
					command : 'start',
				};
				commander.sendCommand(message);
			break;
			case 'stop':
				var message = {
					id : shipId,
					command : 'stop',
				};
				commander.sendCommand(message);
			break;
			case 'destroy':
				var message = {
					id : shipId,
					command : 'destroy',
				};
				commander.sendCommand(message);
			break;
		}
	}
	EventUtil.addHandler('click', $('#control_panel'), buttonClick);
})();

(function(){
	var control = $('#control_panel');
	var head  = $('#head');
	var draggingControl = false;
    var start = [0, 0];
    //position:fixed  面板的位置
    var position = [control.style.left.substr(0,control.style.left.length-2)-0,
    				control.style.right.substr(0,control.style.right.length-2)-0];
    EventUtil.addHandler('mousedown', head, function(event){
    	var event = EventUtil.getEvent(event);
    	start[0] = event.clientX - position[0];
    	start[1] = event.clientY - position[1];
    	draggingControl = true;
    });
    addEventListener('mouseup', function(event){
    	draggingControl = false;
    });
    document.body.addEventListener("mousemove",function(event){
    	if(draggingControl){
    		position[0] = event.clientX - start[0];
    		position[1] = event.clientY - start[1];
    		if(position[0] > window.innerWidth - control.offsetWidth){
    			position[0] = window.innerWidth - control.offsetWidth;
    		}
    		if(position[0]<0){
    			position[0] = 0;
    		}
    		if(position[1] > window.innerHeight - control.offsetHeight) {
                position[1] = window.innerHeight - control.offsetHeight;
            }
            if(position[1]<0){
    			position[1] = 0;
    		}
            control.style.left = position[0] + "px";
            control.style.top = position[1] + "px";
    	}
    });
})();
(function(){
	setInterval(function(){
		for(var i = 0; i < spaceShipManager.spaceShipList.length; i++) {
			if(spaceShipManager.spaceShipList[i]['_status'] == 1){
				spaceShipManager.spaceShipList[i].drive._fly();
				spaceShipManager.spaceShipList[i].energy.add(spaceShipManager.spaceShipList[i]['_solarPower']);
				spaceShipManager.spaceShipList[i].energy.consume(spaceShipManager.spaceShipList[i]['_consume']);
			}else{
				spaceShipManager.spaceShipList[i].energy.add(spaceShipManager.spaceShipList[i]['_solarPower']);
			}
		}
		interface.render();
	},100);
})();