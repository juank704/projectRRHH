$(document).ready(function(){
	
});
$("#addCierre").click(function(){
	$("#divCierre").hide();
	$("#divCierre2").hide();
	$("#divFiltro").hide();
	$("#divAddCierre").show();
});

$("#cancelAddCierre").click(function(){
	$("#divCierre").show();
	$("#divCierre2").show();
	$("#divFiltro").show();
	$("#divAddCierre").hide();
});

$("#pCierre").change(function(){
	
});

$("#addNewCierre").click(function(){
	if(!$("#pCierre").val()){
		alert("No ha seleccionado ningun periodo");
		$("#pCierre").focus();
		return false;
	}else{
		var c = confirm("¿Esta seguro de cerrar este periodo?");
		if(c){
			alert("Se ha cerrado el periodo: "+$("#pCierre").val());
			$("#divCierre").show();
			$("#divCierre2").show();
			$("#divFiltro").show();
			$("#divAddCierre").hide();
			$("#pCierre").val("");
		}
	}
});