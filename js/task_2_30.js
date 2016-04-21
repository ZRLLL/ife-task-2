 var handlers = (function(){
			return{
		 		checkName : function(name){
		 			if(name.length == 0){
		 				$('#pname').innerText = '名称不能为空';
		 				//^在方括号中使用，表示不接受该字符集
		 			}else if(/[^0-9a-zA-Z\u4e00-\u9fa5]/i.test(name)){
		 				$('#pname').innerText = '只能输入数字,字母和中文';
		 			}else{
		 				var len = 0;
		 				for(var i = 0; i<name.length;i++){
							charcode = name.charCodeAt(i);
							len += charcode<128&&charcode>0?1:2;
						}
						if(len<4 || len>16){
							$('#pname').innerText = '长度不符,应为4到16个字符';
						}else{
							$('#pname').innerText = '名称可用';
						}
		 			}
		 	    },
		 	    checkPass : function(pass){
		 			if(pass.length == 0){
		 				$('#ppass').innerText = '密码不能为空';
		 				//^在方括号中使用，表示不接受该字符集
		 			}else if(/[^0-9a-zA-Z]/i.test(pass)){
		 				$('#ppass').innerText = '只能输入数字,大小写字母';
		 			}else{
		 				var len = 0;
		 				for(var i = 0; i<pass.length;i++){
							charcode = pass.charCodeAt(i);
							len += charcode<128&&charcode>0?1:2;
						}
						if(len<4 || len>16){
							$('#ppass').innerText = '长度不符,应为4到16个字符';
						}else{
							$('#ppass').innerText = '密码可用';
						}
		 			}
		 	    },
		 	    confirmPass : function(pass){
		 			if(pass.length == 0){
		 				$('#pcpass').innerText = '密码不能为空';
		 				//^在方括号中使用，表示不接受该字符集
		 			}else if(/[^0-9a-zA-Z]/i.test(pass)){
		 				$('#pcpass').innerText = '只能输入数字,大小写字母';
		 			}else{
		 				var len = 0;
		 				for(var i = 0; i<pass.length;i++){
							charcode = pass.charCodeAt(i);
							len += charcode<128&&charcode>0?1:2;
						}
						if(len<4 || len>16){
							$('#pcpass').innerText = '长度不符,应为4到16个字符';
						}else{
							var password = $('#pass').value;
							if(pass == password){
								$('#pcpass').innerText = '密码可用';
							}else{
								$('#pcpass').innerText = '两次输入密码不符';
							}
							
						}
		 			}
		 	    },
		 	    checkEmail : function(email){
		 			if(email.length == 0){
		 				$('#pemail').innerText = '邮箱不能为空';
		 				//^在方括号中使用，表示不接受该字符集
		 			}else if(/^[\w]+@([0-9a-z]+\.)+[a-z0-9]{2,4}$/i.test(email)){
		 				$('#pemail').innerText = '邮箱格式正确';
		 			}else{
		 				 $('#pemail').innerText = '邮箱格式不正确';
		 			}
		 	    },
		 	    checkPhone : function(phone){
		 			if(phone.length == 0){
		 				$('#pphone').innerText = '手机不能为空';
		 				//^在方括号中使用，表示不接受该字符集
		 			}else if(/^[0-9]{11}$/i.test(phone)){
		 				$('#pphone').innerText = '手机格式正确';
		 			}else{
		 				 $('#pphone').innerText = '手机格式不正确';
		 			}
		 	    }
		 	}
		 })();

		 window.onload = function(){
		 	(function(){
		 		var name = $('#name'),
		 			pass = $('#pass'),
		 			cpass = $('#cpass'),
		 			email = $('#email'),
		 			phone = $('#phone'),
		 			submit = $('#submit');
		 		EventUtil.addHandler('focus', name, function(){
		 			$('#pname').innerText = '必填，长度为4-16个字符';
		 			$('#pname').style.color = 'gray';
		 		});
		 		EventUtil.addHandler('blur', name, function(){
		 			handlers.checkName(name.value);
		 			if($('#pname').innerText == '名称可用'){
		 				$('#pname').style.color = 'green';
		 			}else{
						$('#pname').style.color = 'red';
		 			}
		 		});
		 		EventUtil.addHandler('focus', pass, function(){
		 			$('#ppass').innerText = '必填，4-16位英文和数字';
		 			$('#ppass').style.color = 'gray';
		 		});
		 		EventUtil.addHandler('blur', pass, function(){
		 			 handlers.checkPass(pass.value);
		 			 if($('#ppass').innerText == '密码可用'){
		 				$('#ppass').style.color = 'green';
		 			}else{
						$('#ppass').style.color = 'red';
		 			}
		 		});
		 		EventUtil.addHandler('focus', cpass, function(){
		 			$('#pcpass').innerText = '再次输入相同密码';
		 			$('#pcpass').style.color = 'gray';
		 		});
		 		EventUtil.addHandler('blur', cpass, function(){
		 			 handlers.confirmPass(cpass.value);
		 			 if($('#pcpass').innerText == '密码可用'){
		 				$('#pcpass').style.color = 'green';
		 			}else{
						$('#pcpass').style.color = 'red';
		 			}
		 		});
		 		EventUtil.addHandler('focus', email, function(){
		 			$('#pemail').innerText = '必填';
		 			$('#pemail').style.color = 'gray';
		 		});
		 		EventUtil.addHandler('blur', email, function(){
		 			 handlers.checkEmail(email.value);
		 			 if($('#pemail').innerText == '邮箱格式正确'){
		 				$('#pemail').style.color = 'green';
		 			}else{
						$('#pemail').style.color = 'red';
		 			}
		 		});
		 		EventUtil.addHandler('focus', phone, function(){
		 			$('#pphone').innerText = '必填';
		 			$('#pphone').style.color = 'gray';
		 		});
		 		EventUtil.addHandler('blur', phone, function(){
		 			 handlers.checkPhone(phone.value);
		 			 if($('#pphone').innerText == '手机格式正确'){
		 				$('#pphone').style.color = 'green';
		 			}else{
						$('#pphone').style.color = 'red';
		 			}
		 		});
		 		EventUtil.addHandler('click', submit, function(){
		 			 if($('#pphone').style.color == 'green'
		 			 	&&$('#pemail').style.color == 'green'
		 			 	&&$('#pcpass').style.color == 'green'
		 			 	&&$('#ppass').style.color == 'green'
		 			 	&&$('#pname').style.color == 'green'){
		 				alert('提交成功');
		 			}else{
						alert('提交失败');
		 			}
		 		});
		 	})();
		 }