$(document).ready(function(){
	loading.show();
	setTimeout(function(){ loadCampo();
	getMaterial();
	OcultarTabla(); }, 500);
})
var dataTableTaller = $('#tbl_Taller').DataTable({
	dom: 'Bfrtip',
    buttons: [
        'excel'
    ],
	"sPaginationType": "full_numbers" ,
	"filter": false,
	//"ordering": true,
	 "order": [[ 0, "desc" ]]
	
});
var campoSelect = "<option value='0'>Todos</option>";
var allCampos = [];
var identificador;
function loadCampo(){
	$.each(SESION.campo, function(k,v){
		campoSelect += "<option value='"+v.campo+"'>"+v.descripcion+"</option>";
		allCampos.push(v.campo);
	})
	$("#campo_taller").html(campoSelect);
	
}
function popRiego(id){
	var detalleCierre = '<div class="table-responsive">';
	detalleCierre +=	'<table class="table table-striped table-condensed" id="tbl_colaboradores">';
	detalleCierre +=		'<thead style="text-align: center;">';
	detalleCierre +=			'<tr>';
	detalleCierre +=				'<th style="text-align: center;">Fecha Cierre</th>';
	detalleCierre +=			'</tr>';
	detalleCierre +=		'</thead>';
	detalleCierre +=		'<tbody id="tblMaterial">';
	detalleCierre +=			'<td><input id="fechaCierre" type="text" name="fecha" class="form-control" readonly  placeholder="Ingrese Fecha" ></td>';
	detalleCierre +=		'</tbody>';
	detalleCierre +=	'</table>'
	detalleCierre += '</div>'
	detalleCierre +='<div class="col-sm-12 col-md-12">';
	detalleCierre +=		"<td><a class='btn btn-circle red btn-outline' onclick='closeModal();'> Cancelar</a></td>";
	detalleCierre +=		"<td><a class='btn btn-circle green-dark btn-outline' onclick='cerrarRiego("+id+");'> Cerrar</a></td>";
	detalleCierre +='</div>';
	
	popUp("Detalle Cierre", detalleCierre, true, "600px", true);
	fechas();
}

function cerrarRiego(id){
	var row = {};
	row.codigo = id;
	row.fechaCierre = formatFecha($('#fechaCierre').val());
	console.log(row);
	$.ajax({
		url : "/simpleWeb/json/AGRO/cerrar_ingreso_riego/",
		type : "PUT",
		data : JSON.stringify(row),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success : function(data, textStatus, jqXHR) {
			alerta("Cerrado con exito");
			location.reload();
			
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
}


function popPacking(id){
	var detalleCierre = '<div class="table-responsive">';
	detalleCierre +=	'<table class="table table-striped table-condensed" id="tbl_colaboradores">';
	detalleCierre +=		'<thead style="text-align: center;">';
	detalleCierre +=			'<tr>';
	detalleCierre +=				'<th style="text-align: center;">Fecha Cierre</th>';
	detalleCierre +=			'</tr>';
	detalleCierre +=		'</thead>';
	detalleCierre +=		'<tbody id="tblMaterial">';
	detalleCierre +=			'<td><input id="fechaCierre" type="text" name="fecha" class="form-control" readonly  placeholder="Ingrese Fecha" ></td>';
	detalleCierre +=		'</tbody>';
	detalleCierre +=	'</table>'
	detalleCierre += '</div>'
	detalleCierre +='<div class="col-sm-12 col-md-12">';
	detalleCierre +=		"<td><a class='btn btn-circle red btn-outline' onclick='closeModal();'> Cancelar</a></td>";
	detalleCierre +=		"<td><a class='btn btn-circle green-dark btn-outline' onclick='cerrarPacking("+id+");'> Cerrar</a></td>";
	detalleCierre +='</div>';
	
	popUp("Detalle Cierre", detalleCierre, true, "600px", true);
	fechas();
}

function cerrarPacking(id){
	var row = {};
	row.codigo = id;
	row.fechaCierre = formatFecha($('#fechaCierre').val());
	console.log(row);
	$.ajax({
		url : "/simpleWeb/json/AGRO/cerrar_ingreso_packing/",
		type : "PUT",
		data : JSON.stringify(row),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success : function(data, textStatus, jqXHR) {
			alerta("Cerrado con exito");
			location.reload();
			
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
}

function OcultarTabla(){
	//$('#HTaller').hide();
	$('#HRiego').hide();
	$('#HPacking').hide();
	loading.hide();
}

runEffect();
function runEffect() {
	var selectedEffect = "fold";
	var options = {
		direction: "up"
	}
	$("#TablePacking").hide();
	$("#TableRiego").hide();
	$('#HPacking').hide();
	$('#HRiego').hide();
	$('#HTaller').show();
	$("#tbl_Taller").show(selectedEffect, options, 500, callback);
}
function runEffectRiego() {
	var selectedEffect = "blind";
	var options = {
		direction: "up"
	}
	$("#TablePacking").hide();
	$("#tbl_Taller").hide();
	$('#HTaller').hide();
	$('#HPacking').hide();
	$("#TableRiego").show(selectedEffect, options, 500, callback);

}
function runEffectPacking() {
	var selectedEffect = "fold";
	var options = {
		direction: "up"
	}
	$("#tbl_Taller").hide();
	$("#TableRiego").hide();
	$('#HTaller').hide();
	$('#HRiego').hide();
	$("#TablePacking").show(selectedEffect, options, 500, callback);
}

$('#tipo_ingreso').change(function(){
	var t = $(this).val();
	if(t == 1){
		$('#HTaller').show();
	    runEffect();
	    return false;
	} else if (t == 2){
		$('#HRiego').show();
		runEffectRiego();
		return false;
	} else if (t == 3) {
		$('#HPacking').show();
	    runEffectPacking();
	    return false;
	}
});
var cecoMaq = '';
function cambioCampo(input){
	loading.show();
	var tipo_ingreso = $("#tipo_ingreso").val();
	var filtradoSector = [];
	var campo = $("#campo_taller").val();
	console.log(campo)
	
	var campo_ = $("#campo_taller").val();
	
	$.each(SESION.campo, function(k,v){
		if(v.campo == campo_) {
			cecoMaq = v.cecoMaq;
			campos_maq = v.campos_maq;
		}
	})
	
	if(tipo_ingreso == 1){
		filtroTaller(campo,campos_maq);
	}
	if(tipo_ingreso == 2){
		filtroRiego(campo);
	}
	if(tipo_ingreso == 3){
		filtroPacking(campo);
	}
}
var tallerArr;
var estados = [{
	codigo: 0,
	estado: "En Taller".fontcolor("C70039")
},{
	codigo: 2,
	estado: "Servicio Externo".fontcolor("c49f47")
},{
	codigo: 1,
	estado: "Cerrado".fontcolor("1c699f")
}]
function filtroTaller(campo,campos_maq){
	if(campo == undefined){
		campo = 0;
	}else if(campo[0] == "0"){
		campo = allCampos;
	}
	dataTableTaller.clear().draw();
	console.log("/simpleWeb/json/AGRO/GET_TALLER_ALL/"+campo);
	
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_TALLER_ALL/"+campo,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			var tblTaller = "";
			console.log(data)
			tallerArr = data;
			$.each(data, function(k,v){
				console.log(IPSERVERSAP + "JSON_BAPI_EQUI_GETLIST.aspx?CENTRO="+campos_maq+"&EQUIPO="+v.vehiculo);
				$.getJSON(IPSERVERSAP + "JSON_BAPI_EQUI_GETLIST.aspx?CENTRO="+campos_maq+"&EQUIPO="+v.vehiculo, function(dataEq){
					var estado = 0;
					$.each(estados, function(ka,va){
						if(va.codigo == v.estado){
							estado = va.estado;
						}
					})
					/*tblTaller += "<tr>";
					tblTaller += 		"<td>"+parseFolio(v.codigo)+"</td>";
					tblTaller += 		"<td>"+v.campo+"</td>";
					tblTaller += 		"<td>"+v.tipo+"</td>";				
					tblTaller += 		"<td>"+dataEq.EQUIPMENT_LIST[0].DESCRIPT+"</td>";
					tblTaller += 		"<td>"+v.motivo+"</td>";
					tblTaller += 		"<td>"+formatFecha(v.fecha)+"</td>";
					tblTaller += 		"<td>"+v.operador+"</td>";
					tblTaller += 		"<td>"+v.horometro+"</td>";
					tblTaller += 		"<td>"+v.observacion+"</td>";				
					tblTaller += 		"<td>"+estado+"</td>";
					*/
					var boton = "";
					var boton2 = "";
					//boton += 		"<button title='Gestion de Material' class='btn green btn-sm' onclick='javascript: gestionMaterial("+v.codigo+")'><i class='fa fa-leaf' aria-hidden='true'></i></button>";
					//boton += 	    "<button title='Detalle SAP' class='btn blue btn-sm' onclick='detalleSap("+v.codigo+",\""+v.campo+"\")'><i class='fa fa-leaf'></i></button>";
					boton += 	    "<button title='Consumos' class='btn green-dark btn-sm' onclick='consumos("+v.codigo+",\""+v.campo+"\")'><i class='fa fa-leaf'></i></button>";
					//boton2 +=		"<button title='Servicio Externo' class='btn yellow btn-sm' onclick='javascript: servicioExterno("+v.codigo+")'><i class='fa fa-exchange' aria-hidden='true'></i></button>";
					//boton2 +=		"<button title='Reingreso Taller' class='btn dark btn-sm' onclick='javascript: reingresoTaller("+v.codigo+")'><i class='fa fa-long-arrow-left' aria-hidden='true'></i></button>";
					//boton2 +=		"<button title='Salida Taller' class='btn red btn-sm' onclick='javascript: salidaTaller("+v.codigo+")'><i class='fa fa-long-arrow-right' aria-hidden='true'></i></button>";
					var tbl = [parseFolio(v.codigo),v.campo,v.tipo,dataEq.EQUIPMENT_LIST[0].DESCRIPT,v.motivo,formatFecha(v.fecha),v.operador,v.horometro,v.observacion,estado,boton];
						var rowNode = dataTableTaller
					    .row.add( tbl )
					    .draw()
					    .node();
				});
			})
			$('#tbl_Taller_paginate').css('text-align','center');
			$('.buttons-excel').addClass('btn btn-circle red btn-outline');
//			setTimeout(function(){
//				$("#tblTaller").html(tblTaller);
//			}, 1000);
			loading.hide();
			
		}
	})
}
function detalleSap(id, campo){
	$('#loading').show();
	setTimeout(function(){
		var tblDetalle = "";
		tblDetalle +=	"<div class='table-responsive'>";
		tblDetalle +=		"<table class='table table-bordered table-hover table-striped table-condensed' id='tbl_Datos_Comunes'>";
		tblDetalle +=			"<thead>";
		tblDetalle +=				"<tr>";
		tblDetalle +=					"<th>Numero</th>";
		tblDetalle +=					"<th>Tipo</th>";
		tblDetalle +=					"<th>Material</th>";
		tblDetalle +=					"<th>Codigo</th>";
		tblDetalle +=					"<th>Cantidad</th>";
		tblDetalle +=					"<th>UM</th>";
		tblDetalle +=					"<th>Eliminar</th>";
		tblDetalle +=				"</tr>";
		tblDetalle +=			"</thead>";
		tblDetalle +=			"<body id='tblModal'>"+loadDetalleSAP(id, campo)+"</body>";
		tblDetalle +=		"</table>";
		tblDetalle +=	'</div>';
		tblDetalle += 	"<div style='text-align: center;'>";
		tblDetalle += 		"<a class='btn red' onclick='closeModal();'>Cerrar</a>";
		tblDetalle += 	"</div>";
		popUp("Detalle Solped/Reservas SAP", tblDetalle, true, "650px", true);
		$('#loading').hide();
	},500);
}

function loadDetalleSAP(id, campo){
	var datosSAP;
	var tBody = "";
	$.ajax({
		url : "/simpleWeb/json/AGRO/GET_DETALLE_SAP/"+id,
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			datosSAP = data;
		}
	})
	var datoReserva = "";
	var datoSolped = "";
	$.each(datosSAP, function(k,v){
		var tipo = "";
		if(v.tipo == 1){
			tipo = "Reserva";
			var urlR = IPSERVERSAP + "JSON_BAPI_RESERVATION.aspx?CENTRO="+campo+"&RESERVA="+v.numero;
			console.log(urlR);
			$.ajax({
				url : urlR,
				type : "GET",
				dataType : 'json',
				async : false,
				success : function(data) {
					datoReserva = data;
				}
			})
			console.log(datoReserva);
			var x = 0;
			$.each(datoReserva.RESERVATION_ITEMS, function(kk,vv){
				var dataMat = [];
				$.ajax({
					url: IPSERVERSAP + "JSON_ZMOV_10020.aspx?MATERIAL="+parseInt(vv.MATERIAL),
					type:	"GET",
		//			data : JSON.stringify(row),
					dataType: 'json',
					async: false,
					success: function(data){
						dataMat = data;
					}
				})
				tBody += "<tr class='tr"+v.id+"'>";
				if(x== 0) {
					tBody += 	"<td>"+v.numero+"</td>";
					tBody += 	"<td>"+tipo+"</td>";
				} else {
					tBody += "<td></td><td></td>"
				}
				tBody += 	"<td>"+dataMat.LT_DETALLE[0].MAKTX+"</td>";
				tBody += 	"<td>"+parseInt(vv.MATERIAL)+"</td>";
				tBody += 	"<td>"+vv.QUANTITY+"</td>";
				tBody += 	"<td>"+vv.UNIT+"</td>";
				tBody += 	"<td><a class='btn red btn-sm' onclick='delDetalleSAP("+JSON.stringify(v)+")'><i class='fa fa-times' aria-hidden='true'></i></td>";
				tBody += "</tr>";
				x++;
			});
		}else{
			tipo = "Solped";
			var urlS = IPSERVERSAP + "JSON_BAPI_REQUISITION_GETITEMS.aspx?CENTRO="+campo+"&SOLPED="+v.numero;
			console.log(urlS);
			$.ajax({
				url : urlS,
				type : "GET",
				dataType : 'json',
				async : false,
				success : function(data) {
					datoSolped = data;
				}
			})
			//console.log(datoSolped);
			var x = 0;
			$.each(datoSolped.REQUISITION_ITEMS, function(kk,vv){
				tBody += "<tr class='tr"+v.id+"'>";
				if(x== 0) {
					tBody += 	"<td>"+v.numero+"</td>";
					tBody += 	"<td>"+tipo+"</td>";
				} else {
					tBody += "<td></td><td></td>"
				}
				tBody += 	"<td>"+vv.SHORT_TEXT+"</td>";
				tBody += 	"<td>"+parseInt(vv.MATERIAL)+"</td>";
				tBody += 	"<td>"+vv.QUANTITY+"</td>";
				tBody += 	"<td>"+vv.UNIT+"</td>";
				tBody += 	"<td><a class='btn red btn-sm' onclick='delDetalleSAP("+JSON.stringify(v)+")'><i class='fa fa-times' aria-hidden='true'></i></td>";
				tBody += "</tr>";
				x++;
			});
			
		}
		
	})
	return tBody;
}
function consumoSap(campo,reserva,y){
	var hoy = dateHoy();
	hoy = hoy.split("-");
	var fecha = hoy[0]+hoy[1]+hoy[2];
	$('#loading').show();
	setTimeout(function(){
		var arraConsumo = [];
		var xc = 0;
		var xd = 0;
		
		var user = "&USPAS="+SESION.user+"X*X"+SESION.pass;
		$('.cConsumo').each(function(index,element){
			var value = parseNumericFloat(element.value);
			var id = element.id.replace("con","");
			var temConsumo = {};
			temConsumo.COD         = $("#cod"+id).html();
			temConsumo.CANTIDAD    = value;
			temConsumo.CENTROCOSTO = cecoMaq;
			temConsumo.TIPO        = 1;
			if(value > 0){
				arraConsumo.push(temConsumo);
				xc++;
			}
		});
		var arrayDevolucion = [];
		$('.cDevolucion').each(function(index,element){
			var value = parseNumericFloat(element.value);
			var id = element.id.replace("dev","");
			var temDevolucion = {};
			temDevolucion.MATERIAL        = $("#cod"+id).html();
			temDevolucion.CANTIDAD        = value;			
			temDevolucion.ALMACEN_ORIGEN  = 'TRAN';
			temDevolucion.ALMACEN_DESTINO = '9000';
			temDevolucion.UNIDAD 		  = $("#um"+id).html();
			if(value > 0){
				arrayDevolucion.push(temDevolucion);
				xd++;
			}
		});
		var documentConsumo = '0';
		var mensaje = '';
		var resultaEsperado = true;
		if(xc > 0){
			var mat = {};
			mat.MATERIALES = arraConsumo;
			materiales = JSON.stringify(mat);
			var consumo     = IPSERVERSAP + "JSON_BAPI_GOODSMVT_CREATE_AGRO.aspx?FECHA="+fecha+"&MATERIALES="+materiales+"&CENTRO="+campo+"&ALMACEN=TRAN&MOVIMIENTO=201"+"&EQUIPO=";
			consumo += user;
			console.log("consumo: " +consumo);
			$.ajax({
				url: consumo,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					console.log(data);
					if(data.MATERIALDOCUMENT != ""){
						mensaje += "Consumo realizado con éxito, Número de documento "+data.MATERIALDOCUMENT + "<br>";
						documentConsumo = data.MATERIALDOCUMENT;
					} else {
						resultaEsperado = false;
						$.each(data.RETURN, function(key, val){
							mensaje += val.MESSAGE+"<br>";
						});
					}
				}
			})
		}
		var documentDevolucion = "0"; 
		if(xd > 0){
			var param = {};
			var parametro = {};
			param.OBJETOENTRADA = [];
			parametro.BAPI    = "BAPI_MIGO_311";
			parametro.RUNTEST = "false";
			parametro.PARAMETROS = {};
			parametro.PARAMETROS.FECHA 		= fecha;
			parametro.PARAMETROS.MATERIALES = arrayDevolucion;
			parametro.PARAMETROS.CENTRO 	= campo;
			parametro.PARAMETROS.MOVIMIENTO = "311";
			param.OBJETOENTRADA.push(parametro);
			var devolucion  = IPSERVERSAP + "JSON_MIGO_311_CAMPO.aspx?PARAMETRO="+JSON.stringify(param);
			console.log("devolucion: " +devolucion);
			$.ajax({
				url: devolucion,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					console.log(data);
					if(data.MATERIALDOCUMENT != ""){
						mensaje += "Devolución realizada con éxito, Número de documento "+data.MATERIALDOCUMENT + "<br>";
						documentDevolucion = data.MATERIALDOCUMENT;
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
		if(resultaEsperado){
			console.log("/simpleWeb/json/AGRO/UPDATE_GESTION_MATERIAL/"+reserva+"/"+documentConsumo+"/"+documentDevolucion);
			$.ajax({
				url : "/simpleWeb/json/AGRO/UPDATE_GESTION_MATERIAL/"+reserva+"/"+documentConsumo+"/"+documentDevolucion,
				type : "GET",
				dataType : 'json',
				async : false,
				success : function(data) {
					alerta(mensaje);
					$("#btnConsumo"+y).hide();
				},error : function(jqXHR, textStatus, errorThrown) {
					if(documentConsumo != ''){
						$.ajax({
							url: IPSERVERSAP + "JSON_ZMOV_CANCEL_MIGO.aspx?DOCUMENTO="+documentConsumo+"&FECHAANULACION="+fecha,
							type:	"GET",
							dataType: 'json',
							async: false,
							success: function(data){
								mensaje += "Documento Consumo"+documentConsumo+" Reversado con el documento "+data.HEADRET.MATDOC_ITEM+"<br>";
							}
						})
					}
					if(documentDevolucion != ''){
						$.ajax({
							url: IPSERVERSAP + "JSON_ZMOV_CANCEL_MIGO.aspx?DOCUMENTO="+documentDevolucion+"&FECHAANULACION="+fecha,
							type:	"GET",
							dataType: 'json',
							async: false,
							success: function(data){
								mensaje += "Documento Devolución"+documentDevolucion+" Reversado con el documento "+data.HEADRET.MATDOC_ITEM+"<br>";
							}
						})
					}
					alerta(mensaje);
				}
			})
		} else {
			if(documentConsumo != ''){
				$.ajax({
					url: IPSERVERSAP + "JSON_ZMOV_CANCEL_MIGO.aspx?DOCUMENTO="+documentConsumo+"&FECHAANULACION="+fecha,
					type:	"GET",
					dataType: 'json',
					async: false,
					success: function(data){
						mensaje += "Documento "+documentConsumo+" Reversado con el documento "+data.HEADRET.MATDOC_ITEM+"<br>";
					}
				})
			}
			if(documentDevolucion != ''){
				$.ajax({
					url: IPSERVERSAP + "JSON_ZMOV_CANCEL_MIGO.aspx?DOCUMENTO="+documentDevolucion+"&FECHAANULACION="+fecha,
					type:	"GET",
					dataType: 'json',
					async: false,
					success: function(data){
						mensaje += "Documento "+documentDevolucion+" Reversado con el documento "+data.HEADRET.MATDOC_ITEM+"<br>";
					}
				})
			}
			alerta(mensaje);
		}
		$('#loading').hide();
	},500);
	
}
function consumos(id, campo){
	$('#loading').show();
	setTimeout(function(){
		var tblDetalle = "";
		tblDetalle +=	"<div class='table-responsive'>";
		tblDetalle +=		"<table class='table table-bordered table-hover table-striped table-condensed' id='tbl_Datos_Comunes'>";
		tblDetalle +=			"<thead>";
		tblDetalle +=				"<tr>";
		tblDetalle +=					"<th>Numero</th>";
		tblDetalle +=					"<th>Tipo</th>";
		tblDetalle +=					"<th>Material</th>";
		tblDetalle +=					"<th>Codigo</th>";
		tblDetalle +=					"<th>UM</th>";
		tblDetalle +=					"<th>Cantidad Retirada</th>";
		tblDetalle +=					"<th>Consumo</th>";
		tblDetalle +=					"<th>Devolución</th>";
		tblDetalle +=					"<th style='min-width: 120px;'></th>";
		tblDetalle +=				"</tr>";
		tblDetalle +=			"</thead>";
		tblDetalle +=			"<body id='tblModal'>"+loadDetalleConsumo(id, campo)+"</body>";
		tblDetalle +=		"</table>";
		tblDetalle +=	'</div>';
		//tblDetalle += 	"<div style='text-align: center;'>";
		//tblDetalle += 		"<a class='btn green-dark' onclick='consumoSap(\""+campo+"\");'>Consumo</a>";
		//tblDetalle += 	"</div>";
		popUp("Detalle Reservas SAP", tblDetalle, true, "1350px", true);
		$('#loading').hide();
	},500);
}
function loadDetalleConsumo(id, campo){
	var datosSAP;
	var tBody = "";
	$.ajax({
		url : "/simpleWeb/json/AGRO/GET_DETALLE_SAP/"+id,
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			datosSAP = data;
		}
	})
	var datoReserva = "";
	var datoSolped = "";
	var y = 0;
	console.log(datosSAP);
	$.each(datosSAP, function(k,v){
		var tipo = "";
		if(v.tipo == 1){
			tipo = "Reserva";
			var urlR = IPSERVERSAP + "JSON_ZMOV_10025.aspx?CENTRO="+campo+"&RESERVA="+v.numero;
			console.log(urlR);
			$.ajax({
				url : urlR,
				type : "GET",
				dataType : 'json',
				async : false,
				success : function(data) {
					datoReserva = data;
				}
			})
			var x = 0;
			$.each(datoReserva.T_SALIDA, function(kk,vv){
				console.log(vv);
				if(vv.LGORT == 'TRAN') {
					if(vv.IANUL == '') {
						var dataMat = [];
						$.ajax({
							url: IPSERVERSAP + "JSON_ZMOV_10020.aspx?MATERIAL="+parseInt(vv.MATNR),
							type:	"GET",
				//			data : JSON.stringify(row),
							dataType: 'json',
							async: false,
							success: function(data){
								dataMat = data;
							}
						})
						tBody += "<tr class='tr"+v.id+"'>";
						if(x== 0) {
							tBody += 	"<td>"+v.numero+"</td>";
							tBody += 	"<td>"+tipo+"</td>";
						} else {
							tBody += "<td></td><td></td>"
						}
						tBody += 	"<td>"+dataMat.LT_DETALLE[0].MAKTX+"</td>";
						tBody += 	"<td id='cod"+y+"'>"+parseInt(vv.MATNR)+"</td>";
						tBody += 	"<td id='um"+y+"'>"+vv.MEINS+"</td>";
						tBody += 	"<td>"+vv.MENGE+"</td>";
						if(v.consumo > 0 || v.devolucion){
							var valueCon = 0;
							$.ajax({
								url: IPSERVERSAP + "JSON_BAPI_GOODSMVT_GETDETAIL.aspx?DOCUMENTO="+v.consumo+"&ANO=2018",
								type:	"GET",
					//			data : JSON.stringify(row),
								dataType: 'json',
								async: false,
								success: function(data){
									$.each(data.GOODSMVT_ITEMS, function(kc,vc){
										if(vv.MATNR == vc.MATERIAL){
											valueCon += vc.ENTRY_QNT;
										}
									});
								}
							})
							var valueDev = 0;
							$.ajax({
								url: IPSERVERSAP + "JSON_BAPI_GOODSMVT_GETDETAIL.aspx?DOCUMENTO="+v.devolucion+"&ANO=2018",
								type:	"GET",
					//			data : JSON.stringify(row),
								dataType: 'json',
								async: false,
								success: function(data){
									$.each(data.GOODSMVT_ITEMS, function(kc,vc){
										if(vv.MATNR == vc.MATERIAL){
											valueDev += vc.ENTRY_QNT;
										}
									});
								}
							})
							tBody += 	"<td>"+valueCon+"</td>";
							tBody += 	"<td>"+valueDev+"</td>";							
						} else {
							tBody += 	"<td><input id='con"+y+"' value='"+vv.MENGE+"' class='cConsumo form-control'></td>";
							tBody += 	"<td><input id='dev"+y+"' value='0' class='cDevolucion form-control'></td>";
						}						
						if(x== 0 && v.devolucion == null && v.consumo == null) {
							tBody += 	"<td><a class='btn green-dark' id='btnConsumo"+y+"' onclick='consumoSap(\""+campo+"\","+v.numero+","+y+");'>Consumo</a></td>";
						}else {
							tBody += "<td></td>";
						}
						tBody += "</tr>";
						x++;
						y++;
					}
				}
			});
		}
		
	})
	return tBody;
}
function delDetalleSAP(v){
	var c;
	var tipo = "";
	if(v.tipo == 1){
		tipo = "reserva";
		c = confirmar.confirm("Se eliminaran todas reservas ligadas al numero "+v.numero+"\n ¿Esta Seguro?");
	}else{
		tipo = "solicitud";
		c = confirmar.confirm("Se eliminaran todas Solicitudes ligadas al numero "+v.numero+"\n ¿Esta Seguro?");
	}
	$(c.aceptar).click(function(){
		$.getJSON(IPSERVERSAP + "JSON_BAPI_RESERVATION_DELETE.aspx?RESERVA="+v.numero, function(dataDel){
			console.log(dataDel)
			$.ajax({
				url : "/simpleWeb/json/AGRO/DELETE_GESTION_MATERIAL/"+v.id,
				type : "POST",
				async : false,
				success: function(data){
					$("#tr"+v.id).remove();
					alerta("Se ha eliminado la "+tipo+" N° "+v.numero);
				},
				error : function(jqXHR, textStatus, errorThrown) {				
					alerta("Ha ocurrido un error interno del servidor, Consulte con el adminisrador del sistema");
					loading.hide();
				}
			})
		})
	})
}
function filtroPacking(campo){
	if(campo == undefined){
		campo = 0;
	}else if(campo[0] == "0"){
		campo = allCampos;
	}
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_PackingFrigorifico/"+campo,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			var tbl = "";
			console.log(data)
			$.each(data, function(k,v){
				$.getJSON(IPSERVERSAP + "JSON_BAPI_EQUI_GETLIST.aspx?CENTRO="+v.campo+"&EQUIPO="+v.equipo, function(dataEq){
					tbl += "<tr>";
					tbl += 		"<td>"+v.codigo+"</td>";
					tbl += 		"<td>"+v.campo+"</td>";				
					tbl += 		"<td>"+dataEq.EQUIPMENT_LIST[0].DESCRIPT+"</td>";
					tbl += 		"<td>"+formatFecha(v.fecha)+"</td>";				
					tbl += 		"<td>"+v.motivo_ingreso+"</td>";
					tbl += 		"<td>"+v.diagnostico_preliminar+"</td>";
					tbl += 		"<td><a onclick='javascript: popPacking("+v.codigo+")'><img src='../assets/layouts/layout/img/edit.png' style='width: 28px; height: 28px;'></a></td>";
					tbl += "</tr>";
				})
			})
			setTimeout(function(){
				$("#BodyPacking").html(tbl);
			}, 1000);
			loading.hide();
			
		}
	})
}
function filtroRiego(campo){
	if(campo == undefined){
		campo = 0;
	}else if(campo[0] == "0"){
		campo = allCampos;
	}
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_Ingreso_Riego/"+campo,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			var tbl = "";
			console.log(data)
			$.each(data, function(k,v){
				$.getJSON(IPSERVERSAP + "JSON_BAPI_EQUI_GETLIST.aspx?CENTRO="+v.campo+"&EQUIPO="+v.equipo, function(dataEq){
					tbl += "<tr>";
					tbl += 		"<td>"+v.codigo+"</td>";
					tbl += 		"<td>"+v.campo+"</td>";				
					tbl += 		"<td>"+v.caseta+"</td>";
					tbl += 		"<td>"+dataEq.EQUIPMENT_LIST[0].DESCRIPT+"</td>";
					tbl += 		"<td>"+formatFecha(v.fecha)+"</td>";				
					tbl += 		"<td>"+v.motivo_ingreso+"</td>";
					tbl += 		"<td>"+v.diagnostico_preliminar+"</td>";
					tbl += 		"<td><a onclick='javascript: popRiego("+v.codigo+")'><img src='../assets/layouts/layout/img/edit.png' style='width: 28px; height: 28px;'></a></td>";
					tbl += "</tr>";
				});
			})
			setTimeout(function(){
				$("#BodyRiego").html(tbl);
			}, 1000);
			loading.hide();
		}
	})
}
function tiposServicoExterno(){
	var tiposExterno = [{
		id: 1,
		descripcion: "Mecanico"
	},{
		id: 2,
		descripcion: "Eléctrico"
	},{
		id: 3,
		descripcion: "Tornero"
	}];
	var options = "<option value=''></option>";
	$.each(tiposExterno, function(k,v){
		options += "<option value='"+v.id+"'>"+v.descripcion+"</option>";
	})
	return options;
}
function gestionMaterial(id){
	cMat = 0;
	identificador = id;
	var tblPp = "";
	tblPp += "<div class='table-responsive'>";
	tblPp += "<div class='table-scrollable'>";
	tblPp += 	"<table class='table table-bordered table-hover table-striped table-condensed' id='tblMateriales'>";
	tblPp += 		"<thead>";
	tblPp += 			"<tr>";
	tblPp += 				"<th colspan='2'>Fecha Entrega</th>";
	tblPp += 				"<th >Observación</th>";
	tblPp += 			"</tr>";
	tblPp += 			"<tr>";
	tblPp += "<td colspan='2'><input size='16' type='text' name='fecha' style='width:130px' class='form-control' " +
	"value='"+formatFecha(dateHoy())+"' id='fechaSol"+id+"' readonly onchange='valFechaHoy(this.id)'></td> " ;
	tblPp += "<td colspan='2'><input type='text' name='observacion' style='width:180px' class='form-control' value='' id='observacion"+id+"'  </td> " ;
	tblPp += 			"</tr>";
	tblPp += 			"<tr>";
	tblPp += 				"<th style='min-width:200px'>Material</th>";
	tblPp += 				"<th style='width:200px'>UM</th>";
	tblPp += 				"<th style='width:200px'>Cantidad Reserva</th>";
	tblPp += 				"<th style='width:200px'>Stock</th>";
	tblPp += 				"<th style='width:200px'>Cantidad Solped</th>";
	tblPp += 				"<th style='width:200px'>Solped</th>";
	tblPp += 				"<th style='width:200px'>Cantidad</th>";
	tblPp += 				"<th style='min-width:100px'>Fecha</th>";
	tblPp += 				"<th style='width:100px'></th>";
	tblPp += 			"</tr>";
	tblPp += 		"</thead>";
	tblPp += 		"<tbody id='tbl_Materiales'></tbody>";
	tblPp += 		"<tfoot id='tfoot_Materiales'></tfoot>";
	tblPp += 		"<thead>";
	tblPp += 		"<thead>";
	tblPp += 	"</table>";
	tblPp += "</div>";
	tblPp += "</div>";
	tblPp += 	"<div style='text-align: right;'>";
	tblPp += 		"<a id='1' class='btn red btn-sm' onclick='javascript: addMateriales("+id+");'><i class='fa fa-plus'></i></a>";
	tblPp += 	"</div>";
	popUp("Gestion Material: "+parseFolio(id), tblPp, true, "1100px", true);
	fechas();
}
var arrayMaterial = [];
function getMaterial(){
	console.log(IPSERVERSAP + "JSON_ZMOV_10020.aspx?FAMILIA=ZREP")
	$.ajax({
		//url: "/simpleWeb/json/AGRO/GETMA/",
		url: IPSERVERSAP + "JSON_ZMOV_10020.aspx?FAMILIA=ZREP",//ZREP
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayMaterial.push(data.LT_DETALLE);
		}
	})
}
var cMat
function addMateriales(id){
	var campo;
	console.log(arrayMaterial)
	$.each(tallerArr, function(k,v){
		if(v.codigo == identificador){
			campo = v.campo;
		}
	})
	var hoy = dateHoy();
	hoy = hoy.split("-");
	hoy = new Date(hoy[0], hoy[1], hoy[2]);
	var tr  = "<tr class='tr"+cMat+"'>";
	tr += "<td><select id='mat"+cMat+"' onchange='getDetalleMaterial("+cMat+")'  class='form-control input-sm'>";	
    $.each(arrayMaterial[0], function(ka,va){
    	tr += "<option value='"+va.MATNR+"'>"+va.MAKTX+"</option>";
    })
	tr += "</select>";
	tr += "</td>";
	tr += "<td id='um"+cMat+"'></td>";
	tr += "<td><input class='form-control required-modal' type='number' id='cant"+cMat+"'></td>";	
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
	trf += "<td><button id='addReserva' onclick='javascript: reservar("+id+");' class='btn green-dark btn-sm'><i class='icon-cloud-upload'></i> Reservar</button></td>";
	trf += "<td></td>";
	trf += "<td><button id='addSolped' onclick='javascript: solped("+id+");' class='btn yellow btn-sm'><i class='icon-cloud-upload'></i> Solicitar</button></td>";
	trf += "<td></td>";
	trf += "<td></td>";
	trf += "<td></td>";
	trf += "<td></td>";
	trf += "</tr>";
	$("#tfoot_Materiales").html(trf);
	$('#tbl_Materiales').append(tr);
//	$('#mat'+cMat).trigger('change');
	$('#addReserva').show();
	$('#addSolped').show();
	$("#mat"+cMat).trigger("change");
	selectCss();
	cMat++;
}
function getDetalleMaterial(c){
//	$('#tbl_Materiales').find("tr:gt(0)").remove();
	var id = $('#mat'+c).val();
	console.log(id)
	var campo;
	$.each(tallerArr, function(k,v){
		if(v.codigo == identificador){
			campo = v.campo;
		}
	})
	$('#um'+c).empty();
	$('#stock'+c).empty();
	$('#solped'+c).empty();
	$('#cantS'+c).empty();
	$('#fecha'+c).empty();
	$.getJSON(IPSERVERSAP + "JSON_ZMOV_10020.aspx?MATERIAL="+id, function(dataMat){
		console.log(dataMat)
		$('#um'+c).html(dataMat.LT_DETALLE[0].MEINS);
	});
	console.log(IPSERVERSAP + "JSON_BAPI_MATERIAL_STOCK_REQ_LIST.aspx?CENTRO="+campo+"&MATERIAL="+id+"&ALMACEN=9000");
	$.getJSON(IPSERVERSAP + "JSON_BAPI_MATERIAL_STOCK_REQ_LIST.aspx?CENTRO="+campo+"&MATERIAL="+id+"&ALMACEN=9000", function(dataStock){
		$('#stock'+c).html(formatNumber(dataStock.T_STOCK_MATNR[0].LABST));
	});
	$.getJSON(IPSERVERSAP + "JSON_BAPI_REQUISITION_GETITEMS.aspx?CENTRO="+campo+"&MATERIAL="+id, function(dataSoped){
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
				var tr = "<tr class='tr"+c+"'>";
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
function descartarMaterial(c){
	$('.tr'+c).remove();
	if($("#tbl_Materiales tr").length == 0){
		$('#addReserva').hide();
		$('#addSolped').hide();
		$("#reser").remove();
	}
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

function solped(id){
	var campo;
	var equipo;
	$.each(tallerArr, function(k,v){
		if(v.codigo == identificador){
			campo = v.campo;
			equipo = v.vehiculo;
		}
	})
	var almacen = "9000";
	var mat = {};
	mat.MATERIALES = listMaterialesSolped();
	var observacion = $("#observacion"+id).val();
	console.log($('#fechaSol'+id).val());
	var fecha2 = formatFecha($('#fechaSol'+id).val());
	
	fecha2 = fecha2.replace("-", "").replace("-", "");
	var url  = IPSERVERSAP + "JSON_BAPI_REQUISITION_CREATE.aspx?FECHA="+dateHoy().replace(/-/g, "")+"&MATERIALES="+JSON.stringify(mat)+"&ALMACEN="+almacen+"&CENTRO="+campo+"&CENTROCOSTO="+cecoMaq+"&EQUIPO="+parseVeinte(equipo);
	url += "&FECHAENTREGA="+fecha2+"&OBSERVACION="+observacion;
	url += "&USPAS="+SESION.user+"X*X"+SESION.pass;
	url += "&GRUPO_COMRPA="+SESION.grupoCompra+"&SOLICITANTE="+SESION.solicitante;

	console.log(url);
	$.getJSON(url, function(response){
		if(response.NUMBER != ""){
			$.ajax({
				url : "/simpleWeb/json/AGRO/INSERT_GESTION_MATERIAL/"+id+"/"+response.NUMBER+"/2",
				type : "POST",
				async : false,
				success: function(data){
					alerta("Se ha realizado la solicitud de pédido "+response.NUMBER);
				},
				error : function(jqXHR, textStatus, errorThrown) {				
					alerta("Ha ocurrido un error interno del servidor, Consulte con el adminisrador del sistema");
					loading.hide();
				}
			})
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
function reservar(id){
	$('#addReserva').attr('disabled','disabled');
	var campo;
	var equipo;
	$.each(tallerArr, function(k,v){
		if(v.codigo == identificador){
			campo = v.campo;
			equipo = v.vehiculo;
		}
	})
	
	var user = "&USPAS="+SESION.user+"X*X"+SESION.pass;
	var mat = {};
	mat.MATERIALES = listMateriales();
	var url  = IPSERVERSAP + "JSON_BAPI_RESERVATION_CREATE1.aspx?FECHA="+dateHoy().replace(/-/g, "")+"&ALMACEN=9000&ALMACENDESTINO=TRAN"+"&MATERIALES="+JSON.stringify(mat)+"&CENTRO="+campo+"&MOVIMIENTO=311&CENTROCOSTO="+cecoMaq+"&EQUIPO="+parseVeinte(equipo)+user;
	console.log(url);
	
	$.getJSON(url, function(response){
		if(response.RESERVATION != 0){
			$('#nreserva').val(response.RESERVATION);
			var url = "/simpleWeb/json/AGRO/UPDATE_RESERVA_SOLPED/"+id+"/"+response.RESERVATION;
			console.log(url);
			$.ajax({
				url : url,
				type : "GET",
				async : false,
				success: function(data){
					$.ajax({
						url : "/simpleWeb/json/AGRO/INSERT_GESTION_MATERIAL/"+id+"/"+response.RESERVATION+"/1",
						type : "POST",
						async : false,
						success: function(data){
							alerta("Se ha reservado con éxito, número de reserva "+response.RESERVATION);
						},
						error : function(jqXHR, textStatus, errorThrown) {				
							alerta("Ha ocurrido un error interno del servidor, Consulte con el adminisrador del sistema");
							loading.hide();
						}
					})
				},
				error : function(jqXHR, textStatus, errorThrown) {				
					
					$.ajax({
						url: IPSERVERSAP + "JSON_BAPI_RESERVATION_DELETE.aspx?RESERVA="+response.RESERVATION,
						type:	"GET",
						dataType: 'json',
						async: false,
						success: function(data){
							alerta("No se ha podido registrar la infomacion, consulte con el administrador del sistema Reserva Anulada: "+response.RESERVATION);
																
						}
					})
				}
			})
			
			
		} else {
			var mensaje = "";
			$.each(response.RETURN, function(key, val){
				mensaje += val.MESSAGE+"<br>";
			});
			$('#addReserva').attr('disabled',false);
			alerta(mensaje);
		}
	});
	
}
function listMaterialesSolped(){
	var arrayListMat = [];
	for (var i = 0; i < cMat; i++) {
		if($('#mat'+i).val() != undefined){			
			if($('#mat'+i).val() != "" &&  $('#cantSol'+i).val() != ""){
		   		var arrayList = {};
				arrayList.COD = $('#mat'+i).val();
				arrayList.CANTIDAD = parseFloat($('#cantSol'+i).val()).toFixed(3);
				arrayListMat.push(arrayList);
		   	}
	   } 
	}
	return arrayListMat;
	
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
				arrayList.ALMACEN  = "9000";
				arrayListMat.push(arrayList);
		   	} 	
	   } 
	}
	return arrayListMat;
	
}
function servicioExterno(id, campo){
	var serviceEx = "";
	serviceEx = "<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 	"<div class='col-xs-6 col-sm-6 col-md-6'>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 			"<h5 style='color: #337ab7;font-weight: bold'>Fecha de Envío</h5>";
	serviceEx += 		"</div>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12 '>";
	serviceEx += 			"<input type='text' name='fecha' readonly class='form-control required-modal' id='fechaEnvio"+id+"'>";
	serviceEx += 		"</div>";
	serviceEx += 	"</div>";
	serviceEx += 	"<div class='col-xs-6 col-sm-6 col-md-6'>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 			"<h5 style='color: #337ab7;font-weight: bold'>Tipo de Servicio</h5>";
	serviceEx += 		"</div>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 			"<select type='text' class='form-control input-sm required-modal' id='tipoServicioEx"+id+"'>"+tiposServicoExterno()+"</select>";
	serviceEx += 		"</div>";
	serviceEx += 	"</div>";
	serviceEx += "</div>";
	serviceEx += "<div class='col-xs-12 col-sm-12 col-md-12 portlet'>";
	serviceEx += 	"<div class='col-xs-6 col-sm-6 col-md-6'>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 			"<h5 style='color: #337ab7;font-weight: bold'>Horómetro de Envío</h5>";
	serviceEx += 		"</div>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 			"<input type='text' class='form-control required-modal' id='hroEnvioEx"+id+"'>";
	serviceEx += 		"</div>";
	serviceEx += 	"</div>";
//	serviceEx += 	"<div class='col-xs-6 col-sm-6 col-md6'>";
//	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12'>";
//	serviceEx += 			"<h5 style='color: #337ab7;font-weight: bold'>Datos de Solped</h5>";
//	serviceEx += 		"</div>";
//	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12'>";
//	serviceEx += 			"<select type='text' class='form-control input-sm' id='datos"+id+"'>"+tiposServicoExterno()+"</select>";
//	serviceEx += 		"</div>";
//	serviceEx += 	"</div>";
	serviceEx += "</div>";
	serviceEx += 	"<div style='text-align: center;'>";
	serviceEx += 		"<a class='btn green-dark submit-modal' onclick='saveServiceEx("+id+")'>Guardar</a>";
	serviceEx += 		"<a class='btn red' onclick='closeModal()'>Cancelar</a>";
	serviceEx += 	"</div>";
	
	popUp("Servicio Externo Folio: "+parseFolio(id), serviceEx, true, "600px", true);
	selectCss();
	fechas();
}
function reingresoTaller(id){
	var serviceEx = "";
	serviceEx = "<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 	"<div class='col-xs-6 col-sm-6 col-md-6'>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 			"<h5 style='color: #337ab7;font-weight: bold'>Horómetro de Reingreso</h5>";
	serviceEx += 		"</div>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12 '>";
	serviceEx += 			"<input type='text' class='form-control required-modal' id='horoRe"+id+"'>";
	serviceEx += 		"</div>";
	serviceEx += 	"</div>";
	serviceEx += 	"<div class='col-xs-6 col-sm-6 col-md-6'>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 			"<h5 style='color: #337ab7;font-weight: bold'>Estado de Reingreso</h5>";
	serviceEx += 		"</div>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 			"<select type='text' class='form-control input-sm required-modal' id='estRe"+id+"'>"+tiposServicoExterno()+"</select>";
	serviceEx += 		"</div>";
	serviceEx += 	"</div>";
	serviceEx += "</div>";
	serviceEx += "<div class='col-xs-12 col-sm-12 col-md-12 portlet'>";
	serviceEx += 	"<div class='col-xs-6 col-sm-6 col-md-6'>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 			"<h5 style='color: #337ab7;font-weight: bold'>Fecha Reingreso</h5>";
	serviceEx += 		"</div>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 			"<input type='text' name='fecha' readonly class='form-control required-modal' id='fechaRe"+id+"'>";
	serviceEx += 		"</div>";
	serviceEx += 	"</div>";
	serviceEx += "</div>";
	serviceEx += "<div style='text-align: center;'>";
	serviceEx += 	"<a class='btn green-dark submit-modal' onclick='saveReTaller("+id+")'>Guardar</a>";
	serviceEx += 	"<a class='btn red' onclick='closeModal()'>Cancelar</a>";
	serviceEx += "</div>";
	
	popUp("Reingreso Taller: "+parseFolio(id), serviceEx, true, "600px", true);
	selectCss();
	fechas();
}
function salidaTaller(id){
	var serviceEx = "";
	serviceEx = "<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 	"<div class='col-xs-6 col-sm-6 col-md-6'>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 			"<h5 style='color: #337ab7;font-weight: bold'>Fecha Salida</h5>";
	serviceEx += 		"</div>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12 '>";
	serviceEx += 			"<input type='text' name='fecha' readonly class='form-control required-modal' id='fechaExit"+id+"'>";
	serviceEx += 		"</div>";
	serviceEx += 	"</div>";
	serviceEx += 	"<div class='col-xs-6 col-sm-6 col-md-6'>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 			"<h5 style='color: #337ab7;font-weight: bold'>Horómetro Salida</h5>";
	serviceEx += 		"</div>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 			"<input type='text' class='form-control required-modal' id='horoExit"+id+"'>";
	serviceEx += 		"</div>";
	serviceEx += 	"</div>";
	serviceEx += "</div>";
	serviceEx += "<div class='col-xs-12 col-sm-12 col-md-12 portlet'>";
	serviceEx += 	"<div class='col-xs-6 col-sm-6 col-md-6'>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 			"<h5 style='color: #337ab7;font-weight: bold'>Diagnóstico definitivo</h5>";
	serviceEx += 		"</div>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 			"<input type='text' class='form-control required-modal' id='diagnostico"+id+"'>";
	serviceEx += 		"</div>";
	serviceEx += 	"</div>";
	serviceEx += 	"<div class='col-xs-6 col-sm-6 col-md-6'>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 			"<h5 style='color: #337ab7;font-weight: bold'>Recomendación</h5>";
	serviceEx += 		"</div>";
	serviceEx += 		"<div class='col-xs-12 col-sm-12 col-md-12'>";
	serviceEx += 			"<input type='text' class='form-control' id='reco"+id+"'>";
	serviceEx += 		"</div>";
	serviceEx += 	"</div>";
	serviceEx += "</div>";
	serviceEx += "<div style='text-align: center;'>";
	serviceEx += 	"<a class='btn green-dark submit-modal' onclick='SaveSalida("+id+")'>Guardar</a>";
	serviceEx += 	"<a class='btn red' onclick='closeModal()'>Cancelar</a>";
	serviceEx += "</div>";
	
	popUp("Salida Taller: "+parseFolio(id), serviceEx, true, "600px", true);
	selectCss();
	fechas();
}
function saveReTaller(id){
	if(validateModal()){
		var reingreso = {
			ingreso: id,
			horometro_reingreso: $("#horoRe"+id).val(),
			estado_reingreso: $("#estRe"+id).val(),
			fecha_reingreso: formatFecha($("#fechaRe"+id).val())
		}
		$.ajax({
			url : "/simpleWeb/json/AGRO/ADD_REINGRESO_TALLER/",
			type : "PUT",
			data : JSON.stringify(reingreso),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},success:function(){
				closeModal();
				alerta("Reingreso Exitoso");
			}
		})
	}
}
function saveServiceEx(id){
	var campo;
	$.each(tallerArr, function(k,v){
		if(v.codigo == id){
			campo = v.campo;
		}
	})
	if(validateModal()){
		var servicio = {
			codigo: 0,
			tipo_servicio: $("#tipoServicioEx"+id).val(),
			orden_ingreso: "",
			horometro: $("#hroEnvioEx"+id).val(),
			horometro_recepcionado: "",
			fecha: formatFecha($("#fechaEnvio"+id).val()),
			estado: 0,
			campo: campo,
			orden_envio: id
		}
		$.ajax({
			url : "/simpleWeb/json/AGRO/ADD_ServicioExterno/",
			type : "PUT",
			data : JSON.stringify(servicio),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},success:function(){
				closeModal();
				alerta("Servicio Enviado Correctamente");
				loadInfo();
			}
		})
	}
	
}
function SaveSalida(id){
	if(validateModal()){
		var row = {};
		row.codigo = id;
		row.fechaCierre = formatFecha($('#fechaExit'+id).val());
		row.horoCierre = $('#horoExit'+id).val();
		row.dgtco_dfnvo = $("#diagnostico"+id).val();
		row.recomendacion = $("#reco"+id).val();
		$.ajax({
			url : "/simpleWeb/json/AGRO/CERRAR_INGRESO_TALLER/",
			type : "PUT",
			data : JSON.stringify(row),
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success : function(data, textStatus, jqXHR) {
				closeModal();
				alerta("Cerrado con exito");
				$('.swal2-confirm').click(function(){
					window.location.href = ("ListaMantencion");
				})
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
	}
}



function callback() {
    setTimeout(function() {
      $( "#effect:visible" ).removeAttr( "style" ).hide().fadeIn();
    }, 1000 );
  };

$( "#BT_Taller" ).on( "click", function() {
	$('#HTaller').show();
    runEffect();
    return false;
  });
$("#BT_Riego").on("click",function(){
	$('#HRiego').show();
	runEffectRiego();
	return false;
})
$( "#BT_Packing" ).on( "click", function() {
	$('#HPacking').show();
    runEffectPacking();
    return false;
  });