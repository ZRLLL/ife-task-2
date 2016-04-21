var interface = {
	render : function(){
		var frag = document.createDocumentFragment();
		for (var i = 0; i < spaceShipManager.spaceShipList.length; i++){
			//飞船状态为true 则飞船存在 需要渲染
			if(!spaceShipManager.spaceShipList[i]['_destroyed']){
				var container = document.createElement('div');
				container.id = 'spaceship'+spaceShipManager.spaceShipList[i]['_id'];
				container.className = 'spaceship'+spaceShipManager.spaceShipList[i]['_id']+' spaceship';
				container.style.transform = 'rotate('+spaceShipManager.spaceShipList[i]['_angle']+'deg)';
				var son = document.createElement('div');
				son.className = 'text';
				son.innerText = Math.floor(spaceShipManager.spaceShipList[i]['_energy']);
				container.appendChild(son);
				frag.appendChild(container);
			}else{
				spaceShipManager.spaceShipList.splice(i,1);
			}
		} 
		interface.empty($('#ship_container'));
		$('#ship_container').appendChild(frag);
	},
	empty : function(node){
		while(node.hasChildNodes()){
			node.removeChild(node.firstChild);
		}
	}
};