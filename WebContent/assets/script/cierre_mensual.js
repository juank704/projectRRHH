$(document).ready(function(){
	$.fn.dataTable.ext.errMode = 'none';
	$.ajax({
		url: IPSERVERSAP+"JSON_BAPI_INTERNALORDER_GETLIST.aspx?TIPO=Z600",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			MACRO = data;
		}
	})
});
var MACRO;
var auxCecos2 = [];
var auxCecos = [];
$.each(SESION.campo, function(k,v){
	if(auxCecos.indexOf(v.grupo_ceco_work) == -1){
		auxCecos.push(v.grupo_ceco_work);
		auxCecos2.push({sociedad: v.sociedad, grupo: v.grupo_ceco_work})
	}
})
var $cecos = [];
$.each(auxCecos2, function(k,v){
	$.ajax({
		url: IPSERVERSAP+"JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+v.sociedad+"&GRUPO="+v.grupo,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			$.each(data.COSTCENTERLIST, function(k,v){
				$cecos.push(v);
			})
		}
	})
})
var tabla;
var campo = "";
var periodo = "";
var datos;
var selectHuerto = "";
$.ajax({
	url: "/simpleWeb/json/AGRO/GET_SOCIEDAD/"+SESION.idUser,
	type:	"GET",
	dataType: 'json',
	async: false,
	success: function(data){
		$.each(data, function(ka,va){
			selectHuerto += "<option value='"+va.sociedad+"'>"+va.descripcion+"</option>";
		});
	}
})
$("#campo").append(selectHuerto);
function btnCierreMensual(){
	campo = $("#campo").val();
	periodo = $("#periodo").val();
	if(!campo || !periodo){
		console.log($cecos)
		return;
	}
	$("#loading").show();
	setTimeout(function(){
		$.ajax({
			url: "/simpleWeb/json/AGRO/GET_CIERRE_MENSUAL?CAMPO="+campo+"&PERIODO="+periodo,
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				console.log(data);
				var dataTabla = [];
				if(tabla){
					tabla.destroy();
			        $('#tbl_RendimientoVlidadr').empty(); 
				}
				
				$.each(data, function(k,v){
					v.campo = campo;
					v.periodo = periodo;
					var orden_co = "";
					var ce_co = "";
					if(!v.ordenco){
						v.ordenco = "";
					}else{
						$.each(MACRO.ORDER_LIST, function(ka,va){
							if(va.OBJECT_NO.indexOf(v.ordenco) != -1){
								orden_co = va.ORDER_NAME;
							}
						})
					}
					$.each($cecos, function(ka,va){
						if(va.COSTCENTER == v.ceco){
							ce_co = va.DESCRIPT;
						}
					})
					var tbl = [
					           v.codigo,
					           v.trabajador,
					           v.cuenta, 
					           ce_co,
					           v.ceco, 
					           orden_co,
					           v.ordenco,
					           v.periodo, 
					           v.sociedadCentralizacion, 
					           v.sociedadImputacion, 
					           v.valor, 
					           String(v.percent).split(".").join(",")+" %", 
					           v.costo_empresa,
					           v.p_hx+" %",
					           v.p_bono+" %",
					           v.p_bono_dos+" %",
					           v.p_valor_rendimiento+" %",
					           v.p_base_dia+" %"];
					dataTabla.push(tbl);
				});
				var columnas = [{
					title: "Codigo"
				},{
					title: "Trabajador"
				},{
					title: "Cuenta"
				},{
					title: "Centro de Costo (Nombre)"
				},{
					title: "Centro de Costo (Codigo)"
				},{
					title: "OrdenCo (Nombre)"
				},{
					title: "OrdenCo (Codigo)"
				},{
					title: "Periodo"
				},{
					title: "Sociedad Centralizacion"
				},{
					title: "Sociedad Imputacion"
				},{
					title: "Valor Liquido"
				},{
					title: "Porcentaje"
				},{
					title: "Costo Empresa"
				},{
					title: "Horas Extras %"
				},{
					title: "Bono %"
				},{
					title: "Bono 2 %"
				},{
					title: "Valor Rendimiento %"
				},{
					title: "Base Dia %"
				}]
				tabla = $('#tbl_RendimientoVlidadr').DataTable({
					data: dataTabla,
					columns: columnas,
					sPaginationType: "full_numbers" ,
					btnClass: "btn red",
//					scrollX: true,
//					scrollCollapse: true,
					ordering: false,
					fixedHeader: true,
//					orderCellsTop: true,
					dom: 'Bfrtip',
				    buttons: [
				        'excel'
				    ]
				});
				datos = data;
				$('#tbl_RendimientoVlidadr thead tr').clone(true).appendTo( '#tbl_RendimientoVlidadr thead' );
			    $('#tbl_RendimientoVlidadr thead tr:eq(1) th').each( function (i) {
			    	if($(this).text() != "" && $(this).text() != "Detalle"){
			    		var title = $(this).text();
			            $(this).html( '<input type="text" class="form-control input-sm" placeholder="'+title+'" />' );
			     
			            $( 'input', this ).on( 'keyup change', function () {
			                if ( tabla.column(i).search() !== this.value ) {
			                	tabla
			                        .column(i)
			                        .search( this.value )
			                        .draw();
			                }
			            } );
			    	}else{
			    		$(this).html("");
			    	}
			    } );
				$("#loading").hide();
			}
		})
		$('#tbl_RendimientoVlidadr_paginate').css('text-align','center');
		$('#tbl_RendimientoVlidadr').css('width','100%');
		$('.buttons-excel').addClass('btn btn-circle red btn-outline');
		$('.buttons-pdf').addClass('btn btn-circle red btn-outline');
//		$('#tbl_RendimientoVlidadr_length').hide();
		$("#tbl_RendimientoVlidadr_filter").hide();
	},500);
}
function generarCierre(){
	if(datos.length == []){
		return;
	}else{
		loading.show();
		setTimeout(function(){
			campo = $("#campo").val();
			periodo = $("#periodo").val();
			console.log("/simpleWeb/json/AGRO/ADD_CIERRE_MENSUAL?CAMPO="+campo+"&PERIODO="+periodo);
			$.ajax({
				url : "/simpleWeb/json/AGRO/ADD_CIERRE_MENSUAL?CAMPO="+campo+"&PERIODO="+periodo,
				type : "GET",
				//data : JSON.stringify(datos),
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept","application/json");
					xhr.setRequestHeader("Content-Type","application/json");
				},
				success : function(data, textStatus, jqXHR) {
					console.log(data);
					/*datos = [];
					var correctos = 0;
					var fallidos = 0;
					var arrFallidos = [];
					$.each(data, function(k,v){
						if(v.estado == true){
							correctos++;
						}else{
							arrFallidos.push(v.objeto);
							fallidos++;
						}
					})
					var mensaje = "";
					mensaje +=	"<div class='table-responsive'>";
					mensaje +=		"<table class='table table-bordered table-hover table-striped table-condensed' id='tbl_Datos_Comunes'>";
					mensaje +=			"<thead>";
					mensaje +=				"<tr>";
					mensaje +=					"<th>Ingresos Correctos</th>";
					mensaje +=					"<th>Ingresos Fallidos</th>";
					mensaje +=				"</tr>";
					mensaje +=			"</thead>";
					mensaje +=			"<body id='bodyMensaje'>";
					mensaje += 				"<tr>";
					mensaje +=					"<td>"+correctos+"</td>";
					mensaje +=					"<td><a title='Ver Detalle' onclick='detaleFallas("+JSON.stringify(arrFallidos)+")'>"+fallidos+"</a></td>";
					mensaje +=				"</tr>";
					mensaje +=			"</body>";
					mensaje +=		"</table>";
					mensaje +=	'</div>';
					*/
					if(data){
						var a = alerta("Cierre realizado con éxito", true);
						$(a.aceptar).click(function(){
							//btnCierreMensual();
							window.location.href = ("cierre_mensual");
						})
					}
					loading.hide();
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
		
		/*var c = confirmar.confirm("Esta accion sobreescribira los datos de "+returnMes(periodo));
		$(c.aceptar).click(function(){
			$.ajax({
				url : "/simpleWeb/json/AGRO/ADD_CIERRE_MENSUAL/",
				type : "PUT",
				data : JSON.stringify(datos),
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept","application/json");
					xhr.setRequestHeader("Content-Type","application/json");
				},
				success : function(data, textStatus, jqXHR) {
					console.log(data);
					datos = [];
					var correctos = 0;
					var fallidos = 0;
					var arrFallidos = [];
					$.each(data, function(k,v){
						if(v.estado == true){
							correctos++;
						}else{
							arrFallidos.push(v.objeto);
							fallidos++;
						}
					})
					var mensaje = "";
					mensaje +=	"<div class='table-responsive'>";
					mensaje +=		"<table class='table table-bordered table-hover table-striped table-condensed' id='tbl_Datos_Comunes'>";
					mensaje +=			"<thead>";
					mensaje +=				"<tr>";
					mensaje +=					"<th>Ingresos Correctos</th>";
					mensaje +=					"<th>Ingresos Fallidos</th>";
					mensaje +=				"</tr>";
					mensaje +=			"</thead>";
					mensaje +=			"<body id='bodyMensaje'>";
					mensaje += 				"<tr>";
					mensaje +=					"<td>"+correctos+"</td>";
					mensaje +=					"<td><a title='Ver Detalle' onclick='detaleFallas("+JSON.stringify(arrFallidos)+")'>"+fallidos+"</a></td>";
					mensaje +=				"</tr>";
					mensaje +=			"</body>";
					mensaje +=		"</table>";
					mensaje +=	'</div>';
					var a = alerta(mensaje, true);
					$(a.aceptar).click(function(){
						window.location.href = ("cierre_mensual");
					})
					loading.hide();
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
		})*/
		},500);
	}
}
function returnMes(periodo){
	var m = "";
	var mes = periodo.split("-")[1];
	var anno = periodo.split("-")[0];
	var meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	for(var i = 0; i < meses.length; i++){
		if(mes == i){
			m = meses[i]+" de "+anno;
		}
	}
	return m;
}