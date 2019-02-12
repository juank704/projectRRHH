var dataTable = $('#Table_mantenedor').DataTable({
	"sPaginationType": "full_numbers" ,
	"filter": false
	
});
$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none';
	$('#loading').hide();
	loadCampo();
});
var filtro;
var cod_campo;
var arrayData;
function loadCampo(){
	$.each(SESION.campo, function(k, v) {
    	filtro += '<option value="'+v.campo+'">'+v.descripcion+'</option>';
    });
    $('#filtroCampo').html(filtro);
    cod_campo = $("#filtroCampo").val();
    loadInfo();
}
$("#filtroCampo").change(function(){
	cod_campo = $("#filtroCampo").val();
	loadInfo();
});

function loadInfo(){
	$.getJSON("/simpleWeb/json/AGRO/getEvaporacionAcumulada/"+cod_campo, function(data) {
		arrayData = data;
		loadTabla();
	});
	$("#loading").hide();
}

function loadTabla(){	
	$('#verde').html("<input id='verde' style='background-color: green; text-align: center;' class='form-control input-sm' value='Verde' disabled>")
	$('#amarillo').html("<input id='amarillo' style='background-color: yellow; text-align: center;' class='form-control input-sm' value='Amarillo' disabled>")
	$('#rojo').html("<input id='rojo' style='background-color: red; text-align: center;' class='form-control input-sm' value='Rojo' disabled>")
	
	$('#desdeVerde').html("<input id='desdeVerde2' onchange='modificarInput()' value=0 style='text-align: center;' type='number' class='form-control input-sm' placeholder='%' disabled>");
	$('#hastaVerde').html("<input id='hastaVerde2' onchange='modificarVerde()' value="+arrayData[0].hasta_verde+" style='text-align: center;' type='number' class='form-control input-sm' value=100 >");
	$('#desdeAmarillo').html("<input id='desdeAmarillo2' onchange='modificarAmarillo()' value="+arrayData[0].desde_amarillo+" style='text-align: center;' type='number' class='form-control input-sm' placeholder='%' disabled>");
	$('#hastaAmarillo').html("<input id='hastaAmarillo2' onchange='modificarInput()' value="+arrayData[0].hasta_amarillo+" style='text-align: center;' type='number' class='form-control input-sm' placeholder='%' disabled>");
	$('#desdeRojo').html("<input id='desdeRojo2' onchange='modificarRojo()' value="+arrayData[0].desde_rojo+" style='text-align: center;' type='number' class='form-control input-sm' >");
	$('#hastaRojo').html("<input id='hastaRojo2' onchange='modificarInput()' value=100 style='text-align: center;' type='number' class='form-control input-sm' placeholder='%' disabled>");	
}
function modificarVerde(){
	$("#desdeAmarillo2").attr({
		"value": $("#hastaVerde2").val()*1,
	});
	if($("#desdeRojo2")=="" || $("#desdeAmarillo2").val()*1>=$("#hastaAmarillo2").val()*1){
		$("#hastaAmarillo2").attr({
			"value": $("#desdeAmarillo2").val()*1+1,
		});
		$("#desdeRojo2").attr({
			"value": $("#hastaAmarillo2").val()*1,
		});
	}
	
}
//function modificarInput(){
//	$("#hastaAmarillo2").attr({
//		"value": $("#desdeAmarillo2").val()*1+1,
//	});
//}
function modificarRojo(){
	$("#hastaAmarillo2").attr({
		"value": $("#desdeRojo2").val()*1,
	});
	if($("#hastaVerde2")=="" || $("#hastaAmarillo2").val()*1<=$("#desdeAmarillo2").val()*1){
		$("#desdeAmarillo2").attr({
			"value": $("#hastaAmarillo2").val()*1-1,
		});
		$("#hastaVerde2").attr({
			"value": $("#desdeAmarillo2").val()*1,
		});
	}
	
}
//function modificarAmarillo(){
//	$("#hastaVerde2").attr({
//		"value": $("#desdeAmarillo2").val()*1-1,
//	});
//	if($("#desdeAmarillo2").val()*1>=$("#hastaAmarillo2").val()*1){
//		$("#hastaAmarillo2").attr({
//			"value": $("#desdeAmarillo2").val()*1+1,
//		});
//		$("#desdeRojo2").attr({
//			"value": $("#hastaAmarillo2").val()*1+1,
//		});
//	}
//}
function Guardar(){
	var descripc = {
			campo : cod_campo,
			hasta_verde : $("#hastaVerde2").val(),
			desde_verde : $("#desdeVerde2").val(),
			hasta_amarillo : $("#hastaAmarillo2").val(),
			desde_amarillo : $("#desdeAmarillo2").val(),
			hasta_rojo : $("#hastaRojo2").val(),
			desde_rojo : $("#desdeRojo2").val(),
		}	
	

		$.ajax({
			url : "/simpleWeb/json/AGRO/UPEVAPORACIONACUMULADA/",
			type : "PUT",
			data : JSON.stringify(descripc),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
				alerta("Datos Guardados Satisfactoriamente");	
				return;
			}
		})	
	$("#loading").hide();
}