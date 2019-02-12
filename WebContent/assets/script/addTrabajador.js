//Copiar Informacion de Huerto tabla Trabajador a Contrato
$(function () {
    var $src = $('#idHuerto'),
        $dst = $('#idHuertoContrato');
    $src.on('input', function () {
        $dst.val($src.val());
    });
});

//Copiar Informacion de CECO tabla Trabajador a Contrato
$(function () {
    var $src = $('#idCECO'),
        $dst = $('#idCECOContrato');
    $src.on('input', function () {
        $dst.val($src.val());
    });
});

//Copiar Informacion de Faena tabla Trabajador a Contrato
$(function () {
    var $src = $('#idFaenaContrato'),
        $dst = $('#idFaena');
    $src.on('input', function () {
        $dst.val($src.val());
    });
});


var objContrato;
var trabajadorGlobal;
var contratoGlobal;
var finiquitadoGlobal = false;

// Options Academicos
var optionsNivel = [];
var optionsCarrera = [];
var optionsInstituciones = [];
var optionsNombreInstitucion = [];

var sociedadPrivilege = new Set();
var huertoPrivilege = new Set();
//Obtener Sociedades y Huertos que tiene acceso
$.each(SESION.campo, function(key, value){
	sociedadPrivilege.add(value.idSociedad);
	huertoPrivilege.add(value.campo);
}); 


$(document).ready(function() {
	
	event.preventDefault();
	
	window.addEventListener("keypress", function(event){
    if (event.keyCode == 13){
        event.preventDefault();
    }
}, false);

	// Selectores
	getSelector();
	
	// Cargar Formatos de Inputs
	setFormatInputs();

	// Logica de Inputs
	setLogicEventInputs();
	
	//Agregar Elementos que modifican el estilo
	setStyleInView();
		
	
});

function setStyleInView(){
	
	$(document).find('table').each(function(key, value){
		$(value).addClass('col-md-12');
	});
	
	$(document).find('th').each(function(key, value){
		$(value).addClass('col-md-3');
	});
	
	$(document).find('td').each(function(key, value){
		$(value).addClass('col-md-9');
	});
	
}

function setFormatInputs(){
	
	// Validador de Rut
	$('#rutWorker, #rutTemporal').Rut({format_on: 'keyup'});

	// Formato numero de Telefono
	$('#phoneCasa, #telefonoEmergencia').mask('00 0000000');
	$('#celular').mask('0 0000-0000');
	
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



// Fomatear Numero
function formatNumber(input){

		if(input == ''){
			return '';
		}else{
			var number = parseFloat(input).toFixed(3);

			var numberVal = number.replace(".", ",");

			numberArray = new Array();
			numberArray = numberVal.split(',');

			entero  = numberArray[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

			return ("$"+entero+","+numberArray[1]);
		}
	
}




//function subirFoto(){
//	
//	alerta("Prueba");
//	
//	
//}


// Logica de Inputs
function setLogicEventInputs(){
	
	//Botones de Accion
	$(document).find('.btn_save').hide();
	$(document).find('.btn_cancel').show();

	$(document).find('input, select')
	.css('padding','0px')
	.attr('readonly', false)
	.attr('disabled', false)

	// Fechas
	$('.dateWork').each(function(key, value){
		$(value).datepicker({ changeMonth: true, changeYear: true, yearRange: "1930:+10", dateFormat: 'dd-mm-yy' });
	});
	
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
		yearRange: "1930:+10",
		maxDate: '0'

	});
	
	//Opciones de Defaults:
	//Nacionalidad Chileno
	$('#idNacionalidad option:contains("Chileno")').prop('selected',true);
	//Salud Fonasa
	$('#idIsapre option:contains("Fonasa")').prop('selected',true);
	//Con Seguro Cesantia
	$('#sCesantia').prop('checked',true);
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

		}

	});

	// Filtros para Nivel Academico del Trabajador
	$('#nivel').getOptionsBySelect(optionsNivel);
	$('#carrera').getOptionsBySelect(optionsCarrera);
	$('#instituciones').getOptionsBySelect(optionsInstituciones);
	$('#nombreInstitucion').getOptionsBySelect(optionsNombreInstitucion);
	
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


		$('#nivel').setOptionsByArray(optionNivel, "text", "value");
		$('#carrera').setOptionsByArray(optionCarrera, "text", "value");
		$('#instituciones').setOptionsByArray(optionInstituciones, "text", "value");
		$('#nombreInstitucion').setOptionsByArray(optionNombreInstitucion, "text", "value");


	});

	//Bloquear Region Comuna
	$('#idProvincia, #idComuna').prop('disabled', 'disabled');
	
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
					
					//Desbloquear Select de Provincia
					$("#idProvincia").prop('disabled',false);
					
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
					
					//Desbloquear Select de Provincia
					$("#idComuna").prop('disabled',false);
					
				});
			}
		});



	});

	//Si el valor es 1 checkear
	$('.checkboxOption').on('change', function(){
		this.value = this.checked ? 1 : 0;
	}).change();

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

	//Si el Contrato es Plazo/Fijo colocar Fecha de Termino
	$('#tipoContrato').on('change', function(){

		if($(this).val() != 3){
			$('#fechaTermino').datepicker('setDate', null);
			$('#fechaTermino').prop('disabled', true);
		}
		else{
			$('#fechaTermino').prop('disabled', false);
		}

	}).change();

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
	
	//Validaciones para el Tipo de Cuenta
	$('#idTipoCuenta1').on('change', function(){

		//Si es Servipag 
		if($(this).val() == 12){
			$('#idBanco1, #nCuenta1').prop('disabled', true).val('');
		}
		else{
			$('#idBanco1, #nCuenta1').prop('disabled', false).val('');
		}

	}).change();
	
	//Validaciones para el Tipo de Cuenta
	$('#idTipoCuenta2').on('change', function(){

		//Si es Servipag 
		if($(this).val() == 12){
			$('#idBanco2, #nCuenta2').prop('disabled', true).val('');
		}
		else{
			$('#idBanco2, #nCuenta2').prop('disabled', false).val('');
		}

	}).change();
	
	//Validaciones para Banco
	$('#idBanco1').on('change', function(){

		//Si es Servipag 
		if($(this).val() == 33){
			$('#nCuenta1').prop('disabled', true).val('');
		}
		else{
			$('#nCuenta1').prop('disabled', false).val('');
		}

	}).change();
	
	//Validaciones para Banco
	$('#idBanco2').on('change', function(){

		//Si es Servipag 
		if($(this).val() == 33){
			$('#nCuenta2').prop('disabled', true).val('');
		}
		else{
			$('#nCuenta2').prop('disabled', false).val('');
		}

	}).change();
	
	
	//Bloquear Huerto, Zona, CECO
	$('#idHuerto, #idZona, #idCECO, #idFaenaContrato, #cargo').prop('disabled', 'disabled');

	//Seleccionar el Huerto asociado a la empresa:
	$('#sociedad').change(function(){ 
		
		//Obtener la faena 
		$('#idFaena').children('option:not(:first)').remove();
		$('#idFaenaContrato').children('option:not(:first)').remove();
		let faena = $(this).getJSONSync("/simpleWeb/json/work/Faenas/getFaenaBySociedad/"+$('#sociedad').val());
		$('#idFaena').setOptionsByArray(faena, "nombreFaena", "idFaena");
		$('#idFaenaContrato').setOptionsByArray(faena, "nombreFaena", "idFaena");
		
		//Obtener el Cargo
		$('#cargo').children('option:not(:first)').remove();
		let cargo = $(this).getJSONSync("/simpleWeb/json/work/cargos/getCargoByIdSociedad/"+$('#sociedad').val());
		$('#cargo').setOptionsByArray(cargo, "cargos", "id_cargo");
		
		$('#idHuerto').children('option:not(:first)').remove();
		$('#idZona').children('option:not(:first)').remove();
		$('#idCECO').children('option:not(:first)').remove();
		
		//Obtener Codigo de la Sociedad en base al Id:
		let sociedadSAP = $(this).getJSONSync("/simpleWeb/json/work/getSociedadById/"+$('#sociedad').val());
		
		let queryString;
		if(huertoPrivilege == null){
			queryString = "";
		}else{
			queryString = JSON.stringify(huertoPrivilege).slice(1,-1);
		}
		
		//Obtener Huerto por la Sociedad
		let huerto = $(this).getJSONSync("/simpleWeb/json/work/getCampoWithFilter/?"+"campo="+queryString+"&sociedad="+sociedadSAP.sociedad);
			
		// Llenar select de la Lista Huerto
		$('#idHuerto').setOptionsByArray(huerto, "descripcion", "campo");
		
		$('#idHuerto, #idFaenaContrato, #cargo').prop('disabled',false);
		

	});
	
	
	//Seleccionar el Huerto asociado a la empresa:
	$('#idHuerto').change(function(){ 
	
		$('#idZona').children('option:not(:first)').remove();
		$('#idCECO').children('option:not(:first)').remove();
	
		//Obtener Zona por el Huerto
		let idZona = $(this).getJSONSync("/simpleWeb/json/work/getCampoByCampo/"+$('#idHuerto').val());
		
		// Llenar select de la Lista Zona
		$('#idZona').setOptionsByArray(idZona, "zona", "grupo_ceco_work");
		
		$('#idZona').prop('disabled',false);
		
	
	});
	
	//Obtener CECO
	$('#idZona').change(function(){
		
		$('#idCECO').children('option:not(:first)').remove();
		
		let CECOAgrupacion = ""
		$.each(SESION.campo, function(key, value){
			if(value.campo == $('#idHuerto').val()){
				CECOAgrupacion = value.cecos;
			} 
		});
		
		//Obtener CECO por la Zona
		let CECOSAP = $(this).getJSONSync(IPSERVERSAP+"JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+$('#sociedad').val()+"&GRUPO="+$('#idZona').val()+"&CECO="+CECOAgrupacion);
		let CECO = CECOSAP.COSTCENTERLIST;
		
		// Llenar select de la Lista de CECO
		$.each(CECO, function(key, value) {
			if(value.COSTCENTER != ''){
				$('#idCECO').append($('<option>').text(value.DESCRIPT + " | " + value.COSTCENTER).val(value.COSTCENTER));
			}
		});
		
		$('#idCECO').prop('disabled', false);
		
	});
	
	
	// Colocar todos los select en mayusculas
	$(document).find('input, select').each(function(key, value){
		$(value).addClass('mayusculasWork');
	});
	
	//Boton Siguiente Cuando se encuentra en el Tab de Personales
	$('#btnSiguiente').click(function(){
		
		//Obtener el formulario
		var formulario = $('#insertarTrabajadorForm');
		//Validar el Formulario
		formulario.validate();
		//Si el Formulario es valido pasar a la parte de laborales
		if(formulario.valid()){
			$("#laborales").tab('show');
			$("#datos_personales").removeClass('active in');
			$("#datos_laborales").addClass('active in');
			$("#btnSave").show(); //Mostrar el Boton de GUARDAR
			$(this).hide();//Ocultar este Boton 
		}
		
	});

	//Si se devuelven a la seccion de Personales Ocultar boton de Guardar
	//y mostrar el de Siguiente
	$('#personales').click(function(){
		$('#btnSiguiente').show();
		$("#btnSave").hide();
	});

	//Si van a la seccion de laborales mostrar el boton de Guardar
	//y Ocultar el de Siguiente
	$('#laborales').click(function(){
		$('#btnSave').show();
		$("#btnSiguiente").hide();
	});

	//Copiar Fecha de Ingreso de Contrato a fecha de Ingreso de Compania
//	$('#fechaIngreso').focusout(function() {
//	    //$('#fechaIngresoCompania').val($(this).val());
//	    //$('#fIngresoCompContrato').val($(this).val());
//	});
	
	var allRadios = document.getElementsByName('cuentaPrimaria');
	var booRadio;
	var x = 0;
	for(x = 0; x < allRadios.length; x++){
	  allRadios[x].onclick = function() {
	    if(booRadio == this){
	      this.checked = false;
	      booRadio = null;
	    } else {
	      booRadio = this;
	    }
	  };
	}
	
	
	//SetDefaults Banco1 TODO:
	$('#idBanco1').change(function(){
		
		if($(this).find('option:selected').text() == "Banco CrediChile"){
			$('#idTipoCuenta1 option:contains("Abono Bancuentas CrediChile")').prop('selected',true);
		}
		else if($(this).find('option:selected').text() == "Banco Chile"){
			$('#idTipoCuenta1 option:contains("Cuenta Corriente del Banco de Chile")').prop('selected',true);
		}
		else if($(this).find('option:selected').text() != "Banco Chile" && $(this).find('option:selected').text() != "Banco Chile" && $(this).find('option:selected').text() != "SERVIPAG" ){
			$('#idTipoCuenta1 option:contains("Cuenta Corriente de otros Bancos")').prop('selected',true);
		}
		
	});
	
	//SetDefaults Banco2 TODO:
	$('#idBanco2').change(function(){
		
		if($(this).find('option:selected').text() == "Banco CrediChile"){
			$('#idTipoCuenta2 option:contains("Abono Bancuentas CrediChile")').prop('selected',true);
		}
		else if($(this).find('option:selected').text() == "Banco Chile"){
			$('#idTipoCuenta2 option:contains("Cuenta Corriente del Banco de Chile")').prop('selected',true);
		}
		else if($(this).find('option:selected').text() != "Banco Chile" && $(this).find('option:selected').text() != "Banco Chile" && $(this).find('option:selected').text() != "SERVIPAG" ){
			$('#idTipoCuenta2 option:contains("Cuenta Corriente de otros Bancos")').prop('selected',true);
		}
		
	});
	
	//Collapse/Show Information TODO:
	cerrarModales();
	
	//TODO: Cambiar Formato moneda segun el tipo de moneda
	$('#idMonedaAVP, #idMonedaAFP, #idMonedaConvenido, #idMonedaPlan').change(function(element){
		
		let input;
		
		//Obtener el input que voy a cambiar Manual TODO: mejorar
		if($(this).attr('id') == 'idMonedaAVP'){
			input = '#valorDepositoAPV';
		}else if($(this).attr('id') == 'idMonedaAFP'){
			input = '#valorAFP';
		}else if($(this).attr('id') == 'idMonedaConvenido'){
			input = '#valorConvenido';
		}else if($(this).attr('id') == 'idMonedaPlan'){
			input = '#valorPlan';
		}
		
		if($(this).find("option:selected").text() == 'U.F.'){
			$(input).removeClass('moneyWork');
			$(input).off("blur");
			$(input).off("keyup");
			 
			$(input).on({
				  "focus": function(event) {
				    $(event.target).select();
				  },
				  "keyup": function(event) {
				    $(event.target).val(function(index, value) {
				    	  return value.replace(/[^0-9\,]/g, "")
				        .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
				    });
				  }
				});
			 
			 $(input).addClass('moneyWork');
			 
		}
		else if($(this).find("option:selected").text() == 'Pesos'){
			$(input).addClass('moneyWork');
			$(input).off("focus");
			$(input).off("keyup");
			setFormatInputs();
		}
		
	});
	
	
	$('#pensionados, #pensionadosCotizantes , #mayor11Anos , #sCesantia').click(function(element){
		if($("#pensionados").is(':checked') || $("#pensionadosCotizantes").is(':checked')){
			$('#sCesantia').prop('checked', false).val(0);
			$('#sCesantia').attr('disabled', true);
		}else{
			$('#sCesantia').attr('disabled', false);
		}
		
	});
	
	
	$('#nivelEducacion').change(function(){
		if($('#nivelEducacion').find('option:selected').text() == "Sin Escolaridad"){
			$('#nivel, #carrera, #instituciones, #nombreInstitucion, #fechaDesdeInstitucion, #fechaHastaInstitucion').attr('disabled',true);	
		}else{
			$('#nivel, #carrera, #instituciones, #nombreInstitucion, #fechaDesdeInstitucion, #fechaHastaInstitucion').attr('disabled',false);
		}
	});
	
	
}

// Si el trabajador ya existe en base de Datos
function existTrabajador(){
	
	// Obtener Trabajador por el RUT
	let trabajador = $(this).getJSONSync("/simpleWeb/json/work/getTrabajadorByRut/"+$('#rutWorker').val()); 
	
	// Obtener Su Ultimo contrato
	let contrato = $(this).getJSONSync("/simpleWeb/json/work/getUltimoContratoActivoByIdTrabajador/"+trabajador.codigo); 
	
	$(this).setJSONToInputs(".row_data", trabajador); // Setear los Datos del Trabajador 
	$(this).setJSONToInputs(".row_dataLaboral", contrato); // Setear los Datos del Contrato
	
	// Bloquear Todos Los input Exepto El Rut
	$("#insertarTrabajadorForm").find(":input").each(function(key, value){
		if(key != 2){
		$(value).prop('disabled', true);
		}
	});
	
}

//Collapse/Show Information
function cerrarModales(){
	
	 $('#licenciaQuimicos').click(function () {
	        $(this).collapseInformation('.row_dataQuimicos');
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
	
	$('#datosDireccion').click(function(){
		$(this).collapseInformation('.row_dataDireccion');
	});
	
	
}

// Si el trabajador ya existe en base de Datos y esta finiquitado
function existTrabajadorWithFiniquito(){
	
		if($('#rutWorker').val() != 'undefined'){
		debugger;
		let trabajador = $(this).getJSONSync("/simpleWeb/json/work/getTrabajadorByRut/"+$('#rutWorker').val());
		
		let contratoTrabajador = $(this).getJSONSync("/simpleWeb/json/work/getUltimoContrato/?codigo_trabajador="+trabajador.codigo);
			
		// Si el trabajador no tiene contrato activo
		if(contratoTrabajador.estado_contrato == 0){
			
			let provincia = $(this).getJSONSync("/simpleWeb/json/work/getAllProvincia/");
			let comuna = $(this).getJSONSync("/simpleWeb/json/work/getAllComuna/");
			
			// Llenar select
			$('#idProvincia').setOptionsByArray(provincia, "nombre", "id");
			$('#idComuna').setOptionsByArray(comuna, "nombre", "id");
			
			// Setear Datos en los Campos
			$(this).setJSONToInputs(".row_data", trabajador);
			
			//Ocultar Inputs no necesarios para nuevo ingreso
			$(document).find(".row_dataCuenta").closest('table').hide();
			$(document).find(".row_dataAcademicos").closest('table').hide();
			$(document).find(".row_dataDiscapacidad").closest('table').hide();
			$(document).find(".row_dataConducir:first").closest('tr').parent('tr').hide();
			$(document).find("#licenciaQuimicos").closest('tr').hide();
			$(document).find("#licenciaConducir").closest('tr').hide();
			$(document).find("#licenciaMaternal").closest('tr').hide();
			
			//Asignacion de Variables Globales
			trabajadorGlobal = trabajador;
			finiquitadoGlobal = true;
			
			//bug: ingresar datos supervisor, maquinista, 
			$("#supervisor").val(contratoTrabajador.supervisor);
			$("#maquinista").val(contratoTrabajador.maquinista);
			$("#partTime").val(contratoTrabajador.partTime);
			
			contratoTrabajador.supervisor == 1 ? $("#supervisor").attr("checked", true) : $("#supervisor").attr("checked", false);
			contratoTrabajador.maquinista == 1 ? $("#maquinista").attr("checked", true) : $("#maquinista").attr("checked", false);
			contratoTrabajador.partTime == 1 ? $("#partTime").attr("checked", true) : $("#partTime").attr("checked", false) ;
			
			swal({
				title: 'Desea generar un nuevo contrato?',
				text: 'Existe un Trabajador Con este Rut Finiquitado', 
	            showCancelButton: true,
	            width: 400,
	            cancelButtonColor: '#d33',
	            cancelButtonText: 'No',
	            confirmButtonText:
	                '<i class="fa fa-file"></i> Generar Nuevo Contrato',
			}).then(function(result){
				if(result.value){console.log("agregar nuevo contrato")}
				else{
					location.reload();	
				}
			}), function(dismiss){
				location.reload();
			};
			
			return true;
			
		}
		
	}
	
		return false;
	
}

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


$(function() {
	var codigoGlobal;
	
	function updateWorkerPersonal(codigoGlobal){
		
		let trabajadores = {
				idHuerto : $('#idHuertoContrato').val(), 
				idCECO   : $('#idCECOContrato').val(),
				idFaena  : $('#idFaenaContrato').val(),
				codigo   : codigoGlobal
		}		
		
		$(this).setJSONSync('/simpleWeb/json/work/trabajadores/updateTrabajadorCECO/', trabajadores);
		
	}
	
	
	
	
	//TODO nuevos Datos: 
	function addnewWorkerLicenciaConducir(arrConducir, codigoGlobal){
		$.extend(arrConducir,{idTrabajador:codigoGlobal});
		$(this).setJSONSync('/simpleWeb/json/work/insertTrabajadorLicenciaConducir/', arrConducir);
	}
	
	function addnewWorkerLicenciaQuimicos(arrQuimicos, codigoGlobal){
		$.extend(arrQuimicos,{idTrabajador:codigoGlobal});
		$(this).setJSONSync('/simpleWeb/json/work/insertTrabajadorLicenciaAplicador/', arrQuimicos);
	}
	
	function addnewWorkerLicenciaMaternal(arrMaternal, codigoGlobal){	
		$.extend(arrMaternal,{idTrabajador:codigoGlobal});
		$(this).setJSONSync('/simpleWeb/json/work/insertTrabajadorLicenciaMaternal/', arrMaternal);
	}
	
	//Agregar Nuevo registro de Documento
	function addnewWorkerDocumentos(arrDocumentos, codigoGlobal){
		
		//Inicializo una nueva estructura para subir documento
		let formDocumento = new FormData();
		
		//Obtengo Documento del Input File
		let fileDocumento = $('#idDocumento').prop("files")[0];
		
		//Si es nulo retornar
		if(fileDocumento == null){
			return;
		}
		
		console.log(fileDocumento.name);
		
		//Borro documento del Input
		delete arrDocumentos.documento;

		//Inserto documento y datos del formulario
		formDocumento.append("documento", fileDocumento);
		formDocumento.append("codTrabajador", codigoGlobal);
		formDocumento.append("tipoDocumento", "50");
		formDocumento.append("nombreDocumento", fileDocumento.name);
		
		//Enviar documentos y datos del formulario al servicio 
		$.ajax({
			url : "/simpleWeb/file/work/DocumentosFile/imagenes/insertDocumentos/",
			dataType : 'script',
			cache : false,
			contentType : false,
			processData : false,
			data : formDocumento, //Datos
			type : 'post',
			success : function() {

			}
		});
		
	}
	
	//Insertar datos en la tabla sw_r_anexoContrato TODO:
	function addnewWorkerAnexoContrato(codigoGlobal){
		let anexoContrato = $(this).getJSONSync("/simpleWeb/json/work/getUltimoContratoActivoByIdTrabajador/"+codigoGlobal); //Obtener el Contrato
		let idTrabajador = $(this).getJSONSync("/simpleWeb/json/work/getIdTrabajadorByCodigo/"+codigoGlobal); //Obtener el Id del Trabajador
		
		anexoContrato.periodo = changeDateformatYYYYMM($('#fechaIngreso').val())+"-01";
		anexoContrato.idTrabajador = idTrabajador;
		anexoContrato.fechaCreacion = $('#fechaIngreso').val();
		
		// Insertar Anexo de Contrato
		$(this).setJSONSync("/simpleWeb/json/work/insertAnexoContrato/",anexoContrato);
		
	}
	
	// Insertar datos en la tabla sw_r_trabajadorPeriodo
	function addnewWorkerTrabajadorPeriodo(codigoGlobal){
		
		var TrabajadorPeriodo = new Object();
		
		var idTrabajador = $(this).getJSONSync("/simpleWeb/json/work/getIdTrabajadorByCodigo/"+codigoGlobal);

		TrabajadorPeriodo = $(document).find('.row_data').getObjectByInputs();
		TrabajadorPeriodo.periodo = changeDateformatYYYYMM($('#fechaIngreso').val());
		TrabajadorPeriodo.periodoTrabajador = changeDateformatYYYYMM($('#fechaIngreso').val())+"-01";
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



	function addnewWorkerInstitucion(arrInstitucion, codigoGlobal){

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

		$.extend(arrInstitucion, {idTrabajador:id});

		// Insertar datos Academicos
		$.ajax({
			url : "/simpleWeb/json/work/insertAcademico/",
			type : "PUT",
			async : false,
			data : JSON.stringify(arrInstitucion),
			beforeSend : function(xhr){
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success: function(){

			}

		});

	}

	function addnewWorkerLaboral(arrLaboral, codigoGlobal){
debugger;
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
		debugger;
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

		$.extend(arr, {codigo:codigo});

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

	
	$("#insertarTrabajadorForm").validate({

		errorElement : 'span',
		errorClass : 'help-block help-block-error',
		focusInvalid : true,
		rules : {	
			rut : {required : function(element){ return $("#idNacionalidad").find("option:selected").text() == 'Chileno'; },
				remote : {
					url: "/simpleWeb/json/work/existTrabajadorByRut",
					type: "post",
					dataFilter: function (data) {
						debugger;
						var json = JSON.parse(data);
						if (json.rut) {
							$("#rutWorker").addClass('getTrabajador');
							if(existTrabajadorWithFiniquito() == true){
								return 'true';
							}else{
								existTrabajador(); // Si Existe Trabajador
													// Traer los Datos y
													// Bloquear Inputs
							};
							return "\"" + "El rut ya existe" + "\"";
						} else {
							$("#rutWorker").removeClass('getTrabajador');

							$("#insertarTrabajadorForm").find(':input').each(function(key, value){ 
								
								if(key > 7){  // Limpiar Los Inputs									
									if($(value).attr('id') != "sCesantia" && $(value).attr('id') != "idIsapre" && $(value).attr('id') != "idAFP" ){ //TODO:Bug Elimina preDefaults Datos
										$(value).val('')
									}
								}
								$(value).prop('disabled', false); // Desbloquear
																	// los
																	// Inputs
								
							});

							return 'true';
						}
					}
				}, 
			},
			rutTemporal : {required : function(element){ return $("#idNacionalidad").find("option:selected").text() != 'Chileno' && $('#rutWorker').val() == '' && $('#pasaporte').val() == ''; },
				remote : {
					url: "/simpleWeb/json/work/existTrabajadorByRutTemporal",
					type: "post",
					dataFilter: function (data) {
						var json = data;
						if (json == true) {
							$("#rutTemporal").addClass('getTrabajador');
							return "\"" + "El rut provisorio ya existe" + "\"";
						} else {
							$("#rutTemporal").removeClass('getTrabajador');
							return 'true';
						}
					}
				}, 
			},
			pasaporte : { required : function(element){ return $("#idNacionalidad").find("option:selected").text() != 'Chileno' && $('#rutWorker').val() == '' && $('rutTemporal').val() == ''; } },
			nombre : {required : true},
			apellidoPaterno : {required : true},
			fNacimiento : {required : true, underAge: true },
			idGenero : {required : true},
			idNacionalidad : {required : true},
			idEstadoCivil : {required : true},
			telefono: { required: false },
			celular: { required: false },
			email : {required : false, email : true},
			direccion : {required : true},
			idRegion : {required : true},
			idProvincia : {required : true},
			idComuna : {required : true},
			
			// Bancos
			idTipoCuenta1        	: { required : function(element){ 
																if($("#i1").is(':checked')){
																	return true;
																}else {
																	return false;
																}
			}

			},
			idBanco1        	: { required : function(element){ 
																if($("#i1").is(':checked') && $('#idTipoCuenta1').val() != 2 ){
																	return true;
																}else {
																	return false;
																}
			}
				
			},
			nCuenta1        	: { required : function(element){ 
																if($("#i1").is(':checked') && $('#idTipoCuenta1').val() != 2){
																	return true;
																}else {
																	return false;
																}
			}

			},
			idTipoCuenta2        : { required : function(element){ 
																if($("#i2").is(':checked')){
																	return true;
																}else {
																	return false;
																}
			}

			},
			idBanco2        : { required : function(element){ 
																if($("#i2").is(':checked') && $('#idTipoCuenta2').val() != 2){
																	return true;
																}else {
																	return false;
																}
			}

			},
			nCuenta2        	: { required : function(element){ 
																if($("#i2").is(':checked') && $('#idTipoCuenta2').val() != 2){
																	return true;
																}else {
																	return false;
																}
			}

			},
			
			
			tipoTrabajador : {required : true},
			idTurno : {required : false},
			cargo : {required : true},
			posicion : {required : false},
			sociedad : {required : true},
			idHuerto : {required : true},
			idZona : {required : true},
			idCECO : {required : true},
			fecha_inicio_actividad : {required : true},
			fecha_termino_actividad : {required : true },
			fechaIngresoCompania : {required : false},
			hrs_semanal : {required : true},
			tipoContrato : {required : true},
			sueldo_mensual : {required : true},
			emailEmergencia : {email : true},
			colacionFija : {required : "#valorFijo:checked"},
			movilizacionFija : {required : "#valorFijo:checked"},

			// Salud
			idAFP : {required : true}, 
			idAdicionalAFP : {required : true}, 
			idIsapre : {required : true},
			idMonedaPlan : {required :  function(element){ return $("#idIsapre").val() != 13; }},
			valorPlan :    {required :  function(element){ return $("#idIsapre").val() != 13; }},

			// AFP
			idMonedaAFP : {required : false}, 
			valorAFP : {required : false},

			// Educacion Validaciones
			nivel                 : { required : function(element){ return $("#nivelEducacion").val() >= 2; } },
			carrera               : { required : function(element){  if($("#nivelEducacion").val() >= 2 || $("#nivel").val() >= 1){return false}    } },
			instituciones         : { required : function(element){  if($("#nivelEducacion").val() >= 3 || $("#nivel").val() >= 1){return false}    } },
			nombreInstitucion     : { required : function(element){  if($("#nivelEducacion").val() >= 3 || $("#nivel").val() >= 1){return false}    } },
			fechaDesdeInstitucion : { required : function(element){  if($("#nivelEducacion").val() >= 3 || $("#nivel").val() >= 1){return false}    } },

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
			movilidadReducida 		: { required : '#capacidades:checked' }
			


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
			
			idTipoCuenta1 	: {required : 'requerido'},
			idBanco1        : {required : 'requerido'},
			nCuenta1        : {required : 'requerido'},
			
			idTipoCuenta2 	: {required : 'requerido'},
			idBanco2        : {required : 'requerido'},
			nCuenta2        : {required : 'requerido'},
			
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
			idAdicionalAFP : {required : 'requerido' }, 
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
			movilidadReducida 		: {  required : 'requerido' }

		},
		errorPlacement : function(error, element) {

			if (element.parent(".input-group").size() > 0) {

				error.insertAfter(element.parent(".input-group"));

			} else if (element.attr("data-error-container")) {

				error.appendTo(element

						.attr("data-error-container"));

			} else if (element.parents('.radio-list').size() > 0) {

				error.insertBefore($('.show-error'));

			} else if (element.parents('.radio-inline').size() > 0) {

				error.appendTo(element.parents('.radio-inline')

						.attr("data-error-container"));

			} else if (element.parents('.checkbox-list').size() > 0) {

				error.appendTo(element.parents('.checkbox-list')

						.attr("data-error-container"));

			} else if (element.parents('.checkbox-inline').size() > 0) {
				error.appendTo(element.parents('.checkbox-inline')
						.attr("data-error-container"));
			} else {
				error.insertAfter(element) // for other inputs,

				// just perform default
				// behavior
			}

		},
		invalidHandler : function(event, validator) { // display
			// error
		},
		highlight : function(element) { // hightlight error inputs

			$(element).closest('.form-group').addClass('has-error');

		},
		unhighlight : function(element) {

			$(element).closest('.form-group').removeClass(

			'has-error');

		},
		success : function(label) {

			label.closest('.form-group').removeClass('has-error');

		},
		submitHandler : function(form) {

			debugger;
			
			// Obtener Datos de Trabajador de los Inputs
			let arr = $(document).find('.row_data').getObjectByInputs();
			// Obtener Datos de Trabajador Laboral
			let arrLaboral = $(document).find('.row_dataLaboral').getObjectByInputs();
			
			//Si el Trabajador ya ha sigo ingresado y es un nuevo Contrato
			if(finiquitadoGlobal == true){
				debugger;
				addnewWorkerLaboral(arrLaboral,trabajadorGlobal.codigo);
				updateWorkerPersonal(trabajadorGlobal.codigo);
				
				$('#insertarTrabajadorForm').trigger("reset");
				
				swal({title: 'Asignacion de nuevo contrato',
					html: ' <h3> Trabajador con codigo : '+trabajadorGlobal.codigo+' actualizado!</h3>' }).then(function(result) {
					if(result.value){
						location.reload()
						trabajadorGlobal = "";
						finiquitoGlobal = false;
						return true;
					};
				});
				
				
			}else{
				
				// Obtener Datos de Institucion del Trabajador
				let arrInstitucion = $(document).find('.row_dataInstitucion').getObjectByInputs();
				// Obtener Datos de Discapacidad del Trabajador
				let arrDiscapacidad = $(document).find('.row_dataDiscapacidad').getObjectByInputs();
				// Obtener Datos Licencia de Conducir del Trabajador
				
				let arrConducir = $(document).find('.row_dataConducir').getObjectByInputs();
				// Obtener Datos Productos Quimicos del Trabajador
				let arrQuimicos = $(document).find('.row_dataQuimicos').getObjectByInputs();
				// Obtener Datos de Maternidad del Trabajador
				let arrMaternal = $(document).find('.row_dataMaternal').getObjectByInputs();
				//Obtener Datos de Documentos (Foto)
				let arrDocumentos = $(document).find('.row_dataDocumentos').getObjectByInputs();
				
				// Obtener Datos de Cuentas Primaria
				var div_infoCuenta = $(document).find('.row_dataCuenta');
				var col_nameCuenta = div_infoCuenta.attr('col_name');
				var col_valCuenta = div_infoCuenta.val();
				var arrCuenta = {};
				var listaCuenta = [];
				
				let sinCuenta;
				if( $('#i1').is(':checked') == false && $('#i2').is(':checked') == false ){
					sinCuenta = true;
				}
				
				var cuenta1 = {
						cuentaPrimaria : $('#i1').is(':checked') == true ? 1 : 0,
								idTipoCuenta : $('#idTipoCuenta1').val() == "" ? 2 : $('#idTipoCuenta1').val() ,
								nCuenta : $('#nCuenta1').val(),
								idBanco : $('#idBanco1').val(),
				}
	
				var cuenta2 = {
						cuentaPrimaria : $('#i2').is(':checked') == true ? 1 : 0,
								idTipoCuenta : $('#idTipoCuenta2').val(),
								nCuenta : $('#nCuenta2').val(),
								idBanco : $('#idBanco2').val(),
				}
				
				if(sinCuenta == true){
					cuenta1.cuentaPrimaria = 1;
				}
	
				listaCuenta.push(cuenta1);
				listaCuenta.push(cuenta2);
	
				var codigoGlobal;
				
				$('#loading').show();
	
				codigoGlobal = addnewWorker(arr);
				addnewWorkerInstitucion(arrInstitucion,codigoGlobal);
				addnewWorkerCuenta(listaCuenta,codigoGlobal);
				addnewWorkerLaboral(arrLaboral,codigoGlobal);
				addnewWorkerDiscapacidad(arrDiscapacidad,codigoGlobal);
				addnewWorkerLicenciaConducir(arrConducir, codigoGlobal);
				addnewWorkerLicenciaQuimicos(arrQuimicos, codigoGlobal)
				
				//TODO: Nuevos Datos
				//addnewWorkerLicenciaMaternal(arrMaternal, codigoGlobal);
				addnewWorkerDocumentos(arrDocumentos, codigoGlobal);
			
			
				
				// Insertar datos en la tabla sw_r_trabajadorPeriodo
				addnewWorkerTrabajadorPeriodo(codigoGlobal);
				
				//Insertar datos en la tabla sw_r_anexoContrato
				addnewWorkerAnexoContrato(codigoGlobal);
				
				$('#loading').hide();
				$('#insertarTrabajadorForm').trigger("reset");
				
				swal({title: 'Trabajador Agregado con exito',
					html: ' <h3> Se generó con Código : '+codigoGlobal+'</h3>' }).then(function(result) {
					if(result.value){
						location.reload()
					};
				});

			}//Fin de else
			
		}
	});
	
	

});


// Selectores
function getSelector() {



	// Array de Parametros
	var param = new Array('SEXO', 'ISAPRE', 'PARENTESCO', 'NACIONALIDAD', 'ESTADO_CIVIL', 
			'NIVEL_DE_EDUCACION', 'NIVEL', 'CARRERA_OFICIO', 'INSTITUCIONES', 'NOMBRE_INSTITUCION', 
			'MONEDA_PLAN', 
			'DIVISION_PERSONAL', 'SUBDIVISION_PERSONAL', 'GRUPO', 'SUBGRUPO', 'TIPO_CONTRATO', 'TIPO_TRABAJADOR',
			'GRADO_DISCAPACIDAD','CAUSA_DISCAPACIDAD','MOVILIDAD_REDUCIDA', 'ETNIA', 'AFP', 'TIPO_LICENCIA_CONDUCIR', 'APV' );

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
			if(registro.llave != 2 && registro.llave != 4 && registro.llave != 5){
			$("#tipoTrabajador").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
			}
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
		
		if(registro.codigo == "ETNIA"){
			$("#idEtnia").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}
		
		if(registro.codigo == "AFP"){
			$("#idAFP, #idAdicionalAFP").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}
		
		if(registro.codigo == "TIPO_LICENCIA_CONDUCIR"){
			$("#idTipoLicenciaConducir1, #idTipoLicenciaConducir2, #idTipoLicenciaConducir3").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
		}
		
		if(registro.codigo == "APV"){
			$("#institucionAPV, #institucionConvenido").append(
					'<option value=' + registro.llave + '>'
					+ registro.descripcion + '</option>');
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
							'<option value=' + registro.codPrevired + '>'
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
	$('#sociedad').children('option:not(:first)').remove();
	$('#sociedad').setOptionsByArray(sociedades, "sociedad", "idSociedad");
	
	reorderSelect('#cargo, #posicion, #idBanco1, #idBanco2, #idTipoCuenta1, #idTipoCuenta2, #carrera, #parentesco, #idNacionalidad');
	
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

function justNumbers3(e){
	var keynum = window.event ? window.event.keyCode : e.which;
	if ((keynum == 8) || (keynum == 46) || (keynum == 44) || (keynum == 45)){
		return true;
	}
	return /\d/.test(String.fromCharCode(keynum));
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


// -------------------------OWN JQUERY FUNCTIONALITY-------------------------//

function reorderSelect(nameSelect){
	  
	  var select = $(nameSelect);
	  
	  $.each(select, function(key, value){
		  
		  $(value).html($(value).find('option:not(:first)').sort(function(x, y) {
		    // to change to descending order switch "<" for ">"
		    return $(x).text() > $(y).text() ? 1 : -1;
		  }));
		  
		  $("<option value=''>Seleccione...</option> ").prependTo($(value));
		  
		  $(value).get(0).selectedIndex = 0;
	  });
}



// Obtener Mes
var getMonthByString = function(input) {
	var pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
	if (!input || !input.match(pattern)) {
		return null;
	}
	return input.replace(pattern, '$2');
};

var changeDateformatYYYYMM = function(input) {
	var array = input.split("-");
	var periodo = array[2]+"-"+array[1];
	return periodo;
};

// Validar Rut
$.validator.addMethod("rut", function(value, element) {
	return this.optional(element) || $.Rut.validar(value);
}, "Este campo debe ser un rut valido.");

// Validar Si es Menor de Edad
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

//Mostrar/Ocultar Informacion
jQuery.fn.collapseInformation = function(selector){
	$(document).find(selector).each(function(key, value){
		$(value).closest('tr').toggle();
	});
}

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
			alerta("Error" + ex );
		}
	});
	
}

// Obtener las opciones de un select para poder filtrarlo
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
jQuery.fn.setOptionsByArray = function(array, nameProperty1, nameProperty2) {

	var select = this;
	
	$.each(array, function(key, value) {
		$(select).append($('<option>').text(eval("value."+nameProperty1)).val(eval("value."+nameProperty2)));
	});

};

jQuery.fn.setOptionsByArrayWithoutUnshift = function(array, nameProperty1, nameProperty2) {

	var select = this;
	
	$.each(array, function(key, value) {
		$(select).append($('<option>').text(eval("value."+nameProperty1)).val(eval("value."+nameProperty2)));
	});

};


// Insertar datos en los inputs
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

// Obtener el valor de los inputs y retornar un objecto JSON
jQuery.fn.getObjectByInputs = function(){
	
	var objectData = new Object();
	
	$(this).each(function(key, value){
		var col_name = $(this).attr('col_name');  
		
		var col_val;
		
		if($(value).hasClass('percentage')){
			col_val = $(this).val().toString().replace(',','.').slice(0,-1);
		}else if($(value).hasClass('moneyWork')){
				col_val = $(this).val().replace(/\./g,'');
				col_val = col_val.replace('$','');
				col_val = col_val.replace(',','.');
		}else if($(value).hasClass('checkboxOption')){
			col_val = $(this).val() == 1 ? 1 : 0;
		}
		else{
			col_val = $(this).val();
		}

		objectData[col_name] = col_val;
	});

	return objectData;
	
};

// Obtener objecto JSON por Servicio synchronous
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


// Obtener todos los valores formatearlos e insertarlo en input correspondiente
jQuery.fn.setJSONToInputs = function(selector, Object){
	
	Object = Object;
	
	$(document).find(selector).each(function(key, val){
		
		if($(val).hasClass('fecha')){
			aux = eval("Object."+$(val).attr('col_name'));
			$(val).val( changeDateformatDDMMYY(aux) );
		}
		else if($(val).hasClass('moneyWork')){
			$(val).val(formatNumber(eval("Object."+$(val).attr('col_name'))));
		}
		else if($(val).hasClass('checkboxOption')){
			aux = eval("Object."+$(val).attr('col_name'));
			aux == 1 ? $(val).prop('checked', true) : $(val).prop('checked', false);
			aux == 1 ? $(val).val(1) : $(val).val(0); 
		}
		else{
			$(val).val(eval("Object."+$(val).attr('col_name')));
		}

	});
	
};


// Renombre propiedad del Objeto
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

// ----------------------JQUERY CURRENCY CONVERTED--------------//
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
