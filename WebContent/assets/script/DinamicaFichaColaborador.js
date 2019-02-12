var downloadInZip = false;
var sociedadPrivilege = new Set();
var huertoPrivilege = new Set();
// Obtener Sociedades y Huertos que tiene acceso
$.each(SESION.campo, function(key, value) {
	sociedadPrivilege.add(value.idSociedad);
	huertoPrivilege.add(value.campo);
});

var rolPrivado;

$(function(){
	if(SESION.rolPrivado == 1){
		 rolPrivado = ["0", "1"];
	}else{
		rolPrivado = ["0"];
	}
});

$(document).ready(function() {

	// Cargar Formato de los Inputs
	setFormatInputs();

	// Colocar Eventos de Inputs
	setEventInputs();

	// Obtener Selects
	getSelector();

});

function getSelector() {
	
	//Obtener Sociedades
	let queryString;
	if(sociedadPrivilege == null){
		queryString = "";
	}else{
		queryString = JSON.stringify(sociedadPrivilege).slice(1,-1);
	}
		
	//Obtener sociedades
	let sociedades = $(this).getJSONSync('/simpleWeb/json/work/getSociedad/?idSociedad='+queryString);
	
	//Colocar Sociedades en el Select
	$('#idSociedad').empty();
	$('#idSociedad').append('<option value="" selected="selected">TODAS</option>');
	$('#idSociedad').setOptionsByArrayWithoutUnshift(sociedades, "sociedad", "idSociedad");

}

function setFormatInputs() {

}

// TODO: Validar Form Utilizando plugin de Jquery Validation
function validarForm(form) {

	let
	formValidation = $(form);

	formValidation.validate({
		errorElement : 'span',
		errorClass : 'help-block help-block-error',
		focusInvalid : true,
		rules : {
			idSociedad : {
				required : true
			},
		// periodo : {required : true},
		// fecha_pago : {required : true}
		},
		messages : {
			idSociedad : {
				required : 'requerido'
			},
		// periodo : { required:'requerido' },
		// fecha_pago : { required:'requerido' }
		},
		errorPlacement : function(error, element) {
			if (element.parent(".input-group").size() > 0) {
				error.insertAfter(element.parent(".input-group"));
			} else {
				error.insertAfter(element)
			}
		},
		highlight : function(element) {
			$(element).closest('.form-group').addClass('has-error');
		},
		unhighlight : function(element) {
			$(element).closest('.form-group').removeClass('has-error');
		},
		success : function(label) {
			label.closest('.form-group').removeClass('has-error');
		}
	});

	if (formValidation.valid()) {
		return true
	}

	return false

}

// TODO: Generar Documentos Masivos
function generarDocumentosMasivos() {

	
	
	// Obtener los atributos del Filtro
	let
	queryString;
	//TODO: let assaas;
	
	let sociedades;
	if($('#idSociedad').val() == ""){
		sociedades = JSON.stringify(Array.from(sociedadPrivilege)).slice(1, -1);
		
		if(sociedadPrivilege.size <= 1){
			sociedades.slice(1, -1);
		}
		
	}else{
		sociedades = $('#idSociedad').val();
	}
	let huertos;
	if($('#idHuerto').val() == ""){
		huertos = JSON.stringify(Array.from(huertoPrivilege)).slice(1, -1);
		
		if(huertoPrivilege.size <= 1){
			huertos.slice(1, -1);
		}
		
	}else{
		huertos = $('#idHuerto').val();
	}

	queryString = "idSociedad="+sociedades + "&idHuerto="+huertos;
	
	queryStringRolPrivado = "&rolPrivado="+JSON.stringify(rolPrivado).slice(1,-1);
	
	// Pasar parametros al servicio para descargar Archivos Multiples (PDF)
	let
	file = $(this)
			.getJSONSync(
					'/simpleWeb/json/work/ExcelReport/excelReportListaTrabajadores/?'
							+ queryString + queryStringRolPrivado);

	// alerta(JSON.stringify(file));

	// Descargar Archivo PDF
	window.open("/simpleWeb/json/work/showExcelReport/?FILE=" + file[0]);

}

function setEventInputs() {

	// Seleccionar el Huerto asociado a la empresa:
	$('#idSociedad').change(function() {

				$('#idHuerto').empty();
				$('#idZona').empty();
				$('#idCECO').empty();

				// Obtener Codigo de la Sociedad en base al Id:
				let
				sociedadSAP = $(this).getJSONSync("/simpleWeb/json/work/getSociedadById/"+ $('#idSociedad').val());
				
				let queryString;
				if(huertoPrivilege == null){
					queryString = "";
				}else{
					queryString = JSON.stringify(huertoPrivilege).slice(1,-1);
				}
				
				//Obtener Huerto por la Sociedad
				let huerto = $(this).getJSONSync("/simpleWeb/json/work/getCampoWithFilter/?"+"campo="+queryString+"&sociedad="+sociedadSAP.sociedad);

				// Cambiar Nombres de Propiedades por value - text
				$.each(huerto,
						function(key, object) {
							huerto[key] = renameProperty(object, "campo",
									"value");
							huerto[key] = renameProperty(object, "descripcion",
									"text");
						});

				// Llenar select de la Lista Huerto
				$('#idHuerto').setOptionsByArray(huerto);

				$('#idHuerto').prop('disabled', false);
				$('#loading').hide();

			})

	// Seleccionar el Huerto asociado a la empresa:
	$('#idHuerto').change(
			function() {

				$('#idZona').empty();
				$('#idCECO').empty();

				// Obtener Zona por el Huerto
				let
				idZona = $(this).getJSONSync(
						"/simpleWeb/json/work/getCampoByCampo/"
								+ $('#idHuerto').val());

				// Cambiar Nombres de Propiedades por value - text
				$.each(idZona, function(key, object) {
					idZona[key] = renameProperty(object, "grupo", "value");
					idZona[key] = renameProperty(object, "zona", "text");
				});

				// Llenar select de la Lista Zona
				$('#idZona').setOptionsByArray(idZona);

				$('#idZona').prop('disabled', false);

			});

	$('#idZona')
			.change(
					function() {

						$('#idCECO').empty();

						// Obtener CECO por la Zona
						let
						CECOSAP = $(this)
								.getJSONSync(
										IPSERVERSAP
												+ "JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="
												+ $('#idSociedad').val()
												+ "&GRUPO="
												+ $('#idZona').val());
						let
						CECOConCuartel = CECOSAP.COSTCENTERLIST;
						let
						CECO = new Array();

						// Cambiar Nombres de Propiedades por value - text
						$
								.each(
										CECOConCuartel,
										function(key, object) {
											if (!(object.DESCRIPT
													.indexOf("Cuartel") > -1 == true)) {
												CECOConCuartel[key] = renameProperty(
														object, "COSTCENTER",
														"value");
												CECOConCuartel[key] = renameProperty(
														object, "DESCRIPT",
														"text");
												CECO.push(CECOConCuartel[key]);
											}
										});

						// Llenar select de la Lista de CECO
						$('#idCECO').setOptionsByArray(CECO);

						$('#idCECO').prop('disabled', false);

					});

}

// TODO: GENERAR EXCEL
function generarFichaDinamicaColaborador() {

	generarDocumentosMasivos();

}

// ------------------ JQUERY OWN FUNCTIONS----------------//

// Obtener objecto JSON por Servicio synchronous
jQuery.fn.getJSONSync = function(urlServicioPath) {

	var objectData = new Object;

	$.ajax({
		type : "GET",
		async : false,
		url : urlServicioPath,
		dataType : "json",
		success : function(data) {
			objectData = data;
		},
		error : function(ex) {
			console.log('Error:' + ex);
		}
	});

	return objectData;

};

// Renombre propiedad del Objeto
function renameProperty(object, oldName, newName) {
	// Do nothing if the names are the same
	if (oldName == newName) {
		return object;
	}
	// Check for the old property name to avoid a ReferenceError in strict mode.
	if (object.hasOwnProperty(oldName)) {
		object[newName] = object[oldName];
		delete object[oldName];
	}
	return object;
};

// Pasado un Array insertar opciones en un select
jQuery.fn.setOptionsByArray = function(array) {

	var select = this;

	array.unshift({
		value : "",
		text : "TODAS"
	});

	$.each(array, function(key, value) {
		$(select).append($('<option>').text(value.text).val(value.value));
	});

};

jQuery.fn.setOptionsByArrayWithoutUnshift = function(array, nameProperty1,
		nameProperty2) {

	var select = this;

	$.each(array, function(key, value) {
		$(select).append(
				$('<option>').text(eval("value." + nameProperty1)).val(
						eval("value." + nameProperty2)));
	});

};

// Insertar objecto JSON por Servicio synchronous
jQuery.fn.setJSONSync = function(urlServicioPath, ObjectData) {

	var enviado;

	$.ajax({
		url : urlServicioPath,
		async : false,
		type : "PUT",
		data : JSON.stringify(ObjectData),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(data) {
			enviado = data;
		},
		error : function(ex) {
			console.log("Error al Insertar: " + ex);
		}

	});

	return enviado;

};

// Dado el Array y el Nombre de la Opcion retornar el Valor
function getValueByOption(array, valor, optionIn, optionOut) {

	let
	name = ""
	$.each(array, function(key, value) {

		if (value[optionIn] == valor) {
			name = value[optionOut];
			return false;
		}

	});

	return name == null ? "" : name;

};

