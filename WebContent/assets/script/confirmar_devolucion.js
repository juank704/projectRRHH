
var dataTable = $('#tbl_ListaAplicaciones').DataTable({
	dom: 'Bfrtip',
    buttons: [
        'excel', 'pdf'
    ],
	"sPaginationType": "full_numbers" ,
	"filter": false,
	//"ordering": true,
	 "order": [[ 0, "desc" ]]
	
});
var arrayMaquinaria  = [];
var arrayImplemento  = [];
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
		}
	})
	return campoSesion;
}
getHuertos();
console.log(arrayCampo);
var selectHuerto = "";
$.each(arrayCampo, function(ks,va){
	selectHuerto += "<option value='"+va.campo+"'>"+va.descripcion+"</option>";
})
$("#dataHuerto").append(selectHuerto);
$("#dataHuerto").change(function(){
	loadInfo();
});

$(document).ready(function(){
	$.fn.dataTable.ext.errMode = 'none';
	if($("#perfilUS").val() == "sc"){
		var enMantencion = document.getElementsByName("enMantencion");
		for(var i = 0; i < enMantencion.length; i++){
			$(enMantencion[i]).click(function(){
				alert("Menu en mantenimiento, no se puede acceder por el momento");
				this.setAttribute("href", "#");
				return;
			})
		}
	}
});
var especie;
var variedad;
var SESION = getVars();
var CUARTEL = getCuartel();
var detalleCuartel;
var dataListaOrdenes = [];
$.ajax({
	url: "/simpleWeb/json/AGRO/LISTA_APLICACIONES_PENDIENTE/",
	type : "GET",
	beforeSend : function(xhr) {
		xhr.setRequestHeader("Accept","application/json");
		xhr.setRequestHeader("Content-Type","application/json");
	},
	success: function(data){
		dataListaOrdenes = data;
		loadInfo();
	}
});
function loadInfo(){
	dataTable.clear().draw();			
	$.each(dataListaOrdenes, function(k,v){
		console.log(v);
		if(v.codCampo == $('#dataHuerto').val()){
			var boton = "";
			if(v.estado == 'Pendiente Devolución'){
				var boton = "<button   title='Reservar' onclick='cerrar("+v.numero_orden+","+v.codigo+",0)' class='btn yellow btn-outline btn-sm' ><i class='fa fa-pencil-square-o fa-lg'></i></button>" ;
			}
			if(v.estado == 'Rechazado Pendiente Devolución'){
				var boton = "<button   title='Reservar' onclick='cerrar("+v.numero_orden+","+v.codigo+",1)' class='btn yellow btn-outline btn-sm' ><i class='fa fa-pencil-square-o fa-lg'></i></button>" ;
			}
			var idPrograma = 'FP';
			if(v.idPrograma >  0){
				idPrograma = v.idPrograma;
			}
			
			var tbl = [v.idorden,idPrograma,v.campo,v.nombre_aplicador,formatFecha(v.fecha_estimada_aplicacion),v.estado_fenologico,
			          v.mercado,v.forma_aplicacion,v.estado,boton];
			var rowNode = dataTable
		    .row.add( tbl )
		    .draw()
		    .node();
		}
		
	})
	$('#tbl_ListaAplicaciones_paginate').css('text-align','center');
	$('.buttons-excel').addClass('btn btn-circle red btn-outline');
	$('.buttons-pdf').addClass('btn btn-circle red btn-outline');
	$('#tbl_ListaAplicaciones_length').hide();
	$("#loading").hide();
}
function cambioCampo(campo){
	var campo = $("#dataHuerto").val();
	filterTable();
}
var arrayListaNot = [];
var arrayCua = [];
function cerrar(id,orden, tipo){
	$("#loading").show();
	setTimeout(function(){
		var arrayMaterial = "";
		var urlDetalle = "/simpleWeb/json/AGRO/LISTA_ORDEN_DETALLE/"+id;
		console.log(urlDetalle);
		arrayListaNot = [];
		$.ajax({
			url: urlDetalle,
			type:	"GET",
	//		data : JSON.stringify(row),
			dataType: 'json',
			async: false,
			success: function(data){
				arrayListaNot = data;
			}
		})
		
		var detalleCierre = "";
		detalleCierre +='<div class="table-responsive">';
		detalleCierre +='<div class="col-xs-12 col-sm-6 col-md-3 ">';
		detalleCierre +='<label style="color: #337ab7;" >Fecha devolución: </label>';
		detalleCierre +='<div style="width: 100%;">';
		detalleCierre +="	<input size='16' type='text' name='fecha' style='width:130px' class='form-control' " +
		"value='"+formatFecha(dateHoy())+"' id='fechaDevolucion"+id+"' readonly onchange='valFechaHoy(this.id)'>";
		detalleCierre +='</div>';
		detalleCierre +='</div>';
		detalleCierre +='</div>';
		detalleCierre +='<div class="table-responsive">';
		detalleCierre +=	'<table class="table table-striped table-condensed table-bordered" id="tbl_colaboradores">';
		detalleCierre +=		'<thead style="text-align: center;">';
		detalleCierre +=			'<tr>';
		detalleCierre +=				'<th style="text-align: center;">Codigo Material</th>';
		detalleCierre +=				'<th style="text-align: center;">Material</th>';
		detalleCierre +=				'<th style="text-align: center;">Devolución Pactada</th>';
		detalleCierre +=				'<th style="text-align: center;">Cantidad Devuelta</th>';
		detalleCierre +=				'<th style="text-align: center;">Cantidad a Devolver</th>';
		detalleCierre +=				'<th style="text-align: center;">Cantidad Sobreconsumo</th>';
		detalleCierre +=				'<th style="text-align: center;">UM</th>';
		detalleCierre +=			'</tr>';
		detalleCierre +=		'</thead>';
		detalleCierre +=		'<tbody>';
		var t = 4;
		$.each(arrayListaNot.lista_materiales, function(km, vm){
			var dataMat = [];
			$.ajax({
				url: IPSERVERSAP + "JSON_ZMOV_10020.aspx?MATERIAL="+vm.codigo_material,
				type:	"GET",
	//			data : JSON.stringify(row),
				dataType: 'json',
				async: false,
				success: function(data){
					dataMat = data;
				}
			})
			console.log(vm);
			var dev = vm.devolucion;
			var dif = parseFloat(vm.devolucion) - parseFloat(vm.cantidad_devolucion);
			detalleCierre += '<tr>';
			detalleCierre += '<td style="text-align: center;">'+vm.codigo_material+'</td>';
			detalleCierre += '<td style="text-align: center;">'+dataMat.LT_DETALLE[0].MAKTX+'</td>';
			detalleCierre += '<td style="text-align: center;" id="devpa'+vm.codigo+'">'+formatNumber2(dev)+'</td>';
			detalleCierre += '<td style="text-align: center;" id="devpe'+vm.codigo+'">'+formatNumber2(vm.cantidad_devolucion)+'</td>';
			detalleCierre += '<td style="text-align: center;"><input type="text" id="devr'+vm.codigo+'" class="form-control" value="'+formatNumber2(dif)+'" onchange="valMax(\''+vm.codigo+'\',\''+dif+'\',1)" ></td>';
			if(tipo == 0){
				detalleCierre += '<td style="text-align: center;"><input type="text" id="difr'+vm.codigo+'" class="form-control" value="0" onchange="valMax(\''+vm.codigo+'\',\''+dif+'\',2)" ></td>';
			} else {
				t = 5;
				detalleCierre += '<td style="text-align: center;"><input type="text" id="difr'+vm.codigo+'" disabled class="form-control" value="0" onchange="valMax(\''+vm.codigo+'\',\''+dif+'\',2)" ></td>';
			}
			detalleCierre += '<td style="text-align: center;" id="um'+vm.codigo+'">'+dataMat.LT_DETALLE[0].MEINS+'</td>';
			detalleCierre += '</tr>';
		});
		detalleCierre +=		'</tbody>';
		detalleCierre +=		'</table>';
		detalleCierre +='<div class="col-sm-12 col-md-12">';
		detalleCierre +=		'<td><div class="btn btn-circle green-dark btn-outline" onclick="devolucion('+id+','+orden+','+t+')" id="dev'+id+'"><i class="fa fa-clock-o"></i> Generar Devolución</div></td>';
		detalleCierre +='</div>';
		detalleCierre +='</div>';
		$("#loading").hide();
		popUp("Detalle Devolución de Aplicación", detalleCierre, true, "800px", true);
		fechas();
		arrayCua = [];
		var total = 0;
		var x = 0;
		$.each(arrayListaNot.lista_cuarteles, function(k, v){
			console.log(v);
			if(v.estado != '' ) {
				total += parseFloat(v.has_real);
				x++;
			}
		})
		var tpor = 0;
		$.each(arrayListaNot.lista_cuarteles, function(k, v){
			if(v.estado != '' ) {
				x--;
				var por = 0;
				
				if(x > 0) {
					console.log(x);
					por = v.has_real / total * 100;
					tpor += por;
				} else {
					console.log(x);
					por = 100 - tpor;
					
				}
				var listCuartel = {};
				listCuartel.tipo = v.tipo;
				listCuartel.ceco = v.ceco;
				listCuartel.porc = por;
				arrayCua.push(listCuartel);
			}
		})
		console.log(arrayCua);
	},500);
	
}

function valMax(id, value,o){
	var dev = $("#devr"+id).val();
	dev = dev.replace(".",'');
	dev = dev.replace(",",".");
	dev = parseFloat(dev);
	var dif = $("#difr"+id).val();
	dif = dif.replace(".",'');
	dif = dif.replace(",",".");
	dif = parseFloat(dif);
	var total = dev + dif;
	if(total > value){
		alerta("la suma de la devolución con sobre consumo no puede superar ("+value+")");
		if(o == 1){
			var d = value - dif;
			d = formatNumber2(d);
			$("#devr"+id).val(d);
		} else {
			var d = value - dev;
			d = formatNumber2(d);
			$("#difr"+id).val(d);
		}		
		return false;
	}
}

function devolucion(id, orden,tipo){
	$("#loading").show();
	setTimeout(function(){
	var arrayMaterial = [];
	var campo = $('#dataHuerto').val();
	console.log(arrayListaNot);
	var fecha2 = formatFecha($('#fechaDevolucion'+id).val());	
	fecha2 = fecha2.replace("-", "").replace("-", "");
	var confirmAplicacion = {};
	confirmAplicacion.codigo = id;
	confirmAplicacion.lista_materiales = [];
	confirmAplicacion.codigo_orden = orden;
	var x = 0;
	var y = 0;
	var arrayListMerma = [];
	var totalDif = 0;
	$.each(arrayListaNot.lista_materiales, function(km, vm){
		console.log("#devr"+vm.codigo);
		console.log($("#devr"+vm.codigo).val());
		var dev = $("#devr"+vm.codigo).val();
		dev = dev.replace(".","");
		dev = dev.replace(",",".");
		dev = parseFloat(dev);
		if($("#devr"+vm.codigo).val() != "" && dev > 0) {
			var devolucion = $("#devr"+vm.codigo).val().replace(".","");
			var arrayList             = {};
			arrayList.MATERIAL        = vm.codigo_material;
			arrayList.CANTIDAD        = devolucion;			
			arrayList.ALMACEN_ORIGEN  = 'TRAN';
			arrayList.ALMACEN_DESTINO = vm.almacen;
			arrayList.UNIDAD 		  = $("#um"+vm.codigo).html();
			arrayMaterial.push(arrayList);
			
						
			x++;
		}
		
		var dif = $("#difr"+vm.codigo).val();
		dif = dif.replace(".","");
		dif = dif.replace(",",".");
		dif = parseFloat(dif);
		if($("#difr"+vm.codigo).val() != "" && dif > 0) {
			totalDif = 0;
			var contLineas = 0;
			console.log(arrayCua.length);
			$.each(arrayCua, function(km, vc){
				var diferencia = dif * vc.porc / 100;
				totalDif += parseFloat(diferencia.toFixed(3));
				console.log(totalDif);
				contLineas++;
				if(arrayCua.length == contLineas){
					console.log("siiiii");
					diferencia = dif - (totalDif - diferencia);
					console.log(diferencia);
				}
				var arrayListMerm = {};
				arrayListMerm.COD         = vm.codigo_material;
				arrayListMerm.CANTIDAD    = diferencia.toFixed(3);
				arrayListMerm.CENTROCOSTO = vc.ceco;
				arrayListMerm.TIPO        = vc.tipo;
				if(parseFloat(diferencia.toFixed(3)) > 0){
					arrayListMerma.push(arrayListMerm);
				}
				y++;
			});
		}
		var arrayList2 = {};
		arrayList2.codigo = vm.codigo;
		var devolucion = $("#devr"+vm.codigo).val().replace(".","");	
		devolucion = devolucion.replace(",",".");
		devolucion = parseFloat(devolucion);
		console.log(devolucion);
		var devPac = $("#devpa"+vm.codigo).html().replace(".","");
		devPac     = devPac.replace(",",".");
		devPac     = parseFloat(devPac);
		console.log(devPac);
		
		var diff = $("#difr"+vm.codigo).val().replace(".","");
		diff     = diff.replace(",",".");
		diff     = parseFloat(diff);
		console.log(diff);
		var devPen = $("#devpe"+vm.codigo).html().replace(".","");
		devPen     = devPen.replace(",",".");
		devPen     = parseFloat(devPen);
		console.log(devPen);
		arrayList2.devolucion = devolucion;	
		console.log(devPac - devPen - devolucion - diff);
		console.log(devPac - (devPen + devolucion + diff));
		arrayList2.diferencia = devPac - (devPen + devolucion + diff);
		arrayList2.nueva_diferencia    = diff;
		confirmAplicacion.lista_materiales.push(arrayList2);
	});
	console.log(confirmAplicacion.lista_materiales);
	console.log(arrayListMerma);
	//return;
	if(x== 0 && y == 0){
		$("#loading").hide();
		alerta("Debe tener al menos un material mayor a 0 para devolver o sobreconsumo.");
		return false;
	}
	var hoy = dateHoy();
	hoy = hoy.split("-");
	var fecha = hoy[0]+hoy[1]+hoy[2];
	
	var param = {};
	var parametro = {};
	param.OBJETOENTRADA = [];
	parametro.BAPI    = "BAPI_MIGO_311";
	parametro.RUNTEST = "false";
	parametro.PARAMETROS = {};
	parametro.PARAMETROS.FECHA 		= fecha2;
	parametro.PARAMETROS.MATERIALES = arrayMaterial;
	parametro.PARAMETROS.CENTRO 	= campo;
	parametro.PARAMETROS.MOVIMIENTO = "311";
	param.OBJETOENTRADA.push(parametro);
	var devolucion  = IPSERVERSAP + "JSON_MIGO_311_CAMPO.aspx?PARAMETRO="+JSON.stringify(param);
	var mensaje = "";
	var document = "";
	var resultaEsperado = true;	
	console.log(devolucion);
	console.log(confirmAplicacion);
	
	if(x > 0) {
		$.ajax({
			url: devolucion,
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				console.log(data);
				if(data.MATERIALDOCUMENT != ""){
					mensaje += "Devolución realizada con éxito, Número de documento "+data.MATERIALDOCUMENT + "<br>";
					document = data.MATERIALDOCUMENT;
				} else {
					resultaEsperado = false;
					//mensaje = "";
					$.each(data.RETURN, function(key, val){
						mensaje += val.MESSAGE+"<br>";
					});
				}
			} ,error : function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}
		})
		
	}
	confirmAplicacion.devolucion = document;
	
	var document2 = "";
	if(y > 0){
		var mat = {};
		mat.MATERIALES = arrayListMerma;
		materiales = JSON.stringify(mat);
		var diferencia  = IPSERVERSAP + "JSON_BAPI_GOODSMVT_CREATE_AGRO.aspx?FECHA="+fecha+"&MATERIALES="+materiales+"&CENTRO="+campo+"&ALMACEN=TRAN&MOVIMIENTO=551&CENTROCOSTO=&EQUIPO=";
		var user = "&USPAS="+SESION.user+"X*X"+SESION.pass;
		diferencia +=  user;
		console.log("diferencia: " +diferencia);
		//return;
		$.ajax({
			url: diferencia,
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				console.log(data);
				if(data.MATERIALDOCUMENT != ""){
					mensaje += "Sobre consumo realizado con éxito, Número de documento "+data.MATERIALDOCUMENT + "<br>";
					document2 = data.MATERIALDOCUMENT;
				}
				else {
					resultaEsperado = false;
					//mensaje = "";
					$.each(data.RETURN, function(key, val){
						mensaje += val.MESSAGE+"<br>";
					});
				}
			}
		})
	}
	confirmAplicacion.diferencia = document2;
	confirmAplicacion.tipo = tipo;
	//return;
	if(resultaEsperado){ 
		$.ajax({
			url : "/simpleWeb/json/AGRO/CONFIRMADEVOLUCION/",
			type : "PUT",
			data : JSON.stringify(confirmAplicacion),
			async: false,
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success : function(data, textStatus, jqXHR) {
				alerta(mensaje);
				$('.swal2-confirm').click(function(){
					closeModal();
					window.location.href = ("confirmar_devolucion");
				})
				
			},
			error : function(jqXHR, textStatus, errorThrown) {
				swal({
					  title: "Error!",
					  text: "No se ha podido registrar la infomación, consulte con el administrador del sistema",
					  type: "error",
					  confirmButtonText: "Aceptar"
				});
				if(document != ""){
					$.ajax({
						url: IPSERVERSAP + "JSON_ZMOV_CANCEL_MIGO.aspx?DOCUMENTO="+document+"&FECHAANULACION="+fecha2,
						type:	"GET",
						dataType: 'json',
						async: false,
						success: function(data){
							mensaje += "Documento "+document+" Reversado con el documento "+data.HEADRET.MATDOC_ITEM+"<br>";
						}
					})
				}
				if(document2 != ""){
					$.ajax({
						url: IPSERVERSAP + "JSON_ZMOV_CANCEL_MIGO.aspx?DOCUMENTO="+document2+"&FECHAANULACION="+fecha2,
						type:	"GET",
						dataType: 'json',
						async: false,
						success: function(data){
							mensaje += "Documento "+document2+" Reversado con el documento "+data.HEADRET.MATDOC_ITEM+"<br>";
						}
					})
				}
			}
		});
		
	} else {
		if(document != ""){
			$.ajax({
				url: IPSERVERSAP + "JSON_ZMOV_CANCEL_MIGO.aspx?DOCUMENTO="+document+"&FECHAANULACION="+fecha2,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					mensaje += "Documento "+document+" Reversado con el documento "+data.HEADRET.MATDOC_ITEM+"<br>";
				}
			})
		}
		if(document2 != ""){
			$.ajax({
				url: IPSERVERSAP + "JSON_ZMOV_CANCEL_MIGO.aspx?DOCUMENTO="+document2+"&FECHAANULACION="+fecha,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					mensaje += "Documento "+document2+" Reversado con el documento "+data.HEADRET.MATDOC_ITEM+"<br>";
				}
			})
		}
	}
	$("#loading").hide();
	alerta(mensaje);
	
		
	
	},500);
}

function cambioEspecie(especie){
	var especie = $("#especieFilter").val();
	var variedadFilter = "<option value='0'>Todos</option>";
	$.each(SESION.variedad, function(k,v){
		if(!especie || especie == 0){
			variedadFilter += "<option value='"+v.codigo+"'>"+v.variedad+"</option>";
		}else{
			for(var i = 0; i < especie.length; i++){
				if(especie[i] == v.especie){
					variedadFilter += "<option value='"+v.codigo+"'>"+v.variedad+"</option>";
				}
			}
		}
	})
	$("#variedadFilter").html(variedadFilter);
	filterTable();
}
var table = [];
function filterTable(){
	table = [];
	$('#tblInfo').html("");
	var campo = $("#dataHuerto").val();
	if(!campo){campo=0}
	var sector = $("#sectorFilter").val();
	if(!sector){sector=0}
	var especie = $("#especieFilter").val();
	if(!especie){especie=0}
	var variedad = $("#variedadFilter").val();
	if(!variedad){variedad=0}
	console.log(table);
	$.each(detalleCuartel, function(k,v){
		if(especie == 0 && campo == 0 && sector == 0 && variedad == 0){
			llenarTabla(v);
		}else{
			for(var i = 0; i < especie.length; i++){
				if(especie[i] != 0 && especie[i] == v.cod_especie){
					llenarTabla(v);
				}
			}
			for(var i = 0; i < variedad.length; i++){
				if(variedad[i] != 0 && variedad[i] == v.cod_variedad){
					llenarTabla(v);
				}
			}
			for(var i = 0; i < campo.length; i++){
				if(campo[i] != 0 && campo[i] == v.campo){
					llenarTabla(v);
				}
			}
			for(var i = 0; i < sector.length; i++){
				if(sector[i] != 0 && sector[i] == v.sector){
					llenarTabla(v);
				}
			}
		}
	})
}
function llenarTabla(v){
	$('#tblInfo').html("");
	if(table.length != 0){
		$.each(table, function(ka,va){
			if(table.indexOf(v)==-1){
				table.push(v);
			}
		})
	}else{
		table.push(v);
	}
	$.each(table, function(k,v){
		var tbl = "";
		tbl += "<tr>";
		tbl += 		"<td>"+v.codigo+"</td>";
		tbl += 		"<td>"+v.nombre+"</td>";
		tbl += 		"<td>"+v.especie+"</td>";
		tbl += 		"<td>"+v.variedad+"</td>";
		tbl += 		"<td>"+v.superficie+"</td>";
		tbl += 		"<td>"+v.ano_plantacion+"</td>";
		tbl += 		"<td>"+v.ceco+"</td>";		
		tbl += 		"<td><a onclick='javascript: edit("+v.codigo+")'><img src='../assets/layouts/layout/img/edit.png' style='width: 28px; height: 28px;'></a></td>";
		tbl += "</tr>";
		$('#tblListaAplicaciones').append(tbl);
	})
}

function confirm(e){
	window.location.href = ("detalle_aplicacion#"+e)
}

function edit(x){
	
	window.location.href = ("ordenDosificacion#"+x);
	
}
function confirmRechazar(id,ido,idP,reserva,solped){
	if(id==0){
		$("#tr0").remove();
	} else {
		//var con = confirmar("¿Está seguro de rechazar el programa seleccionado?");
		//console.log(con);
		$.getJSON("/simpleWeb/json/AGRO/RECPF/"+id, function(data){
			$.getJSON(IPSERVERSAP+"JSON_BAPI_RESERVATION_DELETE.aspx?RESERVA="+reserva, function(data2){
				var mensaje = data2.RETURN[0].MESSAGE+"<br>";
				if(data){
					mensaje += "El programa "+idP+" ha sido rechazado con éxito";
					$("#edit"+id).hide();
					$("#conf"+id).hide();
					$("#rech"+id).hide();
					alerta(mensaje);
				}
			});
			$.getJSON(IPSERVERSAP+"JSON_BAPI_PO_CHANGE.aspx?PEDIDO="+solped, function(data2){});
		});
	}
	loadInfo();
}
function doc(id){
	var content = "";
	$.getJSON ("/simpleWeb/json/map/load/"+id, function(data){
		$.each(data, function(k,v){
			content += "<h1>"+v.valor1+"</h1>";
			
			$('#jspdf').append(content);
			var docs = new jsPDF();
			var specialElementHandlers  = {
				'#ignore': function (element, renderer) {
					return true;
				},
				'#ignore_2': function (element, renderer) {
					return true;
				}
			};
			
			docs.fromHTML($('#jspdf').html(), 15, 15,{
				'width': 180,
				'elementHandlers': specialElementHandlers 
			});
			docs.output("datauri");
			//docs.save(''+v.idtest+'_'+v.valor1+'.pdf')
		})
	})
}
$("#infoExcel").click(function(){
	$("#tbl_Info").table2excel({
		exclude: "#exclude",
		filename: "kljgghf"
	});
});
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
