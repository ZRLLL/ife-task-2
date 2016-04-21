var EventUtil = {
	addHandler : function(type,tar,hanler){
		if(document.addEventListener){
			tar.addEventListener(type,hanler,false);
		}else if(document.attachEvent){
			tar.attachEvent('on'+type,hanler);
		}else{
			tar['on'+type] = hanler;
		}
	},
	getEvent : function(event){
		return event ? event : window.event;
	},
	getTarget : function(event){
		return event.target||event.srcElement;
	},
	preventDefault : function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = true;
		}
	},
	stopPropagation : function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	}
};
var $ = function(el){return document.querySelector(el);};