var STOP = 0;
var START = 1;
var	energySystem =[[3,0.5],[5,0.7],[8,0.9]],
	solarSystem = [0.2,0.3,0.4];
//飞船类
function spaceShip(message){
	//自爆系统
	var obj = { 
		_status : STOP,
		_energy : 100,
		_destroyed : false,
		_rate : energySystem[message.energySys][0],
		_consume : energySystem[message.energySys][1],
		_solarPower : solarSystem[message.solarSys],
		_angle : 0,
		_id : message.id,
		//动力系统
		drive : {
			//
			start : function(){
				if(obj._energy > 0){
					obj._status = START;
				}
			},
			stop : function(){
				obj._status = STOP;
			},
			_fly : function(){
				if(obj._status == START){
					obj._angle += obj._rate;
				}
				obj._angle = obj._angle%360;
			}
		},
		//能源系统
		energy : {
			add : function(num){
				obj._energy +=num; 
				if(obj._energy > 100){
					obj._energy = 100; 
				}
			},
			consume : function(num){
				obj._energy -=num; 
				if(obj._energy < 0){
					obj._energy = 0;
					obj._status = STOP; 
				}
			},
			get : function(){
				return obj._energy;
			}
		},
		destroy : {
			destroy : function destroy(){
				obj._destroyed = true;
			}
		},
		//信号接收处理系统
		telegraph : {
			adapter : function(message){
				var id = parseInt(message.toString().substr(3,1));
				var command = message.toString().substr(4);
				var mes = {};
				if(id != obj._id){
					return mes;
				}
				switch(command){
					case '0001':
						mes.command = 'start';
						break;
					case '0010':
						mes.command = 'stop';
						break;
					//自爆
					case '1100':
						mes.command = 'destroy';
						break;
				}
				mes.id = id;
				console.log(mes);
				return mes;
			},
			receiveCommand : function(message){
				if(message.id != obj._id){
					return;
				}
				switch(message.command){
					case 'start':
						obj.drive.start();
						break;
					case 'stop':
						obj.drive.stop();
						break;
					//自爆
					case 'destroy':
						obj.destroy.destroy();
						interface.render();
						break;
				}
			}
		}
	}
	return obj;
}