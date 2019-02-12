var dataTable = $('#Table_mantenedor').DataTable({
	"sPaginationType": "full_numbers" ,
	"filter": false
	
});
$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none';
	$('#loading').hide();
	loadCampo();
	
});

var arraydata = "";
var filtro;
var filtro2;
var cod_campo;

function loadCampo(){
	$.each(SESION.campo, function(k, v) {
    	filtro += '<option value="'+v.campo+'">'+v.descripcion+'</option>';
    });
    $('#filtroCampo').html(filtro);
    cod_campo = $("#filtroCampo").val();
    loadFiltroTabla();
}
$("#filtroCampo").change(function(){
	cod_campo = $("#filtroCampo").val();
	loadFiltroTabla();
});
function loadFiltroTabla(){
	//filtro2 = '<option>Seleccionar</option>';
	$.ajax({
		url: "/simpleWeb/json/AGRO/getTablaParametros_campoByCampo/"+cod_campo,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) { 
	        $.each(data, function(k, v) {
	        	filtro2 += '<option value="'+v.tabla+'">'+v.tabla+'</option>';
	        });
	        $('#filtroTabla').html(filtro2);
	    	cod_tabla = $("#filtroTabla").val();
	        loadInfo();
	    }
	})
}
$("#filtroTabla").change(function(){
	cod_tabla = $("#filtroTabla").val();
	loadInfo();
});
function loadInfo(){
	$.getJSON("/simpleWeb/json/AGRO/getParametros_campoByCampo/"+cod_campo+"/Jefe Aplicacion", function(data) {
		arraydata = data;
		loadTabla();
	});
	$("#loading").hide();
}
function loadTabla() {
	dataTable.clear().draw();
	var tbl = "";
	$.each(arraydata,function(k, v) {
		var editar = "<div class='dropdown dropleft' style='float: left;'><button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' onclick='javascript: addFormAP("+v.codigo+")' type='button' data-toggle='dropdown'><span class='fa fa-pencil-square-o fa-lg'></span></button>";
		var eliminar = "<div class='dropdown dropleft' style='float: left;'><button id='CambioEstado' class='btn btn-circle red btn-outline btn-sm dropdown-toggle' title='Eliminar' onclick='javascript: CambioEstado("+v.codigo+")' type='button' data-toggle='dropdown'><span class='fa fa-trash fa-2x'></span></button>";
		var tbl = [v.descripcion, editar, eliminar];
		var rowNode = dataTable
	    .row.add( tbl )
	    .draw()
	    .node();
	})
}
function addFormAP(codigo) {
	var descripcion = "";
	$.each(arraydata, function(k,v){
		if(v.codigo == codigo){
			codigo = v.codigo;
			id = v.id;
			campo = v.campo;
			descripcion = v.descripcion;
		}
	})
	var pop = '<div class="col-xs-12 col-sm-12 col-md-12" id="formProductor">'
		+'<div class="box-datos-generales" style="width: 100%">'+
		'<div class="col-xs-12 col-md-12 col-lg-12">'+
		'<div class="col-xs-12 col-md-12 col-lg-12 portlet light bordered">'+
		'<h4>Nombre:</h4>'+
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
	popUp("Jefe de aplicación", pop, true, "700px", true);
	
}
function add(codigo){
	if (codigo == "0") {
		descripcion = 'Jefe Aplicacion';
		cargarRegistro($("#descripcionFormaAp"+codigo).val());
	}
	else{
		if (!$("#descripcionFormaAp"+codigo).val()) {
			alerta("No ha ingresado una descripcion");
			return;
		}else{
			var descripc = {
				codigo : codigo,
				descripcion : $("#descripcionFormaAp"+codigo).val()
			}
			$.ajax({
				url : "/simpleWeb/json/work/updateParametros_campoByCampo/",
				type : "PUT",
				data : JSON.stringify(descripc),
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},success: function(){
					closeModal();
					alerta("Nombre modificado");
					loadInfo();
				}
			})
		}
	}
}
function cargarRegistro(descripcion) {
	var descripc = {
		descripcion : descripcion,
		campo : cod_campo,
		tabla : 'Jefe Aplicacion'
	}
	if(!descripcion){
		alerta("No ha ingresado un nombre");
	}else{
		$.ajax({
			url : "/simpleWeb/json/AGRO/INSERT_PARAMETROS_CAMPO/",
			async: false,
			type : "PUT",
			data : JSON.stringify(descripc),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},success: function() {
				closeModal();
				alerta('"'+descripcion+'"' + " registrado Correctamente");
				loadInfo();
			}
		})
	}
}
function CambioEstado(codigo){
	var c = confirmar.confirm("¿Estás seguro?")
	$(c.aceptar).click(function(){
		var newAplicaciones = {
				codigo : codigo,
			}
			$.ajax({
				type: "PUT",
				async: false,
				url: "/simpleWeb/json/work/updateParametros_campo/",
				data: JSON.stringify(newAplicaciones),
				beforeSend : function(xhr){
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},success:function(){
					alerta("Jefe de aplicación eliminado correctamente");
					loadInfo();
				},
			});
	})
}