//Colocar Permisos
var sociedadPrivilege = new Set();
var huertoPrivilege = new Array();
// Obtener Sociedades y Huertos que tiene acceso
$.each(SESION.campo, function(key, value) {
	sociedadPrivilege.add(value.idSociedad);
	huertoPrivilege.push(value.campo);
});

var rolPrivado;
$(document)
		.ready(
				function() {

					if (SESION.rolPrivado == 1) {

						rolPrivado = "1";

					} else {

						rolPrivado = "0";

					}

					$("#loading").hide();
					ListaSociedad();
					$('#panelform').css({
						"display" : "block",
						"opacity" : "0.5"
					});
					LoadHDReady();
					formatNumber();
					format();
					$("#haberes_descuentos option[value='h']").attr('selected',
							'selected');

					$("#panelform").click(function() {

						if ($('#panelform').css("opacity") == '0.5') {

							alerta('Debe Seleccionar una Empresa')
							$("#Sociedad").focus();

						} else {

						}

					});
					var currentTime = new Date();
					var startDateFrom = new Date(currentTime.getFullYear(),
							currentTime.getMonth() - 3, 1);

					$("#fechaCuotas").datepicker({
						dateFormat : 'mm-yy',
						minDate : startDateFrom,
						firstDay : 1,
						changeMonth : true,
						changeYear : true,

					});

					TipoMoneda();

					listado = [];
					eliminar = [];
					$('.form-control.input-sm').select2({
						multiple : false,
						placeholder : "Buscar.."
					});

					$('#monto').keyup(function(e) {
						var code = e.keyCode || e.which;
						if (code == 109 || code == 189) {
							var valor = $(this).val();
							$(this).val(valor.replace(/[-]/g, ''))
						}
					});

					$('#monto').change(function(e) {
						var valor = $(this).val();
						$(this).val(valor.replace(/[-]/g, ''))
					});

					$('#monto2').keyup(function(e) {
						var code = e.keyCode || e.which;
						if (code == 109 || code == 189) { // Enter keycode
							// Do something
							var valor = $(this).val();
							$(this).val(valor.replace(/[-]/g, ''))
						}
					});

					monto2Change();

					// $("#idContrato").prop("disabled", true);
					// $("#conceptos").prop("disabled", true);
					// $("#CodigoTra").prop("disabled", true);

					$("#CodigoTra")
							.change(
									function() {

										$("#idContrato").empty();
										var codt = $('#CodigoTra').val();
										$("#loading").show();
										$
												.getJSON(
														"/simpleWeb/json/work/LoadSelectIdContrato/"
																+ codt,
														function(data) {

															cantidadData = data.length;

															if (cantidadData > 1) {
																$("#idContrato")
																		.prop(
																				"disabled",
																				false);
																var SelectIdContrato = "";
																SelectIdContrato += "<option value=''>Seleccione..</option>";

																$("#idContrato")
																		.append(
																				SelectIdContrato);
																$
																		.each(
																				data,
																				function(
																						k,
																						v) {

																					var SelectIdContrato = "";
																					SelectIdContrato += "<option value="
																							+ v.id
																							+ ">"
																							+ v.fecha_inicio_actividad
																							+ "</option>";

																					$(
																							"#idContrato")
																							.append(
																									SelectIdContrato);

																				});
															} else if (cantidadData == 1) {
																$("#idContrato")
																		.prop(
																				"disabled",
																				true);

																$
																		.each(
																				data,
																				function(
																						k,
																						v) {

																					var SelectIdContrato = "";
																					SelectIdContrato += "<option value="
																							+ v.id
																							+ ">"
																							+ v.fecha_inicio_actividad
																							+ "</option>";

																					$(
																							"#idContrato")
																							.append(
																									SelectIdContrato);

																				});
															} else if (cantidadData == 0) {
																$("#idContrato")
																		.prop(
																				"disabled",
																				true);
															}

															// bloqueSelect();
														}).done(function() {
													$("#loading").hide();
												})

										$("#conceptos option").removeAttr(
												"style");
										$("#conceptos option").removeAttr(
												"disabled");

										var codigo_trab = $("#CodigoTra").val();

										for (var i = 0; i < listado.length; i++) {

											if (codigo_trab == listado[i].codigo) {

												$(
														"select option[value='"
																+ listado[i].option
																+ "']").attr(
														'disabled', true);
												$(
														"select option[value='"
																+ listado[i].option
																+ "']").css(
														'backgroundColor',
														'#ccc');

											} else {
											}
										}

									});

				});// end ready

var numero = 0;

function addForm() {

	var texFrecuencia = $("#frecuencia option:selected").text();
	var idFrecuencia = 180;
	var cuotas_trab = $("#monto2").val();
	var fechaInicioCuotas = $("#fechaCuotas").val();
	var fechaCuotasTermino_trab = $("#fechaCuotasTermino").text();
	var fechaCuotasTermino_trab_val = $("#fechaCuotasTermino").val();
	var idmoneda = $("#tipoMoneda").val();

	var periodoV = $("#fechaCuotas").val();

	var fechaI = $("#fechaCuotas").val();
	var fechaT = $("#fechaCuotasTermino").val();
	var valorfrecuencia = $("#frecuencia").val();

	if (periodoV == '') {
		alerta("Debe Seleccionar un periodo");
		return;

	}

	if (fechaT == '' && valorfrecuencia == 181) {
		alerta("Debe Seleccionar una Fecha Termino");
		return;
	} else if (fechaI == '' && valorfrecuencia == 181) {
		alerta("Debe Seleccionar una Fecha Inicio");
		return;
	}

	var fechaTermino;
	if (fechaCuotasTermino_trab_val == "") {
		fechaTermino = "N/A";
	} else {
		fechaTermino = fechaCuotasTermino_trab_val;
	}

	var fechaI;
	if (fechaInicioCuotas == "") {
		fechaI = "N/A";
	} else {
		fechaI = fechaInicioCuotas;
	}

	var cuotaTR;
	if (cuotas_trab == "") {
		cuotaTR = "N/A";
	} else {
		cuotaTR = cuotas_trab;
	}

	var textFre;
	if (idFrecuencia == "") {
		textFre = "N/A";
	} else {
		textFre = texFrecuencia;
	}

	var codigo_trab = $("#CodigoTra").val();

	// var nombre_trab = $("#select2-CodigoTra-container").text();
	// var apellido_trab = $("#select2-CodigoTra-container").text();
	var monto_trab = $("#monto").val();
	var concepto_codigo_trab = $("#conceptos").val();
	var letra_trab = $("#haberes_descuentos").val();
	// var fechaF1 = $("#fecha").val();
	var simbolo = '/';

	var cargo = $("#haberes_descuentos").val();
	if ($('#haberes_descuentos').val() === '') {
		alerta("Debe Seleccionar un Haberes/Descuento");
		$("#haberes_descuentos").focus();
		return;
	} else if ($('#conceptos').val() === '') {
		alerta("Debe Seleccionar un Concepto");
		$("#conceptos").focus();
		return;
	}
	// else if ($('#conceptos').val() === null) {
	// alerta("Concepto ya se Encuentra en lista Para Este Trabajador");
	// $("#conceptos").focus();
	// return;
	// }
	else if ($('#CodigoTra').val() === '0') {
		alerta("Debe Ingresar un Codigo Trabajador");
		$("#CodigoTra").focus();
		return;
	} else if ($('#monto').val() === '' && idmoneda == 4) {
		alerta("Debe Ingresar un Monto");
		$("#monto").focus();
		return;
	} else if ($('#monto').val() == 0 && idmoneda == 4) {
		alerta("Debe Ingresar un Monto mayor a 0");
		$("#monto").focus();
		return;

	} else if ($('#montonew').val() === '' && idmoneda == 2) {
		alerta("Debe Ingresar un Monto");
		$("#montonew").focus();
		return;
	} else if ($('#montonew').val() == 0 && idmoneda == 2) {
		alerta("Debe Ingresar un Monto mayor a 0");
		$("#montonew").focus();
		return;

	}

	else if ($('#idContrato').val() == '') {
		alerta("Debe Seleccionar Fecha Contrato");
		$("#idContrato").focus();
		return;
	} else if ($('#frecuencia').val() == '') {
		alerta("Debe Seleccionar una Frecuencia");
		$("#frecuencia").focus();
		return;
	} else if (idmoneda == '') {
		alerta("Debe Ingresar un Tipo de Moneda");
		$("#tipoMoneda").focus();
		return;
	} else {

		var codigo_trab = $("#CodigoTra").val();
		var nombre_trab;
		var apellido_trab;

		$.ajax(
				{
					type : "GET",
					url : '/simpleWeb/json/work/NombreTrabajador/'
							+ codigo_trab,
					async : false,
					dataType : "JSON",
					success : function(data) {
						console.log(data);
						$.each(data, function(k, v) {

							nombre_trab = "" + v.nombre + "";
							apellido_trab = v.apellidopaterno + " "
									+ v.apellidomaterno;

						})

					}
				}).fail(function(jqXHR, textStatus, errorThrown) {

			alerta(errorThrown);
			$("#loading").hide();
		})

		if (idmoneda == 4) {
			var monto_trab = $("#monto").val();
		} else {
			var monto_trab = $("#montonew").val();
		}

		var concepto_codigo_trab = $("#conceptos").val();
		var concepto_text = $("#conceptos option:selected").text();
		var concepto_text2 = concepto_text.split('|');

		var HD_text = $("#haberes_descuentos option:selected").text();

		var letra_trab = $("#haberes_descuentos").val();
		var idContrato = $("#idContrato").val();

		var tdcheck = "";

		var tex_tipo_moneda = $("#tipoMoneda option:selected").text();
		var val_tipo_moneda = $("#tipoMoneda").val();

		var datos = {
			codigo : codigo_trab,
			option : concepto_codigo_trab

		}
		listado.push(datos)

		// bloqueSelect();

		$("#tblPeticion")
				.append(
						"" + "<tr id=td"
								+ numero
								+ ">"
								+ "<td class='concepto_codigo_trab' style='display: none;'>"
								+ concepto_codigo_trab
								+ "</td>"
								+ "<td>"
								+ HD_text
								+ " | "
								+ concepto_text2[1]
								+ "</td>"
								+ "<td class='codigo_trab'>"
								+ codigo_trab
								+ "</td>"
								+ "<td class='nombre_trab'>"
								+ nombre_trab
								+ "</td>"
								+ "<td class='apellido_trab'>"
								+ apellido_trab
								+ "</td>"
								+ "<td class='td_tipo_moneda'>"
								+ tex_tipo_moneda
								+ "</td>"
								+ "<td class='tdmoneda' style='display: none;'>"
								+ val_tipo_moneda
								+ "</td>"
								+ "<td class='monto_trab'>"
								+ monto_trab
								+ "</td>"
								+ "<td class='frecuenciaid_trab' style='display: none;'>"
								+ idFrecuencia
								+ "</td>"
								+ "<td class='cuotas_trab'>"
								+ cuotaTR
								+ "</td>"
								+ "<td class='fecha_termino_trababajador'>"
								+ fechaInicioCuotas
								+ "</td>"
								+ "<td  id=td"
								+ numero
								+ " onclick='javascript: eliminarFila(this.id);' >"
								+ "<button title='Eliminar'< class='btn btn-circle red btn-outline btn-sm'>"
								+ "<i class='fa fa-close fa-lg'></i></button>"
								+ "</td>"
								+ "<td class='letra_trab' style='display: none;'>"
								+ letra_trab + "</td>"
								+ "<td class='idcont' style='display: none;'>"
								+ idContrato + "</td>" + "</tr>");

	}

	Array_id_moneda = [];
	$("td.tdmoneda").each(function() {
		Array_id_moneda.push($(this).text());

	});

	Array_monto_trab = [];
	var numerotd = 0;
	$("td.monto_trab").each(function() {
		var total = "";
		total = Array_id_moneda[numerotd];
		if (total == "4") {
			var montoN = "";
			montoN = $(this).text();
			montoN2 = montoN.toString().replace(/\./g, '');
			Array_monto_trab.push(montoN2);

		} else if (total == "2") {
			var montoN = "";
			montoN = $(this).text();

			Array_monto_trab.push(montoN);

		}
		numerotd = numerotd + 1;

	});

	var total = 0;
	for (var i = 0; i < Array_monto_trab.length; i++) {

		if ($("#tipoMoneda").val() == "4") {
			total = parseInt(Array_monto_trab[i]) + total;
		} else {
			total = parseFloat(Array_monto_trab[i]) + total;
		}
	}

	if ($("#tipoMoneda").val() == "4") {
		var total = String(total).replace(/(.)(?=(\d{3})+$)/g, '$1.')
	} else {
		var total = total.toFixed(2);
	}

	$('#totalMonto').html("");
	$("#totalMonto").append(total);

	numero = numero + 1;

	$("#monto2").val("");
	$("#fechaCuotasTermino").val("");

}

function LoadHD() {
	$("#loading").show();
	var HD = $("#haberes_descuentos").val();
	var IFHD = $("#haberes_descuentos").val();

	if (HD == "hn") {

		HD = "h";
	}

	$.getJSON(
			"/simpleWeb/json/work/LoadConceptos/" + HD,
			function(data) {

				$.each(data, function(k, v) {

					if (IFHD == "hn" && v.codigo >= 2000 && v.codigo <= 2999) {
						var SelectConcepto = "";
						SelectConcepto += "<option value=" + v.codigo + ">"
								+ v.codigo + " | " + v.conceptos + "</option>";

						$("#conceptos").append(SelectConcepto);

					} else if (IFHD == "h" && v.codigo >= 1000
							&& v.codigo <= 1999) {
						var SelectConcepto = "";
						SelectConcepto += "<option value=" + v.codigo + ">"
								+ v.codigo + " | " + v.conceptos + "</option>";

						$("#conceptos").append(SelectConcepto);

					}

					else if (IFHD == "c" && v.codigo >= 4000
							&& v.codigo <= 4999) {
						var SelectConcepto = "";
						SelectConcepto += "<option value=" + v.codigo + ">"
								+ v.codigo + " | " + v.conceptos + "</option>";

						$("#conceptos").append(SelectConcepto);

					}

					else {

						if (HD == "d") {
							var SelectConcepto = "";
							SelectConcepto += "<option value=" + v.codigo + ">"
									+ v.codigo + " | " + v.conceptos
									+ "</option>";

							$("#conceptos").append(SelectConcepto);
						}
					}

				});

				// bloqueSelect();
			}).done(function() {
		$("#loading").hide();
	})

}

function LoadHDReady() {
	$("#loading").show();
	var HD = "h";

	$.getJSON(
			"/simpleWeb/json/work/LoadConceptos/" + HD,
			function(data) {

				$.each(data, function(k, v) {

					if (HD == "h" && v.codigo >= 1000 && v.codigo <= 1999) {
						var SelectConcepto = "";
						SelectConcepto += "<option value=" + v.codigo + ">"
								+ v.codigo + " | " + v.conceptos + "</option>";

						$("#conceptos").append(SelectConcepto);

					}

				});

				// bloqueSelect();
			}).done(function() {
		$("#loading").hide();
	})

}

function eliminarFila(id) {

	$("#" + id + " td").each(function() {
		eliminar.push($(this).text());
		$("#" + id + " tr").remove();
		$("#" + id + "").remove();
	});

	var nFilas = $("#tblPeticion tr").length;
	if (nFilas == 0) {
		estadoAddAll = 0;
	}

	for (var i = 0; i < listado.length; i++) {

		if (eliminar[0] === listado[i].option
				&& eliminar[1] === listado[i].codigo) {

			$("select option[value='" + listado[i].option + "']").attr(
					'disabled', false);
			$("select option[value='" + listado[i].option + "']").css(
					'backgroundColor', '');
			listado.splice(i, 1);
			eliminar = [];
		}
	}
	Array_id_moneda = [];
	$("td.tdmoneda").each(function() {
		Array_id_moneda.push($(this).text());

	});

	Array_monto_trab = [];
	var numerotd = 0;
	$("td.monto_trab").each(function() {
		var total = "";
		total = Array_id_moneda[numerotd];
		if (total == "4") {
			var montoN = "";
			montoN = $(this).text();
			montoN2 = montoN.toString().replace(/\./g, '');
			Array_monto_trab.push(montoN2);

		} else if (total == "2") {
			var montoN = "";
			montoN = $(this).text();

			Array_monto_trab.push(montoN);

		}
		numerotd = numerotd + 1;

	});

	var total = 0;
	for (var i = 0; i < Array_monto_trab.length; i++) {

		if ($("#tipoMoneda").val() == "4") {
			total = parseInt(Array_monto_trab[i]) + total;
		} else {
			total = parseFloat(Array_monto_trab[i]) + total;
		}
	}

	if ($("#tipoMoneda").val() == "4") {
		var total = String(total).replace(/(.)(?=(\d{3})+$)/g, '$1.')
	} else {
		var total = total.toFixed(2);
	}

	$('#totalMonto').html("");
	$("#totalMonto").append(total);

}// end Function

function bloqueSelect() {
	var codigo_trab = $("#CodigoTra").val();

	for (var i = 0; i < listado.length; i++) {

		if (codigo_trab == listado[i].codigo) {

			$("select option[value='" + listado[i].option + "']").attr(
					'disabled', true);
			$("select option[value='" + listado[i].option + "']").css(
					'backgroundColor', '#ccc');

		} else {

		}
	}
}

function Enviar() {

	peticion2 = [];
	var nFilas = $("#tblPeticion tr").length;

	if (nFilas == 0) {
		alerta("Debe Agregar la Lista Antes de Enviar");
		return;
	} else {
		Array_concepto_codigo_trab = [];
		Array_codigo_trab = [];
		Array_nombre_trab = [];
		Array_apellido_trab = [];
		Array_monto_trab = [];
		// Array_fechaF = [];
		Array_letra_trab = [];
		Array_frecuenciaid_trab = [];
		Array_cuotas_trab = [];
		Array_fecha_termino_trabajador = [];
		Array_id_contrato = [];
		Array_valor_check = [];
		Array_id_moneda = [];

		var uno = "1";
		var dos = "2";

		var each = 0;
		$("td.tdcheck").each(function() {
			if ($('#checkbox' + each).is(':checked')) {
				Array_valor_check.push(uno);
			} else {
				Array_valor_check.push(dos);
			}
			each = each + 1;
		});

		$("td.tdmoneda").each(function() {
			Array_id_moneda.push($(this).text());

		});

		var numerotd = 0;
		$("td.monto_trab").each(function() {
			var total = "";
			total = Array_id_moneda[numerotd];
			if (total == "4") {
				var montoN = "";
				montoN = $(this).text();
				montoN2 = montoN.toString().replace(/\./g, '');
				Array_monto_trab.push(montoN2);

			} else if (total == "2") {
				var montoN = "";
				montoN = $(this).text();

				Array_monto_trab.push(montoN);

			}
			numerotd = numerotd + 1;

		});

		$("td.idcont").each(function() {
			Array_id_contrato.push($(this).text());
		});

		$("td.concepto_codigo_trab").each(function() {
			Array_concepto_codigo_trab.push($(this).text());
		});

		$("td.codigo_trab").each(function() {
			Array_codigo_trab.push($(this).text());
		});

		$("td.letra_trab").each(function() {

			// var valueConcep = $(this).text();
			// if(valueConcep == "hn"){
			// var replaceconcep = valueConcep.replace(/n/gi, "");
			// valuefinalConcep = $.trim(replaceconcep);
			// Array_letra_trab.push(valuefinalConcep);
			// }else{
			// Array_letra_trab.push($(this).text());
			// }

			var valueConcep = $(this).text();

			Array_letra_trab.push($(this).text());

		});

		$("td.frecuenciaid_trab").each(function() {
			Array_frecuenciaid_trab.push($(this).text());
		});
		$("td.cuotas_trab").each(function() {

			var cu = "";
			cu = $(this).text();
			if (cu == 'N/A') {
				Array_cuotas_trab.push(0);
			} else {

				Array_cuotas_trab.push($(this).text());
			}
		});

		$("td.fecha_termino_trababajador").each(
				function() {
					var ft = "";
					var ft2 = "";
					ft = $(this).text();
					if (ft == 'N/A') {
						Array_fecha_termino_trabajador.push(0);
					} else {
						var periodo_trabter = ft.split('-');
						var periodo_trab2ter = periodo_trabter[1] + "-"
								+ periodo_trabter[0];
						ft2 = periodo_trab2ter.replace(/-/gi, "");
						Array_fecha_termino_trabajador.push(parseInt(ft2));

					}

				});

		for (var i = 0; i < nFilas; i++) {

			var json2 = {
				idmoneda : Array_id_moneda[i],
				codigo_hd : Array_concepto_codigo_trab[i],
				codigo_trabajador : Array_codigo_trab[i],
				monto : Array_monto_trab[i],
				periodo : Array_fecha_termino_trabajador[i],
				tipo : Array_letra_trab[i],
				frecuencia : Array_frecuenciaid_trab[i],
				dias : Array_cuotas_trab[i],
				fecha_inicio : "",
				fecha_termino : "",
				id_contrato : Array_id_contrato[i],
				valorcheck : 0

			}
			peticion2.push(json2);
			console.log(peticion2);

		}

		$.ajax(
				{
					url : "/simpleWeb/json/work/insertHDFiniquito/",
					type : "PUT",
					data : JSON.stringify(peticion2),
					beforeSend : function(xhr) {
						xhr.setRequestHeader("Accept", "application/json");
						xhr
								.setRequestHeader("Content-Type",
										"application/json");
						$("#loading").show();

					},
					success : function(data, textStatus, jqXHR) {

						$("#tblPeticion").empty();
						$("#CodigoTra").empty();
						$("#monto").val("");
						$("#monto2").val("");
						$("#fechaCuotasTermino").val("");

						$("#totalMonto").html("0");
						$("#frecuencia").val("");
						$("#idContrato").val("");
						$("#Sociedad").val("");
						$('#panelform').css({
							"display" : "block",
							"opacity" : "0.5"
						});

						for (var i = 0; i < listado.length; i++) {

							$(
									"select option[value='" + listado[i].option
											+ "']").attr('disabled', false);
							$(
									"select option[value='" + listado[i].option
											+ "']").css('backgroundColor', '');
							listado.splice(i, i);
							eliminar.splice(i, i);

						}
						listado = [];
						eliminar = [];

						alerta("Enviado")

						$("#loading").hide();

					},
					error : function(ex) {
						console.log(ex);
					}
				}).fail(function(jqXHR, textStatus, errorThrown) {

			alerta(errorThrown);
			$("#loading").hide();
		})
	}// end else
} // end Function

function trabajadores() {
	$("#loading").show();
	var SelectConcepto = "";
	SelectConcepto += " <option value='0'>Buscar</option>";
	$("#CodigoTra").append(SelectConcepto);

	var codigoS = $("#Sociedad").val();
	var tipo_division = $("#tipodivisionB").val();

	if (tipo_division === "-1") {
		tipo_division = null;
	} else if (tipo_division == '') {
		tipo_division = null;
	} else {
		tipo_division = $("#tipodivisionB").val();
	}

	var tipo_subdivision = $("#tiposubdivisionB").val();
	if (tipo_subdivision === "-1") {
		tipo_subdivision = null;
	} else if (tipo_subdivision == '') {
		tipo_subdivision = null;
	} else {
		tipo_subdivision = null;
	}

	var grupo = $("#listagrupoB").val();
	if (grupo === "-1") {
		grupo = null;
	} else if (grupo == '') {
		grupo = null;
	} else {
		grupo = $("#listagrupoB").val();
	}

	$.getJSON(
			"/simpleWeb/json/work/allTrabajadoresCodNom/" + codigoS + ","
					+ tipo_division + "," + tipo_subdivision + "," + grupo
					+ "," + rolPrivado,
			function(data) {

				$.each(data, function(k, v) {
					$("#loading").show();
					var SelectConcepto = "";

					SelectConcepto += "<option value=" + v.codigo + ">"
							+ v.codigo + " | " + v.ap_paterno.toUpperCase()
							+ " " + v.ap_materno.toUpperCase() + " "
							+ v.nombre.toUpperCase() + "</option>";
					$("#CodigoTra").append(SelectConcepto);

				});

			}).done(function() {
		$("#loading").hide();

	}).fail(function(jqXHR, textStatus, errorThrown) {

		alerta(errorThrown);
		$("#loading").hide();
	})

}
function TipoMoneda() {

	$.getJSON(
			"/simpleWeb/json/work/TipoMonedaHD/",
			function(data) {
				datos = data;
				$.each(data, function(k, v) {

					if (v.id == 2) {

					} else {

						var SelectFrecuencia = "";
						SelectFrecuencia += "<option value=" + v.id + ">"
								+ v.descripcion + "</option>";

						$("#tipoMoneda").append(SelectFrecuencia);
					}

				})
				$("#tipoMoneda").val(4);
			}).fail(function(jqXHR, textStatus, errorThrown) {

		alerta(errorThrown);
		$("#loading").hide();
	})
}
$('#fechaCuotas').change(function(e) {
	$("#monto2").prop("disabled", false);
});

$('#tipoMoneda').change(function(e) {
	var tipo_moneda = $("#tipoMoneda").val();
	if (tipo_moneda == 4) {
		$("#monto").show();
		$("#montonew").hide();
		$("#tiposimbolo").empty();
		$("#tiposimbolo").append("Total Monto: $");

	} else if (tipo_moneda == 2) {
		$("#monto").hide();
		$("#montonew").show();
		$("#tiposimbolo").empty();
		$("#tiposimbolo").append("Total Monto: U.F");
	}

});

$('#fechaCuotas').change(function(e) {

	$("#fechaCuotasTermino").val("");

});
$('#fechaCuotasTermino').change(function(e) {

	var fechaI = $("#fechaCuotas").val();
	var fechaT = $("#fechaCuotasTermino").val();

	var fecha1 = fechaI.split('-');
	var fechainicio = fecha1[1] + "-" + fecha1[0];

	var fecha2 = fechaT.split('-');
	var fechafin = fecha2[1] + "-" + fecha2[0];

	if (fechaI == '') {
		alerta("Debe Seleccionar una Fecha Inicio");
		return;
	} else {
		var startdate = new Date(fechainicio);
		var enddate = new Date(fechafin);
		enddate.setDate(enddate.getDate() - startdate.getDate());
		var agregarValor = (monthDiff(startdate, enddate));
		$("#monto2").val(agregarValor + 1);
	}
});

$('#Sociedad')
		.change(
				function(e) {
					estadoAddAll = 0;
					var soc = $('#Sociedad').val();
					if (soc == "") {
						alerta("Debe Seleccionar una Empresa");
						return;
					}
					$("#CodigoTra").empty();
					$("#monto").val("");
					$("#monto2").val("");
					$("#fechaCuotasTermino").val("");
					$("#tblPeticion").empty();
					$("#tipodivisionB").empty();

					trabajadores();
					$("#panelform").removeAttr('style');

					var soci_sap = "";
					$("#loading").show();
					$
							.getJSON(
									"/simpleWeb/json/work/getSociedadById/"
											+ $('#Sociedad').val() + "",
									function(data) {

										soci_sap = JSON
												.stringify(data.sociedad);

									})
							.done(
									function() {

										$("#tipodivisionB")
												.append(
														"<option value='-1'>Seleccione Huerto</option>");
										var soci_sapFinal = soci_sap.replace(
												/\"/g, '');

										$
												.getJSON(
														"/simpleWeb/json/work/getCampoBySociedad/"
																+ $('#Sociedad')
																		.val()
																+ "",
														function(data) {

															// Obtener huertos
															// en base a los
															// privilegios del
															// usuario
															let
															queryString = huertoPrivilege == null ? ""
																	: JSON
																			.stringify(
																					huertoPrivilege)
																			.slice(
																					1,
																					-1);

															$
																	.each(
																			data,
																			function(
																					k,
																					v) {
																				var SelectHuerto = "";

																				if (huertoPrivilege
																						.includes(v.campo) == true) {
																					SelectHuerto += "<option value="
																							+ v.campo
																							+ ">"
																							+ v.descripcion
																							+ "</option>";
																				}
																				$(
																						"#tipodivisionB")
																						.append(
																								SelectHuerto);
																			})

														}).done(function() {
													$("#loading").hide();

												})
									})

				});

$('#tipodivisionB')
		.change(
				function(e) {

					var huertoValor = $("#tipodivisionB").val();

					if (huertoValor == "" || huertoValor == -1) {
						alerta("Debe Seleccionar un Huerto");
						$("#tipodivisionB").focus();
						return;
					}

					var zona_sap = "";
					$("#loading").show();
					$("#tiposubdivisionB").empty();
					$("#listagrupoB").empty();
					$("#listagrupoB").append(
							"<option value='-1'>Seleccione CECO</option>");

					$
							.getJSON(
									"/simpleWeb/json/work/getCampoByCampo/"
											+ $('#tipodivisionB').val() + "",
									function(data) {
										var SelecZona = "";
										SelecZona += "<option value=''>Seleccione Zona</option>";
										$.each(data, function(k, v) {

											SelecZona += "<option value="
													+ v.grupo + ">" + v.zona
													+ "</option>";

											$("#tiposubdivisionB").append(
													SelecZona);

										})

									}).done(function() {

								$("#loading").hide();

							});
				});

$('#tiposubdivisionB')
		.change(
				function(e) {

					$("#listagrupoB").empty();
					var valor_zona = $("#tiposubdivisionB").val();

					if (valor_zona == "" || valor_zona == "") {
						alerta("Debe Seleccionar una Zona");
						$("#tiposubdivisionB").focus();
						return;
					}

					var soci_sap = "";
					$("#loading").show();
					$
							.getJSON(
									"/simpleWeb/json/work/getSociedadById/"
											+ $('#Sociedad').val() + "",
									function(data) {

										soci_sap = JSON
												.stringify(data.sociedad);

									})
							.done(
									function() {

										var CECOAgrupacion;

										$.each(SESION.campo, function(key,
												value) {

											if (value.campo == $(
													'#tipodivisionB').val()) {

												CECOAgrupacion = value.cecos;
											}
										});

										var soci_sapFinal = soci_sap.replace(
												/\"/g, '');
										$
												.getJSON(
														"http://200.55.206.140/SCLEM/JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="
																+ $('#Sociedad')
																		.val()
																+ "&GRUPO="
																+ valor_zona
																+ "&CECO="
																+ CECOAgrupacion,
														function(data) {
															var SelectCECO = "";
															SelectCECO += "<option value=''>Seleccione CECO</option>";

															$
																	.each(
																			data.COSTCENTERLIST,
																			function(
																					k,
																					v) {

																				if (v.DESCRIPT
																						.indexOf("Cuartel") > -1 == true) {

																				} else {
																					SelectCECO += "<option value="
																							+ v.COSTCENTER
																							+ ">"
																							+ v.DESCRIPT
																							+ "</option>";
																				}

																			})
															$("#listagrupoB")
																	.append(
																			SelectCECO);

															$("#loading")
																	.hide();
														}).done(function() {
													$("#loading").hide();

												})

									})
				});

$('#tipodivisionB,#tiposubdivisionB,#listagrupoB').change(function(e) {

	var soc = $('#Sociedad').val();
	if (soc == "") {
		alerta("Debe Seleccionar una Empresa");
		return;
	}
	$("#CodigoTra").empty();
	trabajadores();

});

$('#frecuencia').change(function(e) {
	var valorFrecuencia = $("#frecuencia").val();

	if (valorFrecuencia == 181) {
		$("#monto2").show();
		$("#fechaCuotas").show();
		$("#labelfecha").show();
		$("#labelnumero").show();
		$("#fechaCuotasTermino").show();
		$("#labelfechaCuotasTermino").show();
	} else if (valorFrecuencia == 180) {

		$("#fechaCuotas").show();
		$("#labelfecha").show();
		$("#labelnumero").hide();
		$("#fechaCuotasTermino").hide();
		$("#labelfechaCuotasTermino").hide();
	} else if (valorFrecuencia == 182) {

		$("#fechaCuotas").show();
		$("#labelfecha").show();

		$("#labelnumero").hide();
		$("#fechaCuotasTermino").hide();
		$("#labelfechaCuotasTermino").hide();

	}

});

// $("#periodo").change(
// function() {
// $("#fecha").prop("disabled", false);
// var res = " ";
// var res2 = " ";
// var periodo = " ";
// $("#fecha").val("");
// periodo = $("#periodo").val();
// $("#fecha").val(periodo);
//
// var str2 = "-02";
//
// res = periodo.concat(str2);
// var date = new Date(res);
// var primerDia = new Date(date.getFullYear(), date
// .getMonth(), 1);
// var ultimoDia = new Date(date.getFullYear(), date
// .getMonth() + 1, 0);
//
// var sumadia = (ultimoDia.getDate()) + 1;
//
// var fechaUltimo = "";
// if (ultimoDia.getDate() == 31 || ultimoDia.getDate() == 30
// || ultimoDia.getDate() == 28
// || ultimoDia.getDate() == 29) {
// var numero = periodo.replace(/-/gi, "");
//
// var total = parseInt(numero);
// var total2 = total + 1;
//
// var str = total2;
// var res1 = str.toString().substr(0, 4);
// var res2 = str.toString().substr(-2);
// var res3 = res1 + "-" + res2
// var str4 = "-01";
//
// var resultadoFecha = res3.concat(str4);
//
// fechaUltimo = resultadoFecha;
// } else {
// }
// $("#fecha").datepicker('destroy').datepicker({
// dateFormat : 'yy/mm/dd',
// minDate : new Date(res),
// maxDate : new Date(fechaUltimo)
//
// });
//
// });

$("#haberes_descuentos").change(function() {

	$("#CodigoTra").prop("disabled", false);
	if ($('#haberes_descuentos').val() === '') {

		alerta('Seleccione Otra Opción');
		return;
	} else {
		$("#conceptos").prop("disabled", false);

		$('#conceptos').empty();
		$('#CodigoTra').empty();

		trabajadores();
		LoadHD();
		// bloqueSelect();

	}

});
function editar_fecha(fecha, intervalo, dma, separador) {

	var separador = separador || "-";
	var arrayFecha = fecha.split(separador);
	var dia = arrayFecha[0];
	var mes = arrayFecha[1];
	var anio = arrayFecha[2];

	var fechaInicial = new Date(anio, mes - 1, dia);
	var fechaFinal = fechaInicial;
	if (dma == "m" || dma == "M") {
		fechaFinal.setMonth(fechaInicial.getMonth() + parseInt(intervalo));
	} else if (dma == "y" || dma == "Y") {
		fechaFinal
				.setFullYear(fechaInicial.getFullYear() + parseInt(intervalo));
	} else if (dma == "d" || dma == "D") {
		fechaFinal.setDate(fechaInicial.getDate() + parseInt(intervalo));
	} else {
		return fecha;
	}
	dia = fechaFinal.getDate();
	mes = fechaFinal.getMonth() + 1;
	anio = fechaFinal.getFullYear();

	dia = (dia.toString().length == 1) ? "0" + dia.toString() : dia;
	mes = (mes.toString().length == 1) ? "0" + mes.toString() : mes;

	return mes + "-" + anio;
}

function ListaSociedad() {
	$("#loading").show();
	// Obtener Sociedades en base a los privilegios del usuario
	let
	queryString = sociedadPrivilege == null ? "" : JSON.stringify(
			sociedadPrivilege).slice(1, -1);

	$.getJSON(
			"/simpleWeb/json/work/getSociedad/?idSociedad=" + queryString,
			function(data) {

				$.each(data, function(k, v) {
					var SelectSociedad = "";
					if (v.idSociedad == -1) {

					} else {
						SelectSociedad += "<option value=" + v.idSociedad + ">"
								+ v.sociedad + "</option>";

						$("#Sociedad").append(SelectSociedad);
					}
				})
			}).fail(function(jqXHR, textStatus, errorThrown) {

		alerta(errorThrown);
		$("#loading").hide();
	}).done(function() {
		$("#loading").hide();
	});

}
function monthDiff(d1, d2) {
	var months;
	months = (d2.getFullYear() - d1.getFullYear()) * 12;
	months -= d1.getMonth();
	months += d2.getMonth() + 1;
	return months <= 0 ? 0 : months;
}
function monto2Change() {
	$('#monto2').change(
			function(e) {
				var valor = $(this).val();
				$(this).val(valor.replace(/[-]/g, ''))

				//		
				// var res = " ";
				// var res2 = " ";
				// var periodo = " ";
				//		
				// $("#monto2").val("");
				monto = $("#monto2").val();
				fechaIC = $("#fechaCuotas").val();

				var fec_ini = "01-" + fechaIC;

				var cantidadtotal = '+';
				var resultadocantidad = cantidadtotal.concat(monto);

				// editar_fecha("01-01-2017", "+5", "d"); // 06-01-2017
				// editar_fecha("01-01-2017", "-5", "d"); // 27-12-2016
				// editar_fecha("01/01/2017", "+2", "m", "/"); // 01-03-2017
				// editar_fecha("01/01/2017", "+2", "y", "/"); // 01-01-2019
				var nuevo = editar_fecha(fec_ini, resultadocantidad, "m");

				var concatenar = "01-" + nuevo;
				var nuevo_resta = editar_fecha2(concatenar, "-1", "m");

				// var nuevodato = nuevoModificado[1]+"-"+nuevoModificado[0];

				$("#fechaCuotasTermino").val(nuevo_resta);
				var currentTime = new Date();
				var startDateFrom = new Date(currentTime.getFullYear(),
						currentTime.getMonth() - 1, 1);

				$("#fechaCuotasTermino").datepicker('destroy').datepicker({
					dateFormat : 'mm-yy',
					minDate : startDateFrom,
					firstDay : 1,
					setdate : new Date(nuevo_resta)
				// maxDate :new Date(nuevoModificado2)

				});
			});
}

function formatNumber(n) {
	n = String(n).replace(/\D/g, "");
	return n === '' ? n : Number(n).toLocaleString();
}
function format() {
	var number = $('.number');
	for (var i = 0; i < number.length; i++) {
		number[i].addEventListener('keyup', function(e) {
			var element = e.target;
			var value = element.value;
			element.value = formatNumber(value);
		})
	}
}

function editar_fecha2(fecha, intervalo, dma, separador) {

	var separador = separador || "-";
	var arrayFecha = fecha.split(separador);
	var dia = arrayFecha[0];
	var mes = arrayFecha[1];
	var anio = arrayFecha[2];

	var fechaInicial = new Date(anio, mes - 1, dia);
	var fechaFinal = fechaInicial;
	if (dma == "m" || dma == "M") {
		fechaFinal.setMonth(fechaInicial.getMonth() + parseInt(intervalo));
	} else if (dma == "y" || dma == "Y") {
		fechaFinal
				.setFullYear(fechaInicial.getFullYear() + parseInt(intervalo));
	} else if (dma == "d" || dma == "D") {
		fechaFinal.setDate(fechaInicial.getDate() + parseInt(intervalo));
	} else {
		return fecha;
	}
	dia = fechaFinal.getDate();
	mes = fechaFinal.getMonth() + 1;
	anio = fechaFinal.getFullYear();

	dia = (dia.toString().length == 1) ? "0" + dia.toString() : dia;
	mes = (mes.toString().length == 1) ? "0" + mes.toString() : mes;

	return mes + "-" + anio;
}

function setTwoNumberDecimal(event) {
	this.value = parseFloat(this.value).toFixed(2);
}

function addAll() {

	var periodoV = $("#fechaCuotas").val();

	if (periodoV == '') {
		alerta("Debe Seleccionar un periodo");
		return;

	}

	if (estadoAddAll == 1) {

		alerta("No Puede Añadir Nuevamente Todos los Trabajadores a la Lista");
		$('.swal2-container').css('z-index', '15000');
		return;
	}

	var options = $('#CodigoTra option');

	var values = $.map(options, function(option) {
		return option.value;
	});

	var codidos_trabajador;
	var codTrab = [];

	for (var i = 0; i < values.length; i++) {

		if (values[i] == "0") {

		} else if (values[i] == null) {
		} else {
			codidos_trabajador += "," + values[i];
			codTrab.push(values[i]);
		}

	}

	var soci = $("#Sociedad").val();
	if (soci === "-1") {
		alerta("Debe Seleccionar una Empresa");
		return;
	} else if (soci == '') {
		alerta("Debe Seleccionar una Empresa");
		return;
	} else {
		soci = $("#Sociedad").val();
	}

	var stringcodigos = "";
	for (var i = 0; i < codTrab.length; i++) {

		if (i == 0) {
			stringcodigos += codTrab[i];
		} else {
			stringcodigos += "," + codTrab[i];
		}

	}

	var texFrecuencia = $("#frecuencia option:selected").text();
	var idFrecuencia = 180;
	var cuotas_trab = $("#monto2").val();
	var fechaInicioCuotas = $("#fechaCuotas").val();

	var idmoneda = $("#tipoMoneda").val();

	var fechaI = $("#fechaCuotas").val();
	var fechaT = $("#fechaCuotasTermino").val();
	var valorfrecuencia = $("#frecuencia").val();

	if (fechaT == '' && valorfrecuencia == 181) {
		alerta("Debe Seleccionar una Fecha Termino");
		return;
	} else if (fechaI == '' && valorfrecuencia == 181) {
		alerta("Debe Seleccionar una Fecha Inicio");
		return;
	}

	var fechaI;
	if (fechaInicioCuotas == "") {
		fechaI = "N/A";
	} else {
		fechaI = fechaInicioCuotas;
	}

	var cuotaTR;
	if (cuotas_trab == "") {
		cuotaTR = "N/A";
	} else {
		cuotaTR = cuotas_trab;
	}

	var textFre;
	if (idFrecuencia == "") {
		textFre = "N/A";
	} else {
		textFre = texFrecuencia;
	}

	var codigo_trab = $("#CodigoTra").val();

	// var nombre_trab = $("#select2-CodigoTra-container").text();
	// var apellido_trab = $("#select2-CodigoTra-container").text();
	var monto_trab = $("#monto").val();
	var concepto_codigo_trab = $("#conceptos").val();
	var letra_trab = $("#haberes_descuentos").val();
	// var fechaF1 = $("#fecha").val();
	var simbolo = '/';

	var cargo = $("#haberes_descuentos").val();
	if ($('#haberes_descuentos').val() === '') {
		alerta("Debe Seleccionar un Haberes/Descuento");
		$("#haberes_descuentos").focus();
		return;
	} else if ($('#conceptos').val() === '') {
		alerta("Debe Seleccionar un Concepto");
		$("#conceptos").focus();
		return;
	}
	// else if ($('#conceptos').val() === null) {
	// alerta("Concepto ya se Encuentra en lista Para Este Trabajador");
	// $("#conceptos").focus();
	// return;
	// }
	else if ($('#monto').val() === '' && idmoneda == 4) {
		alerta("Debe Ingresar un Monto");
		$("#monto").focus();
		return;
	} else if ($('#monto').val() == 0 && idmoneda == 4) {
		alerta("Debe Ingresar un Monto mayor a 0");
		$("#monto").focus();
		return;

	} else if ($('#montonew').val() === '' && idmoneda == 2) {
		alerta("Debe Ingresar un Monto");
		$("#montonew").focus();
		return;
	} else if ($('#montonew').val() == 0 && idmoneda == 2) {
		alerta("Debe Ingresar un Monto mayor a 0");
		$("#montonew").focus();
		return;

	}

	else if ($('#idContrato').val() == '') {
		alerta("Debe Seleccionar Fecha Contrato");
		$("#idContrato").focus();
		return;
	} else if ($('#frecuencia').val() == '') {
		alerta("Debe Seleccionar una Frecuencia");
		$("#frecuencia").focus();
		return;
	} else if (idmoneda == '') {
		alerta("Debe Ingresar un Tipo de Moneda");
		$("#tipoMoneda").focus();
		return;
	} else {

		for (var i = 0; i < codTrab.length; i++) {
			var codigo_trab = codTrab[i];
			var nombre_trab;
			var apellido_trab;
			var idContrato;

			$
					.ajax(
							{
								type : "GET",
								url : '/simpleWeb/json/work/NombreTrabajadorMasIdContrato/'
										+ codigo_trab,
								async : false,
								dataType : "JSON",
								success : function(data) {
									// console.log(JSON.stringify(data));
									$.each(data, function(k, v) {

										nombre_trab = "" + v.nombre + "";
										idContrato = "" + v.idcontrato + "";

										apellido_trab = v.apellidopaterno + " "
												+ v.apellidomaterno;

									})

								}
							}).fail(function(jqXHR, textStatus, errorThrown) {

						alerta(errorThrown);
						$("#loading").hide();
					})
			if (idmoneda == 4) {
				var monto_trab = $("#monto").val();
			} else {
				var monto_trab = $("#montonew").val();
			}
			var concepto_codigo_trab = $("#conceptos").val();
			var concepto_text = $("#conceptos option:selected").text();
			var concepto_text2 = concepto_text.split('|');

			var HD_text = $("#haberes_descuentos option:selected").text();

			var letra_trab = $("#haberes_descuentos").val();

			var tex_tipo_moneda = $("#tipoMoneda option:selected").text();
			var val_tipo_moneda = $("#tipoMoneda").val();

			var datos = {
				codigo : codigo_trab,
				option : concepto_codigo_trab

			}
			listado.push(datos)

			$("#tblPeticion")
					.append(
							"" + "<tr id=td"
									+ numero
									+ ">"
									+ "<td class='concepto_codigo_trab' style='display: none;'>"
									+ concepto_codigo_trab
									+ "</td>"
									+ "<td>"
									+ HD_text
									+ " | "
									+ concepto_text2[1]
									+ "</td>"
									+ "<td class='codigo_trab'>"
									+ codigo_trab
									+ "</td>"
									+ "<td class='nombre_trab'>"
									+ apellido_trab
									+ "</td>"
									+ "<td class='apellido_trab'>"
									+ nombre_trab
									+ "</td>"
									+ "<td class='td_tipo_moneda'>"
									+ tex_tipo_moneda
									+ "</td>"
									+ "<td class='tdmoneda' style='display: none;'>"
									+ val_tipo_moneda
									+ "</td>"
									+ "<td class='monto_trab'>"
									+ monto_trab
									+ "</td>"
									+ "<td class='frecuenciaid_trab' style='display: none;'>"
									+ idFrecuencia
									+ "</td>"
									+ "<td class='cuotas_trab'>"
									+ cuotaTR
									+ "</td>"
									+ "<td class='fecha_termino_trababajador'>"
									+ fechaI
									+ "</td>"
									+ "<td  id=td"
									+ numero
									+ " onclick='javascript: eliminarFila(this.id);' >"
									+ "<button title='Eliminar'< class='btn btn-circle red btn-outline btn-sm'>"
									+ "<i class='fa fa-close fa-lg'></i></button>"
									+ "</td>"
									+ "<td class='letra_trab' style='display: none;'>"
									+ letra_trab
									+ "</td>"
									+ "<td class='idcont' style='display: none;'>"
									+ idContrato + "</td>" + "</tr>");

			numero = numero + 1;

		}// end for

	}

	Array_id_moneda = [];
	$("td.tdmoneda").each(function() {
		Array_id_moneda.push($(this).text());

	});

	Array_monto_trab = [];
	var numerotd = 0;
	$("td.monto_trab").each(function() {
		var total = "";
		total = Array_id_moneda[numerotd];
		if (total == "4") {
			var montoN = "";
			montoN = $(this).text();
			montoN2 = montoN.toString().replace(/\./g, '');
			Array_monto_trab.push(montoN2);

		} else if (total == "2") {
			var montoN = "";
			montoN = $(this).text();

			Array_monto_trab.push(montoN);

		}
		numerotd = numerotd + 1;

	});

	var total = 0;
	for (var i = 0; i < Array_monto_trab.length; i++) {

		if ($("#tipoMoneda").val() == "4") {
			total = parseInt(Array_monto_trab[i]) + total;
		} else {
			total = parseFloat(Array_monto_trab[i]) + total;
		}
	}

	if ($("#tipoMoneda").val() == "4") {
		var total = String(total).replace(/(.)(?=(\d{3})+$)/g, '$1.')
	} else {
		var total = total.toFixed(2);
	}

	$('#totalMonto').html("");
	$("#totalMonto").append(total);

	estadoAddAll = 1;

}