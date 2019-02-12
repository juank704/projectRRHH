//Colocar Permisos
var sociedadPrivilege = new Set();
var huertoPrivilege = new Set();
//Obtener Sociedades y Huertos que tiene acceso
$.each(SESION.campo, function(key, value){
	sociedadPrivilege.add(value.idSociedad);
	huertoPrivilege.add(value.campo);
}); 

//Grabar Opciones de tipoTrabajador, tipoContrato, Empresa, Huerto,
//CECO, Faena, Cargo, 
var tipoTrabajador_options;
var tipoContrato_options;
var empresa_options;
var huerto_options;
var CECO_options;
var faena_options;
var cargo_options;

//Pantalla de carga en cada Ajax Request
var $loading = $('#loading').hide();
$(document)
  .ajaxStart(function () {
    $loading.show();
  })
  .ajaxStop(function () {
    $loading.hide();
  });

var listParameters = new Array();
var listParametersTrabajador = new Array();

$(document).ready(function() {

	//Ejecutar Elementos antes de los Eventos 
	beforeEvents();
	
	//Formato de los Inputs
	setFormatInputs();
	
	//Cargar Eventos
	setEventInputs();
	
	//Cargar los Select
	getSelector();
	    	
});

function getOptionInput(){
	
	//Guardar Select en Variables
	tipoTrabajador_options  = $('#tipoTrabajador_new option').clone();
	
	tipoTrabajador_options.each(function(key,value){
		if($(value).val() == $('#tipoTrabajador_new').val()){
    		$(value).attr("selected", "selected");
    	}
    });
	
	tipoContrato_options  = $('#tipoContrato_new option').clone();
	
	tipoContrato_options.each(function(key,value){
		if($(value).val() == $('#tipoContrato_new').val()){
    		$(value).attr("selected", "selected");
    	}
    });
	
	empresa_options = $('#idSociedad_new option').clone();
	
	empresa_options.each(function(key,value){
		if($(value).val() == $('#idSociedad_new').val()){
    		$(value).attr("selected", "selected");
    	}
    });
	
	huerto_options = $('#idHuerto_new option').clone();
	
	huerto_options.each(function(key,value){
		if($(value).val() == $('#idHuerto_new').val()){
    		$(value).attr("selected", "selected");
    	}
    });
	
	CECO_options = $('#idCECO_new option').clone();
	
	CECO_options.each(function(key,value){
		if($(value).val() == $('#idCECO_new').val()){
    		$(value).attr("selected", "selected");
    	}
    });
	
	faena_options = $('#idFaena_new option').clone();
	
	faena_options.each(function(key,value){
		if($(value).val() == $('#idFaena_new').val()){
    		$(value).attr("selected", "selected");
    	}
    });
	
	cargo_options = $('#idCargo_new option').clone();
	
	cargo_options.each(function(key,value){
		if($(value).val() == $('#idCargo_new').val()){
    		$(value).attr("selected", "selected");
    	}
    });
	
}

function beforeEvents(){
	
	//Guardar datos de Articulo en variable Global
	articuloOptions = $('#articulo option');
	incisoOptions = $('#inciso option');
	letraOptions = $('#letra option');
}

function setFormatInputs(){
	
	//Input de Hora
	$(".timeWork").timepicker();
	
	//Formato de Fecha
	$('.dateWork').each(function(key, value){
		$(value).mask("00-00-0000", {placeholder: "__-__-____"});
	});
	
	//Configuracion de Fechas
	$('.dateWork').each(function(key, value){
		$(value).datepicker({  firstDay : 1, changeMonth: true, changeYear: true, yearRange: "1930:+10", dateFormat: 'dd-mm-yy' });
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


async function setEventInputs() {
	
	//Cerrar Div de Filtro
	$('#filtros').click(function () {
		$(this).collapseInformationAction('.row_dataFiltros', 'toggle()');
		$(document).find('#filtros').closest('div').toggleClass('col-md-offset-11');
		$('#btnBuscar').toggleClass('hide');
	});	
	
	//Evento para Obtener los Huertos
	$('#idSociedad, #idSociedadImpresion').change(function(){
		let idSociedad = $(this).val();
		getHuertos(idSociedad);
	});
	
	//Evento para Obtener los Huetos para Nuevo Contrato
	$('#idSociedad_new').change(function(){
		let idSociedad_new = $(this).val();
		getHuertos_new(idSociedad_new);
		getFaenas_new(idSociedad_new);
		getCargos_new(idSociedad_new);
	});
	
	//Evento para Obtener los CECOS
	$('#idHuerto').change(function(){
		let idHuerto = $(this).val();
		getCECOs(idHuerto);
	});
	
	//Evento para Obtener los CECOS para nuevo contrato
	$('#idHuerto_new').change(function(){
		let idHuerto_new = $(this).val();
		getCECOs_new(idHuerto_new);
	});
	
	//Eliminar Registro
	$('#datatableContratacionMasiva').on('click', '.eliminarRegistro', function () {
		//Eliminar Row
		let table = $('#datatableContratacionMasiva').DataTable();
	    table.row( $(this).closest('tr') ).remove();
	       
	    table = setPositionDatatable(table);
	    
	    table.draw();
	    
	});
	
	//Select encadenados con JQUERY PLUGIN CHAINED
	$("#inciso").chained("#articulo");
	$("#letra").chained("#inciso");
	
	buscarDocumento();
	
		
}

function setPositionDatatable(table){
	
	try {
		
		let position = table.scroller.page().start;
	    table.one('draw', function() {
	      table.row(position).scrollTo(false);
	    });

	} catch (e) {
		console.log("Sucedio un error en la posicion del Scroll");
		return table
	}
	
	return table
}


function buscarDocumento() {
	
	$('#idSociedadImpresion,#idHuertoImpresion,#tipoDocumento').change(function(){
		getDocumento();
	});
			
} 

async function getDocumento(){
	
	let queryString = $("#imprimirForm").serialize();
	
	// Obtener los documentos
	let documentos = await $.getJSON('/simpleWeb/json/work/getDocuments/?' + queryString);

	//Limpiar Select
	$('#idTemplate').children('option:not(:first)').remove();
	//Llenar Select
	$('#idTemplate').setOptionsByArray(documentos, "documento", "idTemplate");
		
}


async function getHuertos(idSociedad){
	
	//Limpiar Select
	$('#idHuerto, #idHuertoImpresion').each(function(key,value){$(value).children('option:not(:first)').remove();});
	$('#idCECO').children('option:not(:first)').remove();
	
	// Obtener Codigo de la Sociedad en base al Id:
	let sociedadSAP = await $.getJSON("/simpleWeb/json/work/getSociedadById/"+ idSociedad);
	
	//Obtener huertos en base a los privilegios del usuario
	let queryString = huertoPrivilege == null ? "" : JSON.stringify(huertoPrivilege).slice(1,-1); 
	
	// Obtener Huerto por la Sociedad
	let huerto =  await $.getJSON("/simpleWeb/json/work/getCampoWithFilter/?"+"campo="+queryString+"&sociedad="+sociedadSAP.sociedad);
	
	// Cambiar Nombres de Propiedades por value - text y Llenar select de la Lista Huerto
	$('#idHuerto, #idHuertoImpresion').setOptionsByArray(huerto, "descripcion", "campo");
	
}

async function getHuertos_new(idSociedad_new){
	
	//Limpiar Select
	$('#idHuerto_new').each(function(key,value){$(value).children('option:not(:first)').remove();});
	$('#idCECO_new').children('option:not(:first)').remove();
	
	// Obtener Codigo de la Sociedad en base al Id:
	let sociedadSAP = await $.getJSON("/simpleWeb/json/work/getSociedadById/"+ idSociedad_new);
	
	//Obtener huertos en base a los privilegios del usuario
	let queryString = huertoPrivilege == null ? "" : JSON.stringify(huertoPrivilege).slice(1,-1); 
	
	// Obtener Huerto por la Sociedad
	let huerto_new =  await $.getJSON("/simpleWeb/json/work/getCampoWithFilter/?"+"campo="+queryString+"&sociedad="+sociedadSAP.sociedad);
	
	// Cambiar Nombres de Propiedades por value - text y Llenar select de la Lista Huerto
	$('#idHuerto_new').setOptionsByArray(huerto_new, "descripcion", "campo");
	
}

async function getCECOs(idHuerto){
		
	//Limpiar Select
	$('#idCECO').children('option:not(:first)').remove();
	
	// Obtener Huerto por la Sociedad
	let huerto =  await $.getJSON("/simpleWeb/json/work/getCampoWithFilter/?campo="+idHuerto);

	let CECOAgrupacion = ""
		
	$.each(SESION.campo, function(key, value){
		if(value.campo == $('#idHuerto').val()){
			CECOAgrupacion = value.cecos;
		} 
	});
	
	//Obtener CECO por la Zona
	let CECOSAP = await $.getJSON(IPSERVERSAP+"JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+huerto[0].codigo+"&GRUPO="+huerto[0].grupo_ceco_work+"&CECO="+CECOAgrupacion);
	
	// Cambiar Nombres de Propiedades por value - text y Llenar select de la Lista CECO
	$('#idCECO').setOptionsByArray(CECOSAP.COSTCENTERLIST, "DESCRIPT", "COSTCENTER");
	
}

async function getCECOs_new(idHuerto_new){
	
	//Limpiar Select
	$('#idCECO_new').children('option:not(:first)').remove();
	
	// Obtener Huerto por la Sociedad
	let huerto_new =  await $.getJSON("/simpleWeb/json/work/getCampoWithFilter/?campo="+idHuerto_new);

	let CECOAgrupacion = ""
		
	$.each(SESION.campo, function(key, value){
		if(value.campo == $('#idHuerto_new').val()){
			CECOAgrupacion = value.cecos;
		} 
	});
	
	//Obtener CECO por la Zona
	let CECOSAP = await $.getJSON(IPSERVERSAP+"JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+huerto_new[0].codigo+"&GRUPO="+huerto_new[0].grupo_ceco_work+"&CECO="+CECOAgrupacion);
	
	// Cambiar Nombres de Propiedades por value - text y Llenar select de la Lista CECO
	$('#idCECO_new').setOptionsByArray(CECOSAP.COSTCENTERLIST, "DESCRIPT", "COSTCENTER");
	
}

//Obtener Faenas y Llenar el Select
async function getFaenas_new(idSociedad_new){
	//Limpiar Select Faena
	$('#idFaena_new').children('option:not(:first)').remove();
	
	//Obtener la faena 
	let faena_new = await $.getJSON("/simpleWeb/json/work/Faenas/getFaenaBySociedad/"+idSociedad_new);
	//Colocar datos de Faena en el Select
	$('#idFaena_new').setOptionsByArray(faena_new, "nombreFaena", "idFaena");
}


async function getCargos_new(idSociedad_new){
	//Limpiar Select Faena
	$('#idCargo_new').children('option').remove();
	$('#idCargo_new').append('<option value="" >Seleccione...</option>');
	let cargo_new = await $.getJSON("/simpleWeb/json/work/cargos/getCargoByIdSociedad/"+idSociedad_new);
	$('#idCargo_new').setOptionsByArray(cargo_new, "cargos", "id_cargo");
}



//Llenar los Select
async function getSelector(){
	
	getSociedad();
	
	 // Array de Parametros
    let param = new Array('SEXO', 'ISAPRE', 'PARENTESCO', 'NACIONALIDAD', 'ESTADO_CIVIL',
        'NIVEL_DE_EDUCACION', 'NIVEL', 'CARRERA_OFICIO', 'INSTITUCIONES', 'NOMBRE_INSTITUCION',
        'MONEDA_PLAN',
        'DIVISION_PERSONAL', 'SUBDIVISION_PERSONAL', 'GRUPO', 'SUBGRUPO', 'TIPO_CONTRATO', 'TIPO_TRABAJADOR',
        'GRADO_DISCAPACIDAD', 'CAUSA_DISCAPACIDAD', 'MOVILIDAD_REDUCIDA', 'MES', 'ETNIA', 'AFP', 'TIPO_LICENCIA_CONDUCIR', 'TRAMO', 'TIPO_CARGA', 'APV');

    // Obtener datos para llenado de selects (TIPO_CONTRATO)
    $.ajax({
        type: "GET",
        async: true,
        url: '/simpleWeb/json/work/getParametrosByCodigos',
        data: { param: param }, // se recibe array de parametros
        dataType: "json",
        success: function (data) {
        	$.each(data, function (key, registro) {        		
                if (registro.codigo == "TIPO_CONTRATO") {
                    $("#tipoContrato, #tipoContrato_new").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }
                if (registro.codigo == "TIPO_TRABAJADOR") {                	
                    $("#tipoTrabajador_new, .tipoTrabajador_work").append(
                        '<option value=' + registro.llave + '>'
                        + registro.descripcion + '</option>');
                }

            });
        }
    }); 
	
}


async function getSociedad(){
	
	//Obtener Sociedades en base a los privilegios del usuario
	let queryString = sociedadPrivilege == null ? "" : JSON.stringify(sociedadPrivilege).slice(1,-1);
	
	//Obtener sociedades
	let sociedades = await $.getJSON('/simpleWeb/json/work/getSociedad/?idSociedad='+queryString);
	
	//Limpiar Select
	$('#idSociedad, #idSociedadImpresion, #idSociedad_new').each(function(key,value){$(value).children('option:not(:first)').remove();});
	
	//Colocar Sociedades en el Select
	$('#idSociedad, #idSociedadImpresion, #idSociedad_new').setOptionsByArray(sociedades, "sociedad", "idSociedad");
	
}

// Buscar Trabajadores
async function buscarTrabajadorByParams() {
	
	// Si Cumple con las Validaciones
	if (!validarForm("#searchForm")) {
		return false;
	}
	
	$("#trabajadores").html("");

	// Obtener los atributos del Filtro
	let queryString = $("#searchForm").serialize();

	let trabajadores = await $.getJSON("/simpleWeb/json/work/getAllTrabajadorWithFilter/?EstadoContrato=0&_lastContrato=true&_orderBy=codigo&" + queryString);

	if (trabajadores.length > 0) {
		$('#documentacionMasiva').show();
		$('#btnAnadirIndividual').show();
		$('#btnAnadirMasivo').show();
	} else {
		$('#documentacionMasiva').hide();
		$('#btnAnadirIndividual').hide();
		$('#btnAnadirMasivo').hide();
	}

	//Colocar en Select
	setSelectTrabajador(trabajadores);
		
}


function setSelectTrabajador(trabajadores){
	
	let selectTrabajadorNombre = "";
	
	selectTrabajadorNombre += "<option value=''>Buscar</option>";
	$("#trabajadores").append(selectTrabajadorNombre);
	
	$.each(trabajadores,function(key, value) {
				selectTrabajadorNombre="";
				selectTrabajadorNombre += "<option value="
						+ value.codigo
						+ "> "
						+ value.codigo
						+ "|"
						+ value.apellidoPaterno
						+ " "
						+ value.apellidoMaterno
						+ " "
						+ value.nombre
						+ "|"
						+ value.rut
						+ "</option>";
				$("#trabajadores").append(selectTrabajadorNombre);
				
			});
	
}

//TODO: Agregar Masivo Fijo
async function agregarMasivo(){
	
	// Si Cumple con las Validaciones
	if (!validarForm("#searchForm")) {
		return false;
	}

	// Obtener los atributos del Filtro
	let queryString = $("#searchForm").serialize();
	let trabajadores = await $.getJSON("/simpleWeb/json/work/getAllTrabajadorWithFilter/?paraFiniquitar=0&" + queryString);
	
	// Colocar Tabla
	datatable(trabajadores);

}


async function agregarFila(){
	
	getOptionInput();
	
	let trabajadorInSelect = $('#trabajadores').val();
	
	if(trabajadorInSelect == ""){
		alerta("Seleccione un Trabajador");
		return false;
	}
	
	// Si Cumple con las Validaciones
	if (!validarForm("#accionForm")) {
		return false;
	}
	
	let trabajadores = await $.getJSON("/simpleWeb/json/work/TrabajadorContrato/getAllTrabajadorContratoWithFilter/?EstadoContrato=0&_lastContrato=true&codigo=" + trabajadorInSelect);
	
	debugger;
	
	let table = $('#datatableContratacionMasiva').DataTable();
	
	for (var i = 0; i < trabajadores.length; i++) {
	
	//Obtener Ultima Row
	let rowIdx = table.data().length;
		
	let htmlTipoTrabajador = $('<select id="tipoTrabajador_'+trabajadores[i].codigo_trabajador+'" type="text" class="form-control input-circle input-sm tipoTrabajador_work " col_name="tipoTrabajador" ></select>');
	htmlTipoTrabajador.append(tipoTrabajador_options);
	
	let htmlTipoContrato = $('<select id="tipoContrato_'+trabajadores[i].codigo_trabajador+'" type="text" class="form-control input-circle input-sm tipoContrato_work " col_name="tipoContrato" ></select>');
	htmlTipoContrato.append(tipoContrato_options);
	
	let htmlIdSociedad = $('<select id="idSociedad_'+trabajadores[i].codigo_trabajador+'" type="text" class="form-control input-circle input-sm dateWork idSociedad_work " col_name="idSociedad" ></select>');
	htmlIdSociedad.append(empresa_options);	
	
	let htmlIdHuerto = $('<select id="idHuerto_'+trabajadores[i].codigo_trabajador+'" type="text" class="form-control input-circle input-sm idHuerto_work " col_name="idHuerto" ></select>');
	htmlIdHuerto.append(huerto_options);
	
	let htmlIdCECO = $('<select id="idCECO_'+trabajadores[i].codigo_trabajador+'" type="text" class="form-control input-circle input-sm idCECO_work " col_name="idCECO" ></select>');
	htmlIdCECO.append(CECO_options);
	
	let htmlIdFaena = $('<select id="idFaena_'+trabajadores[i].codigo_trabajador+'" type="text" class="form-control input-circle input-sm idFaena_work " col_name="idFaena" ></select>');
	htmlIdFaena.append(faena_options);
	
	let htmlIdCargo = $('<select id="idCargo_'+trabajadores[i].codigo_trabajador+'" type="text" class="form-control input-circle input-sm idCargo_work " col_name="cargo" ></select>');
	htmlIdCargo.append(cargo_options);
	
	let htmlIngresoContrato = '<input id="fechaIngreso_'+trabajadores[i].codigo_trabajador+'" type="text" class="form-control input-circle input-sm dateWork" value="'
	+ $('#fechaIngreso_new').val()
	+ '" col_name="fechaInicio_actividad" />';
	
	let htmlTerminoContrato = '<input id="fechaTermino_'+trabajadores[i].codigo_trabajador+'" type="text" class="form-control input-circle input-sm dateWork" value="'
	+ $('#fechaTermino_new').val()
	+ '" col_name="fechaTerminoContrato" />';
	
	let htmlSueldoBase = '<input id="sueldoBase_'+trabajadores[i].codigo_trabajador+'" type="text" class="form-control input-circle input-sm moneyWork " value="'
	+ $('#sueldoBase_new').val()
	+ '" col_name="sueldoBase" />';
	
	let htmlHorasSemanales = '<input id="horasSemanales_'+trabajadores[i].codigo_trabajador+'" type="text" class="form-control input-circle input-sm " value="'
	+ $('#horasSemanales_new').val()
	+ '" col_name="horasSemanales" />';
	
	//Botones
	htmlBotones = "";
	htmlBotones += "<button title='Eliminar' class='btn btn-circle red btn-outline btn-sm eliminarRegistro '><i class='fa fa-close fa-lg'></i></button>";
	
	table.row.add(
			[
			 '<input checked type="checkbox" style="margin-left:auto; margin-right:auto;" id="'+trabajadores[i].codigo_trabajador+'" value="'+trabajadores[i].codigo_trabajador+'" name="check" class="checkbox text-uppercase" />',
			 trabajadores[i].codigo_trabajador,
			 trabajadores[i].apellidoPaterno + " " + trabajadores[i].apellidoMaterno + ", " + trabajadores[i].nombre,
			 trabajadores[i].rut,
			 htmlTipoTrabajador.prop("outerHTML"),
			 htmlTipoContrato.prop("outerHTML"),
			 htmlIdSociedad.prop("outerHTML"),
			 htmlIdHuerto.prop("outerHTML"),
			 htmlIdCECO.prop("outerHTML"),
			 htmlIdFaena.prop("outerHTML"),
			 htmlIdCargo.prop("outerHTML"),
			 htmlIngresoContrato,
			 htmlTerminoContrato,
			 htmlSueldoBase,
			 htmlHorasSemanales,
			 htmlBotones //Boton Elmiminar
			 ]).node().id = "td"
				

		table = ocultarDuplicadosDatatable(table);	
	  
	}
	
	
    $('#datatableContratacionMasiva').dataTable().fnDestroy();
	
	$('#datatableContratacionMasiva').DataTable({
		"searching" : true,
		"ordering" : true,
		"paging" : true,
		"info" : true,
		"scrollX": true,
		"scrollY": "350px",
		"scroller": true
	}).draw();
	
	
	//Activar Select Chained
	//chainedArticuloIncisoLetra();
	
	//setFormatInputs();
	
	
}

function ocultarDuplicadosDatatable(table){
	
	
	var rut, ruts = []
	table.rows().every(function(rowIdx, tableLoop, rowLoop) {
		rut = this.data()[3];
	  if (~ruts.indexOf(rut)) {
	    this.nodes().to$().attr('excluded', 'true')
	  } else {
	    ruts.push(rut) 
	  }
	})

	$.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
	   return table.row(dataIndex).nodes().to$().attr('excluded') != 'true'
	})
	
	return table;
	
}


async function datatable(trabajadores) {

	debugger;
	
	// Si Cumple con las Validaciones
	if (!validarForm("#accionForm")) {
		return false;
	}
	
	//Destruir tabla para Inicializarla Nuevamente 
	$('#datatableContratacionMasiva').dataTable().fnDestroy();	
	
	getOptionInput(); //Obtener opciones 

	let grid = new Datatable();
	grid
			.init({
				src : $("#datatableContratacionMasiva"),
				loadingMessage : 'Loading...',
				dataTable : {
					"bStateSave" : true,
					"data" : trabajadores,
					"columns" : [
							{"data" : "codigo"},
							{"data" : "codigo"},
							{"data" : ""}, //Nombre del Trabajador
							{"data" : "rut"},
							{"data" : "codigo"}, //Tipo Trabajador
							{"data" : "codigo"}, //Tipo Contrato
							{"data" : "codigo"}, //Sociedad
							{"data" : "codigo"}, //Huerto
							{"data" : "codigo"}, //CECO
							{"data" : "codigo"}, //Faena
							{"data" : "codigo"}, //Cargo
							{"data" : "codigo"}, //Ingreso Contrato
							{"data" : "codigo"}, //Termino Contrato
							{"data" : "codigo"}, //Sueldo Base
							{"data" : "codigo"}, //Horas Semanales
							{"data" : "codigo"} //Botones
							],
					"columnDefs" : [
							{
								"targets" : [ -1 ], //Boton de Eliminar
								"render" : function(data, type, full) {
									html = "";
									html += "<button title='Eliminar' class='btn btn-circle red btn-outline btn-sm eliminarRegistro '><i class='fa fa-close fa-lg'></i></button>";
									return html;
								}
							},
							{
								"targets" : [ 0 ], //CheckBox
								"render" : function(data, type, full) {
									html = '<input checked type="checkbox" style="margin-left:auto; margin-right:auto;" id="'+data+'" value="'+data+'" name="check" class="checkbox text-uppercase" />';
									return html;
								}
							},
							{
								"targets" : [ 2 ], //Nombre del Trabajador
								"render" : function(value, type, full) {
									return full.apellidoPaterno + ", " + full.apellidoMaterno + " " + full.nombre 
								}
							},
							{
								"targets" : [ 4 ], //Tipo de Trabajador
								"render" : function(value) {
									let htmlTipoTrabajador = $('<select id="tipoTrabajador_'+value+'" type="text" class="form-control input-circle input-sm tipoTrabajador_work " col_name="tipoTrabajador" ></select>');
									htmlTipoTrabajador.append(tipoTrabajador_options);
									return htmlTipoTrabajador.prop("outerHTML");

								}
							},
							{
								"targets" : [ 5 ], //Tipo Contrato
								"render" : function(value) {
									let htmlTipoContrato = $('<select id="tipoContrato_'+value+'" type="text" class="form-control input-circle input-sm tipoContrato_work " col_name="tipoContrato" ></select>');
									htmlTipoContrato.append(tipoContrato_options);
									return htmlTipoContrato.prop("outerHTML");

								}
							},
							{
								"targets" : [ 6 ], //Sociedad
								"render" : function(value) {
									debugger;
									let htmlIdSociedad = $('<select id="idSociedad_'+value+'" type="text" class="form-control input-circle input-sm idSociedad_work " col_name="idSociedad" ></select>');
									console.log(value);
									console.log(empresa_options);
									console.log(htmlIdSociedad);
									htmlIdSociedad.append(empresa_options);
									return htmlIdSociedad.prop("outerHTML");

								}
							},
							{
								"targets" : [ 7 ], //Huerto
								"render" : function(value) {
									let htmlIdHuerto = $('<select id="idHuerto_'+value+'" type="text" class="form-control input-circle input-sm idHuerto_work " col_name="idHuerto" ></select>');
									htmlIdHuerto.append(huerto_options);
									return htmlIdHuerto.prop("outerHTML");

								}
							},
							{
								"targets" : [ 8 ], //CECO
								"render" : function(value) {
									let htmlIdCECO = $('<select id="idCECO_'+value+'" type="text" class="form-control input-circle input-sm idCECO_work " col_name="idCECO" ></select>');
									htmlIdCECO.append(CECO_options);
									return htmlIdCECO.prop("outerHTML");

								}
							},
							{
								"targets" : [ 9 ], //Faena
								"render" : function(value) {
									let htmlIdFaena = $('<select id="idFaena_'+value+'" type="text" class="form-control input-circle input-sm idFaena_work " col_name="idFaena" ></select>');
									htmlIdFaena.append(faena_options);
									return htmlIdFaena.prop("outerHTML");

								}
							},
							{
								"targets" : [ 10 ], //Cargo
								"render" : function(value) {
									let htmlIdCargo = $('<select id="idCargo_'+value+'" type="text" class="form-control input-circle input-sm idCargo_work " col_name="cargo" ></select>');
									htmlIdCargo.append(cargo_options);
									return htmlIdCargo.prop("outerHTML");

								}
							},
							{
								"targets" : [ 11 ], //Fecha Ingreso Contrato
								"render" : function(value) {
									let htmlIngresoContrato = '<input id="fechaIngreso_'+value+'" type="text" class="form-control input-circle input-sm dateWork" value="'
									+ $('#fechaIngreso_new').val()
									+ '" col_name="fechaInicio_actividad" />';
									return htmlIngresoContrato;

								}
							},
							{
								"targets" : [ 12 ], //Fecha Termino Contrato
								"render" : function(value) {
									let htmlTerminoContrato = '<input id="fechaTermino_'+value+'" type="text" class="form-control input-circle input-sm dateWork" value="'
									+ $('#fechaTermino_new').val()
									+ '" col_name="fechaTerminoContrato" />';
									return htmlTerminoContrato;

								}
							},
							{
								"targets" : [ 13 ], //Sueldo Base
								"render" : function(value) {
									let htmlSueldoBase = '<input id="sueldoBase_'+value+'" type="text" class="form-control input-circle input-sm moneyWork " value="'
									+ $('#sueldoBase_new').val()
									+ '" col_name="sueldoBase" />';
									return htmlSueldoBase;

								}
							},
							{
								"targets" : [ 14 ], //Horas Semanales
								"render" : function(value) {
									let htmlHorasSemanales = '<input id="horasSemanales_'+value+'" type="text" class="form-control input-circle input-sm " value="'
									+ $('#horasSemanales_new').val()
									+ '" col_name="horasSemanales" />';
									return htmlHorasSemanales;

								}
							}
					]
				}
			});
	
	$('#datatableContratacionMasiva').dataTable().fnDestroy();
	
	$('#datatableContratacionMasiva').DataTable({
		"searching" : true,
		"ordering" : false,
		"paging" : false,
		"info" : false,
		"scrollX": true,
		"scrollY": "350px",
	}).draw();
	
	//Activar Chained Select
	//chainedArticuloIncisoLetra();
	
	setFormatInputs();

}

function chainedArticuloIncisoLetra(){
	
	let table = $('#datatableCartaTermino').DataTable();
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		let data = this.data();
		$('#incisoTerminoContrato_'+$(data)[1]).chained('#articuloTerminoContrato_'+$(data)[1]);
		$('#letraTerminoContrato_'+$(data)[1]).chained('#incisoTerminoContrato_'+$(data)[1]);
	});
	
}

function selectContratosByCodTrabajador(value, row, col){
	
	let html = '';
	let contratos;
	
	//Servicio para traerme los Contratos
	$.getJSON('/simpleWeb/json/work/contrato/getContratoWithFilter/?EstadoContrato=1&codigo_trabajador='+value).success(function(data){
		
		let currentCell = $("#datatableCartaTermino").DataTable().cells({"row":row, "column":col}).nodes(0);
		
		contratos = data; 
		html += '<select id="idContrato_'+value+'" class="form-control input-circle input-sm">'; 
		if(contratos != null){	
			$.each(contratos,function(key,value){
				let isLastElement = key == contratos.length -1;
				if(isLastElement){
					html += '<option selected value="'+value.id+'">'+changeDateformatDDMMYY(value.fechaInicio_actividad)+'</option>';
				}else{
					html += '<option value="'+value.id+'">'+changeDateformatDDMMYY(value.fechaInicio_actividad)+'</option>';
				}
				
			});
		}
		$(currentCell).html(html);
	});
	
	return html;
	
}

function selectTerminoContratoByName(colnum, value){
	
	let nameColumn;
	let options;
	
	switch(colnum) {
    case 6:
        nameColumn = "articulo";
        options = articuloOptions;
        break;
    case 7:
        nameColumn = "inciso";
        options = incisoOptions;
        break;
    case 8:
        nameColumn = "letra";
        options = letraOptions;
        break;
    default:
        nameColumn = "";
	}
		
	let $select = $('<select id="'+nameColumn+'TerminoContrato_'+value+'"'+' type="text" col_name='+nameColumn+'"TerminoContrato" class="form-control input-circle input-sm" >'
				 + ' </select> ', { "id" : ""+nameColumn+"TerminoContrato_"+value,
					 				"value" : "" });
	
	let valor = $(document).find('#'+nameColumn+'').val();
	
	$.each(options, function(k,v){
   
		let $option = $('<option></option>',
        		  { "text": $(v).text(),
        			"value": $(v).val()
        		  });
		
		
		$option.attr("data-chained", $(v).attr("data-chained"));

        	if($(v).val() == valor){
        		$option.attr("selected", "selected");
        	}
        	$select.append($option);
    });
	
	
	return $select.prop("outerHTML");
	
}


//Validar Form Utilizando plugin de Jquery Validation
function validarForm(form) {

	let rulesSearch = {};
	let messagesSearch = {};
	
	if(form == "#searchForm"){
		 rulesSearch = { idSociedad : {required : true}, tipoContrato : {required : true} };
		 messagesSearch = { idSociedad : {required : 'requerido'},tipoContrato : {required : 'requerido'} };
	}else if(form == "#accionForm"){
		rulesSearch = { tipoTrabajador_new : {required : true}, tipoContrato_new : {required : true}, idSociedad_new : {required : true}, idHuerto_new : {required : true}, idCECO_new : {required : true}, idFaena_new : {required : true}, idCargo_new : {required : true}, fechaIngreso_new : {required : true}, sueldoBase_new : {required : true}, horasSemanales_new : { required : true }, fechaTermino_new : { required : function(element) { return $("#tipoContrato_new").val() == 3 } } };
		messagesSearch = { tipoTrabajador_new : {required : 'requerido'}, tipoContrato_new : {required : 'requerido'}, idSociedad_new : {required : 'requerido'}, idHuerto_new : {required : 'requerido'}, idCECO_new : {required : 'requerido'}, idFaena_new : {required : 'requerido'}, idCargo_new : {required : 'requerido'} , fechaIngreso_new : {required : 'requerido'}, sueldoBase_new : {required : 'requerido'}, horasSemanales_new : {required : 'requerido'}, fechaTermino_new : { required : 'requerido' } };
	}else{
		return false;
	}
	
	let formValidation = $(form);
	
	formValidation.validate({
		errorElement : 'div',
		errorClass : 'alert alert-danger text-center',
		focusInvalid : true,
		rules : rulesSearch,
		messages : messagesSearch
	});

	if (formValidation.valid()) {
		return true
	}

	return false

}


function selectALL() {

	let table = $('#datatableCartaTermino').DataTable();
	
	let checked = $('#checkAll').is(":checked");
	
	table.column(0).nodes().to$().each(function(index) {
		if (checked) {
			$(this).find('.checkbox').prop('checked', 'checked');
		} else {
			$(this).find('.checkbox').removeProp('checked');
		}
	});
	table.draw();

}


// Generar Accion Masivos:
async function generarAccionMasivos() {
	
	//Obtener un Array para Agregar los elementos que se seleccionaran
	let checkArr = [];
	//tabla
	let table = $('#datatableContratacionMasiva').DataTable();
	
	//var listParameters = new Array();
	
	if(table.page.info().recordsDisplay == 0){
		alerta("Debe Seleccionar a Un Trabajador");
		return false;
	}
	
	//Recorrer datatable
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
	    var data = this.node();
	    
	    if($(data).find('.checkbox').is(':checked')){
	    	debugger;
	    	codTrabajador = $(data).find('.checkbox').val();
	   
	    	let
			parameters = new Object();
	    	
	    	let
			parametersTrabajador = new Object();
	    	
			parameters.codigo_trabajador = codTrabajador;
			parameters.tipoTrabajador = $(data).find('#tipoTrabajador_'+codTrabajador).val();
			parameters.tipoContrato = $(data).find('#tipoContrato_'+codTrabajador).val();
			parameters.id_sociedad = $(data).find('#idSociedad_'+codTrabajador).val();
			parameters.idHuertoContrato = $(data).find('#idHuerto_'+codTrabajador).val();
			parameters.idCECOContrato = $(data).find('#idCECO_'+codTrabajador).val();
			parameters.idFaenaContrato = $(data).find('#idFaena_'+codTrabajador).val();
			parameters.cargo = $(data).find('#idCargo_'+codTrabajador).val();
			parameters.fecha_inicio_actividad = $(data).find('#fechaIngreso_'+codTrabajador).val();
			parameters.fecha_termino_actividad = $(data).find('#fechaTermino_'+codTrabajador).val();
			
			let sueldoBase = $(data).find('#sueldoBase_'+codTrabajador).val();
			let sueldoBaseWithoutDot = sueldoBase.replace(/\./g, '');
			parameters.sueldoBase = sueldoBaseWithoutDot.replace(',', '.');
		
			parameters.horasSemanales = $(data).find('#horasSemanales_'+codTrabajador).val();
			parameters.estado_contrato = 1;
			
			parametersTrabajador.idHuerto = $(data).find('#idHuerto_'+codTrabajador).val();
			parametersTrabajador.idCECO = $(data).find('#idCECO_'+codTrabajador).val();
			parametersTrabajador.idFaena = parseInt($(data).find('#idFaena_'+codTrabajador).val());
			parametersTrabajador.codigo = codTrabajador;

			listParameters.push(parameters);
			listParametersTrabajador.push(parametersTrabajador);
			
	    }

	} );
	
	
	let requests = [];
	
	//Generar accion por cada Trabajador
	for (var i = 0; i < listParameters.length; i++) {
		
		let cod_trabajador = listParameters[i].codTrabajador;
		
		requests.push(
				$.ajax({
					url : "/simpleWeb/json/work/insertContrato/",
					async : true,
					type : "PUT",
					data : JSON.stringify(listParameters[i]),
					beforeSend : function(xhr) {
						xhr.setRequestHeader("Accept", "application/json");
						xhr.setRequestHeader("Content-Type", "application/json");
					},
					success : function(data) {
					},
					error : function(ex) {
						alerta(JSON.stringify(ex.responseText));
					}
				}),
				$.ajax({
					url : "/simpleWeb/json/work/trabajadores/updateTrabajadorCECO/",
					async : true,
					type : "PUT",
					data : JSON.stringify(listParametersTrabajador[i]),
					beforeSend : function(xhr) {
						xhr.setRequestHeader("Accept", "application/json");
						xhr.setRequestHeader("Content-Type", "application/json");
					},
					success : function(data) {
						console.log(data);
					},
					error : function(ex) {
						alerta(JSON.stringify(ex.responseText));
					}
				})
		);//END OF PUSH
		
	}//END OF FOR

	let todosLosRegistros = await Promise.all(requests).catch(function(err) {
        // log that I have an error, return the entire array;
        console.log('A promise failed to resolve', err);
        return requests;
    }).then(
		console.log(requests)
	);
	
	if(todosLosRegistros != null){
		
		 swal({
	            title: 'Se Generaron los Contratos',
	            showCancelButton: false,
	            width: 400,
	            cancelButtonColor: '#d33',
	            cancelButtonText: 'No',
//	            confirmButtonText:
//	                '<i class="fa fa-print"></i> Imprimir Documentos',
	            onClose : function(){
	            	 cleanScreen();
	            	 listParameters.length = 0;
	            	 listParametersTrabajador.length = 0;
	            }
	         }).then(function (result) {
	        	
	        	if(result.value == true){
	        		//alerta("En desarrollo para Imprimir contrato");
	        	}
	        });
		
		
	}
	
}


function cleanScreen(){
	//Limpiar Informacion de la tabla;
	cleanDatatable();
	//Limpiar Inputs de la Pantalla;
	cleanInputs();
}

function cleanInputs(){
	$(document).find(":input").each(function(key,value){$(value).val("");});
}

function cleanDatatable(){
	$('#datatableContratacionMasiva').DataTable().clear().draw();
	$('#datatableContratacionMasiva').dataTable().fnDestroy();
}


// Imprimir Documentos
async function generarDocumentosMasivos() {

	// Imprimir parametros
	console.log(listParameters)

	$.ajax({
		url : '/simpleWeb/json/work/createCartaTerminoMasivo/?idTemplate='+$('#idTemplate').val(),
		async : true,
		type : "PUT",
		data : JSON.stringify(listParameters),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(data) {
			let file = data;
			// descargar archivo pdf
			window.open("/simpleWeb/json/work/showCartaTermino/?FILE="+ file[0]);
			
			//Cerrar Modal
			$('#imprimirDocumentos').modal("toggle");
			
			// resetear array
			listParameters.length = 0;
			
		},
		error : function(ex) {
			//Cerrar Modal
			$('#imprimirDocumentos').modal("toggle");
			alerta(JSON.stringify(ex.responseText));
			
			// resetear array
			//listParameters.length = 0;
		}

	});


}


jQuery.fn.setOptionsByArray = function(array, nameProperty1, nameProperty2) {

	let select = this;
	
	$.each(array, function(key, value) {
		$(select).append($('<option>').text(eval("value."+nameProperty1)).val(eval("value."+nameProperty2)));
	});

};

//Ocultar Informacion
jQuery.fn.collapseInformationAction = function(selector, action) {
	$(document).find(selector).each(function(key, value) {
		eval("$(value).closest('div')."+action);
	});
}

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

//Am to pm convert
function ConvertTimeformat(format) {
	var time = format;
	var hours = Number(time.match(/^(\d+)/)[1]);
	var minutes = Number(time.match(/:(\d+)/)[1]);
	var AMPM = time.match(/\s(.*)$/)[1];
	if (AMPM == "PM" && hours < 12)
		hours = hours + 12;
	if (AMPM == "AM" && hours == 12)
		hours = hours - 12;
	var sHours = hours.toString();
	var sMinutes = minutes.toString();
	if (hours < 10)
		sHours = "0" + sHours;
	if (minutes < 10)
		sMinutes = "0" + sMinutes;
	return (sHours + ":" + sMinutes + ":00");
}











//-----------JQUERY PLUGIN MASK--------------------//

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


/*
 * Chained - jQuery / Zepto chained selects plugin
 *
 * Copyright (c) 2010-2017 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/chained
 *
 * Version: 2.0.0-beta.3
 *
 */

;(function($, window, document, undefined) {
    "use strict";

    $.fn.chained = function(parentSelector) {
        return this.each(function() {

            /* Save this to child because this changes when scope changes. */
            var child   = this;
            var backup = $(child).clone();

            /* Handles maximum two parents now. */
            $(parentSelector).each(function() {
                $(this).bind("change", function() {
                    updateChildren();
                });

                /* Force IE to see something selected on first page load, */
                /* unless something is already selected */
                if (!$("option:selected", this).length) {
                    $("option", this).first().attr("selected", "selected");
                }

                /* Force updating the children. */
                updateChildren();
            });

            function updateChildren() {
                var triggerChange = true;
                var currentlySelectedValue = $("option:selected", child).val();

                $(child).html(backup.html());

                /* If multiple parents build value like foo+bar. */
                var selected = "";
                $(parentSelector).each(function() {
                    var selectedValue = $("option:selected", this).val();
                    if (selectedValue) {
                        if (selected.length > 0) {
                            selected += "+";
                        }
                        selected += selectedValue;
                    }
                });

                /* Also check for first parent without subclassing. */
                /* TODO: This should be dynamic and check for each parent */
                /*       without subclassing. */
                var first;
                if ($.isArray(parentSelector)) {
                    first = $(parentSelector[0]).first();
                } else {
                    first = $(parentSelector).first();
                }
                var selectedFirst = $("option:selected", first).val();

                $("option", child).each(function() {
                    /* Always leave the default value in place. */
                    if ($(this).val() === "") {
                        return;
                    }
                    var matches = [];
                    var data = String($(this).data("chained"));
                    if (data) {
                        matches = data.split(" ");
                    }
                    if ((matches.indexOf(selected) > -1) || (matches.indexOf(selectedFirst) > -1)) {
                        if ($(this).val() === currentlySelectedValue) {
                            $(this).prop("selected", true);
                            triggerChange = false;
                        }
                    } else {
                        $(this).remove();
                    }
                });

                /* If we have only the default value disable select. */
                if (1 === $("option", child).length && $(child).val() === "") {
                    $(child).prop("disabled", true);
                } else {
                    $(child).prop("disabled", false);
                }
                if (triggerChange) {
                    $(child).trigger("change");
                }
            }
        });
    };

    /* Alias for those who like to use more English like syntax. */
    $.fn.chainedTo = $.fn.chained;

    /* Default settings for plugin. */
    $.fn.chained.defaults = {};

})(window.jQuery || window.Zepto, window, document);


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

