$(document).ready(function(){
	$.fn.dataTable.ext.errMode = 'none';
	loadCampo();
	$.ajax({
		url: IPSERVERSAP+"JSON_BAPI_INTERNALORDER_GETLIST.aspx?TIPO=Z600",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			MACRO = data;
		}
	})
	if(datosFiltros){
		$("#tipo").val(datosFiltros.tipo).trigger("change");
		$("#dataHuerto").val(datosFiltros.campo).trigger("change");
		$("#fecha").val(datosFiltros.fecha_desde).trigger("change");
		$("#fecha_hasta").val(datosFiltros.fecha_hasta).trigger("change");
		buscar();
	}
//	loading.hide();
	fechas();
});
var tabla;
var datosFiltros = JSON.parse(localStorage.getItem("filtrosValidarContratista"));
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
		if($("#tipo").val()*1 == 3){
			tipo = "MASIVO";
		}else{
			tipo = "INDIVIDUAL";
		}
		var c = 1;
		console.log("/simpleWeb/json/AGRO/UPDATE_RENDIMIENTO?TIPO="+tipo+"&ESTADO=3&CODIGO="+chechTr[i])
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
						buscar();
					})
				}
			}
		}
	}
}
var $macros = [];
function buscar(){
	var tipo = $("#tipo").val()*1;
	var campo = $("#dataHuerto").val();
	var fecha_desde = $("#fecha").val();
	var fecha_hasta = $("#fecha_hasta").val();
	var url = "";
	if(tipo == 3){
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
			console.log(data)
			var tbl = "";
			if(data.length == 0){
				tbl += "<tr>";
				tbl += 		"<td colspan='12' style='text-align: center;'>No existen Rendimientos para los parametros solicitados</td>";
				tbl += "</tr>";
			}
			tabla = $('#tbl_RendimientoVlidadr').DataTable({
				sPaginationType: "bootstrap_number" ,
				btnClass: "btn red",
				scrollY:  '45vh',
				scrollX: true,
				orderCellsTop: true,
			});
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
			tabla.clear().draw();
			if(tipo == 1 || tipo == 3){
				$.each(data, function(k,v){
					var ceco = "";
					if(v.tipo_pago*1 == 1){
						v.tipo_pago = "Dia";
					}else{
						v.tipo_pago = "Trato";
					}
					if(v.ceco){
						ceco = v.ceco;
					}else{
						ceco = v.ordenco;
					}
					var macro = "No Aplica";
					if(v.macro){
						macro = v.macro;
					}
					var check = "<input name='check' type='checkbox' checked value='"+v.codigo+"'title='Seleccionar' id='check"+v.folio+"' class='checkbox'/>";
					var btn = "<a class='btn btn-circle blue btn-outline' onclick='javascript: detalle("+v.codigo+");'><i class='icon-magnifier'></i></a>"
					var tbl2 = [check,parseFolio(v.folio), formatFecha(v.fecha),v.campo, v.ncontratista,v.nsupervisor, v.nfaena, 
					           v.nlabor,v.horas, v.tipo_pago,v.nespecie,v.nvariedad, v.ncuartel, getMacroName(macro), getCecoOrdenName(ceco), btn];
					tabla.row.add(tbl2).draw(false);
				})
			}else{
				var sociedad = "";
				$.each(SESION.campo, function(k,v){
					if(campo == v.campo){
						sociedad = v.sociedad;
					}
				})
				var jsonContratistas = [];
				$.ajax({
					url: IPSERVERSAP+ "JSON_BAPI_LISTA_PROVEEDORES.aspx?SOCIEDAD="+sociedad,
					type:	"GET",
					dataType: 'json',
					async: false,
					success: function(data){
						$.each(data.VENDOR, function(k,v){
							jsonContratistas.push(v);
						})
					}
				})
				$.each(data, function(k,v){
					var folio = " ";
					var nameContratista = "";
					$.each(jsonContratistas, function(ka,va){
						if("00"+v.contratista == va.VENDOR_NO){
							nameContratista = va.NAME;
							return false;
						}
					})
					var ceco = " ";
					if(!v.ncuartel){
						v.ncuartel = " ";
						v.nespecie = " ";
						v.nvariedad = " ";
					}
					if(v.tipo_pago*1 == 1){
						v.tipo_pago = "Dia";
					}else{
						v.tipo_pago = "Trato";
					}
					if(v.ceco){
						ceco = v.ceco;
					}else{
						ceco = v.ordenco;
					}
					var macro = "";
					if(v.macro){
						macro = v.macro;
					}
					console.log(v.macro)
					console.log(getMacroName(macro));
					var check = "<input name='check' type='checkbox' checked value='"+v.codigo+"'title='Seleccionar' id='check"+v.folio+"' class='checkbox'/>";
					var btn = "<a class='btn btn-circle blue btn-outline' onclick='javascript: detalle("+v.codigo+");'><i class='icon-magnifier'></i></a>"
					var tbl = [check, folio, formatFecha(v.fecha),v.campo, nameContratista,v.nsupervisor, v.nfaena, 
					           v.nlabor,v.horas, v.tipo_pago,v.nespecie,v.nvariedad, v.ncuartel, getMacroName(macro), getCecoOrdenName(ceco), btn];
					tabla.row.add(tbl).draw(false);
					var td = document.getElementsByTagName("TD");
					for(var i = 0; i < td.length; i++){
						if($(td[i]).html() == ""){
							$(td[i]).hide();
						}
					}
				})
			}
			$("#tbl_RendimientoVlidadr_filter").hide();
			loading.hide();
		}
	})
	}, 100);
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

	localStorage.setItem("pagina","validarRendimientoContratista");
	localStorage.setItem("filtrosValidarContratista",JSON.stringify(json));
	
	if(tipo == 1 || tipo == 3){
		window.location.href = ("DetalleRendimiento?codigo_rg="+rg);
	}else{
		window.location.href = ("DetalleRendimiento?codigo_rd="+rg);
	}
}
function getCecoOrdenName(id){
	var nameCecoOrden = "";
	$.each(MACRO.ORDER_LIST, function(k,v){
		if(v.ORDER == id){
			nameCecoOrden = v.ORDER_NAME;
		}
	})
	return nameCecoOrden;
}

function getMacroName(id){
	var nameMacro = "";
	console.log($macros)
	$.each($macros, function(k,v){
		if(v.GROUPNAME == id){
			nameMacro = v.DESCRIPT;
		}
	})
	return nameMacro;
}