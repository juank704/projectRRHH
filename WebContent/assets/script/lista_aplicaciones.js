
var dataTable = $('#tbl_RendimientoVlidadr').DataTable({
	dom: 'Bfrtip',
    buttons: [
        'excel', 'pdf'
    ],
	"sPaginationType": "full_numbers" ,
	"filter": false,
	//"ordering": true,
	 "order": [[ 0, "desc" ]]
	
});
var arrayCambio = ['','Primera','Segunda','Tercera','Cuarta','Quinta','No Aplica','Segun instrucción adjunta'];
var arrayMarcha = ['','Lenta','Media','Rápida','','','No Aplica','Segun instrucción adjunta'];
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
function cargaData(){
	dataListaOrdenes = [];
	$.ajax({
		url: "/simpleWeb/json/AGRO/LISTA_APLICACIONES_GETLISTA/",
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
}
cargaData();


function loadInfo(){
	dataTable.clear().draw();
	console.log(dataListaOrdenes);
	$.each(dataListaOrdenes, function(k,v){
		console.log($('#dataHuerto').val());
		if(v.codCampo == $('#dataHuerto').val()){
			var boton = "";
			if(v.estado == 'Pendiente Devolución' ||  v.estado == 'Cerrada' ){
				boton = "<button   title='ver' id='ver"+v.numero_orden+"' onclick='ver("+v.codigo+")' class='btn yellow btn-outline btn-sm' ><i class='icon-magnifier'></i></button>" ;
				boton += "<button  title='Orden' id='pdf"+v.numero_orden+"' onclick='doc("+v.numero_orden+")' class='btn blue btn-outline btn-sm' ><i class='fa fa-file-pdf-o'></i></button>" ;
				boton += "<button  title='Confirmación' id='pdf"+v.numero_orden+"' onclick='docConfirm("+v.numero_orden+")' class='btn green-dark btn-outline btn-sm' ><i class='fa fa-file-pdf-o'></i></button>" ;
			}
			if(v.estado == 'Rechazado Pendiente Devolución' || v.estado == 'Rechazado'){
				//boton = "<button   title='ver' id='ver"+v.numero_orden+"' onclick='ver("+v.codigo+")' class='btn yellow btn-outline btn-sm' ><i class='icon-magnifier'></i></button>" ;
				//boton += "<button  title='Orden' id='pdf"+v.numero_orden+"' onclick='doc("+v.numero_orden+")' class='btn blue btn-outline btn-sm' ><i class='fa fa-print'></i></button>" ;
				//boton += "<button  title='Confirmación' id='pdf"+v.numero_orden+"' onclick='docConfirm("+v.numero_orden+")' class='btn green-dark btn-outline btn-sm' ><i class='fa fa-print'></i></button>" ;
			}
			if(v.estado == 'Emitida'){
				if(v.idPrograma > 0){
					boton = "<button   title='Editar' id='edit"+v.numero_orden+"' onclick='edit("+v.numero_orden+")' class='btn yellow btn-outline btn-sm' ><i class='fa fa-pencil-square-o fa-lg'></i></button>" ;
				} else {
					boton = "<button   title='Editar' id='edit"+v.numero_orden+"' onclick='editC("+v.numero_orden+")' class='btn yellow btn-outline btn-sm' ><i class='fa fa-pencil-square-o fa-lg'></i></button>" ;
				}
				boton += "<button   title='Confirmar' id='conf"+v.numero_orden+"' onclick='confirm("+v.codigo+")' class='btn green-dark btn-outline btn-sm' ><i class='fa fa-check-square-o fa-lg'></i></button>";
				boton += "<button   title='Rechazar'  id='rech"+v.numero_orden+"' onclick='confirmRechazar("+v.numero_orden+","+v.idorden+","+v.idPrograma+","+v.nreserva+","+v.solped+")' class='btn red btn-outline btn-sm' ><i class='fa fa-close fa-lg'></i></button>";
				boton += "<button   title='Ver' id='pdf"+v.numero_orden+"' onclick='doc("+v.numero_orden+")' class='btn blue btn-outline btn-sm' ><i class='fa fa-file-pdf-o'></i></button>" ;
			}
			var idPrograma = 'FP';
			if(v.idPrograma > 0){
				idPrograma = v.idPrograma;
			}
			var tbl = [v.idorden,idPrograma,v.nreserva,v.campo,v.nombre_aplicador,formatFecha(v.fecha_estimada_aplicacion),v.estado_fenologico,
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
	/*var sectorFilter = "<option value='0'>Todos</option>";
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
	$("#sectorFilter").html(sectorFilter);*/
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

function ver(e){
	window.open("detalle_aplicacion#"+e, '_blank');
}

function edit(x){
	
	window.location.href = ("ordenDosificacion#"+x);
	
}
function editC(x){
	
	window.open("orden_contingencia_edi#"+x, '_blank');
	
}
function printPdf(){
	console.log("print");
	window.print();
}

function confirmRechazar(id,ido,idP,reserva,solped){
	var c = confirmar.confirm("¿Seguro desea rechazar?");
	var mensaje = "";
	$(c.aceptar).click(function(){
		console.log("/simpleWeb/json/AGRO/RECPF/"+id);
		var arrayListMatrial = [];
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
				if(dataTraspasoReserva.T_SALIDA.length > 0){
					var confirmAplicacion = {};
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
				console.log(confirmAplicacion);
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
					mensaje += "La Orden "+ido+" ha sido rechazado con éxito";
					alerta(mensaje);
					$('.swal2-confirm').click(function(){
						cargaData();
						loadInfo();
						closeModal();
					})
				}
			})
			
			
		//});
		
	});
}
function doc(id){
	$("#loading").show();
	var content = "";
	var arrayDetalle = [];
	setTimeout(function(){
		console.log("/simpleWeb/json/AGRO/LISTA_ORDEN_DETALLE/"+id);
		$.ajax({
			url: "/simpleWeb/json/AGRO/LISTA_ORDEN_DETALLE/"+id,
			type:	"GET",
	//		data : JSON.stringify(row),
			dataType: 'json',
			async: false,
			success: function(data){
				console.log(data)
				arrayDetalle = data;
			}
		})
		var nombre = "OA_"+arrayDetalle.campo+"_"+arrayDetalle.codigo;
//		console.log(arrayDetalle);
//		$("#norden").html(arrayDetalle.codigo);
//		$("#nprograma").html("TIPO PROGRAMA N°"+arrayDetalle.idPrograma+" "+arrayDetalle.programa_aplicacion);
//		$("#jefeAplicacion").html(arrayDetalle.adm_campo);
//		$("#aplicador").html(arrayDetalle.jefe_aplicacion);
//		$("#campo").html(arrayDetalle.campo);
//		$("#fechaEstimada").html(formatFecha(arrayDetalle.fecha_estimada_aplicacion));
//		$("#fechaInicio").html(formatFecha(arrayDetalle.fecha_estimada_aplicacion));
//		$("#forma").html(arrayDetalle.nforma_aplicacion);
//		$("#detalleCuartel").empty();		
//		$("#detalleVariedad").empty();
//		$("#detalleMaterial").empty();
//		$("#detalleEquipo").empty();
//		
//		var maxCarencia = 0;
//		var maxhr 		= 0;
//		var hoy = new Date();
//		$.each(arrayDetalle.lista_materiales, function(k,v){
//			console.log(v);
//			var dataMat = [];
//			$.ajax({
//				url: IPSERVERSAP + "JSON_ZMOV_10020.aspx?MATERIAL="+v.codigo_material,
//				type:	"GET",
//	//			data : JSON.stringify(row),
//				dataType: 'json',
//				async: false,
//				success: function(data){
//					dataMat = data;
//				}
//			})
//			
//	
//			if(maxCarencia < parseInt(dataMat.LT_DETALLE[0].CARENCIA)){
//				maxCarencia = dataMat.LT_DETALLE[0].CARENCIA;
//			}
//			
//			if(maxhr < parseInt(dataMat.LT_DETALLE[0].REINGRESO)){
//				maxhr = dataMat.LT_DETALLE[0].REINGRESO
//			}
//			
//			
//			
//			var td = "";
//			td += "<tr>";
//			td += "<td>"+dataMat.LT_DETALLE[0].MAKTX+"</td>";
//			td += "<td>"+dataMat.LT_DETALLE[0].IACTIVO+"</td>";
//			td += "<td>"+formatNumber2(v.dosis_100)+"</td>";
//			td += "<td>"+formatNumber2(v.dosis_has)+"</td>";
//			td += "<td>"+formatNumber2(v.dosis_bombada)+"</td>";
//			td += "<td>"+formatNumber2(arrayDetalle.capacidad_maquina)+"</td>";
//			td += "<td>"+arrayDetalle.tipo_control+"</td>";
//			td += "<td>0</td>";
//			td += "<td>"+formatNumber2(v.cantidad)+"</td>";
//			td += "<td>"+dataMat.LT_DETALLE[0].MEINS+"</td>";
//			td += "</tr>";
//			$("#detalleMaterial").append(td);
//		});
//		var arrayVariedas = [];
//		var total = 0;
//		$.each(arrayDetalle.lista_cuarteles, function(k,v){
//			if(v.estado == 'checked') {
//				var td = "";
//				td += "<tr>";
//				td += "<td>"+v.nCuartel+"</td>";
//				td += "<td>"+v.has+"</td>";
//				td += "<td>"+v.nVariedad+"</td>";
//				td += "<td>"+arrayDetalle.estado_fenologico+"</td>";
//				td += "<td>"+formatNumber2(arrayDetalle.mojamiento)+"</td>";
//				td += "</tr>";
//				$("#detalleCuartel").append(td);
//				
//				total += parseFloat(v.has);
//				
//				if(arrayVariedas.indexOf(v.nVariedad) == -1){
//					arrayVariedas.push(v.nVariedad);
//					var fechaInicio = new Date(v.fechaEstimadaCosecha);
//					
//					var diff = fechaInicio - hoy;
//					diff = diff/(1000*60*60*24);
//					var tdv = "";
//					tdv += "<tr>";
//					tdv += "<td>"+v.nVariedad+"</td>";
//					tdv += "<td>"+formatFecha(v.fechaEstimadaCosecha)+"</td>";
//					tdv += "<td>"+formatFecha(arrayDetalle.fecha_viable)+"</td>";
//					tdv += "<td>"+parseInt(diff)+"</td>";
//					tdv += "<td>"+parseInt(maxCarencia)+"</td>";
//					tdv += "<td>"+arrayDetalle.mercado+"</td>";
//					tdv += "<td>"+parseInt(maxhr)+"</td>";
//					tdv += "</tr>";
//					$("#detalleVariedad").append(tdv);
//				}
//			}
//			
//		});
//		var td;
//		td += "<tr>";
//		td += "<td>Total</td>";
//		td += "<td>"+formatNumber2(total)+"</td>";
//		td += "<td></td>";
//		td += "<td></td>";
//		td += "<td></td>";
//		td += "</tr>";
//		$("#detalleCuartel").append(td);
//		
//		
//		$.each(arrayDetalle.lista_maquinaria, function(k, v){
//			console.log(v);
//			var tdmq = "";
//			tdmq += "<tr>";
//			tdmq += "<td>"+v.nresponsable+"</td>";
//			tdmq += "<td>"+arrayMaquinaria[v.maquinaria]+"</td>";
//			tdmq += "<td>"+arrayMaquinaria[v.implemento]+"</td>";
//			tdmq += "<td>"+arrayCambio[v.marcha]+"</td>";
//			tdmq += "<td>"+arrayMarcha[v.marcha]+"</td>";
//			tdmq += "<td>"+v.presion+"</td>";
//			tdmq += "<td>"+v.velocidad+"</td>";
//			tdmq += "</tr>";
//			$("#detalleEquipo").append(tdmq);
//		});
//		
//		$("#observacion").html(arrayDetalle.observacion);
		//console.log($("#jspdf").html());
		var urlPdf = "http://200.68.4.145/qas/dompdf/crearPdfSclem.php";
		console.log(JSON.stringify(arrayDetalle));
		$.ajax({
			url: urlPdf,
			type:	"POST",
			data : { NOMBRE: nombre, DATA: JSON.stringify(arrayDetalle) },
			dataType: 'json',
			async: false,
			success: function(data){
				console.log(data);
				
			}
		})
		setTimeout(function(){
			window.open("http://200.68.4.145/qas/dompdf/dowloadpdfSclem.php?NOMBRE="+nombre);
			$("#loading").hide();
		},1000);
		
		
		
		//popUp("", $("#jspdf").html(), true, '1800px', true);
		//$(".swal2-content").addClass("div2");
		//$('.swal2-shown').css("background-color","#fff !important;");
		
	},500);
//	var docs = new jsPDF('L','mm','A4');
//	var specialElementHandlers  = {
//		'#ignore': function (element, renderer) {
//			return true;
//		},
//		'#ignore_2': function (element, renderer) {
//			return true;
//		}
//	};
//	
//	docs.fromHTML($('#jspdf').html(), 15, 15,{
//		'width': 180,
//		'elementHandlers': specialElementHandlers 
//	});
//	docs.output("datauri");
//	docs.save('programa_'+arrayDetalle.codigo+'.pdf')
}
function docConfirm(id){
	$("#loading").show();
	var content = "";
	var arrayDetalle = [];
	setTimeout(function(){
		console.log("/simpleWeb/json/AGRO/LISTA_ORDEN_DETALLE/"+id);
		$.ajax({
			url: "/simpleWeb/json/AGRO/LISTA_ORDEN_DETALLE2/"+id,
			type:	"GET",
	//		data : JSON.stringify(row),
			dataType: 'json',
			async: false,
			success: function(data){
				console.log(JSON.stringify(data));
				arrayDetalle = data;
			}
		})
		getMaquinaria(arrayDetalle.codCampo);
		console.log(arrayDetalle);
		$("#nordenC").html(arrayDetalle.codigo);
		$("#nprogramaC").html("TIPO PROGRAMA N°"+arrayDetalle.idPrograma+" "+arrayDetalle.programa_aplicacion);
		$("#jefeAplicacionC").html(arrayDetalle.adm_campo);
		$("#aplicadorC").html(arrayDetalle.jefe_aplicacion);
		$("#campoC").html(arrayDetalle.campo);
		$("#fechaEstimadaC").html(formatFecha(arrayDetalle.fecha_estimada_aplicacion));
		$("#fechaInicioC").html(formatFecha(arrayDetalle.fecha_estimada_aplicacion));
		$("#formaC").html(arrayDetalle.forma_aplicacion);
		$("#detalleCuartelC").empty();
		var nombre = "OA_"+arrayDetalle.campo+"_"+arrayDetalle.codigo;
//		$("#detalleVariedadC").empty();
//		$("#detalleMaterialC").empty();
//		$("#detalleEquipoC").empty();
//		var maxCarencia = 0;
//		var maxhr 		= 0;
//		var hoy = new Date();
//		$.each(arrayDetalle.lista_materiales, function(k,v){
//			console.log(v);
//			var dataMat = [];
//			$.ajax({
//				url: IPSERVERSAP + "JSON_ZMOV_10020.aspx?MATERIAL="+v.codigo_material,
//				type:	"GET",
//	//			data : JSON.stringify(row),
//				dataType: 'json',
//				async: false,
//				success: function(data){
//					dataMat = data;
//				}
//			})
//			
//	
//			if(maxCarencia < parseInt(dataMat.LT_DETALLE[0].CARENCIA)){
//				maxCarencia = dataMat.LT_DETALLE[0].CARENCIA;
//			}
//			
//			if(maxhr < parseInt(dataMat.LT_DETALLE[0].REINGRESO)){
//				maxhr = dataMat.LT_DETALLE[0].REINGRESO
//			}
//			
//			
//			
//			var td = "";
//			td += "<tr>";
//			td += "<td>"+dataMat.LT_DETALLE[0].MAKTX+"</td>";
//			td += "<td>"+dataMat.LT_DETALLE[0].IACTIVO+"</td>";
//			td += "<td>"+formatNumber2(v.dosis_100)+"</td>";
//			td += "<td>"+formatNumber2(v.dosis_has)+"</td>";
//			td += "<td>"+formatNumber2(v.dosis_bombada)+"</td>";
//			td += "<td>"+formatNumber2(arrayDetalle.capacidad_maquina)+"</td>";
//			td += "<td>"+arrayDetalle.tipo_control+"</td>";
//			td += "<td>0</td>";
//			td += "<td>"+formatNumber2(v.cantidad)+"</td>";
//			td += "<td>"+dataMat.LT_DETALLE[0].MEINS+"</td>";
//			td += "</tr>";
//			$("#detalleMaterialC").append(td);
//		});
//		var arrayVariedas = [];
//		var total = 0;
//		$.each(arrayDetalle.lista_cuarteles, function(k,v){
//			if(v.estado == 'checked') {
//				var td = "";
//				td += "<tr>";
//				td += "<td>"+v.nCuartel+"</td>";
//				td += "<td>"+v.has_real+"</td>";
//				td += "<td>"+v.nVariedad+"</td>";
//				td += "<td>"+arrayDetalle.estado_fenologico+"</td>";
//				td += "<td>"+formatNumber2(arrayDetalle.mojamiento_real)+"</td>";
//				td += "</tr>";
//				$("#detalleCuartelC").append(td);
//				
//				total += parseFloat(v.has_real);
//				
//				if(arrayVariedas.indexOf(v.nVariedad) == -1){
//					arrayVariedas.push(v.nVariedad);
//					var fechaInicio = new Date(v.fechaEstimadaCosecha);
//					
//					var diff = fechaInicio - hoy;
//					diff = diff/(1000*60*60*24);
//					var tdv = "";
//					tdv += "<tr>";
//					tdv += "<td>"+v.nVariedad+"</td>";
//					tdv += "<td>"+formatFecha(v.fechaEstimadaCosecha)+"</td>";
//					tdv += "<td>"+formatFecha(arrayDetalle.fecha_viable)+"</td>";
//					tdv += "<td>"+parseInt(diff)+"</td>";
//					tdv += "<td>"+parseInt(maxCarencia)+"</td>";
//					tdv += "<td>"+arrayDetalle.mercado+"</td>";
//					tdv += "<td>"+parseInt(maxhr)+"</td>";
//					tdv += "</tr>";
//					$("#detalleVariedadC").append(tdv);
//				}
//			}
//			
//		});
//		console.log(arrayMaquinaria);
//		$.each(arrayDetalle.lista_maquinaria, function(k, v){
//			console.log(v);
//			var tdmq = "";
//			tdmq += "<tr>";
//			tdmq += "<td>"+v.nresponsable+"</td>";
//			tdmq += "<td>"+arrayMaquinaria[v.maquinaria]+"</td>";
//			tdmq += "<td>"+arrayMaquinaria[v.implemento]+"</td>";
//			tdmq += "<td>"+arrayCambio[v.marcha]+"</td>";
//			tdmq += "<td>"+arrayMarcha[v.marcha]+"</td>";
//			tdmq += "<td>"+v.presion+"</td>";
//			tdmq += "<td>"+v.velocidad+"</td>";
//			tdmq += "</tr>";
//			$("#detalleEquipoC").append(tdmq);
//		});
//		
//		var td;
//		td += "<tr>";
//		td += "<td>Total</td>";
//		td += "<td>"+formatNumber2(total)+"</td>";
//		td += "<td></td>";
//		td += "<td></td>";
//		td += "<td></td>";
//		td += "</tr>";
//		$("#detalleCuartelC").append(td);
//		
//		$("#observacionC").html(arrayDetalle.observacion);
		$("#loading").hide();
		console.log($("#jspdfC").html());
		var urlPdf = "http://200.68.4.145/qas/dompdf/crearPdfSclem1.php";
		console.log(urlPdf);
		$.ajax({
			url: urlPdf,
			type:	"POST",
			data : { NOMBRE: nombre, DATA: JSON.stringify(arrayDetalle) },
//			data : { NOMBRE: nombre 
//				, table1: $("#table1").html()
//				, table2: $("#table2").html()
//				, table3: $("#table3").html()
//				, table4: $("#table4").html()
//				//, table5: $("#table5").html()
//				//, table6: $("#table6").html()
//				//, table7: $("#table7").html()
//			},
			dataType: 'json',
			async: false,
			success: function(data){
				console.log(data);
				
			}
		})
		window.open("http://200.68.4.145/qas/dompdf/dowloadpdfSclem.php?NOMBRE="+nombre);
		//popUp("", $("#jspdfC").html(), true, '1800px', true);
		//$(".swal2-content").addClass("div2");
		//$('.swal2-shown').css("background-color","#fff !important;");
		
	},500);
}

function docExcel(id){
	$("#loading").show();
	var content = "";
	var arrayDetalle = [];
	setTimeout(function(){
		console.log("/simpleWeb/json/AGRO/LISTA_ORDEN_DETALLE/"+id);
		$.ajax({
			url: "/simpleWeb/json/AGRO/LISTA_ORDEN_DETALLE/"+id,
			type:	"GET",
	//		data : JSON.stringify(row),
			dataType: 'json',
			async: false,
			success: function(data){
				arrayDetalle = data;
			}
		})
		var nombre = "OA_"+arrayDetalle.campo+"_"+arrayDetalle.codigo;
		console.log(arrayDetalle);
		$("#norden").html(arrayDetalle.codigo);
		$("#nprograma").html("TIPO PROGRAMA N°"+arrayDetalle.idPrograma+" "+arrayDetalle.programa_aplicacion);
		$("#jefeAplicacion").html(arrayDetalle.adm_campo);
		$("#aplicador").html(arrayDetalle.jefe_aplicacion);
		$("#campo").html(arrayDetalle.campo);
		$("#fechaEstimada").html(formatFecha(arrayDetalle.fecha_estimada_aplicacion));
		$("#fechaInicio").html(formatFecha(arrayDetalle.fecha_estimada_aplicacion));
		$("#forma").html(arrayDetalle.nforma_aplicacion);
		$("#detalleCuartel").empty();		
		$("#detalleVariedad").empty();
		$("#detalleMaterial").empty();
		$("#detalleEquipo").empty();
		
		var maxCarencia = 0;
		var maxhr 		= 0;
		var hoy = new Date();
		$.each(arrayDetalle.lista_materiales, function(k,v){
			console.log(v);
			var dataMat = [];
			$.ajax({
				url: IPSERVERSAP + "JSON_ZMOV_10020.aspx?MATERIAL="+v.codigo_material,
				type:	"GET",
	//			data : JSON.stringify(row),
				dataType: 'json',
				async: false,
				success: function(data){
					dataMat = data;
				}
			})
			
	
			if(maxCarencia < parseInt(dataMat.LT_DETALLE[0].CARENCIA)){
				maxCarencia = dataMat.LT_DETALLE[0].CARENCIA;
			}
			
			if(maxhr < parseInt(dataMat.LT_DETALLE[0].REINGRESO)){
				maxhr = dataMat.LT_DETALLE[0].REINGRESO
			}
			
			
			
			var td = "";
			td += "<tr>";
			td += "<td>"+dataMat.LT_DETALLE[0].MAKTX+"</td>";
			td += "<td>"+dataMat.LT_DETALLE[0].IACTIVO+"</td>";
			td += "<td>"+formatNumber2(v.dosis_100)+"</td>";
			td += "<td>"+formatNumber2(v.dosis_has)+"</td>";
			td += "<td>"+formatNumber2(v.dosis_bombada)+"</td>";
			td += "<td>"+formatNumber2(arrayDetalle.capacidad_maquina)+"</td>";
			td += "<td>"+arrayDetalle.tipo_control+"</td>";
			td += "<td>0</td>";
			td += "<td>"+formatNumber2(v.cantidad)+"</td>";
			td += "<td>"+dataMat.LT_DETALLE[0].MEINS+"</td>";
			td += "</tr>";
			$("#detalleMaterial").append(td);
		});
		var arrayVariedas = [];
		var total = 0;
		$.each(arrayDetalle.lista_cuarteles, function(k,v){
			if(v.estado == 'checked') {
				var td = "";
				td += "<tr>";
				td += "<td>"+v.nCuartel+"</td>";
				td += "<td>"+v.has+"</td>";
				td += "<td>"+v.nVariedad+"</td>";
				td += "<td>"+arrayDetalle.estado_fenologico+"</td>";
				td += "<td>"+formatNumber2(arrayDetalle.mojamiento)+"</td>";
				td += "</tr>";
				$("#detalleCuartel").append(td);
				
				total += parseFloat(v.has);
				
				if(arrayVariedas.indexOf(v.nVariedad) == -1){
					arrayVariedas.push(v.nVariedad);
					var fechaInicio = new Date(v.fechaEstimadaCosecha);
					
					var diff = fechaInicio - hoy;
					diff = diff/(1000*60*60*24);
					var tdv = "";
					tdv += "<tr>";
					tdv += "<td>"+v.nVariedad+"</td>";
					tdv += "<td>"+formatFecha(v.fechaEstimadaCosecha)+"</td>";
					tdv += "<td>"+formatFecha(arrayDetalle.fecha_viable)+"</td>";
					tdv += "<td>"+parseInt(diff)+"</td>";
					tdv += "<td>"+parseInt(maxCarencia)+"</td>";
					tdv += "<td>"+arrayDetalle.mercado+"</td>";
					tdv += "<td>"+parseInt(maxhr)+"</td>";
					tdv += "</tr>";
					$("#detalleVariedad").append(tdv);
				}
			}
			
		});
		var td;
		td += "<tr>";
		td += "<td>Total</td>";
		td += "<td>"+formatNumber2(total)+"</td>";
		td += "<td></td>";
		td += "<td></td>";
		td += "<td></td>";
		td += "</tr>";
		$("#detalleCuartel").append(td);
		
		
		$.each(arrayDetalle.lista_maquinaria, function(k, v){
			console.log(v);
			var tdmq = "";
			tdmq += "<tr>";
			tdmq += "<td>"+v.nresponsable+"</td>";
			tdmq += "<td>"+arrayMaquinaria[v.maquinaria]+"</td>";
			tdmq += "<td>"+arrayMaquinaria[v.implemento]+"</td>";
			tdmq += "<td>"+arrayCambio[v.cambio]+"</td>";
			tdmq += "<td>"+arrayMarcha[v.marcha]+"</td>";
			tdmq += "<td>"+v.presion+"</td>";
			tdmq += "<td>"+v.velocidad+"</td>";
			tdmq += "</tr>";
			$("#detalleEquipo").append(tdmq);
		});
		
		$("#observacion").html(arrayDetalle.observacion);
		console.log($("#jspdf").html());
		var urlPdf = "http://200.68.4.145/qas/dompdf/crearPdfSclem.php";
		console.log(urlPdf);
		$.ajax({
			url: urlPdf,
			type:	"POST",
			data : { NOMBRE: nombre, HTML: $("#jspdf").html() },
			dataType: 'json',
			async: false,
			success: function(data){
				console.log(data);
				
			}
		})
		setTimeout(function(){
			window.open("http://200.68.4.145/qas/dompdf/dowloadpdfSclem.php?NOMBRE="+nombre);
			$("#loading").hide();
		},1000);
		
		
		
		//popUp("", $("#jspdf").html(), true, '1800px', true);
		//$(".swal2-content").addClass("div2");
		//$('.swal2-shown').css("background-color","#fff !important;");
		
	},500);
//	var docs = new jsPDF('L','mm','A4');
//	var specialElementHandlers  = {
//		'#ignore': function (element, renderer) {
//			return true;
//		},
//		'#ignore_2': function (element, renderer) {
//			return true;
//		}
//	};
//	
//	docs.fromHTML($('#jspdf').html(), 15, 15,{
//		'width': 180,
//		'elementHandlers': specialElementHandlers 
//	});
//	docs.output("datauri");
//	docs.save('programa_'+arrayDetalle.codigo+'.pdf')
}
function docConfirmExcel(id){
	$("#loading").show();
	var content = "";
	var arrayDetalle = [];
	setTimeout(function(){
		console.log("/simpleWeb/json/AGRO/LISTA_ORDEN_DETALLE/"+id);
		$.ajax({
			url: "/simpleWeb/json/AGRO/LISTA_ORDEN_DETALLE2/"+id,
			type:	"GET",
	//		data : JSON.stringify(row),
			dataType: 'json',
			async: false,
			success: function(data){
				arrayDetalle = data;
			}
		})
		getMaquinaria(arrayDetalle.codCampo);
		console.log(arrayDetalle);
		$("#nordenC").html(arrayDetalle.codigo);
		$("#nprogramaC").html("TIPO PROGRAMA N°"+arrayDetalle.idPrograma+" "+arrayDetalle.programa_aplicacion);
		$("#jefeAplicacionC").html(arrayDetalle.adm_campo);
		$("#aplicadorC").html(arrayDetalle.jefe_aplicacion);
		$("#campoC").html(arrayDetalle.campo);
		$("#fechaEstimadaC").html(formatFecha(arrayDetalle.fecha_estimada_aplicacion));
		$("#fechaInicioC").html(formatFecha(arrayDetalle.fecha_estimada_aplicacion));
		$("#formaC").html(arrayDetalle.forma_aplicacion);
		$("#detalleCuartelC").empty();
		var nombre = "OA_"+arrayDetalle.campo+"_"+arrayDetalle.codigo;
		$("#detalleVariedadC").empty();
		$("#detalleMaterialC").empty();
		$("#detalleMaterialC").empty();
		var maxCarencia = 0;
		var maxhr 		= 0;
		var hoy = new Date();
		$.each(arrayDetalle.lista_materiales, function(k,v){
			console.log(v);
			var dataMat = [];
			$.ajax({
				url: IPSERVERSAP + "JSON_ZMOV_10020.aspx?MATERIAL="+v.codigo_material,
				type:	"GET",
	//			data : JSON.stringify(row),
				dataType: 'json',
				async: false,
				success: function(data){
					dataMat = data;
				}
			})
			
	
			if(maxCarencia < parseInt(dataMat.LT_DETALLE[0].CARENCIA)){
				maxCarencia = dataMat.LT_DETALLE[0].CARENCIA;
			}
			
			if(maxhr < parseInt(dataMat.LT_DETALLE[0].REINGRESO)){
				maxhr = dataMat.LT_DETALLE[0].REINGRESO
			}
			
			
			
			var td = "";
			td += "<tr>";
			td += "<td>"+dataMat.LT_DETALLE[0].MAKTX+"</td>";
			td += "<td>"+dataMat.LT_DETALLE[0].IACTIVO+"</td>";
			td += "<td>"+formatNumber2(v.dosis_100)+"</td>";
			td += "<td>"+formatNumber2(v.dosis_has)+"</td>";
			td += "<td>"+formatNumber2(v.dosis_bombada)+"</td>";
			td += "<td>"+formatNumber2(arrayDetalle.capacidad_maquina)+"</td>";
			td += "<td>"+arrayDetalle.tipo_control+"</td>";
			td += "<td>0</td>";
			td += "<td>"+formatNumber2(v.cantidad)+"</td>";
			td += "<td>"+dataMat.LT_DETALLE[0].MEINS+"</td>";
			td += "</tr>";
			$("#detalleMaterialC").append(td);
		});
		var arrayVariedas = [];
		var total = 0;
		$.each(arrayDetalle.lista_cuarteles, function(k,v){
			if(v.estado == 'checked') {
				var td = "";
				td += "<tr>";
				td += "<td>"+v.nCuartel+"</td>";
				td += "<td>"+v.has_real+"</td>";
				td += "<td>"+v.nVariedad+"</td>";
				td += "<td>"+arrayDetalle.estado_fenologico+"</td>";
				td += "<td>"+formatNumber2(arrayDetalle.mojamiento_real)+"</td>";
				td += "</tr>";
				$("#detalleCuartelC").append(td);
				
				total += parseFloat(v.has_real);
				
				if(arrayVariedas.indexOf(v.nVariedad) == -1){
					arrayVariedas.push(v.nVariedad);
					var fechaInicio = new Date(v.fechaEstimadaCosecha);
					
					var diff = fechaInicio - hoy;
					diff = diff/(1000*60*60*24);
					var tdv = "";
					tdv += "<tr>";
					tdv += "<td>"+v.nVariedad+"</td>";
					tdv += "<td>"+formatFecha(v.fechaEstimadaCosecha)+"</td>";
					tdv += "<td>"+formatFecha(arrayDetalle.fecha_viable)+"</td>";
					tdv += "<td>"+parseInt(diff)+"</td>";
					tdv += "<td>"+parseInt(maxCarencia)+"</td>";
					tdv += "<td>"+arrayDetalle.mercado+"</td>";
					tdv += "<td>"+parseInt(maxhr)+"</td>";
					tdv += "</tr>";
					$("#detalleVariedadC").append(tdv);
				}
			}
			
		});
		console.log(arrayMaquinaria);
		$.each(arrayDetalle.lista_maquinaria, function(k, v){
			console.log(v);
			var tdmq = "";
			tdmq += "<tr>";
			tdmq += "<td>"+v.nresponsable+"</td>";
			tdmq += "<td>"+arrayMaquinaria[v.maquinaria]+"</td>";
			tdmq += "<td>"+arrayMaquinaria[v.implemento]+"</td>";
			tdmq += "<td>"+arrayCambio[v.cambio]+"</td>";
			tdmq += "<td>"+arrayMarcha[v.marcha]+"</td>";
			tdmq += "<td>"+v.presion+"</td>";
			tdmq += "<td>"+v.velocidad+"</td>";
			tdmq += "</tr>";
			$("#detalleEquipoC").append(tdmq);
		});
		
		var td;
		td += "<tr>";
		td += "<td>Total</td>";
		td += "<td>"+formatNumber2(total)+"</td>";
		td += "<td></td>";
		td += "<td></td>";
		td += "<td></td>";
		td += "</tr>";
		$("#detalleCuartelC").append(td);
		
		$("#observacionC").html(arrayDetalle.observacion);
		$("#loading").hide();
		console.log($("#jspdfC").html());
		var urlPdf = "http://200.68.4.145/qas/dompdf/crearPdfSclem.php";
		var urlExcel = "http://200.68.4.145/qas/configuracionOA.php";
		console.log(urlPdf);
		$.ajax({
			url: urlExcel,
			type:	"POST",
			data : { DATA: arrayDetalle, maxCarencia2 :  maxCarencia, arrayMaquinaria2 : arrayMaquinaria , arrayCambio2 : arrayCambio, arrayMarcha2 : arrayMarcha, maxhr2: maxhr, NOMBRE : nombre},
			dataType: 'json',
			async: false,
			success: function(data){
				console.log(data);				
			}
		})
		//window.open("http://200.68.4.145/qas/configuracionOA.php?NOMBRE="+nombre);
		//popUp("", $("#jspdfC").html(), true, '1800px', true);
		//$(".swal2-content").addClass("div2");
		//$('.swal2-shown').css("background-color","#fff !important;");
		
	},500);
}

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