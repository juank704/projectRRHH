
var dataTable = $('#tbl_ListaAplicaciones').DataTable({
	dom: 'Bfrtip',
    buttons: [
        'excel', 'pdf'
    ],
	"sPaginationType": "full_numbers" ,
	"filter": false,
	"ordering": true,
	"order": [[ 0, "desc" ]]
	
});
var arrayAlmacen = [];
arrayAlmacen['Z010'] = '2000';
arrayAlmacen['Z011'] = '3000';
arrayAlmacen['Z119'] = '9500';
arrayAlmacen['Z120'] = '4000';
arrayAlmacen['Z121'] = '1000';
arrayAlmacen['Z122'] = '6000';
arrayAlmacen['Z123'] = '5000';
var arrayListMat = []; 
var arrayListMat2 = []; 
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
	$('#loading').show();
	setTimeout(function(){ 
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
		//		"value='"+formatFecha(arrayListaNot.fecha_estimada_aplicacion)+"' id='fechaEst"+arrayListaNot.numero_orden+"' readonly onchange='valFechaHoy(this.id)'></td> " ;
		"value='"+formatFecha(validaFechaAnterior(arrayListaNot.fecha_estimada_aplicacion))+"' id='fechaEst"+arrayListaNot.numero_orden+"' readonly onchange='valFechaHoy(this.id)'></td> " ;
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
		detalleNotificacion +=			"<td colspan='3'><input size='16' type='text' name='observacion' style='width:330px' class='form-control' value='' id='observacion"+arrayListaNot.numero_orden+"'  </td> " ;
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
			if(arrayListaNot.nreserva > 0 ) {
				disabled = "style='display:none'";
			} else {
				disabledE = "style='display:none'";
			}
			if(arrayListaNot.solped > 0){
				disabledS = "style='display:none'";
			}
			var arrayList = {};
			arrayList.C = vm.codigo;
			arrayList.COD = vm.codigo_material;
			arrayList.CANTIDAD = formatNumber2(vm.cantidad);
			arrayList.ALMACEN  = vm.almacen;
			//arrayList.ALMACENDESTINO  = 'TRAN';
			arrayListMat.push(arrayList);
			var dataStock = [];
			console.log(IPSERVERSAP + "JSON_BAPI_MATERIAL_STOCK_REQ_LIST.aspx?CENTRO="+arrayListaNot.codCampo+"&MATERIAL="+vm.codigo_material+"&ALMACEN="+vm.almacen);
			$.ajax({
				url: IPSERVERSAP + "JSON_BAPI_MATERIAL_STOCK_REQ_LIST.aspx?CENTRO="+arrayListaNot.codCampo+"&MATERIAL="+vm.codigo_material+"&ALMACEN="+vm.almacen,
				type:	"GET",
	//			data : JSON.stringify(row),
				dataType: 'json',
				async: false,
				success: function(data){
					dataStock = data;
				}
			})
			var dataSoped = [];
			var urlSolped = IPSERVERSAP + "JSON_BAPI_REQUISITION_GETITEMS.aspx?CENTRO="+arrayListaNot.codCampo+"&MATERIAL="+vm.codigo_material;
			console.log(urlSolped);
			$.ajax({
				url: urlSolped,
				type:	"GET",
	//			data : JSON.stringify(row),
				dataType: 'json',
				async: false,
				success: function(data){
					dataSoped = data;
				}
			})
			detalleNotificacion +=		"<tr>";
			detalleNotificacion += 			"<td><input type='checkbox' class='cbMaterial' id='cbMaterial"+vm.codigo+"' checked ></td>" ;
			detalleNotificacion +=			"<td>"+dataMat.LT_DETALLE[0].MAKTX+"</td>";
			detalleNotificacion +=			"<td>"+formatNumber(vm.cantidad)+"</td>";
			detalleNotificacion += 			"<td><input class='form-control required' type='number' id='cant"+vm.codigo+"'></td>";	
			detalleNotificacion +=			"<td>"+dataMat.LT_DETALLE[0].MEINS+"</td>";
			detalleNotificacion +=			"<td>"+dataMat.LT_DETALLE[0].IACTIVO+"</td>";					
			detalleNotificacion +=			"<td>"+formatNumber(dataStock.T_STOCK_MATNR[0].LABST)+"</td>";
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
	}, 500);
}
function hrefOrden(x){
	
	window.location.href = ("ordenDosificacion#"+x);
	
}
var solpedActiva = 0;
var reservaActiva = 0;

function reservar(id,idp){
	if(SESION.user == undefined){
		alerta("Se perdió sesión");
		$('.swal2-confirm').click(function(){
			window.location.href = ("login");
		})
		return false;
	}
	$('#reserva'+id).hide();
	$('#loading').show();
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
			//almacen = arrayAlmacen[v.idProgramaAplicacion];
			var url  = IPSERVERSAP + "JSON_BAPI_RESERVATION_CREATE1.aspx?FECHA="+fecha+"&ALMACEN=&ALMACENDESTINO=TRAN"+"&MATERIALES="+materiales+"&CENTRO="+campo+"&MOVIMIENTO=311&CENTROCOSTO=&EQUIPO=";
			var user = "&USPAS="+SESION.user+"X*X"+SESION.pass;
			url  += user;
			$("#loading").hide();
			console.log(url);
			$.getJSON(url, function(response){
				if(response.RESERVATION != 0){
					alerta("Se ha reservado con éxito, número de reserva "+response.RESERVATION);
					reservaActiva = response.RESERVATION;
					$("#notRecha"+id).attr("onclick","confirmRechazar("+id+","+idp+","+reservaActiva+","+solpedActiva+")");
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
								$('#emitir'+id).show();
								$('#reserva'+id).hide();
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
						
						
					}, 500);
				} else {
					var mensaje = "";
					$.each(response.RETURN, function(key, val){
						mensaje += val.MESSAGE+"<br>";
					});
					alerta(mensaje);
					$('#reserva'+id).show();
				}
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
	$.getJSON("/simpleWeb/json/AGRO/LISTA_ORDEN_DETALLE/"+id, function(v){
		fecha = v.fecha_estimada_aplicacion.replace("-", "").replace("-", "");
		var fecha2 = formatFecha($('#fechaSol'+id).val());
		fecha2 = fecha2.replace("-", "").replace("-", "");
		var observacion = $('#observacion'+id).val();
		var mat = {};
		mat.MATERIALES = listMaterialesSolped();
		var materiales = JSON.stringify(mat);
		campo = v.codCampo;
		//almacen = vm.almacen;
		var url  = IPSERVERSAP + "JSON_BAPI_REQUISITION_CREATE.aspx?FECHA="+fecha+"&MATERIALES="+materiales+"&ALMACEN="+almacen+"&CENTRO="+campo+"&CENTROCOSTO=&EQUIPO=";
		url += "&FECHAENTREGA="+fecha2+"&OBSERVACION="+observacion;
		var user = "&USPAS="+SESION.user+"X*X"+SESION.pass;
		user += "&GRUPO_COMRPA="+SESION.grupoCompra+"&SOLICITANTE="+SESION.solicitante;
		url  += user;
		console.log(url);
		
		$.getJSON(url, function(response){
			if(response.NUMBER != ""){
				$("#loading").hide();
				solpedActiva = response.NUMBER;
				$("#notRecha"+id).attr("onclick","confirmRechazar("+id+","+idp+","+reservaActiva+","+solpedActiva+")");
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
				$('#solped'+id).show();
				alerta(mensaje);
			}
		});
		
	})
}

function listMaterialesSolped(){
	var arrayListMatS = [];
	$.each(arrayListMat, function(k,v){
		if($("#cbMaterial"+v.C).is(':checked')){
			if($('#cant'+v.C).val() != "" || $('#cant'+v.C).val() < 0){
				var arrayList = {};
				arrayList.COD = v.COD;
				arrayList.CANTIDAD = parseFloat($('#cant'+v.C).val()).toFixed(3);
				arrayList.ALMACEN  = v.ALMACEN;
				arrayListMatS.push(arrayList);
			}
		}
	})
	return arrayListMatS;
	
}

function confirmRechazar(id,idP,reserva,solped){
	var c = confirmar.confirm("¿Seguro desea rechazar?");
	var mensaje = "";
	$(c.aceptar).click(function(){
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
					mensaje += "El programa "+idP+" ha sido rechazado con éxito";
					alerta(mensaje);
					$('.swal2-confirm').click(function(){
						closeModal();
					})
				}
			})
			
		//});
		
		loadInfo();
	});
	
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
