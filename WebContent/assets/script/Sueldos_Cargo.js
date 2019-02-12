var dataTable = $('#Table_SueldosCargo').DataTable({
	"sPaginationType" : "full_numbers",
	"filter" : false,
	"columnDefs": [
	       		{
	       	        "targets": [ 0],
	       	        "visible": false,
	       	    },
	       	]
});

$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none';
	$('#loading').hide();
	loadCampo();
	campo = $("#filtroCampo").val();
	loadInfo(campo);
	loadCargos();
});

var campo = "";
var arrayFormAplic;
var arrayCargos;
var datos;
var sector;
var tablaFormaA = $("#Div_Table_SueldosCargo").html();
var sectores;
var cod_campo;
var cargo;


$("#filtroCampo").change(function() {
	cod_campo = $("#filtroCampo").val();
	loadInfo($("#filtroCampo").val());
});

function loadTabla(data) {
	var cont = 1;
	dataTable.clear().draw();
	var tbl = "";
	$.each(data, function(k, v) {
		if(v.id == 0){
			$.each(arrayCargos, function(kb, vb) {
				if(v.cargo == vb.cargos){
					cargo = vb.id_cargo;
					
				}
			})
			var editar = "<div class='dropdown dropleft' style='float: left;'><button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' onclick='javascript: addFormAP2("+ cargo+ ")' type='button' data-toggle='dropdown'><span class='fa fa-pencil-square-o fa-lg'></span></button>";
		}else{
			var editar = "<div class='dropdown dropleft' style='float: left;'><button class='btn btn-circle yellow btn-outline btn-sm dropdown-toggle' title='Modificar' onclick='javascript: addFormAP("+ v.id+ ")' type='button' data-toggle='dropdown'><span class='fa fa-pencil-square-o fa-lg'></span></button>";
		}
		var tbl = [v.id, v.cargo,"$ "+formatNumber(v.sueldo), editar ];
		var rowNode = dataTable.row
		.add(tbl).draw().node();
		cont++;
		
	})
}
function loadInfo(campo) {
	$.getJSON("/simpleWeb/json/AGRO/GETSUELDOSCARGO/" + campo + "/", function(data) {
		arrayFormAplic = data;
		loadTabla(arrayFormAplic);
	});
	$("#loading").hide();
}
function loadCargos(campo) {
	$.getJSON("/simpleWeb/json/work/cargos/getCargos/", function(data) {
		arrayCargos = data;
	});
	$("#loading").hide();
}
function loadCampo() {
	var filtro = "";
	$.each(SESION.campo, function(k, v) {
		filtro += '<option value="' + v.campo + '">' + v.descripcion+ '</option>';
	});
	$('#filtroCampo').html(filtro);
	cod_campo = $("#filtroCampo").val();
}
function loadSector() {
	var sector = "<option value='' disabled selected hidden=''>Seleccione Sector</option>";
	$.each(SESION.sector, function(k, v) {
		sector += "<option value='" + v.sector + "'>" + v.sector+ "</option>";
	});
	return sector
}
 function cargarRegistro(cargo, sueldo) {
	 	var descripc = {
		campo : cod_campo, 
		cargo : cargo,
		sueldo : sueldo 
	 }
	 $.ajax({
		 url : "/simpleWeb/json/AGRO/INSERT_SUELDOSCARGO/",
		 async: false,
		 type : "PUT",
		 data : JSON.stringify(descripc),
		 beforeSend : function(xhr) {
			 xhr.setRequestHeader("Accept", "application/json");
			 xhr.setRequestHeader("Content-Type", "application/json");
		 },success: function() {
			 closeModal();
			 alerta('Cargo "'+cargo+'" ingresado correctamente');
			 loadInfo($("#filtroCampo").val());
		 }
		 
	 })
 }
function addFormAP(id) {
	var descripcion = "";
	$.each(arrayFormAplic, function(k, v) {
		if (v.id == id) {
			id = v.id;
			campo = v.campo;
			cargo = v.cargo;
			sueldo = v.sueldo
		}	
	})
	var pop = '<div class="col-xs-12 col-md-12 col-lg-12" id="formProductor">'
			+ 	'<div class="col-xs-12 col-md-12 col-lg-12 portlet light bordered">'
			+ 		'<h4>Sueldo</h4>'
			+ 		'<input type="text" class="form-control ui-autocomplete-input" id="BoxDescripcion" value="'+sueldo+'" placeholder="'+sueldo+'">'
			+ 		'<input type="hidden" id="codigoEdit" value="'+ id+ '">'
			+ 	'</div>'
			+ 	'<div class="col-xs-12 col-md-12 col-lg-12">'
			+		'<div class="btn btn-circle blue btn-outline" id="registrarFormaAp">Registrar</div>' 
			+ 		"&nbsp;&nbsp;&nbsp;"
			+ 		'<div class="btn btn-circle red btn-outline" onclick="closeModal()" id="cancelarFormaAp">Cancelar'
			+		'</div>'
			+ 	'</div>' 
			+ '</div>';
	popUp("Mantenedor de sueldos", pop, true, "700px", true);

	$("#registrarFormaAp").click(function() {
		if (!$("#BoxDescripcion").val()) {
			alerta("No ha ingresado un sueldo");
			return;
		}
		else {
			actualizarRegistro(id);
		}
	})
}
function addFormAP2(cargo) {
	var pop = '<div class="col-xs-12 col-md-12 col-lg-12" id="formProductor">'
			+ 	'<div class="col-xs-12 col-md-12 col-lg-12 portlet light bordered">'
			+ 		'<h4>Sueldo</h4>'
			+ 		'<input type="text" class="form-control ui-autocomplete-input" id="BoxDescripcion" value="0" placeholder="0">'
			+ 		'<input type="hidden" id="codigoEdit" value="'+ cargo+ '">'
			+ 	'</div>'
			+ 	'<div class="col-xs-12 col-md-12 col-lg-12">'
			+ 		'<div class="btn btn-circle blue btn-outline" id="registrarFormaAp">Registrar</div>'
			+ 		"&nbsp;&nbsp;&nbsp;"
			+ 		'<div class="btn btn-circle red btn-outline" onclick="closeModal()" id="cancelarFormaAp">Cancelar'
			+		'</div>'
			+ 	'</div>' 
			+ '</div>';
	popUp("Mantenedor de sueldos", pop, true, "700px", true);

	$("#registrarFormaAp").click(function() {
		if (!$("#BoxDescripcion").val()) {
			alerta("No ha ingresado un sueldo");
			return;
		}
		else {
			actualizarRegistro2(cargo);
		}
	})
}
function actualizarRegistro2(cargo) {
	var datos = {
		cargo : cargo,
		sueldo : $("#BoxDescripcion").val(),
		campo : cod_campo
	}
	console.log(datos)
	$.ajax({
		url : "/simpleWeb/json/AGRO/INSERT_SUELDOSCARGO/",
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
	loadInfo($("#filtroCampo").val());
}
function actualizarRegistro(id) {
	var datos = {
		id : id,
		sueldo : $("#BoxDescripcion").val()
	}
	$.ajax({
		url : "/simpleWeb/json/AGRO/UP_SUELDOSCARGO/",
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
	loadInfo($("#filtroCampo").val());
}
 function add(id){
	 var pop = '<div class="col-xs-12 col-md-12 col-lg-12" id="formProductor">'
			+ 	'<div class="col-xs-12 col-md-6 col-lg-6 portlet light bordered">'
			+ 		'<h4>Cargo</h4>'
			+ 		'<input type="text" class="form-control ui-autocomplete-input" id="BoxCargo" value="" placeholder="">'
			+ 	'</div>'
			+ 	'<div class="col-xs-12 col-md-6 col-lg-6 portlet light bordered">'
			+ 		'<h4>Sueldo</h4>'
			+ 		'<input type="text" class="form-control ui-autocomplete-input" id="BoxSueldo" value="" placeholder="">'
			+ 	'</div>'
			+ 	'<div class="col-xs-12 col-md-12 col-lg-12">'
			+		'<div class="btn btn-circle blue btn-outline" id="registrarFormaAp">Registrar</div>' 
			+ 		"&nbsp;&nbsp;&nbsp;"
			+ 		'<div class="btn btn-circle red btn-outline" onclick="closeModal()" id="cancelarFormaAp">Cancelar'
			+		'</div>'
			+ 	'</div>' 
			+ '</div>';
	popUp("Mantenedor de sueldos", pop, true, "700px", true);
	$("#registrarFormaAp").click(function() {
		if (!$("#BoxCargo").val()) {
			alerta("No ha ingresado un cargo");
			return;
		}
		if (!$("#BoxSueldo").val()) {
			alerta("No ha ingresado un sueldo");
			return;
		}
		else {
			cargarRegistro($("#BoxCargo").val(), $("#BoxSueldo").val());
		}
	})
 }
