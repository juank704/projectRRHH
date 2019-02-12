var dataTable = $('#Tabla_ControlAplicacion').DataTable({
	"sPaginationType": "full_numbers" ,
	"filter": false
});
$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none';
	loadInfo();
	$('#loading').hide();
});
var arrayFormAplic;
var datos;
var estado = $('#estado').val();
var tablaControlA = $("#DivControlAplicacion").html();

//function LimpiarTabla() {
//	$("#DivControlAplicacion").html("");
//	$("#DivControlAplicacion").html(tablaControlA);
//	$('#BodyFormaAplicacion').html("");
//}

function loadTabla(data) {
	var tbl = "";
	$.each(data,function(k, v) {
//						tbl += "<tr>";
//						tbl += 		"<td>"+v.control_aplicacion+"</td>";
//						tbl += 		"<td>"+v.nVespecie+"</td>";
//						tbl +=		"<td><div class='dropdown dropleft' style='float: left;'>";
//						tbl +=			"<button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' onclick='javascript: addFormAP("+v.codigo+")' type='button' data-toggle='dropdown'>";
//						tbl +=			"<span class='fa fa-pencil-square-o fa-lg'></span></button></td>";
//						tbl +=		"<td><div class='dropdown dropleft' style='float: left;'>";
//						tbl +=			"<button class='btn btn-circle red btn-outline btn-sm dropdown-toggle' title='Modificar Estado' onclick='javascript: CambioEstado("+ v.codigo+ ")' type='button' data-toggle='dropdown'>";
//						tbl +=			"<span class='fa fa-trash 2x'></span></button></td>";
//						tbl += "</tr>";
//					})
//	$('#BodyFormaAplicacion').html(tbl);
		var editar = "<div class='dropdown dropleft' style='float: left;'><button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' onclick='javascript: addFormAP("+v.codigo+")' type='button' data-toggle='dropdown'><span class='fa fa-pencil-square-o fa-lg'></span></button>";
		var eliminar = "<div class='dropdown dropleft' style='float: left;'><button id='CambioEstado' class='btn btn-circle red btn-outline btn-sm dropdown-toggle' title='Eliminar' onclick='javascript: CambioEstado("+v.codigo+")' type='button' data-toggle='dropdown'><span class='fa fa-trash fa-2x'></span></button>";
		var tbl = [v.control_aplicacion, v.nVespecie, editar, eliminar];
		var rowNode = dataTable
	    .row.add( tbl )
	    .draw()
	    .node();
	})	
}
function loadInfo() {
	$.getJSON("/simpleWeb/json/AGRO/GETCONTROL_APLICACION/", function(data) {
		arrayFormAplic = data;
		loadTabla(data);
	});
	$("#loading").hide();
}


function cargarRegistro() {
//	LimpiarTabla();
	var descripc = {
		control_aplicacion : $("#descripcionFormaAp").val(),
		especie : $('#boxespecie').val()
	}
	console.log(descripc)
	$.ajax({
		url : "/simpleWeb/json/AGRO/ADDCONTROL_APLICACION/",
		type : "PUT",
		data : JSON.stringify(descripc),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},success:function(){
			alerta("Registrado Correctamente" + " " + $('#descripcionFormaAp').val());
		}
	})
}

function addFormAP(codigo) {
	var control_aplicacion = "";
	var especie ="";
	var titulo = "Registrar Forma Aplicación";
	if (codigo == undefined) {
		codigo = "";
	} else {
		titulo = "Modificar Forma Aplicación"
		$.each(arrayFormAplic, function(ka, va) {
			if (codigo == va.codigo) {
				control_aplicacion = va.control_aplicacion;
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
				+ '<input type="text" class="form-control ui-autocomplete-input" id="descripcionFormaAp" value="'+ control_aplicacion+ '">'
				+ '<input type="hidden" id="codigoEdit" value="'+codigo+'">'
				+ '</div>'
				+ '<div class="col-xs-12 col-md-6 col-lg-6 portlet light bordered">'
				+ '<h4>Especie</h4>'
				+ '<select id="boxespecie" class="form-control input-sm" value="'+especie+'">"'+loadEspecie()+'"</select>'
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
				closeButtonAriaLabel : 'Cancelar esta operacion',
				showCloseButton : false,
				showConfirmButton : false,
				focusConfirm : false,
				allowOutsideClick : false,
				allowEscapeKey : true
	});
	$('#boxespecie').val(especie);
	
	$("#registrarFormaAp").click(function() {
		if (!$("#descripcionFormaAp").val()) {
			alert("No ha ingresado una descripcion");
			return;
		} else {
			var newAplicaciones = {
					descripcion : $("#descripcionFormaAp").val(),
					especie : $("#boxespecie").val()
			}
			loadTabla(datos);
			swal.closeModal();
		}
		if ($('#codigoEdit').val() == "0") {
			cargarRegistro(datos);
		} else {
			actualizarRegistro($('#codigoEdit').val(), $('#codigoEditEspecie').val());
		}	
			loadInfo();
	})

	$("#cancelarFormaAp").click(function() {
		swal.closeModal();
	})
}

function CambioEstado(codigo){
//	LimpiarTabla();
	var c = confirmar.confirm("¿Estás seguro?")
	$(c.aceptar).click(function(){
		var estado="";
				var NuevoEstado = {
					codigo : codigo,		
				}
				console.log(NuevoEstado);
				$.ajax({
					type: "PUT",
					async: false,
					url: "/simpleWeb/json/AGRO/UP_ControlAplicacion_Estado/",
					data: JSON.stringify(NuevoEstado),
					beforeSend : function(xhr){
						xhr.setRequestHeader("Accept", "application/json");
						xhr.setRequestHeader("Content-Type", "application/json");
					},success:function(){
						alerta("Estado se eliminó");
					},
				});
				loadInfo();
	})
}

function actualizarRegistro(codigo) {
//	LimpiarTabla();
	var descripc = {
		codigo : codigo,
		control_aplicacion : $("#descripcionFormaAp"+codigo).val(),
		especie : $('#boxespecie'+codigo).val()
	}
	console.log(descripc)
	$.ajax({
		url : "/simpleWeb/json/AGRO/ADDCONTROL_APLICACION/",
		type : "PUT",
		data : JSON.stringify(descripc),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},success: function(){
			alerta("Dato Modificado Correctamente");
		}
	})
}

function loadEspecie(){
	var ESPECIE = "<option value='0' disabled selected hidden=''>Todos</option>";
	$.each(SESION.especie, function(k,v){
		ESPECIE += "<option value='"+v.codigo+"'>"+v.especie+"</option>";
	})
	return ESPECIE
}