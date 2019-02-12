var dataTable = $('#TableCalibre').DataTable({
	"sPaginationType": "full_numbers" ,
	"filter": false
	
});
$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none';
	loadInfo();
	$('#loading').hide();
});


var arrayCategoria;
var datos;
var tabla2 = $("#DivCalibre").html();
//
//function LimpiarTabla() {
//	$("#DivCalibre").html("");
//	$("#DivCalibre").html(tabla2);
//	$('#BodyCalibre').html("");
//}

function loadTabla(data) {
	dataTable.clear().draw();
	var tbl = "";
	$.each(data,function(k, v) {
		$('#BodyCategoria').html("");
//						tbl += "<tr>";
//						tbl += "<td>" + v.descripcion + "</td>";
//						tbl += "<td>" + v.nvEspecie + "</td>";
//						tbl +=		"<td><div class='dropdown dropleft' style='float: left;'>";
//						tbl +=			"<button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' onclick='javascript: addFormAP("+v.codigo+")' type='button' data-toggle='dropdown'>";
//						tbl +=			"<span class='fa fa-pencil-square-o fa-lg'></span></button></td>";
//						tbl +=		"<td><div class='dropdown dropleft' style='float: left;'>";
//						tbl +=			"<button id='CambioEstado' class='btn btn-circle red btn-outline btn-sm dropdown-toggle' onclick='javascript: CambioEstado("+v.codigo+")' title='Eliminar' type='button' data-toggle='dropdown'>";
//						tbl +=			"<span class='fa fa-trash 2x'></span></button></td>";						
//						tbl += "</tr>";
//					})
//	$('#BodyCalibre').html(tbl);
		var editar = "<div class='dropdown dropleft' style='float: left;'><button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' onclick='javascript: addFormAP("+v.codigo+")' type='button' data-toggle='dropdown'><span class='fa fa-pencil-square-o fa-lg'></span></button>";
		var eliminar = "<div class='dropdown dropleft' style='float: left;'><button id='CambioEstado' class='btn btn-circle red btn-outline btn-sm dropdown-toggle' title='Eliminar' onclick='javascript: CambioEstado("+v.codigo+")' type='button' data-toggle='dropdown'><span class='fa fa-trash fa-2x'></span></button>";
		var tbl = [v.descripcion, v.nvEspecie, editar, eliminar];
		var rowNode = dataTable
	    .row.add( tbl )
	    .draw()
	    .node();
	})
}
function loadInfo() {
	$('#BodyFormaAplicacion').html("");
	$.getJSON("/simpleWeb/json/AGRO/GETMantenedor_SA/CALIBRE", function(data) {
		arrayCategoria = data;
		loadTabla(data);
	});
	$("#loading").hide();
}

function cargarRegistro() {
	var descripc = {
		descripcion : $("#BoxDescripcion").val(),
		cod_especie : $('#BoxEspecie').val()
	}
	$.ajax({
		url : "/simpleWeb/json/AGRO/ADD_Calibre/",
		type : "PUT",
		data : JSON.stringify(descripc),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function() {
			alerta("Registrado Correctamente" + " "	+ $("#BoxDescripcion").val());
		}
	})
	loadInfo();
}

function actualizarRegistro(codigo) {
//	LimpiarTabla();
	var datos = {
		codigo : codigo,
		descripcion : $("#BoxDescripcion").val(),
		cod_especie : $('#BoxEspecie').val()
	}
	console.log(codigo);
	$.ajax({
		url : "/simpleWeb/json/AGRO/UPDATE_Calibre/",
		type : "PUT",
		data : JSON.stringify(datos),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function() {
			alerta("Registro modificado");
		}
	})
	$("#loading").hide();
}


function addFormAP(codigo) {
	var descripcion = "";
	var cod_especie ="";
	var titulo = "Registrar Categoría";
	if (codigo == undefined) {
		codigo = "";
	} else {
		titulo = "Modificar Categoría"
		$.each(arrayCategoria, function(ka, va) {
			if (codigo == va.codigo) {
				descripcion = va.descripcion;
				cod_especie = va.cod_especie;
			}
		})
	}

	swal({
		title : titulo,
		html : '<div class="col-xs-12 col-md-12 col-lg-12" id="formProductor">'
				+ '<div class="box-datos-generales" style="width: 100%">'
				+ '<div class="col-xs-12 col-md-6 col-lg-6 portlet light bordered">'
				+ '<h4>Descripción</h4>'
				+ '<input type="text" class="form-control ui-autocomplete-input" id="BoxDescripcion" value="'+descripcion+'" placeholder="Ingrese Descripción">'
				+ '<input type="hidden" id="codigoEdit" value="'+codigo+'">'
				+ '</div>'
				
				+ '<div class="col-xs-12 col-md-6 col-lg-6 portlet light bordered">'
				+ '<h4>Especie</h4>'
				+ '<select id="BoxEspecie" class="form-control input-sm" value="'+cod_especie+'">"'+loadEspecie()+'"</select>'
				+ '<input type="hidden" id="codigoEditEspecie" value="'+cod_especie+'">'
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
	$('#BoxEspecie').val(cod_especie);
	
	$("#registrarFormaAp").click(function() {
		if (!$("#BoxDescripcion").val()) {
			alerta("No ha ingresado una descripcion");
			return;
		} else {
			var newAplicaciones = {
					descripcion : $("#BoxDescripcion").val(),
					cod_especie : $("#BoxEspecie").val(),
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
//	  LimpiarTabla();
	var c = confirmar.confirm("¿Estás seguro?")
	$(c.aceptar).click(function(){
		var NuevoEstado = 
		{
			codigo : codigo
		}
		$.ajax({
			type: "PUT",
			async: false,
			url: "/simpleWeb/json/AGRO/UP_Calibre_Estado/",
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
	var ESPECIE = "<option value='' disabled selected hidden=''>Seleccione Especie</option>";
	$.each(SESION.especie, function(k,v){
		ESPECIE += "<option value='"+v.codigo+"'>"+v.especie+"</option>";
	})
	return ESPECIE
}