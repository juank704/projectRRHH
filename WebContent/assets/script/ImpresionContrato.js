//Copiar Informacion de Sociedad en el Modal de Impresion #ImprimirForm
$(function () {
    var $src = $('#idSociedad'),
        $dst = $('#idSociedadImpresion');
    $src.on('input', function () {
        $dst.val($src.val());
    });
});

//Copiar Informacion de Huerto en el Modal de Impresion #ImprimirForm
$(function () {
    var $src = $('#idHuerto'),
        $dst = $('#idHuertoImpresion');
    $src.on('input', function () {
        $dst.val($src.val());
    });
});



var elem = document.getElementById("myBar"); 
var width = 0;
var totalTrabajadores = 0;
var numeroTrabajador = 0;
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

var listParameters = new Array();

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

function beforeEvents(){
	console.log("no se ha precargado ninguna accion");
}

function setFormatInputs(){
	
	//Input de Hora
	$(".timeWork").timepicker();
	
	//Formato de Fecha
	$('.dateWork').each(function(key, value){
		$(value).mask("00-00-0000", {placeholder: "__-__-____"});
	});
	
	//Formato de Fecha
	$('.monthWork').each(function(key, value){
		$(value).mask("00-0000", {placeholder: "__-____"});
	});
	
	//Configuracion de Fechas
	$('.monthWork').each(function(key, value){
		$(value).datepicker({  firstDay : 1, changeMonth: true, changeYear: true, yearRange: "1930:+10", dateFormat: 'mm-yy' });
	});
	
	//Configuracion de Fechas
	$('.dateWork').each(function(key, value){
		$(value).datepicker({  firstDay : 1, changeMonth: true, changeYear: true, yearRange: "1930:+10", dateFormat: 'dd-mm-yy' });
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
		getDocumento(idSociedad);
	});
	
	//Evento para Obtener los CECOS
	$('#idHuerto').change(function(){
		let idHuerto = $(this).val();
		getCECOs(idHuerto);
		getDocumento(idSociedad);
	});
	
	//Eliminar Registro
	$('#datatableContrato').on('click', '.eliminarRegistro', function () {
		//Eliminar Row
		let table = $('#datatableContrato').DataTable();
	    table.row( $(this).closest('tr') ).remove().draw();
	});
	
	
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

//Llenar los Select
async function getSelector(){
	
	getSociedad();
	
	 // Array de Parametros
    let param = new Array('TIPO_CONTRATO');

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
                    $("#tipoContrato").append(
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
	$('#idSociedad, #idSociedadImpresion').each(function(key,value){$(value).children('option:not(:first)').remove();});
	
	//Colocar Sociedades en el Select
	$('#idSociedad, #idSociedadImpresion').setOptionsByArray(sociedades, "sociedad", "idSociedad");
	
}

//Buscar Trabajadores
async function buscarTrabajadorByParams() {
	
	// Si Cumple con las Validaciones
	if (!validarForm("#searchForm")) {
		return false;
	}
	
	$("#trabajadores").html("");

	// Obtener los atributos del Filtro
	let queryString = $("#searchForm").serialize();

	let trabajadores = await $.getJSON("/simpleWeb/json/work/getAllTrabajadorWithFilter/?" + queryString);

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

async function agregarMasivo(){
	
	// Si Cumple con las Validaciones
	if (!validarForm("#searchForm")) {
		return false;
	}

	// Obtener los atributos del Filtro
	let queryString = $("#searchForm").serialize();
	let trabajadores = await $.getJSON("/simpleWeb/json/work/getAllTrabajadorWithFilter/?" + queryString);
	
	// Colocar Tabla
	datatable(trabajadores);

}

async function agregarFila(){
	
	let trabajadorInSelect = $('#trabajadores').val();
	
	if(trabajadorInSelect == ""){
		alerta("Seleccione un Trabajador");
		return false;
	}
	
	let trabajadores = await $.getJSON("/simpleWeb/json/work/getAllTrabajadorWithFilter/?codigo=" + trabajadorInSelect);
	
	let table = $('#datatableContrato').DataTable();
	
	for (var i = 0; i < trabajadores.length; i++) {
	
	//Obtener Ultima Row
	let rowIdx = table.data().length;
		
	let htmlfechaEscrituracion = '<input id="fechaEscrituracion_'+trabajadores[i].codigo+'" type="text" class="form-control input-circle input-sm dateWork" value="'
	+ $('#fechaEscrituracion').val()
	+ '" col_name="fechaEscrituracion" >';
	
	let htmlfechaPactoHorasExtra = '<input id="fechaPactoHorasExtra_'+trabajadores[i].codigo+'" type="text" class="form-control input-circle input-sm dateWork" value="'
	+ $('#fechaPactoHorasExtra').val()
	+ '" col_name="fechaPactoHorasExtra" >';
	
	//Servicio para traerme los Contratos
	let contratos = await $.getJSON('/simpleWeb/json/work/contrato/getContratoWithFilter/?codigo_trabajador=' + trabajadores[0].codigo);
		
	let htmlContratos = '<select id="idContrato_'+trabajadores[0].codigo+'" class="form-control input-circle">'; 
	if(contratos != null){	
		$.each(contratos,function(key,value){
			let isLastElement = key == contratos.length -1;
			if(isLastElement){
				htmlContratos += '<option selected value="'+value.id+'">'+changeDateformatDDMMYY(value.fechaInicio_actividad)+'</option>';
			}else{
				htmlContratos += '<option value="'+value.id+'">'+changeDateformatDDMMYY(value.fechaInicio_actividad)+'</option>';
			}
		});
	}
	htmlContratos += '</select>';
	
	//Botones
	htmlBotones = "";
	htmlBotones += "<button title='Eliminar' class='btn btn-circle red btn-outline btn-sm eliminarRegistro '><i class='fa fa-close fa-lg'></i></button>";
	
	table.row.add(
			[
			 '<input checked type="checkbox" style="margin-left:auto; margin-right:auto;" id="'+trabajadores[i].codigo+'" value="'+trabajadores[i].codigo+'" name="check" class="checkbox text-uppercase">',
			 trabajadores[i].codigo,
			 trabajadores[i].apellidoPaterno + " " + trabajadores[i].apellidoMaterno + ", " + trabajadores[i].nombre,
			 trabajadores[i].rut,
			 htmlfechaEscrituracion,
			 htmlfechaPactoHorasExtra,
			 htmlContratos,
			 htmlBotones
			 ]).node().id = "td"
				
		table = ocultarDuplicadosDatatable(table);	
	  
	}
	
	
$('#datatableContrato').dataTable().fnDestroy();
	
	$('#datatableContrato').DataTable({
		"searching" : true,
		"ordering" : true,
		"paging" : false,
		"info" : true,
		"scrollX": true,
		"scrollY": "350px",
	});
	
	
	setFormatInputs();
	
}

//Validar Form Utilizando plugin de Jquery Validation
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


//Pasado un Array insertar opciones en un select
jQuery.fn.setOptionsByArray = function(array, nameProperty1, nameProperty2) {

	var select = this;
	
	$.each(array, function(key, value) {
		$(select).append($('<option>').text(eval("value."+nameProperty1)).val(eval("value."+nameProperty2)));
	});

};

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
	$('#datatableContrato').DataTable().clear().draw();
	$('#datatableContrato').dataTable().fnDestroy();
}

async function datatable(trabajadores) {

	$('#datatableContrato').dataTable().fnDestroy();

	// Parametros:
	let sociedad = await $.getJSON("/simpleWeb/json/work/getSociedad/");

	let grid = new Datatable();
	grid
			.init({
				src : $("#datatableContrato"),
				loadingMessage : 'Loading...',
				dataTable : {
					"bStateSave" : true,
					"data" : trabajadores,
					"columns" : [
							{"data" : "codigo"},
							{"data" : "codigo"},
							{"data" : ""},
							{"data" : "rut"},
							{"data" : "codigo"},
							{"data" : "codigo"},
							{"data" : "codigo"},
							{"data" : "codigo"}
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
									html = '<input checked type="checkbox" style="margin-left:auto; margin-right:auto;" id="'
											+ data
											+ '" value="'
											+ data
											+ '" name="check" class="checkbox text-uppercase">'

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
								"targets" : [ 4 ], //Fecha Notificacion
								"render" : function(value) {
									let html = '<input id="fechaEscrituracion_'+value+'" type="text" class="form-control input-circle input-sm dateWork" value="'
											+ $('#fechaEscrituracion').val()
											+ '" col_name="fechaEscrituracion" >';
									return html;

								}
							},
							{
								"targets" : [ 5 ], //Fecha Termino de Contrato
								"render" : function(value) {
									let html = '<input id="fechaPactoHorasExtra_'+value+'" type="text" class="form-control input-circle input-sm dateWork" value="'
											+ $('#fechaPactoHorasExtra').val()
											+ '" col_name="fechaPactoHorasExtra" >';
									return html;

								}
							},
							{
								"targets" : [ -2 ], //Contratos
								"render" : function(value, type, full, meta) {
									html = selectContratosByCodTrabajador(value, meta.row, meta.col);
									return html;
								}
							}
					]
				}
			});
	
	$('#datatableContrato').dataTable().fnDestroy();
	
	$('#datatableContrato').DataTable({
		"searching" : true,
		"ordering" : true,
		"paging" : false,
		"info" : true,
		"scrollX": true,
		"scrollY": "350px",
	}).draw();

}

function selectContratosByCodTrabajador(value, row, col){
	
	let html = '';
	let contratos;
	
	//Servicio para traerme los Contratos
	$.getJSON('/simpleWeb/json/work/contrato/getContratoWithFilter/?codigo_trabajador='+value).success(function(data){
		
		let currentCell = $("#datatableContrato").DataTable().cells({"row":row, "column":col}).nodes(0);
		
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


//Dado el Array y el Nombre de la Opcion retornar el Valor
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

var changeDateformatDDMMYY = function (input) {
    var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
    if (!input || !input.match(pattern)) {
        return null;
    }
    return input.replace(pattern, '$3-$2-$1');
};


//Generar Acciones Masivo
async function generarAccionMasivos(){
	
	//Obtener un Array para Agregar los elementos que se seleccionaran
	let checkArr = [];
	//tabla
	let table = $('#datatableContrato').DataTable();
	
	let listParameters = new Array();
	
	if(table.page.info().recordsDisplay == 0){
		alerta("Debe Seleccionar a Un Trabajador");
		return false;
	}
	
	//Recorrer datatable
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
	    var data = this.node();
	    
	    if($(data).find('.checkbox').is(':checked')){
	    	
	    	getParameters = $(data).find('.checkbox').val();
	    	
	    	let
			parameters = new Object();
			parameters.codTrabajador = getParameters;
			parameters.fechaEscrituracion = $(data).find('#fechaEscrituracion_'+getParameters).val();
			parameters.idContrato = $(data).find('#idContrato_'+getParameters).val();
			parameters.fechaPactoHorasExtra = $(data).find('#fechaPactoHorasExtra_'+getParameters).val();
			listParameters.push(parameters);
			console.log(parameters);
	    }

	} );
	
	
	let requests = [];
	
	$("#myProgress").show();
	
	//Generar accion por cada Trabajador
	for (var i = 0; i < listParameters.length; i++) {
		
		totalTrabajadores = listParameters.length;
		numeroTrabajador = i;
		
		let cod_trabajador = listParameters[i].codTrabajador;
		debugger;
		//Hacer ajax asyncronico en cadena
		let respuestaAjax = await doAjax(listParameters[i]);
		console.log(respuestaAjax);

		
	}//END FOR
	
	let todosLosRegistros = await Promise.all(requests).catch(function(err) {
        // log that I have an error, return the entire array;
        console.log('A promise failed to resolve', err);
        return requests;
    }).then(
		console.log(requests)
	);
		
		if(todosLosRegistros != null){
				
				if(globalMessage != null){
					console.log(globalMessage);
				}
				
				$.ajax({
					url : '/simpleWeb/json/work/Contratos/generateMultipleContratos/',
					async : true,
					type : "PUT",
					data : JSON.stringify(listParameters),
					beforeSend : function(xhr) {
						xhr.setRequestHeader("Accept", "application/json");
						xhr.setRequestHeader("Content-Type", "application/json");
					},
					success : function(data) {
						debugger;
						let file = data;
						// Descargar Archivo PDF
						window.open("/simpleWeb/json/work/showOneContrato/?FILE="+ file[0]);
					},
					error : function(ex) {
						debugger;
						console.log("Error al Insertar: " + ex);
						alerta(globalMessage);
						
					}

				});
				
			
			
//			 swal({
//		            title: 'Imprimir Contratos?',
//		            showCancelButton: true,
//		            width: 400,
//		            cancelButtonColor: '#d33',
//		            cancelButtonText: 'No',
//		            confirmButtonText:
//		                '<i class="fa fa-print"></i> Imprimir Documentos',
//		            closeOnClickOutside: false
//		        }).then(function (result) {
//		        	
//		        	if(result.value == true){
//		        	
//		        	//$('#imprimirDocumentos').modal("toggle");
//		        	//$('#imprimirMasivoBotonModal').show();
//		        	//$('#idSociedadImpresion').val($('#idSociedad').val());
//		        	//$('#idHuertoImpresion').val($('#idHuerto').val());
//		        	generarDocumentosMasivos();
//		        	
//		        	}
//		        });
			
			
		}
	
	
}




async function doAjax(args) {
    let result;

    try {
        result = await $.ajax({
			url : "/simpleWeb/json/work/Contratos/generateContratosIndividuales/?idTemplate="+$("#idTemplate").val(),
			async : true,
			type : "PUT",
			data : JSON.stringify(args),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success : function(data) {
				console.log(data);
				
			},
			error : function(ex) {
				alerta(JSON.stringify(ex.responseText));
			},complete : function(ex){
				
				let porcentaje; 
				numeroTrabajador++;
				porcentaje = ( 100 * ( numeroTrabajador ) ) / totalTrabajadores
			      elem.style.width = porcentaje.toFixed(0) + '%'; 
			      elem.innerHTML = porcentaje.toFixed(0) * 1 + '%';
			      
			    if(porcentaje.toFixed(0) == 100){
			    	$("#myProgress").hide();
			    }  
			      
			}

		});

        return result;
    } catch (error) {
        console.error(error);
    }
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

