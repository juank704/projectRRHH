var dataTable = $('#Table_Especie_Campo').DataTable({
	"sPaginationType" : "full_numbers",
	"filter" : false
});

$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none';
	$('#loading').hide();
	loadCampo();
	cod_campo = $("#filtro").val();
	loadInfo($("#filtro").val());
});

$("#filtro").change(function(){
	loadInfo($("#filtro").val());
	cod_campo = $("#filtro").val();
});

var arrayFormAplic;


function loadTabla(data) {
	dataTable.clear().draw();
	var tbl = "";
	$.each(data,function(k, v) {
		$.each(SESION.especie,function(kb, vb) {
			if(v.codigo_especie == vb.codigo){
				var eliminar = "<div class='dropdown dropleft' style='float: left;'><button id='CambioEstado' class='btn btn-circle red btn-outline btn-sm dropdown-toggle' title='Eliminar' onclick='javascript: CambioEstado("+v.codigo+")' type='button' data-toggle='dropdown'><span class='fa fa-trash fa-2x'></span></button>";
				var tbl = [ vb.especie, eliminar ];
				var rowNode = dataTable.row
				.add(tbl).draw().node();
			}
		})
	})
}
function loadInfo(cod_campo) {
	if (especie != "") {
		$.getJSON("/simpleWeb/json/AGRO/GETESPECIECAMPO/" + cod_campo + "/", function(data) {
			arrayFormAplic = data;
			loadTabla(arrayFormAplic);
		});
		$("#loading").hide();
	}
}
function loadCampo() {
	$.each(SESION.campo, function(k, v) {
		filtro += '<option value="' + v.campo + '">' + v.descripcion+ '</option>';
	});
	$('#filtro').html(filtro);
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
				url: "/simpleWeb/json/work/updateEspecieCampo/",
				data: JSON.stringify(newAplicaciones),
				beforeSend : function(xhr){
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},success:function(){
					alerta("Estado se eliminó");
					loadInfo($("#filtro").val(), $("#filtro2").val());
				},
			});
		loadInfo($("#filtro").val());
	})
}
function loadEspecie() {
	var especie = "<option value='' disabled selected hidden=''>Seleccione Especie</option>";
	$.each(SESION.especie, function(k, v) {
		especie += "<option value='" + v.codigo + "'>" + v.especie+ "</option>";
	});
	return especie
}
function addFormAP(codigo){
		var descripcion = "";
//		$.each(arrayFormAplic, function(k,v){
//			if(v.codigo == codigo){
//				codigo = v.codigo;
//				especie = v.especie;
//				tabla = v.tabla;
//				descripcion = v.descripcion;
//			}
//		})
		var pop = '<div class="col-xs-12 col-sm-12 col-md-12" id="formProductor">'
			+'<div class="box-datos-generales" style="width: 100%">'+
			'<div class="col-xs-12 col-md-12 col-lg-12">'+
			'<div class="col-xs-12 col-md-12 col-lg-12 portlet light bordered">'+
			'<h4>Especie</h4>'+
			'<select id="BoxEspecie" class="form-control input-sm" value="'+codigo+'">"'+ loadEspecie()+'"</select>'			
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
function add(id){
	if (id == "0") {
		especie = $("#BoxEspecie").val();
		cargarRegistro(especie);
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
function cargarRegistro(especie) {
//	LimpiarTabla();
	var descripc = {
		codigo_campo : cod_campo,
		codigo_especie : especie*1,
	}
	console.log(descripc)
	$.ajax({
		url : "/simpleWeb/json/AGRO/ADDESPECIECAMPO/",
		async: false,
		type : "PUT",
		data : JSON.stringify(descripc),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},success: function() {
			closeModal();
			alerta("Registrado Correctamente");
			loadInfo($("#filtro").val());
		}
	})
}