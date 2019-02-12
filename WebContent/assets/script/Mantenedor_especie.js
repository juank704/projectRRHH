var dataTable = $('#Table_mantenedor').DataTable({
	"sPaginationType": "full_numbers" ,
	"filter": false
	
});
$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none';
	$('#loading').hide();
	loadCampo();
//	loadTabla($("#filtro").val());
});
var codigo = "";
var arrayFormAplic;
var datos;
var insertabla;
//var tablaFormaA = $("#Div_Table_FormaAplicacion").html();

$("#filtro").change(function(){
	codigo = $("#filtro").val();
	cambioCampo2($("#filtro2")[0]);
});

$("#filtro2").change(function(){
	insertabla = $("#filtro2").val();
	loadInfo($("#filtro").val(), $("#filtro2").val());
});

function loadTabla(data) {
	dataTable.clear().draw();
	var tbl = "";
	$.each(data,function(k, v) {
		var editar = "<div class='dropdown dropleft' style='float: left;'><button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' onclick='javascript: addFormAP("+v.codigo+")' type='button' data-toggle='dropdown'><span class='fa fa-pencil-square-o fa-lg'></span></button>";
		var eliminar = "<div class='dropdown dropleft' style='float: left;'><button id='CambioEstado' class='btn btn-circle red btn-outline btn-sm dropdown-toggle' title='Eliminar' onclick='javascript: CambioEstado("+v.codigo+")' type='button' data-toggle='dropdown'><span class='fa fa-trash fa-2x'></span></button>";
		var tbl = [v.descripcion, editar, eliminar];
		var rowNode = dataTable
	    .row.add( tbl )
	    .draw()
	    .node();
	})
}
function loadInfo(especie, tabla) {
	if (tabla != ""){
		$.getJSON("/simpleWeb/json/AGRO/getMantenedorEspecie/"+especie+"/"+tabla+"/", function(data) {
			arrayFormAplic = data;
			loadTabla(data);
		});
		$("#loading").hide();
	}
}
function loadCampo(){
	$.ajax({
		url: "/simpleWeb/json/AGRO/getEspecie/Manzanas",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) { 
	        $.each(data, function(k, v) {
	        	filtro += '<option value="'+v.codigo+'">'+v.especie+'</option>';
	        });
	        $('#filtro').html(filtro);
	        cambioCampo($("#filtro")[0]);
	    }
	})
}

function cambioCampo(campo) {
	codigo = campo.value;
//	LimpiarTabla();
	loadCampo2();
}
function loadCampo2(){
	var filtro2 = "<option value=''>Seleccionar</option>";
	$.ajax({
		url: "/simpleWeb/json/AGRO/getTabla/formacion",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) { 
	        $.each(data, function(k, v) {
	        	filtro2 += '<option value="'+v.tabla+'">'+v.tabla+'</option>';
	        });
	        $('#filtro2').html(filtro2);
	        
	    }
	})
}

function cambioCampo2(tabla) {
	insertabla = tabla.value;
	loadInfo($("#filtro").val(), $("#filtro2").val());
}
function cargarRegistro(descripcion) {
//	LimpiarTabla();
	var descripc = {
		descripcion : descripcion,
		especie : codigo,
		tabla : insertabla
	}
	$.ajax({
		url : "/simpleWeb/json/AGRO/ADDMANTENEDORESP/",
		async: false,
		type : "PUT",
		data : JSON.stringify(descripc),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},success: function() {
			closeModal();
			alerta("Registrado Correctamente" + " " + $('#descripcionFormaAp').val());
			loadInfo($("#filtro").val(), $("#filtro2").val());
		}
	})
}
function addFormAP(codigo) {
	if(insertabla == ""){
		alerta("Tabla no seleccionada");
	}
	else{
		var descripcion = "";
		$.each(arrayFormAplic, function(k,v){
			if(v.codigo == codigo){
				codigo = v.codigo;
				especie = v.especie;
				tabla = v.tabla;
				descripcion = v.descripcion;
			}
		})
		var pop = '<div class="col-xs-12 col-sm-12 col-md-12" id="formProductor">'
			+'<div class="box-datos-generales" style="width: 100%">'+
			'<div class="col-xs-12 col-md-12 col-lg-12">'+
			'<div class="col-xs-12 col-md-12 col-lg-12 portlet light bordered">'+
			'<h4>Descripción</h4>'+
			'<input type="text" class="form-control" id="descripcionFormaAp'+codigo+'" value="'+descripcion+'">'
			+ '<input type="hidden" id="codigoEdit" value="'+codigo+'">'
			+ '<input type="hidden" id="codigoEditId" value="'+codigo+'">'
			+ '</div>'
			+ '</div>'
			+ '</div>'+
			'<div class="col-sm-12 col-md-12">'+
			'<div class="btn btn-circle blue btn-outline" onclick="add('+codigo+')" id="registrarFormaAp">Registrar</div>'+ 
			"&nbsp;&nbsp;&nbsp;"+ 
			'<div class="btn btn-circle red btn-outline" onclick="closeModal()" id="cancelarFormaAp">Cancelar</div>'
			+ '</div>'
			+ '</div>';
		popUp("Mantenedor", pop, true, "700px", true);
	}
}
function add(id){
	if (id == "0") {
		descripcion = $("#descripcionFormaAp"+id).val();
		cargarRegistro(descripcion);
	}
	else{
		if (!$("#descripcionFormaAp"+id).val()) {
			alerta("No ha ingresado una descripcion");
			return;
		}else{
			var descripc = {
				codigo : id,
				descripcion : $("#descripcionFormaAp"+id).val()
			}
			$.ajax({
				url : "/simpleWeb/json/work/updateDescripcionEspecie/",
				type : "PUT",
				data : JSON.stringify(descripc),
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},success: function(){
					closeModal();
					alerta("Registro modificado");
					loadInfo($("#filtro").val(), $("#filtro2").val());
				}
			})
		}
	}
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
				url: "/simpleWeb/json/work/updateEstadoEspecie/",
				data: JSON.stringify(newAplicaciones),
				beforeSend : function(xhr){
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},success:function(){
					alerta("Estado se eliminó");
					loadInfo($("#filtro").val(), $("#filtro2").val());
				},
			});
	})
//	LimpiarTabla();
	
//	$('#BodyMantenedorGenerico').html("");
}