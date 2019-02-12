var dataTable = $('#Table_FormaAplicacion').DataTable({
	"sPaginationType": "full_numbers" ,
	"filter": false
	
});
$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none';
	loadInfo();
	$('#loading').hide();
});
var arrayFormAplic;
var tablaFormaA = $("#Div_Table_FormaAplicacion").html();

//function LimpiarTabla() {
//	$("#Div_Table_FormaAplicacion").html("");
//	$("#Div_Table_FormaAplicacion").html(tablaFormaA);
//	$('#BodyFormaAplicacion').html("");
//}

function loadTabla(data) {
	dataTable.clear().draw();
	var tbl = "";
	$.each(data,function(k, v) {
//						tbl += "<tr>";
//						tbl += 		"<td>" + v.descripcion + "</td>";
//						tbl +=		"<td><div class='dropdown dropleft' style='float: left;'>";
//						tbl +=			"<button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' onclick='javascript: addFormAP("+v.llave+ ","+v.id+")' type='button' data-toggle='dropdown'>";
//						tbl +=			"<span class='fa fa-pencil-square-o fa-lg'></span></button></td>";
//						tbl +=		"<td><div class='dropdown dropleft' style='float: left;'>";
//						tbl +=			"<button id='CambioEstado' class='btn btn-circle red btn-outline btn-sm dropdown-toggle' title='Eliminar' onclick='javascript: CambioEstado("+v.id+")' type='button' data-toggle='dropdown'>";
//						tbl +=			"<span class='fa fa-trash fa-2x'></span></button></td>";
//						tbl += "</tr>";
//					})
//	$('#BodyFormaAplicacion').html(tbl);
		var editar = "<div class='dropdown dropleft' style='float: left;'><button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' onclick='javascript: addFormAP("+v.llave+ ","+v.id+")' type='button' data-toggle='dropdown'><span class='fa fa-pencil-square-o fa-lg'></span></button>";
		var eliminar = "<div class='dropdown dropleft' style='float: left;'><button id='CambioEstado' class='btn btn-circle red btn-outline btn-sm dropdown-toggle' title='Eliminar' onclick='javascript: CambioEstado("+v.id+")' type='button' data-toggle='dropdown'><span class='fa fa-trash fa-2x'></span></button>";
		var tbl = [v.descripcion, editar, eliminar];
		var rowNode = dataTable
	    .row.add( tbl )
	    .draw()
	    .node();
	})
}

function loadInfo() {
	$.getJSON("/simpleWeb/json/work/getParametros/FORMA APLICACION", function(data) {
		arrayFormAplic = data;
		loadTabla(data);
	});
	$("#loading").hide();	
}


function cargarRegistro() {
//	LimpiarTabla();
	var descripc = {
		descripcion : $("#descripcionFormaAp").val()
	}
	console.log(descripc)
	$.ajax({
		url : "/simpleWeb/json/AGRO/ADDFORMAPLICACION/",
		async: false,
		type : "PUT",
		data : JSON.stringify(descripc),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},success: function() {
			alerta("Registrado Correctamente" + " " + $('#descripcionFormaAp').val());
		}
	})
}

function actualizarRegistro(llave,id) {
//	LimpiarTabla();
	var descripc = {
		llave : llave,
		descripcion : $("#descripcionFormaAp").val(),
		id : id
	}
	console.log(descripc);
	$.ajax({
		url : "/simpleWeb/json/work/updateDescripcionParam/",
		type : "PUT",
		data : JSON.stringify(descripc),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},success: function(){
			alerta("Registro modificado");			
		}
	})
}




function actualizaEstado(codigo) {
	var descripc = {
		codigo : codigo,
		descripcion : $("#EstadoFA").val()
	}

	
	$("#loading").hide();
}
		
		function addFormAP(llave, id) {
			var descripcion = "";
			var titulo = "Registrar Forma Aplicación";
			if (id == undefined) {
				id = "";
			} else {
				titulo = "Modificar Forma Aplicación"
				$.each(arrayFormAplic, function(ka, va) {
					if (llave == va.llave) {
						descripcion = va.descripcion;
						llave = va.llave;
						id = va.id;
					}
				})
				}

	swal({
		title : titulo,
		html : '<div class="col-xs-12 col-sm-12 col-md-12" id="formProductor">'
				+'<div class="box-datos-generales" style="width: 100%">'+
				'<div class="col-xs-12 col-md-12 col-lg-12">'+
				'<div class="col-xs-12 col-md-12 col-lg-12 portlet light bordered">'+
				'<h4>Descripción</h4>'+
				'<input type="text" class="form-control" id="descripcionFormaAp" value="'+descripcion+'">'
				+ '<input type="hidden" id="codigoEdit" value="'+llave+'">'
				+ '<input type="hidden" id="codigoEditId" value="'+id+'">'
				+ '</div>'
				+ '</div>'
				+ '</div>'+
				'<div class="col-sm-12 col-md-12">'+
				'<div class="btn btn-circle blue btn-outline" id="registrarFormaAp">Registrar</div>'+ 
				"&nbsp;&nbsp;&nbsp;"+ 
				'<div class="btn btn-circle red btn-outline" id="cancelarFormaAp">Cancelar</div>'
				+ '</div>'
				+ '</div>',
		animation : true,
		width : '400px',
		closeButtonAriaLabel : 'Cancelar esta operacion',
		showCloseButton : false,
		showConfirmButton : false,
		focusConfirm : false,
		allowOutsideClick : false,
		allowEscapeKey : true
	});
	$("#registrarFormaAp").click(function() {
		if (!$("#descripcionFormaAp").val()) {
			alert("No ha ingresado una descripcion");
			return;
		} else {
			var datos;
			var newAplicaciones = {
				descripcion : $("#descripcionFormaAp").val(),
			}
			loadTabla(datos);
			swal.closeModal();
		}
		if ($('#codigoEdit').val() == "0") {
			cargarRegistro(datos);
		} else {
			actualizarRegistro($('#codigoEdit').val(),$('#codigoEditId').val());
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
		var newAplicaciones = {
				id : codigo,
			}
			console.log(newAplicaciones)
			$.ajax({
				type: "PUT",
				async: false,
				url: "/simpleWeb/json/work/updateEstadoParam/",
				data: JSON.stringify(newAplicaciones),
				beforeSend : function(xhr){
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},success:function(){
					alerta("Estado se eliminó");
				},
			});
	//	$('#BodyFormaAplicacion').html("");
		loadInfo();
	})
}