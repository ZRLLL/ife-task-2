;(function(){
	var colorBlock = function(){
		this.ele =  document.getElementById('block');
		this._left = 1;
		this._top = 1;
		this._rotate = 0;
	}
	colorBlock.prototype = {
		//旋转方向  更改方块方向属性值
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
			
		},
		/*
		@param : turnDirection 旋转方向  stepDirection 平移方向
		*/ 
		move : function(turnDirection,stepDirection){
			//更改方向
			if(typeof turnDirection === "string"){
				switch(turnDirection){
					case 'left':
						this._rotate = -90;
					break;
					case 'right':
						this._rotate = 90;
					break;
					case 'top':
						this._rotate = 0;
					break;
					case 'bottom':
						this._rotate = 180;
					break;
				}
			}
			if(typeof stepDirection === "string"){
				console.log(stepDirection);
				switch(stepDirection){
					case 'left':
						this._left = this._left>1?this._left-=1:this._left;
					break;
					case 'right':
						this._left = this._left<10?this._left+=1:this._left;
					break;
					case 'top':
						this._top = this._top>1?this._top -=1:this._top;
					break;
					case 'bottom':
						this._top = this._top<10?this._top +=1:this._top;
					break;
				}
			}
		}
	}
	var controller = {
		//初始化 渲染方块
		init : function(){
			// block.init();
			if(block.ele === null){
				block.ele = document.createElement('div');
				block.ele.className = 'colorBlock';
				document.getElementsByTagName('body')[0].appendChild(block.ele);
			}
			block.ele.style.top = block._top*50+'px';
			block.ele.style.left = block._left*50+'px';
			block.ele.style.transform = "rotate("+block._rotate+"deg)";
		},
		//向前走 方向不变
		go : function(){
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
			var arr = ['top','right','bottom','left'];
			block.move(0,arr[direction]);
			this.init();
		},
		//分发指令
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
				case 'TRA LEF':
					block.move(0,'left');
					break;
				case 'TRA RIG':
					block.move(0,'right');
					break;
				case 'TRA TOP':
					block.move(0,'top');
					break;
				case 'TRA BOT':
					block.move(0,'bottom');
					break;	
				case 'MOV LEF':
					block.move('left','left');
					break;
				case 'MOV RIG':
					block.move('right','right');
					break;
				case 'MOV TOP':
					block.move('top','top');
					break;
				case 'MOV BOT':
					block.move('bottom','bottom');
					break;
			}
			this.init();
		}
	}
	var block = new colorBlock();
	window.controller = controller;
})();
