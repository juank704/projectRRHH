var dataTable = $('#EstadoF').DataTable({
	"sPaginationType": "full_numbers" ,
	"filter": false
	
});
$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none';
	loadInfo();
	$('#loading').hide();
});


var tablaEstadoFenologico = $("#DivEstado").html();
var arrayFormAplic;
var datos;

var tabla2 = $("#DivEstado").html();
//var table = $('#BodyFormaAplicacion').DataTable;

function loadTabla(data) {
	dataTable.clear().draw();
	var tbl = "";
	$.each(data,function(k, v) {
//		$('#BodyFormaAplicacion').html("");
//						tbl += "<tr>";
//						tbl += "<td>" + v.estado_fenologicos + "</td>";
//						tbl += "<td>" + v.nvEspecie + "</td>";
//						tbl +=		"<td><div class='dropdown dropleft' style='float: left;'>";
//						tbl +=			"<button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' onclick='javascript: addFormAP("+v.codigo+")' type='button' data-toggle='dropdown'>";
//						tbl +=			"<span class='fa fa-pencil-square-o fa-lg'></span></button></td>";
//						tbl +=		"<td><div class='dropdown dropleft' style='float: left;'>";
//						tbl +=			"<button id='CambioEstado' class='btn btn-circle red btn-outline btn-sm dropdown-toggle' onclick='javascript: CambioEstado("+v.codigo+")' title='Eliminar' type='button' data-toggle='dropdown'>";
//						tbl +=			"<span class='fa fa-trash 2x'></span></button></td>";						
//						tbl += "</tr>";
//					})
//	$('#BodyFormaAplicacion').html(tbl);
		var editar = "<div class='dropdown dropleft' style='float: left;'><button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' onclick='javascript: addFormAP("+v.codigo+")' type='button' data-toggle='dropdown'><span class='fa fa-pencil-square-o fa-lg'></span></button>";
		var eliminar = "<div class='dropdown dropleft' style='float: left;'><button id='CambioEstado' class='btn btn-circle red btn-outline btn-sm dropdown-toggle' title='Eliminar' onclick='javascript: CambioEstado("+v.codigo+")' type='button' data-toggle='dropdown'><span class='fa fa-trash fa-2x'></span></button>";
		var tbl = [v.estado_fenologicos, v.nvEspecie, editar, eliminar];
		var rowNode = dataTable
	    .row.add( tbl )
	    .draw()
	    .node();
	})
}
function loadInfo() {
	//$('#BodyFormaAplicacion').html("");
	$.getJSON("/simpleWeb/json/AGRO/GET_EstadoFenologico/", function(data) {
		arrayFormAplic = data;
		loadTabla(data);
	});
	$("#loading").hide();
}

//function LimpiarTabla() {
//	$("#DivEstado").html("");
//	$("#DivEstado").html(tabla2);
//	$('#BodyFormaAplicacion').html("");
//}

function cargarRegistro() {	
//	LimpiarTabla();
	var descripc = {
			estado_fenologicos : $("#descripcionFormaAp").val(),
			especie: $('#BoxEspecie').val()
	}
	$.ajax({
		url : "/simpleWeb/json/AGRO/ADD_EstadoFenologico/",
		type : "PUT",
		data : JSON.stringify(descripc),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},success: function(){
			alerta("Registrado Correctamente" + " " + $("#descripcionFormaAp").val());
			loadInfo();
		}
	})
	
}

function actualizarRegistro(codigo) {
//	LimpiarTabla();
	var descripc = {
		codigo:codigo,
		estado_fenologicos : $("#descripcionFormaAp").val(),
		especie:$('#BoxEspecie').val()
	}
	$.ajax({
		url : "/simpleWeb/json/AGRO/UP_EstadoFenologico/",
		type : "PUT",
		data : JSON.stringify(descripc),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},success: function(){
			alerta("Registro modificado");
		}
	})
	loadInfo();
	$("#loading").hide();
}


function addFormAP(codigo) {
	var estado_fenologicos = "";
	var especie ="";
	var titulo = "Registrar Forma Aplicación";
	if (codigo == undefined) {
		codigo = "";
	} else {
		titulo = "Modificar Forma Aplicación"
		$.each(arrayFormAplic, function(ka, va) {
			if (codigo == va.codigo) {
				estado_fenologicos = va.estado_fenologicos;
				especie = va.especie;
			}
		})
	}

	swal({
		title : titulo,
		html : '<div class="col-xs-12 col-md-12 col-lg-12" id="formProductor">'
				+ '<div class="box-datos-generales" style="width: 100%">'
				+ '<div class="col-xs-12 col-md-6 col-lg-6 portlet light bordered">'
				+ '<h4>Descripción</h4>'
				+ '<input type="text" class="form-control ui-autocomplete-input" id="descripcionFormaAp" value="'+estado_fenologicos+'">'
				+ '<input type="hidden" id="codigoEdit" value="'+codigo+'">'
				+ '</div>'
				
				+ '<div class="col-xs-12 col-md-6 col-lg-6 portlet light bordered">'
				+ '<h4>Especie</h4>'
				+ '<select id="BoxEspecie" class="form-control input-sm" value="'+especie+'">"'+loadEspecie()+'"</select>'
				+ '<input type="hidden" id="codigoEditEspecie" value="'+especie+'">'
				+ '</div>'
				+ '</div>'
				+ '</div>'
				+ '<div class="col-xs-12 col-md-12 col-lg-12">'
				+ '<div class="btn btn-circle blue btn-outline" id="registrarFormaAp"   >Registrar</div>'
				+ "&nbsp;&nbsp;&nbsp;"
				+ '<div class="btn btn-circle red btn-outline" id="cancelarFormaAp">Cancelar</div>'
				+ '</div>' + '</div>',
		animation : true,
		width : '600px',
		showCloseButton : false,
		showConfirmButton : false,
		focusConfirm : false,
		allowOutsideClick : false,
		allowEscapeKey : true
	});
	$('#BoxEspecie').val(especie);
	
	$("#registrarFormaAp").click(function() {
		if (!$("#descripcionFormaAp").val()) {
			alerta("No ha ingresado una descripcion");
			return;
		} else {
			var newAplicaciones = {
					descripcion : $("#descripcionFormaAp").val(),
			}
			swal.closeModal();
			loadTabla(datos);
		}
		if ($('#codigoEdit').val() == "0") {
			cargarRegistro(datos);
		} else {
			actualizarRegistro($('#codigoEdit').val(),$('#codigoEditEspecie').val());
		}	
			loadInfo();
	})

	$("#cancelarFormaAp").click(function() {
		swal.closeModal();
	})
}


function CambioEstado(codigo){  
	//		  LimpiarTabla();
	var c = confirmar.confirm("¿Estás seguro?")
	$(c.aceptar).click(function(){
		var NuevoEstado = {
			codigo : codigo
		}
		console.log(NuevoEstado)
		$.ajax({
			type: "PUT",
			async: false,
			url: "/simpleWeb/json/AGRO/UP_EstadoFenologico_Estado/",
			data: JSON.stringify(NuevoEstado),
			beforeSend : function(xhr){
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
				alerta("Estado se eliminó");
					},
				});
				loadInfo();
	})
}

function loadEspecie(){
	var ESPECIE = "<option value='0' disabled selected hidden=''>Todos</option>";
	$.each(SESION.especie, function(k,v){
		ESPECIE += "<option value='"+v.codigo+"'>"+v.especie+"</option>";
	})
	return ESPECIE
}