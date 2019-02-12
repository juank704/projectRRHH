//TODO: Desasociar al Trabajador del grupo al cual pertenezca. sw_r_grupoTrabajador

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


//Cargar Trabajadores
var arrCambioEmpresa = [];
$(document).ready(function() {

	handleDemo1();
	getSelector();

	setTimeout(function() {
		console.log("Imprimiendo");
		console.log(arrCambioEmpresa[0][2]);
		$('#fechaTermino').datepicker({
			minDate : new Date(arrCambioEmpresa[0][2]),
			maxDate : arrCambioEmpresa[0][3] == null ? null : new Date(arrCambioEmpresa[0][3]),
			dateFormat : 'dd-mm-yy'
			
		});
	}, 1000)

	setTimeout(function() {
		$('#fechaInicio').datepicker({
			minDate : new Date(arrCambioEmpresa[0][2]),
			maxDate : arrCambioEmpresa[0][3] == null ? null : new Date(arrCambioEmpresa[0][3]),
			dateFormat : 'dd-mm-yy'
		});
	}, 1000)
	
	setTimeout(function() {
		$("#newEmpresa option[value='"+arrCambioEmpresa[0][1]+"']").remove();
	}, 1000);
	
	

	
	
})

// Obtener ID del trabajador
var get = getINFO();

// Cambiar Empresas del Trabajador
function CambiarEmpresa() {

	// Obtener Fechas
	var f_NuevoTermino = new Date($('#fechaTermino').val());
	var f_TerminoEmpresaAnt = new Date(window.data_cambioEmpresa[3]);
	var f_NuevoInicio = new Date($('#fechaInicio').val());

	// variable para determinar si existe fecha de termino en el contrato actual
	var f_termino = true;

	closeModal();

	swal({
		title : 'Cambio de Empresa',
		text : 'Estas seguro que desea Cambiar al Trabajador de Empresa?',
		type : 'warning',
		showCancelButton : true,
		confirmButtonColor : '#3085d6',
		cancelButtonColor : '#d33',
		confirmButtonText : 'Aceptar',
		cancelButtonText : 'Cancelar'
	}).then(function(result) {
		if (result.value) {
			ejecutarCambioEmpresa();
		}
	});

}

function ejecutarCambioEmpresa() {

	
	// Obtener Trabajador
	var trabajador;
	$
			.ajax({
				async : false,
				dataType : 'json',
				url : "/simpleWeb/json/work/getTrabajadorById/" + getINFO().id,
				success : function(data) {
					trabajador = data;
				},
				error : function(ex) {
					alerta("Error para proceso de cambio de empresa, No se encuentra el Trabajador: "
							+ ex);
				}
			});

	// Obtener Contrato
	var contrato;
	$
			.ajax({
				async : false,
				dataType : 'json',
				url : "/simpleWeb/json/work/getContratoById/"
						+ window.data_cambioEmpresa[5],
				success : function(data) {
					contrato = data;
				},
				error : function(ex) {
					alerta("Error para proceso de cambio de empresa, No se encuentra el Contrato: "
							+ ex);
				}
			});

	// Crear Nuevo Contrato en String
	var newContratoString = JSON.stringify(contrato);

	// Crear fechaTermino auxiliar para asignarlo a nuevo contrato
	var fechaFinAux = contrato.fecha_termino_actividad;
	// Si no existe fecha de termino del contrato anterior colocar fecha de
	// termino
	 if(f_termino == false){
	fechaFinAux = formatFecha($("#fechaTermino").val());
	 }

	// Crear Nuevo Contrato en JSON
	var newContrato = JSON.parse(newContratoString);

	// Asignar la fechaTermino al nuevo contrato
	newContrato.fecha_termino_actividad = fechaFinAux;
	// Si no hay fecha de termino dejar abierto el nuevo contrato
	 if(f_termino == false){
	newContrato.fecha_termino_actividad = "";
	 }
	// Asignar la empresa al nuevo contrato
	newContrato.id_sociedad = $("#newEmpresa").val();
	// Asignar fechaInicio al nuevo contrato
	newContrato.fecha_inicio_actividad = $("#fechaInicio").val();

	// Crear Id de Nuevo Contrato
	newContrato.id = "";

	// Cambiar fecha Fin de Contrato
	contrato.fecha_termino_actividad = $("#fechaTermino").val();

	// Cambiar estado del Nuevo contrato
	newContrato.estado_contrato = '1';

	// Cambiar el estado del Viejo contrato
	contrato.estado_contrato = '0';

	// Cambiar los datos del Contrato actual
	$.ajax({
		type : "PUT",
		async : false,
		url : "/simpleWeb/json/work/updateContrato/",
		data : JSON.stringify(contrato),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(data) {

			// Ingresar Nuevo Contrato
			$.ajax({
				type : "PUT",
				async : false,
				url : "/simpleWeb/json/work/insertContrato/",
				data : JSON.stringify(newContrato),
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success : function(data) {

					// Agregar a Movimiento TODO:
					var contratoMovimiento = newContrato;
					console.log(contratoMovimiento);
					$.extend(contratoMovimiento, {
						idTiposMovimiento : 3
					});
					contratoMovimiento.idContrato = contrato.id;

					agregarMovimiento(contratoMovimiento);

				},
				error : function(ex) {
					alert("Envio No Exitoso: " + ex);
				}

			});

		},
		error : function(ex) {

			console.log("Ocurrio un Error: " + ex);

		}
	});

	$('#datatable_ajax').dataTable().fnClearTable();
	$('#datatable_ajax').dataTable().fnDestroy();
	handleDemo1();

	return;

}

function generarContrato() {

	window.open('../assets/global/img/pruebaImagen.JPG', '_blank');

}

function agregarMovimiento(data) {

	// TODO: Generar Movimiento para Trabajador
	var movimiento;

	movimiento = {
		idTrabajador : getINFO().id,
		sociedad : data.id_sociedad,
		fechaIngreso : data.fecha_inicio_actividad,
		fechaTermino : data.fecha_termino_actividad,
		idContrato : data.id,
		idTiposMovimiento : data.idTiposMovimiento
	}

	// Envio del Movimiento
	$.ajax({
		url : '/simpleWeb/json/work/insertMovimiento/',
		type : "PUT",
		data : JSON.stringify(movimiento),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(data) {

		},
		error : function(ex) {
			alerta("Error al Registrar Movimiento: " + ex);
		}

	})

	return;

}

// Tabla dinamica con Filtros
function handleDemo1() {

	var trabajador;
	$
	.ajax({
		async : false,
		dataType : 'json',
		url : "/simpleWeb/json/work/getTrabajadorById/"
				+ getINFO().id,
		success : function(data) {
			trabajador = data;
		}
	});
	
	
	var grid = new Datatable();

	grid
			.init({
				src : $("#datatable_ajax"),
				onSuccess : function(grid, response) {
					// grid: grid object
					// response: json object of server side ajax response
					// execute some code after table records loaded
				},
				onError : function(grid) {
					// execute some code on network or other general error
				},
				onDataLoad : function(grid) {
					// execute some code on ajax data load
				},
				loadingMessage : 'Loading...',
				dataTable : {

					"bStateSave" : true, // save datatable
					// state(pagination, sort, etc)
					// in cookie.

					"paging": false,
					"info":false,
	
					"lengthMenu" : [ [ 10, 20, 50, 100, 150, -1 ],
							[ 10, 20, 50, 100, 150, "All" ] // change per
					// page values
					// here
					],
					"pageLength" : 20, // default record count per page
					"ajax" : {
						"url" : "/simpleWeb/json/work/getContratoByIdTrabajadorToCambioEmpresa/"
								+ trabajador.codigo // ajax
					// source
					},
					"columnDefs" : [

							// Primera Columna
							{
								"targets" : [ 0 ],
								"render" : function(data, type, full) {

									var nombreTrabajador;

									$
											.ajax({
												async : false,
												dataType : 'json',
												url : "/simpleWeb/json/work/getTrabajadorById/"
														+ getINFO().id,
												success : function(data) {
													nombreTrabajador = data.nombre;
												}
											});

									var html = "";
									html += nombreTrabajador;

									return html;

								}

							},
							// Segunda Columna
							{
								"targets" : [ 1 ],
								"render" : function(data, type, full) {

									var nombreEmpresa;
									$
											.ajax({
												async : false,
												dataType : 'json',
												url : "/simpleWeb/json/work/getSociedadById/"
														+ full[1],
												success : function(data) {
													nombreEmpresa = data.denominacionSociedad;
												}
											});

									var html = "";
									html += nombreEmpresa;

									return html;

								}
							},// Tercera Columna
							{
								"targets" : [ 2,3 ],
								"render" : function(data, type, full){
									
									if(data==null){
										return "";
									}
									
									return changeDateformatDDMMYY(data);
									
								}
							},
							{
								"targets" : [ 4 ],
								"render" : function(data, type, full) {
									console.log("El push");
									console.log(full);
									arrCambioEmpresa.push(full);
									console.log("Con Datos");
									console.log(arrCambioEmpresa);
									var html = "";
									// html += " <div
									// data-bind='"+JSON.stringify(full)+"'>
									// </div> ";
									html += "<a id='detCol' onclick='javascript: detCol("
											+ getINFO().id
											+ ");' title='Detalles' class='btn btn-circle blue btn-outline btn-sm'><i class='fa fa-align-justify fa-lg'></i></a>"
									window.data_cambioEmpresa = full;

									return html;

								}

							}

					],
					"order" : [ [ 1, "asc" ] ]
				// set first column as a default sort by asc

				}
			});

	// handle group actionsubmit button click
	grid.getTableWrapper().on(
			'click',
			'.table-group-action-submit',
			function(e) {
				e.preventDefault();
				var action = $(".table-group-action-input", grid
						.getTableWrapper());
				if (action.val() != "" && grid.getSelectedRowsCount() > 0) {
					grid.setAjaxParam("customActionType", "group_action");
					grid.setAjaxParam("customActionName", action.val());
					grid.setAjaxParam("id", grid.getSelectedRows());
					grid.getDataTable().ajax.reload();
					grid.clearAjaxParams();
				} else if (action.val() == "") {
					App.alert({
						type : 'danger',
						icon : 'warning',
						message : 'Please select an action',
						container : grid.getTableWrapper(),
						place : 'prepend'
					});
				} else if (grid.getSelectedRowsCount() === 0) {
					App.alert({
						type : 'danger',
						icon : 'warning',
						message : 'No record selected',
						container : grid.getTableWrapper(),
						place : 'prepend'
					});
				}
			});

}

// Get Selector para Empresas
function getSelector() {
	$.ajax({
		type : "GET",
		url : '/simpleWeb/json/work/getSociedad/',
		dataType : "json",
		success : function(data) {
			$.each(data, function(key, registro) {
				$("#newEmpresa").append(
						'<option value=' + registro.idSociedad + '>'
								+ registro.sociedad + '</option>');
			});
		},
		error : function(data) {
			alert('error');
		}
	});
}

function detCol(id) {
	window.location.href = ("detalleTrabajador?id=" + id);
}

$(function() {
		
	/* Add validation methods if validation plugin available. */
	if ($.fn.validate) {

		$.datepicker._selectDate2 = $.datepicker._selectDate;
		
		$.extend($.datepicker.regional[''], {
			validateDate: 'Ingrese una fecha valida',
			validateDateMin: 'Ingresar una fecha despues de {0}',
			validateDateMax: 'Ingresar una fecha antes de {0}',
			validateDateMinMax: 'Ingrese una fecha entre {0} y {1}',
			validateDateCompare: 'Por favor Ingrese una fecha {0} {1}',
			validateDateToday: 'hoy',
			validateDateOther: 'la otra fecha',
			validateDateEQ: 'Igual a',
			validateDateNE: 'no igual a',
			validateDateLT: 'antes',
			validateDateGT: 'despues',
			validateDateLE: 'no antes',
			validateDateGE: 'no despues'
		});
		
		$.extend($.datepicker._defaults, $.datepicker.regional['']);

		$.extend($.datepicker, {

			/* Trigger a validation after updating the input field with the selected date.
			   @param  id       (string) the ID of the target field
			   @param  dateStr  (string) the chosen date */
			_selectDate: function(id, dateStr) {
				this._selectDate2(id, dateStr);
				var input = $(id);
				var inst = this._getInst(input[0]);
				if (!inst.inline && $.fn.validate)
					input.parents('form').validate().element(input);
			},

			/* Correct error placement for validation errors - after (before if R-T-L) any trigger.
			   @param  error    (jQuery) the error message
			   @param  element  (jQuery) the field in error */
			errorPlacement: function(error, element) {
				var trigger = element.next('.' + $.datepicker._triggerClass);
				var before = false;
				if (trigger.length == 0) {
					trigger = element.prev('.' + $.datepicker._triggerClass);
					before = (trigger.length > 0);
				}
				error[before ? 'insertBefore' : 'insertAfter'](trigger.length > 0 ? trigger : element);
			},

			/* Format a validation error message involving dates.
			   @param  message  (string) the error message
			   @param  params  (Date[]) the dates
			   @return  (string) the formatted message */
			errorFormat: function(inst, message, params) {
				var format = $.datepicker._get(inst, 'dateFormat');
				$.each(params, function(i, v) {
					message = message.replace(new RegExp('\\{' + i + '\\}', 'g'),
						$.datepicker.formatDate(format, v) || 'nothing');
				});
				return message;
			}
		});

		var lastElement = null;

		/* Validate date field. */
		$.validator.addMethod('dpDate', function(value, element, params) {
				lastElement = element;
				var inst = $.datepicker._getInst(element);
				var dateFormat = $.datepicker._get(inst, 'dateFormat');
				try {
					var date = $.datepicker.parseDate(dateFormat, value, $.datepicker._getFormatConfig(inst));
					var minDate = $.datepicker._determineDate(inst, $.datepicker._get(inst, 'minDate'), null);
					var maxDate = $.datepicker._determineDate(inst, $.datepicker._get(inst, 'maxDate'), null);
					var beforeShowDay = $.datepicker._get(inst, 'beforeShowDay');
					return this.optional(element) || !date || 
						((!minDate || date >= minDate) && (!maxDate || date <= maxDate) &&
						(!beforeShowDay || beforeShowDay.apply(element, [date])[0]));
				}
				catch (e) {
					return false;
				}
			}, function(params) {
				var inst = $.datepicker._getInst(lastElement);
				var minDate = $.datepicker._determineDate(inst, $.datepicker._get(inst, 'minDate'), null);
				var maxDate = $.datepicker._determineDate(inst, $.datepicker._get(inst, 'maxDate'), null);
				var messages = $.datepicker._defaults;
				return (minDate && maxDate ?
					$.datepicker.errorFormat(inst, messages.validateDateMinMax, [minDate, maxDate]) :
					(minDate ? $.datepicker.errorFormat(inst, messages.validateDateMin, [minDate]) :
					(maxDate ? $.datepicker.errorFormat(inst, messages.validateDateMax, [maxDate]) :
					messages.validateDate)));
			});

		/* And allow as a class rule. */
		$.validator.addClassRules('dpDate', {dpDate: true});

		var comparisons = {equal: 'eq', same: 'eq', notEqual: 'ne', notSame: 'ne',
			lessThan: 'lt', before: 'lt', greaterThan: 'gt', after: 'gt',
			notLessThan: 'ge', notBefore: 'ge', notGreaterThan: 'le', notAfter: 'le'};

		/* Cross-validate date fields.
		   params should be an array with [0] comparison type eq/ne/lt/gt/le/ge or synonyms,
		   [1] 'today' or date string or Date or other field selector/element/jQuery OR
		   an object with one attribute with name eq/ne/lt/gt/le/ge or synonyms
		   and value 'today' or date string or Date or other field selector/element/jQuery OR
		   a string with eq/ne/lt/gt/le/ge or synonyms followed by 'today' or date string or jQuery selector */
		$.validator.addMethod('dpCompareDate', function(value, element, params) {
				if (this.optional(element)) {
					return true;
				}
				params = normaliseParams(params);
				var thisDate = $(element).datepicker('getDate');
				var thatDate = extractOtherDate(element, params[1]);
				if (!thisDate || !thatDate) {
					return true;
				}
				lastElement = element;
				var result = true;
				switch (comparisons[params[0]] || params[0]) {
					case 'eq': result = (thisDate.getTime() == thatDate.getTime()); break;
					case 'ne': result = (thisDate.getTime() != thatDate.getTime()); break;
					case 'lt': result = (thisDate.getTime() < thatDate.getTime()); break;
					case 'gt': result = (thisDate.getTime() > thatDate.getTime()); break;
					case 'le': result = (thisDate.getTime() <= thatDate.getTime()); break;
					case 'ge': result = (thisDate.getTime() >= thatDate.getTime()); break;
					default:   result = true;
				}
				return result;
			},
			function(params) {
				var inst = $.datepicker._getInst(lastElement);
				var messages = $.datepicker._defaults;
				params = normaliseParams(params);
				var thatDate = extractOtherDate(lastElement, params[1], true);
				thatDate = (params[1] == 'today' ? messages.validateDateToday : (thatDate ?
					$.datepicker.formatDate($.datepicker._get(inst, 'dateFormat'), thatDate,
					$.datepicker._getFormatConfig(inst)) : messages.validateDateOther));
				return messages.validateDateCompare.replace(/\{0\}/,
					messages['validateDate' + (comparisons[params[0]] || params[0]).toUpperCase()]).
					replace(/\{1\}/, thatDate);
			});

		/* Normalise the comparison parameters to an array.
		   @param  params  (array or object or string) the original parameters
		   @return  (array) the normalised parameters */
		function normaliseParams(params) {
			if (typeof params == 'string') {
				params = params.split(' ');
			}
			else if (!$.isArray(params)) {
				var opts = [];
				for (var name in params) {
					opts[0] = name;
					opts[1] = params[name];
				}
				params = opts;
			}
			return params;
		}

		/* Determine the comparison date.
		   @param  element  (element) the current datepicker element
		   @param  source   (string or Date or jQuery or element) the source of the other date
		   @param  noOther  (boolean) true to not get the date from another field
		   @return  (Date) the date for comparison */
		function extractOtherDate(element, source, noOther) {
			if (source.constructor == Date) {
				return source;
			}
			var inst = $.datepicker._getInst(element);
			var thatDate = null;
			try {
				if (typeof source == 'string' && source != 'today') {
					thatDate = $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'),
						source, $.datepicker._getFormatConfig(inst));
				}
			}
			catch (e) {
				// Ignore
			}
			thatDate = (thatDate ? thatDate : (source == 'today' ? new Date() :
				(noOther ? null : $(source).datepicker('getDate'))));
			if (thatDate) {
				thatDate.setHours(0, 0, 0, 0);
			}
			return thatDate;
		}
	}
	
	
	$("#cambioEmpresaForm").validate({
	
		errorElement : 'span',
		errorClass : 'help-block help-block-error',
		focusInvalid : true,
		rules : {
			nuevaEmpresa : {
				required : true
			},
			fechaTermino : {
				required : true,
				dpCompareDate : ['before', '#fechaInicio']
				
			},
			fechaInicio : {
				required : true,
				dpCompareDate : {after: '#fechaTermino'}
			}
		},
		messages : {
			nuevaEmpresa : {
				required : "requerido"

			},
			fechaTermino : {
				required : "requerido",
				
			},
			fechaInicio : {
				required : "requerido"
			}
		},
        errorPlacement : function(error, element) {

              if (element.parent(".input-group").size() > 0) {

                     error.insertAfter(element.parent(".input-group"));

              } else if (element.attr("data-error-container")) {

                     error
                                  .appendTo(element

                                                .attr("data-error-container"));

              } else if (element.parents('.radio-list').size() > 0) {

                     error.appendTo(element.parents('.radio-list').attr(

                                  "data-error-container"));

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
                     error.insertAfter(element); // for other inputs,

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
			
			// Obtener Fechas
			var f_NuevoTermino = new Date(changeDateformatYYMMDD($( "#fechaTermino" ).val()));
			
			var f_TerminoEmpresaAnt = new Date(window.data_cambioEmpresa[3]);
			var f_NuevoInicio = new Date(changeDateformatYYMMDD($( "#fechaInicio" ).val()));

			// variable para determinar si existe fecha de termino en el contrato actual
			var f_termino = true;

			f_termino = f_TerminoEmpresaAnt.getTime() != 0 ? true : false; 
			
			closeModal();

			swal({
				title : 'Cambio de Empresa',
				text : 'Estas seguro que desea Cambiar al Trabajador de Empresa?',
				type : 'warning',
				showCancelButton : true,
				confirmButtonColor : '#3085d6',
				cancelButtonColor : '#d33',
				confirmButtonText : 'Aceptar',
				cancelButtonText : 'Cancelar'
			}).then(function(result) {
				if (result.value) {

					// Obtener Trabajador
					var trabajador;
					$
							.ajax({
								async : false,
								dataType : 'json',
								url : "/simpleWeb/json/work/getTrabajadorById/" + get.id,
								success : function(data) {
									trabajador = data;
								},
								error : function(ex) {
									alerta("Error para proceso de cambio de empresa, No se encuentra el Trabajador: "
											+ ex);
								}
							});

					
					// Obtener Contrato
					var contrato;
					$
							.ajax({
								async : false,
								dataType : 'json',
								url : "/simpleWeb/json/work/getContratoById/"
										+ window.data_cambioEmpresa[5],
								success : function(data) {
									contrato = data;
								},
								error : function(ex) {
									alerta("Error para proceso de cambio de empresa, No se encuentra el Contrato: "
											+ ex);
								}
							});

					// Crear Nuevo Contrato en String
					var newContratoString = JSON.stringify(contrato);

					// Crear fechaTermino auxiliar para asignarlo a nuevo contrato
					var fechaFinAux = contrato.fecha_termino_actividad;
					// Si no existe fecha de termino del contrato anterior colocar fecha de
					// termino
					 if(f_termino == false){
					fechaFinAux = $("#fechaTermino").val();
					 }

					// Crear Nuevo Contrato en JSON
					var newContrato = JSON.parse(newContratoString);

					// Asignar la fechaTermino al nuevo contrato
					newContrato.fecha_termino_actividad = fechaFinAux;
					// Si no hay fecha de termino dejar abierto el nuevo contrato
					 if(f_termino == false){
					newContrato.fecha_termino_actividad = "";
					 }
					// Asignar la empresa al nuevo contrato
					newContrato.id_sociedad = $("#newEmpresa").val();
					// Asignar fechaInicio al nuevo contrato
					newContrato.fecha_inicio_actividad = $("#fechaInicio").val();

					// Crear Id de Nuevo Contrato
					newContrato.id = "";

					// Cambiar fecha Fin de Contrato
					contrato.fecha_termino_actividad = $("#fechaTermino").val();

					// Cambiar estado del Nuevo contrato
					newContrato.estado_contrato = '1';

					// Cambiar el estado del Viejo contrato
					contrato.estado_contrato = '0';
					
					// Cambiar los datos del Contrato actual
					$.ajax({
						type : "PUT",
						async : false,
						url : "/simpleWeb/json/work/updateContrato/",
						data : JSON.stringify(contrato),
						beforeSend : function(xhr) {
							xhr.setRequestHeader("Accept", "application/json");
							xhr.setRequestHeader("Content-Type", "application/json");
						},
						success : function(data) {

							// Ingresar Nuevo Contrato
							$.ajax({
								type : "PUT",
								async : false,
								url : "/simpleWeb/json/work/insertContrato/",
								data : JSON.stringify(newContrato),
								beforeSend : function(xhr) {
									xhr.setRequestHeader("Accept", "application/json");
									xhr.setRequestHeader("Content-Type", "application/json");
								},
								success : function(data) {

									// Agregar a Movimiento TODO:
									var contratoMovimiento = newContrato;
									
									$.extend(contratoMovimiento, {
										idTiposMovimiento : 3
									});
									contratoMovimiento.idContrato = contrato.id;

									var movimiento;
								
									movimiento = {
										idTrabajador : get.id,
										sociedad : contrato.id_sociedad,
										fechaIngreso : contrato.fecha_inicio_actividad,
										fechaTermino : contrato.fecha_termino_actividad,
										idContrato : contrato.id,
										idTiposMovimiento : contratoMovimiento.idTiposMovimiento
									}

									// Envio del Movimiento
									$.ajax({
										url : '/simpleWeb/json/work/insertMovimiento/',
										type : "PUT",
										data : JSON.stringify(movimiento),
										beforeSend : function(xhr) {
											xhr.setRequestHeader("Accept", "application/json");
											xhr.setRequestHeader("Content-Type", "application/json");
										},
										success : function(data) {

										},
										error : function(ex) {
											alerta("Error al Registrar Movimiento: " + ex);
										}

									})

								},
								error : function(ex) {
									alert("Envio No Exitoso: " + ex);
								}

							});

						},
						error : function(ex) {

							console.log("Ocurrio un Error: " + ex);

						}
					});

					swal('Trabajador Cambiado con exito').then(function(result) {
						if(result.value){location.reload()};
					});
					
					
				}
			});
			
			
		}
	});

});


