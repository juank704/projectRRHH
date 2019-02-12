var dataTable = $('#Table_mantenedor').DataTable({
	"sPaginationType": "full_numbers" ,
	"filter": false
	
});
var arrayData;
var nombre_variedad;
var repetido = false;
$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none';
	$('#loading').hide();
	loadCampo();
	cod_campo = $("#filtroCampo").val();
	loadEspecie();
});
function loadCampo() {
	var filtro = "";
	$.each(SESION.campo, function(k, v) {
		filtro += '<option value="' + v.campo + '">' + v.descripcion+ '</option>';
	});
	$('#filtroCampo').html(filtro);
}

$("#filtroCampo").change(function(){
	cod_campo = $("#filtroCampo").val();
	loadEspecie();
	loadInfo();
});
function loadEspecie(){
	var filtroEspecie = "<option value=''>Seleccionar</option>";
	$.ajax({
		url: "/simpleWeb/json/AGRO/Get_CampoEspecie/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function (data) { 
	        $.each(data, function(k, v) {
        		if(v.codigo_campo == cod_campo){
        			filtroEspecie += '<option value="'+v.codigo_especie+'">'+v.nombre_especie+'</option>';
        		}
	        });
	        $('#filtroEspecie').html(filtroEspecie);
	        cod_especie = $("#filtroEspecie").val();
	    }
	})
}
$("#filtroEspecie").change(function(){
	cod_especie = $("#filtroEspecie").val();
	loadInfo();
});
function loadInfo() {
	if(!cod_especie){
		loadTabla();
	}
	else{
		$.getJSON("/simpleWeb/json/AGRO/getVariedades_campo_especie/"+cod_especie+"/"+cod_campo, function(data) {
			console.log(data)
			arrayData = data;
			loadTabla(data);
		});
		$("#loading").hide();
	}
}
function loadVariedad(){
	var filtroVariedad = "<option value='0' disabled selected hidden=''>Seleccionar</option>";
	$.each(SESION.variedad, function(k, v) {
		if(v.especie == cod_especie){
			filtroVariedad += '<option value="'+v.codigo+'">'+v.variedad+'</option>';
		}
    });
	return filtroVariedad;
//    $('#filtroVariedad').html(filtroVariedad);
//    cod_variedad = $("#filtroVariedad").val();
}
function loadTabla(data) {
	dataTable.clear().draw();
	var tbl = "";
	$.each(data,function(k, v) {
		var editar = "<div class='dropdown dropleft' style='float: left;'><button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' onclick='javascript: addFormAP("+v.codigo+")' type='button' data-toggle='dropdown'><span class='fa fa-pencil-square-o fa-lg'></span></button>";
		var eliminar = "<div class='dropdown dropleft' style='float: left;'><button id='CambioEstado' class='btn btn-circle red btn-outline btn-sm dropdown-toggle' title='Eliminar' onclick='javascript: CambioEstado("+v.codigo+")' type='button' data-toggle='dropdown'><span class='fa fa-trash fa-2x'></span></button>";
		var tbl = [v.nombre_variedad, eliminar];
		var rowNode = dataTable
	    .row.add( tbl )
	    .draw()
	    .node();
	})

}
function addFormAP(codigo) {
	if(!cod_especie){
		alerta("Seleccione una especie")
	}
	else{
		var variedad = "";
		$.each(arrayData, function(k,v){
			if(v.codigo == codigo){
				codigo = v.codigo;
				campo = v.campo;
				especie = v.especie;
				variedad = v.variedad;
				nombre_variedad = v.nombre_variedad;
			}
		})
		var pop = '<div class="col-xs-12 col-sm-12 col-md-12" id="formProductor">'
			+'<div class="box-datos-generales" style="width: 100%">'+
			'<div class="col-xs-12 col-md-12 col-lg-12">'+
			'<div class="col-xs-12 col-md-12 col-lg-12 portlet light bordered">'+
			'<h4>Variedad</h4>'
			+ '<select id="variedadFormaAp'+codigo+'" class="form-control input-sm" value="'+especie+'">"'+loadVariedad()+'"</select>'
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
function add(codigo){
	repetido = false;
	if (codigo == "0") {
		variedad = $("#variedadFormaAp"+codigo).val();
		cargarRegistro(variedad);
	}
	else{
		if (!$("#variedadFormaAp"+codigo).val()) {
			alerta("No ha ingresado una descripcion");
			return;
		}else{
			var descripc = {
				codigo : codigo,
				variedad : $("#variedadFormaAp"+codigo).val()
			}
			$.ajax({
				url : "/simpleWeb/json/work/updateVariedadVariedades/",
				type : "PUT",
				data : JSON.stringify(descripc),
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},success: function(){
					closeModal();
					alerta("Registro modificado");
					loadInfo();
				}
			})
		}
	}
}
function cargarRegistro(variedad) {
	var nameVariedad = "";
	$.each(arrayData, function(k,v){
		if(variedad == v.variedad){
			repetido = true;
		}
	})
	$.each(SESION.variedad, function(k, v) {
			if(variedad==v.codigo){
				nameVariedad = v.variedad;
			}
		})
	if(!variedad){
		alerta("Seleccione una variedad")
	}
	else if(repetido==true){
		alerta(nameVariedad+" ya existe")
	}
	else{		
		var descripc = {
				variedad : variedad,
				especie : cod_especie,
				campo : cod_campo
			}
		$.ajax({
			url : "/simpleWeb/json/AGRO/AddVariedadVariedades/",
			async: false,
			type : "PUT",
			data : JSON.stringify(descripc),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},success: function() {
				closeModal();
				alerta(nameVariedad + " registrado correctamente");
				getVars();
				loadInfo();
			}
		})
	}
	
	
}
function CambioEstado(codigo){
	var nameVariedad = "";
	var c = confirmar.confirm("¿Estás seguro?")
	$(c.aceptar).click(function(){
		$.each(arrayData, function(k, v) {
			if(codigo==v.codigo){
				nameVariedad = v.nombre_variedad;
			}
		})
		var newAplicaciones = {
				codigo : codigo,
			}
			$.ajax({
				type: "PUT",
				async: false,
				url: "/simpleWeb/json/AGRO/updateEstadoVariedades/",
				data: JSON.stringify(newAplicaciones),
				beforeSend : function(xhr){
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},success:function(){
					alerta(nameVariedad+" se eliminó correctamente");
					loadInfo();
				},
			});
	})
}