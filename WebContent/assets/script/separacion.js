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

var get = getINFO();

var contrato;
var trabajador;

// Cargar Informacion (Tabla, Selects)
$(document).ready(function() {

	// Cargar Tabla
	datatableSeparacion();
	// Cargar Selectores
	getSelector();
	// Logica de Inputs
	setLogicEventInputs();
	

});

function setLogicEventInputs() {

	//Input de Hora
	$("#horaPago").timepicker();
	
	//Obtener Tabla
	var table = $('#datatable_ajax').DataTable();

	//Fecha de Termino valor minimo del calendario
	setTimeout(function() {

		$('#fechaTermino').datepicker({
			minDate : new Date(changeDateformatYYMMDD(table.row(0).data()[3])),
			dateFormat : 'dd-mm-yy',
			changeMonth : true,
			changeYear : true
		});
		
		$('#loading').hide();
		
	}, 5000);

	//Fecha de Pago valor minimo del calendario
	setTimeout(function() {
		$('#fechaPago').datepicker({
			minDate : new Date(changeDateformatYYMMDD(table.row(0).data()[3])),
			dateFormat : 'dd-mm-yy',
			changeMonth : true,
			changeYear : true
		});
		
		$('#loading').hide();
		
	}, 5000);

	
	setTimeout(function() {

				//Si el estado de Contrato es Inactivo 
				if (contrato.estadoContrato == 0) {

					// Obtener Contrato
					var contratoSeparacion;
					$.ajax({
								async : false,
								dataType : 'json',
								url : "/simpleWeb/json/work/getContratoById/"
										+ contrato.id,
								success : function(data) {
									contratoSeparacion = data;
								},
								error : function(ex) {
									alerta("Error para proceso de separacion, No se encuentra el Contrato: "
											+ ex);
								}
							});

					//Bloquear Inputs
					$("#fechaTermino").prop("disabled", true).val(contratoSeparacion.fecha_termino_actividad);
					$("#articulo").prop("disabled", true).val(contratoSeparacion.articuloTerminoContrato);
					$("#inciso").prop("disabled", true).val(contratoSeparacion.incisoTerminoContrato);
					$("#letra").prop("disabled", true).val(contratoSeparacion.letraTerminoContrato);
					$("#descripcion").prop("disabled", true);
					$("#fechaPago").prop("disabled", true).val(changeDateformatDDMMYY(contratoSeparacion.fechaPago));
					$("#lugarPago").prop("disabled", true).val(contratoSeparacion.lugarPago);
					$("#horaPago").prop("disabled", true).val(contratoSeparacion.horaPago);

					$("#addBuss[type=submit]").attr("disabled", "disabled");

					$("#mostrarContrato").show();
					
					$('#loading').hide();

				}

			}, 1000);
	
	
	
	// Seleccionar Inciso
	$(document).on('change', '#articulo', function(){
		
		$('#inciso').html('<option value="">Seleccione...</option>');
		$('#letra').html('<option value="">Seleccione...</option>');

		// Servicio para Obtener los Incisos dado un Articulo
		let inciso = $(this).getJSONSync("/simpleWeb/json/work/getIncisoTerminoContratoByIdArticulo/"+$('#articulo').val());
		
		// Cambiar Nombres de Propiedades  por value - text
		$.each(inciso, function(key, object){
			inciso[key] = renameProperty(object,"idIncisoTerminoContrato", "value");
			inciso[key] = renameProperty(object,"descripcion", "text");
		});

		// Llenar select de la Lista Huerto
		$('#inciso').setOptionsByArray(inciso);
		
		$('#inciso').prop('disabled',false);

	});

	// Seleccionar Comuna
	$(document).on('change', '#inciso', function(){

		$('#letra').html('<option value="">Seleccione...</option>');

		// Servicio para Obtener las Letras dado un Inciso
		let letra = $(this).getJSONSync("/simpleWeb/json/work/getLetraTerminoContratoByIdInciso/"+$('#inciso').val());
		
		// Cambiar Nombres de Propiedades  por value - text
		$.each(letra, function(key, object){
			letra[key] = renameProperty(object,"idLetraTerminoContrato", "value");
			letra[key] = renameProperty(object,"descripcion", "text");
		});

		// Llenar select de la Lista Huerto
		$('#letra').setOptionsByArray(letra);
		
		$('#letra').prop('disabled',false);



	});
	
	

}

function mostrarCartaTermino(codigo) {

	window.open('/simpleWeb/json/work/showCartaTermino.html?id=' + codigo);

}

function addSeparacion() {

	if ($('#fechaTermino').val() === '') {
		alerta("Debe Seleccionar una fecha de termino");
		$("#fechaTermino").focus();
		return;

	}

	// Obtener Fechas
	var f_NuevoTermino = new Date($('#fechaTermino').val());
	var f_Ingreso = new Date(changeDateformatYYMMDD(table.row(0).data()[3]));
	var f_Pago = new Date($('#fechaPago').val());

	// Validar que la fecha de Termino sea mayor a la fecha de Ingreso
	if (f_Ingreso.getTime() > f_NuevoTermino.getTime()) {
		alerta("La fecha de termino debe ser mayor a la fecha de Ingreso");
		$("#fechaTermino").focus();
		return;
	}

	if (document.getElementById('articulo').getElementsByTagName('option').length >= 2
			&& $('#articulo').val() == '') {

		alerta('debe seleccionar un articulo');
		$("#articulo").focus();
		return;
	}

	if (document.getElementById('inciso').getElementsByTagName('option').length >= 2
			&& $('#inciso').val() == '') {

		alerta('debe seleccionar un inciso');
		$("#inciso").focus();
		return;

	}

	if (document.getElementById('letra').getElementsByTagName('option').length >= 2
			&& $('#letra').val() == '') {
		alerta('debe seleccionar una letra');
		$("#letra").focus();
		return;
	}

	if ($('#fechaPago').val() === '') {
		alerta("Debe Seleccionar una fecha de Pago");
		$("#fechaPago").focus();
		return;

	}

	// Validar que la fecha de Pago sea mayor a la fecha de Ingreso
	if (f_Ingreso.getTime() > f_Pago.getTime()) {
		alerta("La fecha de pago debe ser mayor a la fecha de Ingreso");
		$("#fechaPago").focus();
		return;
	}

	if ($('#lugarPago').val() === '') {
		alerta("Debe Seleccionar un Lugar de Pago");
		$("#lugarPago").focus();
		return;

	}

	if ($('#horaPago').val() === '') {
		alerta("Debe Seleccionar una hora de Pago");
		$("#horaPago").focus();
		return;

	}

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
					alerta("Error para proceso de separacion, No se encuentra el Trabajador: "
							+ ex);
				}
			});

	// Obtener Contrato
	var contratoSeparacion;
	$
			.ajax({
				async : false,
				dataType : 'json',
				url : "/simpleWeb/json/work/getContratoById/" + contrato.id,
				success : function(data) {
					contratoSeparacion = data;
				},
				error : function(ex) {
					alerta("Error para proceso de separacion, No se encuentra el Contrato: "
							+ ex);
				}
			});

	// Cambiar Estado de Contrato
	contratoSeparacion.estadoContrato = '0';
	// Colocar Fecha de Termino
	contratoSeparacion.fechaTermino = $('#fechaTermino').val().replace(
			/([0-9]+)\/([0-9]+)\/([0-9]+)/, "$3/$1/$2")
	// Articulo
	contratoSeparacion.articuloTerminoContrato = $('#articulo').val();
	// Inciso
	contratoSeparacion.incisoTerminoContrato = $('#inciso').val();
	// Letra
	ccontratoSeparacionontrato.letraTerminoContrato = $('#letra').val();
	// Descripcion
	contratoSeparacion.descripcion = $('#descripcion').val();
	// Lugar
	contratoSeparacion.lugarPago = $('#lugarPago').val();
	// Fecha de Pago
	contratoSeparacion.fechaPago = $('#fechaPago').val().replace(
			/([0-9]+)\/([0-9]+)\/([0-9]+)/, "$3/$1/$2")
	// Hora de Pago
	contratoSeparacion.horaPago = ConvertTimeformat($('#horaPago').val());

	// Actualizar Contrato (Cerrarlo/Inactivo),

	$.ajax({
		url : "/simpleWeb/json/work/updateContrato/",
		type : "PUT",
		data : JSON.stringify(contratoSeparacion),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function() {

			// Agregar Movimiento

			var contratoMovimiento = contratoSeparacion
			$.extend(contratoMovimiento, {
				idTiposMovimiento : 2
			});
			agregarMovimiento(contratoSeparacion);
			alerta("Trabajador Egresado con Exito");

		},
		error : function(ex) {
			console.log(ex);
		}

	})

}

function agregarMovimiento(data) {

	// Generar Movimiento para Trabajador
	var movimiento;

	movimiento = {
		idTrabajador : data.idTrabajador,
		sociedad : data.sociedad,
		fechaIngreso : data.fechaIngreso,
		fechaTermino : data.fechaTermino,
		idContrato : data.idContrato,
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

			return;
		},
		error : function(ex) {
			alerta("Error al Registrar Movimiento: " + ex);
		}

	})

	alerta("Trabajador Egresado con Exito");

	// location.reload();

}

function generarContrato() {

	// Obtener la Ruta del Archivo
	// let rutaCartaTermino;
	//	
	// $.ajax({
	// type : "GET",
	// async: false,
	// url : "/simpleWeb/json/work/getServerFolder/?NAMEFOLDER=CartaTermino",
	// dataType : "json",
	// success : function(data) {
	// rutaCartaTermino = data;
	// },
	// error : function(ex) {
	// rutaCartaTermino = ex.responseText;
	// }
	// });

	// Servicio que Genera la Carta de Termino
	// $(this).setJSONSync("/simpleWeb/json/work/generateCartaTermino/"+getINFO().id,
	// rutaCartaTermino);

}

function formatFecha(inputDate) {

	if (!inputDate) {
		return null;
	}
	var output = inputDate.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
	return inputDate;

}

// Tabla dinamica con Filtros
function datatableSeparacion() {

	trabajador = $(this).getJSONSync(
			"/simpleWeb/json/work/getTrabajadorById/" + getINFO().id);

	contrato = $(this).getJSONSync(
			"/simpleWeb/json/work/getContratoByIdTrabajador/"
					+ trabajador.codigo);

	var separacion = new Array();
	separacion.push($.extend(trabajador, contrato));
	console.log(separacion);

	let
	grid = new Datatable();
	grid
			.init({
				src : $("#datatable_ajax"),
				loadingMessage : 'Loading...',
				dataTable : {
					"bStateSave" : true,
					"data" : separacion,
					"columns" : [ {
						"data" : "rut"
					}, {
						"data" : "nombre"
					}, {
						"data" : "idSociedad"
					}, {
						"data" : "fechaInicio_actividad"
					}, {
						"data" : "fechaTerminoContrato"
					}, {
						"data" : ""
					}, ],
					"columnDefs" : [
							// Primera Columna
							{
								"targets" : [ 0 ],
								"render" : function(data, type, full) {

									if (data == "") {
										var table = $('#datatable_ajax')
												.DataTable();
										$(table.column(0).header()).text(
												'Pasaporte');
										return trabajador.pasaporte
									} else {
										return data;
									}

								}

							},
							// Segunda Columna
							{
								"targets" : [ 1 ],
								"render" : function(data, type, full) {

									return trabajador.nombre;

								}

							},
							// Tercera Columna
							{
								"targets" : [ 2 ],
								"render" : function(data, type, full) {

									var nombreEmpresa;
									$
											.ajax({
												async : false,
												dataType : 'json',
												url : "/simpleWeb/json/work/getSociedadById/"
														+ data,
												success : function(data) {
													nombreEmpresa = data.denominacionSociedad;
												}
											});

									var html = "";
									html += nombreEmpresa;

									return html;

								}
							},// Cuarta Columna
							{
								"targets" : [ 3, 4 ],
								"render" : function(data) {
									return changeDateformatDDMMYY(data);
								}

							},
							{
								"targets" : [ 5 ],
								"render" : function(data, type, full) {

									var html = "";
									html += "<a id='detCol' onclick='javascript: detCol("
											+ trabajador.id
											+ ");' title='Detalles' class='btn btn-circle blue btn-outline btn-sm'><i class='fa fa-eye fa-lg'></i></a>"
									html += "<a id='mostrarContrato' onclick='javascript: mostrarCartaTermino("
											+ trabajador.codigo
											+ ");' title='Mostrar Carta de Termino' class='btn btn-circle blue btn-outline btn-sm' style='display: none;' ><i class='fa fa-file-pdf-o fa-lg'></i></a>"
									return html;

								}

							} ]

				}
			});

	$('#datatable_ajax').dataTable().fnDestroy();

	$("#datatable_ajax").DataTable({
		"searching" : false,
		"paging" : false,
		"info" : false,
		"bStateSave" : true
	}).draw();

}

function getSelector() {

	//Opciones de Defaults:
	//articulo
//	$('#articulo option:contains("Seleccione...")').prop('selected',true);
//	//inciso
//	$('#inciso option:contains("Seleccione...")').prop('selected',true);
//	//letra
//	$('#letra option:contains("Seleccione...")').prop('selected',true);


}// Fin getSelector

// Am to pm convert
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

function detCol(id) {
	window.location.href = ("detalleTrabajador?id=" + id);
}

// NEW
$(function() {

	$("#separacionForm")
			.validate(
					{

						errorElement : 'span',
						errorClass : 'help-block help-block-error',
						focusInvalid : true,
						rules : {
							fechaTermino : {
								required : true
							},
							fechaPago : {
								required : true
							},
							articulo : {
								required : true
							},
							inciso : {
								required : false
							},
							letra : {
								required : false
							},
							descripcion : {
								required : true
							},
							lugarPago : {
								required : true
							},
							horaPago : {
								required : true
							}
						},
						messages : {
							fechaTermino : {
								required : "requerido",
							},
							fechaPago : {
								required : "requerido"
							},
							lugarPago : {
								required : "requerido"
							},
							horaPago : {
								required : "requerido"
							},
							articulo : {
								required : "requerido"
							},
							inciso : {
								required : "requerido"
							},
							letra : {
								required : "requerido"
							},
							descripcion : {
								required : "requerido"
							}
						},
						errorPlacement : function(error, element) {

							if (element.parent(".input-group").size() > 0) {
								error.insertAfter(element
										.parent(".input-group"));
							} else {
								error.insertAfter(element);
							}
						},
						highlight : function(element) {
							$(element).closest('.form-group').addClass(
									'has-error');
						},
						unhighlight : function(element) {
							$(element).closest('.form-group').removeClass(
									'has-error');
						},
						success : function(label) {
							label.closest('.form-group').removeClass(
									'has-error');
						},
						submitHandler : function(form) {

							swal(
									{
										title : 'Separacion',
										html : ' <h3> Estas seguro que desea Terminar el contrato del Trabajador? </h3>',
										type : 'warning',
										showCancelButton : true,
										confirmButtonColor : '#3085d6',
										cancelButtonColor : '#d33',
										confirmButtonText : 'Aceptar',
										cancelButtonText : 'Cancelar'
									})
									.then(
											function(result) {
												if (result.value) {

													// Obtener Trabajador
													var trabajador;
													$
															.ajax({
																async : false,
																dataType : 'json',
																url : "/simpleWeb/json/work/getTrabajadorById/"
																		+ get.id,
																success : function(
																		data) {
																	trabajador = data;
																},
																error : function(
																		ex) {
																	alerta("Error para proceso de separacion, No se encuentra el Trabajador: "
																			+ ex);
																}
															});

													// Obtener Contrato
													var contratoSeparacion;
													$
															.ajax({
																async : false,
																dataType : 'json',
																url : "/simpleWeb/json/work/getContratoById/"
																		+ contrato.id,
																success : function(
																		data) {
																	contratoSeparacion = data;
																},
																error : function(
																		ex) {
																	alerta("Error para proceso de separacion, No se encuentra el Contrato: "
																			+ ex);
																}
															});

													// Cambiar Estado de
													// Contrato
													contratoSeparacion.estado_contrato = '0';
													// Colocar Fecha de Termino
													contratoSeparacion.fecha_termino_actividad = $(
															'#fechaTermino')
															.val()// .replace(/([0-9]+)\/([0-9]+)\/([0-9]+)/,"$3/$1/$2")
													// Articulo
													contratoSeparacion.articuloTerminoContrato = $(
															'#articulo').val();
													// Inciso
													contratoSeparacion.incisoTerminoContrato = $(
															'#inciso').val();
													// Letra
													contratoSeparacion.letraTerminoContrato = $(
															'#letra').val();
													// Descripcion
													contratoSeparacion.descripcion = $(
															'#descripcion')
															.val();
													// Lugar
													contratoSeparacion.lugarPago = $(
															'#lugarPago').val();
													// Fecha de Pago
													contratoSeparacion.fechaPago = $(
															'#fechaPago').val()// .replace(/([0-9]+)\/([0-9]+)\/([0-9]+)/,"$3/$1/$2")
													// Hora de Pago
													contratoSeparacion.horaPago = ConvertTimeformat($(
															'#horaPago').val());

													// Actualizar Contrato
													// (Cerrarlo/Inactivo),
													$
															.ajax({
																url : "/simpleWeb/json/work/updateContrato/",
																type : "PUT",
																data : JSON
																		.stringify(contratoSeparacion),
																beforeSend : function(
																		xhr) {
																	xhr
																			.setRequestHeader(
																					"Accept",
																					"application/json");
																	xhr
																			.setRequestHeader(
																					"Content-Type",
																					"application/json");
																},
																success : function() {

																	// Agregar
																	// Movimiento

																	var contratoMovimiento = contratoSeparacion
																	$
																			.extend(
																					contratoMovimiento,
																					{
																						idTiposMovimiento : 2
																					});
																	// Generar
																	// Movimiento
																	// para
																	// Trabajador
																	var movimiento;

																	movimiento = {
																		idTrabajador : get.id,
																		sociedad : contratoMovimiento.id_sociedad,
																		fechaIngreso : contratoMovimiento.fecha_inicio_actividad,
																		fechaTermino : contratoMovimiento.fecha_termino_actividad,
																		idContrato : contratoMovimiento.id,
																		idTiposMovimiento : contratoMovimiento.idTiposMovimiento
																	}

																	//Envio del Movimiento
																	$
																			.ajax({
																				url : '/simpleWeb/json/work/insertMovimiento/',
																				type : "PUT",
																				data : JSON
																						.stringify(movimiento),
																				beforeSend : function(
																						xhr) {
																					xhr
																							.setRequestHeader(
																									"Accept",
																									"application/json");
																					xhr
																							.setRequestHeader(
																									"Content-Type",
																									"application/json");
																				},
																				success : function(
																						data) {

																					return;
																				},
																				error : function(
																						ex) {
																					alerta("Error al Registrar Movimiento: "
																							+ ex);
																				}

																			})

																},
																error : function(
																		ex) {
																	console
																			.log(ex);
																}

															})

													//Recargar Tabla	
													swal(
															'Trabajador Terminado con exito')
															.then(
																	function(
																			result) {
																		if (result.value) {
																			//Generar Contrato
																			generarContrato();
																			//Mostrar icono para visualizar PDF TODO:

																			//Recargar la Pagina
																			location
																					.reload()
																		}
																		;
																	});

												}//cierre if mensaje
											});

						}
					});

});

//Obtener objecto JSON por Servicio synchronous
jQuery.fn.getJSONSync = function(urlServicioPath) {

	var objectData = new Object();

	$.ajax({
		type : "GET",
		async : false,
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

//Insertar objecto JSON por Servicio synchronous
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
			alert("Error al Insertar: " + ex);
		}

	});

	return enviado;

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

//Pasado un Array insertar opciones en un select
jQuery.fn.setOptionsByArray = function(array) {

	var select = this;

	$.each(array, function(key, value) {
		$(select).append($('<option>').text(value.text).val(value.value));
	});

};

