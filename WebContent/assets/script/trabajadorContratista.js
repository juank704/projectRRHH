var objContrato;
var contratistaGlobal;
var editTrabajador = false;
// Options Academicos
var optionsNivel = [];
var optionsCarrera = [];
var optionsInstituciones = [];
var optionsNombreInstitucion = [];

$(document).ready(function() {
	
	$(document).find('.btn_save, btn_edit, btn_update').hide();

	event.preventDefault();

	//Selectores
	getSelector();
	
	// Cargar Formatos de Inputs
	setFormatInputs();
	
	//Logica de Inputs
	setLogicEventInputs();
	
	//Agregar Elementos que modifican el estilo
	setStyleInView();

	//Obtener Trabajador de la URL
	let idTrabajador;
	try{
		idTrabajador = getINFO().id;

	}catch(error){
		idTrabajador = -1;
	}
	
	//Tiene Detalle?
	if(idTrabajador > 0){
		
		//Cargar Datos
		loadWorker(idTrabajador);
		//Ocultar Boton de Guardar
		$(document).find('.btn_save').hide();
		//Mostrar Boton de Editar
		$(document).find('.btn_edit').show();
		//Block Inputs
		$(document).find('input, select').each(function(){ $(this).attr('disabled', 'disabled') });
		
		//Colocar los checkbox editables para cerrar y abrir las opciones
		$(document).find('.checkboxCollapse').attr('disabled', false);
		$(document).find('#razonSocial').each(function(){ $(this).attr('disabled', 'disabled')});
		
	}else{
		$(document).find('.btn_save').show();
		$(document).find('.btn_edit').hide();	
	}

	if(editTrabajador == true){
		$(this).collapseInformation('#idContratista');
		$('#idContratista').val(contratistaGlobal.idContratista.substring(2));
	}
	
	
});


$('#btnEdit').click(function(){
	
	alerta("editar");
	$(document).find('#btnUpdate').show();
	$(document).find('.btn_cancel').show();
	$(document).find('.btn_edit').hide();
	
	$(document).find('input, select')
	.attr('contenteditable', 'true')
	.attr('edit_type', 'button')
	.addClass('bg-warning')
	.css('padding','0px')
	.attr('readonly', false)
	.attr('disabled', false)
	.css('background-color','#f9e491');
	
	$('span.select2-selection.select2-selection--single').css('background-color','#f9e491');
	
	
});


$('#btnUpdate').click(function(){
	
var formValidateUpdate = $('#insertarTrabajadorForm2');
	
	formValidateUpdate.validate({

		errorElement : 'span',
		errorClass : 'help-block help-block-error',
		focusInvalid : true,
		rules : {	
			rut : {required : function(element){ return $("#idNacionalidad").find("option:selected").text() == 'Chileno'; },
			},
			rutTemporal : {required : function(element){ return $("#idNacionalidad").find("option:selected").text() != 'Chileno'; },
			},
			pasaporte : { required : function(element){ return $("#idNacionalidad").find("option:selected").text() != 'Chileno'; } },
			nombre : {required : true},
			apellidoPaterno : {required : true},
			fNacimiento : {required : true, underAge: false },
			idGenero : {required : true},
			idNacionalidad : {required : true},
			idEstadoCivil : {required : true},
			telefono: {required: false},
			celular: {required: false},
			email : {required : false, email : true},
			direccion : {required : false},
			idRegion : {required : true},
			idProvincia : {required : true},
			idComuna : {required : true},
			tipoTrabajador : {required : true},
			idTurno : {required : false},
			cargo : {required : true},
			posicion : {required : true},
			sociedad : {required : true},
			idHuerto : {required : true},
			idZona : {required : true},
			idCECO : {required : true},
			fecha_inicio_actividad : {required : true},
			fecha_termino_actividad : {required : false },
			fechaIngresoCompania : {required : true},
			hrs_semanal : {required : true},
			tipoContrato : {required : true},
			sueldo_mensual : {required : false},
			emailEmergencia : {email : true},
			colacionFija : {required : "#valorFijo:checked"},
			movilizacionFija : {required : "#valorFijo:checked"},

			// Salud
			idAFP : {required : true}, 
			idIsapre : {required : true},
			idMonedaPlan : {required :  function(element){ return $("#idIsapre").val() != 13; }},
			valorPlan :    {required :  function(element){ return $("#idIsapre").val() != 13; }},

			// AFP
			idMonedaAFP : {required : true}, 
			valorAFP : {required : true},

			// Educacion Validaciones
			nivel                 : { required : function(element){ return $("#nivelEducacion").val() >= 2; } },
			carrera               : { required : function(element){ return $("#nivelEducacion").val() >= 2; } },
			instituciones         : { required : function(element){ return $("#nivelEducacion").val() >= 3; } },
			nombreInstitucion     : { required : function(element){ return $("#nivelEducacion").val() >= 3; } },
			fechaDesdeInstitucion : { required : function(element){ return $("#nivelEducacion").val() >= 3; } },

			// APV
			idMonedaAPV           : { required : function(element){ return $("#institucionAPV").val() >= 1; } },
			valorDepositoAPV      : { required : function(element){ return $("#institucionAPV").val() >= 1; } },
			valorAPV			  : { required : function(element){ return $("#institucionAPV").val() >= 1; } },
			nContrato			  : { required : function(element){ return $("#institucionAPV").val() >= 1; } },

			// Discapacidad
			nCredencial 		 	: { required : '#capacidades:checked' },
			fechaReevaluacion 		: { required : '#capacidades:checked' },
			gradoDiscapacidad 		: { required : '#capacidades:checked' },
			porcentajeDiscapacidad 	: { required : '#capacidades:checked' },
			causaDiscapacidad 		: { required : '#capacidades:checked' },
			movilidadReducida 		: { required : '#capacidades:checked' },
			
			idContratista : { required : true }


		},
		messages : {
			rut : { required:'requerido' },
			rutTemporal : { required:'requerido' },
			pasaporte : { required:'requerido' },
			nombre : {required : 'requerido'},
			apellidoPaterno : {required : 'requerido'},
			fNacimiento : {required : 'requerido'},
			idGenero : {required : 'requerido'},
			idNacionalidad : {required : 'requerido'},
			idEstadoCivil : {required : 'requerido'},
			telefono : {required : 'requerido'},
			celular : {required : 'requerido'},
			email : {required : 'requerido', email : 'Inserte un email valido'},
			direccion : {required : 'requerido'},
			idRegion : {required : 'requerido'},
			idProvincia : {required : 'requerido'},
			idComuna : {required : 'requerido'},
			tipoTrabajador : {required : 'requerido'},
			idTurno : {required : 'requerido'},
			cargo : {required : 'requerido'},
			posicion : {required : 'requerido'},
			sociedad : {required : 'requerido'},
			idHuerto : {required : 'requerido'},
			idZona : {required : 'requerido'},
			idCECO : {required : 'requerido'},
			fecha_inicio_actividad : {required : 'requerido'},
			fecha_termino_actividad : {required : 'requerido'},
			fechaIngresoCompania : {required : 'requerido'},
			hrs_semanal : {required : 'requerido'},
			tipoContrato : {required : 'requerido'},
			sueldo_mensual : {required : 'requerido'},
			emailEmergencia : {required : 'requerido' ,email : 'Inserte un email Valido'},
			colacionFija : {required : 'requerido'},
			movilizacionFija : {required : 'requerido'},

			// Salud
			idAFP : {required : 'requerido' }, 
			idIsapre : {required : 'requerido' },
			idMonedaPlan : {required : 'requerido' },
			valorPlan : {required : 'requerido' },

			// AFP
			idMonedaAFP : {required : 'requerido' }, 
			valorAFP : {required : 'requerido' },


			// Educacion Validaciones
			nivel : { required : 'requerido' },
			carrera : { required : 'requerido' },
			instituciones : { required : 'requerido' },
			nombreInstitucion : { required : 'requerido' },
			fechaDesdeInstitucion : { required : 'requerido' },

			// APV
			idMonedaAPV : { required : 'requerido' },
			valorDepositoAPV : { required : 'requerido' },
			valorAPV : { required : 'requerido' },
			nContrato : { required : 'requerido' },

			// Discapacidad
			nCredencial 		 	: {  required : 'requerido' },
			fechaReevaluacion 		: {  required : 'requerido' },
			gradoDiscapacidad 		: {  required : 'requerido' },
			porcentajeDiscapacidad 	: {  required : 'requerido' },
			causaDiscapacidad 		: {  required : 'requerido' },
			movilidadReducida 		: {  required : 'requerido' },
			
			idContratista : { required : 'requerido' }

		},
		errorPlacement : function(error, element) { error.insertAfter(element) },
		success : function(label) {label.closest('.form-group').removeClass('has-error');}
	});
	
if(formValidateUpdate.valid()){
		
	updateWorker();
		
	}
	
	
	
	
});



$('#btnSave').click(function(){
	
	var formValidateInsert = $('#insertarTrabajadorForm2');
	
	formValidateInsert.validate({

		errorElement : 'span',
		errorClass : 'help-block help-block-error',
		focusInvalid : true,
		rules : {	
			rut : {required : function(element){ return $("#idNacionalidad").find("option:selected").text() == 'Chileno'; },
				remote : {
					url: "/simpleWeb/json/work/existTrabajadorByRut",
					type: "post",
					dataFilter: function (data) {
						var json = JSON.parse(data);
						if (json.rut) {
							return "\"" + "El rut ya existe" + "\"";
						} else {
							return 'true';
						}
					}
				}, 
			},
			rutTemporal : {required : function(element){ return $("#idNacionalidad").find("option:selected").text() != 'Chileno'; },
				remote : {
					url: "/simpleWeb/json/work/existTrabajadorByRutTemporal",
					type: "post",
					dataFilter: function (data) {
						var json = data;
						if (json == true) {
							return "\"" + "El rut provisorio ya existe" + "\"";
						} else {
							return 'true';
						}
					}
				}, 
			},
			pasaporte : { required : function(element){ return $("#idNacionalidad").find("option:selected").text() != 'Chileno'; } },
			nombre : {required : true},
			apellidoPaterno : {required : true},
			fNacimiento : {required : true, underAge: false },
			idGenero : {required : true},
			idNacionalidad : {required : true},
			idEstadoCivil : {required : true},
			telefono: {required: false},
			celular: {required: false},
			email : {required : false, email : true},
			direccion : {required : false},
			idRegion : {required : true},
			idProvincia : {required : true},
			idComuna : {required : true},
			tipoTrabajador : {required : true},
			idTurno : {required : true},
			cargo : {required : true},
			posicion : {required : false},
			sociedad : {required : true},
			idHuerto : {required : true},
			idZona : {required : true},
			idCECO : {required : true},
			fecha_inicio_actividad : {required : true},
			fecha_termino_actividad : {required : false },
			fechaIngresoCompania : {required : false},
			hrs_semanal : {required : true},
			tipoContrato : {required : true},
			sueldo_mensual : {required : false},
			emailEmergencia : {email : true},
			colacionFija : {required : "#valorFijo:checked"},
			movilizacionFija : {required : "#valorFijo:checked"},

			// Salud
			idAFP : {required : true}, 
			idIsapre : {required : true},
			idMonedaPlan : {required :  function(element){ return $("#idIsapre").val() != 13; }},
			valorPlan :    {required :  function(element){ return $("#idIsapre").val() != 13; }},

			// AFP
			idMonedaAFP : {required : true}, 
			valorAFP : {required : true},

			// Educacion Validaciones
			nivel                 : { required : function(element){ return $("#nivelEducacion").val() >= 2; } },
			carrera               : { required : function(element){ return $("#nivelEducacion").val() >= 2; } },
			instituciones         : { required : function(element){ return $("#nivelEducacion").val() >= 3; } },
			nombreInstitucion     : { required : function(element){ return $("#nivelEducacion").val() >= 3; } },
			fechaDesdeInstitucion : { required : function(element){ return $("#nivelEducacion").val() >= 3; } },

			// APV
			idMonedaAPV           : { required : function(element){ return $("#institucionAPV").val() >= 1; } },
			valorDepositoAPV      : { required : function(element){ return $("#institucionAPV").val() >= 1; } },
			valorAPV			  : { required : function(element){ return $("#institucionAPV").val() >= 1; } },
			nContrato			  : { required : function(element){ return $("#institucionAPV").val() >= 1; } },

			// Discapacidad
			nCredencial 		 	: { required : '#capacidades:checked' },
			fechaReevaluacion 		: { required : '#capacidades:checked' },
			gradoDiscapacidad 		: { required : '#capacidades:checked' },
			porcentajeDiscapacidad 	: { required : '#capacidades:checked' },
			causaDiscapacidad 		: { required : '#capacidades:checked' },
			movilidadReducida 		: { required : '#capacidades:checked' },
			
			idContratista : { required : true }


		},
		messages : {
			rut : { required:'requerido' },
			rutTemporal : { required:'requerido' },
			pasaporte : { required:'requerido' },
			nombre : {required : 'requerido'},
			apellidoPaterno : {required : 'requerido'},
			fNacimiento : {required : 'requerido'},
			idGenero : {required : 'requerido'},
			idNacionalidad : {required : 'requerido'},
			idEstadoCivil : {required : 'requerido'},
			telefono : {required : 'requerido'},
			celular : {required : 'requerido'},
			email : {required : 'requerido', email : 'Inserte un email valido'},
			direccion : {required : 'requerido'},
			idRegion : {required : 'requerido'},
			idProvincia : {required : 'requerido'},
			idComuna : {required : 'requerido'},
			tipoTrabajador : {required : 'requerido'},
			idTurno : {required : 'requerido'},
			cargo : {required : 'requerido'},
			posicion : {required : 'requerido'},
			sociedad : {required : 'requerido'},
			idHuerto : {required : 'requerido'},
			idZona : {required : 'requerido'},
			idCECO : {required : 'requerido'},
			fecha_inicio_actividad : {required : 'requerido'},
			fecha_termino_actividad : {required : 'requerido'},
			fechaIngresoCompania : {required : 'requerido'},
			hrs_semanal : {required : 'requerido'},
			tipoContrato : {required : 'requerido'},
			sueldo_mensual : {required : 'requerido'},
			emailEmergencia : {required : 'requerido' ,email : 'Inserte un email Valido'},
			colacionFija : {required : 'requerido'},
			movilizacionFija : {required : 'requerido'},

			// Salud
			idAFP : {required : 'requerido' }, 
			idIsapre : {required : 'requerido' },
			idMonedaPlan : {required : 'requerido' },
			valorPlan : {required : 'requerido' },

			// AFP
			idMonedaAFP : {required : 'requerido' }, 
			valorAFP : {required : 'requerido' },


			// Educacion Validaciones
			nivel : { required : 'requerido' },
			carrera : { required : 'requerido' },
			instituciones : { required : 'requerido' },
			nombreInstitucion : { required : 'requerido' },
			fechaDesdeInstitucion : { required : 'requerido' },

			// APV
			idMonedaAPV : { required : 'requerido' },
			valorDepositoAPV : { required : 'requerido' },
			valorAPV : { required : 'requerido' },
			nContrato : { required : 'requerido' },

			// Discapacidad
			nCredencial 		 	: {  required : 'requerido' },
			fechaReevaluacion 		: {  required : 'requerido' },
			gradoDiscapacidad 		: {  required : 'requerido' },
			porcentajeDiscapacidad 	: {  required : 'requerido' },
			causaDiscapacidad 		: {  required : 'requerido' },
			movilidadReducida 		: {  required : 'requerido' },
			
			idContratista : { required : 'requerido' }

		},
		errorPlacement : function(error, element) { error.insertAfter(element) },
		success : function(label) {label.closest('.form-group').removeClass('has-error');}
	});
	
	if(formValidateInsert.valid()){
		insertWorker();
	}
	
	
});



function updateWorker(){
	
	var codigoGlobal = $('#codigo').val();
	var idTrabajador = getINFO().id;
	
	// Obtener Datos de Trabajador de los Inputs
	var arr = $(document).find('.row_data').getObjectByInputs();
	//Obtener Datos de Trabajador Laboral
	var arrLaboral = $(document).find('.row_dataLaboral').getObjectByInputs();
	// Obtener Datos de Institucion del Trabajador
	var arrConducir = $(document).find('.row_dataConducir').getObjectByInputs();
	
	//Actualizar TODO:
	arrLaboral.cargo = 0;
	
	if($('#razonSocial').val() == 1){
		$.extend(arr, {razonSocial:1} );
	}
	
	$.extend(arr, {codigo:codigoGlobal}, {id:idTrabajador});
	
	codigoGlobal = $(this).getJSONSync("/simpleWeb/json/work/getCodigoByIdTrabajador/"+idTrabajador)
	
	$.extend(arr, {agro : 1}, {tipoTrabajador : 4} );
	debugger;
	$.extend(arrLaboral, {codigo_trabajador:codigoGlobal}, {estado_contrato:1});
	$.extend(arrConducir, {codigo:codigoGlobal});
	
	let contratista = arr.idContratista
	$.extend(arr, { idContratista : "00" + contratista });
	
	
	//Actualizar Trabajador
	$(this).setJSONSync("/simpleWeb/json/work/updateTrabajador/",arr);
	
	// Actualizar Contrato
	let contratoVar = $(this).getJSONSync("/simpleWeb/json/work/contrato/getContratoWithFilter/?codigo_trabajador="+codigoGlobal);
	
	if(!(contratoVar.length > 0)){
		addnewWorkerLaboral(arrLaboral,codigoGlobal);
	}
	
	if((contratoVar.length > 0)){
	$.extend(arrLaboral, { id  : contratoVar[0].id }); 
	}
		
	let updateContratista = $(this).setJSONSync("/simpleWeb/json/work/updateContratoTrabajador/",arrLaboral);
	
	swal({title: 'Trabajador Actualizado con exito'}).then(function(result) {
		if(result.value){
			location.reload()
		};
	});
		
}

function insertWorker(){
	
	var codigoGlobal;
	
	// Obtener Datos de Trabajador de los Inputs
	var arr = $(document).find('.row_data').getObjectByInputs();
	//Obtener Datos de Trabajador Laboral
	var arrLaboral = $(document).find('.row_dataLaboral').getObjectByInputs();
	// Obtener Datos de Institucion del Trabajador
	var arrConducir = $(document).find('.row_dataConducir').getObjectByInputs();
	
	codigoGlobal = addnewWorker(arr);
	addnewWorkerConducir(arrConducir,codigoGlobal);
	//addnewWorkerCuenta(listaCuenta,codigoGlobal);
	
	addnewWorkerLaboral(arrLaboral,codigoGlobal);
	//addnewWorkerDiscapacidad(arrDiscapacidad,codigoGlobal);
	
	// Insertar datos en la tabla sw_r_trabajadorPeriodo
	addnewWorkerTrabajadorPeriodo(codigoGlobal);
	
	//Insertar datos en la tabla sw_r_anexoContrato
	addnewWorkerAnexoContrato(codigoGlobal);
	
	
	swal({title: 'Trabajador Agregado con exito',
		html: ' <h3> Se generó con Código : '+codigoGlobal+'</h3>' }).then(function(result) {
		if(result.value){
			location.reload()
		};
	});

	
}


function setFormatInputs(){
	
	// Validador de Rut
	$('#rutWorker, #rutTemporal').Rut({format_on: 'keyup'});

	// Formato numero de Telefono
	$('#phoneCasa, #telefonoEmergencia').mask('(00) 0000-0000');
	$('#celular').mask('(00) 0000-0000');
	
	//Formato de Porcentaje
	$('#porcentajeDiscapacidad').mask('##0,00%', {reverse: true});
	
	//Formato de Fecha
	$('.dateWork').each(function(key, value){
		$(value).mask("00-00-0000", {placeholder: "__-__-____"});
	});

	// Formato de Moneda
	$('.moneyWork').each(function(key, value){
		
		$(value)
		.blur(function() {
			$(this).formatCurrency({ symbol:'', colorize: true, negativeFormat: '-%n', roundToDecimalPlace: -1, digitGroupSymbol: '.', decimalSymbol: ',' });
		})
		.keyup(function(e) {
				var e = window.event || e;
				var keyUnicode = e.charCode || e.keyCode;
				if (e !== undefined) {
					switch (keyUnicode) {
						case 16: break; // Shift
						case 17: break; // Ctrl
						case 18: break; // Alt
						case 27: this.value = ''; break; // Esc: clear entry
						case 35: break; // End
						case 36: break; // Home
						case 37: break; // cursor left
						case 38: break; // cursor up
						case 39: break; // cursor right
						case 40: break; // cursor down
						case 78: break; // N (Opera 9.63+ maps the "." from the
										// number key section to the "N" key
										// too!) (See:
										// http://unixpapa.com/js/key.html
										// search for ". Del")
						case 110: break; // . number block (Opera 9.63+ maps
											// the "." from the number block to
											// the "N" key (78) !!!)
						case 190: break; // .
						default: $(this).formatCurrency({  colorize: true, negativeFormat: '-%n', digitGroupSymbol: '.', decimalSymbol: ',', roundToDecimalPlace: -1, eventOnDecimalsEntered: true });
					}
				}
			})
			.bind('decimalsEntered', function(e, cents) {
				if (String(cents).length > 3) {
					$(this).formatCurrency({ symbol:'', colorize: true, negativeFormat: '-%n', digitGroupSymbol: '.', decimalSymbol: ',', roundToDecimalPlace: 3, eventOnDecimalsEntered: true });
				}
			});
	});
	
		
}

function setStyleInView(){
	
	
	// Colocar todos los select en mayusculas
	$(document).find('input, select').each(function(key, value){
		$(value).addClass('mayusculasWork');
	});
	
	
	//Colocar los checkbox editables para cerrar y abrir las opciones
	$(document).find('.checkboxCollapse').attr('disabled', false);

	
}


function loadWorker(id){

	//Obtener Trabajador
	var trabajador = $(this).getJSONSync("/simpleWeb/json/work/getTrabajadorById/"+id);
	//debugger;
	//Parche cuando es Razon Social TODO:Modificar
	if(trabajador.razonSocial == 1){
		$(this).collapseInformation('.row_data');
		$(this).collapseInformation('#pasaporte');
		$(this).collapseInformation('#rutTemporal');
		$(this).collapseInformation('#sueldoMensual');
		$(this).collapseInformation('.row_dataAhorroAFP');
		$(this).collapseInformation('#valorPlan');
		$(this).collapseInformation('#idMonedaPlan');
		$(this).collapseInformation('.row_dataEmergencia');
		$(this).collapseInformation('#sueldo_mensual');
		$(this).collapseInformation('#cargo');
		$(this).collapseInformation('#supervisor');
		$(this).collapseInformation('#maquinista');
		//$(this).collapseInformation('#textContratista');
		$(this).collapseInformation('#rutWorker');
		$(this).collapseInformation('#name2');
		
		$('#rutWorker').val(trabajador.rut);
		$('#name2').val(trabajador.nombre);
		$('#razonSocial').val(1)
		$('#razonSocial').attr('checked', 'checked');
		
	}
	
	//Datos de Cabecera
	$(".cabecera").show();
	
	$("#name").html(trabajador.apellidoPaterno +" "+trabajador.apellidoMaterno+", "+trabajador.nombre);
	$("#codigo").html(trabajador.codigo);
	
	if(trabajador.pasaporte != ""){
		$("#labelRut").text('Pasaporte: ');
		$("#rutWorkerHead").html(" "+trabajador.pasaporte);
	}else if(trabajador.rutTemporal != ""){
		$("#labelRut").text('RUT Temporal: ');
		$("#rutWorkerHead").html(" "+trabajador.rutTemporal);
	}else if(trabajador.rut != ""){
		$("#rutWorkerHead").html(" "+trabajador.rut);
	}else{
		$("#rutWorkerHead").html(" "+trabajador.rut);
	}
	
	$("#phoneWorker").html(trabajador.telefono);
	$("#direWorker").html(trabajador.direccion);
	$("#inWorker").html(changeDateformatDDMMYY(trabajador.fechaIngresoCompania));
	
	//Obtener Datos Contrato
	var contrato = $(this).getJSONSync("/simpleWeb/json/work/getUltimoContratoActivoByIdTrabajador/"+trabajador.codigo);
	
	//Obtener todos los valores de Trabajdor e insertarlo en input
	$(this).setJSONToInputs(".row_dataLaboral", contrato);
	//Obtener todos los valores de Trabajdor e insertarlo en input
	$(this).setJSONToInputs(".row_data", trabajador);
	
	//Razon Social
	$('#razonSocial').val(trabajador.razonSocial);
	contratistaGlobal = trabajador;
	editTrabajador = true;


}




$(document).on('change', '#nivelEducacion', function(){

	$('#nivel').empty().data('options');
	$('#carrera').empty().data('options');
	$('#instituciones').empty().data('options');
	$('#nombreInstitucion').empty().data('options');

	var optionNivel = [];
	var optionCarrera = [];
	var optionInstituciones = [];
	var optionNombreInstitucion = [];

	if(this.value == $('#nivelEducacion option:contains("Sin Escolaridad")').val()){

		optionNivel = optionsNivel.slice(0,1);
		optionCarrera = optionsCarrera.slice(0,1);
		optionInstituciones = optionsInstituciones.slice(0,1); 
		optionNombreInstitucion = optionsNombreInstitucion.slice(0,1); 

	}
	else if(this.value == $('#nivelEducacion option:contains("Basica")').val()){

		optionNivel = optionsNivel.slice(0,3);
		optionCarrera = optionsCarrera;
		optionInstituciones = optionsInstituciones;
		optionNombreInstitucion = optionsNombreInstitucion;

	}
	else{
		optionNivel = optionsNivel;
		optionCarrera = optionsCarrera;
		optionInstituciones = optionsInstituciones;
		optionNombreInstitucion = optionsNombreInstitucion; 
	}


	$('#nivel').setOptionsByArray(optionNivel);
	$('#carrera').setOptionsByArray(optionCarrera);
	$('#instituciones').setOptionsByArray(optionInstituciones);
	$('#nombreInstitucion').setOptionsByArray(optionNombreInstitucion);


});


window.onload = function(){
	$("#loading").hide();
}

function getId(){
	var location = document.location.href;
	if(location.indexOf('?')>0){
		var getString = location.split('?')[1];
		var GET = getString.split('&');
		var get = {};
		for(var i = 0, l = GET.length; i < l; i++){
			var tmp = GET[i].split('=');
			get[tmp[0]] = unescape(decodeURI(tmp[1]));
		}
		return get;
	}
}



// Seleccionar Provincia
$(document).on('change', '#idRegion', function(){

	$('#idProvincia').html('<option value="">Seleccione...</option>');
	$('#idComuna').html('<option value="">Seleccione...</option>');

	// Servicio para Obtener Provincia dado una Region
	$.ajax({
		type : "GET",
		url : '/simpleWeb/json/work/getProvinciaByIdRegion/'+$("#idRegion").val(),
		async: false,
		dataType : "json",
		success : function(data) {
			$.each(data, function(key, registro) {

				$("#idProvincia").append(
						'<option value=' + registro.id + '>'
						+ registro.nombre + '</option>');
			});
		}
	});



});

// Seleccionar Comuna
$(document).on('change', '#idProvincia', function(){

	$('#idComuna').html('<option value="">Seleccione...</option>');

	// Servicio para Obtener Comuna dado una provincia
	$.ajax({
		type : "GET",
		url : '/simpleWeb/json/work/getComunaByIdProvincia/'+$("#idProvincia").val(),
		async: false,
		dataType : "json",
		success : function(data) {
			$.each(data, function(key, registro) {

				$("#idComuna").append(
						'<option value=' + registro.id + '>'
						+ registro.nombre + '</option>');
			});
		}
	});



});

function setLogicEventInputs(){
	
	//Formato Rut
	$('#rutWorker, #rutTemporal').Rut({format_on: 'keyup'})
	
	// Formato numero de Telefono
	$('#phoneCasa, #telefonoEmergencia').mask('(000) 0000-0000');
	$('#celular').mask('(000) 0000-0000');
	$('#porcentajeDiscapacidad').mask('##0,00%', {reverse: true});
	
	// Fecha de Nacimiento Si es menor de Edad
	$( "#fNacimiento" ).datepicker({ 
		dateFormat: 'dd-mm-yy', 
		changeMonth: true, 
		changeYear: true,
		onSelect: function(value, ui) {
			var today = new Date(), 
			age = today.getFullYear() - ui.selectedYear;
			age < 18 ? alerta('Persona menor a 18 años') : ""
		},
		yearRange: "1930:+10"

	});

	// Fechas
	$( ".dateWork" ).datepicker({ dateFormat: 'dd-mm-yy', changeMonth: true, changeYear: true, yearRange: "1930:+10" });

	$(document).find('.btn_save').show();
	$(document).find('.btn_cancel').show();
	
	// Pre-Defaults:
	$('.checkboxOption').on('change', function(){
		this.value = this.checked ? 1 : 0;
	}).change();
	
	//Opciones de Defaults:
	//Nacionalidad Chileno
	$('#idNacionalidad option:contains("Chileno")').prop('selected',true);
	//Salud Fonasa
	$('#idIsapre option:contains("Fonasa")').prop('selected',true);
	//AFP Modelo
	$('#idAFP option:contains("AFP Modelo")').prop('selected',true);


	// Si es Extranjero Ingresar Pasaporte y Rut Temporal
	$(document).bind('change load', '#idNacionalidad', function(){

		if($('#idNacionalidad').find('option:selected').text() == "Chileno"){

			$(document).find('#pasaporte').closest('tr').removeClass('tr-display-table-row');
			$(document).find('#pasaporte').closest('tr').addClass('tr-display-none');

			$(document).find('#rutTemporal').closest('tr').removeClass('tr-display-table-row');
			$(document).find('#rutTemporal').closest('tr').addClass('tr-display-none');

			$('#pasaporte').val('');
			$('#rutTemporal').val('');

		}
		else{

			$(document).find('#pasaporte').closest('tr').addClass('tr-display-table-row');
			$(document).find('#pasaporte').closest('tr').removeClass('tr-display-none');

			$(document).find('#rutTemporal').closest('tr').addClass('tr-display-table-row');
			$(document).find('#rutTemporal').closest('tr').removeClass('tr-display-none');

			$('#rutWorker').val('');

		}

	});

	// Filtros para Nivel Academico del Trabajador
	$('#nivel').getOptionsBySelect(optionsNivel);
	$('#carrera').getOptionsBySelect(optionsCarrera);
	$('#instituciones').getOptionsBySelect(optionsInstituciones);
	$('#nombreInstitucion').getOptionsBySelect(optionsNombreInstitucion);
	
	// Si es discapacidato Llenar datos de Discapacitacion
	$('#capacidades').on('change', function(){
		this.value = this.checked ? 1 : 0;

		if(this.checked == true){
			$(document).find('#nCredencial,#fechaReevaluacion,#gradoDiscapacidad,#porcentajeDiscapacidad,#causaDiscapacidad,#movilidadReducida').closest('tr').removeClass('tr-display-none');
			$(document).find('#nCredencial,#fechaReevaluacion,#gradoDiscapacidad,#porcentajeDiscapacidad,#causaDiscapacidad,#movilidadReducida').closest('tr').addClass('tr-display-table-row');
		}else{
			$(document).find('#nCredencial,#fechaReevaluacion,#gradoDiscapacidad,#porcentajeDiscapacidad,#causaDiscapacidad,#movilidadReducida').closest('tr').addClass('tr-display-none');
			$(document).find('#nCredencial,#fechaReevaluacion,#gradoDiscapacidad,#porcentajeDiscapacidad,#causaDiscapacidad,#movilidadReducida').closest('tr').removeClass('tr-display-table-row');
		}

	}).change();

	$('#tipoContrato').on('change', function(){

		if($(this).val() == 1){
			$('#fechaTermino').datepicker('setDate', null);
			$('#fechaTermino').prop('disabled', true);
		}
		else{
			$('#fechaTermino').prop('disabled', false);
		}

	}).change();
	
	try{
	
	//Seleccionar el Huerto asociado a la empresa:
	//TODO: MODIFICAR HUERTO ZONA Y CECO, ASOCIAR FAENA Y CARGO SEGUN EMPRESA SELECCIONADA
	$('#sociedad').change(function(){ 
		
//		//Obtener la faena 
//		$('#idFaena').children('option:not(:first)').remove();
//		$('#idFaenaContrato').children('option:not(:first)').remove();
//		let faena = $(this).getJSONSync("/simpleWeb/json/work/Faenas/getFaenaBySociedad/"+$('#sociedad').val());
//		$('#idFaena').setOptionsByArray(faena, "nombreFaena", "idFaena");
//		$('#idFaenaContrato').setOptionsByArray(faena, "nombreFaena", "idFaena");
//		
//		//Obtener el Cargo
//		$('#cargo').children('option:not(:first)').remove();
//		let cargo = $(this).getJSONSync("/simpleWeb/json/work/cargos/getCargoByIdSociedad/"+$('#sociedad').val());
//		$('#cargo').setOptionsByArray(cargo, "cargos", "id_cargo");
		
		$('#idHuerto').empty();
		$('#idZona').empty();
		$('#idCECO').empty();
				
		//Obtener Codigo de la Sociedad en base al Id:
		let sociedadSAP = $(this).getJSONSync("/simpleWeb/json/work/getSociedadById/"+$('#sociedad').val());
		
		//Obtener Huerto por la Sociedad
		let huerto = $(this).getJSONSync("/simpleWeb/json/work/getCampoBySociedad/"+sociedadSAP.sociedad);
		
		// Cambiar Nombres de Propiedades  por value - text
		$.each(huerto, function(key, object){
			huerto[key] = renameProperty(object,"campo", "value");
			huerto[key] = renameProperty(object,"descripcion", "text");
		});
		
		// Llenar select de la Lista Huerto
		$('#idHuerto').setOptionsByArray(huerto);
		
		$('#idHuerto').prop('disabled',false);

	});
	
	//Seleccionar el Huerto asociado a la empresa:
	$('#idHuerto').change(function(){ 
	
		$('#idZona').empty();
		$('#idCECO').empty();
	
		//Obtener Zona por el Huerto
		let idZona = $(this).getJSONSync("/simpleWeb/json/work/getCampoByCampo/"+$('#idHuerto').val());
	
		// Cambiar Nombres de Propiedades  por value - text
		$.each(idZona, function(key, object){
			idZona[key] = renameProperty(object,"grupo", "value");
			idZona[key] = renameProperty(object,"zona", "text");
		});
		
		// Llenar select de la Lista Zona
		$('#idZona').setOptionsByArray(idZona);
		
		$('#idZona').prop('disabled',false);
		
	
	});
	
	
	$('#idZona').change(function(){
		
		$('#idCECO').empty();
		
		//Obtener CECO por la Zona
		let CECOSAP = $(this).getJSONSync(IPSERVERSAP+"JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+$('#sociedad').val()+"&GRUPO="+$('#idZona').val());
		let CECOConCuartel = CECOSAP.COSTCENTERLIST;
        let CECO = new Array();
	
		// Cambiar Nombres de Propiedades  por value - text
        $.each(CECOConCuartel, function(key, object){
			if(!(object.DESCRIPT.indexOf("Cuartel") > -1 == true)){
				CECOConCuartel[key] = renameProperty(object,"COSTCENTER", "value");
				CECOConCuartel[key] = renameProperty(object,"DESCRIPT", "text");
				CECO.push(CECOConCuartel[key]);
			}
		});
		
		// Llenar select de la Lista de CECO
		$('#idCECO').setOptionsByArray(CECO);
		
		$('#idCECO').prop('disabled', false);
		
	});
	
	}catch(err){
		console.log(err);
	}

	//Opciones de Salud
	$('#idIsapre').on('change', function(){

		//Si es Fonasa
		if($(this).val() == 13){
			$('#idMonedaPlan, #valorPlan').prop('disabled', true).val('');
			$('#idMonedaPlan').closest('tr').hide();
			$('#valorPlan').closest('tr').hide();
		}
		else{
			$('#idMonedaPlan, #valorPlan').prop('disabled', false).val('');
			$('#idMonedaPlan').closest('tr').show();
			$('#valorPlan').closest('tr').show();
		}

	}).change();
	

	//Buscador para Select
	$('select').select2({
		multiple : false,
		allowClear: false,
		placeholder : "Seleccionar..",
	});
	
	//Collapse/Show Information TODO:
	cerrarModales();

	
}


//Collapse/Show Information
function cerrarModales(){
	
	$('#datosDireccion').click(function(){
		$(this).collapseInformation('.row_dataDireccion');
	});
	
$('#razonSocial').click(function(){
		
		if ($('#razonSocial:visible').size() != 0)
	    {
			 $(this).removeClass('row_data');  
			 $('#idContratista').removeClass('row_data');
	    }
		
		$(this).collapseInformation('.row_data');
		$(this).collapseInformation('#pasaporte');
		$(this).collapseInformation('#rutTemporal');
		$(this).collapseInformation('#sueldoMensual');
		$(this).collapseInformation('.row_dataAhorroAFP');
		$(this).collapseInformation('#valorPlan');
		$(this).collapseInformation('#idMonedaPlan');
		$(this).collapseInformation('.row_dataEmergencia');
		$(this).collapseInformation('#sueldo_mensual');
		$(this).collapseInformation('#cargo');
		$(this).collapseInformation('#supervisor');
		$(this).collapseInformation('#maquinista');
		$(this).collapseInformation('#textContratista');
		$(this).collapseInformation('#rutWorker');
		$(this).collapseInformation('#name2');
		
		
		
		if ($('#razonSocial:visible').size() != 0)
	    {
	         $(this).addClass('row_data'); 
	         $('#idContratista').addClass('row_data');
	    }
		
		
	});
	
	
	$('#licenciaMaternal').click(function(){
		$(this).collapseInformation('.row_dataMaternal');
	});
	
	$('#licenciaConducir').click(function(){
		$(this).collapseInformation('.row_dataConducir');
	});
	
	$('#datosAcademicos').click(function(){
		$(this).collapseInformation('.row_dataInstitucion');
	});
	
	$('#datosEmergencia').click(function(){
		$(this).collapseInformation('.row_dataEmergencia');
	});
	
	$('#datosRecorrido').click(function(){
		$(this).collapseInformation('.row_dataRecorrido');
	});
	
	$('#informacionContacto').click(function(){
		$(this).collapseInformation('.row_dataContacto');
	});
	
	$('#cuentaPrimaria').click(function(){
		$(this).collapseInformation('.row_dataCuenta1');
	});
	
	$('#cuentaSecundaria').click(function(){
		$(this).collapseInformation('.row_dataCuenta2');
	});
	
	$('#apv').click(function(){
		$(this).collapseInformation('.row_dataAPV');
	});
	
	$('#convenido').click(function(){
		$(this).collapseInformation('.row_dataConvenido');
	});
	
	$('#ahorroAFP').click(function(){
		$(this).collapseInformation('.row_dataAhorroAFP');
	});
	
	
}


// TODO: Insertar datos en la tabla sw_r_trabajadorPeriodo
function addnewWorkerTrabajadorPeriodo(codigoGlobal){
	
	var TrabajadorPeriodo = new Object();
	
	var idTrabajador = $(this).getObjectSycn("/simpleWeb/json/work/getIdTrabajadorByCodigo/"+codigoGlobal);

	TrabajadorPeriodo = $(document).find('.row_data').getObjectByInputs();
	
	//TrabajadorPeriodo.periodo = changeDateformatYYYYMM($('#fechaIngreso').val());
	
	//console.log(changeDateformatYYYYMM($('#fechaIngreso').val()));
	
	TrabajadorPeriodo.idTrabajador = idTrabajador;
	TrabajadorPeriodo.fechaBack = $('#fechaIngreso').val();
	
	// Insertar datos Discapacidad
	$.ajax({
		url : "/simpleWeb/json/work/insertTrabajadorPeriodo/",
		type : "PUT",
		async : false,
		data : JSON.stringify(TrabajadorPeriodo),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		}
	});


}

function addnewWorkerDiscapacidad(arrDiscapacidad, codigoGlobal){

	var id = 0;
	$.ajax({
		async: false,
		dataType: 'json',
		url: "/simpleWeb/json/work/getIdTrabajadorByCodigo/"+codigoGlobal,
		success: function(data){
			id = data;
		},
		error: function(ex){
			alerta("Error, No se encuentra el Trabajador: " + ex);
		}
	});


	$.extend(arrDiscapacidad, {idTrabajador:id});

	// Insertar datos Discapacidad
	$.ajax({
		url : "/simpleWeb/json/work/insertDiscapacidad/",
		type : "PUT",
		async : false,
		data : JSON.stringify(arrDiscapacidad),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success: function(){

		}

	});

}

function addnewWorkerConducir(arrConducir, codigoGlobal){

	var id = 0;
	$.ajax({
		async: false,
		dataType: 'json',
		url: "/simpleWeb/json/work/getIdTrabajadorByCodigo/"+codigoGlobal,
		success: function(data){
			id = data;
		},
		error: function(ex){
			alerta("Error, No se encuentra el Trabajador: " + ex);
		}
	});

	$.extend(arrConducir, {idTrabajador:id});

	// Insertar datos Academicos
	$.ajax({
		url : "/simpleWeb/json/work/insertConducir/",
		type : "PUT",
		async : false,
		data : JSON.stringify(arrConducir),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success: function(){

		}

	});

}

function addnewWorkerLaboral(arrLaboral, codigoGlobal){

	//Parche para Ingresar Contrato cuando se elije razonSocial TODO:Modificar
	if($('#razonSocial').val() == 1){
		$.extend(arrLaboral, {cargo:0});
	}
	
	// Obtener CodigoTrabajador por IdTrabajador
	var codigo_trabajador;

	$.extend(arrLaboral, {codigo_trabajador:codigoGlobal});
	$.extend(arrLaboral, {estado_contrato:1});
	
	// Modificar datos de Laboral
	$.ajax({
		url : "/simpleWeb/json/work/insertContrato/",
		type : "PUT",
		data : JSON.stringify(arrLaboral),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success: function(){

		}

	});
	
}

//Insertar datos en la tabla sw_r_anexoContrato TODO:
function addnewWorkerAnexoContrato(codigoGlobal){
	let anexoContrato = $(this).getJSONSync("/simpleWeb/json/work/getUltimoContratoActivoByIdTrabajador/"+codigoGlobal); //Obtener el Contrato
	let idTrabajador = $(this).getJSONSync("/simpleWeb/json/work/getIdTrabajadorByCodigo/"+codigoGlobal); //Obtener el Id del Trabajador
	
	//anexoContrato.periodo = changeDateformatYYYYMM($('#fechaIngreso').val())+"-01";
	anexoContrato.idTrabajador = idTrabajador;
	anexoContrato.fechaCreacion = $('#fechaIngreso').val();
	
	// Insertar Anexo de Contrato
	$(this).setJSONSync("/simpleWeb/json/work/insertAnexoContrato/",anexoContrato);
	
}

function addnewWorkerCuenta(listaCuenta, codigoGlobal){

	var id = 0;
	$.ajax({
		async: false,
		dataType: 'json',
		url: "/simpleWeb/json/work/getIdTrabajadorByCodigo/"+codigoGlobal,
		success: function(data){
			id = data;
		},
		error: function(ex){
			alerta("Error, No se encuentra el Trabajador: " + ex);
		}
	});

	$.each(listaCuenta, function(key, value){

		$.extend(value, {idTrabajador:id}, {codigoTrabajador:codigoGlobal});

		// Enviar cuentas Bancarias al servicio
		$.ajax({
			url : "/simpleWeb/json/work/insertCuentaBancaria/",
			type : "PUT",
			async : false,
			data : JSON.stringify(value),
			beforeSend : function(xhr){
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success: function(){

			}

		});

	});

}

// Envio de Datos
function addnewWorker(arr){
	
	var codigo = 0;
	$.ajax({
		url : "/simpleWeb/json/work/getUltimoCodigoTrabajador",
		type : "GET",
		async : false,
		success: function(data){
			codigo = data;

			codigo++; 
			codigoGlobal = codigo;
		}

	});

	if(codigo == 0){
		return;
	}

	
	debugger;
	$.extend(arr, {codigo:codigo}, {tipoTrabajador:4});
	let contratista = "00" + arr.idContratista;
	$.extend(arr, {idContratista : contratista } );
	
	
	
	
	//TODO: BYPASS Razon Social
	if($('#razonSocial').val() == 1){
		$.extend(arr, {agro:1});
	}
	
	// Enviar trabajador al servicio
	console.log(JSON.stringify(arr));
	$.ajax({
		url : "/simpleWeb/json/work/insertTrabajador2/",
		async : false,
		type : "PUT",
		data : JSON.stringify(arr),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success: function(){

		}

	});


	return codigoGlobal;

}



// Selectores
function getSelector() {



	// Array de Parametros
	var param = new Array('SEXO', 'ISAPRE', 'PARENTESCO', 'NACIONALIDAD', 'ESTADO_CIVIL', 
			'NIVEL_DE_EDUCACION', 'NIVEL', 'CARRERA_OFICIO', 'INSTITUCIONES', 'NOMBRE_INSTITUCION', 
			'MONEDA_PLAN', 
			'DIVISION_PERSONAL', 'SUBDIVISION_PERSONAL', 'GRUPO', 'SUBGRUPO', 'TIPO_CONTRATO', 'TIPO_TRABAJADOR',
			'GRADO_DISCAPACIDAD','CAUSA_DISCAPACIDAD','MOVILIDAD_REDUCIDA', 'AFP', 'TIPO_LICENCIA_CONDUCIR', 'APV' );

	var selector;

	// Obtener datos para llenado de selects
	$.ajax({
		type : "GET",
		async : false,
		url : '/simpleWeb/json/work/getParametrosByCodigos',
		data : {param:param}, // se recibe array de parametros que se
								// requieren
		dataType : "json",
		success : function(data) {
			selector = data;
		},
		error : function(data) {
			alert('error');
		}
	});


	$.each(selector, function(key, registro) {

		if(registro.codigo == "SEXO"){
			$("#idGenero").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}

		if(registro.codigo == "ISAPRE"){
			$("#idIsapre").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}

		if(registro.codigo == "PARENTESCO"){
			$("#parentesco, #parentesco2").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}

		if(registro.codigo == "NACIONALIDAD"){
			$("#idNacionalidad").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}

		if(registro.codigo == "ESTADO_CIVIL"){
			$("#idEstadoCivil").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}

		if(registro.codigo == "NIVEL_DE_EDUCACION"){
			$("#nivelEducacion").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}

		if(registro.codigo == "NIVEL"){
			$("#nivel").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}

		if(registro.codigo == "CARRERA_OFICIO"){
			$("#carrera").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}

		if(registro.codigo == "INSTITUCIONES"){
			$("#instituciones").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}

		if(registro.codigo == "NOMBRE_INSTITUCION"){
			$("#nombreInstitucion").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}

		if(registro.codigo == "MONEDA_PLAN"){
			$("#idMonedaPlan, #idMonedaAFP, #idMonedaAdicionalAFP, #idMonedaAPV, #idMonedaConvenido" ).append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}

		if(registro.codigo == "DIVISION_PERSONAL"){
			$("#division").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}

		if(registro.codigo == "SUBDIVISION_PERSONAL"){
			$("#idSubDivision").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}

		if(registro.codigo == "GRUPO"){
			$("#grupo").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}

		if(registro.codigo == "SUBGRUPO"){
			$("#idSubGrupo").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}

		if(registro.codigo == "TIPO_CONTRATO"){
			$("#tipoContrato").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}

		if(registro.codigo == "TIPO_TRABAJADOR"){
			$("#tipoTrabajador").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}

		if(registro.codigo == "GRADO_DISCAPACIDAD"){
			$("#gradoDiscapacidad").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}

		if(registro.codigo == "CAUSA_DISCAPACIDAD"){
			$("#causaDiscapacidad").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}

		if(registro.codigo == "MOVILIDAD_REDUCIDA"){
			$("#movilidadReducida").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}
		
		if(registro.codigo == "AFP"){
			$("#idAFP").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}
		
		if(registro.codigo == "TIPO_LICENCIA_CONDUCIR"){
			$("#idTipoLicenciaConducir").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}
		
		if(registro.codigo == "APV"){
			$("#institucionAPV, #institucionConvenido").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}

	});



	// Seleccionar Sociedad
	$.ajax({
		type : "GET",
		async: false,
		url : '/simpleWeb/json/work/getSociedad/',
		dataType : "json",
		success : function(data) {
			$.each(data, function(key, registro) {
				if(registro.idSociedad != -1){
					$("#sociedad").append(
							'<option value=' + registro.idSociedad + '>'
							+ registro.sociedad + '</option>');
				}
			});

		},
		error : function(data) {
			alert('error');
		}
	});

	// Seleccionar AFP
	$.ajax({
		type : "GET",
		async: false,
		url : '/simpleWeb/json/work/AFPs/getAFPs/',
		dataType : "json",
		success : function(data) {
			$.each(data, function(key, registro) {

				$("#idAFP, #institucionAPV, #institucionConvenido").append(
						'<option value=' + registro.idafp + '>'
						+ registro.nombreAFP + '</option>');

			});
		},
		error : function(data) {
			alert('error');
		}
	});


	// Seleccionar Regiones
	$.ajax({
		type : "GET",
		async: false,
		url : '/simpleWeb/json/work/getAllRegion',
		async: false,
		dataType : "json",
		success : function(data) {
			$.each(data, function(key, registro) {
				if(registro.idregion != 16){
					$("#idRegion").append(
							'<option value=' + registro.idregion + '>'
							+ registro.region + '</option>');
				}
			});
		},
		error : function(data) {
			alert('error');
		}
	});

	// Seleccionar Cargo
	$.ajax({
		type : "GET",
		async : false,
		url : '/simpleWeb/json/work/cargos/getCargos/',
		dataType : "json",
		success : function(data) {
			$.each(data, function(key, registro) {

				$("#cargo").append(
						'<option value=' + registro.id_cargo + '>'
						+ registro.cargos + '</option>');
			});
		},
		error : function(data) {
			alert('error');
		}
	});

	
	var banco;
	// Select para Seccion de Cuenta Bancaria
	for (banco = 1; banco <= 2; banco++) { 

		// Seleccionar Tipo de Cuenta
		$.ajax({
			type : "GET",
			async : false,
			url : '/simpleWeb/json/work/getParametros/TIPO_DE_CUENTA',
			dataType : "json",
			success : function(data) {
				$.each(data, function(key, registro) {

					$("#idTipoCuenta"+banco).append(
							'<option value=' + registro.llave + '>'
							+ registro.descripcion + '</option>');
				});
			},
			error : function(data) {
				alert('error');
			}
		});

		// Seleccionar Banco
		$.ajax({
			type : "GET",
			async : false,
			url : '/simpleWeb/json/work/getParametros/BANCO',
			dataType : "json",
			success : function(data) {
				$.each(data, function(key, registro) {

					$("#idBanco"+banco).append(
							'<option value=' + registro.llave + '>'
							+ registro.descripcion + '</option>');
				});
			},
			error : function(data) {
				alert('error');
			}
		});

	}


	// Seleccionar Recorrido de Bus
	$.ajax({
		type : "GET",
		async : false,
		url : "/simpleWeb/json/AGRO/GET_RECORRIDO/",
		dataType : "json",
		success : function(data) {
			$.each(data, function(key, registro) {

				$("#recorrido").append(
						'<option value=' + registro.id_recorrido + '>'
						+ registro.detalle + '</option>');
			});
		},
		error : function(data) {
			alert('error');
		}
	});


	// Seleccionar Sector
	$.ajax({
		type : "GET",
		async : false,
		url : "/simpleWeb/json/AGRO/GETSECTOR/",
		dataType : "json",
		success : function(data) {
			$.each(data, function(key, registro) {

				$("#idSector").append(
						'<option value=' + registro.codigo + '>'
						+ registro.descripcion + '</option>');
			});
		},
		error : function(data) {
			alert('error');
		}
	});

	//Seleccionar Contratista TODO:
	$(document).on('change', '#sociedad', function(){
		
		$("idContratista").empty();
		
		//Obtener Codigo de la Sociedad en base al Id TODO:
		let sociedad = $('#sociedad').val() == "" ? 0 : $('#sociedad').val();
		
		let sociedadSAP = $(this).getJSONSync("/simpleWeb/json/work/getSociedadById/"+sociedad);
		
		// Servicio para Obtener los contratistas asociados a la empresa
		$.ajax({
			type : "GET",
			url : IPSERVERSAP+ "JSON_ZMOV_10036.aspx?CONTRATISTA=X",
			async: false,
			dataType : "json",
			success : function(data) {
				$.each(data.ET_DATPROV, function(key, registro) {

					$("#idContratista").append(
							'<option value=' + parseInt(registro.LIFNR) + '>'
							+registro.STCD1+' '+registro.NAME1+ '</option>');
				});
				
				
			},
			error : function(data) {
				alert('error');
			}
		});

		if(sociedad == 0){
			$("#idContratista").empty();
		}
		
	});

	reorderSelect('#cargo, #posicion, #idBanco1, #idBanco2, #idTipoCuenta1, #idTipoCuenta2, #carrera, #parentesco');

}

function justNumbers(e){
	var keynum = window.event ? window.event.keyCode : e.which;
	if ((keynum == 8) || (keynum == 46) || (keynum == 44)){
		return true;
	}
	return /\d/.test(String.fromCharCode(keynum));
}

function justNumbers2(e){
	var keynum = window.event ? window.event.keyCode : e.which;
	if ((keynum == 8)){
		return true;
	}
	return /\d/.test(String.fromCharCode(keynum));
}


function centroDistribucion(){

	function labelFormatter(label, series) {
		return "<div style='font-size:12pt; text-align:center; padding:2px; color:black;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
	}

	var data = [
		{ label: "Series1",  data: 10},
		{ label: "Series2",  data: 30},
		{ label: "Series3",  data: 90},
		{ label: "Series4",  data: 70},
		{ label: "Series5",  data: 80},
		{ label: "Series6",  data: 110}
		];

	$.plot('#placeholder', data, {
		series: {
			pie: {
				show: true,
				radius: 1,
				label: {
					show: true,
					radius: 1,
					formatter: labelFormatter
				}
			}
		},
		grid: {
			hoverable: true,
			clickable: true
		},
		legend: {
			show: false
		}

	});


	$('#placeholder').on("plothover", function(event, pos, obj) {

		if (!obj) {
			return;
		}

		var percent = parseFloat(obj.series.percent).toFixed(2);
		$("#hover").html("<span style='font-weight:bold; color:" + obj.series.color + "'>" + obj.series.label + " (" + percent + "%)</span>");
	});

	$('#placeholder').on("plotclick", function(event, pos, obj) {

		if (!obj) {
			return;
		}

		percent = parseFloat(obj.series.percent).toFixed(2);
		alert(""  + obj.series.label + ": " + percent + "%");
	});


}


// -----------JQUERY PLUGIN MASK--------------------//

/**
 * jquery.mask.js
 * 
 * @version: v1.14.15
 * @author: Igor Escobar
 * 
 * Created by Igor Escobar on 2012-03-10. Please report any bug at
 * github.com/igorescobar/jQuery-Mask-Plugin
 * 
 * Copyright (c) 2012 Igor Escobar http://igorescobar.com
 * 
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/* jshint laxbreak: true */
/* jshint maxcomplexity:17 */
/* global define */

// UMD (Universal Module Definition) patterns for JavaScript modules that work
// everywhere.
// https://github.com/umdjs/umd/blob/master/templates/jqueryPlugin.js
(function (factory, jQuery, Zepto) {

	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery || Zepto);
	}

}(function ($) {
	'use strict';

	var Mask = function (el, mask, options) {

		var p = {
				invalid: [],
				getCaret: function () {
					try {
						var sel,
						pos = 0,
						ctrl = el.get(0),
						dSel = document.selection,
						cSelStart = ctrl.selectionStart;

						// IE Support
						if (dSel && navigator.appVersion.indexOf('MSIE 10') === -1) {
							sel = dSel.createRange();
							sel.moveStart('character', -p.val().length);
							pos = sel.text.length;
						}
						// Firefox support
						else if (cSelStart || cSelStart === '0') {
							pos = cSelStart;
						}

						return pos;
					} catch (e) {}
				},
				setCaret: function(pos) {
					try {
						if (el.is(':focus')) {
							var range, ctrl = el.get(0);

							// Firefox, WebKit, etc..
							if (ctrl.setSelectionRange) {
								ctrl.setSelectionRange(pos, pos);
							} else { // IE
								range = ctrl.createTextRange();
								range.collapse(true);
								range.moveEnd('character', pos);
								range.moveStart('character', pos);
								range.select();
							}
						}
					} catch (e) {}
				},
				events: function() {
					el
					.on('keydown.mask', function(e) {
						el.data('mask-keycode', e.keyCode || e.which);
						el.data('mask-previus-value', el.val());
						el.data('mask-previus-caret-pos', p.getCaret());
						p.maskDigitPosMapOld = p.maskDigitPosMap;
					})
					.on($.jMaskGlobals.useInput ? 'input.mask' : 'keyup.mask', p.behaviour)
					.on('paste.mask drop.mask', function() {
						setTimeout(function() {
							el.keydown().keyup();
						}, 100);
					})
					.on('change.mask', function(){
						el.data('changed', true);
					})
					.on('blur.mask', function(){
						if (oldValue !== p.val() && !el.data('changed')) {
							el.trigger('change');
						}
						el.data('changed', false);
					})
					// it's very important that this callback remains in this
					// position
					// otherwhise oldValue it's going to work buggy
					.on('blur.mask', function() {
						oldValue = p.val();
					})
					// select all text on focus
					.on('focus.mask', function (e) {
						if (options.selectOnFocus === true) {
							$(e.target).select();
						}
					})
					// clear the value if it not complete the mask
					.on('focusout.mask', function() {
						if (options.clearIfNotMatch && !regexMask.test(p.val())) {
							p.val('');
						}
					});
				},
				getRegexMask: function() {
					var maskChunks = [], translation, pattern, optional, recursive, oRecursive, r;

					for (var i = 0; i < mask.length; i++) {
						translation = jMask.translation[mask.charAt(i)];

						if (translation) {

							pattern = translation.pattern.toString().replace(/.{1}$|^.{1}/g, '');
							optional = translation.optional;
							recursive = translation.recursive;

							if (recursive) {
								maskChunks.push(mask.charAt(i));
								oRecursive = {digit: mask.charAt(i), pattern: pattern};
							} else {
								maskChunks.push(!optional && !recursive ? pattern : (pattern + '?'));
							}

						} else {
							maskChunks.push(mask.charAt(i).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
						}
					}

					r = maskChunks.join('');

					if (oRecursive) {
						r = r.replace(new RegExp('(' + oRecursive.digit + '(.*' + oRecursive.digit + ')?)'), '($1)?')
						.replace(new RegExp(oRecursive.digit, 'g'), oRecursive.pattern);
					}

					return new RegExp(r);
				},
				destroyEvents: function() {
					el.off(['input', 'keydown', 'keyup', 'paste', 'drop', 'blur', 'focusout', ''].join('.mask '));
				},
				val: function(v) {
					var isInput = el.is('input'),
					method = isInput ? 'val' : 'text',
							r;

					if (arguments.length > 0) {
						if (el[method]() !== v) {
							el[method](v);
						}
						r = el;
					} else {
						r = el[method]();
					}

					return r;
				},
				calculateCaretPosition: function() {
					var oldVal = el.data('mask-previus-value') || '',
					newVal = p.getMasked(),
					caretPosNew = p.getCaret();
					if (oldVal !== newVal) {
						var caretPosOld = el.data('mask-previus-caret-pos') || 0,
						newValL = newVal.length,
						oldValL = oldVal.length,
						maskDigitsBeforeCaret = 0,
						maskDigitsAfterCaret = 0,
						maskDigitsBeforeCaretAll = 0,
						maskDigitsBeforeCaretAllOld = 0,
						i = 0;

						for (i = caretPosNew; i < newValL; i++) {
							if (!p.maskDigitPosMap[i]) {
								break;
							}
							maskDigitsAfterCaret++;
						}

						for (i = caretPosNew - 1; i >= 0; i--) {
							if (!p.maskDigitPosMap[i]) {
								break;
							}
							maskDigitsBeforeCaret++;
						}

						for (i = caretPosNew - 1; i >= 0; i--) {
							if (p.maskDigitPosMap[i]) {
								maskDigitsBeforeCaretAll++;
							}
						}

						for (i = caretPosOld - 1; i >= 0; i--) {
							if (p.maskDigitPosMapOld[i]) {
								maskDigitsBeforeCaretAllOld++;
							}
						}

						// if the cursor is at the end keep it there
						if (caretPosNew > oldValL) {
							caretPosNew = newValL * 10;
						} else if (caretPosOld >= caretPosNew && caretPosOld !== oldValL) {
							if (!p.maskDigitPosMapOld[caretPosNew])  {
								var caretPos = caretPosNew;
								caretPosNew -= maskDigitsBeforeCaretAllOld - maskDigitsBeforeCaretAll;
								caretPosNew -= maskDigitsBeforeCaret;
								if (p.maskDigitPosMap[caretPosNew])  {
									caretPosNew = caretPos;
								}
							}
						}
						else if (caretPosNew > caretPosOld) {
							caretPosNew += maskDigitsBeforeCaretAll - maskDigitsBeforeCaretAllOld;
							caretPosNew += maskDigitsAfterCaret;
						}
					}
					return caretPosNew;
				},
				behaviour: function(e) {
					e = e || window.event;
					p.invalid = [];

					var keyCode = el.data('mask-keycode');

					if ($.inArray(keyCode, jMask.byPassKeys) === -1) {
						var newVal = p.getMasked(),
						caretPos = p.getCaret();

						// this is a compensation to devices/browsers that don't
						// compensate
						// caret positioning the right way
						setTimeout(function() {
							p.setCaret(p.calculateCaretPosition());
						}, $.jMaskGlobals.keyStrokeCompensation);

						p.val(newVal);
						p.setCaret(caretPos);
						return p.callbacks(e);
					}
				},
				getMasked: function(skipMaskChars, val) {
					var buf = [],
					value = val === undefined ? p.val() : val + '',
							m = 0, maskLen = mask.length,
							v = 0, valLen = value.length,
							offset = 1, addMethod = 'push',
							resetPos = -1,
							maskDigitCount = 0,
							maskDigitPosArr = [],
							lastMaskChar,
							check;

					if (options.reverse) {
						addMethod = 'unshift';
						offset = -1;
						lastMaskChar = 0;
						m = maskLen - 1;
						v = valLen - 1;
						check = function () {
							return m > -1 && v > -1;
						};
					} else {
						lastMaskChar = maskLen - 1;
						check = function () {
							return m < maskLen && v < valLen;
						};
					}

					var lastUntranslatedMaskChar;
					while (check()) {
						var maskDigit = mask.charAt(m),
						valDigit = value.charAt(v),
						translation = jMask.translation[maskDigit];

						if (translation) {
							if (valDigit.match(translation.pattern)) {
								buf[addMethod](valDigit);
								if (translation.recursive) {
									if (resetPos === -1) {
										resetPos = m;
									} else if (m === lastMaskChar && m !== resetPos) {
										m = resetPos - offset;
									}

									if (lastMaskChar === resetPos) {
										m -= offset;
									}
								}
								m += offset;
							} else if (valDigit === lastUntranslatedMaskChar) {
								// matched the last untranslated (raw) mask
								// character that we encountered
								// likely an insert offset the mask character
								// from the last entry; fall
								// through and only increment v
								maskDigitCount--;
								lastUntranslatedMaskChar = undefined;
							} else if (translation.optional) {
								m += offset;
								v -= offset;
							} else if (translation.fallback) {
								buf[addMethod](translation.fallback);
								m += offset;
								v -= offset;
							} else {
								p.invalid.push({p: v, v: valDigit, e: translation.pattern});
							}
							v += offset;
						} else {
							if (!skipMaskChars) {
								buf[addMethod](maskDigit);
							}

							if (valDigit === maskDigit) {
								maskDigitPosArr.push(v);
								v += offset;
							} else {
								lastUntranslatedMaskChar = maskDigit;
								maskDigitPosArr.push(v + maskDigitCount);
								maskDigitCount++;
							}

							m += offset;
						}
					}

					var lastMaskCharDigit = mask.charAt(lastMaskChar);
					if (maskLen === valLen + 1 && !jMask.translation[lastMaskCharDigit]) {
						buf.push(lastMaskCharDigit);
					}

					var newVal = buf.join('');
					p.mapMaskdigitPositions(newVal, maskDigitPosArr, valLen);
					return newVal;
				},
				mapMaskdigitPositions: function(newVal, maskDigitPosArr, valLen) {
					var maskDiff = options.reverse ? newVal.length - valLen : 0;
					p.maskDigitPosMap = {};
					for (var i = 0; i < maskDigitPosArr.length; i++) {
						p.maskDigitPosMap[maskDigitPosArr[i] + maskDiff] = 1;
					}
				},
				callbacks: function (e) {
					var val = p.val(),
					changed = val !== oldValue,
					defaultArgs = [val, e, el, options],
					callback = function(name, criteria, args) {
						if (typeof options[name] === 'function' && criteria) {
							options[name].apply(this, args);
						}
					};

					callback('onChange', changed === true, defaultArgs);
					callback('onKeyPress', changed === true, defaultArgs);
					callback('onComplete', val.length === mask.length, defaultArgs);
					callback('onInvalid', p.invalid.length > 0, [val, e, el, p.invalid, options]);
				}
		};

		el = $(el);
		var jMask = this, oldValue = p.val(), regexMask;

		mask = typeof mask === 'function' ? mask(p.val(), undefined, el,  options) : mask;

		// public methods
		jMask.mask = mask;
		jMask.options = options;
		jMask.remove = function() {
			var caret = p.getCaret();
			if (jMask.options.placeholder) {
				el.removeAttr('placeholder');
			}
			if (el.data('mask-maxlength')) {
				el.removeAttr('maxlength');
			}
			p.destroyEvents();
			p.val(jMask.getCleanVal());
			p.setCaret(caret);
			return el;
		};

		// get value without mask
		jMask.getCleanVal = function() {
			return p.getMasked(true);
		};

		// get masked value without the value being in the input or element
		jMask.getMaskedVal = function(val) {
			return p.getMasked(false, val);
		};

		jMask.init = function(onlyMask) {
			onlyMask = onlyMask || false;
			options = options || {};

			jMask.clearIfNotMatch  = $.jMaskGlobals.clearIfNotMatch;
			jMask.byPassKeys       = $.jMaskGlobals.byPassKeys;
			jMask.translation      = $.extend({}, $.jMaskGlobals.translation, options.translation);

			jMask = $.extend(true, {}, jMask, options);

			regexMask = p.getRegexMask();

			if (onlyMask) {
				p.events();
				p.val(p.getMasked());
			} else {
				if (options.placeholder) {
					el.attr('placeholder' , options.placeholder);
				}

				// this is necessary, otherwise if the user submit the form
				// and then press the "back" button, the autocomplete will erase
				// the data. Works fine on IE9+, FF, Opera, Safari.
				if (el.data('mask')) {
					el.attr('autocomplete', 'off');
				}

				// detect if is necessary let the user type freely.
				// for is a lot faster than forEach.
				for (var i = 0, maxlength = true; i < mask.length; i++) {
					var translation = jMask.translation[mask.charAt(i)];
					if (translation && translation.recursive) {
						maxlength = false;
						break;
					}
				}

				if (maxlength) {
					el.attr('maxlength', mask.length).data('mask-maxlength', true);
				}

				p.destroyEvents();
				p.events();

				var caret = p.getCaret();
				p.val(p.getMasked());
				p.setCaret(caret);
			}
		};

		jMask.init(!el.is('input'));
	};

	$.maskWatchers = {};
	var HTMLAttributes = function () {
		var input = $(this),
		options = {},
		prefix = 'data-mask-',
		mask = input.attr('data-mask');

		if (input.attr(prefix + 'reverse')) {
			options.reverse = true;
		}

		if (input.attr(prefix + 'clearifnotmatch')) {
			options.clearIfNotMatch = true;
		}

		if (input.attr(prefix + 'selectonfocus') === 'true') {
			options.selectOnFocus = true;
		}

		if (notSameMaskObject(input, mask, options)) {
			return input.data('mask', new Mask(this, mask, options));
		}
	},
	notSameMaskObject = function(field, mask, options) {
		options = options || {};
		var maskObject = $(field).data('mask'),
		stringify = JSON.stringify,
		value = $(field).val() || $(field).text();
		try {
			if (typeof mask === 'function') {
				mask = mask(value);
			}
			return typeof maskObject !== 'object' || stringify(maskObject.options) !== stringify(options) || maskObject.mask !== mask;
		} catch (e) {}
	},
	eventSupported = function(eventName) {
		var el = document.createElement('div'), isSupported;

		eventName = 'on' + eventName;
		isSupported = (eventName in el);

		if ( !isSupported ) {
			el.setAttribute(eventName, 'return;');
			isSupported = typeof el[eventName] === 'function';
		}
		el = null;

		return isSupported;
	};

	$.fn.mask = function(mask, options) {
		options = options || {};
		var selector = this.selector,
		globals = $.jMaskGlobals,
		interval = globals.watchInterval,
		watchInputs = options.watchInputs || globals.watchInputs,
		maskFunction = function() {
			if (notSameMaskObject(this, mask, options)) {
				return $(this).data('mask', new Mask(this, mask, options));
			}
		};

		$(this).each(maskFunction);

		if (selector && selector !== '' && watchInputs) {
			clearInterval($.maskWatchers[selector]);
			$.maskWatchers[selector] = setInterval(function(){
				$(document).find(selector).each(maskFunction);
			}, interval);
		}
		return this;
	};

	$.fn.masked = function(val) {
		return this.data('mask').getMaskedVal(val);
	};

	$.fn.unmask = function() {
		clearInterval($.maskWatchers[this.selector]);
		delete $.maskWatchers[this.selector];
		return this.each(function() {
			var dataMask = $(this).data('mask');
			if (dataMask) {
				dataMask.remove().removeData('mask');
			}
		});
	};

	$.fn.cleanVal = function() {
		return this.data('mask').getCleanVal();
	};

	$.applyDataMask = function(selector) {
		selector = selector || $.jMaskGlobals.maskElements;
		var $selector = (selector instanceof $) ? selector : $(selector);
		$selector.filter($.jMaskGlobals.dataMaskAttr).each(HTMLAttributes);
	};

	var globals = {
			maskElements: 'input,td,span,div',
			dataMaskAttr: '*[data-mask]',
			dataMask: true,
			watchInterval: 300,
			watchInputs: true,
			keyStrokeCompensation: 10,
			// old versions of chrome dont work great with input event
			useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && eventSupported('input'),
			watchDataMask: false,
			byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
			translation: {
				'0': {pattern: /\d/},
				'9': {pattern: /\d/, optional: true},
				'#': {pattern: /\d/, recursive: true},
				'A': {pattern: /[a-zA-Z0-9]/},
				'S': {pattern: /[a-zA-Z]/}
			}
	};

	$.jMaskGlobals = $.jMaskGlobals || {};
	globals = $.jMaskGlobals = $.extend(true, {}, globals, $.jMaskGlobals);

	// looking for inputs with data-mask attribute
	if (globals.dataMask) {
		$.applyDataMask();
	}

	setInterval(function() {
		if ($.jMaskGlobals.watchDataMask) {
			$.applyDataMask();
		}
	}, globals.watchInterval);
}, window.jQuery, window.Zepto));


//-------------------------OWN JQUERY FUNCTIONALITY-------------------------//

function parseFolio(value){
    var res="";
    if(!isNaN(parseInt(value))){
         res = ("0000000000" + value).slice (-10);
    }else{
        res = false;
    }
    return res;
}


function reorderSelect(nameSelect){
	  
	  var select = $(nameSelect);
	  
	  $.each(select, function(key, value){
		  
		  $(value).html($(value).find('option:not(:first)').sort(function(x, y) {
		    // to change to descending order switch "<" for ">"
		    return $(x).text() > $(y).text() ? 1 : -1;
		  }));
		  
		  $("<option>", { value: 'Seleccione...', selected: true }).prependTo($(value));
		  
		  $(value).get(0).selectedIndex = 0;
	  });
}

//TODO: Mostrar/Ocultar Informacion
jQuery.fn.collapseInformation = function(selector){
	$(document).find(selector).each(function(key, value){
		$(value).closest('tr').toggle();
	});
}


//Obtener Mes
var getMonthByString = function(input) {
	var pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
	if (!input || !input.match(pattern)) {
		return null;
	}
	return input.replace(pattern, '$2');
};

var changeDateformatYYYYMM = function(input) {
	var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
	if (!input || !input.match(pattern)) {
		return null;
	}
	return input.replace(pattern, '$4-$2');
};

//Validar Rut
$.validator.addMethod("rut", function(value, element) {
	return this.optional(element) || $.Rut.validar(value);
}, "Este campo debe ser un rut valido.");

//Validar Si es Menor de Edad
$.validator.addMethod(
		"underAge",
		function(value, element) {              
			var from = value.split("-"); // DD MM YYYY
			// var from = value.split("/"); // DD/MM/YYYY

			var day = from[0];
			var month = from[1];
			var year = from[2];
			var age = 18;

			var mydate = new Date();
			mydate.setFullYear(year, month-1, day);

			var currdate = new Date();
			var setDate = new Date();

			setDate.setFullYear(mydate.getFullYear() + age, month-1, day);

			if ((currdate - setDate) > 0){
				return true;
			}else{
				return false;
			}
		},
		"Debes ser mayor a 18 años"
);


jQuery.fn.fillSelectByService = function(URLService){
	
	var select = this;
	
	$.ajax({
		type : "GET",
		url : URLService,
		async: false,
		dataType : "json",
		success : function(data){
			
			$.each(data, function(key, registro) {
					$(".division").append(
							'<option value=' + registro.idDivision + '>'
							+ registro.nombre + '</option>');
			});
			
		},
		error : function(ex){
			alerta("No se encuentra Porcentaje de AFP asociado a ese AFP" + ex );
		}
	});
	
}

//Obtener las opciones de un select para poder filtrarlo
jQuery.fn.getOptionsBySelect = function(array) {

	var select = this;
	var options = [];

	$(select).find('option').each(function() {
		array.push({
			value: $(this).val(),
			text: $(this).text()
		});
	});
};

//Pasado un Array insertar opciones en un select
jQuery.fn.setOptionsByArray = function(array) {

	var select = this;

	if(array.length > 0){
		array.unshift({ value:"", text:"Seleccione.."});
	}
	
	$.each(array, function(key, value) {
		$(select).append($('<option>').text(value.text).val(value.value));
	});

};

//Insertar datos en los inputs
jQuery.fn.fillDataToInputByObject = function(objectData){
	var form = this;
	
	for (var key in objectData) {
		if (objectData.hasOwnProperty(key)) {
			// Encuentra input que tenga en el value el nombre del valor
			$(form).each(function(keyInput, valueInput){ 
				
				if($(valueInput).attr('col_name') == key){
					$(valueInput).val(objectData[key]);
				}
				
			});
		}
	}

};

//Obtener el valor de los inputs y retornar un objecto JSON TODO:
jQuery.fn.getObjectByInputs = function(){
	
	var objectData = new Object();
	
	$(this).each(function(key, value){
		var col_name = $(this).attr('col_name');  
		
		var col_val;
		
		if($(value).hasClass('percentage')){
			col_val = $(this).val().toString().replace(',','.').slice(0,-1);
		}if($(value).hasClass('moneyWork')){
			col_val = $(this).val().replace('.','').replace(',','.');
		}
		else{
			col_val = $(this).val();
		}

		objectData[col_name] = col_val;
	});

	return objectData;
	
};

//Obtener objecto JSON por Servicio synchronous
jQuery.fn.getObjectSycn = function(urlServicioPath){
	
	var objectData = new Object;
	
	$.ajax({
		type : "GET",
		async: false,
		url : urlServicioPath,
		dataType : "json",
		success : function(data) {
			objectData = data;
		},
		error : function(ex) {
			alert('Error:' + ex);
		}
	});
	
	return objectData;
	
};

//Renombre propiedad del Objeto
function renameProperty (object, oldName, newName) {
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

//Obtener todos los valores formatearlos e insertarlo en input correspondiente
jQuery.fn.setJSONToInputs = function(selector, Object){
	
	Object = Object;
	
	$(document).find(selector).each(function(key, val){
		
		if($(val).hasClass('dateWork')){
			aux = eval("Object."+$(val).attr('col_name'));
			$(val).val( changeDateformatDDMMYY(aux) );
		}
		else if($(val).hasClass('moneyWork')){
			$(val).val(formatNumber(eval("Object."+$(val).attr('col_name'))));
		}
		else if($(val).hasClass('checkbox')){
			aux = eval("Object."+$(val).attr('col_name'));
			aux == 1 ? $(val).prop('checked', true) : $(val).prop('checked', false);
		}else if($(val).hasClass('select2-hidden-accessible')){
			aux = eval("Object."+$(val).attr('col_name'));		
			$(val).val(aux).trigger('change');
		}
		else{
			$(val).val(eval("Object."+$(val).attr('col_name')));
		}

	});

	
};

//Obtener objecto JSON por Servicio synchronous 
jQuery.fn.getJSONSync = function(urlServicioPath){
	
	var objectData = new Object;
	
	$.ajax({
		type : "GET",
		async: false,
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


//Insertar objecto JSON por Servicio synchronous
jQuery.fn.setJSONSync = function(urlServicioPath, ObjectData){
	
	var enviado;
	
	$.ajax({
		url : urlServicioPath,
		async : false,
		type : "PUT",
		data : JSON.stringify(ObjectData),
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success: function(data){
			enviado = data;
		},
		error: function(ex){
			console.log("Error al Insertar: " + ex);
		}

	});
	
	return enviado;
	
};

var changeDateformatDDMMYY = function(input) {
	var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
	if (!input || !input.match(pattern)) {
		return null;
	}
	return input.replace(pattern, '$3-$2-$1');
};

var changeDateformatYYMMDD = function(input) {
	var pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
	if (!input || !input.match(pattern)) {
		return null;
	}
	return input.replace(pattern, '$3-$2-$1');
};

var changeDateformatMMYYYY = function(input) {
	var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
	if (!input || !input.match(pattern)) {
		return null;
	}
	return input.replace(pattern, '$2-$4');
};

var changeDateformatYYYYMM = function(input) {
	var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
	if (!input || !input.match(pattern)) {
		return null;
	}
	return input.replace(pattern, '$4-$2');
};

// ---------------------------PLUGIN VALIDATE RUT CHILENO--------------------//

/*
 * Copyright (c) 2009 José Joaquín Núñez (josejnv@gmail.com)
 * http://joaquinnunez.cl/blog/ Licensed under GPL
 * (http://www.opensource.org/licenses/gpl-2.0.php) Use only for non-commercial
 * usage.
 * 
 * Version : 0.5
 * 
 * Requires: jQuery 1.2+
 */

(function($)
		{
	jQuery.fn.Rut = function(options)
	{
		var defaults = {
				digito_verificador: null,
				on_error: function(){},
				on_success: function(){},
				validation: true,
				format: true,
				format_on: 'change'
		};

		var opts = $.extend(defaults, options);

		this.each(function(){

			if(defaults.format)
			{
				jQuery(this).bind(defaults.format_on, function(){
					jQuery(this).val(jQuery.Rut.formatear(jQuery(this).val(),defaults.digito_verificador==null));
				});
			}
			if(defaults.validation)
			{
				if(defaults.digito_verificador == null)
				{
					jQuery(this).bind('blur', function(){
						var rut = jQuery(this).val();
						if(jQuery(this).val() != "" && !jQuery.Rut.validar(rut))
						{
							defaults.on_error();
						}
						else if(jQuery(this).val() != "")
						{
							defaults.on_success();
						}
					});
				}
				else
				{
					var id = jQuery(this).attr("id");
					jQuery(defaults.digito_verificador).bind('blur', function(){
						var rut = jQuery("#"+id).val()+"-"+jQuery(this).val();
						if(jQuery(this).val() != "" && !jQuery.Rut.validar(rut))
						{
							defaults.on_error();
						}
						else if(jQuery(this).val() != "")
						{
							defaults.on_success();
						}
					});
				}
			}
		});
	}
		})(jQuery);

/**
 * Funciones
 */


jQuery.Rut = {

		formatear:  function(Rut, digitoVerificador)
		{
			var sRut = new String(Rut);
			var sRutFormateado = '';
			sRut = jQuery.Rut.quitarFormato(sRut);
			if(digitoVerificador){
				var sDV = sRut.charAt(sRut.length-1);
				sRut = sRut.substring(0, sRut.length-1);
			}
			while( sRut.length > 3 )
			{
				sRutFormateado = "." + sRut.substr(sRut.length - 3) + sRutFormateado;
				sRut = sRut.substring(0, sRut.length - 3);
			}
			sRutFormateado = sRut + sRutFormateado;
			if(sRutFormateado != "" && digitoVerificador)
			{
				sRutFormateado += "-"+sDV;
			}
			else if(digitoVerificador)
			{
				sRutFormateado += sDV;
			}

			return sRutFormateado;
		},

		quitarFormato: function(rut)
		{
			var strRut = new String(rut);
			while( strRut.indexOf(".") != -1 )
			{
				strRut = strRut.replace(".","");
			}
			while( strRut.indexOf("-") != -1 )
			{
				strRut = strRut.replace("-","");
			}

			return strRut;
		},

		digitoValido: function(dv)
		{ 
			if ( dv != '0' && dv != '1' && dv != '2' && dv != '3' && dv != '4' 
				&& dv != '5' && dv != '6' && dv != '7' && dv != '8' && dv != '9' 
					&& dv != 'k'  && dv != 'K')
			{   
				return false; 
			} 
			return true;
		},

		digitoCorrecto:   function(crut)
		{ 
			largo = crut.length;
			if ( largo < 2 )  
			{   
				return false; 
			}
			if(largo > 2)
			{
				rut = crut.substring(0, largo - 1);
			}
			else
			{   
				rut = crut.charAt(0);
			}
			dv = crut.charAt(largo-1);
			jQuery.Rut.digitoValido(dv);  

			if(rut == null || dv == null)
			{
				return 0;
			}

			dvr = jQuery.Rut.getDigito(rut);

			if (dvr != dv.toLowerCase())  
			{   
				return false;
			}
			return true;
		},

		getDigito:    function(rut)
		{
			var dvr = '0';
			suma = 0;
			mul  = 2;
			for(i=rut.length -1;i >= 0;i--) 
			{ 
				suma = suma + rut.charAt(i) * mul;    
				if (mul == 7)
				{
					mul = 2;
				}   
				else
				{         
					mul++;
				} 
			}
			res = suma % 11;  
			if (res==1)
			{
				return 'k';
			} 
			else if(res==0)
			{   
				return '0';
			} 
			else  
			{   
				return 11-res;
			}
		},

		validar:   function(texto)
		{
			texto = jQuery.Rut.quitarFormato(texto);
			largo = texto.length;



			// rut muy corto
			if ( largo < 2 )  
			{
				return false; 
			}

			// verifica que los numeros correspondan a los de rut
			for (i=0; i < largo ; i++ ) 
			{   
				// numero o letra que no corresponda a los del rut
				if(!jQuery.Rut.digitoValido(texto.charAt(i)))
				{     
					return false;
				}
			}

			var invertido = "";
			for(i=(largo-1),j=0; i>=0; i--,j++)
			{
				invertido = invertido + texto.charAt(i);
			}
			var dtexto = "";
			dtexto = dtexto + invertido.charAt(0);
			dtexto = dtexto + '-';  
			cnt = 0;  

			for ( i=1,j=2; i<largo; i++,j++ ) 
			{
				if ( cnt == 3 )   
				{     
					dtexto = dtexto + '.';      
					j++;      
					dtexto = dtexto + invertido.charAt(i);      
					cnt = 1;    
				}
				else    
				{       
					dtexto = dtexto + invertido.charAt(i);      
					cnt++;    
				} 
			} 

			invertido = ""; 
			for (i=(dtexto.length-1),j=0; i>=0; i--,j++)
			{   
				invertido = invertido + dtexto.charAt(i);
			}

			if (jQuery.Rut.digitoCorrecto(texto))
			{   
				return true;
			}
			return false;
		}
};



//----------------------JQUERY CURRENCY CONVERTED--------------//
(function($){$.formatCurrency={};$.formatCurrency.regions=[];$.formatCurrency.regions[""]={symbol:"$",positiveFormat:"%s%n",negativeFormat:"(%s%n)",decimalSymbol:".",digitGroupSymbol:",",groupDigits:true};
$.fn.formatCurrency=function(destination,settings){if(arguments.length==1&&typeof destination!=="string"){settings=destination;destination=false
}var defaults={name:"formatCurrency",colorize:false,region:"",global:true,roundToDecimalPlace:2,eventOnDecimalsEntered:false};defaults=$.extend(defaults,$.formatCurrency.regions[""]);
settings=$.extend(defaults,settings);if(settings.region.length>0){settings=$.extend(settings,getRegionOrCulture(settings.region))}settings.regex=generateRegex(settings);
return this.each(function(){$this=$(this);var num="0";num=$this[$this.is("input, select, textarea")?"val":"html"]();if(num.search("\\(")>=0){num="-"+num
}if(num===""||(num==="-"&&settings.roundToDecimalPlace===-1)){return}if(isNaN(num)){num=num.replace(settings.regex,"");if(num===""||(num==="-"&&settings.roundToDecimalPlace===-1)){return
}if(settings.decimalSymbol!="."){num=num.replace(settings.decimalSymbol,".")}if(isNaN(num)){num="0"}}var numParts=String(num).split(".");var isPositive=(num==Math.abs(num));
var hasDecimals=(numParts.length>1);var decimals=(hasDecimals?numParts[1].toString():"0");var originalDecimals=decimals;num=Math.abs(numParts[0]);
num=isNaN(num)?0:num;if(settings.roundToDecimalPlace>=0){decimals=parseFloat("1."+decimals);decimals=decimals.toFixed(settings.roundToDecimalPlace);
if(decimals.substring(0,1)=="2"){num=Number(num)+1}decimals=decimals.substring(2)}num=String(num);if(settings.groupDigits){for(var i=0;i<Math.floor((num.length-(1+i))/3);
i++){num=num.substring(0,num.length-(4*i+3))+settings.digitGroupSymbol+num.substring(num.length-(4*i+3))}}if((hasDecimals&&settings.roundToDecimalPlace==-1)||settings.roundToDecimalPlace>0){num+=settings.decimalSymbol+decimals
}var format=isPositive?settings.positiveFormat:settings.negativeFormat;var money=format.replace(/%s/g,settings.symbol);money=money.replace(/%n/g,num);
var $destination=$([]);if(!destination){$destination=$this}else{$destination=$(destination)}$destination[$destination.is("input, select, textarea")?"val":"html"](money);
if(hasDecimals&&settings.eventOnDecimalsEntered&&originalDecimals.length>settings.roundToDecimalPlace){$destination.trigger("decimalsEntered",originalDecimals)
}if(settings.colorize){$destination.css("color",isPositive?"black":"red")}})};$.fn.toNumber=function(settings){var defaults=$.extend({name:"toNumber",region:"",global:true},$.formatCurrency.regions[""]);
settings=jQuery.extend(defaults,settings);if(settings.region.length>0){settings=$.extend(settings,getRegionOrCulture(settings.region))}settings.regex=generateRegex(settings);
return this.each(function(){var method=$(this).is("input, select, textarea")?"val":"html";$(this)[method]($(this)[method]().replace("(","(-").replace(settings.regex,""))
})};$.fn.asNumber=function(settings){var defaults=$.extend({name:"asNumber",region:"",parse:true,parseType:"Float",global:true},$.formatCurrency.regions[""]);
settings=jQuery.extend(defaults,settings);if(settings.region.length>0){settings=$.extend(settings,getRegionOrCulture(settings.region))}settings.regex=generateRegex(settings);
settings.parseType=validateParseType(settings.parseType);var method=$(this).is("input, select, textarea")?"val":"html";var num=$(this)[method]();
num=num?num:"";num=num.replace("(","(-");num=num.replace(settings.regex,"");if(!settings.parse){return num}if(num.length==0){num="0"}if(settings.decimalSymbol!="."){num=num.replace(settings.decimalSymbol,".")
}return window["parse"+settings.parseType](num)};function getRegionOrCulture(region){var regionInfo=$.formatCurrency.regions[region];if(regionInfo){return regionInfo
}else{if(/(\w+)-(\w+)/g.test(region)){var culture=region.replace(/(\w+)-(\w+)/g,"$1");return $.formatCurrency.regions[culture]}}return null}function validateParseType(parseType){switch(parseType.toLowerCase()){case"int":return"Int";
case"float":return"Float";default:throw"invalid parseType"}}function generateRegex(settings){if(settings.symbol===""){return new RegExp("[^\\d"+settings.decimalSymbol+"-]","g")
}else{var symbol=settings.symbol.replace("$","\\$").replace(".","\\.");return new RegExp(symbol+"|[^\\d"+settings.decimalSymbol+"-]","g")}}})(jQuery);

