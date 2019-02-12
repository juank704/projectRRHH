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
var contratistaPulento;
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
	var especies = [];
	$.each(CUARTEL, function(k,v){
		if(v.campo == campo){
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
	var cecoCuartel = [0];
	$.each(CUARTEL, function(k,v){
		if(v.campo == campo){
			cecoCuartel.push(v.ordenco);
		}
	})
	var auxArr = [];
	$.each(MACRO.ORDER_LIST, function(k,v){
		if(v.ORDER.indexOf(input.value) != -1 && auxArr.indexOf(v.OBJECT_NO) == -1 && !rtrnValCeco(v.OBJECT_NO)){
			auxArr.push(v.OBJECT_NO);
			ordenco += "<option value="+v.ORDER+">"+v.ORDER_NAME+"</option>";
		}
	})
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
				CECO = "<option value=''></option>";
				$.each(data.COSTCENTERLIST, function(k,v){
					CECO += "<option value="+v.COSTCENTER+">"+v.DESCRIPT+"</option>";
				})
				$("#ceco").html(CECO);
			}
		})
		$("#ceco").append(CECO);
	}else{
		$("#ceco").html(ordenco);
	}
	
}
function resetSupervisor(input){
	var hoy = new Date(dateHoy());
	var newDate = new Date(formatFecha(input.value));
	if(hoy < newDate){
		$("#message").show();
		$("#"+input.id).addClass("has-error");
		$("#"+input.id).val("");
	}else{
		$("#message").hide();
	}
//	loadSupervisor();
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
function cargarContratista(sociedad){
	console.log(sociedad)
	//var url = IPSERVERSAP+ "JSON_BAPI_LISTA_PROVEEDORES.aspx?SOCIEDAD="+sociedad;
	var url = IPSERVERSAP+ "JSON_ZMOV_10036.aspx?CONTRATISTA=X";
	$.ajax({
		url: url,
		type:	"GET",
		dataType: 'json',
		async: true,
		success: function(data){
			console.log(data)
			var selectContratista = "<option value=''>Seleccione</option>";
			$.each(data.ET_DATPROV, function(k,v){
				selectContratista += "<option value="+parseInt(v.LIFNR)+">"+v.STCD1+" "+v.NAME1+"</option>";
			})
			$("#contratista").html(selectContratista);
		}
	})
}


function loadCuadrilla(contratista){
	var id = $("#supervisor").val();
	console.log(contratista)
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_CUADRILLA_SUPERVISOR/"+id+"/contratista/"+contratista,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			var selectCuadrilla = "<option value=''>Seleccione</option>";
			$.each(data, function(k,v){
				selectCuadrilla += "<option value="+v.fecha+">"+v.fecha+" | "+v.nsupervisor+" | "+v.codigo+"</option>";
			})
			$("#selectCuadrilla").html(selectCuadrilla);
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
function camioBaseDia(input){
	if(input.value*1 == 1){
		$("#valor").val(0);
		$("#valor").prop("disabled", true);
	}else{
		$("#valor").val("");
		$("#valor").prop("disabled", false);
	}
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
	var mes = returnMes(fecha);
	if(!especie){
		especie = 0;
	}
	var zona = "";
	$.each(SESION.campo, function(k,v){
		if(campo == v.campo){
			zona = v.zona;
			return false;
		}
	})
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_LABOR_BLOQUEO/"+campo+"/"+mes.toLowerCase()+"/"+especie,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
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
function cambioCampo(campo){
	console.log(campo)
	loadSupervisor(campo);
	$.each(SESION.campo, function(k,v){
		if(v.campo == campo){
			cargarContratista(v.sociedad);
			return false;
		}
	})
	recorrer(campo)
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
		var macros = "<option value=''></option>";
		$.ajax({
			url: IPSERVERSAP+ "JSON_BAPI_INTERNALORDRGRP_GETDETAIL.aspx?GRUPO="+gcc,
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				$.each(data.HIERARCHYNODES, function(k,v){
					var e = v.GROUPNAME;
					if(e[e.length-1]*1 == 1 && e[e.length-2]*1 == 0){
						macros += "<option value='"+v.GROUPNAME+"'>"+v.DESCRIPT+"</option>";
					}
				})
				macros += "<option value='1'>OTROS CENTRO DE COSTO</option>";
				$("#macro").html(macros);
			}
		})
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
	//TODO
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
//	$("#addCuadrilla").show();
	$("#buscarCuadrilla").hide();
	runEffect();
}
function rtrnValCeco(e){
	var r = false;
	if(e[e.length-1]*1 == 6 && e[e.length-2]*1 == 1 && e != ""){
		r = true;
	}
	return r;
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
	}else if(!$("#supervisor").val()){
		alerta("No ha seleccionado un Supervisor");
		return;
	}else if(!$("#hora_rendimietno").val()){
		alerta("Debe ingresar horas de trabajo");
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
	}else if(!$("#contratista").val()){
			alerta("Debe ingresar un contratista");
			return;
		}else {
		loading.show();
		var json = {
			codigo: 0,
			fecha: formatFecha($("#fecha_rendimiento").val()),
			faena: $("#faena_rendimiento").val(),
			labor: $("#labor_rendimiento").val(),
			horas: $("#hora_rendimietno").val(),
			tipo_pago: $("#pago_rendimiento").val(),
			valor: formatNumberDB($("#valor").val()),
			codigo_supervisor: $("#supervisor").val(),
			campo: $("#campo_rendimiento").val(),
			contratista : $("#contratista").val(),
			ncontratista : $("#contratista option:selected").text()
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
		contratistaPulento = $("#contratista").val();
		$.ajax({
			url : "/simpleWeb/json/AGRO/ADD_RENDIMIENTO_GENERAL/",
			type : "PUT",
			data : JSON.stringify(json),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success : function(data, textStatus, jqXHR) {
				datosActuales = json;
				loadCuadrilla($("#contratista").val());
				var campo;
				$.each(SESION.campo, function(k,v){
					if($("#campo_rendimiento").val() == v.campo){
						campo = v.codigo;
						return false;
					}
				})
				$.ajax({
					url: IPSERVERWORK+ "/simpleWeb/json/AGRO/getTrabajadoresAgro2/?TRABAJADOR=*&CAMPO=*&RUT=*&CARGO=*&FECHA="+datosActuales.fecha+"&CONTRATISTA="+$("#contratista").val()+"&DIGITADOR="+SESION.idUser,
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
					var campo;
					$.each(SESION.campo, function(k,v){
						if(json.campo == v.campo){
							campo = v.descripcion;
							return false;
						}
					})
					var body_Datos_Comunes = "";
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
					body_Datos_Comunes +=	"<td>"+formatNumber(String(json.valor).split(".").join(","))+"</td>";
					body_Datos_Comunes +=	"<td>"+json.horas+"</td>";
					body_Datos_Comunes +=	"<td>"+json.ncontratista+"</td>";
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
//					})
					replicarCuadrilla("1969-01-01");
				})
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alerta("No se ha podido registrar la infomacion, consulte con el administrador del sistema");
			}
		});
	}
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
function replicarCuadrilla(fecha, contratista){
	var cuadrilla = $("#selectCuadrilla").val();
	var cuartel = $("#cuartel_rendimiento").val();
	if(cuadrilla){
		fecha = cuadrilla;
	}
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_REPLICAR_CUADRILLA_SUPERVISOR/"+$("#supervisor").val()+"/"+fecha+"/"+cuartel+"/contratista/"+contratistaPulento,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			var arrAuxTRab = [];
			cuadrillaSelect = data;
			//TODO
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
function cargarAddTrabajador(){
	var campo = $("#campo_rendimiento").val();
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
			console.log(IPSERVERWORK+ "/simpleWeb/json/AGRO/getTrabajadoresAgro/?TRABAJADOR=*&CAMPO=*&RUT="+rut[0]+"&CARGO=*&FECHA="+formatFecha($("#fecha_rendimiento").val())+"&CONTRATISTA="+contratistaPulento)
			$.ajax({
				url: IPSERVERWORK+ "/simpleWeb/json/AGRO/getTrabajadoresAgro/?TRABAJADOR=*&CAMPO=*&RUT="+rut[0]+"&CARGO=*&FECHA="+formatFecha($("#fecha_rendimiento").val())+"&CONTRATISTA="+contratistaPulento,
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
//						if(datosActuales.horas > data[0].horas_restantes){
//							alerta(data[0].nombre + " ya posee horas asignadas para el dia "+datosActuales.fecha);
//						}
						//TODO
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
function cleanRut(){
	setTimeout(function(){ $("#addtrabajdor").val(""); }, 100);
}
function cargarTablaMiembros(v){
	$("#trEmpty").remove();
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
//		Dotacion +=			'<div style="display: block;" id="horas'+id+'" class="col-xs-12 col-sm-12 col-md-12">';
//		Dotacion +=				'<div class="col-xs-6 col-sm-6 col-md-6">';
//		Dotacion +=					'<h4>Desde</h4>';
//		Dotacion +=					'<input name="time" id="hora_desde'+id+'" type="time" class="form-control"/>';
//		Dotacion +=				'</div>';
//		Dotacion +=				'<div class="col-xs-6 col-sm-6 col-md-6">';
//		Dotacion +=					'<h4>Hasta</h4>';
//		Dotacion +=					'<input name="time" id="hora_hasta'+id+'" type="time" class="form-control"/>';
//		Dotacion +=				'</div>';
//		Dotacion +=			'</div>';
//		Dotacion +=			'<div style="display: block;" id="fechaRango'+id+'" class="col-xs-12 col-sm-12 col-md-12">';
//		Dotacion +=				'<div class="col-xs-6 col-sm-6 col-md-6">';
//		Dotacion +=					'<h4>Desde</h4>';
//		Dotacion +=					'<input name="fecha" id="fecha_desde'+id+'" type="text" class="form-control"/>';
//		Dotacion +=				'</div>';
//		Dotacion +=				'<div class="col-xs-6 col-sm-6 col-md-6">';
//		Dotacion +=					'<h4>Hasta</h4>';
//		Dotacion +=					'<input name="fecha" id="fecha_hasta'+id+'" type="text" class="form-control min"/>';
//		Dotacion +=				'</div>';
//		Dotacion +=			'</div>';
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
		//TODO
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
	//TODO
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
		url: IPSERVERWORK+ "/simpleWeb/json/AGRO/getTrabajadoresAgro2/?TRABAJADOR=*&CAMPO="+campo+"&RUT=*&CARGO=8&FECHA=*",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			supervisores = data;
			var supervisor = "<option value=''>Seleccione</option>";
			$.each(data, function(k,v){
				supervisor += "<option value='"+v.idTrabajador+"'>"+v.nombre.toUpperCase()+"</option>";
			})
			$("#supervisor").html(supervisor);
		}
	})
}
var row;
function refRen(){
	window.location.href = ("rendimiento_contratista?cuadrilla="+row.fecha_creacion+"&supervisor="+row.supervisor);
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
				auxCuadrilla.push(v.idTrabajador);
				auxCuadrillaFinal.push(v)
			}
		})
		loading.show();
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
//		return;s
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
				alerta("Se ha creado una nueva Cuadrila");
				$(swal.getConfirmButton).click(function(){
					window.location.href = ("rendimiento_contratista?CODIGO_RG="+row.rendimiento_general[0].codigo);
				})
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alerta("No se ha podido registrar la infomacion, consulte con el administrador del sistema");
			}
		});
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
	if(valFecha == ""){
		alerta("Debe seleccionar una fecha");
//		loadSupervisor();
		loading.hide();
		return;
	}
	if($("#supervisor").val() != "" && ($("#cuartel_rendimiento").val() != "" || $("#ceco").val() != "")){
		loading.show();
		var url = "";
		if($("#check_ingreso")[0].checked){
			url = "/simpleWeb/json/AGRO/GET_RENDIMIENTO_GENERAL?FECHA="+fecha+"&SUPERVISOR="+$("#supervisor").val()+"&CUARTEL="+$("#cuartel_rendimiento").val()+"&TIPO=CONTRATISTA";
		}else{
			url = "/simpleWeb/json/AGRO/GET_RENDIMIENTO_GENERAL?FECHA="+fecha+"&SUPERVISOR="+$("#supervisor").val()+"&CUARTEL="+$("#ceco").val()+"&TIPO=CONTRATISTA"
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
					if(data[0].codigo_cuadrilla == 0){
						var code_rg = data[0].codigo;
						console.log(data)
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
								url: IPSERVERWORK+ "/simpleWeb/json/AGRO/getTrabajadoresAgro2/?TRABAJADOR=*&CAMPO=*&RUT=*&CARGO=*&FECHA="+datosActuales.fecha+"&CONTRATISTA="+datosActuales.contratista,
								type:	"GET",
								dataType: 'json',
								async: false,
								success: function(data){
									aux = [];
									$.each(data, function(k,v){
										aux.push(v.rut+" | "+v.nombre.toUpperCase());
									})
									cargarAddTrabajador();
								}
							})
							replicarCuadrilla("1969-01-01", data[0].contratista);
							contratistaPulento = data[0].contratista;
							loadCuadrilla(data[0].contratista);
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
								body_Datos_Comunes +=	"<td>"+tblCampo(v.cuartel)+"</td>";
								body_Datos_Comunes +=	"<td class='cuartel'>"+tblEspecie(v.especie)+"</td>";
								body_Datos_Comunes +=	"<td class='cuartel'>"+tblVariedad(v.variedad)+"</td>";
								body_Datos_Comunes +=	"<td class='cuartel'>"+tblCuartel(v.cuartel)+"</td>";
								body_Datos_Comunes +=	"<td class='ceco'>"+v.ceco+"</td>";
								body_Datos_Comunes +=	"<td>"+tblFaena(v.faena)+"</td>";
								body_Datos_Comunes +=	"<td>"+tblLabor(v.labor)+"</td>";
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
								rg = general;
								loading.hide();
								if(general.estado == 3){
									alerta("Ya se ha ingresado un Rendimiento para los parametros seleccionados, y fue validado");
									$("#supervisor").val("").trigger("change");
									return;
								}
								if(general.n_trab != 0){
									var c = confirmar.confirm("Este Supervisor ya posee un rendimiento para la fecha seleccionada, ¿Desea Ir al Rendimiento?");
									$(c.aceptar).click(function(){
										window.location.href = ("rendimiento_contratista?CODIGO_RG="+general.codigo);
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