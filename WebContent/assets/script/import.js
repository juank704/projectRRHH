$(document).ready(function(){
	loadPresonal();
})
var datos;
$("#fileImport").change(function(){
	var name = $("#fileImport").prop("files")[0].name;
	$("#fImport").html(name);
	$("#desFiles").show();
});
function desFiles(){
	$("#desFiles").hide();
	$("#fImport").html("Ningun archivo seleccionado");
	$("#fileImport").val("");
}
function loadPresonal(){
	$.getJSON("/simpleWeb/json/map/loadPersonal/", function(data){
		datos = data;
		var aux = "<option value=''>Rut Funcionario...</option>";
		$.each(data, function(k, v){
			aux += "<option value="+v.id+">"+v.rut+"</option>";
		})
		$("#iden").append(aux);
	})
}
function selectRut(id){
	$.each(datos, function(k,v){
		if(v.id == id){
			console.log(v);
		}
	});
}