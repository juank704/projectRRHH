var dataTable = $('#tbl_Info').DataTable({
	"sPaginationType": "full_numbers" ,
	"filter": false
});
$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none';
	$('#loading').hide();
	loadCampo();
});
var filtro;
var bloqueo = false;
function loadCampo(){
	$.each(SESION.campo, function(k, v) {
    	filtro += '<option value="'+v.campo+'">'+v.descripcion+'</option>';
    });
    $('#filtroCampo').html(filtro);
    cod_campo = $("#filtroCampo").val();
    porCampo(cod_campo);
	loadEquipo(cod_campo);
}
$("#filtroCampo").change(function(){
	cod_campo = $("#filtroCampo").val();
	loadEquipo(cod_campo);
	porCampo(cod_campo);
//	cargar tabla
	$('#filtroBloque').html("");
});
function loadEquipo(cod_campo){
	equipo = "<option value=''>Seleccionar</option>";
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETEQUIPO/"+cod_campo,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) {
			$.each(data, function(k, v) {
				equipo += "<option value="+v.codigo_equipo+">"+v.descripcion+"</option>";
			});
			$('#filtroEquipo').html(equipo);
	    }
	})
}
$("#filtroEquipo").change(function(){
	cod_equipo = $("#filtroEquipo").val();
	porEquipo(cod_equipo);
//	loadBloque();
});
function loadTabla(data){
	dataTable.clear().draw();
	var tbl = [];
	$.each(data,function(k, v) {
		var editar = "<div class='dropdown dropleft' style='float: left;'><button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' onclick='javascript: BT_Editar("+v.codigo+")' type='button' data-toggle='dropdown'><span class='fa fa-pencil-square-o fa-lg'></span></button>";
//		var eliminar = "<div class='dropdown dropleft' style='float: left;'><button id='CambioEstado' class='btn btn-circle red btn-outline btn-sm dropdown-toggle' title='Eliminar' onclick='javascript: CambioEstado("+v.codigo+")' type='button' data-toggle='dropdown'><span class='fa fa-trash fa-2x'></span></button>";
		tbl[0] = 		v.nombre_bloque;
		tbl[1] = 		"<input type='text' class='form-control input-sm' id='enero"+v.codigo+"' value='"+v.enero+"'disabled>";
		tbl[2] = 		"<input type='text' class='form-control input-sm' id='febrero"+v.codigo+"' value='"+v.febrero+"'disabled>";
		tbl[3] = 		"<input type='text' class='form-control input-sm' id='marzo"+v.codigo+"' value='"+v.marzo+"'disabled>";
		tbl[4] = 		"<input type='text' class='form-control input-sm' id='abril"+v.codigo+"' value='"+v.abril+"'disabled>";
		tbl[5] = 		"<input type='text' class='form-control input-sm' id='mayo"+v.codigo+"' value='"+v.mayo+"'disabled>";
		tbl[6] = 		"<input type='text' class='form-control input-sm' id='junio"+v.codigo+"' value='"+v.junio+"'disabled>";
		tbl[7] = 		"<input type='text' class='form-control input-sm' id='julio"+v.codigo+"' value='"+v.julio+"'disabled>";
		tbl[8] = 		"<input type='text' class='form-control input-sm' id='agosto"+v.codigo+"' value='"+v.agosto+"'disabled>";
		tbl[9] = 		"<input type='text' class='form-control input-sm' id='septiembre"+v.codigo+"' value='"+v.septiembre+"'disabled>";
		tbl[10] = 		"<input type='text' class='form-control input-sm' id='octubre"+v.codigo+"' value='"+v.octubre+"'disabled>";
		tbl[11] = 		"<input type='text' class='form-control input-sm' id='noviembre"+v.codigo+"' value='"+v.noviembre+"'disabled>";
		tbl[12] = 		"<input type='text' class='form-control input-sm' id='diciembre"+v.codigo+"' value='"+v.diciembre+"'disabled>";
		tbl[13] =		"<div class='dropdown dropleft' style='float: left;'>";
		tbl[13] +=			"<button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Editar' id='bt_editar"+v.codigo+"' onclick='javascript: BT_Editar("+ v.codigo+ ")' type='button' data-toggle='dropdown'>";
		tbl[13] +=			"<span class='fa fa-pencil-square-o fa-lg'></span></button>";
		tbl[13] += 		"<a title='Guardar' id='bt_guardar"+v.codigo+"' onclick='javascript: BT_Guardar("+ v.codigo+ ")'  style='display: none;' class='btn btn-circle green btn-outline icon-cloud-upload'></a>";
		tbl[13] += 		"<a title='Cancelar' id='bt_cancelar"+v.codigo+"' onclick='javascript: BT_Cancelar("+ v.codigo+ ")'  style='display: none;' class='btn btn-circle red btn-outline glyphicon glyphicon-ban-circle'></a>";
		
//		tbl[13] = 		eliminar;
//		tbl = [v.febrero, v.marzo, v.abril, v.mayo, v.junio, v.julio, v.agosto, v.septiembre, v.octubre, v.noviembre, v.diciembre, editar, eliminar];
		var rowNode = dataTable
	    .row.add( tbl )
	    .draw()
	    .node();
	})
}
function BT_Guardar(codigo){
	
	bloqueo = false;
	
	$('#bt_guardar'+codigo).hide();
	$('#bt_cancelar'+codigo).hide();
	$('#bt_editar'+codigo).show();
	
	$("#enero"+codigo).prop("disabled", true);
	$("#febrero"+codigo).prop("disabled", true);
	$("#marzo"+codigo).prop("disabled", true);
	$("#abril"+codigo).prop("disabled", true);
	$("#mayo"+codigo).prop("disabled", true);
	$("#junio"+codigo).prop("disabled", true);
	$("#julio"+codigo).prop("disabled", true);
	$("#agosto"+codigo).prop("disabled", true);
	$("#septiembre"+codigo).prop("disabled", true);
	$("#octubre"+codigo).prop("disabled", true);
	$("#noviembre"+codigo).prop("disabled", true);
	$("#diciembre"+codigo).prop("disabled", true);
	
	var descripc = {
			codigo : codigo,
			enero : $("#enero"+codigo).val(),
			febrero : $("#febrero"+codigo).val(),
			marzo : $("#marzo"+codigo).val(),
			abril : $("#abril"+codigo).val(),
			mayo : $("#mayo"+codigo).val(),
			junio : $("#junio"+codigo).val(),
			julio : $("#julio"+codigo).val(),
			agosto : $("#agosto"+codigo).val(),
			septiembre : $("#septiembre"+codigo).val(),
			octubre : $("#octubre"+codigo).val(),
			noviembre : $("#noviembre"+codigo).val(),
			diciembre : $("#diciembre"+codigo).val(),
		}	

		$.ajax({
			url : "/simpleWeb/json/AGRO/UPDATE_FactorDecision/",
			type : "PUT",
			data : JSON.stringify(descripc),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
				alerta("Datos Guardados Satisfactoriamente");	
				return;
				porEquipo(cod_equipo);
			}
		})	
	$("#loading").hide();
	
}
function BT_Editar(codigo){
	if(bloqueo == false){
		$('#bt_guardar'+codigo).show();
		$('#bt_cancelar'+codigo).show();
		$('#bt_editar'+codigo).hide();
		
		$("#enero"+codigo).prop("disabled", false);
		$("#febrero"+codigo).prop("disabled", false);
		$("#marzo"+codigo).prop("disabled", false);
		$("#abril"+codigo).prop("disabled", false);
		$("#mayo"+codigo).prop("disabled", false);
		$("#junio"+codigo).prop("disabled", false);
		$("#julio"+codigo).prop("disabled", false);
		$("#agosto"+codigo).prop("disabled", false);
		$("#septiembre"+codigo).prop("disabled", false);
		$("#octubre"+codigo).prop("disabled", false);
		$("#noviembre"+codigo).prop("disabled", false);
		$("#diciembre"+codigo).prop("disabled", false);
		
		bloqueo = true;
	}
	else{
		alerta("Termine de editar antes de modificar un nuevo bloque");
	}
	
	
}
function BT_Cancelar(codigo){
	
	bloqueo = false;
	
	$('#bt_guardar'+codigo).hide();
	$('#bt_cancelar'+codigo).hide();
	$('#bt_editar'+codigo).show();
	
	$("#enero"+codigo).prop("disabled", true);
	$("#febrero"+codigo).prop("disabled", true);
	$("#marzo"+codigo).prop("disabled", true);
	$("#abril"+codigo).prop("disabled", true);
	$("#mayo"+codigo).prop("disabled", true);
	$("#junio"+codigo).prop("disabled", true);
	$("#julio"+codigo).prop("disabled", true);
	$("#agosto"+codigo).prop("disabled", true);
	$("#septiembre"+codigo).prop("disabled", true);
	$("#octubre"+codigo).prop("disabled", true);
	$("#noviembre"+codigo).prop("disabled", true);
	$("#diciembre"+codigo).prop("disabled", true);
}
function porCampo(cod_campo){
	$.getJSON("/simpleWeb/json/AGRO/GETFACTORBYCAMPO/"+cod_campo, function( data ){
		loadTabla(data);
	})	
}
function porEquipo(cod_equipo){
	var arraybloques;
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETFACTORBYEQUIPO/"+cod_campo+"/"+cod_equipo,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) {
				arraybloques = data;
	    }
	})
	var arr = [];
	$.each(arraybloques, function(k,v){
		arr.push(v.codigo_bloque)
	})
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETFACTORES/"+arr,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) {
			loadTabla(data);
	    }
	})
}
