$(document).ready(function(){
	onLoad();
})
var get;
var campo;
var contratistaPulento;
var tabla;
function onLoad(){
	loading.show();
	get = getINFO();
	var codigo;
	var url = "";
	if(get.codigo_rg != undefined){
		$("#modRendimiento").show();
		url = "/simpleWeb/json/AGRO/GET_DETALLE_RENDIMIENTO_DIARIO?TIPO=MASIVO&CODIGO="+get.codigo_rg;
	}else{
		$("#modRendimientoIndividual").show();
		url = "/simpleWeb/json/AGRO/GET_DETALLE_RENDIMIENTO_DIARIO?TIPO=INDIVIDUAL&CODIGO="+get.codigo_rd;
	}
	$.ajax({
		url: url,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			console.log(data)
			contratistaPulento = data[0].idContratista;
			var colSpan = 5;
			if(contratistaPulento != 0){
				$("#thbasedia").hide();
				colSpan = 5;
			}
			var grupo;
			var sociedad;
			$.each(CUARTEL, function(k,v){
				if(v.nombre == data[0].nombre_cuartel){
					campo = v.campo;
				}
			})
			if(!campo){
				campo = data[0].campo;
			}
			$.each(SESION.campo, function(k,v){
				if(campo == v.campo){
					grupo = v.grupo;
					sociedad = v.sociedad;
				}
			})
			var SAP;
			var CECO; 
			$.ajax({
				url: IPSERVERSAP+"JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+sociedad+"&GRUPO="+grupo,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					CECO = data;
				}
			})
			$.ajax({
				url: IPSERVERSAP + "/JSON_BAPI_EQUI_GETLIST.aspx?CENTRO="+campo,//ZREP
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					SAP = data;
				}
			})
			console.log(data)
			var horasT = 0;
			var valorT = 0;
			var rndT = 0;
			var bono1T = 0;
			var bono2T = 0;
			var vlT = 0;
			var datos = [];
			$.each(data, function(k,v){
				var maquuinaria = "No Aplica";
				var implemento = "No Aplica";
				var centro_costo = v.nombre_cuartel;
				if(!centro_costo){
					$.each(CECO.COSTCENTERLIST, function(kc,vc){
						if(vc.COSTCENTER == v.ceco){
							centro_costo = vc.DESCRIPT;
						}
					})
					console.log($('#tbl_Detalle thead tr:eq(0) th:eq(4)'))
					$('#tbl_Detalle thead tr:eq(0) th:eq(4)').html("Centro de Costo");
				}
				$.each(SAP.EQUIPMENT_LIST, function(ks, vs){
					if(vs.EQUICATGRY == "M"){
						if(vs.EQUIPMENT*1 == v.maquinaria){
							maquuinaria = vs.DESCRIPT;
						}
					}
					if(vs.EQUICATGRY != "T" && vs.EQUICATGRY != "V"){
						if(vs.EQUIPMENT*1 == v.implemento){
							implemento = vs.DESCRIPT;
						}
					}
				})
				horasT = horasT + v.horas_trabajadas;
				valorT = valorT + v.valor;
				rndT = rndT + v.rendimiento;
				bono1T = bono1T + v.bono1;
				bono2T = bono2T + v.bono2;
				vlT = vlT + v.valor_liquido;
				if(v.bono1 == 0){
					v.bono1 = "Sin Bono 1";
					bono1T = 0;
				}else{
					v.bono1 = "$ "+formatNumber(v.bono1);
				}
				if(v.bono2 == 0){
					v.bono2 = "Sin Bono 2";
					bono2T = 0;
				}else{
					v.bono2 = "$ "+formatNumber(v.bono2);
				}
				if(v.bus == 0){
					v.bus = "Sin Bus";
				}
				if(v.base_piso_hora == 1){
					v.base_piso_hora = "Si";
				}else{
					v.base_piso_hora = "No";
				}
				if(v.tipo_trato == 1){
					v.tipo_trato = "Dia";
				}else if(v.tipo_trato*1 == 2){
					v.tipo_trato = "Trato";
				}else{
					v.tipo_trato = "Mixto";
				}
				var detalle = "";
				detalle += "<tr>";
				var tbl = [v.nombre_trabajador, v.base_piso_hora, formatNumber(String(v.horas_trabajadas).split(".").join(",")), v.horas_extras, formatNumber(v.valor_hx), formatNumber(v.monto_hx),
				           formatNumber(v.hx_dos), formatNumber(v.valor_hx_dos), v.bono2, centro_costo, v.des_faena, v.des_labor, v.tipo_trato,
				           "$ " +formatNumber(String(v.valor).split(".").join(",")), formatNumber(String(v.rendimiento).split(".").join(",")),
				           v.bono1, "$ " +formatNumber(String(v.valor_liquido).split(".").join(",")), maquuinaria, implemento, v.bus];
				if(get.codigo_rg != undefined){
					tbl.push("<a title='Modificar como Individual' class='btn yellow btn-sm' onclick='javascript: modIndividual("+v.codigo+")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></a>")
				}
				datos.push(tbl);
			})
			console.log(datos)
			var columnas = [{
				title: "Nombre"
			},{
				title: "Base Piso Dia"
			},{
				title: "Horas Trabajadas"
			},{
				title: "Horas Extras"
			},{
				title: "Valor Hora Extra"
			},{
				title: "Monto Horas Extras"
			},{
				title: "Horas Extras 2"
			},{
				title: "Valor Hora Extra 2"
			},{
				title: "Bono 2"
			},{
				title: "Cuartel"
			},{
				title: "Faena"
			},{
				title: "Labor"
			},{
				title: "Tipo Pago"
			},{
				title: "Valor Dia"
			},{
				title: "Rendimiento"
			},{
				title: "Bono"
			},{
				title: "Valor Liquido"
			},{
				title: "Maquinaria"
			},{
				title: "Implemento"
			},{
				title: "Bus"
			}];
			if(get.codigo_rg != undefined){
				columnas.push({title: "Modificar"})
			}
			console.log(columnas)
			tabla = $('#tbl_RendimientoVlidadr').DataTable({
				data: datos,
				bAutoWidth: false , 
				aoColumns : columnas,
				ordering: false,
				sPaginationType: "full_numbers" ,
				fixedHeader: true
			});
			$("#tHoras").html(formatNumber(String(horasT).split(".").join(",")))
			$("#tBono2").html("$ "+formatNumber(String(bono2T).split(".").join(",")))
			$("#tValorDia").html("$ "+formatNumber(String(valorT).split(".").join(",")))
			$("#tRendimiento").html(formatNumber(String(rndT).split(".").join(",")))
			$("#tBono1").html("$ "+formatNumber(String(bono1T).split(".").join(",")))
			$("#tValorLiquido").html("$ "+formatNumber(String(vlT).split(".").join(",")))
			
			
			$("#tbl_RendimientoVlidadr_filter").hide();
			$('#tbl_RendimientoVlidadr thead tr').clone(true).appendTo( '#tbl_RendimientoVlidadr thead' );
		    $('#tbl_RendimientoVlidadr thead tr:eq(1) th').each( function (i) {
		    	if($(this).text() != "" && $(this).text() != "Modificar"){
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
			loading.hide();
		},errror: function(er){
			alerta("Ha ocurrido un error interno del servidor, consulte con el administrador del sistema")
		}
	})
}
function updateRendimiento(){
	var tipo = "INDIVIDUAL";
	var codigo = get.codigo_rd;
	if(get.codigo_rg != undefined){
		tipo = "MASIVO";
		codigo = get.codigo_rg;
	}
	var url = "/simpleWeb/json/AGRO/UPDATE_RENDIMIENTO?TIPO="+tipo+"&ESTADO=3&CODIGO="+codigo;
	$.ajax({
		url: url,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			var a = alerta("Rendimiento Validado correctamente");
			var pagina = localStorage.getItem("pagina");
			$(a.aceptar).click(function(){
				if(contratistaPulento*1 == 0){
					window.location.href = (pagina);
				}else{
					window.location.href = (pagina);
				}
			})
		},errror: function(er){
			alerta("Ha ocurrido un error interno del servidor, consulte con el administrador del sistema")
		}
	})
}
function modRendimientoDuiario(){
	if(contratistaPulento != 0){
		window.location.href = ("rendimiento_contratista?CODIGO_RG="+get.codigo_rg);
	}else{
		window.location.href = ("rendimiento?CODIGO_RG="+get.codigo_rg);
	}
}
function rechazar(){
	var option = {
		title: "Observacion",
		input: "text",
		id: "obsRechazo",
		required: true
	}
	var c = confirmar.confirm("¿Desea eliminar este Rendimiento?");
	$(c.aceptar).click(function(){
		var tipo = "INDIVIDUAL";
		var codigo = get.codigo_rd;
		if(get.codigo_rg != undefined){
			tipo = "MASIVO";
			codigo = get.codigo_rg;
		}
		var url = "/simpleWeb/json/AGRO/UPDATE_RENDIMIENTO?TIPO="+tipo+"&ESTADO=7&CODIGO="+codigo;
		console.log(url)
		$.ajax({
			url: url,
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				var a = alerta("Se ha rechazado este Rendimiento");
				var pagina = localStorage.getItem("pagina");
				$(a.aceptar).click(function(){
					if(contratistaPulento*1 == 0){
						window.location.href = (pagina);
					}else{
						window.location.href = (pagina);
					}
				})
			},errror: function(er){
				alerta("Ha ocurrido un error interno del servidor, consulte con el administrador del sistema")
			}
		})
	})
}
function volver(){
	var pagina = localStorage.getItem("pagina");
	if(contratistaPulento*1 == 0){
		window.location.href = (pagina);
	}else{
		window.location.href = (pagina);
	}
}
function modIndividual(codigo){
	if(contratistaPulento*1 == 0){
		window.location.href = ("rendimiento_individual?CODIGO="+codigo+"&CODIGO_RG="+get.codigo_rg);
	}else{
		window.location.href = ("individual_contratista?CODIGO="+codigo+"&CODIGO_RG="+get.codigo_rg);
	}
}
function modRendimientoIndividual(){
	var codigo = get.codigo_rd;
	if(contratistaPulento*1 == 0){
		window.location.href = ("rendimiento_individual?CODIGO="+codigo);
	}else{
		window.location.href = ("individual_contratista?CODIGO="+codigo);
	}
}