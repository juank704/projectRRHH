
var dataTable = $('#tbl_ListaRendimiento').DataTable({
	dom: 'Bfrtip',
    buttons: [
        'excel'
    ],
	"sPaginationType": "full_numbers" ,
	"filter": false,
	//"ordering": true,
	 "order": [[ 0, "desc" ]],
	 "language": {
         "decimal": ",",
         "thousands": "."
     }
	
});
$('#tbl_ListaRendimiento_paginate').css('text-align','center');
$('.buttons-excel').addClass('btn btn-circle red btn-outline');
//$('.buttons-pdf').addClass('btn btn-circle red btn-outline');
$('#tbl_ListaAplicaciones_length').hide();
$("#ver").click(function(){
	loadInfo();
});
var SESION = getVars();
var arrayCampo;
function getHuertos(){
	var campoSesion;
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETCAMPO/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			console.log(data);
			arrayCampo = data;
			var selectHuerto = "";
			$.each(arrayCampo, function(ks,va){
				selectHuerto += "<option value='"+va.campo+"'>"+va.descripcion+"</option>";
			})
			$("#dataHuerto").append(selectHuerto);
		}
	})
	return campoSesion;
}
getHuertos();
$(document).ready(function(){
	$.fn.dataTable.ext.errMode = 'none';
});
var especie;
var variedad;
var SESION = getVars();
var CUARTEL = getCuartel();
var detalleCuartel;
var dataListaOrdenes = [];
var checked = [];
function loadInfo(){
	var url = IPSERVERSAP + "JSON_BAPI_RESERVATION.aspx?CENTRO="+$("#dataHuerto").val();
	dataTable.clear().draw();
	console.log(url);
	$.ajax({
		url: url,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			$.each(data.RESERVATION_ITEMS, function(k,v){
				var tbl = [v.RES_NO,v.RES_ITEM,parseInt(v.MATERIAL),v.SHORT_TEXT,v.PLANT,v.STORE_LOC
				           , formatNumber2(v.QUANTITY),formatNumber2(v.WITHD_QUAN), v.UNIT, formatFecha(v.REQ_DATE)];
				var rowNode = dataTable
			    .row.add( tbl )
			    .draw()
			    .node();
			})
			$("#loading").hide();
		},error: function(er){
			console.log(er);
			$("#loading").hide();
		}
	})
}

function formatNumber2(num) {
    if (!num || num == 'NaN') return '0';
    if (num == 'Infinity') return '&#x221e;';
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 1000 + 0.50000000001);
    console.log(num);
    cents = num % 1000;
    console.log(cents);
    num = Math.floor(num / 1000).toString();
    if (cents < 100)
        cents = "0" + cents;
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + ',' + cents);
}



