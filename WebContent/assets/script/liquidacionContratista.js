
var dataTable = $('#tbl_ListaRendimiento').DataTable({
	dom: 'Bfrtip',
	buttons: [
		  {extend: 'excel',
		  text : 'Exportar Excel',
		  className: 'btn green',
			  exportOptions: {
				  columns: [1,2,3,7,8,9,10,11,12,13,14,15]
			  }	
		  }
    ],
	"sPaginationType": "full_numbers" ,
	"filter": false,
	//"ordering": true,
	 "order": [[ 1, "desc" ]],
	 "columnDefs" : [{
	        "targets" : [7,8,9],
	        "visible" : false,
	        "searchable" : true
	    }],
	 "language": {
         "decimal": ",",
         "thousands": "."
     }
	
});
$('#tbl_ListaRendimiento_paginate').css('text-align','center');
//$('#tbl_ListaAplicaciones_length').hide();
$("#ver").click(function(){
	loadInfo();
	
});
var arrayMaquinaria  = [];
var arrayImplemento  = [];
function getHuertos(){
	var selectHuerto = "<option value=''></option>";
	$.each(SESION.campo, function(ks,va){
		selectHuerto += "<option value='"+va.campo+"'>"+va.descripcion+"</option>";
	})
	$("#dataHuerto").html(selectHuerto);
}

$("#dataHuerto").change(function(){
	//loadInfo();
	cambioCampo($(this).val());
});

$(document).ready(function(){
	$.fn.dataTable.ext.errMode = 'none';
	getHuertos();
	//loadInfo();
});
var especie;
var variedad;
var CUARTEL = getCuartel();
var detalleCuartel;
var dataListaOrdenes = [];
var checked = [];
function loadInfo(){
	$("#loading").show();
	var dataListaRendimientos = [];
	var url = "/simpleWeb/json/AGRO/GET_LIQUIDACION/";
	dataTable.clear().draw();
	var row = {};
	row.codigo = $("#tipo").val()*1;
	row.contratista = parseInt($("#contratista").val());
	row.campo = $("#dataHuerto").val();
	row.fecha_desde = formatFecha($("#BoxFecha").val());
	row.fecha_hasta = formatFecha($("#BoxFecha2").val());
	$.ajax({
		url: url,
		type : "PUT",
		data : JSON.stringify(row),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success: function(data){
			dataListaRendimientos = data;
			$.each(dataListaRendimientos, function(k,v){
				var monto_pagado = v.valor_liquido - v.valor_retencion;
				var boton = "";
				
				var orden = '';
				var nfactura = v.n_factura;
				if(v.valor_retencion != 0){
					boton = "<button title='Generar pago de Retencion' onclick='gernerarPagoRetencion("+JSON.stringify(v)+")' class='btn green-dark btn-outline btn-sm' ><i class='fa fa-usd fa-lg'></i></button>";
				}
				if(v.orden != null){
					orden = v.orden;
				}
				if(v.n_factura == 0){
					nfactura = "<button id='nf"+v.codigo+"'  title='Agregar Numero de Factura' onclick='addNfactura("+v.codigo+")' class='btn yellow btn-outline btn-sm' ><i class='fa fa-refresh fa-lg'></i></button>";
				}else if(!v.n_factura){
					nfactura = "";
				}
				if(v.estado == 'Creada') {
					monto_pagado = 0;
					boton += "<button id='op"+v.codigo+"'  title='Orden de pago' onclick='ordenPago("+JSON.stringify(v)+")' class='btn green-dark btn-outline btn-sm' ><i class='fa fa-check-square-o fa-lg'></i></button>";
					boton += "<button id='rc"+v.codigo+"'  title='Rechazar' onclick='confirmRechazar("+v.codigo+")' class='btn red btn-outline btn-sm' ><i class='fa fa-close fa-lg'></i></button>";
				}
				var liquido = parseInt(v.valor_liquido);
				var iva     = liquido * 19 / 100;
				var iva     = parseInt(iva);
				var bruto   = liquido + iva;
				var activo = "disabled";
				var checked = "";
//				$("#ignore_2").hide();
				if($("#tipo").val()*1 == 2 && v.valor_retencion != 0){
					activo = "";
					checked = "checked";
					$("#ignore_2").show();
				}else if($("#tipo").val()*1 == 1){
					$("#ignore_2").hide();
				}
				var check = "<input name='check' type='checkbox' "+checked+" value='"+JSON.stringify(v)+"'title='Seleccionar' id='check"+v.folio+"' class='checkbox' "+activo+"/>";
				var tbl = [check, v.codigo, formatFecha(v.fecha),
				           v.contratista,arrayContratista[v.contratista.toString()], 
				           "$ "+formatNumber(liquido), "$ "+formatNumber(iva), 
				           "$ "+formatNumber(bruto), liquido, iva, bruto ,
				           "<div id='est"+v.codigo+"'>"+ v.estado+"<div>",
				           "$ "+formatNumber(monto_pagado),
				           "$ "+formatNumber(v.valor_retencion),
				           "<div id='ord"+v.codigo+"'>"+orden+"<div>",
				           "<div id='fact"+v.codigo+"'>"+nfactura+"<div>",
				           boton];
				var rowNode = dataTable
			    .row.add( tbl )
			    .draw()
			    .node();
			})
			var elements = document.getElementsByTagName("TH");
			var cont = 1;
			$(elements).each(function(){
				console.log($(this)[0].className)
				if(cont == 1){
					$(this)[0].className = "";
				}
				$(this).attr("style", "");
				cont++;
			})
			$("#loading").hide();
		},error: function(er){
			console.log(er);
			$("#loading").hide();
		}
		
	});
}
function gernerarPagoRetencion(v){
	var pop2 = "";
	pop2 += 	"<div class='col-xs-12'>";
	pop2 += 		"<h5 style='color: #337ab7;font-weight: bold'>Monto a Pagar</h5>";
	pop2 += 		"<h5 style='color: #337ab7;font-weight: bold;font-size: 20px;'>$ "+formatNumber(v.valor_retencion)+"</h5>";
	pop2 += 	"</div>";
	pop2 += 	"<div style='text-align: center;'>";
	pop2 += 		"<a class='btn green-dark submit-modal' onclick='pagarRetencion("+JSON.stringify(v)+")'> Generar Pago de Retención</a>";
	pop2 += 		"<a class='btn red' onclick='closeModal()'>Cancelar</a>";
	pop2 += 	"</div>";
	popUp("Pago de Retención, Liquidacion N°: "+v.codigo, pop2, true, "450px", true);
}
function pagarRetencion(v){
	var arrayContratista = [];
	var parametros = {};
	parametros.PARAMETROS                = {};
	parametros.PARAMETROS.FECHA          = v.fecha.split("-").join("");
	parametros.PARAMETROS.REFERENCIA     =  "ANTICIPO CONTRATISTA";
	parametros.PARAMETROS.TEXTO_CABECERA = "Anticipo "+ arrayContratista[v.contratista.toString()];
	parametros.PARAMETROS.PRODUCTOR      = v.contratista;
	parametros.PARAMETROS.MONTO          = v.valor_retencion;
	parametros.PARAMETROS.MONEDA         = 'CLP';
	parametros.PARAMETROS.TIPO_DOC       = "KA";
	parametros.PARAMETROS.SOCIEDAD       = v.sociedad;
	var url = IPSERVERSAP + "JSON_ZMF_FI_SOLANT.aspx?PARAMETRO="+JSON.stringify(parametros);
	$.ajax({
		url: url,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			if(data.E_BELNR != "") {
				var pago_retencion = {
					codigo: v.codigo,
					orden: v.orden,
					n_factura: v.n_factura,
					valor_retencion: 0,
					orden_retencion: data.E_BELNR,
					asiento_contable: v.asiento_contable
				}
				$.ajax({
					url : "/simpleWeb/json/AGRO/UPD_ORDEN_PAGO/",
					type : "PUT",
					data : JSON.stringify(pago_retencion),
					beforeSend : function(xhr) {
						xhr.setRequestHeader("Accept","application/json");
						xhr.setRequestHeader("Content-Type","application/json");
					},
					success : function(data2, textStatus, jqXHR) {
						closeModal();
						var a = alerta("Orden N° "+data.E_BELNR+" generada con éxito para la liquidación "+v.codigo);
						$(a.aceptar).click(function(){
							loadInfo();
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
}
function addNfactura(id){
	var pop = "";
	pop += 	"<div class='col-xs-12 portlet'>";
	pop += 		"<h5 style='color: #337ab7;font-weight: bold'>Numero de Factura</h5>";
	pop += 		"<input class='form-control required-modal' id='factura'>";
	pop += 	"</div>";
	pop += 	"<div style='text-align: center;'>";
	pop += 		"<a class='btn green-dark submit-modal' onclick='addNumero("+id+")'> Agregar N° Factura</a>";
	pop += 		"<a class='btn red' onclick='closeModal()'>Cancelar</a>";
	pop += 	"</div>";
	popUp("Agregar Numero de Factura", pop, true, "380px", true);
}
function addNumero(id){
	$.ajax({
		url:	"/simpleWeb/json/AGRO/UPD_RENDIMIENTO_LIQUIDACION/"+id+"/"+$("#factura").val(),
		type:	"POST",
		success: function(){
			closeModal();
			var a = alerta("Se ha agregado el numero exitosamente");
			$(a.aceptar).click(function(){
				loadInfo();
			})
		},
		error: function(a, b){
			console.log(a);
		}
	});
}
var exportDataJSON = [];
function ordenPago(v){
	window.location.href = ("detalleOrdenPago?CODIGO="+v.codigo);
	localStorage.setItem("OrdenPago",JSON.stringify(v));
}
function generarOrden(v){
	$('#loading').show();
	var parametros = {};
	parametros.PARAMETROS = {};
	parametros.PARAMETROS.FECHA = v.fecha.split("-").join("");
	parametros.PARAMETROS.REFERENCIA =  "ANTICIPO CONTRATISTA";
	parametros.PARAMETROS.TEXTO_CABECERA = "Anticipo "+ arrayContratista[v.contratista.toString()];
	parametros.PARAMETROS.PRODUCTOR = v.contratista;
	parametros.PARAMETROS.MONTO = v.valor_liquido;
	parametros.PARAMETROS.MONEDA = 'CLP';
	parametros.PARAMETROS.TIPO_DOC = "KA";
	parametros.PARAMETROS.SOCIEDAD = v.sociedad;
	var url = IPSERVERSAP + "JSON_ZMF_FI_SOLANT.aspx?PARAMETRO="+JSON.stringify(parametros);
	$.ajax({
		url: url,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			url = "/simpleWeb/json/AGRO/ORDEN_PAGO/"+v.codigo+"/"+data.E_BELNR;
			if(data.E_BELNR != "") {
				$.ajax({
					url: url,
					type:	"GET",
					//dataType: 'json',
					//data: JSON.stringify(row),
					async: false,
					success: function(data2){
						closeModal();
						alerta("Orden N° "+data.E_BELNR+" generada con éxito para la liquidación "+v.codigo);
						$("#op"+v.codigo).hide();
						$("#rc"+v.codigo).hide();
						$("#ord"+v.codigo).html(data.E_BELNR);
						$("#est"+v.codigo).html("Orden de pago");
					}
				})
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
function updateList(id){
	if($("#cb"+id).is(':checked')){
		checked[id] = 1;
	} else {
		checked[id] = 0;
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

function selectTodo(){
	if($("#cbSelectTodo").is(':checked')){
		$('.cbRendimiento').prop('checked', true);
	} else {
		$('.cbRendimiento').prop('checked', false);
	}
}

function cambioCampo(campo){
	$("#loading").show();
	var campo = $("#dataHuerto").val();
	var sociedad = "";
	var sector = "";
	$.each(SESION.campo, function(k,v){
		if(v.campo == campo){
			sociedad = v.sociedad;
			sector = v.sector;
		}
	})
	cargarContratista(sociedad);
	$("#loading").hide();
}

var arrayContratista = [];
function cargarContratista(sociedad){
	$("#loading").show();
	//var url = IPSERVERSAP+ "JSON_BAPI_LISTA_PROVEEDORES.aspx?SOCIEDAD="+sociedad;
	var url = IPSERVERSAP+ "JSON_ZMOV_10036.aspx?CONTRATISTA=X";
	var selectContratista = "";
	$.ajax({
		url: url,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){			
			$.each(data.ET_DATPROV, function(k,v){
				arrayContratista[parseInt(v.LIFNR)] = v.NAME1;
				selectContratista += "<option value="+parseInt(v.LIFNR)+">"+v.STCD1+" "+v.NAME1+"</option>";
			})			
		}
	})
	$("#contratista").html(selectContratista);
	$("#loading").hide();
	
}
function exportData(){
	$("#dvjson").excelexportjs({
        containerid: "dvjson"
           , datatype: 'json'
           , dataset: exportDataJSON
           , worksheetName: "Detalle Orden de Pago"
           , columns: getColumns(exportDataJSON)          
    });
	//location.reload();
	$("#loading").hide();
};
function selectALL(all){
	var check = document.getElementsByName("check");
	if(all.checked == true){
		for(var x = 0; x < check.length; x++){
			if(check[x].disabled == false){
				check[x].checked = all.checked;
			}
		}
	}else{
		for(var x = 0; x < check.length; x++){
			if(check[x].disabled == false){
				check[x].checked = all.unchecked;
			}
		}
	}
}
var pagos = [];
function btnRetencion(){
	pagos = [];
	$('input[type=checkbox]:checked').each(function() {
		if($(this).val() != "on"){
			var json = JSON.parse($(this).val());
			pagos.push(json);
		}
    });
	if(pagos.length == 0){
		alerta("No se ha seleccionado ninguna liquidación con monto de retención");
		return;
	}else{
		var total = 0;
		var pop = "";
		pop += 	"<table class='table table-bordered table-hover table-striped table-condensed'>";
		pop += 		"<thead>";
		pop += 			"<tr>";
		pop += 				"<th>N° Liquidación</th>";
		pop += 				"<th>Monto Retenido</th>";
		pop += 			"</tr>";
		pop += 		"</thead>";
		pop += 		"<tbody>";
		$.each(pagos, function(k,v){
			total = total + v.valor_retencion;
			pop += 		"<tr>";
			pop += 			"<td>"+v.codigo+"</td>";
			pop += 			"<td>$ "+formatNumber(v.valor_retencion)+"</td>";
			pop += 		"</tr>";
		})
		pop += 		"</tbody>";
		pop += 	"</table>";
		pop += 	"<div class='col-xs-12'>";
		pop += 		"<h5 style='color: #337ab7;font-weight: bold'>Monto Total a Pagar</h5>";
		pop += 		"<h5 style='color: #337ab7;font-weight: bold;font-size: 20px;'>$ "+formatNumber(total)+"</h5>";
		pop += 	"</div>";
		pop += 	"<div style='text-align: center;'>";
		pop += 		"<a class='btn green-dark submit-modal' onclick='pagarRetenciones("+JSON.stringify(pagos)+")'> Pagar Total de Retenciones</a>";
		pop += 		"<a class='btn red' onclick='closeModal()'>Cancelar</a>";
		pop += 	"</div>";
		popUp("Pagar Retenciones", pop, true, "500px", true);
	}
}
function pagarRetenciones(pagos){
	loading.show();
	var c = 0;
	setTimeout(function(){
		closeModal();
		$.each(pagos, function(k,v){
			var arrayContratista = [];
			var parametros = {};
			parametros.PARAMETROS                = {};
			parametros.PARAMETROS.FECHA          = v.fecha.split("-").join("");
			parametros.PARAMETROS.REFERENCIA     =  "ANTICIPO CONTRATISTA";
			parametros.PARAMETROS.TEXTO_CABECERA = "Anticipo "+ arrayContratista[v.contratista.toString()];
			parametros.PARAMETROS.PRODUCTOR      = v.contratista;
			parametros.PARAMETROS.MONTO          = v.valor_retencion;
			parametros.PARAMETROS.MONEDA         = 'CLP';
			parametros.PARAMETROS.TIPO_DOC       = "KA";
			parametros.PARAMETROS.SOCIEDAD       = v.sociedad;
			var url = IPSERVERSAP + "JSON_ZMF_FI_SOLANT.aspx?PARAMETRO="+JSON.stringify(parametros);
			$.ajax({
				url: url,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					if(data.E_BELNR != "") {
						var pago_retencion = {
							codigo: v.codigo,
							orden: v.orden,
							n_factura: v.n_factura,
							valor_retencion: 0,
							orden_retencion: data.E_BELNR,
							asiento_contable: v.asiento_contable
						}
						$.ajax({
							url : "/simpleWeb/json/AGRO/UPD_ORDEN_PAGO/",
							type : "PUT",
							data : JSON.stringify(pago_retencion),
							async: false,
							beforeSend : function(xhr) {
								xhr.setRequestHeader("Accept","application/json");
								xhr.setRequestHeader("Content-Type","application/json");
							},
							success : function(data2, textStatus, jqXHR) {
								c++;
							},
							error : function(jqXHR, textStatus, errorThrown) {
								alerta("HA OCURRIDO UN ERROR, CONSULTE CON EL ADMINISTRADOR DEL SISTEMA");
								loading.hide();
							}
						});
					} else {
						swal({
							  title: "Error!",
							  text: "No se ha podido registrar la infomación, consulte con el administrador del sistema",
							  type: "error",
							  confirmButtonText: "Aceptar"
						});
					}
				}
			})
		});
		if(c == pagos.length){
			closeModal();
			var a = alerta("Pagos generados con éxito");
			$(a.aceptar).click(function(){
				loadInfo();
			})
		}
	}, 50);
}