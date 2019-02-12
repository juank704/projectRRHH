$(document).ready(function(){
	
})
window.onload = function(){
	var idArr = [];
	var get = getMAP();
	var ids = get.cod.split(",");
	for(var i = 0; i < ids.length; i++){
		var row = {id: ids[i]}
		idArr.push(row);
	}
	
	if(!get){
		$("#div_funcionario").show();
	}
}

function getMAP(){
	var location = document.location.href;
	if(location.indexOf('?')>0){
		var getString = location.split('?')[1];
		var GET = getString.split('&');
		var get = {};
		
		for(var i = 0, l = GET.length; i < l; i++){
			var tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
		}
		return get;
	}
}