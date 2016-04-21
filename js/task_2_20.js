var state = [];
		var $ = function(el){return document.querySelector(el)}; 
		function getValues(){
			return $('#in').value.split(/[^a-zA-Z0-9\u4e00-\u9fa5]+/).filter(function(d){return d!=''});
		}
		function btnClick(event){
			var event = EventUtil.getEvent(event);
			var target = EventUtil.getTarget(event);
			switch(target.id){
				case 'left-in':
					var arr = getValues();
					for(var i = 0;i<arr.length;i++){
						state.unshift(arr[i]);
					}
					render(state,$('#val-list'));
					$('#in').value = '';
				break;
				case 'right-in':
					var arr = getValues();
					for(var i = 0;i<arr.length;i++){
						state.push(arr[i]);
					}
					render(state,$('#val-list'));
					$('#in').value = '';
				break;
				case 'left-out':
					if(state.length>0){
						state.shift();
	 					render(state,$('#val-list'));
					}else{
						alert('队列为空');
					}
				break;
				case 'right-out':
					if(state.length>0){
						state.pop();
						render(state,$('#val-list'));
					}else{
						alert('队列为空');
					}
				break;
				case 'search-btn':
					var searchContent = $('#search-content').value;
					render(state,$('#val-list'),searchContent);
				break;
			}
		}
		EventUtil.addHandler('click',$('#btns'),btnClick);
		
		function specifyNodeOut(event){
			var event = EventUtil.getEvent(event);
			var target = EventUtil.getTarget(event);
			$('#val-list').removeChild(target);
		}
		//渲染结点
		function render(props,node,searchContent){
			node.innerHTML = props.map(function(nodeContent){
				if(searchContent != null){
					nodeContent = nodeContent.replace(new RegExp(searchContent,'g'),"<span class = 'search'>"+searchContent+"</span>");
				}
				return "<li>"+nodeContent+"</li>";
			}).join("");
		}
		EventUtil.addHandler('click',$('#val-list'),specifyNodeOut);