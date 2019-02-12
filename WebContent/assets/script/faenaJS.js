var dataTable = $('#TableFaena').DataTable({
	"sPaginationType": "full_numbers" ,
	"filter": false
	
});
$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none';
	loadInfo();
	$('#loading').hide();
});
var arrayFormAplic;
function loadTabla(data) {
	dataTable.clear().draw();
	var tbl = "";
	$.each(data,function(k, v) {
		var editar = "<div class='dropdown dropleft' style='float: left;'><button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' onclick='javascript: addFormAP("+JSON.stringify(v)+")' type='button' data-toggle='dropdown'><span class='fa fa-pencil-square-o fa-lg'></span></button>";
		var eliminar = "<div class='dropdown dropleft' style='float: left;'><button id='CambioEstado' class='btn btn-circle red btn-outline btn-sm dropdown-toggle' title='Eliminar' onclick='javascript: CambioEstado("+v.codigo+")' type='button' data-toggle='dropdown'><span class='fa fa-trash fa-2x'></span></button>";
		var tbl = [v.faena, v.clasificacion, editar, eliminar];
		var rowNode = dataTable
	    .row.add( tbl )
	    .draw()
	    .node();
	})
}
function loadInfo(campo) {
	if(campo){
		var zona = "";
		$.each(SESION.campo, function(k,v){
			if(campo == v.campo){
				zona = v.zona;
			}
		})
		$.getJSON("/simpleWeb/json/AGRO/GET_FAENA_ZONA?ZONA="+zona, function(data) {
			arrayFormAplic = data;
			loadTabla(data);
		});
		$("#loading").hide();
	}
}
function addFormAP(v) {
	var descripcion = "";
	var titulo = "Registro de Faena";
	var clas = "";
	var zona = "";
	var faena = "";
	var id = 0;
	if (v) {
		id = v.codigo;
		clas = v.clasificacion;
		zona = v.zona;
		faena = v.faena;
		titulo = "Modificar Faena";
	}
	var pop = "";
	pop = 	"<div class='col-xs-12 col-sm-12 col-md-12 portlet'>";
	pop += 		"<div class='col-xs-6 col-sm-6 col-md-6'>";
	pop += 			"<div class='col-xs-12 col-sm-12 col-md-12'>";
	pop += 				"<h5 style='color: #337ab7;font-weight: bold'>Zona</h5>";
	pop += 			"</div>";
	pop += 			"<div class='col-xs-12 col-sm-12 col-md-12 '>";
	pop += 				"<select type='text' class='form-control input-sm required-modal' id='zona'>";
	pop += 					"<option value=''></option>";
	pop += 					"<option value='Norte'>Norte</option>";
	pop += 					"<option value='Sur'>Sur</option>";
	pop += 				"</select>";
	pop += 			"</div>";
	pop += 		"</div>";
	pop += 		"<div class='col-xs-6 col-sm-6 col-md-6'>";
	pop += 			"<div class='col-xs-12 col-sm-12 col-md-12'>";
	pop += 				"<h5 style='color: #337ab7;font-weight: bold'>Faena</h5>";
	pop += 			"</div>";
	pop += 			"<div class='col-xs-12 col-sm-12 col-md-12'>";
	pop += 				"<input type='text' class='form-control required-modal' id='faena'>";
	pop += 			"</div>";
	pop += 		"</div>";
	pop += 		"<div class='col-xs-6 col-sm-6 col-md-6'>";
	pop += 			"<div class='col-xs-12 col-sm-12 col-md-12'>";
	pop += 				"<h5 style='color: #337ab7;font-weight: bold'>Calificacion</h5>";
	pop += 			"</div>";
	pop += 			"<div class='col-xs-12 col-sm-12 col-md-12 '>";
	pop += 				"<select type='text' class='form-control input-sm required-modal' id='clas'>";
	pop += 					"<option value=''></option>";
	pop += 					"<option value='PRE-COSECHA'>PRE-COSECHA</option>";
	pop += 					"<option value='COSECHA'>COSECHA</option>";
	pop += 					"<option value='PACKING'>PACKING</option>";
	pop += 				"</select>";
	pop += 			"</div>";
	pop += 		"</div>";
	pop += 	"</div>";
	pop += 	"<div style='text-align: center;'>";
	pop += 		"<a class='btn green-dark submit-modal' onclick='guardarFaena("+id+")'> Guardar</a>";
	pop += 		"<a class='btn red' onclick='closeModal()'>Cancelar</a>";
	pop += 	"</div>";
	popUp(titulo, pop, true, "600px", true);
	selectCss();
	$("#zona").val(zona).trigger("change");
	$("#faena").val(faena);
	$("#clas").val(clas).trigger("change");
}
function guardarFaena(id){
	console.log(id)
	if(validateModal()){
		var clas = $("#clas").val();
		var cuenta;
		if(clas == "PRE-COSECHA"){
			cuenta = "5102031001";
		}else if(clas == "COSECHA"){
			cuenta = "5102032003";
		}else{
			cuenta = "5102032004";
		}
		var row = {
			zona: $("#zona").val(),
			descripcion: $("#faena").val().toUpperCase(),
			clasificacion: clas,
			cuenta: cuenta
		}
		var url = "/simpleWeb/json/AGRO/ADDFAENA/";
		if(id != 0){
			row.codigo = id;
			url = "/simpleWeb/json/AGRO/UPDATEFAENA/";
		}
		console.log(url)
		$.ajax({
			url : url,
			type : "PUT",
			data : JSON.stringify(row),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},success: function(){
				closeModal()
				alerta("Registrado Correctamente");
				loadInfo();
			}
		})
	}
}

function CambioEstado(codigo){
//	LimpiarTabla();
	var c = confirmar.confirm("¿Estás seguro?")
	$(c.aceptar).click(function(){
		var NuevoEstado = {
			codigo : codigo,
			}
		
		$.ajax({
			type: "PUT",
			async: false,
			url: "/simpleWeb/json/AGRO/UPFAENA_ESTADO/",
			data: JSON.stringify(NuevoEstado),
			beforeSend : function(xhr){
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},success: function(){
				alerta("Eliminado correctamente");
				loadInfo();
			},
		});
	})
//	loadInfo();
}