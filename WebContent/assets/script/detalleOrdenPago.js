$(document).ready(function(){
	$.fn.dataTable.ext.errMode = 'none';
	loadInit();
	//loadInfo();
});
var especie;
var variedad;
var CUARTEL = getCuartel();
var detalleCuartel;
var dataListaOrdenes = [];
var checked = [];
var get = getINFO();
var exportDataJSON = [];
var v = JSON.parse(localStorage.getItem("OrdenPago"));
var ASIENTO_CONTABLE = {
	BAPI: "BAPI_ACC_DOCUMENT_POST",
	RUNTEST: "false",
};
function loadInit(){
	$.ajax({
		url: "/simpleWeb/json/AGRO/GREN_CON_BY_ID?CODIGO_LIQ="+get.CODIGO,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			console.log(data)
			var dataCampo = "";
			$.each(data, function(k,v){
				if(v.campo){
					dataCampo = v.campo;
				}
			})
			$.ajax({
				url: "/simpleWeb/json/AGRO/GEN_ASIENTO_CONTABLE?CODIGO_LIQ="+get.CODIGO,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(ac){
					var sociedad = "";
					$.each(SESION.campo, function(k,v){
						if(v.descripcion == dataCampo){
							sociedad = v.sociedad;
							return false;
						}
					})
					var CUENTAS = [];
					var nItem = 1;
					$.each(ac, function(k,v){
						if(v.ordenco == null){
							v.ordenco = "";
						}
						if(v.ceco == null){
							v.ceco = "";
						}
						var item = {
							ITEM: k+1,
							CUENTA: v.cuenta,
							VALOR: v.valor,
							CENTROCOSTO:v.ceco,
							ORDENCO:v.ordenco,
						};
						CUENTAS.push(item);
						nItem++;
					})
					var json = {
						ITEM: nItem,
						CUENTA: "2102011007",
						VALOR: -v.valor_liquido,
						CENTROCOSTO:"",
						ORDENCO:""
					}
					CUENTAS.push(json);
					ASIENTO_CONTABLE.PARAMETROS = {
						BUS_ACT: "RFBU",
						TIPO_DOC: "KA",
						TEXTO: "ANT. SA CONT",
						USUARIO: SESION.user,
						SOCIEDAD: sociedad,
						FECHA: (formatFecha($("#fecha").val()).split("-").join(""))*1,
						ANOFISCAL: (formatFecha($("#fecha").val()).split("-")[0])*1,
						REFERENCIA: "TEXTO",
						CUENTAS: CUENTAS
					}
				}
			});
			var cont = 0;
			var codigoC = "";
			var iva = 0;
			var total = 0;
			var total_liquido = 0;
			$.each(data, function(k,v){
				if(cont == 0){
					cargarContratista(v.campo, v.idContratista);
					codigoC = "00"+v.idContratista;
				}
				iva = v.iva;
				total = v.totalLiquidacion;
				total_liquido = v.total_liquido;
				cont++;
			})
			var tabla = $('#datosRg').DataTable({
				footerCallback: function(row, data, start, end, display){
					var api = this.api(), data;
		            $( api.column(8).footer() ).html(
		                '$ '+formatNumber(total) 
		            );
		            $( api.column(10).footer() ).html(
		                '$ '+formatNumber(iva)
		            );
		            $( api.column(12).footer() ).html(
		                '$ '+formatNumber(total_liquido)
		            );
				},
				dom: 'Bfrtip',
				buttons : [{
		            extend : 'excel',
		            footer: true,
		            text : 'Exportar Excel',
		            className: 'btn green',
		            exportOptions : {
		                modifier : {
		                    order : 'index',
		                    page : 'all',
		                    search : 'none'
		                },
			            columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
		            }
		        },{
		            extend: 'pdfHtml5',
		            footer: true,
		            className: 'btn red',
		            text: 'PDF',
					title: 'PRE-LIQUIDACION CONTRATISTA ',
		            orientation: 'landscape',
		            pageSize: 'A4',
		            exportOptions: {
		            	columns: [ 0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
		            },
		            customize: function ( doc ) {
		            	doc.content.splice(0,1);
						var now = new Date();
						var jsDate = now.getDate()+'-'+(now.getMonth()+1)+'-'+now.getFullYear();
		            	doc.pageMargins = [30,100,30,30];
		            	doc.defaultStyle.fontSize = 7;
		            	doc.styles.tableHeader.fontSize = 7;
		            	doc.styles.tableFooter.fontSize = 7;
		            	doc['styles'] = {
	            	        userTable: {
	            	            margin: [15, 15, 0, 15]
	            	        },
	            	        tableHeader: {
	            	            bold:!0,
	            	            fontSize:7,
	            	            color:'black',
	            	            fillColor:'#F0F8FF',
	            	            alignment:'center'
	            	        },
	            	        tableFooter: {
	            	            bold:0,
	            	            fontSize:7,
	            	            fontWeight: "bold",
	            	            color:'black',
	            	            fillColor:'#F0F8FF',
	            	            alignment:'center'
	            	        }
	            	    };
		            	doc['header']=(function() {
							return {
								columns: [
//									{
//										image: "http://sclem.simpleagro.cl/simpleWeb/assets/global/img/overlay-icon.png",
//										width: 24
//									},
									{
										alignment: 'left',
										italics: true,
										text: "CODIGO: "+codigoC+" \n"+
											"RAZON SOCIAL: "+nameC+" \n"+
											"TELEFONO: \n"+
											"FAX: \n"+
											"OBSERVACIONES: \n",
										fontSize: 7,
										margin: [10,0]
									}
								],
								margin: 50,
							}
						});
		            	doc['footer']=(function(page, pages) {
							return {
								columns: [
									{
										alignment: 'left',
										text: ['Fecha Emisión: ', { text: jsDate.toString() }]
									},
									{
										alignment: 'right',
										text: ['Pagina ', { text: page.toString() },	' de ',	{ text: pages.toString() }]
									}
								],
								margin: 20
							}
		            	});
		            	var objLayout = {};
						objLayout['hLineWidth'] = function(i) { return .5; };
						objLayout['vLineWidth'] = function(i) { return .5; };
						objLayout['hLineColor'] = function(i) { return '#aaa'; };
						objLayout['vLineColor'] = function(i) { return '#aaa'; };
						objLayout['paddingLeft'] = function(i) { return 4; };
						objLayout['paddingRight'] = function(i) { return 4; };
						objLayout['total'] = function(i) { return formatNumber((458521*0.19)+458521); };
						doc.content[0].layout = objLayout;
		            }
		        }],
				sPaginationType: "bootstrap_number" ,
				btnClass: "btn red",
				scrollY:  '45vh',
				filter: false,
				scrollX: true,
				orderCellsTop: true,
			});
			tabla.clear().draw();
			console.log(data);
			$.each(data, function(k,v){
				if(v.tipo_pago*1 == 1){
					v.tipo_pago = "Dia";
				}else{
					v.tipo_pago = "Trato";
				}
				var btn = "<a class='btn red  btn-sm' onclick='elimimar("+v.codigo+");'><i class='fa fa-times'></i></a>"
				var tbl2 = [formatFecha(v.fecha), v.idContratista,v.supervisor,v.nombre, v.rut, 
				           v.nFaena,v.nLabor, v.tipo_pago,"$ "+formatNumber(String(v.valor_trato).split(".").join(",")), formatNumber(String(v.rendimiento).replace(".", ",")), "$ "+formatNumber(String(v.valor_rendimiento).replace(".", ",")), "$ "+formatNumber(v.bono1), "$ "+formatNumber(String(v.valor_liquido).split(".").join(",")), btn];
				tabla.row.add(tbl2).draw(false);
			})
			$("#total_liquidos").val(formatNumber(total));
			$("#total_iva").val(formatNumber(iva));
			$("#total").val(formatNumber(total_liquido));
			$("#datosRg_info").css('float', 'left')
			$("#datosRg_paginate").css('float', 'right')
			datosDetalle = data;
		}
	})
}
function elimimar(id){
	var c = confirmar.confirm("¿Seguro que quiere eliminar Este Rendimiento?")
	$(c.aceptar).click(function(){
		$.ajax({
			url:	"/simpleWeb/json/AGRO/DELETE_RENDIMIENTO_LIQUIDACION/"+id,
			type:	"POST",
			success: function(){
				var a = alerta("Se ha eliminado este rendimiento");
				$(a.aceptar).click(function(){
					loadInit();
				})
			},
			error: function(a, b){
				console.log(a);
			}
		});
	})
}
var opc = "p";
function popUpDetalle(){
	var pop = "";
	pop += 	"<div class='col-xs-12 col-sm-12 col-md-12'>"
	pop += 		"<div class='col-xs-6 portlet'>";
	pop += 			"<h5 style='color: #337ab7;font-weight: bold'>Fecha</h5>";
	pop += 			"<input name='fecha' class='form-control required-modal' id='fecha'>";
	pop += 		"</div>";
	pop += 		"<div class='col-xs-6 portlet'>";
	pop += 			"<h5 style='color: #337ab7;font-weight: bold'>Numero de Factura</h5>";
	pop += 			"<input class='form-control' id='factura'>";
	pop += 		"</div>";
	pop += 	"</div>";
	pop += 	"<div class='col-xs-12 col-sm-12 col-md-12'>"
	pop += 		"<div class='col-xs-6 portlet'>";
	pop += 			"<h5 style='color: #337ab7;font-weight: bold'>Retencion</h5>";
	pop +=  		"<label style='font-size: 15px;' class='radio-inline'><input type='radio' class='radio-opc' name='optradio' value='p' checked>Porcentaje</label>";
	pop += 			"<label style='font-size: 15px;' class='radio-inline'><input type='radio' class='radio-opc' name='optradio' value='m'>Monto</label>";
	pop += 			"<div class='input-icon'><i class='fa fa-percent' aria-hidden='true'></i><input class='form-control number' value='0' onkeyup='retencion(this)' id='retencion'></div>";
	pop += 		"</div>";
	pop += 		"<div class='col-xs-6 portlet'>";
	pop += 			"<h5 style='color: #337ab7;font-weight: bold'>Anticipos</h5>";
	pop +=			"<div style='height: 21px;''></div>";
	pop += 			"<input class='form-control' id='anticipos'>";
	pop += 		"</div>";
	pop += 	"</div>";
	pop += 		"<div style='text-align: center;'>";
	pop += 			"<a class='btn green-dark submit-modal' onclick='generarOrden()'> Generar Orden de Pago</a>";
	pop += 			"<a class='btn red' onclick='closeModal()'>Cancelar</a>";
	pop += 		"</div>";
	popUp("Generar Orden de Pago", pop, true, "450px", true);
	opc = "p";
	fechas();
	format();
	$(".radio-opc").click(function(){
		if($(this)[0].checked){
			opc = $(this).val();
			retencion($("#retencion")[0]);
		}
	})
}
function retencion(input){
	var vlr = formatNumberDB(input.value);
	if(opc == "p" && vlr > 100){
		alerta("No se puede sobrepasar el 100%");
		$(input).val("");
		return;
	}else if(opc == "m" && vlr > v.valor_liquido){
		alerta("No se puede sobrepasar el valor Liquido de la liquidación: $ "+formatNumber(v.valor_liquido));
		$(input).val("");
		return;
	}
}
function generarOrden(){
	if(validateModal()){
		var anticipos = 0;
		if($("#anticipos").val()){
			anticipos = $("#anticipos").val()*1;
		}
		var valor = v.valor_liquido;
		var valor_retencion = 0;
		if($("#retencion").val()){
			if(opc == "p" && $("#retencion").val() != 0){
				valor = (valor - ((valor * (formatNumberDB($("#retencion").val())) / 100)));
				valor_retencion = v.valor_liquido - parseInt(valor);
			}else if(opc == "m" && $("#retencion").val() != 0){
				valor_retencion = formatNumberDB($("#retencion").val());
				valor = (valor - (formatNumberDB($("#retencion").val())));
			}
		}
		valor = valor - anticipos
		ASIENTO_CONTABLE.PARAMETROS.FECHA = (formatFecha($("#fecha").val()).split("-").join(""))*1;
		ASIENTO_CONTABLE.PARAMETROS.ANOFISCAL =  (formatFecha($("#fecha").val()).split("-")[0])*1;
		var mensaje = "";
		var asiento = "";
		console.log(ASIENTO_CONTABLE);
//		return;
		$.ajax({
			url: IPSERVERSAP + "JSON_BAPI_ACC_DOCUMENT_POST.aspx?PARAMETRO="+JSON.stringify(ASIENTO_CONTABLE)+"&USPAS="+SESION.user+"X*X"+SESION.pass,
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				asiento = data.OBJ_KEY;
				mensaje += "Asiento Contable Codigo: "+data.OBJ_KEY+" Realizado con exito. \n";
			}
		})
		$('#loading').show();
		var parametros = {};
		parametros.PARAMETROS                = {};
		parametros.PARAMETROS.FECHA          = formatFecha($("#fecha").val()).split("-").join("");
		parametros.PARAMETROS.REFERENCIA     =  "ANTICIPO CONTRATISTA";
		parametros.PARAMETROS.TEXTO_CABECERA = "Anticipo "+ arrayContratista[v.contratista*1];
		parametros.PARAMETROS.PRODUCTOR      = parseFolio(v.contratista);
		parametros.PARAMETROS.MONTO          = parseInt(valor);
		parametros.PARAMETROS.MONEDA         = 'CLP';
		parametros.PARAMETROS.TIPO_DOC       = "KA";
		parametros.PARAMETROS.SOCIEDAD       = v.sociedad;
		var url = IPSERVERSAP + "JSON_ZMF_FI_SOLANT.aspx?PARAMETRO="+JSON.stringify(parametros);
		var n = $("#factura").val();
		if(!n){
			n = 0;
		}
		$.ajax({
			url: url,
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				console.log(data);
				if(data.E_BELNR != "") {
					var orden_pago = {
						codigo: v.codigo,
						orden: data.E_BELNR,
						n_factura: n,
						valor_retencion: valor_retencion,
						asiento_contable: asiento
					}
					$.ajax({
						url : "/simpleWeb/json/AGRO/UPD_ORDEN_PAGO/",
						type : "PUT",
						data : JSON.stringify(orden_pago),
						beforeSend : function(xhr) {
							xhr.setRequestHeader("Accept","application/json");
							xhr.setRequestHeader("Content-Type","application/json");
						},
						success : function(data2, textStatus, jqXHR) {
							closeModal();
							mensaje += "Orden N° "+data.E_BELNR+" generada con éxito para la liquidación "+v.codigo;
							var a = alerta(mensaje);
							$(a.aceptar).click(function(){
								window.location.href = ("liquidacionContratista");
							})
						},
						error : function(jqXHR, textStatus, errorThrown) {
							alerta("HA OCURRIDO UN ERROR, CONSULTE CON EL ADMINISTRADOR DEL SISTEMA");
							loading.hide();
						}
					});
					$('#loading').hide();
				} else {
					swal({
						  title: "Error!",
						  text: "No se ha podido registrar la infomación, consulte con el administrador del sistema",
						  type: "error",
						  confirmButtonText: "Aceptar"
					});
					loading.hide();
				}
			}
		})
		loading.hide();
	}
}
function confirmRechazar(codigo){
	var c = confirmar.confirm("¿Seguro desea rechazar liquidación "+codigo+"?");
	$(c.aceptar).click(function(){
		$('#loading').show();
		$.getJSON("/simpleWeb/json/AGRO/RECHAZAR/"+codigo, function(data){
			if(data){
				alerta("Liquidación "+codigo+ " rechazada con éxito.");
				$("#op"+codigo).hide();
				$("#rc"+codigo).hide();
				$("#est"+codigo).html("Rechazada");
				$('#loading').hide();
			}
		});
	});
}
var arrayContratista = [];
var nameC = "";
function cargarContratista(campo, contratista){
	var sociedad = 0;
	
	$.each(SESION.campo, function(k,v){
		if(v.descripcion == campo){
			sociedad = v.sociedad;
		}
	})
	$.ajax({
		url: IPSERVERSAP+ "JSON_ZMOV_10036.aspx?CONTRATISTA=X",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			var selectContratista = "<option value=''>Seleccione</option>";
			$.each(data.ET_DATPROV, function(k,v){
				if(v.LIFNR == parseFolio(contratista)){
					nameC = v.NAME1;
					arrayContratista[parseInt(v.LIFNR)] = v.NAME1;
				}
			})
		}
	})
}