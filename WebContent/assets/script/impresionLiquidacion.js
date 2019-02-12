var downloadInZip = false;
var globalMessage = new Array();

//Colocar Permisos
var sociedadPrivilege = new Set();
var huertoPrivilege = new Set();
//Obtener Sociedades y Huertos que tiene acceso
$.each(SESION.campo, function(key, value){
	sociedadPrivilege.add(value.idSociedad);
	huertoPrivilege.add(value.campo);
}); 

//Pantalla de carga en cada Ajax Request
var $loading = $('#loading').hide();
$(document)
  .ajaxStart(function () {
    $loading.show();
  })
  .ajaxStop(function () {
    $loading.hide();
  });


$(document).ready(function() {

	// Cargar Formato de los Inputs
	setFormatInputs();

	// Colocar Eventos de Inputs
	setEventInputs();
	
	//Obtener Selects
	getSelector();

});

async function getSelector(){
	
	getSociedad();
	
	 // Array de Parametros
    var param = new Array('TIPO_CONTRATO');

    var selector;

    // Obtener datos para llenado de selects
    $.ajax({
        type: "GET",
        async: true,
        url: '/simpleWeb/json/work/getParametrosByCodigos',
        data: { param: param }, // se recibe array de parametros que se
        // requieren
        dataType: "json",
        success: function (data) {
        	  $.each(data, function (key, registro) {

        	      
        	        if (registro.codigo == "TIPO_CONTRATO") {
        	            $("#tipoContrato").append(
        	                '<option value=' + registro.llave + '>'
        	                + registro.descripcion + '</option>');
        	        }

        	    });
        },
        error: function (data) {
            alert('error');
        }
    });

}

async function getSociedad(){
	
	//Obtener Sociedades en base a los privilegios del usuario
	let queryString;
	if(sociedadPrivilege == null){
		queryString = "";
	}else{
		queryString = JSON.stringify(sociedadPrivilege).slice(1,-1);
	}
	
	//Obtener sociedades
	let sociedades = await $.getJSON('/simpleWeb/json/work/getSociedad/?idSociedad='+queryString);
	
	//Limpiar Select
	$('#idSociedad, #idSociedadImpresion').each(function(key,value){$(value).children('option:not(:first)').remove();});
	
	//Colocar Sociedades en el Select
	$('#idSociedad, #idSociedadImpresion').setOptionsByArray(sociedades, "sociedad", "idSociedad");
	
}


function setFormatInputs() {

	// Formato de Fecha
	$('.dateWork').each(function(key, value) {
		$(value).mask("00-00-0000", {
			placeholder : "__-__-____"
		});
	});

	$('.dateWork').each(function(key, value) {
		$(value).datepicker({
			changeMonth : true,
			changeYear : true,
			yearRange : "1930:+10",
			dateFormat : 'dd-mm-yy'
		});
	});

	$('.monthWork').each(function(key, value) {
		$(value).mask("00-0000", {
			placeholder : "__-____"
		});
	});

	$('.monthWork').each(function(key, value) {
		$(value).datepicker({
			changeMonth : true,
			changeYear : true,
			yearRange : "1930:+10",
			dateFormat : 'mm-yy'
		});
	});

}

function selectALL(nameTable) {

	var table = $('#datatableLiquidacion').DataTable();
	
	var checked = $('#checkAll').is(":checked");
	
	table.column(0).nodes().to$().each(function(index) {
		if (checked) {
			$(this).find('.checkbox').prop('checked', 'checked');
		} else {
			$(this).find('.checkbox').removeProp('checked');
		}
	});
	table.draw();

}

// TODO: Validar Form Utilizando plugin de Jquery Validation
function validarForm(form) {

	let
	formValidation = $(form);

	formValidation.validate({
		errorElement : 'span',
		errorClass : 'alert alert-danger text-center',
		focusInvalid : true,
		rules : {
			idSociedad : {
				required : true
			}
		},
		messages : {
			idSociedad : {
				required : 'requerido'
			}
		}
	});

	if (formValidation.valid()) {
		return true
	}

	return false

}

// TODO: Generar Documentos Masivos
async function generarDocumentosMasivos() {

	debugger;
	//Obtener un Array para Agregar los elementos que se seleccionaran
	let checkArr = [];
	//tabla
	let table = $('#datatableLiquidacion').DataTable();
	
	let listFiles = new Array();
	
	if(table.page.info().recordsDisplay == 0){
		alerta("Debe Seleccionar a Un Trabajador");
		return false;
	}
	
	//Recorrer datatable
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
	    let data = this.node();
	    
	    if($(data).find('.checkbox').is(':checked')){
	    	
	    	getParameters = $(data).find('.checkbox').val();
	    	
	    	let
			parametersForPdf = new Object();
			parametersForPdf.codTrabajador = getParameters;
			parametersForPdf.periodo = $(data).find('#periodo_'+getParameters).val();
			parametersForPdf.idContrato = $(data).find('#idContrato_'+getParameters).val();
			parametersForPdf.fechaPago = $(data).find('#fechaPago_'+getParameters).val();
			listFiles.push(parametersForPdf);
	    }

	} );
	
	let requests = [];
	
	//GENERAR RTF
	
	//Generar Archivo RTF de cada Trabajador
	for (var i = 0; i < listFiles.length; i++) {
		//console.log(listFiles[i].codTrabajador, listFiles[i].periodo, listFiles[i].idContrato);
		//generarLiquidacionPDF(listFiles[i].codTrabajador, listFiles[i].periodo, listFiles[i].idContrato);
		
		let cod_trabajador = listFiles[i].codTrabajador;
		let fechaConGuion  = listFiles[i].periodo;
		let idContrato 	   = listFiles[i].idContrato;
		let fechaPago	   = listFiles[i].fechaPago;
		
		let fecha =  fechaConGuion.split("-");
		let periodo =  fecha[1]+fecha[0];
		let contrato =  idContrato;
		
		requests.push(
			$.ajax({
				url : "/simpleWeb/json/work/LiquidacionDetalle/generateLiquidacionDetalle/?codTrabajador="+cod_trabajador
																	 +"&periodo="+periodo
																	 +"&idContrato="+contrato
																	 +"&fechaPago="+fechaPago,
				async : true,
				type : "PUT",
				data : JSON.stringify(""),
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success : function(data) {
					enviado = data;
				},
				error : function(ex) {
					debugger;
					//alerta(JSON.stringify(ex.responseText));
					globalMessage.push(ex.responseText + "\n");
					console.log(ex.responseText + "\n");
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
	
	
	//GENERAR RTF
	if(todosLosRegistros != null){
	
		if(globalMessage != null){
			console.log(globalMessage);
		}
		
		$.ajax({
			url : '/simpleWeb/json/work/generateMultipleLiquidacion/',
			async : true,
			type : "PUT",
			data : JSON.stringify(listFiles),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success : function(data) {
				let file = data;
				
				// Descargar Archivo PDF
				window.open("/simpleWeb/json/work/showMultipleLiquidacion/?FILE="+ file[0]);
					
			},
			error : function(ex) {
				console.log("Error al Insertar: " + ex);
			}

		})
		
	}
	
	
}

async function buscarArchivo(){
	
	
	
}



function datatableLiquidacion(liquidacionTrabajador) {

	$('#datatableLiquidacion').dataTable().fnDestroy();

	// Parametros:
	let sociedad = $(this).getJSONSync("/simpleWeb/json/work/getSociedad/");

	var grid = new Datatable();
	grid.init({
				src : $("#datatableLiquidacion"),
				loadingMessage : 'Loading...',
				dataTable : {
					"bStateSave" : true,
					"data" : liquidacionTrabajador,
					"columns" : [
							{"data" : "codigo"},
							{"data" : "codigo"},
							{"data" : ""},
							{"data" : "rut"},
							{"data" : "periodo"},
							{"data" : "fecha_pago"},
							{"data" : "fechaInicioActividad"},
							{"data" : "codigo"},
							//----------------
//							{"data" : "nombre"},
//							{"data" : "apellidoPaterno"},
//							{"data" : "apellidoMaterno"}
							],
					"columnDefs" : [
							{
								"targets" : [ 7 ],
								"render" : function(data, type, full) {
									html = "";
//									 html += "<button title='Generar Liquidacion PDF' id='"
//											+ data
//											+ "' onclick='generarLiquidacionIndividualPDF("
//											+ full.codigo
//											+ ");' class='btn btn-circle red btn-outline btn-sm pdfWork'><i class='fa fa-file-pdf-o fa-lg'></i></button>";
									html += "<button title='Eliminar' class='btn btn-circle red btn-outline btn-sm eliminarRegistro '><i class='fa fa-close fa-lg'></i></button>";
									
									return html;

								}
							},
							{
								"targets" : [ 0 ],
								"render" : function(data, type, full) {
									html = '<input checked type="checkbox" style="margin-left:auto; margin-right:auto;" id="'
											+ data
											+ '" value="'
											+ data
											+ '" name="check" class="checkbox text-uppercase">'

									return html;

								}
							},
							{
								"targets" : [ 2 ],
								"render" : function(value, type, full) {
									return full.apellidoPaterno + ", " + full.apellidoMaterno + " " + full.nombre 
								}
							},
							{
								"targets" : [ 4 ],
								"render" : function(value, type, full) {
									let html = '<input disabled id="periodo_'+full.codigo+'" type="text" class="form-control input-circle monthWork" value="'
											+ changeDateformatYYYYMM(value)
											+ '" >';
									return html;

								}
							},
							{
								"targets" : [ 5 ],
								"render" : function(value, type, full) {
									let html = '<input disabled id="fechaPago_'+full.codigo+'" type="text" class="form-control input-circle dateWork" value="'
											+ changeDateformatDDMMYY(value)
											+ '" >';
									return html;

								}
							},
							{
								"targets" : [ 6 ],
								"render" : function(value, type, full) {
								
									
									let html = '<select disabled id="idContrato_'+full.codigo+'" class="form-control input-circle">'; 
										html += '<option value="'+full.id_contrato+'">'+changeDateformatDDMMYY(value)+'</option>';
										html += '</select>';
									return html;

								}
							}

					]
				}
			});

	$('#datatableLiquidacion').dataTable().fnDestroy();
	$("#datatableLiquidacion").DataTable({
		"searching" : true,
		"ordering" : true,
		"paging" : false,
		"info" : true,
		"scrollX": true,
		"scrollY": "350px",
	}).draw();
	
	setFormatInputs();

}

//TODO: Generar PDF Individual
function generarLiquidacionIndividualPDF(cod_trabajador) {
	
	let fecha = $('#periodo_'+cod_trabajador).val().split("-");
	let periodo = fecha[1]+fecha[0];
	let contrato = $('#idContrato_'+cod_trabajador).val();
	
	let
	idTrabajador = $(this).getJSONSync(
			'/simpleWeb/json/work/getIdTrabajadorByCodigo/' + cod_trabajador);

	$(this).setJSONSync(
			"/simpleWeb/json/work/LiquidacionDetalle/generateLiquidacionDetalle/" + idTrabajador
					+ "," + periodo + "," + contrato+"?fechaPagoTrabajador="+$('#fechaPago').val());

	if (downloadInZip == true) {
		// Descargar el Archivo en Zip
		// downloadZipFile();

	} else {
		// Descargar el Archivo
	}

}


async function getDocumento(){
	
	let queryString = $("#imprimirForm").serialize();
	
	// Obtener los documentos
	let documentos = await $.getJSON('/simpleWeb/json/work/getDocuments/?idEmpresa=-1&tipoDocumento=2');

	//Limpiar Select
	$('#idTemplate').children('option:not(:first)').remove();
	//Llenar Select
	$('#idTemplate').setOptionsByArray(documentos, "documento", "idTemplate");
	
	  //Seleccionar Segunda Opcion
    $("#idTemplate option:eq(1)").attr('selected','selected');
		
}


//Generar Acciones Masivo
async function generarAccionMasivos(){
	
	//Obtener un Array para Agregar los elementos que se seleccionaran
	let checkArr = [];
	//tabla
	let table = $('#datatableLiquidacion').DataTable();
	
	let listParameters = new Array();
	
	if(table.page.info().recordsDisplay == 0){
		alerta("Debe Seleccionar a Un Trabajador");
		return false;
	}
	
			
			 swal({
		            title: 'Desea imprimir las liquidaciones?',
		            showCancelButton: true,
		            width: 400,
		            cancelButtonColor: '#d33',
		            cancelButtonText: 'No',
		            confirmButtonText:
		                '<i class="fa fa-print"></i> Imprimir Documentos',
		        }).then(function (result) {
		        	
		        	if(result.value == true){
		        	
		        	//$('#imprimirDocumentos').modal("toggle");
		        	//$('#imprimirMasivoBotonModal').show();
		        	//$('#idSociedadImpresion').val($('#idSociedad').val());
		        	//$('#idHuertoImpresion').val($('#idHuerto').val());
		        	//getDocumento();
		        	generarDocumentosMasivos();
		        	
		        	}
		        });
			
			
		
	
	
}

// TODO: Generar PDF Masivo
async function generarLiquidacionPDF(cod_trabajador,fechaConGuion,idContrato) {
	
	let fecha = fechaConGuion.split("-");
	let periodo = fecha[1]+fecha[0];
	let contrato = idContrato;
	
	let idTrabajador = await $.getJSON('/simpleWeb/json/work/getIdTrabajadorByCodigo/' + cod_trabajador);

	
	
	$.ajax({
		url : "/simpleWeb/json/work/LiquidacionDetalle/generateLiquidacionDetalle/" + idTrabajador
		+ "," + periodo + "," + contrato+"?fechaPagoTrabajador="+$('#fechaPago').val(),
		async : true,
		type : "PUT",
		data : JSON.stringify(""),
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

	
	
//	$.when.apply($,requests).done(function(){
//		  console.log(arguments); //array of responses [0][data, status, xhrObj],[1][data, status, xhrObj]...
//	})
	
	

}

function setEventInputs() {

	//Evento para Obtener los Huertos
	$('#idSociedad, #idSociedadImpresion').change(function(){
		let idSociedad = $(this).val();
		getHuertos(idSociedad);
	});
	
	//Evento para Obtener los CECOS
	$('#idHuerto').change(function(){
		let idHuerto = $(this).val();
		getCECOs(idHuerto);
	});
		 
	$('#datatableLiquidacion').on('click', '.eliminarRegistro', function () {
		//Eliminar Row
		var table = $('#datatableLiquidacion').DataTable();
		
	    table
	        .row( $(this).closest('tr') )
	        .remove()
	        .draw();
	} );
	
	//Imprimir Registro
	$('#datatableLiquidacion').on('click', '.imprimirRegistro', function () {
		debugger;
		//Obtener datos Row
		liquidacion = $(this).closest('tr').find('td :input').getObjectByInputs();
		
		 swal({
	            title: 'Desea imprimir la liquidacion?',
	            showCancelButton: true,
	            width: 400,
	            cancelButtonColor: '#d33',
	            confirmButtonText:
	                '<i class="fa fa-print"></i> Imprimir Documentos',
	        }).then(function (result) {
	        	
	        	if(result.value == true){
	        	
	        	$('#imprimirDocumentos').modal("toggle");
	        	$('#imprimirBotonModal').show();
	        	$('#idSociedadImpresion').val($('#idSociedad').val());
	        	$('#idHuertoImpresion').val($('#idHuerto').val());
	        	$('#informacionImprimir').val(JSON.stringify(liquidacion));
	        	getDocumento();
	        	
	        	}
	        });
		
		
	   
	});
	
	
	
	
	$('#idSociedadImpresion,#idHuertoImpresion,#tipoDocumento').change(function(){
		getDocumento();
	});
		
	
	
}


async function getHuertos(idSociedad){
	
	//Limpiar Select
	$('#idHuerto, #idHuertoImpresion').each(function(key,value){$(value).children('option:not(:first)').remove();});
	$('#idCECO').children('option:not(:first)').remove();
	
	// Obtener Codigo de la Sociedad en base al Id:
	let sociedadSAP = await $.getJSON("/simpleWeb/json/work/getSociedadById/"+ idSociedad);
	
	//Obtener huertos en base a los privilegios del usuario
	let queryString;
	if(huertoPrivilege == null){
		queryString = "";
	}else{
		queryString = JSON.stringify(huertoPrivilege).slice(1,-1);
	}
	
	// Obtener Huerto por la Sociedad
	let huerto =  await $.getJSON("/simpleWeb/json/work/getCampoWithFilter/?"+"campo="+queryString+"&sociedad="+sociedadSAP.sociedad);
	
	// Cambiar Nombres de Propiedades por value - text y Llenar select de la Lista Huerto
	$('#idHuerto, #idHuertoImpresion').setOptionsByArray(huerto, "descripcion", "campo");
	
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



// //TODO: Buscar Trabajadores
function buscarTrabajadorByParams() {
	
	// Si Cumple con las Validaciones
	if (!validarForm("#searchForm")) {
		return false;
	}
	
	//$('#loadingTest').modal('toggle');
	$("#trabajadores").html("");
	$('#btnBuscar').attr('disabled', 'disabled');

	// Obtener los atributos del Filtro
	let queryString = $("#searchForm").serialize();

	let trabajadorLiquidacion = $(this).getJSONSync("/simpleWeb/json/work/liquidacion/getLiquidacionTrabajadorWithFilter/?" + queryString);

	if (trabajadorLiquidacion.length > 0) {
		$('#documentacionMasiva').show();
		$('#btnAnadirIndividual').show();
		$('#btnAnadirMasivo').show();
	} else {
		$('#documentacionMasiva').hide();
		$('#btnAnadirIndividual').hide();
		$('#btnAnadirMasivo').hide();
	}

	//Colocar en Select
	setSelectTrabajador(trabajadorLiquidacion);
	
//	// Colocar Tabla
//	datatableLiquidacion(trabajadorLiquidacion);
	
	
	//$('#loadingTest').modal('toggle');
	$('#btnBuscar').attr('disabled', false);
	
}

async function agregarFila(){

	let trabajadorInSelect = $('#trabajadores').val();
	
	if(trabajadorInSelect == ""){
		alerta("Seleccione un Trabajador");
		return false;
	}
	
	// Obtener los atributos del Filtro
	let queryString = $("#searchForm").serialize();
	
	let trabajadorLiquidacion = await $.getJSON("/simpleWeb/json/work/liquidacion/getLiquidacionTrabajadorWithFilter/?"+queryString+"&codigo=" + trabajadorInSelect);
	
	let table = $('#datatableLiquidacion').DataTable();
	
	for (var i = 0; i < trabajadorLiquidacion.length; i++) {
	debugger;
	//Obtener Ultima Row
	let rowIdx = table.data().length;
	
	let htmlContratos = '<select disabled id="idContrato_'+trabajadorLiquidacion[i].codigo+'" class="form-control input-circle">'; 
		htmlContratos += '<option value="'+trabajadorLiquidacion[i].id_contrato+'">'+changeDateformatDDMMYY(trabajadorLiquidacion[i].fechaInicioActividad)+'</option>';
		htmlContratos += '</select>';
	
	//Botones
	htmlBotones = "";
	htmlBotones += "<button title='Eliminar' class='btn btn-circle red btn-outline btn-sm eliminarRegistro ' col_name='codigo_trabajador'  ><i class='fa fa-close fa-lg'></i></button>";
	//htmlBotones += "<button title='Generar Liquidacion PDF' class='btn btn-circle red btn-outline btn-sm imprimirRegistro' col_name='codigo_trabajador'  value='"+trabajadores[0].codigo_trabajador+"' ><i class='fa fa-file-pdf-o fa-lg'></i></button>";
	
	
	table.row.add(
			[
			 '<input checked type="checkbox" style="margin-left:auto; margin-right:auto;" id="'+trabajadorLiquidacion[i].codigo+'" value="'+trabajadorLiquidacion[i].codigo+'" name="check" class="checkbox text-uppercase">',
			 trabajadorLiquidacion[i].codigo,
			 trabajadorLiquidacion[i].apellidoPaterno + " " + trabajadorLiquidacion[i].apellidoMaterno + ", " + trabajadorLiquidacion[i].nombre,
			 trabajadorLiquidacion[i].rut,
			 '<input disabled id="periodo_'+trabajadorLiquidacion[i].codigo+'" type="text" class="form-control input-circle monthWork" value="'+changeDateformatYYYYMM(trabajadorLiquidacion[i].periodo)+'" >',
			 '<input disabled id="fechaPago_'+trabajadorLiquidacion[i].codigo+'" type="text" class="form-control input-circle dateWork" value="'+changeDateformatDDMMYY(trabajadorLiquidacion[i].fecha_pago)+'" >',
			 htmlContratos,
			 htmlBotones
			 ]).node().id = "td"
				
	}
	
	$('#datatableLiquidacion').dataTable().fnDestroy();
	
	$('#datatableLiquidacion').DataTable({
		"searching" : true,
		"ordering" : true,
		"paging" : false,
		"info" : true,
		"scrollX": true,
		"scrollY": "350px",
	});
	
	table.draw();
	
	setFormatInputs();
	
	
}

async function agregarMasivo(){
	
	// Si Cumple con las Validaciones
	if (!validarForm("#searchForm")) {
		return false;
	}

	// Obtener los atributos del Filtro
	let queryString = $("#searchForm").serialize();

	let trabajadorLiquidacion = await $.getJSON("/simpleWeb/json/work/liquidacion/getLiquidacionTrabajadorWithFilter/?" + queryString);

	// Colocar Tabla
	datatableLiquidacion(trabajadorLiquidacion);

	
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
	$('#datatableLiquidacion').DataTable().clear().draw();
	$('#datatableLiquidacion').dataTable().fnDestroy();
}

function setSelectTrabajador(trabajadorLiquidacion){
	
	let selectTrabajadorNombre = "";
	
	selectTrabajadorNombre += "<option value=''>Buscar</option>";
	$("#trabajadores").append(selectTrabajadorNombre);
	
	$.each(trabajadorLiquidacion,function(key, value) {
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
						+ "|"
						+ changeDateformatYYYYMM(value.periodo)
						+ "</option>";
				$("#trabajadores").append(selectTrabajadorNombre);
				
			});
	
}

// ------------------ JQUERY OWN FUNCTIONS----------------//

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

var changeDateformatYYYYMM = function(input) {
	let inputString = input+"";
	let anio = inputString.substring(0, 4);
	let mes = inputString.substring(4, 6);
	return mes+"-"+anio;
};


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
jQuery.fn.setOptionsByArray = function(array, nameProperty1, nameProperty2) {

	var select = this;
	
	$.each(array, function(key, value) {
		$(select).append($('<option>').text(eval("value."+nameProperty1)).val(eval("value."+nameProperty2)));
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

//Obtener el valor de los inputs y retornar un objecto JSON
jQuery.fn.getObjectByInputs = function () {

    var objectData = new Object();

    $(this).each(function (key, value) {
        var col_name = $(this).attr('col_name');

        var col_val;

        if ($(value).hasClass('percentage')) {
            col_val = $(this).val().toString().replace(',', '.').slice(0, -1);
        }
        else if ($(value).hasClass('money')) {
            col_val = $(this).val().replace(/\./g, '');
            col_val = col_val.replace('$', '');
            col_val = col_val.replace(',', '.');
        } else if ($(value).hasClass('checkboxOption')) {
            col_val = $(this).val() == 1 ? 1 : 0;
        }
        else if ($(value).hasClass('timeWork')) {
        	if($(value).is(":visible")){
        		col_val = ConvertTimeformat($(this).val());	
        	}else{
        		col_val = $(this).val();
        	}
        }
        else if ($(value).hasClass('dateWork')) {
        	col_val = changeDateformatYYMMDD($(this).val());
        }
        else {
            col_val = $(this).val();
        }

        objectData[col_name] = col_val;
    });

    return objectData;

};



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
(function(factory, jQuery, Zepto) {

	if (typeof define === 'function' && define.amd) {
		define([ 'jquery' ], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery || Zepto);
	}

}
		(
				function($) {
					'use strict';

					var Mask = function(el, mask, options) {

						var p = {
							invalid : [],
							getCaret : function() {
								try {
									var sel, pos = 0, ctrl = el.get(0), dSel = document.selection, cSelStart = ctrl.selectionStart;

									// IE Support
									if (dSel
											&& navigator.appVersion
													.indexOf('MSIE 10') === -1) {
										sel = dSel.createRange();
										sel.moveStart('character',
												-p.val().length);
										pos = sel.text.length;
									}
									// Firefox support
									else if (cSelStart || cSelStart === '0') {
										pos = cSelStart;
									}

									return pos;
								} catch (e) {
								}
							},
							setCaret : function(pos) {
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
								} catch (e) {
								}
							},
							events : function() {
								el
										.on(
												'keydown.mask',
												function(e) {
													el.data('mask-keycode',
															e.keyCode
																	|| e.which);
													el
															.data(
																	'mask-previus-value',
																	el.val());
													el
															.data(
																	'mask-previus-caret-pos',
																	p
																			.getCaret());
													p.maskDigitPosMapOld = p.maskDigitPosMap;
												})
										.on(
												$.jMaskGlobals.useInput ? 'input.mask'
														: 'keyup.mask',
												p.behaviour)
										.on('paste.mask drop.mask', function() {
											setTimeout(function() {
												el.keydown().keyup();
											}, 100);
										})
										.on('change.mask', function() {
											el.data('changed', true);
										})
										.on(
												'blur.mask',
												function() {
													if (oldValue !== p.val()
															&& !el
																	.data('changed')) {
														el.trigger('change');
													}
													el.data('changed', false);
												})
										// it's very important that this
										// callback remains in this
										// position
										// otherwhise oldValue it's going to
										// work buggy
										.on('blur.mask', function() {
											oldValue = p.val();
										})
										// select all text on focus
										.on(
												'focus.mask',
												function(e) {
													if (options.selectOnFocus === true) {
														$(e.target).select();
													}
												})
										// clear the value if it not complete
										// the mask
										.on(
												'focusout.mask',
												function() {
													if (options.clearIfNotMatch
															&& !regexMask
																	.test(p
																			.val())) {
														p.val('');
													}
												});
							},
							getRegexMask : function() {
								var maskChunks = [], translation, pattern, optional, recursive, oRecursive, r;

								for (var i = 0; i < mask.length; i++) {
									translation = jMask.translation[mask
											.charAt(i)];

									if (translation) {

										pattern = translation.pattern
												.toString().replace(
														/.{1}$|^.{1}/g, '');
										optional = translation.optional;
										recursive = translation.recursive;

										if (recursive) {
											maskChunks.push(mask.charAt(i));
											oRecursive = {
												digit : mask.charAt(i),
												pattern : pattern
											};
										} else {
											maskChunks.push(!optional
													&& !recursive ? pattern
													: (pattern + '?'));
										}

									} else {
										maskChunks.push(mask.charAt(i).replace(
												/[-\/\\^$*+?.()|[\]{}]/g,
												'\\$&'));
									}
								}

								r = maskChunks.join('');

								if (oRecursive) {
									r = r.replace(
											new RegExp('(' + oRecursive.digit
													+ '(.*' + oRecursive.digit
													+ ')?)'), '($1)?').replace(
											new RegExp(oRecursive.digit, 'g'),
											oRecursive.pattern);
								}

								return new RegExp(r);
							},
							destroyEvents : function() {
								el.off([ 'input', 'keydown', 'keyup', 'paste',
										'drop', 'blur', 'focusout', '' ]
										.join('.mask '));
							},
							val : function(v) {
								var isInput = el.is('input'), method = isInput ? 'val'
										: 'text', r;

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
							calculateCaretPosition : function() {
								var oldVal = el.data('mask-previus-value')
										|| '', newVal = p.getMasked(), caretPosNew = p
										.getCaret();
								if (oldVal !== newVal) {
									var caretPosOld = el
											.data('mask-previus-caret-pos') || 0, newValL = newVal.length, oldValL = oldVal.length, maskDigitsBeforeCaret = 0, maskDigitsAfterCaret = 0, maskDigitsBeforeCaretAll = 0, maskDigitsBeforeCaretAllOld = 0, i = 0;

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
									} else if (caretPosOld >= caretPosNew
											&& caretPosOld !== oldValL) {
										if (!p.maskDigitPosMapOld[caretPosNew]) {
											var caretPos = caretPosNew;
											caretPosNew -= maskDigitsBeforeCaretAllOld
													- maskDigitsBeforeCaretAll;
											caretPosNew -= maskDigitsBeforeCaret;
											if (p.maskDigitPosMap[caretPosNew]) {
												caretPosNew = caretPos;
											}
										}
									} else if (caretPosNew > caretPosOld) {
										caretPosNew += maskDigitsBeforeCaretAll
												- maskDigitsBeforeCaretAllOld;
										caretPosNew += maskDigitsAfterCaret;
									}
								}
								return caretPosNew;
							},
							behaviour : function(e) {
								e = e || window.event;
								p.invalid = [];

								var keyCode = el.data('mask-keycode');

								if ($.inArray(keyCode, jMask.byPassKeys) === -1) {
									var newVal = p.getMasked(), caretPos = p
											.getCaret();

									// this is a compensation to
									// devices/browsers that don't
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
							getMasked : function(skipMaskChars, val) {
								var buf = [], value = val === undefined ? p
										.val() : val + '', m = 0, maskLen = mask.length, v = 0, valLen = value.length, offset = 1, addMethod = 'push', resetPos = -1, maskDigitCount = 0, maskDigitPosArr = [], lastMaskChar, check;

								if (options.reverse) {
									addMethod = 'unshift';
									offset = -1;
									lastMaskChar = 0;
									m = maskLen - 1;
									v = valLen - 1;
									check = function() {
										return m > -1 && v > -1;
									};
								} else {
									lastMaskChar = maskLen - 1;
									check = function() {
										return m < maskLen && v < valLen;
									};
								}

								var lastUntranslatedMaskChar;
								while (check()) {
									var maskDigit = mask.charAt(m), valDigit = value
											.charAt(v), translation = jMask.translation[maskDigit];

									if (translation) {
										if (valDigit.match(translation.pattern)) {
											buf[addMethod](valDigit);
											if (translation.recursive) {
												if (resetPos === -1) {
													resetPos = m;
												} else if (m === lastMaskChar
														&& m !== resetPos) {
													m = resetPos - offset;
												}

												if (lastMaskChar === resetPos) {
													m -= offset;
												}
											}
											m += offset;
										} else if (valDigit === lastUntranslatedMaskChar) {
											// matched the last untranslated
											// (raw) mask
											// character that we encountered
											// likely an insert offset the mask
											// character
											// from the last entry; fall
											// through and only increment v
											maskDigitCount--;
											lastUntranslatedMaskChar = undefined;
										} else if (translation.optional) {
											m += offset;
											v -= offset;
										} else if (translation.fallback) {
											buf[addMethod]
													(translation.fallback);
											m += offset;
											v -= offset;
										} else {
											p.invalid.push({
												p : v,
												v : valDigit,
												e : translation.pattern
											});
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
											maskDigitPosArr.push(v
													+ maskDigitCount);
											maskDigitCount++;
										}

										m += offset;
									}
								}

								var lastMaskCharDigit = mask
										.charAt(lastMaskChar);
								if (maskLen === valLen + 1
										&& !jMask.translation[lastMaskCharDigit]) {
									buf.push(lastMaskCharDigit);
								}

								var newVal = buf.join('');
								p.mapMaskdigitPositions(newVal,
										maskDigitPosArr, valLen);
								return newVal;
							},
							mapMaskdigitPositions : function(newVal,
									maskDigitPosArr, valLen) {
								var maskDiff = options.reverse ? newVal.length
										- valLen : 0;
								p.maskDigitPosMap = {};
								for (var i = 0; i < maskDigitPosArr.length; i++) {
									p.maskDigitPosMap[maskDigitPosArr[i]
											+ maskDiff] = 1;
								}
							},
							callbacks : function(e) {
								var val = p.val(), changed = val !== oldValue, defaultArgs = [
										val, e, el, options ], callback = function(
										name, criteria, args) {
									if (typeof options[name] === 'function'
											&& criteria) {
										options[name].apply(this, args);
									}
								};

								callback('onChange', changed === true,
										defaultArgs);
								callback('onKeyPress', changed === true,
										defaultArgs);
								callback('onComplete',
										val.length === mask.length, defaultArgs);
								callback('onInvalid', p.invalid.length > 0, [
										val, e, el, p.invalid, options ]);
							}
						};

						el = $(el);
						var jMask = this, oldValue = p.val(), regexMask;

						mask = typeof mask === 'function' ? mask(p.val(),
								undefined, el, options) : mask;

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

						// get masked value without the value being in the input
						// or element
						jMask.getMaskedVal = function(val) {
							return p.getMasked(false, val);
						};

						jMask.init = function(onlyMask) {
							onlyMask = onlyMask || false;
							options = options || {};

							jMask.clearIfNotMatch = $.jMaskGlobals.clearIfNotMatch;
							jMask.byPassKeys = $.jMaskGlobals.byPassKeys;
							jMask.translation = $.extend({},
									$.jMaskGlobals.translation,
									options.translation);

							jMask = $.extend(true, {}, jMask, options);

							regexMask = p.getRegexMask();

							if (onlyMask) {
								p.events();
								p.val(p.getMasked());
							} else {
								if (options.placeholder) {
									el.attr('placeholder', options.placeholder);
								}

								// this is necessary, otherwise if the user
								// submit the form
								// and then press the "back" button, the
								// autocomplete will erase
								// the data. Works fine on IE9+, FF, Opera,
								// Safari.
								if (el.data('mask')) {
									el.attr('autocomplete', 'off');
								}

								// detect if is necessary let the user type
								// freely.
								// for is a lot faster than forEach.
								for (var i = 0, maxlength = true; i < mask.length; i++) {
									var translation = jMask.translation[mask
											.charAt(i)];
									if (translation && translation.recursive) {
										maxlength = false;
										break;
									}
								}

								if (maxlength) {
									el.attr('maxlength', mask.length).data(
											'mask-maxlength', true);
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
					var HTMLAttributes = function() {
						var input = $(this), options = {}, prefix = 'data-mask-', mask = input
								.attr('data-mask');

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
							return input.data('mask', new Mask(this, mask,
									options));
						}
					}, notSameMaskObject = function(field, mask, options) {
						options = options || {};
						var maskObject = $(field).data('mask'), stringify = JSON.stringify, value = $(
								field).val()
								|| $(field).text();
						try {
							if (typeof mask === 'function') {
								mask = mask(value);
							}
							return typeof maskObject !== 'object'
									|| stringify(maskObject.options) !== stringify(options)
									|| maskObject.mask !== mask;
						} catch (e) {
						}
					}, eventSupported = function(eventName) {
						var el = document.createElement('div'), isSupported;

						eventName = 'on' + eventName;
						isSupported = (eventName in el);

						if (!isSupported) {
							el.setAttribute(eventName, 'return;');
							isSupported = typeof el[eventName] === 'function';
						}
						el = null;

						return isSupported;
					};

					$.fn.mask = function(mask, options) {
						options = options || {};
						var selector = this.selector, globals = $.jMaskGlobals, interval = globals.watchInterval, watchInputs = options.watchInputs
								|| globals.watchInputs, maskFunction = function() {
							if (notSameMaskObject(this, mask, options)) {
								return $(this).data('mask',
										new Mask(this, mask, options));
							}
						};

						$(this).each(maskFunction);

						if (selector && selector !== '' && watchInputs) {
							clearInterval($.maskWatchers[selector]);
							$.maskWatchers[selector] = setInterval(function() {
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
						var $selector = (selector instanceof $) ? selector
								: $(selector);
						$selector.filter($.jMaskGlobals.dataMaskAttr).each(
								HTMLAttributes);
					};

					var globals = {
						maskElements : 'input,td,span,div',
						dataMaskAttr : '*[data-mask]',
						dataMask : true,
						watchInterval : 300,
						watchInputs : true,
						keyStrokeCompensation : 10,
						// old versions of chrome dont work great with input event
						useInput : !/Chrome\/[2-4][0-9]|SamsungBrowser/
								.test(window.navigator.userAgent)
								&& eventSupported('input'),
						watchDataMask : false,
						byPassKeys : [ 9, 16, 17, 18, 36, 37, 38, 39, 40, 91 ],
						translation : {
							'0' : {
								pattern : /\d/
							},
							'9' : {
								pattern : /\d/,
								optional : true
							},
							'#' : {
								pattern : /\d/,
								recursive : true
							},
							'A' : {
								pattern : /[a-zA-Z0-9]/
							},
							'S' : {
								pattern : /[a-zA-Z]/
							}
						}
					};

					$.jMaskGlobals = $.jMaskGlobals || {};
					globals = $.jMaskGlobals = $.extend(true, {}, globals,
							$.jMaskGlobals);

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
