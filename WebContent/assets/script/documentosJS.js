$(document).ready(function(){
	
})
function viewDocs(){
	window.location.href = ("../assets/pages/docs/FORMATO_DOC_TRABAJADOR.DOC");
}
function addDocs(){
	$("#divAddDocs").show();
	$("#addDocs_div").hide();
}
function cancelAdd(){
	$("#divAddDocs").hide();
	$("#addDocs_div").show();
}