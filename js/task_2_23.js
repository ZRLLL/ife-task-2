var $ = function(el){return document.querySelector(el);};
(function(){
	var tree = new treeLoopThrough(),
		dfsBtn = $('#dfs'),
		bfsBtn = $('#bfs'),
		root = $('#a');
	EventUtil.addHandler('click', dfsBtn, function(){
		tree.dfsSort(root);
		tree.paintColor();
	});
	EventUtil.addHandler('click', bfsBtn, function(){
		tree.bfsSort(root);
		tree.paintColor();
	});
})();
function treeLoopThrough(){
	this.stack = [];
	this.isLoop = false;
}
treeLoopThrough.prototype.dfsSort = function(node){
	this.stack.push(node);
	if(node.children.length>0){
		for(var i = 0;i < node.children.length;i++){
			this.stack.push(node.children[i]);
			this.dfsSort(node.children[i]);
		}
	}
}
treeLoopThrough.prototype.bfsSort = function(node){
	var queue = [];
	queue.push(node);
	var temp;
	while(queue.length>0){
		temp = queue.pop(); 
		this.stack.push(temp);
		for (var i = 0; i < temp.children.length; i++) {
			queue.unshift(temp.children[i]);
		}
	}
}
 
treeLoopThrough.prototype.paintColor = function(){
	var stack = this.stack,
	 	 time  = $('#time').value,
		 index = 0,
		 timer;
	this.stack = [];
	if(!this.isLoop){
	 	stack[index].style.background = 'red';
		timer = setInterval(function(){
		 	if(index < stack.length - 1){
		 		index++;
		 		stack[index-1].style.background = '#ffffff';
		 		stack[index].style.background = 'red';
		 	}else{
		 		stack[index].style.background = '#ffffff';
		 		clearInterval(timer);
		 		this.isLoop = true;
		 	}
		},time);
	}
}
