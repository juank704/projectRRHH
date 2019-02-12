$(document).ready(function(){
	$.fn.dataTable.ext.errMode = 'none';
	filtros();
	ocualtarExcel();
	$('#Table_DotacionDiaria').DataTable({
		"sPaginationType" : "full_numbers",
//		"filter": false
	});
	add();
	$("#loading").hide();
});  
var tabla = $("#Div_DotacionDiaria").html();
var SESION = getVars();
var DotacionDiaria;
var exportTabla = [];

function loadInfo() {
	$("#BodyDotacionDiaria").html("");
	if (!$('#BoxCampo').val()) {
		alerta("Seleccione un Campo");
	}else if (!$('#BoxFaena').val()){
		alerta("Seleccione una Faena");
	} else if (!$('#BoxLabor').val()) {
		alerta("Seleccione una Labor");
	} else {
//		 var campo = "";
//		 for (i=0; i<$('#BoxCampo').val().length; i++){
//			 campo += $('#BoxCampo').val()[i]+ "-";
//		 }
//		 row.descripcion = campo;
		
		var row = {};
		 row.descripcion = $('#BoxCampo').val()[0];
		 row.labor = $('#BoxLabor').val()[0];	
		 row.faena = $('#BoxFaena').val()[0];
		 row.fecha = formatFecha($('#BoxFecha').val());
	 	$.ajax({
			type : "POST",
			async : false,
			url : "/simpleWeb/json/AGRO/GET_DotacionDiaria/",
			data : JSON.stringify(row),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success : function(data) {
				DotacionDiaria = data;
				$("#Div_DotacionDiaria").html("");
				$("#Div_DotacionDiaria").html(tabla);
				var existeRegistro = true;
				$.each(data, function(k, v) {
					existeRegistro = false;
					var dotacion = "";
					var control = "";

					if (v.accion == 1) {
						control = "Permiso";
					} else if (v.accion == 2) {
						control = "Licencia";
					} else if (v.accion == 3) {
						control = "Falta";
					}
					
					var json = {
							Campo: v.descripcion,
							Especie: v.especie,
							Variedad: v.variedad,
							Cuartel: v.nombre,
							Faena: v.faena,
							Labor: v.labor,
							Trabajador: v.trabajador+" "+v.apellidoPaterno+" "+v.apellidoMaterno
						}
					exportTabla.push(json);
					
					dotacion += "<tr>";
					dotacion += "<td>" + v.descripcion + "</td>";
					dotacion += "<td>" + v.especie + "</td>";
					dotacion += "<td>" + v.variedad + "</td>";
					dotacion += "<td>" + v.nombre + "</td>";
					dotacion += "<td>" + v.faena + "</td>";
					dotacion += "<td>" + v.labor + "</td>";
					dotacion += "<td>" + v.CantidadTrabajadores + "</td>";
//					dotacion += "<td>" + v.trabajador+" "+v.apellidoPaterno+" "+v.apellidoMaterno+ "</td>";
					dotacion += "<td>" + v.permiso + "</td>";
					dotacion += "<td>" + v.licencia + "</td>";
					dotacion += "<td>" + v.falta + "</td>";
					dotacion += "</tr>";
					$('#BodyDotacionDiaria').append(dotacion);
					mostrarExcel();
				})
				$('#Table_DotacionDiaria').DataTable({
					"sPaginationType" : "full_numbers",
				});
					add();
				if(existeRegistro){
					alerta("El registro que busca no existe");
				}
			}

		})
	}
}
	
function filtros(){
	var selectCampo = "<option value=''></option>";
	$.each(SESION.campo, function(ks,va){
		selectCampo += "<option value='"+va.campo+"'>"+va.descripcion+"</option>";
	})
	$("#BoxCampo").append(selectCampo);
	
	getCampos1();
	var selectLabor = "<option value='0'>Todos</option>";
	$.each(arrayCampo, function(ks,va){
		selectLabor += "<option value='"+va.codigo+"'>"+va.labor+"</option>";
	})
	$("#BoxLabor").append(selectLabor);
	
	getFaena();
	var selectFaena = "<option value=''>Todos</option>";
	$.each(arrayFaena, function(ks,va){
		selectFaena += "<option value='"+va.codigo+"'>"+va.faena+"</option>";	
	})
	$("#BoxFaena").append(selectFaena);		
}

var arrayFaena;
function getFaena(){
	var campoSesion;
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETFAENA/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayFaena = data;
		}
	})
	return campoSesion;
}

var arrayCampo;
function getCampos1(){
	var campoSesion;
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_LABOR/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayCampo = data;
		}
	})
	return campoSesion;
}

function add(){
	var object = document.getElementById('Table_DotacionDiaria_filter');
	var object1 = document.getElementById('Table_DotacionDiaria_paginate');
	object.style.float = "right";
	object1.style.float = "right";
}

function CambioLabor_Faena(faena){
	$.ajax({
		url : "/simpleWeb/json/AGRO/GET_LABOR_FAENA/"+faena,
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			var labor_rendimiento;
			$.each(data, function(k, v) {
				labor_rendimiento += "<option value="+v.codigo+">"+v.labor+"</option>";
			})
			$("#BoxLabor").html(labor_rendimiento);
		}
	})
}
function ocualtarExcel(){
	$('#Excel').prop("disabled",true);
}
function mostrarExcel(){
	$('#Excel').prop("disabled",false);
}

$("#Excel").click(function(){
	$("#dvjson").excelexportjs({
        containerid: "dvjson"
           , datatype: 'json'
           , dataset: exportTabla
           , worksheetName: "Mapeo"
           , columns: getColumns(exportTabla)          
    });
	location.reload();
	$("#loading").hide();
})