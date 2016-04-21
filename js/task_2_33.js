;(function(){
	var colorBlock = function(){
		this.ele =  document.getElementById('block');
		this._left = 1;
		this._top = 1;
		this._rotate = 0;
	}
	colorBlock.prototype = {
		go : function(direction){
			switch(direction){
				case 3:
					this._left = this._left>1?this._left-=1:this._left;
				break;
				case 1:
					this._left = this._left<10?this._left +=1:this._left;
				break;
				case 0:
					this._top = this._top>1?this._top -=1:this._top;
				break;
				case 2:
					this._top = this._top<10?this._top +=1:this._top;
				break;
			}
		},
		turnLeft : function(){
			this._rotate -= 90;
		},
		turnRight : function(){
			this._rotate += 90;
		},
		turnBack : function(){
			this._rotate += 180;
		},
		init : function(){
			if(this.ele === null){
				this.ele = document.createElement('div');
				this.ele.className = 'colorBlock';
				document.getElementsByTagName('body')[0].appendChild(this.ele);
			}
			this.ele.style.top = this._top*50+'px';
			this.ele.style.left = this._left*50+'px';
			this.ele.style.transform = "rotate("+this._rotate+"deg)";
		},
	}
	var controller = {
		mov : function(){
			var direction;
			if(block._rotate<0){
				direction = (Math.abs(block._rotate)/90)%4;
				if(direction == 1){
					direction = 3;
				}else if(direction == 3){
					direction = 1;
				}
			}else{
				direction = (block._rotate/90)%4;
			}
			block.go(direction);
			block.init();
		},
		init : function(){
			block.init();
		},
		turn : function(order){
			switch(order){
				case 'TUN RIG':
					block.turnRight();
					break;
				case 'TUN LEF':
					block.turnLeft();
					break;
				case 'TUN BAC':
					block.turnBack();
					break;
			}
			block.init();
		}
	}
	var block = new colorBlock();
	window.controller = controller;
})();
