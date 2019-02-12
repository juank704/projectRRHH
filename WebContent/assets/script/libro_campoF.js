/*
var dataTable = $('#tbl_ListaRendimiento').DataTable({
	dom: 'Bfrtip',
    buttons: [
        'excel'
    ],
	"sPaginationType": "full_numbers" ,
	"filter": false,
	//"ordering": true,
	 "order": [[ 0, "desc" ]],
	 scrollY:        "400px",
     scrollX:        true,
     scrollCollapse: true,
     paging:         true,
     fixedColumns:   {
         //leftColumns: 1
         //,leftColumns: 2
     }
	
});
$('#tbl_ListaRendimiento_paginate').css('text-align','center');
$('.buttons-excel').addClass('btn btn-circle red btn-outline');
//$('.buttons-pdf').addClass('btn btn-circle red btn-outline');
$('#tbl_ListaAplicaciones_length').hide();*/

var dataTable;
$("#ver").click(function(){
	loadInfo();
	//getMaquinaria($(this).val());
	//console.log(arrayMaquinaria);
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
//getMaquinaria($("#dataHuerto").val());
$("#dataHuerto").change(function(){
	//getMaquinaria($(this).val());
});
//var arrayMaquinaria = [];
//function getMaquinaria(campo){
//	var url = "/simpleWeb/json/AGRO/GETMAQUINARIAS_PF/"+campo;
//	console.log(url);
//	$.ajax({
//		url: url,
//		type:	"GET",
//		dataType: 'json',
//		async: false,
//		success: function(data){
//			$.each(data, function(ks,va){
//				if(arrayMaquinaria[va.codigo_pf] == undefined){
//					console.log('si');
//					arrayMaquinaria[va.codigo_pf] = [];
//				} else {
//					console.log('no');
//				}
//				var tempMaq = {};
//				tempMaq.maquinaria = va.maquinaria;
//				tempMaq.implemento = va.implemento;				
//				arrayMaquinaria[va.codigo_pf].push(tempMaq);
//			})
//		}
//	})
//	console.log(arrayMaquinaria);
//}
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
	/*$("#loading").show();
	var url = "/simpleWeb/json/AGRO/LIBROCAMPO2/"+$("#dataHuerto").val();
	//console.log(url);
	var row = {};
	
	row.campo = $("#dataHuerto").val();
	dataTable.clear().draw();
//	console.log(url);
//	console.log(arrayMaterial);
//	console.log(arrayUM);
//	console.log(arrayIActivo);
//	console.log(arrayReingreso);
	setTimeout(function(){
	$.ajax({
		url: url,
		type:	"GET",
		dataType: 'json',
		//data : JSON.stringify(row),
		async: false,
		success: function(data){
			console.log(data);
			$.each(data, function(k,v){
				
				var um = arrayUM[v.codigo_material];
				if(arrayUM[v.codigo_material] == 'L'){
					um = 'CC';
				}
				if(arrayUM[v.codigo_material] == 'KG'){
					um = 'Grm';
				}
				var maquinaria = "";	
				var implemento = "";
				var xx = 0;
//				$.each(arrayMaquinaria[v.codigo_pf] ,function(kk,vv){
//					if(xx == 0){
//						maquinaria += vv.maquinaria;
//						implemento += vv.implemento;
//					} else {
//						maquinaria += "-"+vv.maquinaria;
//						implemento += "-"+vv.implemento;
//					}
//					
//					xx++;
//				});
				console.log(maquinaria);
				var tbl = [
				           v.idOrden,
				           v.campo,
				           v.nombre_especie, 
				           v.nombre_variedad, 
				           v.nombre_cuartel, 
				           formatNumber(v.has_real), 
				           formatFecha(v.fecha_inicio),
				           v.nombre_tipo_control,
				           arrayMaterial[v.codigo_material], 
				           arrayIActivo[v.codigo_material],
						   arrayReingreso[v.codigo_material],
				           v.estado_fenologico, 
				           v.forma_apliacion,
				           v.aplicador,	
				           v.jefe_aplicacion, 
				           arrayCarencia[v.codigo_material],
				           formatFecha(v.fecha_viable_cosecha),
				           "",
				           "",
				           formatNumber2(v.detalleMaterial.CALCIO),
				           formatNumber2(v.detalleMaterial.COBRE),
		        		   formatNumber2(v.detalleMaterial.FIERRO),
        				   formatNumber2(v.detalleMaterial.POTASIO),
						   formatNumber2(v.detalleMaterial.MANGANESO),
						   formatNumber2(v.detalleMaterial.MANGANESIO),
						   formatNumber2(v.detalleMaterial.NITROGENO),
						   formatNumber2(v.detalleMaterial.FOSFORO),
						   formatNumber2(v.detalleMaterial.AZUFRE),
						   formatNumber2(v.detalleMaterial.ZINC)
				           ];
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
	},500);
	*/
	
	if(dataTable){
		dataTable.destroy();
        $('#tbl_LibroCampo').empty(); 
	}
	var datos = [];
	$("#loading").show();
	var url = "/simpleWeb/json/AGRO/LIBROCAMPO2/"+$("#dataHuerto").val();
	setTimeout(function(){
		$.ajax({
			url: url,
			type:	"GET",
			dataType: 'json',
			//data : JSON.stringify(row),
			async: false,
			success: function(data){
				
				$.each(data, function(k,v){
					var um = arrayUM[v.codigo_material];
					if(arrayUM[v.codigo_material] == 'L'){
						um = 'CC';
					}
					if(arrayUM[v.codigo_material] == 'KG'){
						um = 'Grm';
					}
					var maquinaria = "";	
					var implemento = "";
					var xx = 0;
					datos.push([
							v.idOrden,
							v.campo,
							v.nombre_especie, 
							v.nombre_variedad, 
							v.nombre_cuartel, 
							formatNumber(v.has_real), 
							formatFecha(v.fecha_inicio),
							v.nombre_tipo_control,
							arrayMaterial[v.codigo_material], 
							arrayIActivo[v.codigo_material],
							arrayReingreso[v.codigo_material],
							v.estado_fenologico, 
							v.forma_apliacion,
							v.aplicador,	
							v.jefe_aplicacion, 
							arrayCarencia[v.codigo_material],
							formatFecha(v.fecha_viable_cosecha),
							"",
							"",
							formatNumber2(v.detalleMaterial.CALCIO),
							formatNumber2(v.detalleMaterial.COBRE),
							formatNumber2(v.detalleMaterial.FIERRO),
							formatNumber2(v.detalleMaterial.POTASIO),
							formatNumber2(v.detalleMaterial.MANGANESO),
							formatNumber2(v.detalleMaterial.MANGANESIO),
							formatNumber2(v.detalleMaterial.NITROGENO),
							formatNumber2(v.detalleMaterial.FOSFORO),
							formatNumber2(v.detalleMaterial.AZUFRE),
							formatNumber2(v.detalleMaterial.ZINC)		            
			            ]);
				});
			}
		});
		console.log(datos);
		dataTable = $('#tbl_LibroCampo').DataTable({
			data: datos,
			columns: [
			    { title: "N OA" },
			    { title: "Predio" , "width": "100px" },   
			    { title: "Especie" },   
			    { title: "Variedad" ,"width": "100px" },
			    { title: "Cuartel" ,"width": "200px"},
			    { title: "Ha Cuartel" }, 
			    { title: "Fecha Aplicación" ,"width": "100px" },   
			    { title: "Para Control de" ,"width": "100px"},
			    { title: "Nombre Comercial" ,"width": "150px" },     
			    { title: "Ingrediente Activo" ,"width": "150px" },
			    { title: "Fecha Reingreso" ,"width": "100px" },
			    { title: "Estado Fenológico" }, 
			    { title: "Forma de Aplicación" }, 
			    { title: "Pesona que aplicó" ,"width": "150px"},   
			    { title: "Dosificador" ,"width": "150px" },   
			    { title: "Carencia" },   
			    { title: "Fecha Viable" ,"width": "100px"},   
			    { title: "H.I" },   
			    { title: "H.T" },   
			    { title: "Suma de Uni. Há Ca" },   
			    { title: "Suma de Uni. Há Cu" },   
			    { title: "Suma de Uni. Há Fe" },   
			    { title: "Suma de Uni. Há K" },   
			    { title: "Suma de Uni. Há Mg" },   
			    { title: "Suma de Uni. Há Mn" },   
			    { title: "Suma de Uni. Há N" },   
			    { title: "Suma de Uni. Há P" },   
			    { title: "Suma de Uni. Há S" },   
			    { title: "Suma de Uni. Há Zn" }
			],
			ordering: false,
			fixedHeader: true,
			dom: 'Bfrtip',
		    buttons: [
		        'excel'
		    ],
			"sPaginationType": "full_numbers" ,
			"filter": false,
			//"ordering": true,
			 "order": [[ 0, "desc" ]],
			 scrollY:        "700px",
		     scrollX:        true,
		     scrollCollapse: true,
		     paging:         true
		});
		var tbl = "";
		$("#tbl_LibroCampo_filter").hide();
	
		$('#tbl_LibroCampo_paginate').css('text-align','center');
		$('.buttons-excel').addClass('btn btn-circle red btn-outline');
		$('.buttons-pdf').addClass('btn btn-circle red btn-outline');
		$('#tbl_LibroCampo_length').hide();
		$("#loading").hide();
	},500);
}


function commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val;
}

var arrayMaterial  = [];
var arrayIActivo   = [];
var arrayUM        = [];
var arrayReingreso = [];
var arrayCarencia  = [];
function getMaterial(){
	console.log(IPSERVERSAP + "JSON_ZMOV_10020.aspx?FAMILIA=ZQCO");
//	$.ajax({
//		//url: "/simpleWeb/json/AGRO/GETMA/",
//		url: IPSERVERSAP + "JSON_ZMOV_10020.aspx?FAMILIA=ZQCO",
//		type:	"GET",
//		dataType: 'json',
//		async: false,
//		success: function(data){
//			$.each(data.LT_DETALLE, function(k,v){
//				arrayMaterial[parseInt(v.MATNR)]  = v.MAKTX;
//				arrayIActivo[parseInt(v.MATNR)]   = v.IACTIVO;
//				arrayUM[parseInt(v.MATNR)]        = v.MEINS;
//				arrayReingreso[parseInt(v.MATNR)] = v.REINGRESO;
//			});
//		}
//	})
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
				arrayCarencia[parseInt(v.MATNR)]  = v.CARENCIA;
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
	
}
getMaterial();
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