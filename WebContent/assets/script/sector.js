var dataTable = $('#Table_mantenedor').DataTable({
	"sPaginationType" : "full_numbers",
	"filter" : false
});

$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none';
	$('#loading').hide();
	loadCampo();
	campo = $("#filtro").val();
	loadInfo($("#filtro").val());
});

var campo = "";
var arrayFormAplic;
var datos;
var sector;
var tablaFormaA = $("#Div_Table_FormaAplicacion").html();
var sectores;

$("#filtro").change(function() {
	loadInfo($("#filtro").val());
});

function loadTabla(data) {
	dataTable.clear().draw();
	var tbl = "";
	$.each(data,function(k, v) {
		$.each(SESION.sector,function(kb, vb) {
			if (v.sector == vb.sector) {
				var editar = "<div class='dropdown dropleft' style='float: left;'><button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' onclick='javascript: addFormAP("+ v.codigo+ ")' type='button' data-toggle='dropdown'><span class='fa fa-pencil-square-o fa-lg'></span></button>";
				var tbl = [ vb.sector,v.descripcion, editar ];
				var rowNode = dataTable.row
				.add(tbl).draw().node();
				
				
			}
		})

	})
}

function registrar() {
	var addDescrip = document.getElementById('BoxDescripcion').value;
	return addDescrip;
}

function agregarDescripcion(addDescrip){
	var datos = {
		codigo : codigo,
		sector : $('#BoxSector').val(),
		descripcion : $("#BoxDescripcion").val()
	}
	$.ajax({
		url : "/simpleWeb/json/AGRO/UP_SECTOR/",
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
	closeModal();
	loadInfo($("#filtro").val());
}

function loadInfo(campo) {
	if (especie != "") {
		$.getJSON("/simpleWeb/json/AGRO/GETSECTORES/" + campo + "/", function(
				data) {
			arrayFormAplic = data;
			loadTabla(arrayFormAplic);
			$('#Table_FormaAplicacion').DataTable({
				"sPaginationType" : "full_numbers",
				"filter" : false
			});
		});
		$("#loading").hide();
	}
}
function loadCampo() {
	$.each(SESION.campo, function(k, v) {
		filtro += '<option value="' + v.campo + '">' + v.descripcion
				+ '</option>';
	});
	$('#filtro').html(filtro);
}
function loadSector() {
	var sector = "<option value='' disabled selected hidden=''>Seleccione Sector</option>";
	$.each(SESION.sector, function(k, v) {
		sector += "<option value='" + v.sector + "'>" + v.sector+ "</option>";
	});
	return sector
}
// function cargarRegistro(descripcion) {
// var descripc = {
// descripcion : descripcion,
// campo : campo,
// sector : sector
// }
// console.log(descripc)
// $.ajax({
// url : "/simpleWeb/json/AGRO/ADDSECTOR_SECTOR/",
// async: false,
// type : "PUT",
// data : JSON.stringify(descripc),
// beforeSend : function(xhr) {
// xhr.setRequestHeader("Accept", "application/json");
// xhr.setRequestHeader("Content-Type", "application/json");
// },success: function() {
// closeModal();
// alerta("Registrado Correctamente" + " " + $('#descripcionFormaAp').val());
// loadInfo($("#filtro").val());
// }
// })
// }
function addPop(){
	var serviceEx = "";
	serviceEx += "<div class='col-xs-12 col-sm-12 col-md-12 portlet'>";
	serviceEx += 	"<div class='col-xs-6 col-sm-6 col-md-6'>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 			"<h5 style='color: #337ab7;font-weight: bold'>Codigo Sector</h5>";
	serviceEx += 		"</div>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12 '>";
	serviceEx += 			"<input type='text' class='form-control required-modal' id='code'>";
	serviceEx += 		"</div>";
	serviceEx += 	"</div>";
	serviceEx += 	"<div class='col-xs-6 col-sm-6 col-md-6'>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 			"<h5 style='color: #337ab7;font-weight: bold'>Descripcion Sector</h5>";
	serviceEx += 		"</div>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 			"<input type='text' class='form-control required-modal' id='desc'/>";
	serviceEx += 		"</div>";
	serviceEx += 	"</div>";
	serviceEx += "</div>";
	serviceEx += "<div style='text-align: center;'>";
	serviceEx += 	"<a class='btn green-dark submit-modal' onclick='guardarSector()'>Guardar</a>";
	serviceEx += 	"<a class='btn red' onclick='closeModal()'>Cancelar</a>";
	serviceEx += "</div>";
	popUp("Ingreso Sector: ", serviceEx, true, "600px", true);
}

function guardarSector(){
	console.log($("#code").val())
	console.log($("#desc").val())
	if(validateModal()){
		var row = {
			campo: $('#filtro').val(),
			sector: $('#code').val(),
			descripcion: $('#desc').val()
		}
		$.ajax({
			url : "/simpleWeb/json/AGRO/ADDSECTOR_SECTOR/",
			type : "PUT",
			data : JSON.stringify(row),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success: function(data){
				console.log(data)
				if(data){
					closeModal();
					alerta("Sector guardado");
					SESION = getVars();
					loadInfo($('#filtro').val())
				}
			}
		})
	}
}



function addFormAP(codigo) {
	var descripcion = "";
	$.each(arrayFormAplic, function(k, v) {
		if (v.codigo == codigo) {
			codigo = v.codigo;
			sector = v.sector;
			descripcion = v.descripcion;
		}
	})
	var pop = '<div class="col-xs-12 col-md-12 col-lg-12" id="formProductor">'
			+ '<div class="box-datos-generales" style="width: 100%">'
			+ '<div class="col-xs-12 col-md-6 col-lg-6 portlet light bordered">'
			+ '<h4>Sector</h4>'
			+ '<select id="BoxSector" class="form-control input-sm" value="'
			+ codigo
			+ '">"'
			+ loadSector()
			+ '"</select>'
			+ '<input type="hidden" id="codigoEditEspecie" value="'
			+ codigo
			+ '">'
			+ '</div>'
			+ 	'<div class="col-xs-12 col-md-12 col-lg-12 portlet light bordered">'
			+ 		'<h4>Descripción</h4>'
			+ 		'<input type="text" class="form-control ui-autocomplete-input" id="BoxDescripcion" value="'+ descripcion+ '" placeholder="Ingrese Descripción">'
			+ 		'<input type="hidden" id="codigoEdit" value="'+ codigo+ '">'
			+ 	'</div>'
//			+ '</div>'
//			+ '</div>'
			+ 	'<div class="col-xs-12 col-md-12 col-lg-12">'
			+ 		'<div class="btn btn-circle blue btn-outline" id="registrarFormaAp"   >Registrar'
			+		'</div>'
			+ 		"&nbsp;&nbsp;&nbsp;"
			+ 		'<div class="btn btn-circle red btn-outline" onclick="closeModal()" id="cancelarFormaAp">Cancelar'
			+		'</div>'
			+ 	'</div>' 
			+ '</div>';
	popUp("Mantenedor", pop, true, "700px", true);

	$("#registrarFormaAp").click(function() {
		if (!$("#BoxDescripcion").val()) {
			alerta("No ha ingresado una descripcion");
			return;
		}
//		else if(!$("#BoxSector").val()) {
//			alerta("No ha ingresado un Sector");
//			return;
//		}
		else {
			actualizarRegistro(codigo);
		}
	})
}
function actualizarRegistro(codigo) {
	var datos = {
		codigo : codigo,
//		sector : $('#BoxSector').val(),
		descripcion : $("#BoxDescripcion").val()
	}
	$.ajax({
		url : "/simpleWeb/json/AGRO/UP_SECTOR/",
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
	closeModal();
	loadInfo($("#filtro").val());
}
// function add(id){
// if (id == "0") {
// descripcion = $("#descripcionFormaAp"+id).val();
// if (!descripcion) {
// alerta("No ha ingresado una descripcion");
// return;
// }
// else{
// cargarRegistro(descripcion);
// }
// }
// else{
// if (!$("#descripcionFormaAp"+id).val()) {
// alerta("No ha ingresado una descripcion");
// return;
// }else{
// var descripc = {
// codigo : id,
// descripcion : $("#descripcionFormaAp"+id).val()
// }
//			
// $.ajax({
// url : "/simpleWeb/json/AGRO/UP_SECTOR/",
// type : "PUT",
// data : JSON.stringify(descripc),
// beforeSend : function(xhr) {
// xhr.setRequestHeader("Accept", "application/json");
// xhr.setRequestHeader("Content-Type", "application/json");
// },success: function(){
// closeModal();
// alerta("Registro modificado");
// loadInfo($("#filtro").val(), $("#filtro2").val());
// }
// })
// }
// }
// }
