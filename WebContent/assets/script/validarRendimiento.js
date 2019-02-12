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
	fechas();
});
var MACRO;
var $macros = [];
var tabla;
var datosFiltros = JSON.parse(localStorage.getItem("filtrosValidar"));
var especie;
var variedad;
var detalleCuartel;
var chechTr = [];
var tipo = [{
	id: 1,
	tipo: "MASIVO"
},{
	id: 2,
	tipo: "INDIVIDUAL"
}]
function loadCampo(){
	var tipoSelect = "<option value=''></option>";
	$.each(tipo, function(k,v){
		tipoSelect += '<option value="'+v.id+'">'+v.tipo+'</option>';
	})
	$("#tipo").html(tipoSelect);
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
		if($(this).val() != "on"){
			chechTr.push($(this).val());
		}
    });
	if(chechTr.length == 0){
		alerta("No se ha seleccionado ningun rendimiento para validar");
		return;
	}else{
		var tipo = $("#tipo").val();
		if(tipo*1 == 1){
			tipo = "MASIVO";
		}else{
			tipo = "INDIVIDUAL";
		}
		var c = 0;
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
					var res = registros.total - c;
					console.log(res)
					var mensaje = "";
					mensaje += 	"<div class='col-xs-12 col-sm-12 col-md-12'>";
					mensaje += 		"<h5 style='color: #337ab7;font-weight: bold'>"+registros.fechadesde+" a "+registros.fechahasta+"</h5>";
					mensaje += 	"</div>";
					mensaje +=	"<div class='table-responsive'>";
					mensaje +=		"<table class='table table-bordered table-hover table-striped table-condensed' id='tbl_Datos_Comunes'>";
					mensaje +=			"<thead>";
					mensaje +=				"<tr>";
					mensaje +=					"<th>Validados</th>";
					mensaje +=					"<th>Por Validar</th>";
					mensaje +=				"</tr>";
					mensaje +=			"</thead>";
					mensaje +=			"<body id='bodyMensaje'>";
					mensaje += 				"<tr>";
					mensaje +=					"<td>"+c+"</td>";
					mensaje +=					"<td>"+res+"</td>";
					mensaje +=				"</tr>";
					mensaje +=			"</body>";
					mensaje +=		"</table>";
					mensaje +=	'</div>';
					var a = alerta(mensaje, true);
					$(a.aceptar).click(function(){
						buscar();
					})
				}
			}
		}
	}
}
var registros = {};
function buscar(){
	var tipo = $("#tipo").val()*1;
	var campo = $("#dataHuerto").val();
	var fecha_desde = $("#fecha").val();
	var fecha_hasta = $("#fecha_hasta").val();
	var url = "";
	if(tipo == 1){
		url = "/simpleWeb/json/AGRO/GET_RENDIMIENTOS_FECHA?CAMPO="+campo+"&FECHADESDE="+formatFecha(fecha_desde)+"&FECHAHASTA="+formatFecha(fecha_hasta)+"&CUARTEL=&TIPO=PLANTA&ESTADO=8";
	}else if(tipo == 2){
		url = "/simpleWeb/json/AGRO/GET_RENDIMIENTOS_FECHA_INDIVIDUAL?CAMPO="+campo+"&FECHADESDE="+formatFecha(fecha_desde)+"&FECHAHASTA="+formatFecha(fecha_hasta)+"&TIPO=PLANTA&ESTADO=8";
	}else if(tipo == 3){
		url = "/simpleWeb/json/AGRO/GET_RENDIMIENTOS_FECHA?CAMPO="+campo+"&FECHADESDE="+formatFecha(fecha_desde)+"&FECHAHASTA="+formatFecha(fecha_hasta)+"&TIPO=CONTRATISTA&ESTADO=8";
	}else if(tipo == 4){
		url = "/simpleWeb/json/AGRO/GET_RENDIMIENTOS_FECHA_INDIVIDUAL?CAMPO="+campo+"&FECHADESDE="+formatFecha(fecha_desde)+"&FECHAHASTA="+formatFecha(fecha_hasta)+"&TIPO=CONTRATISTA&ESTADO=8";
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
			registros.total = data.length;
			registros.fechadesde = fecha_desde;
			registros.fechahasta = fecha_hasta;
			console.log(data)
			if(tabla){
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
				if(!v.trabajador){
					v.trabajador = "NO APLICA";
				}
				if(!v.ncuartel){
					v.ncuartel = "NO APLICA";
					v.nespecie = "NO APLICA";
					v.nvariedad = "NO APLICA";
				}
				if(v.tipo_pago*1 == 1){
					v.tipo_pago = "DIA";
				}else if(v.tipo_pago*1 == 2){
					v.tipo_pago = "TRATO";
				}else{
					v.tipo_pago = "MIXTO";
				}
				var macro = "No Aplica";
				if(v.macro){
					macro = v.macro;
				}
				var check = "<input name='check' type='checkbox' checked value='"+v.codigo+"'title='Seleccionar' id='check"+v.folio+"' class='checkbox'/>";
				var btn = "<a class='btn btn-circle blue btn-outline' onclick='javascript: detalle("+v.codigo+");'><i class='icon-magnifier'></i></a>"
				var tbl2 = [check,parseFolio(v.folio), formatFecha(v.fecha),v.campo,v.trabajador,v.nsupervisor, v.nfaena, 
				           v.nlabor,formatNumber(String(v.horas).split(".").join(",")), v.tipo_pago,v.nespecie,v.nvariedad, v.ncuartel, getMacroName(macro), getCecoOrdenName(ceco), btn];
				datos.push(tbl2);
			})
			tabla = $('#tbl_RendimientoVlidadr').DataTable({
				data: datos,
				bAutoWidth: false , 
				aoColumns : [{
					title: "<input type='checkbox' title='Seleccionar Todo' checked id='checkAll' onchange='javascript: selectALL(this);' class='checkbox'/>",
					width: "5px"
				},{
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
	
	localStorage.setItem("filtrosValidar",JSON.stringify(json));
	localStorage.setItem("pagina","validarRendimiento");
	
	if(tipo == 1 || tipo == 3){
		window.location.href = ("DetalleRendimiento?codigo_rg="+rg);
	}else{
		window.location.href = ("DetalleRendimiento?codigo_rd="+rg);
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