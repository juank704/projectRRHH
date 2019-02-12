$(document).ready(function(){
	
});

$("#btnExportar").click(function(){
	var exportar = document.getElementsByName("exportar");
	for(var i= 0; i < exportar.length; i++){
		if(!$(exportar[i]).val()){
			$(exportar[i]).focus();
			return false;
		}
	}
});