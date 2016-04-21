var $ = function(el){return document.querySelector(el);};
(function(){
	var tree = new treeLoopThrough(),
		prevBtn = $('#prev'),
		inBtn = $('#in'),
		postBtn = $('#post'),
		root = $('#a');
	EventUtil.addHandler('click', prevBtn, function(){
		tree.preOrder(root);
		tree.paintColor();
	});
	EventUtil.addHandler('click', inBtn, function(){
		tree.inOrder(root);
		tree.paintColor();
	});
	EventUtil.addHandler('click', postBtn, function(){
		tree.postOrder(root);
		tree.paintColor();
	});
})();


function treeLoopThrough(){
	this.stack = [];
	this.isLoop = false;
}
treeLoopThrough.prototype.preOrder = function(node){
	this.stack.push(node);
	if(node.firstElementChild){
		this.preOrder(node.firstElementChild);
	}
	if(node.lastElementChild){
		this.preOrder(node.lastElementChild);
	}
}
treeLoopThrough.prototype.inOrder = function(node){
	if(node.firstElementChild){
		this.inOrder(node.firstElementChild);
	}
	this.stack.push(node);
	if(node.lastElementChild){
		this.inOrder(node.lastElementChild);
	}
}
treeLoopThrough.prototype.postOrder = function(node){
	if(node.firstElementChild){
		this.postOrder(node.firstElementChild);
	}
	if(node.lastElementChild){
		this.postOrder(node.lastElementChild);
	}
	this.stack.push(node);
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
		 		console.log(stack[index-1].getAttribute('id'));
		 	}else{
		 		stack[index].style.background = '#ffffff';
		 		clearInterval(timer);
		 		this.isLoop = true;
		 	}
		},time);
	}
}
 