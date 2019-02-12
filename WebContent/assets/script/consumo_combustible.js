$(document).ready(function() {
	loadOperadores();
	$('#loading').hide();
});
var SESION = getVars();
var x;
var motivo;
var campo;
var operador_taller;
var tipo_taller;
var tipo_tallerArr = [ {
	codigo : 1,
	descripcion : "Vehiculo"
}, {
	codigo : 2,
	descripcion : "Agricola"
} ];
function loadOperadores() {
	$.ajax({
		url : "/simpleWeb/json/AGRO/GET_OPERADOR/",
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			operador_taller = "<option value=''>Seleccione</option>";
			$.each(data, function(k, v) {
				operador_taller += "<option value='" + v.idTrabajador + "'>"
						+ v.nombre + "</option>";
			})
			$("#BoxTrabajador").html(operador_taller);
		}
	})
	campo;
	$.each(SESION.campo, function(ks, va) {
		campo += "<option value='" + va.campo + "'>" + va.descripcion
				+ "</option>";
	})
	$("#BoxCampo").append(campo);
	tipo_taller = "<option value=''>Seleccione</option>";
	$.each(tipo_tallerArr, function(k, v) {
		tipo_taller += "<option value='" + v.descripcion + "'>" + v.descripcion
				+ "</option>";
	})
	$("#tipo_taller").html(tipo_taller);
}
var ingreso;
function getMaestroIngreso() {
	var maestro;
	$.ajax({
		url : "/simpleWeb/json/AGRO/Get_MaestroIngreso/",
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			motivo = "<option value=''>Seleccione</option>";
			$.each(data, function(ks, va) {
				registro += "<option value='" + va.codigo + "'>"
						+ va.descripcion + "</option>";
			})
			$("#BoxMotivoIngreso").append(motivo);
		}
	})
	return maestro;
}
function ingresar_consumo() {
	if (!$('#BoxFecha').val()) {
		alerta("Ingrese Fecha");
	} else if (!$('#BoxCampo').val()) {
		alerta("Seleccione Campo");
	} else if (!$('#BoxTipo').val()) {
		alerta("Seleccione Tipo Vehículo");
	} else if (!$('#BoxVehiculo').val()) {
		alerta("Seleccione un Vehículo");
	} else if (!$('#BoxLitro').val()) {
		alerta("Ingrese Litros");
	} else if (!$('#BoxTrabajador').val()) {
		alerta("Seleccione Trabajadores");
	} else if (!$('#BoxHorometro').val()) {
		alerta("Ingrese Horómetro");
	} else {
		loading.show();
		var fecha = formatFecha($('#BoxFecha').val()).replace(/-/g, "");
		var materiales = {
			"MATERIALES" : [ {
				"COD" : "10000000",
				"CANTIDAD" : $("#BoxLitro").val(),
				"CENTROCOSTO" : "AS01CGA001"
			} ]
		}
		var log = IPSERVERSAP + "/SCLEM/JSON_BAPI_GOODSMVT_CREATE_AGRO.aspx?FECHA="+ fecha + "&MATERIALES="+JSON.stringify(materiales)+"&CENTRO=" + $('#BoxCampo').val()+ "&ALMACEN=9000&MOVIMIENTO=201&EQUIPO="+$("#BoxVehiculo").val();
		console.log(log)
		return;
		setTimeout(function(){
		$.ajax({
			url : IPSERVERSAP + "/SCLEM/JSON_BAPI_GOODSMVT_CREATE_AGRO.aspx?FECHA="+ fecha + "&MATERIALES="+JSON.stringify(materiales)+"&CENTRO=" + $('#BoxCampo').val()+ "&ALMACEN=9000&MOVIMIENTO=201&EQUIPO="+$("#BoxVehiculo").val(),
			type : "GET",
			dataType : 'json',
			async : false,
			success : function(data) {
				var datos = {
					campo : $('#BoxCampo').val(),
					tipo : $('#BoxTipo').val(),
					vehiculo : $('#BoxVehiculo').val(),
					fecha : formatFecha($('#BoxFecha').val()),
					litro : $('#BoxLitro').val(),
					operador : $('#BoxTrabajador').val(),
					horometro : $('#BoxHorometro').val(),
					implemento : "",
					material_document: data.MATERIALDOCUMENT
				}
				$.ajax({
					url : "/simpleWeb/json/AGRO/ADD_ConsumoCombustible/",
					type : "PUT",
					data : JSON.stringify(datos),
					beforeSend : function(xhr) {
						xhr.setRequestHeader("Accept", "application/json");
						xhr.setRequestHeader("Content-Type","application/json");
					},
					success : function() {
						ValorPredeterminado();
						loading.hide();
						alerta("Registro Guardato Correctamente.\n Documento Material: "+data.MATERIALDOCUMENT);
					}
				})
			}
		}) }, 500);
	}
}
function ValorPredeterminado() {
	console.log(tipo_taller)
	$("#tipo_taller").html(tipo_taller);
	$('#BoxFecha').val("");
	$('#BoxLitro').val("");
	$("#BoxMotivoIngreso").html(motivo);
	$('#BoxHorometro').val("");
	$('#BoxCampo').html(campo);
	$("#BoxTrabajador").html(operador_taller);
}
function cambioCampo(input) {
	$.ajax({
		url : IPSERVERSAP + "/SCLEM/JSON_BAPI_EQUI_GETLIST.aspx?CENTRO="+ input.value,
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			console.log(data);
			var vehiculo = "<option value=''>Seleccione</option>";
			$.each(data.EQUIPMENT_LIST, function(k, v) {
				vehiculo += "<option value='" + v.EQUIPMENT + "'>" + v.DESCRIPT
						+ "</option>";
			})
			$("#BoxVehiculo").html(vehiculo);
		}
	})
	$.ajax({
		url : IPSERVERSAP + "/SCLEM/JSON_BAPI_MATERIAL_STOCK_REQ_LIST.aspx?CENTRO="+ input.value + "&MATERIAL=10000000&ALMACEN=9000",
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			if (data.MRP_IND_LINES[0] != undefined) {
				$("#stock").val(data.MRP_IND_LINES[0].AVAIL_QTY1);
			}
		}
	})
}
function valStock(input) {
	if (input.value > $("#stock").val() * 1) {
		alerta("La cantidad de Litros no puede exceder al Stock del Campo seleccionado");
		$(input).val("");
		return;
	}
}