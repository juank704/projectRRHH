var table = $('#tbl_Fito').DataTable({
	"sPaginationType": "full_numbers" ,
	"filter": false,
	"ordering": true,
	"order": [[ 0, "desc" ]]
	 ,scrollY:        "400px",
     scrollX:        true,
     scrollCollapse: true,
     paging:         true,
     fixedColumns:   {
         leftColumns: 1
         //,leftColumns: 2
     }
});
var arrayVariedad = [];
var campo_especie = [];
var editar = false;
var arrayListMat = [];
var arrayAlmacen = [];
arrayAlmacen['Z010'] = '2000';
arrayAlmacen['Z011'] = '3000';
arrayAlmacen['Z119'] = '9500';
arrayAlmacen['Z120'] = '4000';
arrayAlmacen['Z121'] = '1000';
arrayAlmacen['Z122'] = '6000';
arrayAlmacen['Z123'] = '5000';


var idPro = 0;
var arrayVariedades = [];
var arrayCuarteles = [];
var arrayMateriales = [];
var SESION = getVars();
console.log(SESION);
var idCuartel = 0;
var auxCuartel = getCuartel();
var cm = 0;
var has = 0;
$(document).ready(function(){
	//loadPrograma();
	$.fn.dataTable.ext.errMode = 'none';
	fechas();
	getEspecies();
	getControl();
	getEstadoFeno();
	getProgramaApl();
	getMaterial();
	$('.form-control.input-sm').select2({
		multiple: true,
		placeholder: "Seleccione",
		closeOnSelect: false
	});
	$('.form-control2.input-sm2').select2({
		multiple: false,
		placeholder: "Seleccione"
	});
	
	console.log(auxCuartel);
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
	selectHuerto += "<option value='-1'>Seleccione Campo</option>";
	$.each(arrayCampo, function(ks,va){
		selectHuerto += "<option value='"+va.campo+"'>"+va.descripcion+"</option>";
	})
	$("#dataHuerto").append(selectHuerto);
	$("#fechaDesde").val("01-05-2018");
	var dt = new Date();
	var month = dt.getMonth()+1;
	var day = dt.getDate();
	var year = dt.getFullYear();
	if(month < 10) {
		month = "0"+month;
	}
	if(day < 10) {
		day = "0"+day;
	}
	$("#fechaHasta").val(day+'-'+month+'-'+year);
		//getPG();
		//loadPrograma();
	$('#fechaDesde').change(function(){ 
		//loadPrograma();
		//getPG();
	});
	$('#fechaHasta').change(function(){
		//getPG();
		//loadPrograma();
	});
	$('#dataHuerto').change(function(){
		//getPG();
		//loadPrograma();
	});
	$("#listar").click(function(){
		getPG();
	});
	console.log(arrayVariedad);
	$('#temporada').change(function(){
		//getPG();
		//loadPrograma();
	});
	var listNotificacion = "";
	var todayNot = dateHoy();
	//GETNot
	//GETNotAlert
	var arrayNotificacionesRes;
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETNotAlert/1/0/''",
		type:	"GET",
		//data : JSON.stringify(row),
		dataType: 'json',
		async: false,
		success: function(data){
			arrayNotificacionesRes = data;
		}
	})
	$.each(arrayNotificacionesRes, function(k,v){
		if(todayNot == v.fecha_alerta){
			var notificacion = "";
			notificacion +=		'<div class="col-xs-6 col-sm-6 col-md-6" style="border-top: 1px solid white">';
			notificacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
			notificacion +=				'Número Programa';
			notificacion +=			'</div>';
			notificacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
			notificacion +=				''+v.idPrograma+'';
			notificacion +=			'</div>';
			notificacion +=		'</div>';
			notificacion +=		'<div class="col-xs-6 col-sm-6 col-md-6" style="border-top: 1px solid white">';
			notificacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
			notificacion +=				'Campo';
			notificacion +=			'</div>';
			notificacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
			notificacion +=				''+v.campo+'';
			notificacion +=			'</div>';
			notificacion +=		'</div><br>';
			notificacion +=		'<div class="col-xs-6 col-sm-6 col-md-6" style="border-top: 1px solid white">';
			notificacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
			notificacion +=				'Fecha Aplicacion';
			notificacion +=			'</div>';
			notificacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
			notificacion +=				''+formatFecha(v.fecha)+'';
			notificacion +=			'</div>';
			notificacion +=		'</div>';
			notificacion +=		'<div class="col-xs-6 col-sm-6 col-md-6" style="border-top: 1px solid white">';
			notificacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
			notificacion +=				'Estado Fenologico';
			notificacion +=			'</div>';
			notificacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
			notificacion +=				''+v.estado_fenologico+'';
			notificacion +=			'</div>';
			notificacion +=		'</div><br>';
			
			notificacion +=		'<div class="col-xs-12 col-sm-12 col-md-12" style="border-top: 1px solid white">';
			notificacion +=			'<div class="col-xs-12 col-sm-12 col-md-4">';
			notificacion +=				'Material';
			notificacion +=			'</div>';
			//notificacion +=		'<div class="col-xs-4 col-sm-4 col-md-4" style="border-top: 1px solid white">';
			notificacion +=			'<div class="col-xs-12 col-sm-12 col-md-4">';
			notificacion +=				'U/M';
			notificacion +=			'</div>';
			notificacion +=			'<div class="col-xs-12 col-sm-12 col-md-4">';
			notificacion +=				'Cantidad';
			notificacion +=			'</div>';
			notificacion +=		'</div>';
			
			
			$.each(v.material, function(kc,vc){
				var arrayDetMaterial;
				var row = {};
				row.tipo = 1;
				row.estado = 1;
				$.ajax({
					url: IPSERVERSAP + "JSON_ZMOV_10020.aspx?MATERIAL="+vc.codigo_material,
					type:	"GET",
					//data : JSON.stringify(row),
					dataType: 'json',
					async: false,
					success: function(data){
						arrayDetMaterial = data;
					}
				})
				notificacion +=		'<div class="col-xs-12 col-sm-12 col-md-12">';
				notificacion +=		'<div class="col-xs-12 col-sm-12 col-md-4">';
				notificacion +=			''+arrayDetMaterial.LT_DETALLE[0].MAKTX+'';
				notificacion +=		'</div>';
				notificacion +=		'<div class="col-xs-12 col-sm-12 col-md-4">';
				notificacion +=			''+arrayDetMaterial.LT_DETALLE[0].MEINS+'';
				notificacion +=		'</div>';
				notificacion +=		'<div class="col-xs-12 col-sm-12 col-md-4">';
				notificacion +=			''+formatNumber(vc.cantidad)+'';
				notificacion +=		'</div>';
				notificacion +=		'</div>';
			})
			notificacion +=		'</div>';
			notify("warning", notificacion);
			//console.log("/simpleWeb/json/AGRO/UpdateEstadoNot/"+v.id_codigo);
			$.getJSON("/simpleWeb/json/AGRO/UpdateEstadoNot/"+v.id_codigo, function(dataNot){});
			toastr.options.onclick = function(){
				detalleNotificacion(v);
				
				
			};
		}
	})
	var arrayNotificacionesOrd;
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETNotAlert/2/0/''",
		type:	"GET",
		//data : JSON.stringify(row),
		dataType: 'json',
		async: false,
		success: function(data){
			arrayNotificacionesOrd = data;
		}
	})
	$.each(arrayNotificacionesOrd, function(k,v){
		if(todayNot == v.fecha_alerta){
			var notificacion = "";
			notificacion +=		'<div class="col-xs-6 col-sm-6 col-md-6" style="border-top: 1px solid white">';
			notificacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
			notificacion +=				'Número Programa';
			notificacion +=			'</div>';
			notificacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
			notificacion +=				''+v.idPrograma+'';
			notificacion +=			'</div>';
			notificacion +=		'</div>';
			notificacion +=		'<div class="col-xs-6 col-sm-6 col-md-6" style="border-top: 1px solid white">';
			notificacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
			notificacion +=				'Campo';
			notificacion +=			'</div>';
			notificacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
			notificacion +=				''+v.campo+'';
			notificacion +=			'</div>';
			notificacion +=		'</div><br>';
			notificacion +=		'<div class="col-xs-6 col-sm-6 col-md-6" style="border-top: 1px solid white">';
			notificacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
			notificacion +=				'Fecha Aplicacion';
			notificacion +=			'</div>';
			notificacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
			notificacion +=				''+formatFecha(v.fecha)+'';
			notificacion +=			'</div>';
			notificacion +=		'</div>';
			notificacion +=		'<div class="col-xs-6 col-sm-6 col-md-6" style="border-top: 1px solid white">';
			notificacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
			notificacion +=				'Estado Fenologico';
			notificacion +=			'</div>';
			notificacion +=			'<div class="col-xs-12 col-sm-12 col-md-12">';
			notificacion +=				''+v.estado_fenologico+'';
			notificacion +=			'</div>';
			notificacion +=		'</div><br>';
			
			notificacion +=		'<div class="col-xs-12 col-sm-12 col-md-12" style="border-top: 1px solid white">';
			notificacion +=			'<div class="col-xs-12 col-sm-12 col-md-4">';
			notificacion +=				'Material';
			notificacion +=			'</div>';
			//notificacion +=		'<div class="col-xs-4 col-sm-4 col-md-4" style="border-top: 1px solid white">';
			notificacion +=			'<div class="col-xs-12 col-sm-12 col-md-4">';
			notificacion +=				'U/M';
			notificacion +=			'</div>';
			notificacion +=			'<div class="col-xs-12 col-sm-12 col-md-4">';
			notificacion +=				'Cantidad';
			notificacion +=			'</div>';
			notificacion +=		'</div>';
			
			
			$.each(v.material, function(kc,vc){
				var arrayDetMaterial;
				var row = {};
				row.tipo = 1;
				row.estado = 1;
				$.ajax({
					url: IPSERVERSAP + "JSON_ZMOV_10020.aspx?MATERIAL="+vc.codigo_material,
					type:	"GET",
					//data : JSON.stringify(row),
					dataType: 'json',
					async: false,
					success: function(data){
						arrayDetMaterial = data;
					}
				})
				notificacion +=		'<div class="col-xs-12 col-sm-12 col-md-12">';
				notificacion +=		'<div class="col-xs-12 col-sm-12 col-md-4">';
				notificacion +=			''+arrayDetMaterial.LT_DETALLE[0].MAKTX+'';
				notificacion +=		'</div>';
				notificacion +=		'<div class="col-xs-12 col-sm-12 col-md-4">';
				notificacion +=			''+arrayDetMaterial.LT_DETALLE[0].MEINS+'';
				notificacion +=		'</div>';
				notificacion +=		'<div class="col-xs-12 col-sm-12 col-md-4">';
				notificacion +=			''+formatNumber(vc.cantidad)+'';
				notificacion +=		'</div>';
				notificacion +=		'</div>';
			})
			notificacion +=		'</div>';
			console.log(notificacion);
			notify("success", notificacion);
			$.getJSON("/simpleWeb/json/AGRO/UpdateEstadoNot/"+v.id_codigo, function(dataNot){});
			toastr.options.onclick = function(){
				detalleNotificacion(v);
				//$.getJSON("/simpleWeb/json/AGRO/UpdateEstadoNot/"+v.id_codigo, function(dataNot){});
				
			};
		}
	})
});

function detNotificacion(id){
	$('#loading').show();
	var detalleNotificacion = "";
	var arrayListaNot = [];
	console.log("/simpleWeb/json/AGRO/LISTA_ORDEN_DETALLE/"+id);
	$.ajax({
		url: "/simpleWeb/json/AGRO/LISTA_ORDEN_DETALLE/"+id,
		type:	"GET",
	//	data : JSON.stringify(row),
		dataType: 'json',
		async: false,
		success: function(data){
			arrayListaNot = data;
		}
	})
	console.log(arrayListaNot);
	var nreserva = '';
			
	if(arrayListaNot.nreserva > 0){
		nreserva = arrayListaNot.nreserva;
	} else {
		nreserva = '';
	}
	var nsolped = '';
	if(arrayListaNot.solped > 0){
		nsolped = arrayListaNot.solped;
	} else {
		nsolped = '';
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
	detalleNotificacion +=			'<tr>';
	detalleNotificacion +=			"<td>"+arrayListaNot.idPrograma+"</td>";
	detalleNotificacion +=			"<td>"+arrayListaNot.campo+"</td>";
	detalleNotificacion +=			"<td>"+arrayListaNot.especie+"</td>";
	detalleNotificacion +=			"<td><input size='16' type='text' name='fecha' style='width:130px' class='form-control' " +
	//		"value='"+formatFecha(arrayListaNot.fecha_estimada_aplicacion)+"' id='fechaEst"+arrayListaNot.numero_orden+"' readonly ></td> " ;
	"value='"+formatFecha(validaFechaAnterior(arrayListaNot.fecha_estimada_aplicacion))+"' id='fechaEst"+arrayListaNot.numero_orden+"'  readonly  onchange='valFechaHoy(this.id)'></td> " ;
	detalleNotificacion +=			"<td>"+arrayListaNot.estado_fenologico+"</td>";
	detalleNotificacion +=			"<td>"+arrayListaNot.programa_aplicacion+"</td>";
	detalleNotificacion +=			"<td>"+arrayListaNot.tipo_control+"</td>";
	detalleNotificacion +=			"<td id='res"+arrayListaNot.numero_orden+"'>"+nreserva+"</td>";
	detalleNotificacion +=			"<td id='sol"+arrayListaNot.numero_orden+"'>"+nsolped+"</td>";
	detalleNotificacion +=			'</tr>';
	detalleNotificacion +=			'<tr>';
	detalleNotificacion +=				'<th style="text-align: center;" colspan="2">Fecha Entrega Solped</th>';
	detalleNotificacion +=				'<th style="text-align: center;" colspan="2" >Observación Solped</th>';
	detalleNotificacion +=			'</tr>';
	detalleNotificacion +=			'<tr>';
	detalleNotificacion +=			"<td colspan='2'><input size='16' type='text' name='fecha' style='width:230px' class='form-control' " +
	//		"value='"+formatFecha(arrayListaNot.fecha_estimada_aplicacion)+"' id='fechaEst"+arrayListaNot.numero_orden+"' readonly onchange='valFechaHoy(this.id)'></td> " ;
	"value='"+formatFecha(validaFechaAnterior(arrayListaNot.fecha_estimada_aplicacion))+"' id='fechaSol"+arrayListaNot.numero_orden+"' readonly onchange='valFechaHoy(this.id)'></td> " ;
	detalleNotificacion +=			"<td colspan='3'><input size='16' type='text' name='observacion' style='width:330px' class='form-control' value='' id='observacionSolped"+arrayListaNot.numero_orden+"'  </td> " ;
	detalleNotificacion +=			'</tr>';
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
	arrayListMat = [];
	console.log(arrayListaNot.lista_materiales);
	$.each(arrayListaNot.lista_materiales, function(km, vm){
		var dataMat = [];
		$.ajax({
			url: IPSERVERSAP + "JSON_ZMOV_10020.aspx?MATERIAL="+vm.codigo_material,
			type:	"GET",
	//		data : JSON.stringify(row),
			dataType: 'json',
			async: false,
			success: function(data){
				dataMat = data;
			}
		})
		if(arrayListaNot.nreserva > 0 ) {
			disabled = "style='display:none'";
		} else {
			disabledE = "style='display:none'";
		}
		if(arrayListaNot.solped > 0){
			disabledS = "style='display:none'";
		}
		var arrayList      = {};
		arrayList.C        = vm.codigo;
		arrayList.COD      = vm.codigo_material;
		arrayList.CANTIDAD = formatNumber2(vm.cantidad);
		arrayList.ALMACEN  = vm.almacen;
		arrayListMat.push(arrayList);
		console.log(arrayListMat);
		var dataStock = [];
		console.log(IPSERVERSAP + "JSON_BAPI_MATERIAL_STOCK_REQ_LIST.aspx?CENTRO="+arrayListaNot.codCampo+"&MATERIAL="+vm.codigo_material+"&ALMACEN=");
		$.ajax({
			url: IPSERVERSAP + "JSON_BAPI_MATERIAL_STOCK_REQ_LIST.aspx?CENTRO="+arrayListaNot.codCampo+"&MATERIAL="+vm.codigo_material+"&ALMACEN="+vm.almacen,
			type:	"GET",
	//		data : JSON.stringify(row),
			dataType: 'json',
			async: false,
			success: function(data){
				dataStock = data;
			}
		})
		console.log(dataStock);
		console.log(IPSERVERSAP + "JSON_BAPI_REQUISITION_GETITEMS.aspx?CENTRO="+arrayListaNot.codCampo+"&MATERIAL="+vm.codigo_material);
		var dataSoped = [];
		$.ajax({
			url: IPSERVERSAP + "JSON_BAPI_REQUISITION_GETITEMS.aspx?CENTRO="+arrayListaNot.codCampo+"&MATERIAL="+vm.codigo_material,
			type:	"GET",
	//		data : JSON.stringify(row),
			dataType: 'json',
			async: false,
			success: function(data){
				dataSoped = data;
			}
		})
		console.log(dataSoped);
		var MAKTX = '';
		var MEINS = '';
		var IACTIVO = '';
		if(dataMat.LT_DETALLE.length > 0){
			MAKTX = dataMat.LT_DETALLE[0].MAKTX;
			MEINS = dataMat.LT_DETALLE[0].MEINS;
			IACTIVO = dataMat.LT_DETALLE[0].IACTIVO;
		}
		var AVAIL_QTY1 = '';
		if(dataStock.T_STOCK_MATNR.length > 0){
			AVAIL_QTY1 = dataStock.T_STOCK_MATNR[0].LABST;
		}
		console.log(AVAIL_QTY1);
		console.log(formatNumber(AVAIL_QTY1));
		console.log(formatNumber(AVAIL_QTY1+""));
		detalleNotificacion +=		"<tr>";
		detalleNotificacion += 			"<td><input type='checkbox' class='cbMaterial' id='cbMaterial"+vm.codigo+"' checked ></td>" ;
		detalleNotificacion +=			"<td>"+MAKTX+"</td>";
		detalleNotificacion +=			"<td>"+formatNumber2(vm.cantidad)+"</td>";
		detalleNotificacion += 			"<td><input class='form-control required' type='number' id='cant"+vm.codigo+"'></td>";	
		detalleNotificacion +=			"<td>"+MEINS+"</td>";
		detalleNotificacion +=			"<td>"+IACTIVO+"</td>";					
		detalleNotificacion +=			"<td>"+formatNumber(AVAIL_QTY1)+"</td>";
		var data = [];
		var x = 0;
		$.each(dataSoped.REQUISITION_ITEMS, function(ka,va){
			var datId = '';
			$.ajax({
				url: "/simpleWeb/json/AGRO/GETSOLPED_PF/"+va.PREQ_NO,
				type:	"GET",
	//			data : JSON.stringify(row),
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
	
	detalleNotificacion +=		"</tbody>";
	detalleNotificacion +=	"</table>";
	detalleNotificacion +="</div>";
	detalleNotificacion +='<div class="col-sm-12 col-md-12">';
	detalleNotificacion +=		"<td><div class='btn btn-circle red btn-outline' "+disabled+" id='reserva"+arrayListaNot.numero_orden+"' onclick='reservar("+arrayListaNot.numero_orden+","+arrayListaNot.idPrograma+");'> Reservar</div></td>";
	detalleNotificacion +=		"<td><div class='btn btn-circle red btn-outline' "+disabledS+" id='solped"+arrayListaNot.numero_orden+"' onclick='solped("+arrayListaNot.numero_orden+","+arrayListaNot.idPrograma+");'> Solicitar</div></td>";
	detalleNotificacion +=		"<td><div class='btn btn-circle red btn-outline' id='notRecha"+arrayListaNot.numero_orden+"' onclick='confirmRechazar("+arrayListaNot.numero_orden+","+arrayListaNot.idPrograma+","+arrayListaNot.nreserva+","+arrayListaNot.solped+");'>Rechazar</div></td>";
	detalleNotificacion +=		'<td><div class="btn btn-circle green-dark btn-outline" '+disabledE+' id="emitir'+arrayListaNot.numero_orden+'" onclick="javascript: hrefOrden('+arrayListaNot.numero_orden+',1);"><i class="fa fa-clock-o"></i> Emitir Orden</div></td>';
	detalleNotificacion +='</div>';
	reservaActiva = arrayListaNot.nreserva;
	solpedActiva  = arrayListaNot.solped;
	$('#loading').hide();
	popUp("Detalle Orden de Aplicación", detalleNotificacion, true, "1400px", true);
	fechas();
}

//var auxDataFito = rauxDataFito();
//var huertos = getHuertos();
//var especie = JSON.parse(localStorage.getItem("ESPECIE"));
//var variedad = JSON.parse(localStorage.getItem("VARIEDAD"));
var countC = 1;
var countMa = 1;
var x;


var jsonCuartelAdd = [];
function selectCuartel(id,cu){
	var selCuartel = "<option value=''>Seleccione</option>";
	$.each(auxCuartel, function(k,v){
		console.log(id);
		console.log($('#VarTest'+id).val());
		if(v.campo == $('#dataHuerto').val() && v.variedad == $('#VarTest'+id).val()){
			if(cu==v.codigo) {
				selCuartel += "<option value='"+v.codigo+"' selected>"+v.nombre+"</option>";
			} else {
				selCuartel += "<option value='"+v.codigo+"'>"+v.nombre+"</option>";
			}
		}
	})
	return selCuartel;
}
var jsonCuartelAdd = [];
var arraySubFamiliaMat = ['','Z121','Z010','Z011','Z120','Z123','Z119','Z122'];
function selectMaterial(id,pa){
	console.log(id);
	var selMaterial = "<option value=''>Seleccione</option>";
	console.log(arrayMaterial);
	$.each(arrayMaterial, function(k,v){
		if(pa == 3 ) {
			$.each(arrayMaterial[1],function(key,value){
				//if(value.MATKL == arraySubFamiliaMat[pa]){
					if(id==value.MATNR) {
						selMaterial += "<option value='"+value.MATNR+"' selected>"+parseInt(value.MATNR)+"-"+value.MAKTX+" ("+value.IACTIVO+")</option>";
					} else {
						selMaterial += "<option value='"+value.MATNR+"'>"+parseInt(value.MATNR)+"-"+value.MAKTX+" ("+value.IACTIVO+")</option>";
					}
				//}
			});
		} else {
			$.each(arrayMaterial[0],function(key,value){
				//if(value.MATKL == arraySubFamiliaMat[pa]){
					if(id==value.MATNR) {
						selMaterial += "<option value='"+value.MATNR+"' selected>"+parseInt(value.MATNR)+"-"+value.MAKTX+" ("+value.IACTIVO+")</option>";
					} else {
						selMaterial += "<option value='"+value.MATNR+"'>"+parseInt(value.MATNR)+"-"+value.MAKTX+" ("+value.IACTIVO+")</option>";
					}	
				//}
			});
			$.each(arrayMaterial[1],function(key,value){
				//if(value.MATKL == 'Z010'){
					if(id==value.MATNR) {
						selMaterial += "<option value='"+value.MATNR+"' selected>"+value.MAKTX+"</option>";
					} else {
						selMaterial += "<option value='"+value.MATNR+"'>"+value.MAKTX+"</option>";
					}
				//}
			});
		}
		
	})
	//console.log(selMaterial);
	return selMaterial;
}




function loadPrograma(){
	$('#loading').show();
	//$("#tblInfo").html("");
	editar = false;
//	table = $('#tbl_Fito').DataTable({
//		"destroy": true ,
//		"filter": false
//	});
	id = 0;
	table.clear().draw();
	var hid = 0;
	setTimeout(function(){  
	$.each(arrayPF, function(k,v){
		if(v.campo == $("#dataHuerto").val()){		
			var tblFito = [];
			var disabled = "";
			tblFito[0] = '<div style="background-color: white; height:60px" id="'+v.codigo+'">'+v.id+'</div>';
			if(v.estado_pf != 1) {
				disabled = "disabled";
			}
			var ord = "";
			if(v.estado_pf == 5) {
				ord = "R";
				if(v.orden != null){
					ord += "-"+v.orden;
				}
			} else {
				if(v.orden != null){
					ord = v.orden;
				}
			}
			tblFito[1] =	"<div id='idOrd"+v.codigo+"'>"+ord+"</div>";
			tblFito[2] =	"<input size='16' type='text' class='form-control' value='"+formatFecha(v.fecha_estimada)+"' id='fecha"+v.codigo+"' name='fecha' readonly onchange='javascript: valDias(this)' disabled>" ;
			tblFito[3] =	"<select  id='EspText"+v.codigo+"' class='form-control2 input-sm2' style='width:160px'  onchange='javascript: changeEspecie(this.id);' disabled>";
			$.each(arrayEspecie,function(key,value){
				if(value.codigo == v.especie){
					tblFito[3] += "<option value="+value.codigo+" selected>"+value.especie+"</option>";
				} else {
					tblFito[3] += "<option value="+value.codigo+">"+value.especie+"</option>";
				}
			});
			tblFito[3] += "	</select>" ;
			tblFito[4] =	"<select id='VarTest"+v.codigo+"' name='variedad' disabled style='width:200px' onchange='cargarCuartel("+v.codigo+");'	 class='form-control input-sm variedad'  style='width:200px' >";
			var variedades = v.nombre_variedad.split(",");
			var validaVariedad = [];
			$.each(auxCuartel,function(kk,vv){		
				if(v.especie == vv.especie && vv.campo == $("#dataHuerto").val()){
					if(validaVariedad.indexOf(vv.variedad) == -1){
						tblFito[4] += "<option value="+vv.variedad+">"+vv.nvariedad+"</option>";
						validaVariedad.push(vv.variedad);
					}
						
				}
			});
			tblFito[4] += "</select>" ;
			tblFito[5] =	"<button id='cua"+v.codigo+"' title='Agregar Cuarteles' onclick='javascript: modalAddCuartel("+v.codigo+");' disabled class='btn blue btn-outline btn-sm'><i class='fa fa-pagelines fa-lg'></i></button>" ;
			tblFito[6] =	"<select id='estFen"+v.codigo+"' style='width:180px' name='edit'  class='form-control2 input-sm2' disabled>";
			$.each(arrayEstadoFeno,function(key,value){
				if(value.especie == v.especie) {
					if(value.codigo == v.estado_fenologico) {
						tblFito[6] += '<option value="'+value.codigo+'" selected>'+value.estado_fenologicos+'</option>';
					} else {
						tblFito[6] += '<option value="'+value.codigo+'" >'+value.estado_fenologicos+'</option>';
					}	
				}
			});
			tblFito[6] +=	"</select>" ;
			tblFito[7] =	"<select id='progAplicacion"+v.codigo+"' style='width:180px' onchange='setMojamiento("+v.codigo+");' name='map' class='form-control2 input-sm2' disabled>";
			$.each(arrayProgramaApl,function(key,value){
				if(value.codigo == v.programa_aplicacion) {
					tblFito[7] += '<option value="'+value.codigo+'" selected>'+value.descripcion+'</option>';	
				}else {
					tblFito[7] += '<option value="'+value.codigo+'">'+value.descripcion+'</option>';	
				}
			});
			tblFito[7] +=	"</select></td>" ;
			tblFito[8] =	"<input type='number' name='edit' id='mojamiento"+v.codigo+"' onchange='recalcularMaterial(this.value,"+v.codigo+")' value='"+v.mojamiento+"' class='form-control' disabled min='0'>" ;
			tblFito[9] =	"<button id='mat"+v.codigo+"' disabled title='Agregar Material' onclick='javascript: modalAddMaterial("+v.codigo+");' class='btn blue btn-outline btn-sm'><i class='fa fa-map-o fa-lg'></i></button>" ;
			tblFito[10] =	"<select id='control"+v.codigo+"' name='map' class='form-control2 input-sm2' style='width:180px' disabled>";
			$.each(arrayControl,function(key,value){
				if(value.especie == v.especie) {
					if(value.codigo == v.tipo_control) {
						tblFito[10] += '<option value="'+value.codigo+'" selected>'+value.control_aplicacion+'</option>';
					} else {
						tblFito[10] += '<option value="'+value.codigo+'">'+value.control_aplicacion+'</option>';
					}
				}
			});

			tblFito[10] +=	"</select>" ;
			if(v.fecha_alerta != '' && v.fecha_alerta != null){
				tblFito[11] =	"<input size='16' type='text' class='form-control' value='"+formatFecha(v.fecha_alerta)+"' id='fechaAlerta"+v.codigo+"' name='fecha' readonly onchange='valFechaAlerta("+v.codigo+")' disabled>" ;
			} else {
				tblFito[11] =	"<input size='16' type='text' class='form-control' value='' id='fechaAlerta"+v.codigo+"' name='fecha' readonly onchange='valFechaAlerta("+v.codigo+")' disabled>" ;
			}
			tblFito[12] =	"<textarea class='form-control' name='edit' id='observacion"+v.codigo+"' value='"+v.observacion+"' disabled>"+v.observacion+"</textarea>" ;
			tblFito[13] =  '<td><select id="libro'+v.codigo+'" style="width:60px" name="map" class="form-control2 input-sm2" disabled>';
			tblFito[13] +=	'<option value="0">SI</option>';
			tblFito[13] +=	'<option value="1">NO</option>';
			tblFito[13] +=	'</select></td>';
			tblFito[14] =		"<button id='save"+v.codigo+"'  title='Guardar' "+disabled+" style='display: none;' onclick='savePrograma(\""+v.codigo+"\",\""+v.reserva+"\",\""+v.solped+"\",\""+v.id+"\");' class='btn green-dark btn-outline btn-sm' ><i class='icon-cloud-upload fa-lg'></i></button>" ;
			tblFito[14] +=		"<button id='edit"+v.codigo+"'  title='Modificar' "+disabled+" onclick='editPrograma("+v.codigo+");' class='btn yellow btn-outline btn-sm' ><i class='fa fa-pencil-square-o fa-lg'></i></button>" ;
			tblFito[14] +=		"<button id='gen"+v.codigo+"' title='Generar Orden' "+disabled+" onclick='hrefOrden("+v.codigo+","+v.reserva+");' class='btn green btn-outline btn-sm'><i class='fa fa-arrow-right fa-lg'></i></button>" ;
			tblFito[14] +=		"<button id='rec"+v.codigo+"'  title='Rechazar' "+disabled+" onclick='confirmRechazar("+v.codigo+","+v.id+",\""+v.reserva+"\",\""+v.solped+"\");' class='btn red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button>" ;
			var rowNode = table
		    .row.add( tblFito )
		    .draw()
		    .node();
			idPro = parseInt(v.id);
			
			$('.form-control.input-sm').select2({
				multiple: true,
				placeholder: "Seleccione",
				closeOnSelect: false
			});
			$('.form-control2.input-sm2').select2({
				multiple: false,
				placeholder: "Seleccione"
			});
			arrayVariedades["VarTest"+v.codigo] = variedades;
			$("#VarTest"+v.codigo).val(variedades).trigger('change');
			$("#libro"+v.codigo).val(v.libro_campo).trigger('change');
		}
	});
	
	$('#loading').hide();	
	}, 500);
	fechas();
	
	
}

$('#tbl_Fito').on( 'page.dt', function (event, dt, type, cell, originalEvent) {
	agregando = false; 
	/*if(agregando){
		alerta("Debe terminar de ingresar o editar el programa antes de cambiar de página.");
		event.preventDefault();
		return false;
	}*/	 
	$('.form-control.input-sm').select2({
		multiple: true,
		placeholder: "Seleccione",
		closeOnSelect: false
	});
	$('.form-control2.input-sm2').select2({
		multiple: false,
		placeholder: "Seleccione"
	});
	$('.variedad').each(function(index,element){
		var id = element.id;
		//console.log(arrayVariedades[id]);
		$("#"+id).val(arrayVariedades[id]).trigger('change');
	})
	setTimeout(function(){ 
		$('.variedad').each(function(index,element){
			var id = element.id;
			//console.log(arrayVariedades[id]);
			$("#"+id).val(arrayVariedades[id]).trigger('change');
		}) 
	}, 3000);
	

} );
$('#tbl_Fito').on( 'order.dt', function () {
	agregando = false; 
	$('.form-control.input-sm').select2({
		multiple: true,
		placeholder: "Seleccione",
		closeOnSelect: false
	});
	$('.form-control2.input-sm2').select2({
		multiple: false,
		placeholder: "Seleccione"
	});
	$('.variedad').each(function(index,element){
		var id = element.id;
		//console.log(arrayVariedades[id]);
		$("#"+id).val(arrayVariedades[id]).trigger('change');
	})
} );
function selectMultiple(id,supplier){
	//supplier='1,2,3,4,5,6';//estos son ids que recibo de mysql
	if(supplier){
		var idSupplier=supplier.split(',');
		$(id+'>option').each(function(index, element) {
			for(x=0;x<idSupplier.length;x++){
				if($(this).attr('value')==idSupplier[x]){
					$(this).attr({'selected':'selected'})
//					//
					
				} 
			}
		});
	}
}

function valFechaAlerta(id){
	//console.log(id);
	var val = $('#fechaAlerta'+id).val();
	//console.log(val);
	var val2 = $('#fecha'+id).val();
	//console.log(val2);
	var hoy = dateHoy();
	hoy = hoy.split("-");
	//console.log(hoy);
	hoy = new Date(hoy[0], hoy[1], hoy[2]);
	
	var fechaSelect = val.split("-");
	fechaSelect = new Date(fechaSelect[2], fechaSelect[1], fechaSelect[0]);
	var fechaSelect2 = val2.split("-");
	fechaSelect2 = new Date(fechaSelect2[2], fechaSelect2[1], fechaSelect2[0]);
	//console.log(hoy[0]+ hoy[1]+ hoy[2]);
	//console.log(fechaSelect[2]+ fechaSelect[1]+ fechaSelect[0]);
	//console.log(fechaSelect2[2]+ fechaSelect2[1]+ fechaSelect2[0]);
	var auxFecha = fechaSelect.getTime();
	var auxFecha2 = fechaSelect2.getTime();
	var auxHoy = hoy.getTime();
	var valDiff = (auxFecha2 -auxFecha);
	valDiff = valDiff/(1000*60*60*24);
	//console.log(valDiff)
	if(fechaSelect < hoy){
		alerta("La fecha seleccionada no puede ser menor a la actual");
		$('#fechaAlerta'+id).val("");
		return;
	}else if(fechaSelect > fechaSelect2){
		alerta("La fecha de alerta no puede superar a la fecha de la aplicación");
		$('#fechaAlerta'+id).val("");
		return;
	}
	else if(valDiff > 15){
		alerta("La fecha de alerta no puede superar 15 días de anticipo a la fecha de la aplicación");
		$('#fechaAlerta'+id).val("");
		return;
	}
}

function validaFechaAnterior(fecha){
	var fechaSelect = fecha.split("-");
	var hoy = dateHoy();
	hoy = hoy.split("-");
	console.log(hoy);
	console.log(fechaSelect);
	fechaSelect = new Date(fechaSelect[0], fechaSelect[1], fechaSelect[2]);
	//console.log(hoy);
	hoy = new Date(hoy[0], hoy[1], hoy[2]);
	var auxFecha = fechaSelect.getTime();
	var auxHoy = hoy.getTime();
	console.log(hoy);
	console.log(fechaSelect);
	if(fechaSelect < hoy){
		return dateHoy();
	} else {
		return fecha;
	}
}

function confirmRechazar(id,cod,reserva,solped){
	var c = confirmar.confirm("¿Seguro desea rechazar?");
	var mensaje = "";
	$(c.aceptar).click(function(){
		if(id==0){
			$("#tr0").remove();
			editar = false;
			agregando = false;
			//getPG();
		} else {
			//var con = confirmar("¿Está seguro de rechazar el programa seleccionado?");
			//console.log(con);
			console.log("/simpleWeb/json/AGRO/RECPF/"+id);
			//$.getJSON("/simpleWeb/json/AGRO/RECPF/"+id, function(data){
				var estado = 5;
				if(reserva > 0){
					var ulrTraspasoReserva = IPSERVERSAP + "JSON_ZMOV_10025.aspx?RESERVA="+reserva;
					console.log(ulrTraspasoReserva);
					var dataTraspasoReserva = [];
					$.ajax({
						url: ulrTraspasoReserva,
						type:	"GET",
						dataType: 'json',
						async: false,
						success: function(data){
							dataTraspasoReserva = data;
						}
					})
					var mensaje2 = "";
					console.log(dataTraspasoReserva);
					var confirmAplicacion = {};
					if(dataTraspasoReserva.T_SALIDA.length > 0){						
						confirmAplicacion.codigo           = 0;
						confirmAplicacion.lista_materiales = [];
						var urlLisMat = "/simpleWeb/json/AGRO/LISTA_ORDEN_DETALLE/"+id;
						console.log(urlLisMat);
						var dataLisMat = [];
						$.ajax({
							url: urlLisMat,
							type:	"GET",
							dataType: 'json',
							async: false,
							success: function(data){
								dataLisMat = data;
							}
						})
						console.log(dataLisMat);
						var listMaterialMovido = [];
						$.each(dataLisMat.lista_materiales, function(k, v){						
							var urlDetalleMaterial = IPSERVERSAP + "JSON_ZMOV_10020.aspx?MATERIAL="+v.codigo_material;
							console.log(urlDetalleMaterial);
							var dataMat = [];
							$.ajax({
								url: urlDetalleMaterial,
								type:	"GET",
								dataType: 'json',
								async: false,
								success: function(data){
									dataMat = data;
								}
							})
							console.log(dataMat);
							var canridadRetirada = 0;
							$.each(dataTraspasoReserva.T_SALIDA, function(kr, vr){
								if(vr.LGORT == 'TRAN') {
									if(vr.MATNR.indexOf(v.codigo_material) != -1){
										if(vr.IANUL == '') {
											canridadRetirada +=  vr.MENGE;
											estado = 6;
										}									
									}
								}
							});
							var listMatrial = {};
							listMatrial.codigo        = v.codigo;
							listMatrial.devolucion    = canridadRetirada;
							listMatrial.cantidad_real = 0;		
							listMatrial.diferencia    = 0;
							confirmAplicacion.lista_materiales.push(listMatrial);
							mensaje2 += "-"+dataMat.LT_DETALLE[0].MAKTX+" Cantidad: "+canridadRetirada+"<br>";
						});
					}
					$.ajax({
						url: "/simpleWeb/json/AGRO/UpdateMaterialRechazado/",
						type:	"PUT",
						data : JSON.stringify(confirmAplicacion),
						dataType: 'json',
						async: false,
						success : function(data, textStatus, jqXHR) {
							console.log(data);
							if(data){
								mensaje += "Tiene Materiales Pendiente Devolución:<br>";
								mensaje += mensaje2;
							}
						},
						beforeSend : function(xhr) {
							xhr.setRequestHeader("Accept","application/json");
							xhr.setRequestHeader("Content-Type","application/json");
						},
						error : function(jqXHR, textStatus, errorThrown) {
							console.log(jqXHR);
							console.log(textStatus);
							console.log(errorThrown);
						}
					})	
					console.log(IPSERVERSAP+"JSON_BAPI_RESERVATION_DELETE.aspx?RESERVA="+reserva);
					$.ajax({						
						url: IPSERVERSAP+"JSON_BAPI_RESERVATION_DELETE.aspx?RESERVA="+reserva,
						type:	"GET",
						dataType: 'json',
						async: false,
						success: function(data){
							mensaje += data.RETURN[0].MESSAGE+"<br>";
						}
					})
				}
					
				if(solped > 0) {
					var posiciones = [];
					var urlGetSolped = IPSERVERSAP+"JSON_BAPI_REQUISITION_GETITEMS.aspx?CENTRO="+$("#dataHuerto").val()+"&SOLPED="+solped;
					var p = 10;
					$.ajax({
						url: urlGetSolped,
						type:	"GET",
						dataType: 'json',
						async: false,
						success: function(data){
							$.each(data, function(k,v){
								var pos = {};
								pos.POSICION = p;
								p += 10;
								posiciones.push(pos);
							})
						}
					})
					console.log(posiciones);
					var parametro = {};
					parametro.PARAMETROS = {};
					parametro.PARAMETROS.NUMERO = solped;
					parametro.PARAMETROS.POSICIONES = posiciones; 
					
					var ulrEliminarSolped = IPSERVERSAP+"JSON_BAPI_REQUISITION_DELETE.aspx?PARAMETRO="+JSON.stringify(parametro);
					console.log(ulrEliminarSolped);
					
					$.ajax({
						url: ulrEliminarSolped,
						type:	"GET",
						dataType: 'json',
						async: false,
						success: function(data){
							mensaje += data.RETURN[0].MESSAGE+"<br>";
						}
					})
				}
				
				var urlRechazar = "/simpleWeb/json/AGRO/RECPF/"+id+"/"+estado;
				console.log(urlRechazar);
				$.ajax({
					url: urlRechazar,
					type:	"GET",
					dataType: 'json',
					async: false,
					success: function(data){
						mensaje += "El programa "+cod+" ha sido rechazado con éxito";
						alerta(mensaje);
						$("#gen"+id).prop("disabled", true);
						$("#rec"+id).prop("disabled", true);
						$("#edit"+id).prop("disabled", true);
						$("#idOrd"+id).html("R");
						$('.swal2-confirm').click(function(){
							closeModal();
						})
					}
				})
			//});
		}
	});
	
}
function savePrograma(id,reserva, solped,idp){
	//console.log(id);
	if(SESION.user == undefined){
		alerta("Se perdió sesión");
		$('.swal2-confirm').click(function(){
			window.location.href = ("login");
		})
		return false;
	}	
	
	if(arrayCuarteles.length == 0){
		alerta("Debe Ingresar al menos un Cuartel para continuar.");
		return false;
	}
	if(arrayMateriales.length == 0){
		alerta("Debe Ingresar al menos un Material para continuar.");
		return false;
	}
	if(!$("#fecha"+id).val()){
		alerta("Ingrese una Fecha estimada");
		return;
	}else if(!$("#EspText"+id).val()){
		alerta("Seleccione una especie");
		return;
	}else if(!$("#VarTest"+id).val()){
		alerta("Seleccione una Variedad");
		return;
	}else if(!$("#estFen"+id).val()){
		alerta("Seleccione un Estado Fenologico");
		return;
	}else if(!$("#progAplicacion"+id).val()){
		alerta("Seleccione un programa de aplicacion");
		return;
	}else if(!$("#mojamiento"+id).val()){
		alerta("Ingrese mojamiento");
		return;
	}else if(!$("#control"+id).val()){
		alerta("Seleccione tipo de Control");
		return;
	}else if(!$("#fechaAlerta"+id).val()){
		alerta("Ingrese una Fecha para el recordatorio");
		return;
	} 
	else if($("#dataHuerto").val() == ""){
		alerta("Debe seleccionar un Campo");
		return;
	}
	$("#loading").show();
	console.log($("#observacion"+id).val());
	var row = {};
	row.codigo              = id;
	row.fecha_estimada      = formatFecha($("#fecha"+id).val());
	row.fecha_alerta        = formatFecha($("#fechaAlerta"+id).val());
	row.tipo_control        = $("#control"+id).val();
	row.nombre_tipo_control = "1";
	row.estado_pf           = "1";
	row.programa_aplicacion = $("#progAplicacion"+id).val();
	row.nombre_programa_aplicacion = "1";
	row.usuario             = SESION.idUser;
	row.usuario_ja          = "1";
	row.nombre_usuario_ja   = "1";
	row.observacion         = $("#observacion"+id).val();
	row.temporada           = $("#temporada").val();
	row.campo               = $("#dataHuerto").val();
	row.nombre_especie      = "1";
//	row.especie		        = $("#EspText"+id+" option[disabled]:selected").val();
	row.variedad      		= $("#VarTest"+id).val();
	row.especie		        = $("#EspText"+id).val();
	row.variedad      		= "0";
	row.nombre_variedad     = $("#VarTest"+id).val().toString();
	row.estado_fenologico   = $("#estFen"+id).val();
	row.nombre_estado_fenologico = "1";
	row.mojamiento          = $("#mojamiento"+id).val();
	row.cuart_PF 			= arrayCuarteles;
	row.mater_PF 			= arrayMateriales;
	row.tipo_programa		= 1;
	row.libro_campo			= $("#libro"+id).val();
	
	console.log(row);
	//return;
	var servicio = "INSERTPF/";
	var mensaje = "";
	if(id > 0){
		servicio = "UPPF/";
		if(reserva > 0) {
			$.ajax({
				url: IPSERVERSAP+"JSON_BAPI_RESERVATION_DELETE.aspx?RESERVA="+reserva,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					mensaje += data.RETURN[0].MESSAGE+"<br>";
				}
			})	
		}
		if(solped > 0){
			var posiciones = [];
			var urlGetSolped = IPSERVERSAP+"JSON_BAPI_REQUISITION_GETITEMS.aspx?CENTRO="+$("#dataHuerto").val()+"&SOLPED="+solped;
			var p = 10;
			$.ajax({
				url: urlGetSolped,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					$.each(data, function(k,v){
						var pos = {};
						pos.POSICION = p;
						p += 10;
						posiciones.push(pos);
					})
				}
			})
			var parametro = {};
			parametro.PARAMETROS = {};
			parametro.PARAMETROS.NUMERO = solped;
			parametro.PARAMETROS.POSICIONES = posiciones; 
			
			var ulrEliminarSolped = IPSERVERSAP+"JSON_BAPI_REQUISITION_DELETE.aspx?PARAMETRO="+JSON.stringify(parametro);
			console.log(ulrEliminarSolped);
			$.ajax({
				url: ulrEliminarSolped,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					mensaje += data.RETURN[0].MESSAGE+"<br>";
				}
			})
		}	
	}
	$.ajax({
		url : "/simpleWeb/json/AGRO/"+servicio,
		type : "PUT",
		data : JSON.stringify(row),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success : function(data, textStatus, jqXHR) {
			if(id > 0){
				if(data){
					$("#fecha"+id).attr('disabled','disabled');
					$("#fechaAlerta"+id).attr('disabled','disabled');
					$("#progAplicacion"+id).attr('disabled','disabled');
					$("#observacion"+id).attr('disabled','disabled');
					$("#temporada"+id).attr('disabled','disabled');
					$("#dataHuerto"+id).attr('disabled','disabled');
					$("#VarTest"+id).attr('disabled','disabled');
					$("#EspText"+id).attr('disabled','disabled');
					$("#mojamiento"+id).attr('disabled','disabled');
					$("#cua"+id).attr('disabled','disabled');
					$("#estFen"+id).attr('disabled','disabled');
					$("#libro"+id).attr('disabled','disabled');
					$("#mat"+id).attr('disabled','disabled');
					$("#control"+id).attr('disabled','disabled');
					$("#save"+id).hide();
					$("#edit"+id).show();
					$("#gen"+id).attr('disabled',false);
					$("#rec"+id).attr('disabled',false);
					$("#gen"+id).attr("onclick","hrefOrden("+id+",'')");
					$("#edit"+id).attr("onclick","editPrograma("+id+",'')");
					alerta(mensaje + " Programa "+ idp +" Guardado Correctamente");
					$("#loading").hide();
				} else {
					swal({
						  title: "Error!",
						  text: "No se ha podido registrar la infomacion, consulte con el administrador del sistema",
						  type: "error",
						  confirmButtonText: "Aceptar"
					});
					$("#loading").hide();
				}
				
				arrayCuarteles = [];
				arrayMateriales = [];
				agregando = false;
				editar = false;
				cm = 0;
			}
			else {
				if(data.codigo > 0){
					
					alerta(mensaje + " Programa "+ data.id +" Guardado Correctamente");
					$('.swal2-confirm').click(function(){
						//loadPrograma(arrayPF);
						arrayCuarteles = [];
						arrayMateriales = [];
						agregando = false;
						cm = 0;
					})
					editar = false;
					if(id > 0){
						data.id = idp;
						data.codigo = id;
					} 
					var tblFito = [];
					var disabled = "";
					tblFito[0] = '<div style="background-color: white; height:60px" id="'+data.codigo+'">'+data.id+'</div>';
					var ord = "";
					tblFito[1] =	"<div id='idOrd"+data.codigo+"'>"+ord+"</div>";
					tblFito[2] =	"<input size='16' type='text' class='form-control' value='"+$("#fecha"+id).val()+"' id='fecha"+data.codigo+"' name='fecha' readonly onchange='javascript: valDias(this)' disabled>" ;
					tblFito[3] =	"<select  id='EspText"+data.codigo+"' class='form-control2 input-sm2' style='width:160px'  onchange='javascript: changeEspecie(this.id);' disabled>";
					$.each(arrayEspecie,function(key,value){
						if(value.codigo == $("#EspText"+id).val()){
							tblFito[3] += "<option value="+value.codigo+" selected>"+value.especie+"</option>";
						} else {
							tblFito[3] += "<option value="+value.codigo+">"+value.especie+"</option>";
						}
					});
					tblFito[3] += "	</select>" ;
					tblFito[4] =	"<select id='VarTest"+data.codigo+"' name='variedad' disabled style='width:200px' onchange='cargarCuartel("+data.codigo+");'	 class='form-control input-sm variedad'  style='width:200px' >";
					var variedades = $("#VarTest"+id).val().toString().split(",");
					var validaVariedad = [];
					$.each(auxCuartel,function(kk,vv){		
						if($("#EspText"+id).val() == vv.especie && vv.campo == $("#dataHuerto").val()){
							if(validaVariedad.indexOf(vv.variedad) == -1){
								tblFito[4] += "<option value="+vv.variedad+">"+vv.nvariedad+"</option>";
								validaVariedad.push(vv.variedad);
							}
								
						}
					});
					tblFito[4] += "</select>" ;
					tblFito[5] =	"<button id='cua"+data.codigo+"' title='Agregar Cuarteles' onclick='javascript: modalAddCuartel("+data.codigo+");' disabled class='btn blue btn-outline btn-sm'><i class='fa fa-pagelines fa-lg'></i></button>" ;
					tblFito[6] =	"<select id='estFen"+data.codigo+"' style='width:180px' name='edit'  class='form-control2 input-sm2' disabled>";
					$.each(arrayEstadoFeno,function(key,value){
						if(value.especie == $("#EspText"+id).val()) {
							if(value.codigo == $("#estFen"+id).val()) {
								tblFito[6] += '<option value="'+value.codigo+'" selected>'+value.estado_fenologicos+'</option>';
							} else {
								tblFito[6] += '<option value="'+value.codigo+'" >'+value.estado_fenologicos+'</option>';
							}	
						}
					});
					tblFito[6] +=	"</select>" ;
					tblFito[7] =	"<select id='progAplicacion"+data.codigo+"' style='width:180px' onchange='setMojamiento("+data.codigo+");' name='map' class='form-control2 input-sm2' disabled>";
					$.each(arrayProgramaApl,function(key,value){
						if(value.codigo == $("#progAplicacion"+id).val()) {
							tblFito[7] += '<option value="'+value.codigo+'" selected>'+value.descripcion+'</option>';	
						}else {
							tblFito[7] += '<option value="'+value.codigo+'">'+value.descripcion+'</option>';	
						}
					});
					tblFito[7] +=	"</select></td>" ;
					tblFito[8] =	"<input type='number' name='edit' id='mojamiento"+data.codigo+"' onchange='recalcularMaterial(this.value,"+data.codigo+")' value='"+$("#mojamiento"+id).val()+"' class='form-control' disabled min='0'>" ;
					tblFito[9] =	"<button id='mat"+data.codigo+"' disabled title='Agregar Material' onclick='javascript: modalAddMaterial("+data.codigo+");' class='btn blue btn-outline btn-sm'><i class='fa fa-map-o fa-lg'></i></button>" ;
					tblFito[10] =	"<select id='control"+data.codigo+"' name='map' class='form-control2 input-sm2' style='width:180px' disabled>";
					$.each(arrayControl,function(key,value){
						if(value.especie == $("#EspText"+id).val()) {
							if(value.codigo == $("#control"+id).val()) {
								tblFito[10] += '<option value="'+value.codigo+'" selected>'+value.control_aplicacion+'</option>';
							} else {
								tblFito[10] += '<option value="'+value.codigo+'">'+value.control_aplicacion+'</option>';
							}
						}
					});
					tblFito[10] +=	"</select>" ;
					tblFito[11] =	"<input size='16' type='text' class='form-control' value='"+$("#fechaAlerta"+id).val()+"' id='fechaAlerta"+data.codigo+"' name='fecha' readonly onchange='valFechaAlerta("+data.codigo+")' disabled>" ;
					tblFito[12] =	"<textarea class='form-control' name='edit' id='observacion"+data.codigo+"' value='"+$("#observacion"+id).val()+"' disabled>"+$("#observacion"+id).val()+"</textarea>" ;
					tblFito[13] =  '<td><select id="libro'+data.codigo+'" style="width:60px" name="map" class="form-control2 input-sm2" disabled>';
					if($("#libro"+id).val() == "0") {
						tblFito[13] +=	'<option value="0" selected>SI</option>';
						tblFito[13] +=	'<option value="1">NO</option>';
					} else {
						tblFito[13] +=	'<option value="0">SI</option>';
						tblFito[13] +=	'<option value="1"  selected>NO</option>';
					}					
					tblFito[13] +=	'</select></td>';
					
					tblFito[14] =		"<button id='save"+data.codigo+"'  title='Guardar' "+disabled+" style='display: none;' onclick='javascript: savePrograma("+data.codigo+",0,0,"+data.id+");' class='btn green-dark btn-outline btn-sm' ><i class='icon-cloud-upload fa-lg'></i></button>" ;
					tblFito[14] +=		"<button id='edit"+data.codigo+"'  title='Modificar' "+disabled+" onclick='javascript: editPrograma("+data.codigo+",0);' class='btn yellow btn-outline btn-sm' ><i class='fa fa-pencil-square-o fa-lg'></i></button>" ;
					tblFito[14] +=		"<button id='gen"+data.codigo+"' title='Generar Orden' "+disabled+" onclick='javascript: hrefOrden("+data.codigo+",null);' class='btn green btn-outline btn-sm'><i class='fa fa-arrow-right fa-lg'></i></button>" ;
					tblFito[14] +=		"<button id='rec"+data.codigo+"'  title='Rechazar' "+disabled+" onclick='javascript: confirmRechazar("+data.codigo+","+data.id+",0,0);' class='btn red btn-outline btn-sm'><i class='fa fa-close fa-lg'></i></button>" ;
					
					
					var rowNode = table
					    .row.add( tblFito )
					    .draw()
					    .node();
					$('.form-control.input-sm').select2({
						multiple: true,
						placeholder: "Seleccione",
						closeOnSelect: false
					});
					$('.form-control2.input-sm2').select2({
						multiple: false,
						placeholder: "Seleccione"
					});
					arrayVariedades["VarTest"+data.codigo] = variedades;
					$("#VarTest"+data.codigo).val(variedades).trigger('change');
					//$("#libro"+data.codigo).val($("#libro"+id).val()).trigger('change');
					$("#loading").hide();
				} else {
					swal({
						  title: "Error!",
						  text: "No se ha podido registrar la infomacion, consulte con el administrador del sistema",
						  type: "error",
						  confirmButtonText: "Aceptar"
					});
					$("#loading").hide();
				}
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			swal({
				  title: "Error!",
				  text: "No se ha podido registrar la infomacion, consulte con el administrador del sistema",
				  type: "error",
				  confirmButtonText: "Aceptar"
			});
			$("#loading").hide();
		}
	});
	//ADDCPF
	

	
	
}



function loadSelects(){
	
	
}
function cambioPrgApli(id){
	var prgAplicacion =  $("#"+id.id).val();
	var idSplit = id.id.split("");
	if(prgAplicacion != ""){
		$("#mat"+idSplit[idSplit.length-1]).prop("disabled", false);
		if(prgAplicacion == "Fertilizantes de huerto"){
			$("#mojamiento"+idSplit[idSplit.length-1]).prop("disabled", true);
		}else{
			$("#mojamiento"+idSplit[idSplit.length-1]).prop("disabled", false);
		}
	}else{
		$("#mat"+idSplit[idSplit.length-1]).prop("disabled", true);
	}
}
var auxEx = 100;
function changeCuartel(obj,id){
	console.log(obj);
	$.each(auxCuartel, function(k,v){
		if(obj == v.codigo){
			console.log(v.codigo);
			$("#hecCuartel"+id).val(v.superficie);
			$("#hecCuartel"+id).attr({"max":v.superficie, "min":0});
		}
	})
}

function createTblCuartel(x,id){
	idCuartel++;
	var newCuartel = 'nw'+idCuartel;
	var tblCuartel = "";
	tblCuartel += '<tr id="trnew'+newCuartel+'">';
	tblCuartel += 	'<td>';
	tblCuartel += 		'<select class="btn blue btn-outline btn-circle btn-md" name="cuartel" id="cuartel'+newCuartel+'" onchange="changeCuartel(this.value,\''+newCuartel+'\')">';
	tblCuartel +=			selectCuartel(id);
	tblCuartel +=		'</select>';
	tblCuartel += 	'</td>';
	tblCuartel += 	'<td id="tdnew'+newCuartel+'">';
	tblCuartel += 		'<input type="number" class="form-control input-circle" id="hecCuartel'+newCuartel+'"  onchange="validaMaxHas(this.id)" name="hecCuartel" onselect="valHas(this.id);" onkeyup="valHas(this.id);" ">';
	tblCuartel += 		'<br><label id="lblnew'+newCuartel+'" style="color: #FF0000; display: none;"">El valor no puede ser mayor a las hectáreas del cuartel seleccionado</label>';
	tblCuartel += 	'</td>';
	tblCuartel += 	'<td>';
	tblCuartel += 		'<a class="" id="desc'+newCuartel+'" onclick="descartarCuartel('+newCuartel+');">';
	tblCuartel +=			'<i class="fa fa-minus">';
	tblCuartel +=		'</a>';
	tblCuartel += 	'</td>';
	tblCuartel += '</tr>';
	return tblCuartel;
}
function valHas(e){
	e = e.split("hecCuartel");
	e = e[1];
	var c = $("#cuartel"+e).val();
	var validate = true;
	$.each(auxCuartel, function(k,v){
		if(c == v.id_cuartel){
			if($("#hecCuartel"+e).val() > v.has*1){
				validate = false;
			}
		}
	})
	if(!validate){
		$("#td"+e).addClass("has-error");
		$("#lbl"+e).show();
		return;
	}else{
		$("#td"+e).removeClass("has-error");
		$("#lbl"+e).hide();
		return;
	}
};
function descartarCuartel(desc){
	$("#tr"+desc).remove() && $("#trnew"+desc).remove();
}

function validaMaxHas(id){
	var v = parseFloat($('#'+id).val());
	var m = parseFloat($('#'+id).attr('max'));
	//var min = parseFloat($('#'+id).attr('min'));
	if(v > m) {
		alerta("No puede agregar mas hectáreas de las que posee el cuartel");
		$('#'+id).val(m);
	}
	if(v < 0){
		alerta("No puede ingresar número menor que 0");
		$('#'+id).val(0);
	}
	calcularTotalHas();
}

function selectTodoCuartel(){
	console.log($("#cbSelectTodo").is(':checked'));
	if($("#cbSelectTodo").is(':checked')){
		$('.cbCuartel').prop('checked', true);
	} else {
		$('.cbCuartel').prop('checked', false);
	}
	calcularTotalHas();
}

function modalAddCuartel(x){
	if($('#EspText'+x).val()== ""){
		alerta("Debe seleccionar una Especie");
		return false;
	}
	if($('#VarTest'+x).val()== "" || $('#VarTest'+x).val() == null){
		alerta("Debe seleccionar una Variedad");
		return false;
	}
	var validate = true;
	var bodyAddCuartel = "";
	var arrIdCuartel = [];
	var tblAddCuartel = "";
	tblAddCuartel +='<div class="table-responsive" id="ignore2">';
	tblAddCuartel +=	'<table class="table table-striped table-condensed" id="tbl_colaboradores">';
	tblAddCuartel +=		'<thead style="text-align: center;">';
	tblAddCuartel +=			'<tr>';
	tblAddCuartel +=				"<th style='width: 2%; text-align: center;'><input type='checkbox' checked id='cbSelectTodo' onchange='selectTodoCuartel()' ></th>";
	tblAddCuartel +=				'<th style="text-align: center;">Variedad</th>';
	tblAddCuartel +=				'<th style="text-align: center;">Cuartel</th>';
	tblAddCuartel +=				'<th style="text-align: center;">Hectáreas</th>';
	tblAddCuartel +=			'</tr>';
	tblAddCuartel +=		'</thead>';
	tblAddCuartel +=		'<tbody id="tblCuartel">';
	console.log(arrayCuarteles);
	var tHas = 0;
	$.each(arrayCuarteles, function(k,va){
		bodyAddCuartel +="<tr>" ;
		bodyAddCuartel +=	"<td><input type='checkbox' class='cbCuartel' onchange='calcularTotalHas()' id='cbCuartel"+va.cuartel+"' "+va.estado+" value='"+va.cuartel+"' ></td>" ;
		bodyAddCuartel +=	"<td>"+va.nVariedad+"</td>" ;
		bodyAddCuartel +=	"<td>"+va.nCuartel+"</td>" ;
		bodyAddCuartel +=	"<td>" ;
		bodyAddCuartel +=		"<input type='text' class='form-control hasReal' value='"+formatNumber((va.has+"").replace(",", "."))+"' onchange='validaMaxHas(this.id)' max='"+va.max+"' min='0' name='hecCuartel' id='hecCuartel"+va.cuartel+"'>" ;
		//bodyAddCuartel +=		"<input type='number' class='form-control hasReal' value='"+va.has+"' onchange='validaMaxHas(this.id)' max='"+va.max+"' min='0' name='hecCuartel' id='hecCuartel"+va.cuartel+"'>" ;
		bodyAddCuartel +=	"</td>" ;
		bodyAddCuartel +="</tr>";
		tHas += va.has;
	});
	bodyAddCuartel +="<tr>" ;
	bodyAddCuartel +=	"<td></td>" ;
	bodyAddCuartel +=	"<td></td>" ;
	bodyAddCuartel +=	"<td>Total</td>" ;
	bodyAddCuartel +=	"<td id='totalHas'></td>" ;
	bodyAddCuartel +="</tr>";
	tblAddCuartel += bodyAddCuartel;
	tblAddCuartel += 		'</tbody>';
	tblAddCuartel +=	'</table>';
	tblAddCuartel +='</div>';
	tblAddCuartel +='<div class="col-sm-12 col-md-12">';
	tblAddCuartel +=	'<div class="btn btn-circle blue btn-outline" id="addCuartel" onclick="addCuartel('+x+')" >Guardar</div>';
	tblAddCuartel +=	'<div class="btn btn-circle red btn-outline" onclick="closeModal();">Cancelar</div>';
	tblAddCuartel +='</div>';
	popUp("Seleccione Cuartel", tblAddCuartel, true, '500px', true);
	calcularTotalHas();
}

function calcularDosis100(idM,idP){
	var mojamiento = parseInt($('#mojamiento'+idP).val());
	
	var dosishasPuntoDecimalSinComa = $('#dosisHa'+idM).val().replace(".","").replace(",",".");
	var dosishas = parseFloat(dosishasPuntoDecimalSinComa);
	//has = has.toString();
	var hasPuntoDecimalSinComa = has;
	
	var dosis100 = parseFloat(dosishas / (mojamiento/100)) ;
	console.log($("#lum"+idM).html());
	if($("#lum"+idM).html() == 'G'){
		var total    = (dosishas ) * parseFloat(hasPuntoDecimalSinComa);
	} else {
		var total    = (dosishas / 1000) * parseFloat(hasPuntoDecimalSinComa);
	}
	$('#dosisHa'+idM).val(formatNumber2(dosishas));
	$('#dosiscien'+idM).val(formatNumber2(dosis100));
	$('#total'+idM).val(formatNumber2(total));
}



function calcularDosisHas(idM,idP){
//	var shas = 0;
////	$.each(arrayCuarteles, function(k,va){
////		shas += va.has;
////	})

	var mojamiento = parseInt($('#mojamiento'+idP).val());
	console.log(mojamiento);
	var dosis100PuntoDecimalSinComa = $('#dosiscien'+idM).val().replace(".","").replace(",",".");
	console.log(dosis100PuntoDecimalSinComa);
	var dosis100 = parseFloat(dosis100PuntoDecimalSinComa);
	console.log(dosis100);
	//has = has.toString();
	console.log(has);
	var hasPuntoDecimalSinComa = has;
	console.log(hasPuntoDecimalSinComa);
	var dosishas = parseFloat((mojamiento/100) * dosis100);
	console.log(dosishas);
	console.log($("#lum"+idM).html());
	if($("#lum"+idM).html() == 'G'){
		var total    = (parseFloat(dosishas) ) * parseFloat(hasPuntoDecimalSinComa);
	} else {
		var total    = (parseFloat(dosishas) / 1000) * parseFloat(hasPuntoDecimalSinComa);
	}
	
	console.log(total);
	$('#dosiscien'+idM).val(formatNumber2(dosis100));
	$('#dosisHa'+idM).val(formatNumber2(dosishas));
	$('#total'+idM).val(formatNumber2(total));
}

function recalcularMaterial(mojamiento,id){
	console.log(arrayMateriales);
	var tempMateriales = arrayMateriales;
	arrayMateriales = [];
	$.each(tempMateriales, function(k,va){
		var dosis100 = parseFloat(va.dosis_100);
		console.log(dosis100);
		var dosishas = (mojamiento/100) * dosis100;
		console.log(dosishas);
		if($('#progAplicacion'+id).val() == 3){
			var cantidad =  (dosishas) * parseFloat(has);
			va.cantidad  = cantidad;
			va.dosis_has  = dosishas;
		} else {
			if(va.um == 'G') {
				var cantidad     = (dosishas) * parseFloat(has);
				va.cantidad      = cantidad;
				va.dosis_has     = dosishas;
			} else {
				var cantidad     = (dosishas / 1000) * parseFloat(has);
				va.cantidad      = cantidad;
				va.dosis_has     = dosishas;
			}
			
		}
		
		arrayMateriales.push(va);
	});
	console.log(arrayMateriales);
}

function calcularTotalFS(id,x){
	var por = parseFloat($('#L'+id).text().split('%')[0]);
	var valor = parseFloat($('#'+id).val());
	var dosisHa = (valor / por) * 100;
	$('#dosisHa'+x).val(formatNumber(dosisHa));
	//has = has.toString();
	var total = (dosisHa * parseFloat(has));
	$('#total'+x).val(formatNumber2(total));
	calcularProcentajeFS(x);
}
function calcularProcentajeFS(x){
	var Niteogeno = parseFloat($('#LNiteogeno'+x).text().split('%')[0]);
	var Fosforo = parseFloat($('#LFosforo'+x).text().split('%')[0]);
	var Potasio = parseFloat($('#LPotasio'+x).text().split('%')[0]);
	var Azufre = parseFloat($('#LAzufre'+x).text().split('%')[0]);
	var Calcio = parseFloat($('#LCalcio'+x).text().split('%')[0]);
	var Zinc = parseFloat($('#LZinc'+x).text().split('%')[0]);
	var Fierro = parseFloat($('#LFierro'+x).text().split('%')[0]);
	var Cobre = parseFloat($('#LCobre'+x).text().split('%')[0]);
	var Magnesio = parseFloat($('#LMagnesio'+x).text().split('%')[0]);
	var dosisHa = parseFloat($('#dosisHa'+x).val().replace(".","").replace(",","."));
	var total = (dosisHa * parseFloat(has)) ;
	$('#Niteogeno'+x).val(formatNumber2((dosisHa * Niteogeno / 100)));
	$('#Fosforo'+x).val(formatNumber2((dosisHa * Fosforo / 100)));
	$('#Potasio'+x).val(formatNumber2((dosisHa * Potasio / 100)));
	$('#Azufre'+x).val(formatNumber2((dosisHa * Azufre / 100)));
	$('#Calcio'+x).val(formatNumber2((dosisHa * Calcio / 100)));
	$('#Zinc'+x).val(formatNumber2((dosisHa * Zinc / 100)));
	$('#Fierro'+x).val(formatNumber2((dosisHa * Fierro / 100)));
	$('#Cobre'+x).val(formatNumber2((dosisHa * Cobre / 100)));
	$('#Magnesio'+x).val(formatNumber2((dosisHa * Magnesio / 100)));
	$('#total'+x).val(formatNumber2(total));
	$('#dosisHa'+x).val(formatNumber2(dosisHa));
}

function modalAddMaterial(id){
	console.log(arrayMaterial);
	//var splitId = id.split("");
	//var prgAplicacion =  $("#progAplicacion"+splitId[splitId.length-1]).val();
	if(arrayCuarteles.length == 0 && id == 0){
		alerta("Debe Ingresar al menos un Cuartel para continuar.");
		return false;
	}
	if(has == 0){
		alerta("Cantidad de Hectáreas es 0");
		return false;
	}
	var prgAplicacion =  $("#progAplicacion"+id).val();
	var addMaterial = '';
	if(prgAplicacion != "3" && ($('#mojamiento'+id).val() == "" || $('#mojamiento'+id).val() == "0")){
		alerta("Mojamiento no puede ser 0");
		return false;
	}
	
	addMaterial +='<div class="table-responsive" id="ignore2">';
	addMaterial +=	'<table class="table table-striped table-condensed" id="tbl_colaboradores">';
	addMaterial +=		'<thead style="text-align: center;">';
	addMaterial +=			'<tr>';
	addMaterial +=				'<th style="text-align: center;">Material</th>';
	var width = "1200px";
	if(prgAplicacion == "3"){
		addMaterial +=			'<th style="text-align: center;">Nitrógeno</th>';
		addMaterial +=			'<th style="text-align: center;">Fósforo</th>';
		addMaterial +=			'<th style="text-align: center;">Potasio</th>';
		addMaterial +=			'<th style="text-align: center;">Azúfre</th>';
		addMaterial +=			'<th style="text-align: center;">Calcio</th>';
		addMaterial +=			'<th style="text-align: center;">Zinc</th>';
		addMaterial +=			'<th style="text-align: center;">Fierro</th>';
		addMaterial +=			'<th style="text-align: center;">Cobre</th>';
		addMaterial +=			'<th style="text-align: center;">Magnesio</th>';
		addMaterial +=			'<th style="text-align: center;">Kilos (Has)</th>';
		width = "1800px";
	}else{
		addMaterial +=			'<th style="text-align: center;">Código Material</th>';
		addMaterial +=			'<th style="text-align: center;">Dosis (100)</th><th></th>';		
		addMaterial +=			'<th style="text-align: center;">Dosis (Ha)</th><th></th>';
	}
	
	addMaterial +=				'<th style="text-align: center;">Has</th>';
	addMaterial +=				'<th style="text-align: center;width:100px">Total</th>';
	addMaterial +=				'<th style="text-align: center;">UM</th>';
	addMaterial +=				'<th style="text-align: center;">Descartar</th>';
	addMaterial +=			'</tr>';
	addMaterial +=		'</thead>';
	addMaterial +=		'<tbody id="tblMaterial">';
	var bodyAddMaterial = '';
	var tblMaterial2 = '';
	console.log(id);
	//if(id==0){
	//	console.log(arrayMateriales);
		$.each(arrayMateriales, function(k,va){
			console.log(arrayMateriales);
			bodyAddMaterial +="<tr class='trM"+cm+"'>" ;
			bodyAddMaterial +=	"<td>" ;
			bodyAddMaterial +=		"<select class='form-control2 input-sm2 material' name='material' onchange='cabeceraMaterial(this.value,"+cm+",1)' id='material"+cm+"'>" ;
			bodyAddMaterial +=			selectMaterial(va.codigo_material,prgAplicacion);
			//console.log(selectMaterial(va.codigo_material));
			bodyAddMaterial +=		"</select>" ;
			bodyAddMaterial +=	"</td>" ;
			//bodyAddMaterial +=	"<td>" ;
			if(prgAplicacion == "3"){				
				bodyAddMaterial += '<td><label id="LNiteogeno'+cm+'"></label></td>';
				bodyAddMaterial += '<td><label id="LFosforo'+cm+'"></label></td>';
				bodyAddMaterial += '<td><label id="LPotasio'+cm+'"></label></td>';
				bodyAddMaterial += '<td><label id="LAzufre'+cm+'"></label></td>';
				bodyAddMaterial += '<td><label id="LCalcio'+cm+'"></label></td>';
				bodyAddMaterial += '<td><label id="LZinc'+cm+'"></label></td>';
				bodyAddMaterial += '<td><label id="LFierro'+cm+'"></label></td>';
				bodyAddMaterial += '<td><label id="LCobre'+cm+'"></label></td>';
				bodyAddMaterial += '<td><label id="LMagnesio'+cm+'"></label></td>';
				bodyAddMaterial += "<td></td><td>"+formatNumber(has)+"</td><td></td><td></td>";
				
				tblMaterial2 = '<tr class="trM'+cm+'">';
				tblMaterial2 += '<td><label id="codMaterial'+cm+'"></label></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " value="'+formatNumber2(va.NITROGENO)+'" name="Niteogeno" id="Niteogeno'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " value="'+formatNumber2(va.FOSFORO)+'" name="Fosforo" id="Fosforo'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " value="'+formatNumber2(va.POTASIO)+'" name="Potasio" id="Potasio'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " value="'+formatNumber2(va.AZUFRE)+'" name="Azufre" id="Azufre'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " value="'+formatNumber2(va.CALCIO)+'" name="Calcio" id="Calcio'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " value="'+formatNumber2(va.ZINC)+'" name="Zinc" id="Zinc'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " value="'+formatNumber2(va.FIERRO)+'" name="Fierro" id="Fierro'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " value="'+formatNumber2(va.COBRE)+'" name="Cobre" id="Cobre'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " value="'+formatNumber2(va.MANGANESO)+'" name="Magnesio" id="Magnesio'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " name="dosisHa" id="dosisHa'+cm+'" placeholder="" value="'+formatNumber2(va.dosis_has)+'" onchange="calcularProcentajeFS('+cm+')"></td>';
				tblMaterial2 += '<td></td><td><input type="text" type="text" class="form-control " name="total" id="total'+cm+'" placeholder="Total" value="'+formatNumber2(va.cantidad)+'" disabled></td>';
				tblMaterial2 += "<td><label id='lum"+cm+"'></label></td></tr>";
				
			} else {
				bodyAddMaterial += 		'<td><label id="codMaterial'+cm+'"></label></td>';
				bodyAddMaterial +=		"<td><input type='text' class='form-control' value='"+formatNumber2(va.dosis_100)+"' onchange='calcularDosisHas("+cm+","+id+")' name='dosiscien' id='dosiscien"+cm+"'></td><td><label id='lbDosCien"+cm+"'></label></td>" ;
				bodyAddMaterial +=		"<td><input type='text' class='form-control' value='"+formatNumber2(va.dosis_has)+"' onchange='calcularDosis100("+cm+","+id+")' name='dosisHa' id='dosisHa"+cm+"'></td><td><label id='lbHas"+cm+"'></label></td>" ;
				bodyAddMaterial +=      "<td>"+formatNumber(has)+"</td>";
				//var total = parseFloat(has) * parseFloat(va.dosis_has);
				bodyAddMaterial +=		"<td><input type='text' class='form-control' value='"+formatNumber2(va.cantidad)+"' disabled name='total' id='total"+cm+"'></td>" ;
				bodyAddMaterial += 		"<td><label id='lum"+cm+"'></label></td>";
			}
			//bodyAddMaterial +=	"</td>" ;
			bodyAddMaterial += '<td style="display:none"><input type="hidden" name="almacen" value="'+va.almacen+'" id="almacen'+cm+'"></td>'
			bodyAddMaterial +=	"<td>" ;
			bodyAddMaterial +=		"<a class='' id='des"+cm+"' onclick='descartarMaterial("+cm+");'>";
			bodyAddMaterial +=			"<i class='fa fa-minus'>";
			bodyAddMaterial +=		"</a>" ;
			bodyAddMaterial +=	"</td>";
			bodyAddMaterial +="</tr>";
			bodyAddMaterial += tblMaterial2;
			cm++;
		});
	
		addMaterial += bodyAddMaterial;
		//addMaterial +=			createTblMaterial(id);
		addMaterial +=		'</tbody>';
		addMaterial +=	'</table>';
		addMaterial +='</div>';
		addMaterial +='<div style="text-align: right;">';
		addMaterial +=	'<a id="addMaterial" class="" onclick="javascript: menuAddMaterial('+id+');">';
		addMaterial +=		'<i class="fa fa-plus"></i>';
		addMaterial +=	'</a>';
		addMaterial +='</div>';
		addMaterial +='<div class="col-sm-12 col-md-12">';
		addMaterial +=		'<div class="btn btn-circle blue btn-outline" id="registrarIncidencia" onclick="addMaterial('+id+')" >Guardar</div>';
		addMaterial +=		'<div class="btn btn-circle red btn-outline" onclick="closeModal();">Cancelar</div>';
		addMaterial +='</div>';
		popUp("Seleccione Material", addMaterial, true, width, true);
		setTimeout(function(){ $( ".material").trigger( "change" ); }, 700);
		$('.form-control2.input-sm2').select2({
			multiple: false,
			placeholder: "Seleccione"

		});
	//});
}
function addMaterial(id){
	var validate = true;
	var prgAplicacion =  $("#progAplicacion"+id).val();
	var material = document.getElementsByName("material");
	var dosiscien = document.getElementsByName("dosiscien");
	var dosisHa = document.getElementsByName("dosisHa");
	var Niteogeno = document.getElementsByName("Niteogeno");
	var Fosforo = document.getElementsByName("Fosforo");
	var Potasio = document.getElementsByName("Potasio");
	var Azufre = document.getElementsByName("Azufre");
	var Calcio = document.getElementsByName("Calcio");
	var Zinc = document.getElementsByName("Zinc");
	var Fierro = document.getElementsByName("Fierro");
	var Cobre = document.getElementsByName("Cobre");
	var Magnesio = document.getElementsByName("Magnesio");
	var Total = document.getElementsByName("total");
	var Almacen = document.getElementsByName("almacen");
	console.log(dosiscien);
	arrayMateriales = [];
	for(i = 0; i < material.length; i++){
		
		if(parseFloat(Total[i]['value'])<0 || Total[i]['value']=='-' || Total[i]['value']==0 || Total[i]['value']=='')
		{
			alerta("No puede ingresar valores vacio");
			
			return;			
		}
		var arrayMtPf = {}; 
		arrayMtPf.codigo = 0;
		arrayMtPf.codigo_pf       = id;
		arrayMtPf.codigo_material = material[i]['value'];
		arrayMtPf.almacen 		  = Almacen[i]['value'];
		arrayMtPf.cantidad        = 0;
		if(prgAplicacion == "3"){
			arrayMtPf.NITROGENO = parseFloat((Niteogeno[i]['value']).replace(".","").replace(",","."));
			arrayMtPf.FOSFORO   = parseFloat((Fosforo[i]['value']).replace(".","").replace(",","."));
			arrayMtPf.POTASIO   = parseFloat((Potasio[i]['value']).replace(".","").replace(",","."));
			arrayMtPf.AZUFRE    = parseFloat((Azufre[i]['value']).replace(".","").replace(",","."));
			arrayMtPf.CALCIO    = parseFloat((Calcio[i]['value']).replace(".","").replace(",","."));
			arrayMtPf.ZINC	    = parseFloat((Zinc[i]['value']).replace(".","").replace(",","."));		
			arrayMtPf.FIERRO    = parseFloat((Fierro[i]['value']).replace(".","").replace(",","."));
			arrayMtPf.COBRE     = parseFloat((Cobre[i]['value']).replace(".","").replace(",","."));
			arrayMtPf.MANGANESO = parseFloat((Magnesio[i]['value']).replace(".","").replace(",","."));
			arrayMtPf.dosis_has = parseFloat((dosisHa[i]['value']).replace(".","").replace(",","."));
			arrayMtPf.cantidad  = parseFloat((Total[i]['value']).replace(".","").replace(",","."));
		} else {
			arrayMtPf.dosis_100 = parseFloat((dosiscien[i]['value']+"").replace(".","").replace(",","."));
			arrayMtPf.dosis_has = parseFloat((dosisHa[i]['value']+"").replace(".","").replace(",","."));
			arrayMtPf.cantidad  = parseFloat((Total[i]['value']+"").replace(".","").replace(",","."));
			arrayMtPf.um        = $("#lum"+Total[i]['id'].replace("total","")).html();
		}
		arrayMateriales.push(arrayMtPf);
	}
	console.log(arrayMateriales);
	closeModal();
	//alerta("Se ha guaradado correctamente.");  
}
function menuAddCuartel(x){
	countC++;
	$("#tblCuartel").append(createTblCuartel(countC,x));
	//selectCuartel(x);
}
function menuAddMaterial(x){
	countMa++;
	$("#tblMaterial").append(createTblMaterial(x));
	$('.form-control2.input-sm2').select2({
		multiple: false,
		placeholder: "Seleccione"
	});
}

function cabeceraMaterial(id, x, guardado){
	//console.log(x+":"+id);
	//$.getJSON('/simpleWeb/json/AGRO/DETALLE_MATERIAL/'+id, function(data){
	//console.log(IPSERVERSAP + "/SCLEM/JSON_ZMOV_10020.aspx?MATERIAL="+id);
	$.getJSON(IPSERVERSAP + "JSON_ZMOV_10020.aspx?MATERIAL="+id, function(data){
		data = data.LT_DETALLE[0];
		//console.log(data);
		//console.log(data.MTART);
		$('#codMaterial'+x).html(parseInt(id));
		if(data.MTART == 'ZFER'){
			if(data.NITROGENO == 0){
				$('#Niteogeno'+x).attr('disabled', true);
			} else {
				$('#Niteogeno'+x).attr('disabled', false);				
			}
			if(data.FOSFORO == 0){
				$('#Fosforo'+x).attr('disabled', true);
			} else {
				$('#Fosforo'+x).attr('disabled', false);				
			}
			if(data.POTASIO == 0){
				$('#Potasio'+x).attr('disabled', true);
			} else {
				$('#Potasio'+x).attr('disabled', false);				
			}
			if(data.AZUFRE == 0){
				$('#Azufre'+x).attr('disabled', true);
			} else {
				$('#Azufre'+x).attr('disabled', false);				
			}
			if(data.CALCIO == 0){
				$('#Calcio'+x).attr('disabled', true);
			} else {
				$('#Calcio'+x).attr('disabled', false);				
			}
			if(data.ZINC == 0){
				$('#Zinc'+x).attr('disabled', true);
			} else {
				$('#Zinc'+x).attr('disabled', false);				
			}
			if(data.FIERRO == 0){
				$('#Fierro'+x).attr('disabled', true);
			} else {
				$('#Fierro'+x).attr('disabled', false);				
			}
			if(data.COBRE == 0){
				$('#Cobre'+x).attr('disabled', true);
			} else {
				$('#Cobre'+x).attr('disabled', false);				
			}
			if(data.MANGANESO == 0){
				$('#Magnesio'+x).attr('disabled', true);
			} else {
				$('#Magnesio'+x).attr('disabled', false);				
			}
			$('#LNiteogeno'+x).html(data.NITROGENO + " %");
			$('#LFosforo'+x).html(data.FOSFORO + " %");
			$('#LPotasio'+x).html(data.POTASIO + " %");
			$('#LAzufre'+x).html(data.AZUFRE + " %");
			$('#LCalcio'+x).html(data.CALCIO + " %");
			$('#LZinc'+x).html(data.ZINC + " %");
			$('#LCobre'+x).html(data.COBRE + " %");
			$('#LMagnesio'+x).html(data.MANGANESO + " %");
			$('#LFierro'+x).html(data.FIERRO + " %");
			
			if(guardado == 0){
				$('#Niteogeno'+x).val(0);
				$('#Fosforo'+x).val(0);
				$('#Potasio'+x).val(0);
				$('#Azufre'+x).val(0);
				$('#Calcio'+x).val(0);
				$('#Zinc'+x).val(0);
				$('#Cobre'+x).val(0);
				$('#Magnesio'+x).val(0);
				$('#Fierro'+x).val(0);
				$('#Total'+x).val(0);
			}
			
		}
		$('#lum'+x).html(data.MEINS);
		console.log(arrayAlmacen);
		console.log(data.MATKL);
		console.log(arrayAlmacen[data.MATKL]);
		$('#almacen'+x).val(arrayAlmacen[data.MATKL]);
		if(data.MEINS == 'L') {
			$('#lbDosCien'+x).html('CC');
			$('#lbHas'+x).html('CC');
		} else {
			$('#lbDosCien'+x).html('Grm');
			$('#lbHas'+x).html('Grm');
		}
		$("#dosisHa"+x).trigger("change");
	});
	
}

function createTblMaterial(x){
	
	var prgAplicacion = $("#progAplicacion"+x).val();
	var tblMaterial = '<tr class="trM'+cm+'">'+
				'<td>'+
				'<select class="form-control2 input-sm2 material" name="material" onchange="cabeceraMaterial(this.value,'+cm+',0)" id="material'+cm+'">';
//					'<option value="">Seleccione</option>'+
//					'<option value="1">Cuartel 01</option>'+
//					'<option value="2">Cuartel 02</option>'+
//					'<option value="3">Cuartel 03</option>'+
	tblMaterial += '<option value="1">Seleccione</option>'
	if(prgAplicacion == 3) {
		$.each(arrayMaterial[1],function(key,value){
			//if(value.MATKL == arraySubFamiliaMat[prgAplicacion]){
				tblMaterial += "<option value='"+value.MATNR+"'>"+parseInt(value.MATNR)+"-"+value.MAKTX+" ("+value.IACTIVO+")</option>";
				
			//}
		});
	} else {
		$.each(arrayMaterial[0],function(key,value){
			//if(value.MATKL == arraySubFamiliaMat[prgAplicacion]){
				tblMaterial += "<option value='"+value.MATNR+"'>"+parseInt(value.MATNR)+"-"+value.MAKTX+" ("+value.IACTIVO+")</option>";				
			//}
		});
		$.each(arrayMaterial[1],function(key,value){
			//if(value.MATKL == 'Z010'){
				tblMaterial += "<option value='"+value.MATNR+"'>"+parseInt(value.MATNR)+"-"+value.MAKTX+" ("+value.IACTIVO+")</option>";
				
			//}
		});
	}
	
	tblMaterial +=	'</select>';
			if(prgAplicacion == "3"){
				
				tblMaterial += '<td><label id="LNiteogeno'+cm+'"></label></td>';
				tblMaterial += '<td><label id="LFosforo'+cm+'"></label></td>';
				tblMaterial += '<td><label id="LPotasio'+cm+'"></label></td>';
				tblMaterial += '<td><label id="LAzufre'+cm+'"></label></td>';
				tblMaterial += '<td><label id="LCalcio'+cm+'"></label></td>';
				tblMaterial += '<td><label id="LZinc'+cm+'"></label></td>';
				tblMaterial += '<td><label id="LFierro'+cm+'"></label></td>';
				tblMaterial += '<td><label id="LCobre'+cm+'"></label></td>';
				tblMaterial += '<td><label id="LMagnesio'+cm+'"></label></td>';
				tblMaterial += "<td></td><td>"+formatNumber(has)+"</td><td></td><td></td>" ;
				
				var tblMaterial2 = '<tr class="trM'+cm+'">';
				tblMaterial2 += '<td><label id="codMaterial'+cm+'"></label></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " name="Niteogeno" id="Niteogeno'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " name="Fosforo" id="Fosforo'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " name="Potasio" id="Potasio'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " name="Azufre" id="Azufre'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " name="Calcio" id="Calcio'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " name="Zinc" id="Zinc'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " name="Fierro" id="Fierro'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " name="Cobre" id="Cobre'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				tblMaterial2 += '<td><input type="text" type="text" class="form-control " name="Magnesio" id="Magnesio'+cm+'" onchange="calcularTotalFS(this.id,'+cm+')"></td>';
				
				tblMaterial2 += '<td><input type="text" class="form-control " name="dosisHa" id="dosisHa'+cm+'" placeholder="" onchange="calcularProcentajeFS('+cm+')"></td>';
				tblMaterial2 += '<td></td><td><input type="text" class="form-control " name="total" id="total'+cm+'" placeholder="Total" disabled></td>';
				tblMaterial2 += "<td><label id='lum"+cm+"'></label></td></tr>";
				
				
			}else{
				tblMaterial += '<td><label id="codMaterial'+cm+'"></label></td>';
				tblMaterial += '<td><input type="text" class="form-control" tittle="" onchange="calcularDosisHas('+cm+','+x+')" name="dosiscien" id="dosiscien'+cm+'"></td><td><label id="lbDosCien'+cm+'"></label></td>';
				tblMaterial += '<td><input type="text" class="form-control" tittle="" onchange="calcularDosis100('+cm+','+x+')"  name="dosisHa" id="dosisHa'+cm+'"></td><td><label id="lbHas'+cm+'"></label></td>';
				tblMaterial +=	"<td>"+formatNumber(has)+"</td>" ;
				//var total = parseFloat(has) * parseFloat(va.dosis_has);
				tblMaterial +=	"<td><input type='text' class='form-control' value='' disabled name='total' id='total"+cm+"'></td>"; 
				tblMaterial += "<td><label id='lum"+cm+"'></label></td>";
			}
			tblMaterial += '<td><input type="hidden" name="almacen" id="almacen'+cm+'"></td>'
			tblMaterial += '<td>';
		//if(x > 0){
			tblMaterial += '<a class="" id="des'+cm+'" onclick="descartarMaterial('+cm+');">'+
					'<i class="fa fa-minus">'+
				'</a>';
		//}
		tblMaterial += '</td>'+
		'</tr>';
		tblMaterial += tblMaterial2;
		cm++;
	return tblMaterial;
}



function descartarMaterial(desc){
	console.log(desc);
	$(".trM"+desc).remove();
}
function editPrograma(x){
	$("#save"+x).attr("disabled","disabled");
	editar = true;
	if(agregando){
		alerta("Debe terminar de ingresar el programa antes de guardar uno nuevo.");
		return;
	}
	agregando = true;
	console.log(x);
	console.log("#fecha"+x);
	has = 0;
	arrayCuarteles = [];
	$.getJSON('/simpleWeb/json/AGRO/GETCPF/'+x,function(data){
		console.log(data);
		$.each(data, function(k,v){
			//v.estado    = 'checked';
			arrayCuarteles.push(v);
			if(v.estado == 'checked') {
				has += parseFloat(v.has);
			}			
		})
		//has = formatNumber2(has);
		$("#cua"+x).prop("disabled", false);
	});	
	$.getJSON('/simpleWeb/json/AGRO/GETMPF/'+x,function(data){
		$.each(data, function(k,v){
			console.log(v);
			arrayMateriales.push(v);
		})
		$("#mat"+x).prop("disabled", false);
		$("#save"+x).prop("disabled",false);
	});
	$("#fecha"+x).prop("disabled", false);
	
	
	$("#estFen"+x).prop("disabled", false);
	$("#libro"+x).prop("disabled", false);
	$('#VarTest'+x).prop("disabled", false);
	$("#fechaAlerta"+x).prop("disabled", false);
	$("#observacion"+x).prop("disabled", false);
	$("#control"+x).prop("disabled", false);
	/*$("#progAplicacion"+x).prop("disabled", false);/*/
	if($("#progAplicacion"+x).val()!="3"){
		$("#mojamiento"+x).prop("disabled", false);
	}
	//$("#control"+x).prop("disabled", false);
	$("#edit"+x).hide();
	$("#save"+x).show();
	$("#gen"+x).prop("disabled", true);
	$("#rec"+x).prop("disabled", true);
	$('.form-control.input-sm').select2({
		multiple: true,
		placeholder: "Seleccione",
		closeOnSelect: false
	});
	$('.form-control2.input-sm2').select2({
		multiple: false,
		placeholder: "Seleccione"
	});
}

function addCuartel(id){
//	var cuartel = document.getElementsByName("cuartel");
//	var hasCuartel = document.getElementsByName("hecCuartel");
//	arrayCuarteles = [];
//	for(i = 0; i < cuartel.length; i++){
//		var arrayCuartPf = {};
//		arrayCuartPf.codigo = 0;
//		arrayCuartPf.codigo_pf = id;
//		arrayCuartPf.cuartel = cuartel[i]['value'];
//		arrayCuartPf.has = hasCuartel[i]['value'];
//		arrayCuarteles.push(arrayCuartPf);
//	}
//	console.log(arrayCuarteles);
	//alerta("Se ha guaradado correctamente."); 
	has = 0;
	console.log();
	arrayCuarteles = [];
	$.each(auxCuartel, function(k,v){
		if(v.campo == $('#dataHuerto').val() && $('#VarTest'+id).val().indexOf(v.variedad+"") != -1){
			console.log(v);
			var arrayCuartPf       = {};
			arrayCuartPf.codigo    = 0;
			arrayCuartPf.codigo_pf = id;
			arrayCuartPf.cuartel   = v.codigo;
			arrayCuartPf.nVariedad = v.nVariedad;
			arrayCuartPf.has       = $('#hecCuartel'+v.codigo).val().replace(",",".");
			arrayCuartPf.nCuartel  = v.nombre;
			arrayCuartPf.nVariedad = v.nvariedad;
			arrayCuartPf.max       = v.superficie;
			if($("#cbCuartel"+v.codigo).is(':checked')){
				arrayCuartPf.estado = 'checked';
				var value = $('#hecCuartel'+v.codigo).val();
				value = value.replace(",",".");
				has += parseFloat(value);
			} else {
				arrayCuartPf.estado = '';
			}
			
			arrayCuarteles.push(arrayCuartPf);
		}
	})
	var calculoHas = has;
	//has = formatNumber(has);
	console.log(arrayMateriales);
	var tempMateriales = arrayMateriales;
	arrayMateriales = [];
	$.each(tempMateriales, function(k,v){
		if($('#progAplicacion'+v.codigo_pf).val() == 3){
			var cant = (parseFloat(v.dosis_has)) * calculoHas;
		} else {
			if(v.um == 'G'){
				var cant = (parseFloat(v.dosis_has) ) * calculoHas;
			}else{
				var cant = (parseFloat(v.dosis_has) / 1000) * calculoHas;
			}
			
		}
		
		v.cantidad = cant;
		arrayMateriales.push(v);
	});
	console.log(arrayMateriales);
	closeModal();
}

function calcularTotalHas(){
	var total = 0;
	$('.hasReal').each(function(index,element){
		var id = element.id.split('hecCuartel')[1];
		if($("#cbCuartel"+id).is(':checked')){
			var value = element.value;
			value = value.replace(",", ".");
			total += parseFloat(value);
		}
	});
	has = total;
	$('#totalHas').html(formatNumber(total));
}


	
//function calcularTotal(){
//	var total = 0;
//	$('.hasReal').each(function(index,element){
//		total += parseFloat(element.value);
//	});
//	has = total;
//	$('#totalHas').html(total);
//}

function cargarCuartel(id){
	
	arrayCuarteles = [];
	has = 0;
	if(editar){
		var vari = $('#VarTest'+id).val();
		$.each(auxCuartel, function(k,v){
			console.log(v.variedad);
			console.log(vari.indexOf(v.variedad+""));
			if(v.campo == $('#dataHuerto').val() && $('#VarTest'+id).val().indexOf(v.variedad+"") != -1){
				console.log(v);
				var arrayCuartPf       = {};
				arrayCuartPf.codigo    = 0;
				arrayCuartPf.codigo_pf = id;
				arrayCuartPf.cuartel   = v.codigo;
				arrayCuartPf.has       = v.superficie;
				arrayCuartPf.nCuartel  = v.nombre;
				arrayCuartPf.nVariedad = v.nvariedad;
				arrayCuartPf.estado    = 'checked';
				arrayCuartPf.max       = v.superficie;
				arrayCuarteles.push(arrayCuartPf);
				has += parseFloat(v.superficie);
			}
		})
		//has = formatNumber2(has);
		console.log(arrayCuarteles);
	}
	
	var tempMateriales = arrayMateriales;
	arrayMateriales = [];
	$.each(tempMateriales, function(k,v){
		if($('#progAplicacion'+v.codigo_pf).val() == 3){
			var cant = (parseFloat(v.dosis_has)) * has;
		} else {
			var cant = (parseFloat(v.dosis_has) / 1000) * has;
		}
		console.log(cant);
		//v.cantidad = formatNumber2(cant);
		v.cantidad = cant;
		arrayMateriales.push(v);
	});
	
}
var arrayEspecie;
function getEspecies(){
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETESPECIE/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayEspecie = data;
		}
	})
}

$.ajax({
	url: "/simpleWeb/json/AGRO/Get_CampoEspecie/",
	type:	"GET",
	dataType: 'json',
	async: false,
	success: function(data){
		campo_especie = data;
	}
})
console.log(campo_especie);
var arrayControl;
function getControl(){
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETCONTROL_APLICACION/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayControl = data;
		}
	})
}
var arrayEstadoFeno;
function getEstadoFeno(){
	
	//var url = "/simpleWeb/json/AGRO/getMantenedorEspecie/ALL/Estado Fenologico/";
	
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_EstadoFenologico/", 
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayEstadoFeno = data;    //
		}
	})
}
var arrayProgramaApl;
function getProgramaApl(){
	$.ajax({
		url: "/simpleWeb/json/AGRO/getPA/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayProgramaApl = data;
		}
	})
}

var arrayMaterial = [];
function getMaterial(){
	$.ajax({
		//url: "/simpleWeb/json/AGRO/GETMA/",
		url: IPSERVERSAP + "JSON_ZMOV_10020.aspx?FAMILIA=ZQCO",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayMaterial.push(data.LT_DETALLE);
			console.log(arrayMaterial);
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
			arrayMaterial.push(data.LT_DETALLE);
			console.log(arrayMaterial);
		}
	})
	var sortResults=function(json,prop, asc) {
        json = json.sort(function(a, b) {
	        if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
	        else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
	    });
        return json;
	};
	sortResults(arrayMaterial[0],'MAKTX','asc');
	sortResults(arrayMaterial[1],'MAKTX','asc');
	
}

var arrayVariedad;
function changeEspecie(id,x){
	var e = $("#"+id).val();
	selectVariead = "<option value=''>Seleccione</option>";
	var validaVariedad = [];
	$.each(auxCuartel,function(kk,vv){			
		if(e == vv.especie && vv.campo == $("#dataHuerto").val()){
			if(validaVariedad.indexOf(vv.variedad) == -1){
				selectVariead += "<option value="+vv.variedad+">"+vv.nvariedad+"</option>";
				validaVariedad.push(vv.variedad);
			}
				
		}
	});
//	$.each(arrayVariedad, function(ks,va){
//		if(va.especie == e){
//			selectVariead += "<option value='"+va.codigo+"'>"+va.variedad+"</option>";
//		}
//		
//	})
	$("#estFen"+x).empty();
	$.each(arrayEstadoFeno, function(ks,va){
		if(va.especie == e){
			$("#estFen"+x).append("<option value='"+va.codigo+"'>"+va.estado_fenologicos+"</option>");
		}
	})
	$("#control"+x).empty();
	$.each(arrayControl, function(ks,va){
		if(va.especie == e){
			$("#control"+x).append("<option value='"+va.codigo+"'>"+va.control_aplicacion+"</option>");
		}
		
	})
	console.log(selectVariead);
	$("#VarTest"+x).empty();
	$("#VarTest"+x).append(selectVariead);
	
}
function formatFecha2(fecha){
	fecha = fecha.split("/");
	fecha = fecha[2]+"-"+fecha[0]+"-"+fecha[1];
	return fecha;
}


var arrayPF; 
getPG();
function getPG(){
	agregando = false;
	$('#loading').show();
	var f = $("#fechaDesde").val();
	var fa = f.split("/");
	var f2 = $("#fechaHasta").val(); 
	var fa2 = f2.split("/");
	var row = {};
	row.campo= $('#dataHuerto').val();
	if(row.campo==-1)
	{
		$('#loading').hide();
		return;
	}
	row.fecha_desde      = formatFecha($("#fechaDesde").val());
	row.fecha_hasta        = formatFecha($("#fechaHasta").val());
	row.temporada = "0";
	console.log(row);
	$.ajax({
		url : "/simpleWeb/json/AGRO/GETPF/",
		type : "PUT",
		data : JSON.stringify(row),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success : function(data, textStatus, jqXHR) {
			arrayPF = data;
			loadPrograma();
			arrayCuarteles = [];
			arrayMateriales = [];
			cm = 0;
			//$('#loading').hide();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			swal({
				  title: "Error!",
				  text: "No se ha podido registrar la infomacion, consulte con el administrador del sistema",
				  type: "error",
				  confirmButtonText: "Aceptar"
			});
			$('#loading').hide();
		}
	});
}

var agregando = false;
function addMenuTbl(){
	editar = true;
	id++;
	if(agregando){
		alerta("Debe terminar de ingresar el programa antes de ingresar uno nuevo.");
		return;
	}
	agregando = true;
	x++;
	var tr = '';
	tr +='<tr id="tr0">';
	tr += '<td id="id0"></td>';
	tr +=	"<td></td>" ;
	tr +=	'<td><input size="16" type="text" class="form-control" id="fecha0" name="fecha" readonly onchange="javascript: valDias(this)"></td>';
	tr +=	'<td>';
	tr +=		'<select id="EspText0" name="map" class="form-control2 input-sm2" style="width:160px" onchange="javascript: changeEspecie(this.id,0);">';
	tr += '<option value="">Seleccione</option>';
	//console.log(arrayEspecie);
	$.each(campo_especie, function(kb,vb){
		if(vb.codigo_campo == $('#dataHuerto').val()){
			$.each(arrayEspecie,function(key,value){
				if(vb.codigo_especie == value.codigo){
					tr += '<option value="'+value.codigo+'">'+value.especie+'</option>';
				}
			});
		}
	});
	tr +=		'</select>';
	tr +=	'</td>';
	tr +=	'<td><select id="VarTest0" name="map" class="form-control input-sm" onchange="cargarCuartel(0);"  style="width:200px"><option ="0"></option></td>';
	tr +=	'<td><button id="cuaNew" title="Agregar Cuarteles" onclick="javascript: modalAddCuartel(0);" class="btn blue btn-outline btn-sm"><i class="fa fa-pagelines fa-lg"></i></button></td>';
	tr +=	'<td>';
	tr +=		'<select id="estFen0" name="map" class="form-control2 input-sm2" style="width:180px">';
	//$.each(arrayEstadoFeno,function(key,value){
	//	tr += '<option value="'+value.codigo+'">'+value.estado_fenologicos+'</option>';	
	//});
	//	tr +=			'<option value="">Seleccione...</option>';
//	tr +=			'<option value="1">Caida de Hojas</option>';
//	tr +=			'<option value="2">Receso Invernal</option>';
//	tr +=			'<option value="3">Puntas Verdes</option>';
//	tr +=			'<option value="4">Ramillete Expuesto</option>';
//	tr +=			'<option value="5">Boton Rosado</option>';
//	tr +=			'<option value="6">Plena Flor</option>';
//	tr +=			'<option value="7">Caida de Petalos</opt+ion>';
//	tr +=			'<option value="8">Fruto Cuajado</option>';
	tr +=		'</select>';
	tr +=	'</td>';
	tr +=	'<td>';
	tr +=		'<select id="progAplicacion0" style="width:180px" onblur="limpMaterial(this.value)" onchange="setMojamiento(0);" name="map" class="form-control2 input-sm2" onchange="javascript: cambioPrgApli(this)">';
	$.each(arrayProgramaApl,function(key,value){
		tr += '<option value="'+value.codigo+'">'+value.descripcion+'</option>';	
	});
	//	tr +=			'<option value="1">Seleccione...</option>';
//	tr +=			'<option value="2">Herbicida</option>';
//	tr +=			'<option value="3">Fungicida</option>';
//	tr +=			'<option value="4">Fertilizantes foliares</option>';
//	tr +=			'<option value="5">Fertilizantes de Huerto </option>';
	tr +=		'</select>';
	tr +=	'</td>';
	tr +=	'<td><input type="number" name="map" id="mojamiento0" onchange="recalcularMaterial(this.value),0" min="0" class="form-control"></td>';
	tr +=	'<td><button id="matNew" title="Agregar Material" onclick="javascript: modalAddMaterial(0);" class="btn blue btn-outline btn-sm"><i class="fa fa-map-o fa-lg"></i></button></td>';
	
	tr +=	'<td>';
	tr +=		'<select id="control0" style="width:180px" name="map" class="form-control2 input-sm2">';
	/*$.each(arrayControl,function(key,value){
		tr += '<option value="'+value.codigo+'">'+value.control_aplicacion+'</option>';	
	});*/
//	tr +=			'<option value="">Seleccione...</option>';
//	tr +=			'<option value="1">Control 01</option>';
//	tr +=			'<option value="2">Control 02</option>';
//	tr +=			'<option value="3">Control 03</option>';
//	tr +=			'<option value="4">Control 04</option>';
//	tr +=			'<option value="5">Control 05</option>';
//	tr +=			'<option value="6">Control 06</option>';
//	tr +=			'<option value="7">Control 07</option>';
//	tr +=			'<option value="8">Control 08</option>';
	tr +=		'</select>';
	tr +=	'</td>';
	tr +=	'<td><input size="16" type="text" class="form-control" id="fechaAlerta0" name="fecha" readonly onchange="javascript: valFechaAlerta(0)"></td>';
	tr +=	'<td><textarea class="form-control" id="observacion0"></textarea></td>';
	tr +=	'<td><select id="libro0" style="width:60px" name="map" class="form-control2 input-sm2">';
	tr +=	'<option value="0">SI</option>';
	tr +=	'<option value="1">NO</option>';
	tr +=	'</select></td>';
	tr +=	'<td>';
	tr +=		'<button id="save0" onclick="javascript: savePrograma(0);" title="Guardar" class="btn yellow btn-outline btn-sm"><i class="fa fa-pencil-square-o fa-lg"></i></button>';
	//tr +=		'<button id="edit'+x+'" onclick="javascript: editProgramaNew('+x+');" style="display: none;" title="Modificar" class="btn btn-circle yellow btn-outline btn-sm"><i class="fa fa-pencil-square-o fa-lg"></i></button>';
	//tr +=		'<button id="gen'+x+'" title="Generar Orden" onclick="javascript: hrefOrden('+x+');" class="btn btn-circle green btn-outline btn-sm"><i class="fa fa-arrow-right fa-lg"></i></button>';
	tr +=		'<button id="rec	hazarPrograma0" onclick="javascript: confirmRechazar(0);"  title="Eliminar" class="btn red btn-outline btn-sm"><i class="fa fa-close fa-lg"></i></button>';
	tr +=	'</td>';
	tr +='</tr>';
	
	console.log(tr);
	
	console.log(arrayPF.length);
	if(arrayPF.length == 0) {
		$("#tblInfo").empty();
	}
	
	$("#tblInfo").prepend(tr);
	
//	$('#tbl_Fito').DataTable({
//		"destroy": true ,
//		"filter": false
//	});
	$('.form-control.input-sm').select2({
		multiple: true,
		placeholder: "Seleccione",
		closeOnSelect: false
	});
	$('.form-control2.input-sm2').select2({
		multiple: false,
		placeholder: "Seleccione"

	});
	$('#tbl_Fito').DataTable({
		"sPaginationType": "full_numbers" ,
		"filter": false,
		"ordering": false,
		
	});
	fechas();
	//loadEspecies(x);
}
function limpMaterial(value){
	console.log(value);
}

function setMojamiento(id){
	var tp = $('#progAplicacion'+id).val();
	
	if( tp == "3" ){
		$('#mojamiento'+id).val(0);
		$('#mojamiento'+id).attr('disabled',true);
	} else {
		//$('#mojamiento'+id).val(0);
		$('#mojamiento'+id).attr('disabled',false);
	}
}

function hrefOrden(x,r){
	if(r > 0){
		window.location.href = ("ordenDosificacion#"+x);
	} else {
		var c = confirmar.confirm("¿Este programa no tiene reserva de materiales en Sap, desea generar la reserva?");
		$(c.aceptar).click(function(){
			//if(id==0){
				$("#loading").show();
				setTimeout(function(){
					detNotificacion(x);
					$("#loading").hide();
				}, 500);
			//} 
		});
		
	}
}	
var solpedActiva = 0;
var reservaActiva = 0;
function reservar(id,idp){
	$('#reserva'+id).hide();
	$("#loading").show();
	
	if(SESION.user == undefined){
		alerta("Se perdió sesión");
		$('.swal2-confirm').click(function(){
			window.location.href = ("login");
		})
		return false;
	}
	setTimeout(function(){
	var fecha = "";
	var codMat = "";
	var cantMat = "";
	var ceco = "";
	var almacen = "";
	var campo = "";
	$.getJSON("/simpleWeb/json/AGRO/LISTA_ORDEN_DETALLE/"+id, function(v){
		//fecha = v.fecha_estimada_aplicacion.replace("-", "").replace("-", "");
		fecha = formatFecha($('#fechaEst'+id).val());
		fecha = fecha.replace("-", "").replace("-", "");
		campo = v.codCampo;
		console.log($('#fechaEst'+id).val());
		if(!valFechaReserva($('#fechaEst'+id).val())){
			return false;
		}
		
		var mat = {};
		mat.MATERIALES = [];
				
		$.each(arrayListMat, function(k,v){
			var arrayList = {};
				arrayList.COD = v.COD;
				arrayList.CANTIDAD = v.CANTIDAD.replace(".","").replace(",",".");
				arrayList.ALMACEN  = v.ALMACEN; 
				mat.MATERIALES.push(arrayList);
		});

		
		var materiales = JSON.stringify(mat);
		almacen = arrayAlmacen[v.idProgramaAplicacion];
		var url  = IPSERVERSAP + "JSON_BAPI_RESERVATION_CREATE1.aspx?FECHA="+fecha+"&ALMACEN=&ALMACENDESTINO=TRAN"+"&MATERIALES="+materiales+"&CENTRO="+campo+"&MOVIMIENTO=311&CENTROCOSTO=&EQUIPO=";
		var user = "&USPAS="+SESION.user+"X*X"+SESION.pass;
		url  += user;
		console.log(url);
		//return;
		$.getJSON(url, function(response){
			if(response.RESERVATION != 0){
				alerta("Se ha reservado con éxito, número de reserva "+response.RESERVATION);
				//$("#loading").hide();
				$('#res'+id).html(response.RESERVATION);
				reservaActiva = response.RESERVATION;
				$("#gen"+id).attr("onclick","hrefOrden("+id+","+reservaActiva+")");
				$("#save"+id).attr("onclick","savePrograma("+id+","+reservaActiva+","+solpedActiva+","+idp+")");
				$("#rec"+id).attr("onclick","confirmRechazar("+id+","+idp+","+reservaActiva+","+solpedActiva+")");
				$("#notRecha"+id).attr("onclick","confirmRechazar("+id+","+idp+","+reservaActiva+","+solpedActiva+")");
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
							$('#reserva'+id).hide();
							$('#emitir'+id).show();
						},
						error : function(jqXHR, textStatus, errorThrown) {
							swal({
								  title: "Error!",
								  text: "No se ha podido registrar la infomacion, consulte con el administrador del sistema",
								  type: "error",
								  confirmButtonText: "Aceptar"
							});
							$('#reserva'+id).show();
						}
					});
					//$('#reserva'+id).hide();
					//$('#emitir'+id).show();
				}, 500);
			} else {
				var mensaje = "";
				$.each(response.RETURN, function(key, val){
					mensaje += val.MESSAGE+"<br>";
				});
				$('#reserva'+id).show();
				alerta(mensaje);
			}
			$("#loading").hide();
		});
	})
	}, 500);
}

function solped(id,idp){
	if(SESION.user == undefined){
		alerta("Se perdió sesión");
		$('.swal2-confirm').click(function(){
			window.location.href = ("login");
		})
		return false;
	}
	
	$('#solped'+id).hide();
	$("#loading").show();
	var fecha = "";
	var codMat = "";
	var cantMat = "";
	var ceco = "";
	var almacen = "";
	var campo = "";
	setTimeout(function(){
	$.getJSON("/simpleWeb/json/AGRO/LISTA_ORDEN_DETALLE/"+id, function(v){
		fecha = v.fecha_estimada_aplicacion.replace("-", "").replace("-", "");
		var mat = {};
		mat.MATERIALES = listMaterialesSolped();
		var fecha2 = formatFecha($('#fechaSol'+id).val());
		fecha2 = fecha2.replace("-", "").replace("-", "");
		var observacion = $('#observacionSolped'+id).val();
	
		
		var materiales = JSON.stringify(mat);
		campo = v.codCampo;
		almacen = arrayAlmacen[v.idProgramaAplicacion];
		
		var url  = IPSERVERSAP + "JSON_BAPI_REQUISITION_CREATE.aspx?FECHA="+fecha+"&MATERIALES="+materiales+"&ALMACEN=&CENTRO="+campo+"&CENTROCOSTO=&EQUIPO=";
		url += "&FECHAENTREGA="+fecha2+"&OBSERVACION="+observacion;
		var user = "&USPAS="+SESION.user+"X*X"+SESION.pass;
		user += "&GRUPO_COMRPA="+SESION.grupoCompra+"&SOLICITANTE="+SESION.solicitante;
		url  += user;
		console.log(url);
		$.getJSON(url, function(response){
			if(response.NUMBER != ""){
				solpedActiva = response.NUMBER;
				$("#rec"+id).attr("onclick","confirmRechazar("+id+","+idp+","+reservaActiva+","+solpedActiva+")");
				$("#notRecha"+id).attr("onclick","confirmRechazar("+id+","+idp+","+reservaActiva+","+solpedActiva+")");
				$("#save"+id).attr("onclick","savePrograma("+id+","+reservaActiva+","+solpedActiva+","+idp+")");
				alerta("Se ha realizado la solicitud de pédido "+response.NUMBER);
				$('#sol'+id).html(response.NUMBER);
				var row = [];
				var r = {};
				r.codigo = id;
				r.solped = response.NUMBER;
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
							$('#solped'+id).hide();
						},
						error : function(jqXHR, textStatus, errorThrown) {
							swal({
								  title: "Error!",
								  text: "No se ha podido registrar la infomacion, consulte con el administrador del sistema",
								  type: "error",
								  confirmButtonText: "Aceptar"
							});
							$('#solped'+id).show();
						}
					});
					
				}, 500);
			} else {
				var mensaje = "";
				$.each(response.RETURN, function(key, val){
					mensaje += val.MESSAGE+"<br>";
				});
				alerta(mensaje);
				$('#solped'+id).show();
			}
			$("#loading").hide();
		});
	})
	}, 500);
}

function listMaterialesSolped(){
	var arrayListMatS = [];
	$.each(arrayListMat, function(k,v){
		if($("#cbMaterial"+v.C).is(':checked')){
			if($('#cant'+v.C).val() != "" || $('#cant'+v.C).val() < 0){
				var arrayList = {};
				arrayList.COD = v.COD;
				arrayList.CANTIDAD = $('#cant'+v.C).val();
				arrayList.ALMACEN  = v.ALMACEN;
				arrayListMatS.push(arrayList);
			}
		}
	})
	console.log(arrayListMatS);
	return arrayListMatS;
	
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

function parseFloatWithCommas(val)  {
	 
	if (typeof val === 'number') {
		val = val.toString();
	}
	
	var numberWithCommas = function(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};
 
	return numberWithCommas(parseFloat(val.replace(',', '')).toFixed(3));
};

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
