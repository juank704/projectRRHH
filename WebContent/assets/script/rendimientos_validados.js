$(document).ready(function(){
	$.ajax({
		url: IPSERVERSAP+"JSON_BAPI_INTERNALORDER_GETLIST.aspx?TIPO=Z600",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			MACRO = data;
		}
	})
	$.fn.dataTable.ext.errMode = 'none';
	loadCampo();
	if(datosFiltros){
		$("#tipo").val(datosFiltros.tipo);
		$("#dataHuerto").val(datosFiltros.campo);
		$("#fecha").val(datosFiltros.fecha_desde);
		$("#fecha_hasta").val(datosFiltros.fecha_hasta);
		buscar();
	}
//	loading.hide();
	fechas();
});
var tabla;
var MACRO;
var $macros = [];
var datosFiltros = JSON.parse(localStorage.getItem("filtros_rendimientosValidados"));
var especie;
var variedad;
var detalleCuartel;
var chechTr = [];
function loadCampo(){
	var campo = "<option value=''>Seleccione</option>";
	$.each(SESION.campo, function(id,value){
		campo += '<option value="'+value.campo+'">'+value.descripcion+'</option>';
	})
	$("#dataHuerto").html(campo);
}
function selectALL(all){
	var check = document.getElementsByName("check");
	if(all.checked == true){
		for(var x = 0; x < check.length; x++){
			check[x].checked = all.checked;
		}
	}else{
		for(var x = 0; x < check.length; x++){
			check[x].checked = all.unchecked;
		}
	}
}
function validateRendimientos(){
	chechTr = [];
	$('input[type=checkbox]:checked').each(function() {
		chechTr.push($(this).val());
    });
	var pos = chechTr.indexOf('on');
	if(pos > -1){
		chechTr.splice(pos, 1);
	}
	if(chechTr.length == 1){
		alerta("No se ha seleccionado ningun rendimiento para validar");
		return;
	}else{
		var tipo = "";
		if(tipo == 1){
			tipo = "MASIVO";
		}else{
			tipo = "INDIVIDUAL";
		}
		var c = 1;
		for(var i = 0; i < chechTr.length; i++){
			if(chechTr[i] != "on"){
				$.ajax({
					url: "/simpleWeb/json/AGRO/UPDATE_RENDIMIENTO?TIPO="+tipo+"&ESTADO=3&CODIGO="+chechTr[i],
					type:	"GET",
					dataType: 'json',
					async: false,
					success: function(data){
						c++;
					},error: function(er){
						alerta("Ha ocurrido un error interno del servidor, consulte con el administrador del sistema");
					}
				})
				if(c == chechTr.length){
					var a = alerta("Rendimiento(s) Validado(s) correctamente");
					$(a.aceptar).click(function(){
						loadInfo();
					})
				}
			}
		}
	}
}
function buscar(){
	var tipo = $("#tipo").val()*1;
	var campo = $("#dataHuerto").val();
	var fecha_desde = formatFecha($("#fecha").val());
	var fecha_hasta = formatFecha($("#fecha_hasta").val());
	var url = "";
	if(tipo == 1){
		url = "/simpleWeb/json/AGRO/GET_RENDIMIENTOS_FECHA?CAMPO="+campo+"&FECHADESDE="+fecha_desde+"&FECHAHASTA="+fecha_hasta+"&TIPO=PLANTA&ESTADO=3";
	}else if(tipo == 2){
		url = "/simpleWeb/json/AGRO/GET_RENDIMIENTOS_FECHA_INDIVIDUAL?CAMPO="+campo+"&FECHADESDE="+fecha_desde+"&FECHAHASTA="+fecha_hasta+"&TIPO=PLANTA&ESTADO=3";
	}
	if(!campo || !fecha_desde || !fecha_hasta){
		return;
	}
	loading.show();
	setTimeout(function(){ 
	$.ajax({
		url: url,
		type:	"GET",
		dataType: 'json',
		async: false,
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success: function(data){
			console.log(data)
			$.each(SESION.campo, function(k,v){
				if(campo == v.campo){
					gcc = v.grupo_co;
					return false;
				}
			})
			var arrGcc = gcc.split(";");
			$.each(arrGcc, function (k,v){
				$.ajax({
					url: IPSERVERSAP+ "JSON_BAPI_INTERNALORDRGRP_GETDETAIL.aspx?GRUPO="+v,
					type:	"GET",
					dataType: 'json',
					async: false,
					success: function(data){
						$.each(data.HIERARCHYNODES, function(k,v){
							$macros.push(v);
						})
					}
				})
			});
			if(tabla){
				console.log("w")
				tabla.destroy();
		        $('#tbl_RendimientoVlidadr').empty(); 
			}
			var datos = [];
			$.each(data, function(k,v){
				var ceco = "NO APLICA";
				if(v.ceco){
					ceco = v.ceco;
				}else if(v.ordenco){
					ceco = v.ordenco;
				}
				var folio = parseFolio(v.folio);
				var trabajador = v.trabajador;
				if(!v.trabajador){
					trabajador = "NO APLICA";
				}
				if(v.folio == 0){
					folio = "NO APLICA";
				}
				if(v.tipo_pago*1 == 1){
					v.tipo_pago = "Dia";
				}else if(v.tipo_pago*1 == 2){
					v.tipo_pago = "Trato";
				}else{
					v.tipo_pago = "Mixto";
				}
				var macro = "No Aplica";
				if(v.macro){
					macro = v.macro;
				}
				var check = "<input name='check' type='checkbox' checked value='"+v.codigo+"'title='Seleccionar' id='check"+v.folio+"' class='checkbox'/>";
				var btn = "<a class='btn btn-circle blue btn-outline' onclick='javascript: detalle("+v.codigo+");'><i class='icon-magnifier'></i></a>"
				var tbl2 = [folio, formatFecha(v.fecha),v.campo.toUpperCase(),trabajador.toUpperCase(),v.nsupervisor.toUpperCase(), v.nfaena.toUpperCase(), 
				           v.nlabor.toUpperCase(),v.horas, v.tipo_pago,v.nespecie,v.nvariedad, v.ncuartel, getMacroName(macro), getCecoOrdenName(ceco), btn];
//				tabla.row.add(tbl2).draw(false);
				datos.push(tbl2);
			})
			tabla = $('#tbl_RendimientoVlidadr').DataTable({
				data: datos,
				bAutoWidth: false , 
				aoColumns : [{
					title: "Folio",
					sWidth: "100px"
				},{
					title: "Fecha",
					sWidth: "100px"
				},{
					title: "Campo",
					sWidth: "125px"
				},{
					title: "Trabajador",
					sWidth: "200px"
				},{
					title: "Supervisor",
					sWidth: "200px"
				},{
					title: "Faena",
					sWidth: "125px"
				},{
					title: "Labor",
					sWidth: "200px"
				},{
					title: "Horas",
					sWidth: "125px"
				},{
					title: "Tipo de Pago",
					sWidth: "125px"
				},{
					title: "Especie",
					sWidth: "125px"
				},{
					title: "Variedad",
					sWidth: "125px"
				},{
					title: "Cuartel",
					sWidth: "200px"
				},{
					title: "Agrupacion",
					sWidth: "200px"
				},{
					title: "CeCO/OrdenCO",
					sWidth: "125px"
				},{
					title: "Detalle",
					sWidth: "5px"
				}],
				ordering: false,
				sPaginationType: "full_numbers" ,
				fixedHeader: true
			});
			$("#tbl_RendimientoVlidadr_filter").hide();
			loading.hide();
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
		}
	})
	}, 50);
}
function detalle(rg){
	var campo = $("#dataHuerto").val();
	var fecha = $('#fecha').val();
	var fecha_hasta = $('#fecha_hasta').val();
	var tipo = $("#tipo").val()*1;
	var json = {
		tipo: tipo,
		campo: campo,
		fecha_desde: fecha,
		fecha_hasta: fecha_hasta
	}

	localStorage.setItem("filtros_rendimientosValidados",JSON.stringify(json));
	localStorage.setItem("pagina","rendimientos_validados");
	
	if(tipo == 1 || tipo == 3){
		window.location.href = ("detalleRendimientoValidado?codigo_rg="+rg);
	}else{
		window.location.href = ("detalleRendimientoValidado?codigo_rd="+rg);
	}
}
function getCecoOrdenName(id){
	var nameCecoOrden = "NO APLICA";
	$.each(MACRO.ORDER_LIST, function(k,v){
		if(v.ORDER == id){
			nameCecoOrden = v.ORDER_NAME;
		}
	})
	return nameCecoOrden;
}
function getMacroName(id){
	var nameMacro = "NO APLICA";
	$.each($macros, function(k,v){
		if(v.GROUPNAME == id){
			nameMacro = v.DESCRIPT;
		}
	})
	return nameMacro;
}