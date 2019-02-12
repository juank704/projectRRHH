$(document).ready(function(){
	
});

$("#addDep").click(function(){
	$("#divDep").hide();
	$("#divDep2").hide();
	$("#editDep").hide();
	$("#addNewDep").show();
	$("#divAdd").show();
});

$("#cancelAdd").click(function(){
	$("#divDep").show();
	$("#divDep2").show();
	$("#divAdd").hide();
	$("#depDesc").val("");
	$("#depCod").val("");
});

function editDep(id){
	$("#divDep").hide();
	$("#divDep2").hide();
	$("#addNewDep").hide();
	$("#editDep").show();
	$("#divAdd").show();
}