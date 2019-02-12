var has = 0;
var arrayMat = [];
var arrayCua = [];
var contMaq = [];
var arrayMaq  = [];
var mayor = 0;
var maxCarencia = 0;
var arrayListMat = []; 
var arrayAlmacen = [];
arrayAlmacen['Z010'] = '2000';
arrayAlmacen['Z011'] = '3000';
arrayAlmacen['Z119'] = '9500';
arrayAlmacen['Z120'] = '4000';
arrayAlmacen['Z121'] = '1000';
arrayAlmacen['Z122'] = '6000';
arrayAlmacen['Z123'] = '5000';
var idPrograma = "";
$(document).ready(function(){
	loadJefeAplicacion(); 
	loadNombreAplicador();
	loadMaquinarias();
	loadImplementos();
	onLoad();
});
var arrayOperador = [];
function getMaquinaria(c){
	console.log(IPSERVERSAP + "JSON_BAPI_EQUI_GETLIST.aspx?CENTRO="+c);
	arrayMaquinaria = [];
	$.ajax({
		url: IPSERVERSAP + "JSON_BAPI_EQUI_GETLIST.aspx?CENTRO="+c,//ZREP
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayMaquinaria = data.EQUIPMENT_LIST;
		}
	})
	console.log(arrayMaquinaria);
}

function cargaOperador(campo){
	var url = "/simpleWeb/json/AGRO/getTrabajadoresAgro2/?TRABAJADOR=*&CAMPO="+campo+"&RUT=*&CARGO=7&FECHA=*&DIGITADOR="+SESION.idUser;
	console.log(url);
	arrayOperador = [];
	$.ajax({
		url: url,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayOperador = data;
		}
	})
	console.log(arrayOperador);
}


function addAct(){
	$("#loading").show();
	setTimeout(function(){
	if(SESION.user == undefined){
		alerta("Se perdió sesión");
		$('.swal2-confirm').click(function(){
			window.location.href = ("login");
		})
		return false;
	}
	var fecha = formatFecha($('#fecha_termino').val()).replace("-", "").replace("-", "");
	var contAlert = 0;
	  $(".oblig").each(function(){
		  if($(this).val()== ''){
			  alerta("Debe completar los datos obigatorios (*)");
			  $("#loading").hide();
			  contAlert++;
			  return false;
		  }
	  }) 
	  if(contAlert > 0) {
		  return false;
	  }
	var confirmAplicacion = {};
	var matrizMat 		  = [];
	var matrizCua         = [];
	var matrizMaq         = [];
	var arrayListConsumo  = [];
	var arrayListMerma  = [];
	var dev = 0;
	var devolucionNegativa = false;
	$.each(arrayMat, function(k,v){
		var rowMaterial            = {};
		rowMaterial.codigo         = v;
		rowMaterial.cantidad_real  = $('#cantidadreal'+v).html().replace(".","").replace(",",".");		
		rowMaterial.devolucion     = $('#devolucion'+v).val().replace(".","").replace(",",".");		
		rowMaterial.diferencia     = $('#diferencia'+v).val().replace(".","").replace(",",".");
		if($('#dosisHas'+v).html() != undefined){
			rowMaterial.dosis_has  = $('#dosisHas'+v).html().replace(".","").replace(",",".");	
		} else {
			rowMaterial.dosis_has = $("#RealdosisHas"+v).val().replace(".","").replace(",",".");
		}
		
		if(parseFloat($('#devolucion'+v).val().replace(".","").replace(",",".")) < 0){
			devolucionNegativa = true;
		}
		
		dev += parseFloat($('#devolucion'+v).val().replace(".","").replace(",","."));
		
		matrizMat.push(rowMaterial);
		var arrayList = {};
		arrayList.COD = $('.listMaterial'+v).attr('id');
		arrayList.CANTIDAD = $('#devolucion'+v).val().replace(".","").replace(",",".");
		arrayList.ALMACEN  = 'TRAN';
		arrayList.ALMACENDESTINO  = $('#almacen'+v).text();
		
		arrayListMat.push(arrayList);
		var totalConsumoMaterial = 0;
		var totalMermaMaterial   = 0;
		var contLineas = 0;
		console.log(arrayCua.length);
		$.each(arrayCua, function(kK,vV){
			var arrayListCons = {};
			var arrayListMerm = {};
			var porcentaje = parseFloat($('#por'+vV).html())/100;
			arrayListCons.COD         = $('.listMaterial'+v).attr('id');
			var cantidadReal = parseFloat(parseFloat($('#cantidadreal'+v).html().replace(".","").replace(",",".")) * porcentaje);
			totalConsumoMaterial += parseFloat(cantidadReal.toFixed(3));
			if(totalConsumoMaterial > parseFloat($('#cantidadreal'+v).html().replace(".","").replace(",","."))){
				console.log("siiiii");
				cantidadReal = parseFloat($('#cantidadreal'+v).html().replace(".","").replace(",",".")) - (totalConsumoMaterial - cantidadReal);
				console.log(cantidadReal);
			}
			//console.log(cantidadReal);
			//cantidadReal = formatNumber2(cantidadReal);
			//console.log(cantidadReal);
			arrayListCons.CANTIDAD    = cantidadReal.toFixed(3);
			arrayListCons.CENTROCOSTO = $('#ceco'+vV).html();
			arrayListCons.TIPO        = $("#prod"+vV).val();
			//arrayListCons.NOMBRE      = $('#nomCuartel'+vV).text();
			if(parseFloat(cantidadReal.toFixed(3)) > 0) {
				arrayListConsumo.push(arrayListCons);
			}
			
			arrayListMerm.COD         = $('.listMaterial'+v).attr('id');
			var diff =  parseFloat($('#diferencia'+v).val().replace(".","").replace(",","."));
			var diferencia = diff * porcentaje;
			totalMermaMaterial += parseFloat(diferencia.toFixed(3));
			console.log(totalMermaMaterial);
			console.log(diff);
			console.log(contLineas);
			contLineas++;
			if(arrayCua.length == contLineas){
				console.log("siiiii dif");
				
				console.log(totalMermaMaterial);
				console.log(diferencia);
				console.log((totalMermaMaterial - diferencia));
				diferencia = diff - (totalMermaMaterial - diferencia);
				console.log(diferencia);
			}
			arrayListMerm.CANTIDAD    = diferencia.toFixed(3);
			arrayListMerm.CENTROCOSTO = $('#ceco'+vV).html();
			arrayListMerm.TIPO        = $("#prod"+vV).val();
			if(parseFloat(diferencia.toFixed(3)) > 0) {
				arrayListMerma.push(arrayListMerm);
			}
			
		})
	});
	
	if(devolucionNegativa){
		alerta("No puede tener devoluciones en negativo");
		$("#loading").hide();
		return false;
	}
	
	$.each(arrayCua, function(k,v){
		console.log('#hecCuartel'+v);
		var rowCuartel            = {};
		rowCuartel.codigo         = v;
		rowCuartel.has_real       = $('#hecCuartel'+v).val().replace(",",".");
		rowCuartel.ceco           = $('#ceco'+v).html();
		matrizCua.push(rowCuartel);
	});
	
	var codMat = "";
	var cantMatD = "";
	var cantMatC = "";
	var cantMatM = "";
	var ceco = "";
	var campo = $('#codCampo').val();
	//console.log(contMaq);
	$.each(contMaq, function(k, v){
		
		if(v!=''){
			var mMaq = {};
			mMaq.codigo = 0;
			mMaq.codigo_pf   = codigo_pf;
			mMaq.maquinaria  = $("#maquinarias"+v).val(); 
			mMaq.implemento  = $("#implementos"+v).val(); 
			mMaq.cambio      = $("#cambio_tractor"+v).val(); 
			mMaq.marcha      = $("#marcha_tractor"+v).val(); 
			mMaq.velocidad   = $("#valocidad"+v).val(); 
			mMaq.presion     = $("#presion_bomba"+v).val(); 
			mMaq.responsable = $("#responsable"+v).val(); 
			matrizMaq.push(mMaq);
		}
	})
	//console.log(matrizMaq);
	//console.log(matrizMat);
	//return;
	$.each(matrizMat, function(k, v){
		cantMatD += v.devolucion;
		cantMatC += v.cantidad_real;
		cantMatM += v.diferencia;
	})
	$.each(matrizCua, function(k, v){
		ceco = v.ceco;
	})
	
	var almacen = arrayAlmacen[$('#idProgramaApl').val()];
	var url = IPSERVERSAP + "JSON_EJECUTA_BAPIS.aspx?PARAMETRO=";
	var json = {};
	var bapi = {};
	bapi.BAPI = 'BAPI_RESERVATION_CREATE1';
	bapi.PARAMETROS = {};
	bapi.PARAMETROS.FECHA = fecha;
	bapi.PARAMETROS.MATERIALES = arrayListMat;
	bapi.PARAMETROS.CENTRO = campo;
	bapi.PARAMETROS.ALMACEN = 'TRAN';
	bapi.PARAMETROS.ALMACEN = almacen;
	bapi.PARAMETROS.MOVIMIENTO = 311;
	bapi.CENTROCOSTO = '';
	bapi.EQUIPO = '';
	json.OBJETOENTRADA = [];
	json.OBJETOENTRADA.push(bapi);
	var mat = {};
	mat.MATERIALES = arrayListMat;
	var materiales = JSON.stringify(mat);
	var devolucion  = IPSERVERSAP + "JSON_BAPI_RESERVATION_CREATE1.aspx?FECHA="+fecha+"&MATERIALES="+materiales+"&CENTRO="+campo+"&ALMACEN=TRAN&ALMACENDESTINO="+almacen+"&MOVIMIENTO=311&CENTROCOSTO=&EQUIPO=";
	var user = "&USPAS="+SESION.user+"X*X"+SESION.pass;
	devolucion += user;
	
	bapi = {};
	bapi.BAPI = 'BAPI_GOODSMVT_CREATE';
	bapi.PARAMETROS = {};
	bapi.PARAMETROS.FECHA = fecha;
	bapi.PARAMETROS.MATERIALES = arrayListConsumo;
	bapi.PARAMETROS.CENTRO = campo;
	bapi.PARAMETROS.ALMACEN = 'TRAN';
	bapi.PARAMETROS.MOVIMIENTO = 201;
	bapi.CENTROCOSTO = '';
	bapi.EQUIPO = '';
	json.OBJETOENTRADA.push(bapi);
	
	
	bapi = {};
	bapi.BAPI = 'BAPI_GOODSMVT_CREATE';
	bapi.PARAMETROS = {};
	bapi.PARAMETROS.FECHA = fecha;
	bapi.PARAMETROS.MATERIALES = arrayListMerma;
	bapi.PARAMETROS.CENTRO = campo;
	bapi.PARAMETROS.ALMACEN = 'TRAN';
	bapi.PARAMETROS.MOVIMIENTO = 551;
	bapi.CENTROCOSTO = '';
	bapi.EQUIPO = '';
	json.OBJETOENTRADA.push(bapi);
	var mat = {};
	mat.MATERIALES = arrayListConsumo;
	materiales = JSON.stringify(mat);
	var consumo     = IPSERVERSAP + "JSON_BAPI_GOODSMVT_CREATE_AGRO.aspx?FECHA="+fecha+"&MATERIALES="+materiales+"&CENTRO="+campo+"&ALMACEN=TRAN&MOVIMIENTO=201"+"&EQUIPO=";
	consumo += user;
	
	var mensaje = "";
	var url = url + JSON.stringify(json);
	//console.log(url);
	mat = {};
	mat.MATERIALES = arrayListMerma;
	materiales = JSON.stringify(mat);
	var diferencia  = IPSERVERSAP + "JSON_BAPI_GOODSMVT_CREATE_AGRO.aspx?FECHA="+fecha+"&MATERIALES="+materiales+"&CENTRO="+campo+"&ALMACEN=TRAN&MOVIMIENTO=551&CENTROCOSTO=&EQUIPO=";
	diferencia +=  user;
	
	var cont = [];
	var resultaEsperado = true;
	//console.log("devolucion: " +devolucion);
	/*if(cantMatD != "-" && parseFloat(cantMatD) > 0) {
		$.ajax({
			url: devolucion,
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				console.log(data);
				if(data.RESERVATION != 0){
					mensaje += "Devolución realizada con éxito, Número de documento "+data.RESERVATION + "<br>";
					cont[0] = data.RESERVATION;
				} else {
					resultaEsperado = false;
					mensaje = "";
					$.each(data.RETURN, function(key, val){
						mensaje += val.MESSAGE+"<br>";
					});
				}
			}
		})
	}*/
	console.log(arrayListMat);
	$("#loading").hide();
	console.log("consumo: " +consumo);
	console.log("diferencia: " +diferencia);
	//return;
	$.ajax({
		url: consumo,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			console.log(data);
			if(data.MATERIALDOCUMENT != ""){
				mensaje += "Consumo realizado con éxito, Número de documento "+data.MATERIALDOCUMENT + "<br>";
				cont[1] = data.MATERIALDOCUMENT;
			} else {
				resultaEsperado = false;
				mensaje = "";
				$.each(data.RETURN, function(key, val){
					mensaje += val.MESSAGE+"<br>";
				});
			}
		}
	})
	
	if(cantMatM != "-" && parseFloat(cantMatM) > 0) {	
		$.ajax({
			url: diferencia,
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				console.log(data);
				if(data.MATERIALDOCUMENT != ""){
					mensaje += "Sobre consumo realizado con éxito, Número de documento "+data.MATERIALDOCUMENT + "<br>";
					cont[2] = data.MATERIALDOCUMENT;
				}
				else {
					resultaEsperado = false;
					mensaje = "";
					$.each(data.RETURN, function(key, val){
						mensaje += val.MESSAGE+"<br>";
					});
				}
			}
		})
	}
	
	
	confirmAplicacion.codigo 		     = 0;
	confirmAplicacion.codigo_orden       = window.location.hash.replace("#","");
	confirmAplicacion.fecha_termino      = formatFecha($('#fecha_termino').val());
	confirmAplicacion.mojamiento         = parseInt($('#mojamientoReal').val().replace(".",""));
	confirmAplicacion.mojamiento_total   = parseInt($('#mojamientoTotal').val().replace(".",""));
	confirmAplicacion.tractor_real       = '';
	confirmAplicacion.bomba_real         = 0;
	confirmAplicacion.boquilla_real      = '';
	confirmAplicacion.cambio_real        = 0;
	confirmAplicacion.presion_real       = 0;	
	confirmAplicacion.velocidad_viento   = $("#velocidad_viento").val();
	confirmAplicacion.orientacion_viento = $("#orientacion_viento").val();
	confirmAplicacion.hora_inicio        = $("#hora_inicio").val();
	confirmAplicacion.fecha_inicio       = formatFecha($("#fecha_inicio").val());
	confirmAplicacion.hora_termino       = $("#hora_termino").val();
	confirmAplicacion.lista_materiales   = matrizMat;
	confirmAplicacion.lista_cuarteles    = matrizCua;	
	confirmAplicacion.lista_maquinaria   = matrizMaq;
	confirmAplicacion.consumo            = cont[1];
	confirmAplicacion.cantidad_devolucion = dev;
	confirmAplicacion.devolucion         = "";
	confirmAplicacion.diferencia         = cont[2];
	confirmAplicacion.temperatura		 = $("#temperatura").val();
	console.log(confirmAplicacion);
	//return;
	if(resultaEsperado) {	
		//return;
		$.ajax({
			url : "/simpleWeb/json/AGRO/CONFIRMAAPLICACION/",
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
					window.location.href = ("lista_aplicaciones");
				})
			},
			error : function(jqXHR, textStatus, errorThrown) {
				/*$.each(cont, function(k, v){
					// anular movimiento v
					$.ajax({
						url: IPSERVERSAP + "JSON_ZMOV_CANCEL_MIGO.aspx?DOCUMENTO="+v,
						type:	"GET",
						dataType: 'json',
						async: false,
						success: function(data){
						}
					})
				})*/
				swal({
					  title: "Error!",
					  text: "No se ha podido registrar la infomacion, consulte con el administrador del sistema",
					  type: "error",
					  confirmButtonText: "Aceptar"
				});
			}
		});
	} 
	else {
		if(cont[1] != ""){
			$.ajax({
				url: IPSERVERSAP + "JSON_ZMOV_CANCEL_MIGO.aspx?DOCUMENTO="+cont[1]+"&FECHAANULACION="+fecha,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					$.each(data.RETURN, function(key, val){
						mensaje += val.MESSAGE+"<br>";
					});
				}
			})
		}
		if(cont[2] != ""){
			$.ajax({
				url: IPSERVERSAP + "JSON_ZMOV_CANCEL_MIGO.aspx?DOCUMENTO="+cont[2]+"&FECHAANULACION="+fecha,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					$.each(data.RETURN, function(key, val){
						mensaje += val.MESSAGE+"<br>";
					});
				}
			})
		}
				
		alerta("Confirmar que el traspaso se haya realizado antes de la fecha de término de la aplicación <br>"+mensaje);
		/*swal({
			  title: "Error!",
			  text: "No se ha podido registrar la infomacion" +mensaje,
			  type: "error",
			  confirmButtonText: "Aceptar"
		});*/

		
	}
	$("#loading").hide();
	}, 500);
	
}



var arrayMaq = [];
var arrayImp = [];
function loadMaquinarias(c){		
	//$('#maquinarias').append($('<option>', {value: 0, text: "Seleccione"}));
	$.getJSON("/simpleWeb/json/AGRO/GETMAQUINARIAS/", function(data){
		arrayMaq = data;
//		$.each(data, function(k, v){
//			$('#maquinarias'+c).append($('<option>', {value: v.codigo, text: v.descripcion}));
//		})
	});
}

function loadImplementos(c){		
	//$('#implementos').append($('<option>', {value: 0, text: "Seleccione"}));
	$.getJSON("/simpleWeb/json/AGRO/GETIMPLEMENTOS/", function(data){
		arrayImp = data;
	
});
}

function loadJefeAplicacion(){		
	
	//$('#jefe_aplicacion').append($('<option>', {value: 0, text: "Seleccione"}));
	$.getJSON("/simpleWeb/json/AGRO/getP/6", function(data){
		$.each(data, function(k, v){
			$('#jefe_aplicacion').append($('<option>', {value: v.codigo, text: v.nombre + " "+v.apellido_paterno}));
			$('#jefe_aplicacion_real').append($('<option>', {value: v.codigo, text: v.nombre + " "+v.apellido_paterno}));
		})
	});
}
var aplicador = [];
function loadNombreAplicador(){		
	
	$.getJSON("/simpleWeb/json/AGRO/getP/9", function(data){
		$.each(data, function(k, v){
			aplicador = data;
			//$('#nombre_aplicador').append($('<option>', {value: v.codigo, text: v.nombre + " "+v.apellido_paterno}));
			//$('#nombre_aplicador_real').append($('<option>', {value: v.codigo, text: v.nombre + " "+v.apellido_paterno}));
		})
	});
}
var codigo_pf = 0;
function onLoad(){
	
	$.getJSON("/simpleWeb/json/AGRO/LISTA_APLICACIONES_DETALLE/"+window.location.hash.replace("#",""), function(data){
		console.log(data);
		datos = data;
		codigo_pf = data.numero_orden;
		//$("#numero_orden").val(data.numero_orden);
		onLoadPrograma(data.numero_orden);
		$("#especie").val(data.especie);
		$("#estado_fenologico").val(data.estado_fenologico);
		//$("#fecha_estimada_aplicacion").val(formatFecha(data.fecha_estimada_aplicacion));
		$("#fecha_estimada_cosecha").val(data.fecha_estimada_cosecha);
		$("#forma_aplicacion").val(data.forma_aplicacion);
		$("#mercado").val(data.mercado);
		$("#nombre_aplicador").val(data.nombre_aplicador).trigger('change');
		$("#nombre_aplicador_real").val(data.nombre_aplicador).trigger('change');
		$("#jefe_aplicacion").val(data.jefe_aplicacion).trigger('change');
		$("#jefe_aplicacion_real").val(data.jefe_aplicacion).trigger('change');
		$("#variedad").val(data.variedad);
		$("#cambio_tractor").val(data.cambio_tractor).trigger('change');
		$("#cambio_tractor_real").val(data.cambio_tractor).trigger('change');
		$("#marcha_tractor").val(data.marcha_tractor).trigger('change');
		$("#marcha_tractor_real").val(data.marcha_tractor).trigger('change');
		$("#presion_bomba").val(data.presion_bomba);
		$("#presion_bomba_real").val(data.presion_bomba);
		//getMaquinaria(data.codCampo);
		getMaquinaria(data.campos_maq);
		
		cargaOperador(data.codCampo);
		//getImplemento(data.codCampo);
//		var tbl = "";
//		tbl += "<tr>";
//		tbl += 		"<td>"+data.maquinaria+"</td>";
//		tbl += 		"<td>"+data.implemento+"</td>";					
//		tbl += "</tr>";
//		$('#tblMaquinaria').append(tbl);
		
		if(data.idProgramaAplicacion == 3){
			$('#forma_aplicacion').attr('disabled','disabled');
		}
	
		
//		$.each(data.lista_cuarteles, function(k, v){			
//			var tbl = "";
//			tbl += "<tr>";
//			tbl += 		"<td>"+v.nCuartel+"</td>";
//			tbl += 		"<td><input class='form-control input-circle'  disabled id='has"+v.codigo+"' class='has' value='"+v.has+"' ></td>";						
//			tbl += 		"<td><input class='form-control input-circle'  type='number' id='hasReal"+v.codigo+"' class='hasReal' value='"+v.has+"' max='"+v.has+"'></td>";						
//			tbl += "</tr>";
//			$('#tblCuarteles').append(tbl);
//			arrayCua.push(v.codigo);
//		})
	});

}

var traspasoReserva = [];

function onLoadPrograma(idP){
	$("#loading").show();
	
	var arrayConfirmacion = [];
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_CONFIRMACION/"+window.location.hash.replace("#",""),
		type:	"GET",
//		data : JSON.stringify(row),
		dataType: 'json',
		async: false,
		success: function(data){
			arrayConfirmacion = data;
		}
	})
	
	console.log("/simpleWeb/json/AGRO/LISTA_ORDEN_DETALLE/"+idP);
	
	$.getJSON("/simpleWeb/json/AGRO/LISTA_ORDEN_DETALLE/"+idP, function(data){
		console.log(data);
		if(data.forma_aplicacion == 'Riego'){
			$("#divMaquinaria").hide();
		}
			
		$("#numero_orden").val(data.codigo);
		$("#especie").val(data.especie);
		$("#estado_fenologico").val(data.estado_fenologico);
		$("#fecha_estimada_aplicacion").val(formatFecha(data.fecha_estimada_aplicacion));
		$("#fecha_estimada_cosecha").val(data.fecha_estimada_cosecha);
		$("#programa_aplicacion").val(data.programa_aplicacion);
		$("#control_de").val(data.tipo_control);
		$("#observacion").val(data.observacion);
		$("#mojamiento").val(formatNumber2(data.mojamiento));
		
		$('#dosis_bombada').val((parseInt(data.mojamiento)/100));
		$("#especie").html("Especie "+data.especie);
		$("#campo").val(data.campo);
		$("#codCampo").val(data.codCampo);
		$("#capacidad_maquina").val(formatNumber2(data.capacidad_maquina));
		idPrograma = data.idProgramaAplicacion;
		$('#idProgramaApl').val(data.idProgramaAplicacion);
		$('#materiales').html("Lista Materiales N° Reserva <b>"+data.nreserva+"</b>");
		if(data.idPrograma > 0) {
			$("#h4program").html("Programa "+data.idPrograma);
		} else {
			$("#h4program").html("Programa FP");
		}
		
		
		var tbl = "";
		
			tbl = "<tr>";
			tbl+= "<th>Producto</th>";
			tbl+= "<th>UM</th>";
			if(data.idProgramaAplicacion != 3) {
				
				tbl+= "<th>Dosis 100</th>";
			}else {
				$('.divMojamiento').hide();
			}
			tbl+= "<th>Dosis Has</th>";
			tbl+= "<th>Dosis Has Real</th>";
			tbl+= "<th>Cantidad Programa</th>";
			tbl+= "<th>Cantidad Real </th>";
			tbl+= "<th>Cantidad Retirada </th>";
			tbl+= "<th>Devolución por confirmar</th>";
			tbl+= "<th>Diferencia de consumo</th>";
			tbl+= "<th>Dosis por bombada</th>";
			tbl+= "</tr>";
		$('#headMateriales').append(tbl);
		
		var tblT = '';
		console.log(IPSERVERSAP + "JSON_ZMOV_10025.aspx?RESERVA="+data.nreserva);
		$.getJSON(IPSERVERSAP + "JSON_ZMOV_10025.aspx?RESERVA="+data.nreserva, function(dataRes){			
			$.each(data.lista_materiales, function(k, v){			
				$.getJSON(IPSERVERSAP + "JSON_ZMOV_10020.aspx?MATERIAL="+v.codigo_material, function(dataMat){
					console.log(IPSERVERSAP + "JSON_ZMOV_10020.aspx?MATERIAL="+v.codigo_material);
					var canridadRetirada = 0;
					tblT = '';
					
					$.each(dataRes.T_SALIDA, function(kr, vr){
						tblT += '<tr>';
						console.log(vr);
						if(vr.LGORT == 'TRAN') {
							if(vr.MATNR.indexOf(v.codigo_material) != -1){
								if(vr.IANUL == '') {
									canridadRetirada +=  vr.MENGE;
									tblT += '<td>'+v.codigo_material+'</td>';
									tblT += '<td>'+dataMat.LT_DETALLE[0].MAKTX+'</td>';
									tblT += '<td>'+formatNumber2(vr.MENGE)+'</td>';
									tblT += '<td>'+vr.MEINS+'</td>';									
									tblT += '<td>'+vr.MBLNR+'</td>';
									tblT += '<td>'+formatFecha(vr.BUDAT)+'</td>';
									tblT += '<td>TRASPASO</td>';
								} else {
									canridadRetirada -=  vr.MENGE;
									tblT += '<td>'+v.codigo_material+'</td>';
									tblT += '<td>'+dataMat.LT_DETALLE[0].MAKTX+'</td>';
									tblT += '<td>-'+formatNumber2(vr.MENGE)+'</td>';
									tblT += '<td>'+vr.MEINS+'</td>';									
									tblT += '<td>'+vr.MBLNR+'</td>';
									tblT += '<td>'+formatFecha(vr.BUDAT)+'</td>';
									tblT += '<td>ANULACIÓN TRASPASO</td>';
								}
								
							}
						}
						tblT += '</tr>';
						
					});
					
					$('#tblTraspaso').append(tblT);
					tbl = "";
					tbl += "<tr class='listMaterial"+v.codigo+"' id='"+dataMat.LT_DETALLE[0].MATNR+"'>";
					tbl += 		"<td>"+dataMat.LT_DETALLE[0].MAKTX+"</td>";
					tbl += 		"<td id='um"+v.codigo+"'>"+dataMat.LT_DETALLE[0].MEINS+"</td>";
					console.log();
					if(data.idProgramaAplicacion != 3) {
						tbl += 		"<td  class='dosis100' id='"+v.codigo+"'>"+formatNumber2(v.dosis_100)+"</td>";
					}
					tbl += 		"<td>"+formatNumber2(v.dosis_has)+"</td>";
					if(data.idProgramaAplicacion != 3) {
						tbl += 		"<td id='dosisHas"+v.codigo+"'>"+formatNumber2(v.dosis_has)+"</td>";
					} else {
						if(arrayConfirmacion.codigo > 0){
							tbl += 		"<td>"+formatNumber2(v.dosis_has)+"</td>";
						} else {
							tbl += 		"<td> <input onchange='calcularDosisHas();' type='text' class='form-control dosisHas' value='"+formatNumber2(v.dosis_has)+"' id='RealdosisHas"+v.codigo+"'></td>";
						}
					}
					var dev = canridadRetirada - v.cantidad;
					traspasoReserva[v.codigo] = canridadRetirada;
					console.log(v);
					tbl += 		"<td id='cantidad"+v.codigo+"'>"+formatNumber2(v.cantidad)+"</td>";	
					if(arrayConfirmacion.codigo > 0){
						tbl += 		"<td>"+formatNumber2(v.cantidad_real)+"</td>";
						tbl += 		"<td>"+formatNumber2(canridadRetirada)+"</td>";	
						tbl += 		"<td>"+formatNumber2(v.devolucion)+"</td>";
						tbl += 		"<td>"+formatNumber2(v.diferencia)+"</td>";
						
					} else {
						tbl += 		"<td id='cantidadreal"+v.codigo+"'>"+formatNumber2(v.cantidad)+"</td>";
						tbl += 		"<td id='cantidadret"+v.codigo+"'>"+formatNumber2(canridadRetirada)+"</td>";	
						tbl += 		"<td><input type='text' class='form-control devolucion' id='devolucion"+v.codigo+"' value='"+formatNumber2(dev)+"' onchange='calcularDif("+v.codigo+")'></td>";
						tbl += 		"<td><input type='text' class='form-control diferencia' id='diferencia"+v.codigo+"' disabled value='0'></td>";
					}					
					tbl += 		"<td style='display:none' id='almacen"+v.codigo+"'>"+arrayAlmacen[dataMat.LT_DETALLE[0].MATKL]+"</td>";
					tbl += 		"<td>"+formatNumber2(v.dosis_bombada)+"</td>";
					tbl += "</tr>";
					$('#tblMateriales').append(tbl);
					arrayMat.push(v.codigo);
				});
			});
		});
		var cMaqq = 0;
		//console.log(data.lista_maquinaria);
		$.each(data.lista_maquinaria, function(k, v){			
			tbl = "";
			tbl += "<tr>";
			tbl += "<td><select  class='form-control input-sm' disabled>";
			$.each(arrayMaquinaria, function(key, val){
				if(val.EQUICATGRY == 'T'){
					if(v.maquinaria == val.EQUIPMENT) {
						tbl += "<option value='"+val.EQUIPMENT+"' selected>"+val.DESCRIPT+"</option>";
					} else {
						tbl += "<option value='"+val.EQUIPMENT+"' >"+val.DESCRIPT+"</option>";
					}
				}
			});
			tbl += "</select></td>";
			tbl += "<td><select  class='form-control input-sm' disabled>";
			$.each(arrayMaquinaria, function(key, val){
				if(val.EQUICATGRY == 'A'){
					if(v.implemento == val.EQUIPMENT) {
						tbl += "<option value='"+val.EQUIPMENT+"' selected>"+val.DESCRIPT+"</option>";
					} else {
						tbl += "<option value='"+val.EQUIPMENT+"' >"+val.DESCRIPT+"</option>";
					}
				}
			});
			tbl += "</select></td>";
			tbl += "<td>";
			tbl += "<select id='cambio_tractor"+cMaqq+"' style='width:180px'  class='form-control input-sm' disabled>";
			tbl += "<option value='1'>Primera</option>";
			tbl += "<option value='2'>Segunda</option>";
			tbl += "<option value='3'>Tercera</option>";
			tbl += "<option value='4'>Cuarta</option>";
			tbl += "<option value='5'>Quinta</option>";
			tbl += "<option value='6'>No Aplica</option>";
			tbl += "<option value='7'>Segun instrucción adjunta</option>";						
			tbl += "</select>";
			tbl += '</td>';
			tbl += "</td>";		
			tbl += "<td>";
			tbl += "<select id='marcha_tractor"+cMaqq+"' style='width:150px'  class='form-control input-sm' disabled>";
			tbl += "<option value='1'>Lenta</option>";
			tbl += "<option value='2'>Media</option>";
			tbl += "<option value='3'>Rapida</option>";
			tbl += "<option value='6'>No Aplica</option>";
			tbl += "<option value='7'>Segun instrucción adjunta</option>";						
			tbl += "</select>";
			tbl += '</td>';
			tbl += "<td>";
			tbl += '<input type="text" style="width:150px" name="valocidad" value="'+v.velocidad+'" class="form-control" id="valocidad'+cMaqq+'" disabled>';
			tbl += '</td>';
			tbl += "<td>";
			tbl += '<input type="text" style="width:150px" name="presion_bomba" value="'+v.presion+'" class="form-control" id="presion_bomba'+cMaqq+'" disabled>';
			tbl += '</td>';
			tbl += "<td>";
			tbl += "<select id='responsable"+cMaqq+"' style='width:150px'  class='form-control input-sm' disabled>";	
			$.each(arrayOperador, function(key, val){
				tbl += "<option value='"+val.idTrabajador+"'>"+val.nombre+"</option>";
				//$('#nombre_aplicador').append($('<option>', {value: v.codigo, text: v.nombre + " "+v.apellido_paterno}));
			})
			tbl += "</select>";
			tbl += '</td>';
			tbl += "</tr>";
			$('#tblMaquinaria').append(tbl);
			arrayMaq.push(v.codigo);
			$("#cambio_tractor"+cMaqq).val(v.cambio);
			$("#marcha_tractor"+cMaqq).val(v.marcha);
			$("#responsable"+cMaqq).val(v.responsable);
			cMaqq++;
		})
		
		var hoy = new Date();
		$('#fecha_viable').val(sumarDias(hoy,maxCarencia));
		var total = 0;
		$.each(data.lista_cuarteles, function(k, v){
			console.log(v);
			if(v.estado != '' ) {
				var fechaInicio = new Date(v.fechaEstimadaCosecha);
				
				var diff = fechaInicio - hoy;
				diff = diff/(1000*60*60*24);
				var diasACosecha = 0;
				var tbl = "";
				tbl += "<tr>";
				tbl += 		"<td>"+v.nVariedad+"</td>";
				tbl += 		"<td id='nomCuartel"+v.codigo+"'>"+v.nCuartel+"</td>";			
				tbl += 		"<td>"+formatNumber(v.has)+"</td>";
				if(arrayConfirmacion.codigo > 0){
					tbl +=		"<td><input type='number' disabled class='form-control hasReal decimal' value='"+v.has_real+"' onchange='validaMaxHas(this.id)' max='"+v.max+"' min='0' name='hecCuartel' id='hecCuartel"+v.codigo+"'></td>" ;
				} else {
					tbl +=		"<td><input type='hidden' id='prod"+v.codigo+"' value='"+v.tipo+"'><input type='number' class='form-control hasReal decimal' value='"+v.has+"' onchange='validaMaxHas(this.id)' max='"+v.max+"' min='0' name='hecCuartel' id='hecCuartel"+v.codigo+"'></td>" ;
					
				}
				tbl += 		"<td id='por"+v.codigo+"'></td>";
				tbl += 		"<td>"+orderFecha(v.fechaEstimadaCosecha)+"</td>";
				tbl += 		"<td>"+parseInt(diff)+"</td>";
				tbl += 		"<td id='ceco"+v.codigo+"'>"+v.ceco+"</td>";
				tbl += "</tr>";
				total += parseFloat(v.has);
				$('#tblCuartel').append(tbl);
				arrayCua.push(v.codigo);
				countCuartel++;
			}
		})
		has = total;
		tbl = "";
		tbl += "<tr>";
		tbl += 		"<td></td>";
		tbl += 		"<th>Total</th>";			
		tbl += 		"<td>"+formatNumber2(total)+"</td>";
		tbl += 		"<td id='total'>"+formatNumber2(total)+"</td>";
		tbl += 		"<td id='totalC'></td>";
		tbl += 		"<td></td>";
		tbl += 		"<td></td>";
		tbl += 		"<td></td>";
		tbl += "</tr>";
		var mojamiento_total = 0;
		if(arrayConfirmacion.codigo > 0){
			var mojamiento_total = total * parseFloat(data.mojamiento_real);
			$("#mojamientoReal").val(formatNumber2(data.mojamiento_real));
		} else {
			var mojamiento_total = total * parseFloat(data.mojamiento);
			$("#mojamientoReal").val(formatNumber2(data.mojamiento));
		}
		
		$("#mojamientoTotal").val(formatNumber2(mojamiento_total));
		$('#tblCuartel').append(tbl);
		calcularTotal();
		$("#loading").hide();
	});
	
	console.log(arrayConfirmacion.codigo);
	if(arrayConfirmacion.codigo > 0){
		$("#fecha_inicio").val(formatFecha(arrayConfirmacion.fecha_inicio));
		$("#fecha_inicio").attr("disabled",true);
		$("#hora_inicio").val(arrayConfirmacion.hora_inicio);
		$("#hora_inicio").attr("disabled",true);
		$("#fecha_termino").val(formatFecha(arrayConfirmacion.fecha_termino));
		$("#fecha_termino").attr("disabled",true);
		$("#hora_termino").val(arrayConfirmacion.hora_termino);
		$("#hora_termino").attr("disabled",true);
		$("#orientacion_viento").val(arrayConfirmacion.orientacion_viento);
		$("#orientacion_viento").attr("disabled",true);
		$("#velocidad_viento").val(arrayConfirmacion.velocidad_viento);
		$("#velocidad_viento").attr("disabled",true);
		$("#temperatura").val(arrayConfirmacion.temperatura);
		$("#temperatura").attr("disabled",true);
		$("#mojamientoReal").val(arrayConfirmacion.temperatura);
		$("#mojamientoReal").attr("disabled",true);
		$("#mojamientoTotal").attr("disabled",true);
		$("#divGuardar").hide();
		$("#addMaq").hide();
	}
	


}

$("#mojamientoTotal").change(function(){
	var mojamientoTotal = parseNumericFloat($(this).val());
	console.log(mojamientoTotal);
	var mojamientoHas = mojamientoTotal / has;
	console.log(mojamientoHas);
	console.log(formatNumber2(mojamientoHas));
	$("#mojamientoReal").val(formatNumber2(mojamientoHas)).trigger("change");
	$("#mojamientoTotal").val(formatNumber2(mojamientoTotal));
});

function parseNumericFloat(value){
	value = value.replace(".","");
	value = value.replace(",",".");
	return parseFloat(value);
}

var countCuartel = 0;

function validaMaxHas(id){
	var v = parseFloat($('#'+id).val());
	var m = parseFloat($('#'+id).attr('max'));
	//var min = parseFloat($('#'+id).attr('min'));
	if(v > m) {
		alerta("No puede agregar mas hectareas de las que posee el cuartel");
		$('#'+id).val(m);
	}
	if(v < 0 || $('#'+id).val() == ''){
		alerta("No puede ingresar número menor que 0");
		$('#'+id).val(0);
	}
	if(v == 0){
		var idr = id.replace("hecCuartel","");
		$("#por"+idr).html(0);
	}
	calcularTotal();
}



$("#mojamientoReal").change(function(){
	var mojamiento = $("#mojamientoReal").val().replace(".","").replace(",",".");
	
	$('.dosis100').each(function(index,element){
		var id = element.id;
		console.log(id);
		console.log($('#'+id).html());
		var dosiscien = $('#'+id).html().replace(".", "");
		console.log(dosiscien);
		dosiscien = dosiscien.replace(",", ".");
		console.log(dosiscien);
		dosiscien = parseFloat(dosiscien);
		console.log(dosiscien);
		var dosishas = (parseFloat(mojamiento)/100) * dosiscien;
		console.log(dosishas);
		$('#dosisHas'+id).html(formatNumber2(dosishas));
		if($("#um"+id).html() == 'G'){
			var total = parseFloat(dosishas) * parseFloat(has) ;
		} else {
			var total = parseFloat(dosishas) * parseFloat(has) /1000;
		}
		
		console.log(total);
		$('#cantidadreal'+id).html(total.toFixed(3).replace(".", ","));
		var dev = parseFloat($("#cantidadret"+id).html().replace(".","").replace(",",".")) - total;
		console.log(dev);
		$('#devolucion'+id).val(formatNumber2(dev));
		$('#diferencia'+id).val(0);
	});
	if(idPrograma != 3){
		var mojamientoTotal = parseFloat(mojamiento) * has;
		$("#mojamientoReal").val(formatNumber2(mojamiento));
		$("#mojamientoTotal").val(formatNumber2(mojamientoTotal));
	} else {
		calcularDosisHas();
	}
	
});


function calcularDosisHas(){
	console.log(traspasoReserva);
	$('.dosisHas').each(function(index,element){
		var id         = element.id;
		console.log(id);
		var idH        = element.id.split("dosisHas");
		console.log(idH);
		var dosishas   = parseFloat($('#RealdosisHas'+idH[1]).val().replace(".", "").replace(",", "."));
		//dosishas = dosishas.toFixed(3);
		console.log(dosishas);
		var total      = parseFloat($('#total').html().replace(",", "."));
		console.log(total);
		var dosisTotal = dosishas * total; 
		console.log(dosisTotal);
		$('#cantidadreal'+idH[1]).html(formatNumber2(dosisTotal));
		console.log(traspasoReserva[idH[1]]);
		var devolucion = traspasoReserva[idH[1]] - dosisTotal;
		$('#devolucion'+idH[1]).val(formatNumber2(devolucion));
		$("#RealdosisHas"+idH[1]).val(formatNumber2(dosishas));
		//console.log("devolucion:"+ devolucion);
	})
}



function calcularTotal(){
	var total = 0;
	var cx    = 0;
	countCuartel = 0;
	$('.hasReal').each(function(index,element){
		var id = element.id;
		total += parseFloat(element.value);
		var value = parseFloat(element.value).toFixed(2);
		$('#'+id).val(value);
		if(value > 0){
			countCuartel++;
		}
	});
	var tPorc = 0;
	var totalC = 0;
	$('.hasReal').each(function(index,element){
		cx++;
		var id = element.id.split("hecCuartel");
		var value = parseFloat(element.value).toFixed(2);
		var porcentaje = parseFloat(value/total*100).toFixed(2);
		if(value > 0){
			if(cx != countCuartel){
				$("#por"+id[1]).text(porcentaje);
			} else {
				var p = 100 - tPorc;
				$("#por"+id[1]).text((p).toFixed(2));
				totalC = tPorc + p;
			}
			var xx = parseFloat(value/total*100);
			tPorc += xx;
		}
	});
	has = parseFloat(total);
	$('#total').html(formatNumber2(total));
	$("#mojamientoReal").trigger("change");
	$("#totalC").html(parseInt(totalC));
}

function sumarDias(fecha, dias){
	console.log(fecha);
	fecha.setDate(fecha.getDate() + dias);
	dia = fecha.getDate();
    mes = fecha.getMonth()+1;
    if(mes < 10){
    	mes = "0" + mes;
    }
    if(dia < 10){
    	dia = "0" + dia;
    }
    anho = fecha.getFullYear();
	return dia+"/"+mes+"/"+anho;
}

function orderFecha(fecha){
	var newFecha = fecha.split("-");
	newFecha = newFecha[2]+"-"+newFecha[1]+"-"+newFecha[0];
	return newFecha;
}

function calcularDev(id){
	var devolucion = parseFloat($('#cantidadret'+id).html()) - parseFloat($('#cantidadreal'+id).html());
	if(devolucion < 0){	
		alerta("Cantidad real no puede ser aplicada no puede ser mayor a la cantidad retirada.");
		$('#cantidadreal'+id).val($('#cantidad'+id).html());
		return
	}
	
	$('#devolucion'+id).val(formatNumber2(devolucion));
}

function calcularDif(id){
	var devt = $('#devolucion'+id).val().replace('.','');
	var cantRet = $('#cantidadret'+id).html().replace('.','');
	var cantReal = $('#cantidadreal'+id).html().replace('.','');
	var devolucion = parseFloat(cantRet.replace(',','.')) - parseFloat(cantReal.replace(',','.'));
	var dev = parseFloat(devt.replace(',','.'));
	var diferencia = parseFloat(cantRet.replace(',','.')) - (parseFloat(cantReal.replace(',','.')) + dev);
	if(diferencia < 0){	
		alerta("La diferencia no puede ser menos a 0.");
		$('#devolucion'+id).val(formatNumber2(devolucion));
		return
	}
	var cantidadReal = parseFloat(cantReal);
	var validacion = cantidadReal * 10 /100;
	if(diferencia > validacion) {
		alerta("Diferencia de consumo supera el 10% del cantidad real aplicada");
	}
	$('#diferencia'+id).val(formatNumber2(diferencia));
	$('#devolucion'+id).val(formatNumber2(dev))
	
}


var cMaq = 1;
function addMaquinaria(){
	console.log(arrayMaquinaria);
	var tr  = "<tr id='tr"+cMaq+"'>";
	    tr += "<td><select id='maquinarias"+cMaq+"' style='width:150px'  class='form-control input-sm'>";		
		$.each(arrayMaquinaria, function(key, val){
			if(val.EQUICATGRY == 'T'){
				console.log(val);
				tr += "<option value='"+val.EQUIPMENT+"'>"+val.DESCRIPT+"</option>";
			}
		});
	    tr += "</select>";
		tr += "</td>";
		tr += "<td>";
		tr += "<select id='implementos"+cMaq+"'  style='width:150px' class='form-control input-sm'>";
		$.each(arrayMaquinaria, function(key, val){
			if(val.EQUICATGRY == 'A'){
				tr += "<option value='"+val.EQUIPMENT+"'>"+val.DESCRIPT+"</option>";
			}
		});
		tr += "</select>";
		tr += "</td>";		
		tr += "<td>";
		tr += "<select id='cambio_tractor"+cMaq+"' style='width:180px'  class='form-control input-sm'>";
		tr += "<option value='1'>Primera</option>";
		tr += "<option value='2'>Segunda</option>";
		tr += "<option value='3'>Tercera</option>";
		tr += "<option value='4'>Cuarta</option>";
		tr += "<option value='5'>Quinta</option>";
		tr += "<option value='6'>No Aplica</option>";
		tr += "<option value='7'>Segun instrucción adjunta</option>";						
		tr += "</select>";
		tr += '</td>';
		tr += "</td>";		
		tr += "<td>";
		tr += "<select id='marcha_tractor"+cMaq+"' style='width:150px'  class='form-control input-sm'>";
		tr += "<option value='1'>Lenta</option>";
		tr += "<option value='2'>Media</option>";
		tr += "<option value='3'>Rapida</option>";
		tr += "<option value='6'>No Aplica</option>";
		tr += "<option value='7'>Segun instrucción adjunta</option>";						
		tr += "</select>";
		tr += '</td>';
		tr += "<td>";
		tr += '<input type="text" style="width:150px" name="valocidad" class="form-control" id="valocidad'+cMaq+'">';
		tr += '</td>';
		tr += "<td>";
		tr += '<input type="text" style="width:150px" name="presion_bomba" class="form-control" id="presion_bomba'+cMaq+'">';
		tr += '</td>';
		tr += "<td>";
		tr += "<select id='responsable"+cMaq+"' style='width:150px'  class='form-control input-sm'>";	
		$.each(arrayOperador, function(key, val){
			tr += "<option value='"+val.idTrabajador+"'>"+val.nombre+"</option>";
			//$('#nombre_aplicador').append($('<option>', {value: v.codigo, text: v.nombre + " "+v.apellido_paterno}));
		})
		tr += "</select>";
		tr += '</td>';
		tr += 	'<td>';
		tr += 		'<a onclick="descartarCuartel('+cMaq+');">';
		tr +=			'<i class="fa fa-minus">';
		tr +=		'</a>';
		tr += '</td>';
		tr += "</tr>";
		console.log(tr);
		$('#tbl_Maquinaria').append(tr);
		$('.form-control2.input-sm2').select2({
			multiple: false,
			placeholder: "Seleccionar",
			width: "380px"
		});
		contMaq.push(cMaq);
		console.log(contMaq);
		cMaq++;
}
function descartarCuartel(c){
	contMaq[c] = '';
	$('#tr'+c).remove();
	console.log(contMaq);
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
	if(fechaSelect > hoy){
		alerta("La fecha seleccionada no puede ser mayor a la actual");
		$('#'+id).val(formatFecha(h));
		return;
	}
}
function valFechaTermino(){
	var val = $('#fecha_inicio').val();
	var val2 = $('#fecha_termino').val();
	var fechaSelect = val.split("-");
	var fechaSelect2 = val2.split("-");
	var h = hoy;
	fechaSelect = new Date(fechaSelect[2], fechaSelect[1], fechaSelect[0]);
	fechaSelect2 = new Date(fechaSelect2[2], fechaSelect2[1], fechaSelect2[0]);
	var hoy = dateHoy();
	hoy = hoy.split("-");
	hoy = new Date(hoy[0], hoy[1], hoy[2]);
	if(fechaSelect > fechaSelect2){
		alerta("La fecha de término no puede ser menor a la de inicio");
		$('#fecha_termino').val("");
		return;
	}
	if(fechaSelect2 > hoy){
		alerta("La fecha seleccionada no puede ser mayor a la actual");
		$('#fecha_termino').val("");
		return;
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
