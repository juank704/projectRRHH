$(document).ready(function(){
	$.ajax({
		url: IPSERVERSAP+"JSON_BAPI_INTERNALORDER_GETLIST.aspx?TIPO=Z600",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			MACRO = data;
		}
	})
	$("#next").hide();
//	loadSupervisor();
	cargarAddTrabajador();
//	fechas();
	loadFaena();
	cargaCampos();
	$(".select2.select2-container.select2-container--bootstrap").attr("style", "");
})
var aux = [];
var rg = [];
var supervisores;
var FAENA;
var LABOR;
var cuadrillaSelect = {
	codigo: 0,
	estado: 0,
	fecha_creacion: 0,
	nombre_cuadrilla: "",
	supervisor: 0,
	rendimiento_general: [],
	trab: []
};
var trabajadoresCuadrilla = [];
var CUARTEL = getCuartel();
var laborBloqueo = [];
var datosActuales;
var CAMPO;
function recorrer(campo){
	var especie_rendimiento = "<option value=''>Seleccione Especie</option>";
	var cuartelModal = "<option value=''></option>";
	var especies = [];
	$.each(CUARTEL, function(k,v){
		if(v.campo == campo){
			cuartelModal += "<option value="+v.codigo+">"+v.nombre+"</option>";
			$.each(SESION.variedad, function(ka,va){
				if(va.codigo == v.variedad){
					$.each(SESION.especie, function(kb,vb){
						if(va.especie == vb.codigo && especies.indexOf(vb.codigo) == -1){
							especies.push(vb.codigo);
							especie_rendimiento += "<option value="+vb.codigo+">"+vb.especie+"</option>";
						}
					})
				}
			})
		}
	})
	$("#cuartelModal").html(cuartelModal);
	$('#especie_rendimiento').html(especie_rendimiento);
}
function withCuartel(input){
	if(!input.checked){
		$("#especie_rendimiento").prop("disabled", true);
		$("#especie_rendimiento").removeClass("required");
		$("#especie_rendimiento").val("").trigger("change");
		$("#variedad_rendimiento").prop("disabled", true);
		$("#variedad_rendimiento").removeClass("required");
		$("#variedad_rendimiento").val("");
		$("#cuartel_rendimiento").val("");
		$("#cuartel_rendimiento").removeClass("required");
		$("#cuartel_rendimiento").attr("disabled", true);
		$(".hide-show").toggle();
		var zona;
		if($("#campo_rendimiento").val()){
			var sociedad;
			var grupo;
			var gcc = "";
			$.each(SESION.campo, function(k,v){
				if($("#campo_rendimiento").val() == v.campo){
					campoId = v.codigo;
					sociedad = v.sociedad;
					grupo = v.grupo;
					gcc = v.grupo_co;
					return false;
				}
			})
			$.getJSON(IPSERVERSAP+"JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+sociedad+"&GRUPO="+grupo, function(data){
				CECO = "<option value=''></option>";
				var cecoInCuartel = [];
				$.each(CUARTEL,function(k,v){
					cecoInCuartel.push(v.ceco);
				})
				$.each(data.COSTCENTERLIST, function(k,v){
					if(cecoInCuartel.indexOf(v.COSTCENTER) == -1){
						CECO += "<option value="+v.COSTCENTER+">"+v.DESCRIPT+"</option>";
					}
				})
				$("#ceco").html(CECO);
			})
			var arrGcc = gcc.split(";");
			var macros = "<option value=''></option>";
			$.each(arrGcc, function (k,v){
				$.ajax({
					url: IPSERVERSAP+ "JSON_BAPI_INTERNALORDRGRP_GETDETAIL.aspx?GRUPO="+v,
					type:	"GET",
					dataType: 'json',
					async: false,
					success: function(data){
						$.each(data.HIERARCHYNODES, function(k,v){
							var e = v.GROUPNAME;
							if((e[e.length-1]*1 == 1 || e[e.length-1]*1 == 2) && e[e.length-2]*1 == 0){
								macros += "<option value='"+v.GROUPNAME+"'>"+v.DESCRIPT+"</option>";
							}
						})
					}
				})
			});
			macros += "<option value='1'>OTROS CENTRO DE COSTO</option>";
			$("#macro").html(macros);
		}
	}else{
		$("#especie_rendimiento").prop("disabled", false);
		$("#especie_rendimiento").addClass("required");
		$("#variedad_rendimiento").prop("disabled", false);
		$("#variedad_rendimiento").addClass("required");
		$("#cuartel_rendimiento").addClass("required");
		$("#cuartel_rendimiento").attr("disabled", false);
		$(".hide-show").toggle();
		$("#ceco").val("");
//		$(".tipo_ingreso").toggle();
	}
}
function selectMacro(input){
	var ordenco = "<option value=''></option>"; 
	var campo = $("#campo_rendimiento").val();
	var sector;
	var auxArr = [];
	console.log(input.value)
	if(input.value*1 == 1){
		var sociedad;
		var grupo;
		$.each(SESION.campo, function(k,v){
			if(v.campo == $("#campo_rendimiento").val()){
				sociedad = v.idSociedad;
				grupo = v.grupo_ceco_work;
				return false;
			}
		})
		$.ajax({
			url: IPSERVERSAP+"JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+sociedad+"&GRUPO="+grupo,
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				$("#ceco").html("");
				CECO = "<option value=''></option>";
				$.each(data.COSTCENTERLIST, function(k,v){
					CECO += "<option value='"+v.COSTCENTER+"'>"+v.DESCRIPT+"</option>";
				})
				console.log(CECO)
				$("#ceco").html(CECO);
			}
		})
//		$("#ceco").append(CECO);
	}else{
		$.each(MACRO.ORDER_LIST, function(k,v){
			if(v.ORDER.indexOf(input.value) != -1 && auxArr.indexOf(v.OBJECT_NO) == -1 && !rtrnValCeco(v.OBJECT_NO)){
				console.log(v.ORDER)
				auxArr.push(v.OBJECT_NO);
				ordenco += "<option value="+v.ORDER+">"+v.ORDER_NAME+"</option>";
			}
		})
		$("#ceco").html(ordenco);
	}
	
}
function rtrnValCeco(e){
	var r = false;
	if(e[e.length-1]*1 == 6 && e[e.length-2]*1 == 1 && e != ""){
		r = true;
	}
	return r;
}
var horasMes;
function activateBasePIsoDia(){
	var campo = $("#campo_rendimiento").val();
	var horas = $("#hora_rendimietno").val();
	if(campo && horas){
		$("#baseDiaDiv").removeClass("disabledbutton");
	}else if(!campo && !horas){
		$("#baseDiaDiv").addClass("disabledbutton");
	}
}
function masDies(fecha){
	fecha.setDate(fecha.getDate() + 10);
	return fecha;
}
function resetSupervisor(input){
	var hoy = new Date(dateHoy());
	var newDate = new Date(formatFecha(input.value));
	hoy = masDies(hoy);
	if(hoy < newDate){
		$("#message").show();
		$("#"+input.id).addClass("has-error");
		$("#"+input.id).val("");
	}else{
		$("#message").hide();
	}
	var fecha = formatFecha(input.value);
	fecha = fecha.split("-");
	fecha = fecha[0]+""+fecha[1];
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_HORAS_MES/"+fecha*1,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			horasMes = data;
		}
	})
	if(replicar_rg){
		var renRgVal = cuadrillaSelect.rendimiento_general[0];
		if(renRgVal.fecha == formatFecha($("#fecha_rendimiento").val()) && valFechaIngreso
				&& renRgVal.codigo_supervisor == $("#supervisor").val() && renRgVal.cuartel == $("#cuartel_rendimiento").val()){
			alerta("La fecha, Cuartel y Supervisor no pueden ser iguales a los del rendimietno a replicar");
			$("#fecha_rendimiento").val("");
			return;
		}else{
			valFechaIngreso = true;
		}
	}
}
function changeBaseBtn(id){
	if(!$("#campo_rendimiento").val()){
		alerta("No ha seleccionado un Campo");
		return;
	}else if(!$("#hora_rendimietno").val()){
		alerta("No ha ingresado Horas");
		return;
	}
	var basePiso = $("#basePiso"+id).val();
	var baseSueldo = "";
	baseSueldo +=	"<div class='table-responsive'>";
	baseSueldo +=		"<table class='table table-bordered table-hover table-striped table-condensed' id='tbl_Datos_Comunes'>";
	baseSueldo +=			"<thead>";
	baseSueldo +=				"<tr>";
	baseSueldo +=					"<th>#</th>";
	baseSueldo +=					"<th>Tipo Trabajo</th>";
	baseSueldo +=					"<th>Sueldo Mensual</th>";
	baseSueldo +=				"</tr>";
	baseSueldo +=			"</thead>";
	baseSueldo +=			"<body id='bodyValores'>"+loadTipos_Pago(id)+"</body>";
	baseSueldo +=		"</table>";
	baseSueldo +=	'</div>';
	baseSueldo += 	"<div style='text-align: center;'>";
	baseSueldo += 		"<a class='btn green-dark submit-modal'onclick='cambiarPisoDia()'>Aceptar</a>";
	baseSueldo += 		"<a class='btn red' onclick='closeModal();'>Cancelar</a>";
	baseSueldo += 	"</div>";
	popUp("Base Sueldo", baseSueldo, true, "450px", true);
}
var sueldo_base;
function cambiarPisoDia(){
	if(validateModal()){
		$(".selectBase").each(function(){
			if($(this)[0].checked){
				var v = JSON.parse($(this).val());
				cargo = v.id;
				sueldo_base = v.sueldo;
				if(sueldo_base*1 == 0){
					sueldo_base = formatNumberDB($("#otro").val());
					monto = formatNumberDB($("#otro").val());
				}
				console.log(v)
				baseCargo = sueldo_base/horasMes;
				selected = v.cargo;
				var plata = ((sueldo_base/horasMes) * formatNumberDB($("#hora_rendimietno").val())).toFixed(0);
				plata = formatNumber(String(plata).split(".").join(","))
				$("#base_piso_dia").val(plata).trigger("keyup");
				closeModal();
			}
		})
	}
}
var cargos;
var selected;
function loadTipos_Pago(id){
	var cargosAux = [];
	var tBody = "";
	$.ajax({
		url : "/simpleWeb/json/AGRO/GETSUELDOSCARGO/"+$("#campo_rendimiento").val(),
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			$.each(data, function(k,v){
				cargosAux.push(v);
			})
		}
	})
	var c = 0;
	var valor = $("#base_piso_dia").val().replace(/\./g, '') || 0;
	cargos = cargosAux;
	$.each(cargosAux, function(k,v){
		if(selected == v.cargo){
			tBody += "<tr>";
			tBody += 	"<td><div class='form-check'><input class='form-check-input selectBase' type='radio' checked value='"+JSON.stringify(v)+"' id='baseSelect' name='optvalor'><label class='form-check-label' for='baseSelect'></label></div></td>";
			tBody += 	"<td>"+v.cargo.bold()+"</td>";
			tBody += 	"<td>$ "+formatNumber(v.sueldo.toFixed(0)).fontcolor("red")+"</td>";
			tBody += "</tr>";
		}else{
			tBody += "<tr>";
			tBody += 	"<td><div class='form-check'><input class='form-check-input selectBase' type='radio' value='"+JSON.stringify(v)+"' id='baseSelect' name='optvalor'><label class='form-check-label' for='baseSelect'></label></div></td>";
			tBody += 	"<td>"+v.cargo.bold()+"</td>";
			tBody += 	"<td>$ "+formatNumber(v.sueldo.toFixed(0)).fontcolor("red")+"</td>";
			tBody += "</tr>";
		}
		c++;
	})
	return tBody;
}
function cargaCampos(){
	$('#campo_rendimiento').html("");
	var campo_rendimiento = "<option value=''>Seleccione Campo</option>";
	var especie_rendimiento = "<option value=''>Seleccione Especie</option>";
	$.each(SESION.campo, function( key, val ) {
		campo_rendimiento += "<option value="+val.campo+">"+val.descripcion+"</option>";
	});
	$.each(SESION.especie, function( key, val ) {
		especie_rendimiento += "<option value="+val.codigo+">"+val.especie+"</option>";
	});
	$('#campo_rendimiento').html(campo_rendimiento);
	$('#campo_rendimiento_mod').html(campo_rendimiento);
	$('#especie_rendimiento').html(especie_rendimiento);
	$('#especie_rendimiento_mod').html(especie_rendimiento);
	loading.hide();
}
function loadCuadrilla(){
	var id = $("#supervisor").val();
	if(!id){
		id = $("#supervisorModal").val();
	}
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_CUADRILLA_SUPERVISOR/"+id+"/a/''",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			console.log(data)
			var selectCuadrilla = "<option value=''>Seleccione</option>";
			var selectCuadrillaModal = "<option value=''>Seleccione</option>";
			$.each(data, function(k,v){
				var crl = 1;
				selectCuadrilla += "<option value="+v.codigo_supervisor+">"+v.fecha+" | "+v.nsupervisor.toUpperCase()+" | "+v.codigo+"</option>";
				selectCuadrillaModal += "<option value="+v.codigo_supervisor+">"+v.fecha+" | "+v.nsupervisor.toUpperCase()+" | "+v.codigo+"</option>";
			})
			$("#selectCuadrilla").html(selectCuadrilla);
			$("#cuadrillaModal").html(selectCuadrillaModal);
		}
	})
}
var meses=["","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
function returnMes(fecha){
	var mes;
	fecha = fecha.split("-");
	fecha = fecha[1];
	if(fecha*1 < 10){
		fecha = fecha.replace("0", "");
	}
	mes = meses[fecha];
	return mes;
}
function atras(){
	$("#updDatos_generales").show();
	$("#addRendimientoGeneral").hide();
	$("#next").show();
	var selectedEffect = "slide";
	var options = {
		direction: "left"
	}
	$("#addCuadrilla").hide();
	$("#agregar_datos_comunes").show(selectedEffect, options, 500, callback);
}
function next(){
	$("#updDatos_generales").show();
	$("#addRendimientoGeneral").hide();
	var selectedEffect = "slide";
	var options = {
		direction: "right"
	}
	$("#agregar_datos_comunes").hide();
	$("#addCuadrilla").show(selectedEffect, options, 500, callback);
}
function updDatos_generales(){
	if(!$("#fecha_rendimiento").val()){
		alerta("No ha seleccionado una fecha");
		return;
	}else if(!$("#campo_rendimiento").val()){
		alerta("No ha seleccionado un Campo");
		return;
	}else if(!$("#hora_rendimietno").val()){
		alerta("Debe ingresar horas de trabajo");
		return;
	}else if(!$("#especie_rendimiento").val()){
		alerta("Debe seleccionar una especie");
		return;
	}else if(!$("#variedad_rendimiento").val()){
		alerta("Debe seleccionar una variedad");
		return;
	}else if(!$("#cuartel_rendimiento").val()){
		alerta("Debe seleccionar una Cuartel");
		return;
	}else if(!$("#faena_rendimiento").val()){
		alerta("Debe seleccionar una Faena");
		return;
	}else if(!$("#labor_rendimiento").val()){
		alerta("Debe seleccionar una Labor");
		return;
	}else if(!$("#pago_rendimiento").val()){
		alerta("Debe seleccionar un tipo de Pago");
		return;
	}else if(!$("#valor").val()){
		alerta("Debe ingresar el valor dal rendimiento");
		return;
	}else{
		loading.show();
		var json = {
			codigo: 0,
			fecha: formatFecha($("#fecha_rendimiento").val()),
			especie: $("#especie_rendimiento").val(),
			nespecie: "",
			variedad: $("#variedad_rendimiento").val(),
			nvariedad: "",
			cuartel: $("#cuartel_rendimiento").val(),
			ncuartel: "",
			faena: $("#faena_rendimiento").val(),
			nfaena: "",
			labor: $("#labor_rendimiento").val(),
			nlabor: "",
			horas: $("#hora_rendimietno").val(),
			tipo_pago: $("#pago_rendimiento").val(),
			valor: $("#valor").val(),
			codigo_cuadrilla: 0,
			ncuadrilla: "",
			codigo_supervisor: $("#supervisor").val(),
			nsupervisor: "",
			campo: ""
		}
		$.ajax({
			url : "/simpleWeb/json/AGRO/UPDATE_RENDIMIENTO_GENERAL/",
			type : "PUT",
			data : JSON.stringify(json),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success : function(data, textStatus, jqXHR) {
				datosActuales = json;
				rg = json;
				loading.hide();
				var a = alerta("Datos guardados exitosamente");
				$(a.aceptar).click(function(){
					var selectedEffect = "slide";
					var options = {
						direction: "right"
					}
					$("#agregar_datos_comunes").hide();
					$("#addCuadrilla").show(selectedEffect, options, 500, callback);
				})
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alerta("No se ha podido registrar la infomacion, consulte con el administrador del sistema");
			}
		});
	}
}
function getBloqueoFaena(){
	var campo = $("#campo_rendimiento").val();
	var fecha = $("#fecha_rendimiento").val();
	var especie = $("#especie_rendimiento").val();
	if(!especie){
		especie = 0;
	}
	var mes = returnMes(fecha);
	var zona = "";
	$.each(SESION.campo, function(k,v){
		if(campo == v.campo){
			zona = v.zona;
			return false;
		}
	})
	if(fecha){
		$.ajax({
			url: "/simpleWeb/json/AGRO/GET_LABOR_BLOQUEO/"+campo+"/"+mes.toLowerCase()+"/"+especie,
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				console.log(data)
				$.each(data, function(k,v){
					laborBloqueo.push(v.id_labor);
				})
				var faena_rendimiento = "<option value=''>Seleccione</option>"
				$.each(FAENA, function(k, v){
					if(laborBloqueo.indexOf(v.codigo) == -1 && v.zona == zona){
						faena_rendimiento += "<option value=" + v.codigo + ">"+ v.faena + "</option>";
					}
				})
				$("#faena_rendimiento").html(faena_rendimiento);
			}
		})
	}
}
function cambioCampo(campo){
	$.each(SESION.campo, function(k,v){
		if(v.campo == campo.value){
			loadSupervisor(v.codigo);
		}
	})
	activateBasePIsoDia();
	recorrer(campo.value)
	var fecha = $("#fecha_rendimiento").val();
	if(fecha){
		var mes = returnMes(fecha);
		getBloqueoFaena();
		var cuartel_rendimiento = "<option value=''></option>";
		$.each(SESION.sector, function(k,v){
			if(v.campo == campo.value){
				$.each(CUARTEL, function(ka,va){
					if(va.sector == v.sector){
						cuartel_rendimiento += "<option value='"+va.codigo+"'>"+va.nombre+"</option>";
					}
				})
			}
		})
		$("#cuartel_rendimiento").html(cuartel_rendimiento);
		var sociedad;
		var grupo;
		var gcc = "";
		$.each(SESION.campo, function(k,v){
			if($("#campo_rendimiento").val() == v.campo){
				campoId = v.codigo;
				sociedad = v.sociedad;
				grupo = v.grupo;
				gcc = v.grupo_co;
				return false;
			}
		})
		var arrGcc = gcc.split(";");
		var macros = "<option value=''></option>";
		$.each(arrGcc, function (k,v){
			$.ajax({
				url: IPSERVERSAP+ "JSON_BAPI_INTERNALORDRGRP_GETDETAIL.aspx?GRUPO="+v,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					$.each(data.HIERARCHYNODES, function(k,v){
						var e = v.GROUPNAME;
						if((e[e.length-1]*1 == 1 || e[e.length-1]*1 == 2) && e[e.length-2]*1 == 0){
							macros += "<option value='"+v.GROUPNAME+"'>"+v.DESCRIPT+"</option>";
						}
					})
				}
			})
		});
		macros += "<option value='1'>OTROS CENTRO DE COSTO</option>";
		$("#macro").html(macros);
	}else{
		if(!openModal){
			alerta("Debe seleccionar una Fecha");
			cargaCampos();
			return;
		}
	}
}

function cambioVariedad(variedad){
	var campo = $("#campo_rendimiento").val();
	var cuartel_rendimiento = "<option value=''>Seleccione</option>";
	$.each(CUARTEL, function(ka,va){
		if(va.variedad == variedad && va.campo == campo){
			cuartel_rendimiento += "<option value='"+va.codigo+"'>"+va.nombre+"</option>";
		}
	})
	$("#cuartel_rendimiento").html(cuartel_rendimiento);
}
function loadFaena(){
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETFAENA/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			FAENA = data;
		}
	})
}
function cambioFaena(faena){
	var zona = "";
	$.each(SESION.campo, function(k,v){
		if($("#campo_rendimiento").val() == v.campo){
			zona = v.zona;
		}
	})
	$.ajax({
		url : "/simpleWeb/json/AGRO/GET_LABOR_FAENA/"+faena+"/"+zona,
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			LABOR = data;
			var labor_rendimiento = "<option value=''>Seleccione</option>"
			$.each(data, function(k, v){
				labor_rendimiento += "<option value=" + v.codigo + ">"+ v.labor + "</option>";
			})
			$("#labor_rendimiento").html(labor_rendimiento);
		}
	})
}
function cambioEspecie(especie){
	var variedad_rendimiento = "<option value=''>Seleccione Variedad</option>";
	var arrVarieables = [];
	$.each(CUARTEL, function(k,v){
		if(v.especie == especie*1 && arrVarieables.indexOf(v.variedad) == -1){
			arrVarieables.push(v.variedad);
			variedad_rendimiento += "<option value='"+v.variedad+"'>"+v.nvariedad+"</option>";
			if(v.especie == ""){
				variedad_rendimiento = "<option value=''>Sin Variedad</option>";
			}
		}
	})
	$("#variedad_rendimiento").html(variedad_rendimiento);
	if($("#campo_rendimiento").val()){
		getBloqueoFaena();
	}
}
function addCuadrilla(boton){
	$("#addTrabCuadrilla").hide();
	$("#buscarCuadrilla").hide();
	runEffect();
}
function basePisoAdd(input){
	if(input.checked){
		$("#base_piso_dia").prop("disabled", false);
		$("#base_piso_dia").val("");
		$("#cngBtn").prop("disabled", false);
		$("#base_piso_dia").addClass("required");
	}else{
		$("#base_piso_dia").prop("disabled", true);
		$("#base_piso_dia").val(0);
		$("#cngBtn").prop("disabled", true);
		$("#base_piso_dia").removeClass("required");
	}
}
function addRendimientoGeneral(){
//	$("#agregar_datos_comunes").hide();
//	var selectedEffect = "slide";
//	var options = {
//		direction: "right"
//	}
//	$("#addCuadrilla").show(selectedEffect, options, 500, callback);
//	return;
	if(!$("#fecha_rendimiento").val()){
		alerta("No ha seleccionado una fecha");
		return;
	}else if(!$("#campo_rendimiento").val()){
		alerta("No ha seleccionado un Campo");
		return;
	}else if(!$("#especie_rendimiento").val() && $("#check_ingreso")[0].checked){
		alerta("Debe seleccionar una especie");
		return;
	}else if(!$("#variedad_rendimiento").val() && $("#check_ingreso")[0].checked){
		alerta("Debe seleccionar una variedad");
		return;
	}else if(!$("#cuartel_rendimiento").val() && $("#check_ingreso")[0].checked){
		alerta("Debe seleccionar una Cuartel");
		return;
	}else if(!$("#macro").val() && !$("#check_ingreso")[0].checked){
		alerta("Debe seleccionar una agrupación");
		loading.hide();
		return;
	}else if(!$("#ceco").val() && !$("#check_ingreso")[0].checked){
		alerta("Debe seleccionar un Centro de Costo");
		loading.hide();
		return;
	}else if(!$("#supervisor").val()){
		alerta("No ha seleccionado un Supervisor");
		return;
	}else if(!$("#hora_rendimietno").val()){
		alerta("Debe ingresar horas de trabajo");
		return;
	}else if(!$("#faena_rendimiento").val()){
		alerta("Debe seleccionar una Faena");
		return;
	}else if(!$("#labor_rendimiento").val()){
		alerta("Debe seleccionar una Labor");
		return;
	}else if(!$("#pago_rendimiento").val()){
		alerta("Debe seleccionar un tipo de Pago");
		return;
	}else if(!$("#valor").val()){
		alerta("Debe ingresar el valor dal rendimiento");
		return;
	}else if(!$("#base_piso_dia").val() && $("#base_piso_dia")[0].disabled == false ){
		if($("#base_piso_dia").val() == 0){
			alerta("Base Piso Dia no puede ser igual a 0");
			return;
		}
		alerta("Debe ingresar un Base Piso Dia");
		return;
	}else{
		loading.show();
		var json = {
			codigo: 0,
			fecha: formatFecha($("#fecha_rendimiento").val()),
			faena: $("#faena_rendimiento").val(),
			labor: $("#labor_rendimiento").val(),
			horas: formatNumberDB($("#hora_rendimietno").val()),
			tipo_pago: $("#pago_rendimiento").val(),
			valor: formatNumberDB($("#valor").val()),
			base_piso_dia: formatNumberDB($("#base_piso_dia").val()),
			codigo_cuadrilla: 0,
			codigo_supervisor: $("#supervisor").val(),
			campo: $("#campo_rendimiento").val()
		}
		if($("#check_ingreso")[0].checked){
			json.especie = $("#especie_rendimiento").val();
			json.variedad = $("#variedad_rendimiento").val();
			json.cuartel = $("#cuartel_rendimiento").val();
		}else{
			json.macro = $("#macro").val();
			if($("#macro").val()*1 == 1){
				json.ceco = $("#ceco").val();
			}else{
				json.ordenco = $("#ceco").val();
			}
		}
		console.log(json);
//		return;
		$.ajax({
			url : "/simpleWeb/json/AGRO/ADD_RENDIMIENTO_GENERAL/",
			type : "PUT",
			data : JSON.stringify(json),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success : function(data, textStatus, jqXHR) {
				if(replicar_rg){
					asignCuadrilla();
				}else{
					datosActuales = json;
					loadCuadrilla();
					var campo;
					$.each(SESION.campo, function(k,v){
						if($("#campo_rendimiento").val() == v.campo){
							campo = v.codigo;
							return false;
						}
					})
					$.ajax({
//						url: IPSERVERWORK+ "/simpleWeb/json/AGRO/getTrabajadoresAgro2/?TRABAJADOR=*&CAMPO="+campo+"&RUT=*&CARGO=*&FECHA="+datosActuales.fecha+"&DIGITADOR="+SESION.idUser,
						url: IPSERVERWORK+ "/simpleWeb/json/AGRO/GET_TRABAJADORES_AGRO/?FECHA="+formatFecha($("#fecha_rendimiento").val()),
						type:	"GET",
						dataType: 'json',
						async: false,
						success: function(data){
							aux = [];
							$.each(data, function(k,v){
								aux.push(v.rut+" | "+v.nombre);
							})
							cargarAddTrabajador();
						}
					})
					rg = json;
					loading.hide();
					var a = alerta("Datos guardados exitosamente");
					$(a.aceptar).click(function(){
						cambioFaena(json.faena);
						var body_Datos_Comunes = "";
						var campo;
						$.each(SESION.campo, function(k,v){
							if(json.campo == v.campo){
								campo = v.descripcion;
								return false;
							}
						})
						body_Datos_Comunes += "<tr>";
						body_Datos_Comunes +=	"<td>"+tblSupervisor(json.codigo_supervisor)+"</td>";
						body_Datos_Comunes +=	"<td>"+campo+"</td>";
						body_Datos_Comunes +=	"<td class='cuartel'>"+tblEspecie(json.especie)+"</td>";
						body_Datos_Comunes +=	"<td class='cuartel'>"+tblVariedad(json.variedad)+"</td>";
						body_Datos_Comunes +=	"<td class='cuartel'>"+tblCuartel(json.cuartel)+"</td>";
						if(json.macro && json.macro*1 == 1){
							body_Datos_Comunes +=	"<td class='ceco'>"+json.ceco+"</td>";
						}else{
							body_Datos_Comunes +=	"<td class='ceco'>"+json.ordenco+"</td>";
						}
						body_Datos_Comunes +=	"<td>"+tblFaena(json.faena)+"</td>";
						body_Datos_Comunes +=	"<td>"+tblLabor(json.labor)+"</td>";
						body_Datos_Comunes +=	"<td>"+formatFecha(json.fecha)+"</td>";
						body_Datos_Comunes +=	"<td>"+json.valor+"</td>";
						body_Datos_Comunes +=	"<td>"+json.horas+"</td>";
						body_Datos_Comunes += "</tr>";
						$("#body_Datos_Comunes").append(body_Datos_Comunes);
						if(json.macro){
							$(".cuartel").hide();
						}else{
							$(".ceco").hide();
						}
						var selectedEffect = "slide";
						var options = {
							direction: "right"
						}
						$("#agregar_datos_comunes").hide();
						$("#addCuadrilla").show(selectedEffect, options, 500, callback);
						replicarCuadrilla("1969-01-01");
					})
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alerta("No se ha podido registrar la infomacion, consulte con el administrador del sistema");
			}
		});
	}
}
function cargarAddTrabajador(){
	var campo = $("#campo_rendimiento").val();
	if(!campo){
		campo = $("#campoModal").val();
	}
	$.each(SESION.campo, function(k,v){
		if(v.campo == campo){
			campo = v.codigo;
		}
	})
	$("#addtrabajdor").autocomplete({
		source: aux,
		select: function(a, b){
			loading.show();
			var rut = b.item.value.toString().split(" | ");
			$.ajax({
				url: IPSERVERWORK+ "/simpleWeb/json/AGRO/getTrabajadoresAgro2/?TRABAJADOR=*&CAMPO="+campo+"&RUT="+rut[0]+"&CARGO=*&FECHA="+formatFecha($("#fecha_rendimiento").val())+"&DIGITADOR="+SESION.idUser,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					console.log(data)
					loading.hide();
					var validate = true;
					$.each(cuadrillaSelect.trab, function(ka,va){
						if(cuadrillaSelect.trab.length != 0 && cuadrillaSelect.trab[ka].idTrabajador == data[0].idTrabajador ){
							cleanRut();
							validate = false;
						}
					})
					if(validate){
						data[0].idSociedad = 1;
						data[0].cargo = 0;
						data[0].descripcionTipoTrabajador = "";
						data[0].fechaActualizacion = "";
						data[0].fechaIngresoCompania = "";
						data[0].direccion = "";
						data[0].email = "";
						cuadrillaSelect.trab.push(data[0]);
						cargarTablaMiembros(data[0]);
						cleanRut();
					}else{
						alerta("Este trabajador ya se encuentra en esta cuadrilla");
					}
					$("#addtrabajdor")[0].value = "";
				},error: function(er){
					console.log(er);
				}
			})
		}
	}).dblclick(function(){
		$(this).autocomplete("search", " ");
	});
}
function tblCampo(cuartel){
	var campo;
	$.each(CUARTEL, function(k,v){
		if(v.codigo == cuartel){
			$.each(SESION.campo, function(ka,va){
				if(v.campo == va.campo){
					campo = v.descripcion;
				}
			})
		}
	})
	return campo;
}
function replicarCuadrilla(fecha){
	var cuadrilla = $("#selectCuadrilla").val();
	var cuartel = $("#cuartel_rendimiento").val();
	var supervisor = $("#supervisor").val();
	if(cuadrilla){
		fecha = cuadrilla;
	}
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_RENDIMIENTOS_GENERALES/?CODIGO_RG="+cuadrilla*1,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			console.log(data)
			var arrAuxTRab = [];
			cuadrillaSelect = data;
			for(var i = 0; i < cuadrillaSelect.trab.length; i++){
				cuadrillaSelect.trab[i].idSociedad = 1;
				cuadrillaSelect.trab[i].cargo = 0;
				cuadrillaSelect.trab[i].descripcionTipoTrabajador = "";
			}
			if(data.codigo == 0){
//				$("#body_Miembros").html("");
//				alerta("El supervisor seleccionado no posee cuadrillas recientes, para continuar debe crear una cuadrilla nueva");
//				var selectedEffect = "slide";
//				var options = {
//					direction: "right"
//				}
//				$("#addCuadrilla").show(selectedEffect, options, 500, callback);
			}else{
				$("#body_Miembros").html("");
				var selectedEffect = "slide";
				var options = {
					direction: "right"
				}
				var arrAuxTRab = [];
				for(var i = 0; i < cuadrillaSelect.trab.length; i++){
					if(arrAuxTRab.indexOf(cuadrillaSelect.trab[i].idTrabajador) == -1){
						arrAuxTRab.push(cuadrillaSelect.trab[i].idTrabajador);
						cargarTablaMiembros(cuadrillaSelect.trab[i]);
					}
				}
				$("#addCuadrilla").show(selectedEffect, options, 500, callback);
			}
		}
	})
}
function backAdd(){
	var selectedEffect = "slide";
	var options = {
		direction: "left"
	}
	$("#addCuadrilla").hide();
	$("#agregar_datos_comunes").show(selectedEffect, options, 500, callback);
}
function runEffect() {
	var selectedEffect = "slide";
	var options = {
		direction: "up"
	}
	$("#agregar_datos_comunes").show(selectedEffect, options, 500, callback);
}
function callback() {
	setTimeout(function() {
		$("#effect:visible").removeAttr("style").fadeOut();
	}, 1000);
};
function activarBtn(input){
	if(sueldo_base){
		var plata = ((sueldo_base/horasMes) * formatNumberDB($("#hora_rendimietno").val())).toFixed(0);
		plata = formatNumber(String(plata).split(".").join(","))
		$("#base_piso_dia").val(plata).trigger("keyup");
	}
	activateBasePIsoDia();
}
function cleanRut(){
	setTimeout(function(){ $("#addtrabajdor").val(""); }, 100);
}
function cargarTablaMiembros(v){
	$("#trEmpty").remove();
	console.log(v)
	var body_Miembros = "";
	body_Miembros += "<tr id='tr"+v.idTrabajador+"'>";
	body_Miembros += 	"<td>"+v.idTrabajador+"</td>";
	body_Miembros += 	"<td>"+v.rut+"</td>";
	body_Miembros += 	"<td>"+v.nombre+"</td>";
	body_Miembros += 	"<td><a onclick='javascript: deleteTrab("+v.idTrabajador+");' title='Eliminar' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-minus'></i></a></td>";
	body_Miembros += 	"<td><select id='dotacion"+v.idTrabajador+"' class='btn blue btn-outline btn-circle btn-sm' onchange='selectDotacion(this, "+v.idTrabajador+");'><option value='1'>Presente</option><option value='2'>Ausente</option></select></td>";
	body_Miembros += "</tr>";
	$("#body_Miembros").append(body_Miembros);
}
function block(){
	var min = $(".min");
	for(var i = 0; i < min.length; i++){
		$(min[i]).val("2018-06-04");
	}
}
function selectDotacion(input, id){
	if(input.value == 2){
		var Dotacion = "";
		Dotacion +=	'<div class="col-xs-12 col-sm-12 col-md-12" style="margin-bottom: 10px;">';
		Dotacion +=		'<div class="col-xs-12 col-sm-12 col-md-12">';
		Dotacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
		Dotacion +=				'<h5 style="color: #337ab7;font-weight: bold">Motivo</h5>';
		Dotacion +=			'</div>';
		Dotacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
		Dotacion +=				'<select class="form-control input-sm required-modal" id="motivo'+id+'" onchange="changeMotivo(this, '+id+')"><option value="">Selecione</option><option value="1">Licencia</option><option value="2">Permiso</option><option value="3">Otro</option></select>';
		Dotacion +=			'</div>';
		Dotacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
		Dotacion +=				'<h5 style="color: #337ab7;font-weight: bold">Observacion</h5>';
		Dotacion +=			'</div>';
		Dotacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
		Dotacion +=				'<textarea id="observacion'+id+'" class="form-control"></textarea>';
		Dotacion +=			'</div>';
		Dotacion +=		'</div>';
		Dotacion +=	'</div>';
		Dotacion += 	"<div style='text-align: center;'>";
		Dotacion += 		"<a class='btn green-dark submit-modal' id='aceptar"+id+"' onclick='aceptarObs("+id+")'>Aceptar</a>";
		Dotacion += 		"<a class='btn red' onclick='cancelDotacion("+id+")'>Cancelar</a>";
		Dotacion += 	"</div>";
		popUp("Observaciones", Dotacion, true, "400px", true);
		selectCss();
		block()
	}else{
		$.each(cuadrillaSelect.trab, function(k,v){
			if(v.idTrabajador == id){
				cuadrillaSelect.trab[k].idSociedad = 1;
				cuadrillaSelect.trab[k].cargo = 0;
				cuadrillaSelect.trab[k].descripcionTipoTrabajador = "";
			}
		})
	}
}
function changeMotivo(input, id){
	if(input.value == 2){
		$("#horas"+id).show();
		$("#fechaRango"+id).hide();
		$("#fecha_desde"+id).val("");
		$("#fecha_hasta"+id).val("");
		horaPicker();
		fechas();
	}else{
		$("#fechaRango"+id).show();
		$("#horas"+id).hide();
		$("#fecha_desde"+id).val("");
		$("#fecha_hasta"+id).val("");
		horaPicker();
		fechas();
	}
}
function horaPicker(){
	var hora = document.getElementsByName("hora");
	for(var i = 0; i < hora.length; i++){
		$(hora[i]).timepicker();
	}
}
function cancelDotacion(id){
	$("#dotacion"+id).val(1);
	$.each(cuadrillaSelect.trab, function(k,v){
		if(v.idTrabajador == id){
			cuadrillaSelect.trab[k].idSociedad = 1;
			cuadrillaSelect.trab[k].cargo = 0;
			cuadrillaSelect.trab[k].descripcionTipoTrabajador = "";
			cuadrillaSelect.trab[k].fechaActualizacion = "";
			cuadrillaSelect.trab[k].fechaIngresoCompania = "";
			cuadrillaSelect.trab[k].direccion = "";
			cuadrillaSelect.trab[k].email = "";
		}
	})
	closeModal();
}
function aceptarObs(id){
	if(validateModal()){
		$.each(cuadrillaSelect.trab, function(k,v){
			if(v.idTrabajador == id){
				cuadrillaSelect.trab[k].idSociedad = 2; //asistencia
				cuadrillaSelect.trab[k].cargo = $("#motivo"+id).val(); //motivo
				cuadrillaSelect.trab[k].descripcionTipoTrabajador = $("#observacion"+id).val() //observacion
				cuadrillaSelect.trab[k].fechaActualizacion = ""; /*$("#hora_desde"+id).val();*/
				cuadrillaSelect.trab[k].fechaIngresoCompania = ""; /*$("#hora_hasta"+id).val();*/
				cuadrillaSelect.trab[k].direccion = ""; /*formatFecha($("#fecha_desde"+id).val());*/
				cuadrillaSelect.trab[k].email = ""; /*formatFecha($("#fecha_hasta"+id).val());*/
			}
		})
		closeModal();
	}
	
}
function deleteTrab(id){
	$.each(cuadrillaSelect.trab, function(k,v){
		if(v.idTrabajador == id){
			cuadrillaSelect.trab.splice(k, 1);
			$("#tr"+id).remove();
			return false;
		}
	})
	if($("#tbl_Miembros tr").length == 2){
		var tr = "";
		var texto = "No se han Asignado trabajadores";
		tr += "<tr id='trEmpty'><td colspan='5' style='text-align: center;'>"+texto.bold().fontcolor("red")+"</td></tr>";
		$("#body_Miembros").append(tr);
	}
}
function loadSupervisor(campo){
	$.ajax({
		url: IPSERVERWORK+ "/simpleWeb/json/AGRO/getTrabajadoresAgro2/?TRABAJADOR=*&CAMPO="+campo+"&RUT=*&CARGO=8&FECHA="+formatFecha($("#fecha_rendimiento").val())+"&DIGITADOR="+SESION.idUser,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			supervisores = data;
			var supervisor = "<option value=''></option>";
			$.each(data, function(k,v){
				supervisor += "<option value='"+v.idTrabajador+"'>"+v.nombre.toUpperCase()+"</option>";
			})
			$("#supervisor").html(supervisor);
			$("#supervisorModal").html(supervisor);
		}
	})
}
var row;
function refRen(){
	window.location.href = ("rendimiento?cuadrilla="+row.fecha_creacion+"&supervisor="+row.supervisor);
}
function asignCuadrilla(){
	if(cuadrillaSelect.trab.length == 0){
		alerta("No se han seleccionado trabajadores");
		return;
	}else{
		var auxCuadrilla = [];
		var auxCuadrillaFinal = [];
		$.each(cuadrillaSelect.trab, function(k,v){
			if(auxCuadrilla.indexOf(v.idTrabajador) == -1){
				if(openModal){
					v.idSociedad = 1;
				}
				auxCuadrilla.push(v.idTrabajador);
				auxCuadrillaFinal.push(v);
			}
		})
		loading.show();
		if(openModal){
			rg.fecha = formatFecha($("#fecha_rendimiento").val());
			rg.cuartel = $("#cuartel_rendimiento").val();
			rg.campo = $("#campo_rendimiento").val();
			rg.especie = $("#especie_rendimiento").val();
			rg.variedad = $("#variedad_rendimiento").val();
			rg.codigo_supervisor = $("#supervisor").val();
			rg.faena = $("#faena_rendimiento").val();
			rg.labor = $("#labor_rendimiento").val();
			rg.tipo_pago = $("#pago_rendimiento").val();
			rg.horas = $("#hora_rendimietno").val().split(".").join("");;
			rg.valor = $("#valor").val().split(".").join("");;
			rg.base_piso_dia = $("#base_piso_dia").val().split(".").join("");
		}
		row = {
			codigo: 0, 
			nombre_cuadrilla: "Cuadrilla "+dateHoy(),
			supervisor: $("#supervisor").val(),
			fecha_creacion: dateHoy(),
			estado: 0,
			trab: auxCuadrillaFinal,
			rendimiento_general: [rg]
		}
		if(row.rendimiento_general[0].codigo == 0){
			var sql = "SELECT MAX(codigo_rg) AS folio FROM rendimiento_general";
			$.ajax({
				url: "/simpleWeb/json/AGRO/GET_NUMERO/"+sql,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(n){
					row.rendimiento_general[0].codigo = n;
				},errror: function(er){
					alerta("Ha ocurrido un error interno del servidor, consulte con el administrador del sistema")
				}
			})
		}
		console.log(row)
		$.ajax({
			url : "/simpleWeb/json/AGRO/ADD_CUADRILLA/",
			type : "PUT",
			data : JSON.stringify(row),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success : function(data, textStatus, jqXHR) {
				loading.hide();
				alerta("Se ha creado una nueva Cuadrilla");
				$(swal.getConfirmButton).click(function(){
					window.location.href = ("rendimiento?CODIGO_RG="+row.rendimiento_general[0].codigo);
				})
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alerta("No se ha podido registrar la infomacion, consulte con el administrador del sistema");
			}
		});
	}
}
function camioBaseDia(input){
	if(input.value*1 == 1){
		$("#valor").val(0);
		$("#valor").prop("disabled", true);
	}else{
		$("#valor").val("");
		$("#valor").prop("disabled", false);
	}
}
function cambioCuartel(input){
	if(input.value != ""){
		$("#supervisor").prop("disabled", false);
		buscarCuadrillaSupervisor(input);
	}
}
function buscarCuadrillaSupervisor(input){
	var valFecha = $("#fecha_rendimiento").val();
	var fecha = formatFecha(valFecha)
	if(valFecha == "" && !openModal){
		alerta("Debe seleccionar una fecha");
//		loadSupervisor();
		loading.hide();
		return;
	}
	if($("#supervisor").val() != "" && ($("#cuartel_rendimiento").val() != "" || $("#ceco").val() != "")){
		loading.show();
		var url = "";
		if($("#check_ingreso")[0].checked){
			url = "/simpleWeb/json/AGRO/GET_RENDIMIENTO_GENERAL?FECHA="+fecha+"&SUPERVISOR="+$("#supervisor").val()+"&CUARTEL="+$("#cuartel_rendimiento").val()+"&TIPO=PLANTA";
		}else{
			url = "/simpleWeb/json/AGRO/GET_RENDIMIENTO_GENERAL?FECHA="+fecha+"&SUPERVISOR="+$("#supervisor").val()+"&CUARTEL="+$("#ceco").val()+"&TIPO=PLANTA"
		}
		$.ajax({
			url: url,
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				console.log(data)
				loading.hide();
				if(data.length != 0){
					var code_rg = data[0].codigo;
					if(data[0].codigo_cuadrilla == 0){
						var c = confirmar.confirm("Este Supervisor ya posee un rendimiento para la fecha seleccionada, pero no posee trabajadores. ¿Desea Agregarlos ahora?")
						$(c.aceptar).click(function(){
							datosActuales = data[0];
							var campo;
							$.each(SESION.campo, function(k,v){
								if($("#campo_rendimiento").val() == v.campo){
									campo = v.codigo;
									return false;
								}
							})
							$.ajax({
								url: IPSERVERWORK+ "/simpleWeb/json/AGRO/getTrabajadoresAgro2/?TRABAJADOR=*&CAMPO="+campo+"&RUT=*&CARGO=*&FECHA="+formatFecha($("#fecha_rendimiento").val())+"&DIGITADOR="+SESION.idUser,
								type:	"GET",
								dataType: 'json',
								async: false,
								success: function(trab){
									aux = [];
									$.each(trab, function(k,v){
										aux.push(v.rut+" | "+v.nombre);
									})
									cargarAddTrabajador();
								}
							})
							replicarCuadrilla("1969-01-01");
							loadCuadrilla();
							rg = data[0];
							var selectedEffect = "slide";
							var options = {
								direction: "right"
							}
							$("#agregar_datos_comunes").hide();
							$("#body_Datos_Comunes").html("");
							$.each(data, function(k,v){
								$("#body_Datos_Comunes").html("");
								cambioFaena(v.faena);
								var body_Datos_Comunes = "";
								body_Datos_Comunes += "<tr>";
								body_Datos_Comunes +=	"<td>"+tblSupervisor(v.codigo_supervisor)+"</td>";
								body_Datos_Comunes +=	"<td>"+$('#campo_rendimiento option:selected').text()+"</td>";
								body_Datos_Comunes +=	"<td class='cuartel'>"+tblEspecie(v.especie)+"</td>";
								body_Datos_Comunes +=	"<td class='cuartel'>"+tblVariedad(v.variedad)+"</td>";
								body_Datos_Comunes +=	"<td class='cuartel'>"+tblCuartel(v.cuartel)+"</td>";
								body_Datos_Comunes +=	"<td class='ceco'>"+$('#ceco option:selected').text()+"</td>";
								body_Datos_Comunes +=	"<td class=''>"+tblFaena(v.faena)+"</td>";
								body_Datos_Comunes +=	"<td class=''>"+tblLabor(v.labor)+"</td>";
								body_Datos_Comunes +=	"<td>"+formatFecha(v.fecha)+"</td>";
								body_Datos_Comunes +=	"<td>"+v.valor+"</td>";
								body_Datos_Comunes +=	"<td>"+v.horas+"</td>";
								body_Datos_Comunes += "</tr>";
								$("#body_Datos_Comunes").append(body_Datos_Comunes);
								if(v.cuartel == 0){
									$(".cuartel").hide();
								}else{
									$(".ceco").hide();
								}
							})
							$("#addCuadrilla").show(selectedEffect, options, 500, callback);
						})
						$(c.cancelar).click(function(){
							$("#supervisor").val("").trigger("change");
						})
					}else{
						$.ajax({
							url: "/simpleWeb/json/AGRO/GET_REND_GNRAL/"+code_rg,
							type:	"GET",
							dataType: 'json',
							async: false,
							success: function(general){
								console.log(general)
								rg = general;
								loading.hide();
								if(general.estado == 3){
									alerta("Ya se ha ingresado un Rendimiento para esta fecha, y se encuentra cerrado");
									$("#supervisor").val("").trigger("change");
									return;
								}else if(general.n_trab != 0){
									var c = confirmar.confirm("Este Supervisor ya posee un rendimiento para la fecha seleccionada, ¿Desea Ir al Rendimiento?");
									$(c.aceptar).click(function(){
										window.location.href = ("rendimiento?CODIGO_RG="+general.codigo);
									})
									$(c.cancelar).click(function(){
										$("#supervisor").val("").trigger("change");
									})
								}
							},errror: function(er){
								alerta("Ha ocurrido un error interno del servidor, consulte con el administrador del sistema")
							}
						})
					}
				}
			},errror: function(er){
				alerta("Ha ocurrido un error interno del servidor, consulte con el administrador del sistema")
			}
		})
	}
}
function tblSupervisor(id){
	var supervisor = "";
	$.each(supervisores, function(k,v){
		if(v.idTrabajador == id){
			supervisor = v.nombre;
		}
	})
	return supervisor;
}
function tblEspecie(id){
	var especie = "";
	$.each(SESION.especie, function(k,v){
		if(v.codigo == id){
			especie = v.especie;
		}
	})
	return especie;
}
function tblVariedad(id){
	var variedad = "";
	$.each(SESION.variedad, function(k,v){
		if(v.codigo == id){
			variedad = v.variedad;
		}
	})
	return variedad;
}
function tblCuartel(id){
	var cuartel = "";
	$.each(CUARTEL, function(k,v){
		if(v.codigo == id){
			cuartel = v.nombre;
		}
	})
	return cuartel;
}
function tblFaena(id){
	var faena = "";
	$.each(FAENA, function(k,v){
		if(v.codigo == id){
			faena = v.faena;
		}
	})
	return faena;
}
function tblLabor(id){
	var labor = "";
	$.each(LABOR, function(k,v){
		if(v.codigo == id){
			labor = v.labor;
		}
	})
	return labor;
}
var replicar_rg = false;
var openModal = false;
function copiarCuadrilla(){
	openModal = true;
	var serviceEx = "";
	serviceEx += "<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 	"<div class='col-xs-6 col-sm-6 col-md-6'>";
	serviceEx += 		"<h5 style='color: #337ab7;font-weight: bold'>Campo</h5>";
	serviceEx += 		"<select class='form-control input-sm required-modal' onchange='cambioCampo(this)' id='campoModal'>"+loadCamposModal()+"</select>";
	serviceEx += 	"</div>";
	serviceEx += 	"<div class='col-xs-6 col-sm-6 col-md-6'>";
	serviceEx += 		"<h5 style='color: #337ab7;font-weight: bold'>Supervisor</h5>";
	serviceEx += 		"<select class='form-control input-sm required-modal' onchange='loadCuadrilla()' id='supervisorModal'></select>";
	serviceEx += 	"</div>";
	serviceEx += "</div>";
	serviceEx += "<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 	"<div class='col-xs-6 col-sm-6 col-md-6'>";
	serviceEx += 		"<h5 style='color: #337ab7;font-weight: bold'>Cuadrilla</h5>";
	serviceEx += 		"<select class='form-control input-sm required-modal' onchange='replicarRgModal(this)' id='cuadrillaModal'></select>";
	serviceEx += 	"</div>";
	serviceEx += 	"<div class='col-xs-6 col-sm-6 col-md-6'>";
	serviceEx += 		"<h5 style='color: #337ab7;font-weight: bold'>Trabajador</h5>";
	serviceEx += 		"<select type='text' class='form-control input-sm' onchange='selectTrabModal(this)' id='trabajadorModal'></select>";
	serviceEx += 	"</div>";
	serviceEx += "</div>";
	serviceEx += "<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 	"<h4 style='color: #337ab7;font-weight: bold'>Datos Rendimiento General</h4>";
	serviceEx += "</div>";
	serviceEx += "<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 	"<table id='datosRg' class='table table-striped table-bordered table-condensed' >";
	serviceEx += 		"<thead>";
	serviceEx += 			"<tr>";
	serviceEx += 				"<th class='cuartel-modal'>Especie</th>";
	serviceEx += 				"<th class='cuartel-modal'>Variedad</th>";
	serviceEx += 				"<th class='cuartel-modal'>Cuartel</th>";
	serviceEx += 				"<th class='ceco-modal'>CeCO/OrdenCO</th>";
	serviceEx += 				"<th>Faena</th>";
	serviceEx += 				"<th>Labor</th>";
	serviceEx += 			"</tr>";
	serviceEx += 		"</thead>";
	serviceEx += 		"<tbody id='bodyRg'>";
	serviceEx += 		"</tbody>";
	serviceEx += 	"</table>";
	serviceEx += "</div>";
	serviceEx += "<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 	"<table id='copiarCuadrilla' class='table table-striped table-bordered table-condensed' >";
	serviceEx += 		"<thead>";
	serviceEx += 			"<tr>";
	serviceEx += 				"<th>Codigo</th>";
	serviceEx += 				"<th>Rut</th>";
	serviceEx += 				"<th>Nombre</th>";
	serviceEx += 				"<th style='width: 2%;'>Opciones</th>";
	serviceEx += 			"</tr>";
	serviceEx += 		"</thead>";
	serviceEx += 		"<tbody id='tableCopiar'>";
	serviceEx += 		"</tbody>";
	serviceEx += 	"</table>";
	serviceEx += "</div>";
	serviceEx += "<div style='text-align: center;'>";
	serviceEx += 	"<a class='btn green-dark submit-modal' onclick='replicarBtn()'>Replicar Rendimiento</a>";
	serviceEx += 	"<a class='btn red' onclick='cancel_ReplicarRg()'>Cancelar</a>";
	serviceEx += "</div>";
	popUp("Replicar Rendimiento General", serviceEx, true, "800px", true);
	selectCss();
	fechas();
	$(".swal2-close").click(function(){
		cancel_ReplicarRg();
	})
    var table = $('#copiarCuadrilla').DataTable( {
    	sPaginationType: "bootstrap_number" ,
		btnClass: "btn red",
		scrollY:  '20vh',
		orderCellsTop: false,
		ordering: false,
		filter: false
    } );

	$("tbody tr td").removeClass("sorting_1");
//    $( table.table().container() ).on( 'keyup', 'thead input', function () {
//        table.column($(this).data('index')).search(this.value).draw();
//    	$("tbody tr td").removeClass("sorting_1");
//    } );
    $("#copiarCuadrilla_filter").hide();
    $("#copiarCuadrilla_length").hide();
//    $('#copiarCuadrilla').on('click', 'tbody tr', function(event) {
//    	$(this).addClass('success').siblings().removeClass('success');
//    });
}
function cancel_ReplicarRg(){
	if(cuadrillaSelect.rendimiento_general.length == 0){
		replicar_rg = false;
	}
	openModal = false;
	closeModal();
}
function seleccionarCuadrilla(){
	var rows = getHighlightRow();
	if (rows != undefined) {
		alert(rows.attr('id'));
	}
}
var getHighlightRow = function() {
	return $('table > tbody > tr.success');
}
function loadCamposModal(){
	var campoModal = "<option value=''></option>";
	$.each(SESION.campo, function( key, val ) {
		campoModal += "<option value="+val.campo+">"+val.descripcion+"</option>";
	});
	return campoModal;
}
function replicarRgModal(input){
	$.ajax({
		url: IPSERVERWORK+ "/simpleWeb/json/AGRO/getTrabajadoresAgro2/?TRABAJADOR=*&CAMPO="+$("#campoModal").val()+"&RUT=*&CARGO=*&FECHA=*"+"&DIGITADOR="+SESION.idUser,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			var trabajadorModal = "<option value=''></option>";
			$.each(data, function(k,v){
				trabajadorModal += "<option value="+v.rut+">"+v.rut+" | "+v.nombre.toUpperCase();+"</option>";
			})
			$("#trabajadorModal").html(trabajadorModal);
		}
	})
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_RENDIMIENTOS_GENERALES/?CODIGO_RG="+input.value,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			console.log(data)
			cuadrillaSelect = data;
			var rend_general = data.rendimiento_general;
			var tbl = "";
			$.each(rend_general, function(k,v){
				tbl += 	"<tr>";
				tbl += 		"<td class='cuartel-modal'>"+v.nespecie+"</td>";
				tbl += 		"<td class='cuartel-modal'>"+v.nvariedad+"</td>";
				tbl += 		"<td class='cuartel-modal'>"+v.ncuartel+"</td>";
				if(v.ceco){
					tbl += 		"<td class='ceco-modal'>"+v.ceco+"</td>";
				}else{
					tbl += 		"<td class='ceco-modal'>"+v.ordenco+"</td>";
				}
				tbl += 		"<td>"+v.nfaena+"</td>";
				tbl += 		"<td>"+v.nlabor+"</td>";
				tbl += 	"</tr>";
			})
			$("#bodyRg").html(tbl);
			var tblTrab = "";
			$.each(data.trab, function(k,v){
				tblTrab += 	"<tr id='tr"+v.idTrabajador+"'>";
				tblTrab += 		"<td>"+v.codigo+"</td>";
				tblTrab += 		"<td>"+v.rut+"</td>";
				tblTrab += 		"<td>"+v.nombre+"</td>";
				tblTrab += 		"<td><a onclick='javascript: deleteTrab("+v.idTrabajador+");' title='Eliminar' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-minus'></i></a></td>";
				tblTrab += 	"</tr>";
			})
			$("#tableCopiar").html(tblTrab);
			if(rend_general[0].cuartel == 0){
				$(".cuartel-modal").hide();
				$(".ceco-modal").show();
			}else{
				$(".ceco-modal").hide();
				$(".cuartel-modal").show();
			}
		}
	})
}
function selectTrabModal(input){
	$.ajax({
		url: IPSERVERWORK+ "/simpleWeb/json/AGRO/getTrabajadoresAgro2/?TRABAJADOR=*&CAMPO="+$("#campoModal").val()+"&RUT="+input.value+"&CARGO=*&FECHA="+formatFecha($("#fecha_rendimiento").val()),
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			loading.hide();
			var validate = true;
			$.each(cuadrillaSelect.trab, function(ka,va){
				if(cuadrillaSelect.trab.length != 0 && cuadrillaSelect.trab[ka].idTrabajador == data[0].idTrabajador ){
					cleanRut();
					validate = false;
				}
			})
			if(validate){
				data[0].idSociedad = 1;
				data[0].cargo = 0;
				data[0].descripcionTipoTrabajador = "";
				data[0].fechaActualizacion = "";
				data[0].fechaIngresoCompania = "";
				data[0].direccion = "";
				data[0].email = "";
				cuadrillaSelect.trab.push(data[0]);
				$.each(data, function(k,v){
					var body_Miembros = "";
					body_Miembros += "<tr id='tr"+v.idTrabajador+"'>";
					body_Miembros += 	"<td>"+v.codigo+"</td>";
					body_Miembros += 	"<td>"+v.rut+"</td>";
					body_Miembros += 	"<td>"+v.nombre+"</td>";
					body_Miembros += 	"<td><a onclick='javascript: deleteTrab("+v.idTrabajador+");' title='Eliminar' class='btn btn-circle red btn-outline btn-sm'><i class='fa fa-minus'></i></a></td>";
					body_Miembros += "</tr>";
					$("#tableCopiar").append(body_Miembros);
				})
				cleanRut();
			}else{
				alerta("Este trabajador ya se encuentra en esta cuadrilla");
			}
			$("#addtrabajdor")[0].value = "";
		},error: function(er){
			console.log(er);
		}
	})
}
var valFechaIngreso = true;
//200.55.206.140
function replicarBtn(){
	if(validateModal()){
		var check = $("#check_ingreso")[0].checked;
		replicar_rg = true;
		closeModal();
		var ren_rg = cuadrillaSelect.rendimiento_general[0];
		rg = ren_rg;
		valFechaIngreso = false;
		console.log(ren_rg)
		console.log(check)
		if(ren_rg.cuartel == 0){
			$("#check_ingreso").attr("checked", false).trigger("click");
			if(!check){
				$("#check_ingreso").trigger("click");
			}
		}else{
			$("#check_ingreso").attr("checked", true).trigger("click");
			if(check){
				$("#check_ingreso").trigger("click");
			}
		}
		$("#fecha_rendimiento").val(formatFecha(ren_rg.fecha)).trigger("change");
		$("#campo_rendimiento").val(ren_rg.campo).trigger("change");
		if(ren_rg.cuartel == 0){
			$("#macro").val(ren_rg.macro).trigger("change");
			if(ren_rg.ceco){
				$("#ceco").val(ren_rg.ceco);
			}else{
				$("#ceco").val(ren_rg.ordenco);
			}
		}else{
			$("#especie_rendimiento").val(ren_rg.especie).trigger("change");
			$("#variedad_rendimiento").val(ren_rg.variedad).trigger("change");
			$("#cuartel_rendimiento").val(ren_rg.cuartel).trigger("change");
		}
		$("#fecha_rendimiento").val("");
		$("#supervisor").val(ren_rg.codigo_supervisor).trigger("change");
		$("#faena_rendimiento").val(ren_rg.faena).trigger("change");
		$("#labor_rendimiento").val(ren_rg.labor).trigger("change");
		$("#pago_rendimiento").val(ren_rg.tipo_pago).trigger("change");
		$("#hora_rendimietno").val(ren_rg.horas).trigger("keyup");
		$("#valor").val(formatNumber(ren_rg.valor)).trigger("keyup");
		$("#base_piso_dia").val(formatNumber(ren_rg.base_piso_dia));
		if(ren_rg.base_piso_hora == 0){
			$("#checkBase").trigger("click");
		}
	}
}