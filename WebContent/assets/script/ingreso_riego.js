$(document).ready(function() {
	loadCampos();
	$('#loading').hide();
});

var SESION = getVars();
var camp = "<option value=''>Seleccione</option>";
$.each(SESION.campo, function(ks, va) {
	camp += "<option value='" + va.campo + "'>" + va.descripcion + "</option>";
})
$("#campo_taller").html(camp);
function loadCampos(){
	var camp = "<option value=''></option>";
	$.each(SESION.campo, function(ks, va) {
		camp += "<option value='" + va.campo + "'>" + va.descripcion + "</option>";
	})
	$("#BoxCampo").html(camp);
	
	
	getMaestroIngreso();
	var registro = "<option value=''></option>";
	$.each(ingreso, function(ks,va){
		registro += "<option value='"+va.codigo+"'>"+va.descripcion+"</option>";
	})
	$("#BoxMotivoIngreso").html(registro);
}
var ingreso;
function getMaestroIngreso(){
	var maestro;
	$.ajax({
		url: "/simpleWeb/json/AGRO/Get_MaestroIngreso/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			ingreso = data;
		}
	})
	return maestro;
}

function Guardar(){
	if(!$('#BoxFecha').val()){
		alerta("Ingrese Fecha");
	}else if(!$('#campo_taller').val()){
		alerta("Seleccione un Campo")
	}else if (!$('#BoxCaseta').val()){
		alerta("Seleccione una Caseta de Riego")
	}else if(!$('#vehiculo_taller').val()){
		alerta("Seleccione un Equipo de Riego");
	}else if(!$('#BoxMotivoIngreso').val()){
		alerta("Seleccione un Motivo de Ingreso")
	}else if (!$('#BoxDiagnostico').val()){
		alerta("Ingrese Diagnostico")
	}else{	
		var datos={
			fecha : formatFecha($('#fecha_taller').val()),
			caseta : $('#BoxCaseta').val(),
			equipo : $('#vehiculo_taller').val(),
			campo : $('#campo_taller').val(),	
			motivo_ingreso : $('#BoxMotivoIngreso').val(),
			diagnostico_preliminar : $('#BoxDiagnostico').val(),
			nreserva  :     $('#nreserva').val()
		}
		console.log(datos)
		$.ajax({
			url : "/simpleWeb/json/AGRO/ADDIngresoRiego/",
			type : "PUT",
			data : JSON.stringify(datos),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
		},success: function(){
				ValorPredeterminado();
				alerta("Registro Guardato Correctamente");
				location.reload();

			},success: function(){
				ValorPredeterminado();
				loadCampos();	
				alerta("Registro Guardato Correctamente");
			}
		})
		$("#loading").hide();
	}
} 



function ValorPredeterminado(){
	$('#campo_taller').prop("value","");
	$('#BoxDiagnostico').prop("value","");
	$('#BoxHorometro').prop("value","");
}
$('#campo_taller').change(function(){
	getMaquinaria($(this).val());
});
var arrayMaterial = [];
function getMaterial(){
	$.ajax({
		//url: "/simpleWeb/json/AGRO/GETMA/",
		url: IPSERVERSAP + "/SCLEM/JSON_ZMOV_10020.aspx?FAMILIA=ZREP",//ZREP
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayMaterial.push(data.LT_DETALLE);
			console.log(arrayMaterial);
		}
	})
}
getMaterial();
var arrayMaquinaria = [];
function getMaquinaria(c){
	arrayMaquinaria = [];
	$('#vehiculo_taller').empty();
	$.ajax({
		//url: "/simpleWeb/json/AGRO/GETMA/",
		url: IPSERVERSAP + "/SCLEM/JSON_BAPI_EQUI_GETLIST.aspx?CENTRO="+c,//ZREP
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			$.each(data.EQUIPMENT_LIST, function(ka,va){
				$('#vehiculo_taller').append('<option value="'+va.EQUIPMENT+'">'+va.DESCRIPT+'</option>');
			})
		}
	})
}
var cMat = 0;
function addMateriales(){
	console.log($('#campo_taller').val());
	if($('#campo_taller').val() == ''){
		alerta("Debe seleccionar el Campo para continuar.");
		return false;
	}
	var tr  = "<tr id='tr"+cMat+"'>";
	tr += "<td><select id='mat"+cMat+"' onchange='getDetalleMaterial("+cMat+")'  class='form-control2 input-sm2'>";	
    $.each(arrayMaterial[0], function(ka,va){
    	tr += "<option value='"+va.MATNR+"'>"+va.MAKTX+"</option>";
    })
	tr += "</select>";
	tr += "</td>";
	tr += "<td id='um"+cMat+"'></td>";
	tr += "<td><input class='form-control required' type='number' id='cant"+cMat+"'></td>";	
	tr += "<td id='stock"+cMat+"'></td>";
	tr += "<td><input class='form-control' type='number' id='cantSol"+cMat+"'></td>";
	tr += "<td id='solped"+cMat+"'></td>";
	tr += "<td id='cantS"+cMat+"'></td>";
	tr += "<td id='fecha"+cMat+"'></td>";
	tr += 	'<td>';
	tr += 		'<a onclick="descartarMaterial('+cMat+');">';
	tr +=			'<i class="fa fa-minus">';
	tr +=		'</a>';
	tr += '</td>';
	tr += "</tr>";
	var trf = "<tr id='reser'>";
	trf += "<td></td>";
	trf += "<td></td>";
	trf += "<td>"+$('#reservarDiv').html()+"</td>";
	trf += "<td></td>";
	trf += "<td>"+$('#solpedDiv').html()+"</td>";
	trf += "<td></td>";
	trf += "<td></td>";
	trf += "<td></td>";
	trf += "<td></td>";
	trf += "</tr>";
	$("#tfoot_Materiales").html(trf);
	$('#tbl_Materiales').append(tr);
	$('.form-control2.input-sm2').select2({
		multiple: false,
		placeholder: "Seleccione",
		width: "380px"
	});
	$('#mat'+cMat).trigger('change');
	$('#addReserva').show();
	$('#addSolped').show();
	cMat++;
	
	
}
function descartarMaterial(c){
	$('#tr'+c).remove();
	if($("#tbl_Materiales tr").length == 1){
		$('#addReserva').hide();
		$('#addSolped').hide();
		$("#reser").remove();
	}
}
function getDetalleMaterial(c){
	var id = $('#mat'+c).val();
	var campo = $('#campo_taller').val();
	$('#um'+c).empty();
	$('#stock'+c).empty();
	$('#solped'+c).empty();
	$('#cantS'+c).empty();
	$('#fecha'+c).empty();
	$.getJSON(IPSERVERSAP + "/SCLEM/JSON_ZMOV_10020.aspx?MATERIAL="+id, function(dataMat){
		$('#um'+c).html(dataMat.LT_DETALLE[0].MEINS);
	});
	$.getJSON(IPSERVERSAP + "/SCLEM/JSON_BAPI_MATERIAL_STOCK_REQ_LIST.aspx?CENTRO="+campo+"&MATERIAL="+id+"&ALMACEN=0", function(dataStock){
		console.log(dataStock);
		$('#stock'+c).html(formatNumber(dataStock.MRP_IND_LINES[0].AVAIL_QTY1));
	});
	$.getJSON(IPSERVERSAP + "/SCLEM/JSON_BAPI_REQUISITION_GETITEMS.aspx?CENTRO="+campo+"&MATERIAL="+id, function(dataSoped){
		console.log(dataSoped);
		var data = [];
		var x = 0;
		$.each(dataSoped.REQUISITION_ITEMS, function(ka,va){
			data = va;
			if(x==0){
				$('#solped'+c).html(data.PREQ_NO);
				$('#cantS'+c).html(data.QUANTITY);
				$('#fecha'+c).html(formatFecha(data.REL_DATE));
				x++;
			} else
			{
				var tr = "<tr>";
					tr += "<td></td>";
					tr += "<td></td>";
					tr += "<td></td>";
					tr += "<td></td>";
					tr += "<td></td>";
					tr += "<td>"+data.PREQ_NO+"</td>";
					tr += "<td>"+data.QUANTITY+"</td>";
					tr += "<td>"+formatFecha(data.REL_DATE)+"</td>";
					tr += "</tr>";
					$('#tbl_Materiales').append(tr);
			}
			//data = va;
		})
		/*if(dataSoped.REQUISITION_ITEMS.length > 0) {
			$('#solped'+c).html(data.PREQ_NO);
			$('#cantS'+c).html(data.QUANTITY);
			$('#fecha'+c).html(formatFecha(data.REL_DATE));
		}*/
	});
}

function reservar(id){
	if(!$('#BoxFecha').val()){
		alerta("Ingrese Fecha");
		return;
	}
	var fecha = "";
	var codMat = "";
	var cantMat = "";
	var ceco = "";
	var almacen = "";
	var campo = "";
	listMateriales();
	fecha = formatFecha($('#BoxFecha').val());
	console.log(fecha);
	fecha = fecha.replace("-", "").replace("-", "");
	console.log(fecha);
	campo = $('#campo_taller').val();
	var mat = {};
	mat.MATERIALES = listMateriales();
	var materiales = JSON.stringify(mat);
	var url  = IPSERVERSAP + "/SCLEM/JSON_BAPI_RESERVATION_CREATE1.aspx?FECHA="+fecha+"&ALMACEN=9000&ALMACENDESTINO="+"&MATERIALES="+materiales+"&CENTRO="+campo+"&MOVIMIENTO=201&CENTROCOSTO=AS01CGA001&EQUIPO="+$('#vehiculo_taller').val();
	console.log(url);
	$.getJSON(url, function(response){
			if(response.RESERVATION != 0){
				$('#nreserva').val(response.RESERVATION);
				alerta("Se ha reservado con éxito, número de reserva "+response.RESERVATION);
			} else {
				var mensaje = "";
				$.each(response.RETURN, function(key, val){
					mensaje += val.MESSAGE+"<br>";
				});
				alerta(mensaje);
			}
		});
	$('#addReserva').attr('disabled','disabled');
}

function solped(id){
	if(!$('#BoxFecha').val()){
		alerta("Ingrese Fecha");
		return;
	}
	var fecha = "";
	var codMat = "";
	var cantMat = "";
	var ceco = "";
	var almacen = "";
	var campo = "";
	fecha = formatFecha($('#BoxFecha').val()).replace("-", "").replace("-", "");
	var mat = {};
	mat.MATERIALES = listMaterialesSolped();
	var materiales = JSON.stringify(mat);
	campo =  $('#campo_taller').val();
	almacen = '9000';
	var url  = IPSERVERSAP + "/SCLEM/JSON_BAPI_REQUISITION_CREATE.aspx?FECHA="+fecha+"&MATERIALES="+materiales+"&ALMACEN="+almacen+"&CENTRO="+campo+"&CENTROCOSTO=AS01CGA001&EQUIPO="+$('#vehiculo_taller').val();
	console.log(url);
	$.getJSON(url, function(response){
		if(response.NUMBER != ""){
			alerta("Se ha realizado la solicitud de pédido "+response.NUMBER);
		} else {
			var mensaje = "";
			$.each(response.RETURN, function(key, val){
				mensaje += val.MESSAGE+"<br>";
			});
			alerta(mensaje);
		}
	});
	$('#addSolped').attr('disabled','disabled');
}

function listMateriales(){
	var arrayListMat = [];
	for (var i=0; i<cMat; i++) {
	   if($('#mat'+i).val() != undefined){
		   console.log(1);
		   	if($('#mat'+i).val() != "" &&  $('#cant'+i).val() != ""){
		   		var arrayList = {};
				arrayList.COD = $('#mat'+i).val();
				arrayList.CANTIDAD = parseFloat($('#cant'+i).val()).toFixed(3);
				arrayListMat.push(arrayList);
		   	} 	
	   } 
	}
	return arrayListMat;
	
}
function listMaterialesSolped(){
	var arrayListMat = [];
	for (var i=0; i<cMat; i++) {
		if($('#mat'+i).val() != undefined){
			//if($("#cbMaterial"+i).is(':checked')){	
			console.log($('#cantSol'+i).val());
				if($('#mat'+i).val() != "" &&  $('#cantSol'+i).val() != ""){
			   		var arrayList = {};
					arrayList.COD = $('#mat'+i).val();
					arrayList.CANTIDAD = parseFloat($('#cantSol'+i).val()).toFixed(3);
					arrayListMat.push(arrayList);
			   	}
			//}
	   } 
	}
	return arrayListMat;
	
}

function formatNumber(num) {
    if (!num || num == 'NaN') return '-';
    if (num == 'Infinity') return '&#x221e;';
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + ',' + cents);
} 

function selectTodo(){
	console.log($("#cbSelect").is(':checked'));
	if($("#cbSelectTodo").is(':checked')){
		$('.cbMaterial').prop('checked', true);
	} else {
		$('.cbMaterial').prop('checked', false);
	}
}
