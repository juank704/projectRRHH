
var dataTable = $('#tbl_ListaAplicaciones').DataTable({
	dom: 'Bfrtip',
    buttons: [
        'excel', 'pdf'
    ],
	"sPaginationType": "full_numbers" ,
	"filter": false,
	"ordering": true
	
});
var arrayAlmacen = ['','1000','2000','3000','4000','5000','','6000'];
var arrayListMat = []; 
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
	
	loadInfo();
	//$("#loading").hide();
});
var especie;
var variedad;
var SESION = getVars();
var CUARTEL = getCuartel();
var detalleCuartel;

function loadInfo(){
	

	$('#loading').show();
	//$('#tblListaAplicaciones').empty();
	var arrayNotificaciones = [];
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETNotAlert/1/1/''",
		type:	"GET",
//		data : JSON.stringify(row),
		dataType: 'json',
		async: false,
		success: function(data){
			arrayNotificaciones = data;
		}
	})
	console.log(arrayNotificaciones);
	dataTable.clear().draw();
	
		//$.getJSON("/simpleWeb/json/AGRO/GETNot/1",function(data){
			//console.log(data);
			$('#tblListaAplicaciones').html("");
			$.each(arrayNotificaciones, function(k,v){
				var boton = "<button   title='Reservar' onclick='detNotificacion("+v.codigo_tarea+")' class='btn yellow btn-outline btn-sm' ><i class='fa fa-pencil-square-o fa-lg'></i></button>" ;
				var tbl = [v.idPrograma,v.campo,v.especie,v.programa_aplicacion,formatFecha(v.fecha),v.estado_fenologico,
				           v.tipo_control,boton];
					var rowNode = dataTable
				    .row.add( tbl )
				    .draw()
				    .node();
			})
			$('#loading').hide();
		//});
		
		$('#tbl_ListaAplicaciones_paginate').css('text-align','center');
		/*$('#tbl_ListaAplicaciones').DataTable({
			"sPaginationType": "full_numbers" , "filter": false
		});*/
		$('.buttons-excel').addClass('btn btn-circle red btn-outline');
		$('.buttons-pdf').addClass('btn btn-circle red btn-outline');
	//$('#tbl_ListaAplicaciones').DataTable({
	//	"sPaginationType": "full_numbers" , "filter": false
	//});
	$('#tbl_ListaAplicaciones_length').hide();
	
}
function cambioCampo(campo){
	var campo = $("#dataHuerto").val();
	var sectorFilter = "<option value='0'>Todos</option>";
	$.each(SESION.sector, function(k,v){
		if(!campo || campo == 0){
			sectorFilter += "<option value='"+v.sector+"'>"+v.descripcion+"</option>";
		}else{
			for(var i = 0; i < campo.length; i++){
				if(campo[i] == v.campo){
					sectorFilter += "<option value='"+v.sector+"'>"+v.descripcion+"</option>";
				}
			}
		}
	})
	$("#sectorFilter").html(sectorFilter);
	filterTable();
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

function detNotificacion(id){
	var detalleNotificacion = "";
	var arrayListaNot = [];
	$.ajax({
		url: "/simpleWeb/json/AGRO/LISTA_ORDEN_DETALLE/"+id,
		type:	"GET",
//		data : JSON.stringify(row),
		dataType: 'json',
		async: false,
		success: function(data){
			arrayListaNot = data;
		}
	})
	var nreserva = '';
			
	if(arrayListaNot.nreserva != null){
		nreserva = arrayListaNot.nreserva;
	}
	var nsolped = '';
	if(arrayListaNot.solped != null){
		nsolped = v.solped;
	}
	detalleNotificacion +='<div class="table-responsive">';
	detalleNotificacion +=	'<table class="table table-striped table-condensed" id="tbl_colaboradores">';
	detalleNotificacion +=		'<thead style="text-align: center;">';
	detalleNotificacion +=			'<tr>';
	detalleNotificacion +=				'<th style="text-align: center; width:150px">Número Programa</th>';
	detalleNotificacion +=				'<th style="text-align: center;">Campo</th>';
	detalleNotificacion +=				'<th style="text-align: center;">Especie</th>';
	detalleNotificacion +=				'<th style="text-align: center;">Fecha</th>';
	detalleNotificacion +=				'<th style="text-align: center;">Estado Fenológico</th>';
	detalleNotificacion +=				'<th style="text-align: center;">Programa Aplicación</th>';
	detalleNotificacion +=				'<th style="text-align: center;">Control de</th>';
	detalleNotificacion +=				'<th style="text-align: center;">Reserva</th>';
	detalleNotificacion +=				'<th style="text-align: center;">Solped</th>'; 
	detalleNotificacion +=			'</tr>';
	detalleNotificacion +=		'</thead>';
	detalleNotificacion +=		'<tbody >';
	detalleNotificacion +=			"<td>"+arrayListaNot.idPrograma+"</td>";
	detalleNotificacion +=			"<td>"+arrayListaNot.campo+"</td>";
	detalleNotificacion +=			"<td>"+arrayListaNot.especie+"</td>";
	detalleNotificacion +=			"<td><input size='16' type='text' name='fecha' style='width:130px' class='form-control' " +
			"value='"+formatFecha(arrayListaNot.fecha_estimada_aplicacion)+"' id='fechaEst"+arrayListaNot.numero_orden+"' readonly onchange='valFechaHoy(this.id)'></td> " ;
	detalleNotificacion +=			"<td>"+arrayListaNot.estado_fenologico+"</td>";
	detalleNotificacion +=			"<td>"+arrayListaNot.programa_aplicacion+"</td>";
	detalleNotificacion +=			"<td>"+arrayListaNot.tipo_control+"</td>";
	detalleNotificacion +=			"<td id='res"+arrayListaNot.numero_orden+"'>"+nreserva+"</td>";
	detalleNotificacion +=			"<td id='sol"+arrayListaNot.numero_orden+"'>"+nsolped+"</td>";
	detalleNotificacion +=		'</tbody>';
	detalleNotificacion +=	'</table>';
	detalleNotificacion +='</div>';

	detalleNotificacion +='<div class="table-responsive">';
	detalleNotificacion +=	'<table class="table table-striped table-condensed table-bordered" id="tbl_colaboradores">';
	detalleNotificacion +=		'<thead style="text-align: center;">';
	detalleNotificacion +=			'<tr>';
	detalleNotificacion +=				'<th style="text-align: center;"><input type="checkbox" checked id="cbSelectTodo" onchange="selectTodo()" ></th>';
	detalleNotificacion +=				'<th style="text-align: center;">Material</th>';
	detalleNotificacion +=				'<th style="text-align: center;">Cantidad a Reserva</th>';
	detalleNotificacion +=				'<th style="text-align: center;width:140px">Cantidad Solicitar</th>';
	detalleNotificacion +=				'<th style="text-align: center;">UM</th>';
	detalleNotificacion +=				'<th style="text-align: center;">Ingrediente Activo</th>';
	detalleNotificacion +=				'<th style="text-align: center;">Stock</th>';
	detalleNotificacion +=				'<th style="text-align: center;">T/Dtco</th>';
	detalleNotificacion +=				'<th style="text-align: center;">Número</th>';
	detalleNotificacion +=				'<th style="text-align: center;">Programa</th>';
	detalleNotificacion +=				'<th style="text-align: center;">Cantidad</th>';
	detalleNotificacion +=				'<th style="text-align: center;">Fecha</th>';
	detalleNotificacion +=			'</tr>';
	detalleNotificacion +=		'</thead>';
	detalleNotificacion +=		'<tbody>';
	var disabled = "";
	var disabledE = "";
	var disabledS = "";
	$.each(arrayListaNot.lista_materiales, function(km, vm){
		var dataMat = [];
		$.ajax({
			url: IPSERVERSAP + "/SCLEM/JSON_ZMOV_10020.aspx?MATERIAL="+vm.codigo_material,
			type:	"GET",
//			data : JSON.stringify(row),
			dataType: 'json',
			async: false,
			success: function(data){
				dataMat = data;
			}
		})
		if(arrayListaNot.nreserva != null) {
			disabled = "style='display:none'";
		} else {
			disabledE = "style='display:none'";
		}
		if(arrayListaNot.solped != null){
			disabledS = "style='display:none'";
		}
		var arrayList = {};
		arrayList.COD = vm.codigo_material;
		arrayList.CANTIDAD = vm.cantidad.toFixed(2);
		arrayListMat.push(arrayList);
		var dataStock = [];
		$.ajax({
			url: IPSERVERSAP + "/SCLEM/JSON_BAPI_MATERIAL_STOCK_REQ_LIST.aspx?CENTRO="+arrayListaNot.codCampo+"&MATERIAL="+vm.codigo_material+"&ALMACEN="+arrayAlmacen[arrayListaNot.idProgramaAplicacion],
			type:	"GET",
//			data : JSON.stringify(row),
			dataType: 'json',
			async: false,
			success: function(data){
				dataStock = data;
			}
		})
		var dataSoped = [];
		$.ajax({
			url: IPSERVERSAP + "/SCLEM/JSON_BAPI_REQUISITION_GETITEMS.aspx?CENTRO="+arrayListaNot.codCampo+"&MATERIAL="+vm.codigo_material,
			type:	"GET",
//			data : JSON.stringify(row),
			dataType: 'json',
			async: false,
			success: function(data){
				dataSoped = data;
			}
		})
		detalleNotificacion +=		"<tr>";
		detalleNotificacion += 			"<td><input type='checkbox' class='cbMaterial' id='cbMaterial"+vm.codigo_material+"' checked ></td>" ;
		detalleNotificacion +=			"<td>"+dataMat.LT_DETALLE[0].MAKTX+"</td>";
		detalleNotificacion +=			"<td>"+formatNumber(vm.cantidad)+"</td>";
		detalleNotificacion += 			"<td><input class='form-control required' type='number' id='cant"+vm.codigo_material+"'></td>";	
		detalleNotificacion +=			"<td>"+dataMat.LT_DETALLE[0].MEINS+"</td>";
		detalleNotificacion +=			"<td>"+dataMat.LT_DETALLE[0].IACTIVO+"</td>";					
		detalleNotificacion +=			"<td>"+formatNumber(dataStock.MRP_IND_LINES[0].AVAIL_QTY1)+"</td>";
		var data = [];
		var x = 0;
		$.each(dataSoped.REQUISITION_ITEMS, function(ka,va){
			var datId = '';
			$.ajax({
				url: "/simpleWeb/json/AGRO/GETSOLPED_PF/"+va.PREQ_NO,
				type:	"GET",
//				data : JSON.stringify(row),
				dataType: 'json',
				async: false,
				success: function(data){
					datId = data;
				}
			})
			if(x>0){
				detalleNotificacion +=		"<tr>";
				detalleNotificacion += "<td></td>";
				detalleNotificacion += "<td></td>";
				detalleNotificacion += "<td></td>";
				detalleNotificacion += "<td></td>";
				detalleNotificacion += "<td></td>";
				detalleNotificacion += "<td></td>";
				detalleNotificacion += "<td></td>";
			}
			detalleNotificacion +=			"<td>Solped</td>";
			detalleNotificacion +=			"<td>"+va.PREQ_NO+"</td>";
			detalleNotificacion +=			"<td>"+datId+"</td>";
			detalleNotificacion +=			"<td>"+va.QUANTITY+"</td>";
			detalleNotificacion +=			"<td>"+formatFecha(va.REL_DATE)+"</td>";
			detalleNotificacion +=		"</tr>";
			x++;
		})
		if(dataSoped.REQUISITION_ITEMS.length == 0) {
			detalleNotificacion += "<td></td>";
			detalleNotificacion += "<td></td>";
			detalleNotificacion += "<td></td>";
			detalleNotificacion += "<td></td>";
			detalleNotificacion += "<td></td>";
			detalleNotificacion +=		"</tr>";
		}
		
	});
	$('#loading').show();
	detalleNotificacion +=		"</tbody>";
	detalleNotificacion +=	"</table>";
	detalleNotificacion +="</div>";
	detalleNotificacion +='<div class="col-sm-12 col-md-12">';
	detalleNotificacion +=		"<td><div class='btn btn-circle red btn-outline' "+disabled+" id='reserva"+arrayListaNot.numero_orden+"' onclick='reservar("+arrayListaNot.numero_orden+");'> Reservar</div></td>";
	detalleNotificacion +=		"<td><div class='btn btn-circle red btn-outline' "+disabledS+" id='solped"+arrayListaNot.numero_orden+"' onclick='solped("+arrayListaNot.numero_orden+");'> Solicitar</div></td>";
	detalleNotificacion +=		"<td><div class='btn btn-circle red btn-outline' onclick='confirmRechazar("+arrayListaNot.numero_orden+");'>Rechazar</div></td>";
	detalleNotificacion +=		'<td><div class="btn btn-circle green-dark btn-outline" '+disabledE+' id="emitir'+arrayListaNot.numero_orden+'" onclick="javascript: hrefOrden('+arrayListaNot.numero_orden+');"><i class="fa fa-clock-o"></i> Emitir Orden</div></td>';
	detalleNotificacion +='</div>';
	$('#loading').hide();
	popUp("Detalle Orden de Aplicación", detalleNotificacion, true, "1400px", true);
	fechas();
}
function hrefOrden(x){
	
	window.location.href = ("ordenDosificacion#"+x);
	
}
function reservar(id){
	$("#loading").show();
	var fecha = "";
	var codMat = "";
	var cantMat = "";
	var ceco = "";
	var almacen = "";
	var campo = "";
	$.getJSON("/simpleWeb/json/AGRO/LISTA_ORDEN_DETALLE/"+id, function(v){
		fecha = v.fecha_estimada_aplicacion.replace("-", "").replace("-", "");
		campo = v.codCampo;
		if(!valFechaReserva($('#fechaEst'+id).val())){
			return false;
		}
		
		var mat = {};
		mat.MATERIALES = arrayListMat;
		var materiales = JSON.stringify(mat);
		almacen = arrayAlmacen[v.idProgramaAplicacion];
		var url  = IPSERVERSAP + "/SCLEM/JSON_BAPI_RESERVATION_CREATE1.aspx?FECHA="+fecha+"&ALMACEN="+almacen+"&ALMACENDESTINO=7000"+"&MATERIALES="+materiales+"&CENTRO="+campo+"&MOVIMIENTO=311&CENTROCOSTO=&EQUIPO=";
		$("#loading").hide();
		console.log(url);
		$.getJSON(url, function(response){
			if(response.RESERVATION != 0){
				alerta("Se ha reservado con éxito, número de reserva "+response.RESERVATION);
				$('#res'+id).html(response.RESERVATION);
				//RESERVA_MATERIAL
				var row = [];
				var r = {};
				r.codigo = id;
				r.reserva = response.RESERVATION;
				r.fecha_estimada   = $('#fechaEst'+id).val();
				row.push(r);
				setTimeout(function(){
					$.ajax({
						url : "/simpleWeb/json/AGRO/RESERVA_MATERIAL/",
						type : "PUT",
						data : JSON.stringify(row),
						beforeSend : function(xhr) {
							xhr.setRequestHeader("Accept","application/json");
							xhr.setRequestHeader("Content-Type","application/json");
						},
						success : function(data, textStatus, jqXHR) {
							
						},
						error : function(jqXHR, textStatus, errorThrown) {
							swal({
								  title: "Error!",
								  text: "No se ha podido registrar la infomacion, consulte con el administrador del sistema",
								  type: "error",
								  confirmButtonText: "Aceptar"
							});
						}
					});
					$('#reserva'+id).hide();
					$('#emitir'+id).show();
				}, 500);
			} else {
				var mensaje = "";
				$.each(response.RETURN, function(key, val){
					mensaje += val.MESSAGE+"<br>";
				});
				alerta(mensaje);
			}
		});
		
	})
}

function solped(id){
	$("#loading").show();
	var fecha = "";
	var codMat = "";
	var cantMat = "";
	var ceco = "";
	var almacen = "";
	var campo = "";
	$.getJSON("/simpleWeb/json/AGRO/LISTA_ORDEN_DETALLE/"+id, function(v){
		fecha = v.fecha_estimada_aplicacion.replace("-", "").replace("-", "");
		var mat = {};
		mat.MATERIALES = listMaterialesSolped();
		var materiales = JSON.stringify(mat);
		campo = v.codCampo;
		almacen = arrayAlmacen[v.idProgramaAplicacion];
		var url  = IPSERVERSAP + "/SCLEM/JSON_BAPI_REQUISITION_CREATE.aspx?FECHA="+fecha+"&MATERIALES="+materiales+"&ALMACEN="+almacen+"&CENTRO="+campo+"&CENTROCOSTO=&EQUIPO=";
		console.log(url);
		
		$.getJSON(url, function(response){
			if(response.NUMBER != ""){
				$("#loading").hide();
				alerta("Se ha realizado la solicitud de pédido "+response.NUMBER);
				$('#sol'+id).html(response.NUMBER);
				var row = [];
				var r = {};
				r.codigo = id;
				r.solped = response.NUMBER;
				//r.fecha_estimada   = $('#fechaEst'+id).val();
				row.push(r);
				setTimeout(function(){
					$.ajax({
						url : "/simpleWeb/json/AGRO/RESERVA_MATERIAL/",
						type : "PUT",
						data : JSON.stringify(row),
						beforeSend : function(xhr) {
							xhr.setRequestHeader("Accept","application/json");
							xhr.setRequestHeader("Content-Type","application/json");
						},
						success : function(data, textStatus, jqXHR) {
							
						},
						error : function(jqXHR, textStatus, errorThrown) {
							swal({
								  title: "Error!",
								  text: "No se ha podido registrar la infomacion, consulte con el administrador del sistema",
								  type: "error",
								  confirmButtonText: "Aceptar"
							});
						}
					});
					$('#solped'+id).hide();
				}, 500);
			} else {
				var mensaje = "";
				$.each(response.RETURN, function(key, val){
					mensaje += val.MESSAGE+"<br>";
				});
				alerta(mensaje);
			}
		});
		
	})
}

function listMaterialesSolped(){
	var arrayListMatS = [];
	$.each(arrayListMat, function(k,v){
		if($("#cbMaterial"+v.COD).is(':checked')){
			if($('#cant'+v.COD).val() != ""){
				var arrayList = {};
				arrayList.COD = v.COD;
				arrayList.CANTIDAD = parseFloat($('#cant'+v.COD).val()).toFixed(3);
				arrayListMatS.push(arrayList);
			}
		}
	})
	return arrayListMatS;
	
}

function confirmRechazar(id){
	if(id==0){
		$("#tr0").remove();
		
	} else {
		$.getJSON("/simpleWeb/json/AGRO/RECPF/"+id, function(data){
			$.getJSON(IPSERVERSAP+"/JSON_BAPI_RESERVATION_DELETE.aspx?RESERVA="+reserva, function(data2){
				var mensaje = data2.RETURN[0].MESSAGE+"<br>";
				if(data){
					mensaje += "El programa "+cod+" ha sido rechazado con éxito";
					alerta(mensaje);
					getPG();
				}
			});
		});
	}
	loadInfo();
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


function edit(e){
	window.location.href = ("detalle_aplicacion#"+e)
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
function selectTodo(){
	console.log($("#cbSelect").is(':checked'));
	if($("#cbSelectTodo").is(':checked')){
		$('.cbMaterial').prop('checked', true);
	} else {
		$('.cbMaterial').prop('checked', false);
	}
}

function valFechaReserva(val){
	var hoy = dateHoy();
	hoy = hoy.split("-");
	hoy = new Date(hoy[0], hoy[1], hoy[2]);
	var fechaSelect = val.split("-");
	fechaSelect = new Date(fechaSelect[2], fechaSelect[1], fechaSelect[0]);
	var auxFecha = fechaSelect.getTime();
	var auxHoy = hoy.getTime();
	var valDiff = (auxFecha - auxHoy);
	valDiff = valDiff/(1000*60*60*24);
	if(valDiff > 15){
		alerta("La fecha de reserva no puede superar 15 días de anticipo a la actual");
		$('#fechaAlerta'+id).val("");
		return false;
	}
	return true;
}

function valFechaHoy(id){
	console.log(id);
	var val = $('#'+id).val();
	var hoy = dateHoy();
	var h = hoy;
	hoy = hoy.split("-");
	hoy = new Date(hoy[0], hoy[1], hoy[2]);
	var fechaSelect = val.split("-");
	fechaSelect = new Date(fechaSelect[2], fechaSelect[1], fechaSelect[0]);
	var auxFecha = fechaSelect.getTime();
	if(fechaSelect < hoy){
		alerta("La fecha seleccionada no puede ser menor a la actual");
		$('#'+id).val(formatFecha(h));
		return;
	}
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