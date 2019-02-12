
var dataTable;
var arrayCambio = ['','Primera','Segunda','Tercera','Cuarta','Quinta','No Aplica','Segun instrucción adjunta'];
var arrayMarcha = ['','Lenta','Media','Rápida','','','No Aplica','Segun instrucción adjunta'];
var arrayMaquinaria  = [];
var arrayImplemento  = [];
$(document).ready(function(){
	$.fn.dataTable.ext.errMode = 'none';
});
var especie;
var variedad;
var SESION = getVars();
var CUARTEL = getCuartel();
var detalleCuartel;
var dataListaConsumo = [];
function cargaData(){
	dataListaOrdenes = [];
	$.ajax({
		url: "/simpleWeb/json/AGRO/reporte_fitosanitario/"+$("#campo_rendimiento").val(),
		type : "GET",
		async: false,
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success: function(data){
			console.log(data)
			dataListaConsumo = data;
			loadInfo();
		}
	});
}

var nReserva         = [];
var nConsumo         = [];
var nDevolucion      = [];
var nSobreConsumo    = [];
var canridadRetirada = [];
function loadInfo(){
	if(dataTable){
		dataTable.destroy();
        $('#tbl_Reporte').empty(); 
	}
	console.log(dataListaConsumo);
	var datos = [];
	$("#loading").show();
	var count = 0;
	setTimeout(function(){
		var docMaterial = "";
		$.each(dataListaConsumo, function(k,v){
			
			var idPrograma = 'FP';
			if(v.idPrograma > 0){
				idPrograma = v.idPrograma;
			}
			if(nReserva.indexOf(v.reserva) == -1){
				nReserva.push(v.reserva);
				var urlReserva = IPSERVERSAP + "JSON_ZMOV_10025.aspx?RESERVA="+v.reserva;
				var arrayReserva = [];
				$.ajax({
					url: urlReserva,
					type : "GET",
					dataType: 'json',
					async: false,
					success: function(data){
						arrayReserva = data.T_SALIDA;
					}
				});
				$.each(arrayReserva, function(kr, vr){
					if(canridadRetirada[parseInt(vr.MATNR)] == undefined){
						canridadRetirada[parseInt(vr.MATNR)] = 0;
					}
					if(vr.LGORT == 'TRAN') {
						if(vr.IANUL == '') {
							canridadRetirada[parseInt(vr.MATNR)] +=  vr.MENGE;
						} else {
							canridadRetirada[parseInt(vr.MATNR)] -=  vr.MENGE;
						}
					}
				});
			}
			if(nConsumo.indexOf(v.docConsumo) == -1){
				nConsumo.push(v.docConsumo);
				var urlConsumo = IPSERVERSAP + "JSON_BAPI_GOODSMVT_GETDETAIL.aspx?DOCUMENTO="+v.docConsumo+"&ANO="+v.periodo;
				console.log(urlConsumo)
				var arrayConsumo = [];
				$.ajax({
					url: urlConsumo,
					type : "GET",
					dataType: 'json',
					async: false,
					success: function(data){
						arrayConsumo = data.GOODSMVT_ITEMS;
					}
				});
				$.each(arrayConsumo, function(kr, vr){
					if(nConsumo[parseInt(vr.MATERIAL)] == undefined){
						nConsumo[parseInt(vr.MATERIAL)] = 0;
					}
					if(vr.STGE_LOC == 'TRAN') {
						nConsumo[parseInt(vr.MATERIAL)] +=  vr.ENTRY_QNT;
					}
					docMaterial = vr.MAT_DOC;
				});
			}
			datos.push([
	            v.campo,  
	            idPrograma, 
	            v.idOrden, 
	            docMaterial,
	            v.reserva,
	            v.codigo_material,
	            arrayMaterial[v.codigo_material],
	            arrayUM[v.codigo_material],
	            v.cantidad,
	            canridadRetirada[v.codigo_material].toFixed(3),
	            nConsumo[v.codigo_material].toFixed(3),
	            v.devolucion,
	            v.sobreConsumo		            
            ]);
			if(count == 0){
				console.log(datos);
			}
			count++;
		})
		dataTable = $('#tbl_Reporte').DataTable({
			data: datos,
			columns: [
			    { title: "Campo" },
			    { title: "Id Programa" },   
			    { title: "Id Orden" },
			    { title: "Doc. Material" },
			    { title: "Reserva" },   
			    { title: "Codigo Material" },
			    { title: "Material" },
			    { title: "UM" }, 
			    { title: "Cantidad Programada" },   
			    { title: "Cantidad Retirada" },
			    { title: "Cantidad Aplicada" },     
			    { title: "Cabtidad Devolución" },
			    { title: "Cabtidad Sobreconsumo" }     
			],
			ordering: false,
			fixedHeader: true
		});
		var tbl = "";
		$("#tbl_Reporte_filter").hide();
	
		$('#tbl_Reporte_paginate').css('text-align','center');
		$('.buttons-excel').addClass('btn btn-circle red btn-outline');
		$('.buttons-pdf').addClass('btn btn-circle red btn-outline');
		$('#tbl_Reporte_length').hide();
		$("#loading").hide();
	},500);
}

var arrayMaterial  = [];
var arrayIActivo   = [];
var arrayUM        = [];
var arrayReingreso = [];
function getMaterial(){
	arrayMaterial  = [];
	arrayIActivo   = [];
	arrayUM        = [];
	arrayReingreso = [];
	console.log(IPSERVERSAP + "JSON_ZMOV_10020.aspx?FAMILIA=ZQCO");
	$.ajax({
		//url: "/simpleWeb/json/AGRO/GETMA/",
		url: IPSERVERSAP + "JSON_ZMOV_10020.aspx?FAMILIA=ZQCO",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			$.each(data.LT_DETALLE, function(k,v){
				arrayMaterial[parseInt(v.MATNR)]  = v.MAKTX;
				arrayIActivo[parseInt(v.MATNR)]   = v.IACTIVO;
				arrayUM[parseInt(v.MATNR)]        = v.MEINS;
				arrayReingreso[parseInt(v.MATNR)] = v.REINGRESO;
			});
		}
	})
	//console.log(IPSERVERSAP + "JSON_ZMOV_10020.aspx?FAMILIA=ZFER");
	$.ajax({
		//url: "/simpleWeb/json/AGRO/GETMA/",
		url: IPSERVERSAP + "JSON_ZMOV_10020.aspx?FAMILIA=ZFER",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			$.each(data.LT_DETALLE, function(k,v){
				arrayMaterial[parseInt(v.MATNR)]  = v.MAKTX;
				arrayIActivo[parseInt(v.MATNR)]   = v.IACTIVO;
				arrayUM[parseInt(v.MATNR)]        = v.MEINS;
				arrayReingreso[parseInt(v.MATNR)] = v.REINGRESO;
			});
			
		}
	})
/*	var sortResults=function(json,prop, asc) {
        json = json.sort(function(a, b) {
	        if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
	        else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
	    });
        return json;
	};
	sortResults(arrayMaterial[0],'MAKTX','asc');
	sortResults(arrayMaterial[1],'MAKTX','asc'); */
	console.log(arrayUM);
}
getMaterial();
console.log(arrayUM);


var arrayMaquinaria = [];
function getMaquinaria(c){
	console.log(IPSERVERSAP + "JSON_BAPI_EQUI_GETLIST.aspx?CENTRO="+c);
	arrayMaquinaria = [];
	$.ajax({
		url: IPSERVERSAP + "JSON_BAPI_EQUI_GETLIST.aspx?CENTRO="+c,//ZREP
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			$.each(data.EQUIPMENT_LIST, function(k,v){
				arrayMaquinaria[parseInt(v.EQUIPMENT)] = v.DESCRIPT;
			});
			
		}
	})
	console.log(arrayMaquinaria);
}


function formatNumber2(num) {
    if (!num || num == 'NaN') return '0';
    if (num == 'Infinity') return '&#x221e;';
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 1000 + 0.50000000001);
    //console.log(num);
    cents = num % 1000;
    //console.log(cents);
    num = Math.floor(num / 1000).toString();
    if (cents < 100)
        cents = "0" + cents;
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + ',' + cents);
}
function formatNumber(num) {
    if (!num || num == 'NaN') return '0';
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