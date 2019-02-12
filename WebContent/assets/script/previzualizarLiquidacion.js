function checkRut(rut) {
	//prueba

}
var codtrabajadorBuscar;

//Variable Global para Guardar los datos de liquidacion 
var datosLiquidacion = new Array();

function buscar() {

	codtrabajadorBuscar = "";

	var codtrabajadorBuscar = $('#rut').val();

	$("#idContrato").empty();
	$("#loading").show();
	$.getJSON("/simpleWeb/json/work/LoadSelectIdContrato/"+ codtrabajadorBuscar, function(data) {
		console.log(data);
		cantidadData = data.length;

			if (cantidadData > 1) {
					$("#idContrato").prop("disabled", false);
					var SelectIdContrato = "";
					SelectIdContrato += "<option value=''>Seleccione..</option>";

					$("#idContrato").append(SelectIdContrato);
						$.each(data, function(k, v) {

							var SelectIdContrato = "";
							SelectIdContrato += "<option value=" + v.id+ ">" + v.fecha_inicio_actividad+ "</option>";
							$("#idContrato").append(SelectIdContrato);

						});
			} else if (cantidadData == 1) {
					
						var SelectIdContrato = "";
						SelectIdContrato += "<option value=''>Seleccione..</option>";
						$("#idContrato").append(SelectIdContrato);
						$.each(data, function(k, v) {
							var SelectIdContrato = "";
								SelectIdContrato += "<option value=" + v.id+ ">" + v.fecha_inicio_actividad+ "</option>";
								$("#idContrato").append(SelectIdContrato);
							});
						} else if (cantidadData == 0) {
							$("#idContrato").prop("disabled", true);
						}

					}).done(function() {
				$("#loading").hide();
			})
}

//Generar la liquidacion e Imprimir en Pantalla
$('#addAct').click(
		function(e) {
			var idcontrato = $("#idContrato").val();
			var periodo1 = $("#periodo").val();

			if (idcontrato == '') {

			} else if (periodo1 == '') {
				alerta("Debe Seleccionar un Periodo");
			}

			else {

				var periodoF = periodo1.replace(/-/gi, "");
				codtrabajadorBuscar = $('#rut').val();
				$("#tblPeticion2").html("");

				$.getJSON("/simpleWeb/json/work/createLiquidacion/"+ codtrabajadorBuscar + "," + idcontrato + ","+ periodoF, function(data) {
					$.each(data, function(k, v) {

						//Obtener los datos de liquidacion en Variable Global
						datosLiquidacion = data;

						var bodyPreselect = "";
						bodyPreselect += "<tr id='td" + k + "'>";
						bodyPreselect += "<td  style='text-align: center;'>"+ v.codTrabajador + "</td>";
						bodyPreselect += "<td style='text-align: center;'>"+ v.idContrato + "</td>";
						bodyPreselect += "<td style='text-align: center;'>"+ v.idConcepto + "</td>";
						bodyPreselect += "<td style='text-align: left;'>"+ v.descripcion + "</td>";
						bodyPreselect += "<td style='text-align: right;'>"+ v.valor + "</td>";
						bodyPreselect += "</tr>";
						$("#tblPeticion2").append(bodyPreselect);
						
					});
					
					$('#liquidacionPDF').show();
					
				});

			}
		});

//Generar Word y Pdf para mostrar la Liquidacion
function generarLiquidacion() {

	//Obtener el id de Trabajador por Codigo 
	let idTrabajador = $(this).getJSONSync("/simpleWeb/json/work/getIdTrabajadorByCodigo/"+$('#rut').val());
	
	let liquidacionList = new Array();
	
	datosLiquidacion.forEach(function(value) {
		
		let liquidacion = new Object();
		
		liquidacion.descripcion = JSON.stringify(value.descripcion);
		liquidacion.valor = JSON.stringify(value.valor);
		liquidacionList.push(liquidacion)
		
	});
	
	$(this).setJSONSync("/simpleWeb/json/work/generateLiquidacion/"+idTrabajador+","+$('#periodo').val(), liquidacionList);
	
	window.open("/simpleWeb/json/work/showLiquidacion/?ID="+$('#rut').val()+"&PERIODO="+$('#periodo').val());
	
}

//-------------- OWN JQUERY FUNCTIONS ------------------//

//Obtener objecto JSON por Servicio synchronous
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
			alert('Error:' + ex);
		}
	});

	return objectData;

};

//Insertar objecto JSON por Servicio synchronous
jQuery.fn.setJSONSync = function(urlServicioPath, ObjectData) {

	var enviado;
	debugger;

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
