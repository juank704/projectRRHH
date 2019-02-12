var dataTable = $('#Table_mantenedor').DataTable({
	"sPaginationType": "full_numbers" ,
	"filter": false
	
});
$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none';
	$('#loading').hide();
	loadCampo();
	loadTabla($("#filtro").val());
	
});
var arrayFormAplic;
var tablaFormaA = $("#Div_Table_FormaAplicacion").html();


$("#filtro").change(function(){
	loadTabla($("#filtro").val());
});

function loadTabla(filtro) {
	dataTable.clear().draw();
	var arrayMantenedor = [];
	$.ajax({
		url: "/simpleWeb/json/work/getParametros/"+filtro+"/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) { 
			arrayMantenedor = data;
	    }
	})
	var tbl = "";
	$.each(arrayMantenedor,function(k, v) {
		var editar = "<div class='dropdown dropleft' style='float: left;'><button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' onclick='javascript: addFormAP("+v.llave+ ","+v.id+")' type='button' data-toggle='dropdown'><span class='fa fa-pencil-square-o fa-lg'></span></button>";
		var eliminar = "<div class='dropdown dropleft' style='float: left;'><button id='CambioEstado' class='btn btn-circle red btn-outline btn-sm dropdown-toggle' title='Eliminar' onclick='javascript: CambioEstado("+v.id+")' type='button' data-toggle='dropdown'><span class='fa fa-trash fa-2x'></span></button>";
		var tbl = [v.descripcion, editar, eliminar];
		var rowNode = dataTable
	    .row.add( tbl )
	    .draw()
	    .node();
	})
}
function loadCampo(){
	$.ajax({
		url: "/simpleWeb/json/AGRO/getMantenedorGenerico/TIPO%20PLANTACION",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) { 
	        $.each(data, function(k, v) {
	        	filtro += '<option value="'+v.codigo+'">'+v.codigo+'</option>';
	        });
	        $('#filtro').html(filtro);
	    }
	})
}
var codigo = "";
function cambioCampo(campo) {
	$.getJSON("/simpleWeb/json/work/getParametros/"+campo.value+"/", function(data) {
		arrayFormAplic = data;
		//loadTabla(data);
		$('#Table_FormaAplicacion').DataTable({
			"sPaginationType" : "full_numbers",
			"filter" : false
		});
	});
	$("#loading").hide();
	codigo = campo.value;
}
function cargarRegistro() {
	var descripc = {
		descripcion : $("#descripcionFormaAp").val(),
		codigo : $("#filtro").val()
	}
	$.ajax({
		url : "/simpleWeb/json/AGRO/ADDMANTENEDORGEN/",
		async: false,
		type : "PUT",
		data : JSON.stringify(descripc),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},success: function() {
			alerta("Registrado Correctamente" + " " + $('#descripcionFormaAp').val());
			loadTabla($("#filtro").val());
		}
	})
}

function actualizarRegistro(llave,id) {
	var descripc = {
		codigo: $("#filtro").val(), 
		llave : llave,
		descripcion : $("#descripcionFormaAp").val(),
		id : id
	}
	console.log();
	$.ajax({
		url : "/simpleWeb/json/work/updateDescripcionParam/",
		type : "PUT",
		data : JSON.stringify(descripc),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},success: function(){
			alerta("Registro modificado");
			loadTabla($("#filtro").val());
		}
	})
}
	
function addFormAP(llave, id) {
	var descripcion = "";
	var titulo = "Registrar " + codigo;
	if (id == undefined) {
		id = "";
	} else {
		titulo = "Modificar " + codigo
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
				codigo	: $("#filtro").val(),	
				descripcion : $("#descripcionFormaAp").val(),
			}
			console.log(newAplicaciones);
			loadTabla($("#filtro").val());
			swal.closeModal();
		}
		if ($('#codigoEdit').val() == "0") {
			cargarRegistro(datos);
		} else {
			actualizarRegistro($('#codigoEdit').val(),$('#codigoEditId').val());
		}
		loadTabla($("#filtro").val());
	})

	$("#cancelarFormaAp").click(function() {
		swal.closeModal();
	})
}
		
function CambioEstado(codigo){
	var c = confirmar.confirm("¿Estás seguro?")
	$(c.aceptar).click(function(){
		var newAplicaciones = {
				id : codigo,
			}
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
					loadTabla($("#filtro").val());
				},
			});
		loadTabla($("#filtro").val());
	})
}