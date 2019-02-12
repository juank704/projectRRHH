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
//	loading.hide();
	fechas();
	if(datosFiltros){
		$("#tipo").val(datosFiltros.tipo).trigger("change");
		$("#dataHuerto").val(datosFiltros.campo).trigger("change");
		$("#fecha").val(datosFiltros.fecha_desde).trigger("change");
		$("#fecha_hasta").val(datosFiltros.fecha_hasta).trigger("change");
		buscar();
	}
});
var tabla;
var $macros = [];
var especie;
var datosFiltros = JSON.parse(localStorage.getItem("filtrosValidadosContratista"));
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
var CONTRATISTAS;
var MACRO;
function buscar(){
	tabla = undefined;
	var tipo = $("#tipo").val()*1;
	var campo = $("#dataHuerto").val();
	var fecha_desde = formatFecha($("#fecha").val());
	var fecha_hasta = formatFecha($("#fecha_hasta").val());
	var url = "";
	if(tipo == 3){
		url = "/simpleWeb/json/AGRO/GET_RENDIMIENTOS_FECHA?CAMPO="+campo+"&FECHADESDE="+fecha_desde+"&FECHAHASTA="+fecha_hasta+"&TIPO=CONTRATISTA&ESTADO=3";
	}else if(tipo == 4){
		url = "/simpleWeb/json/AGRO/GET_RENDIMIENTOS_FECHA_INDIVIDUAL?CAMPO="+campo+"&FECHADESDE="+fecha_desde+"&FECHAHASTA="+fecha_hasta+"&TIPO=CONTRATISTA&ESTADO=3";
	}
	if(!campo || !fecha_desde || !fecha_hasta){
		return;
	}
	loading.show();
	setTimeout(function(){ 
		$.each(SESION.campo, function(k,v){
			if(v.campo == campo){
				$.ajax({
					url: IPSERVERSAP+ "JSON_BAPI_LISTA_PROVEEDORES.aspx?SOCIEDAD="+v.sociedad,
					type:	"GET",
					dataType: 'json',
					async: false,
					success: function(data){
						CONTRATISTAS = data;
					}
				})
			}
		})
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
			console.log(data);
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
			$("#thTrabajador").hide();
			$.each(data, function(k,v){
				var folio = v.folio;
				if(tipo == 4){
					folio = 0;
				}
				if(v.tipo_pago*1 == 1){
					v.tipo_pago = "Dia";
				}else if(v.tipo_pago*1 == 2){
					v.tipo_pago = "Trato";
				}else{
					v.tipo_pago = "Mixto";
				}
				var cecoOrden = "No Aplica";
				if(v.ceco){
					cecoOrden = v.ceco;
				}else{
					cecoOrden = v.ordenco;
				}
				var macro = "No Aplica";
				if(v.macro){
					macro = v.macro;
				}
				var check = "<input name='check' type='checkbox' checked value='"+v.codigo+"'title='Seleccionar' id='check"+v.folio+"' class='checkbox'/>";
				var btn = "<a class='btn btn-circle blue btn-outline' onclick='javascript: detalle("+v.codigo+");'><i class='icon-magnifier'></i></a>"
				var tbl2 = [parseFolio(folio), formatFecha(v.fecha),v.campo, getContratistaName(v.contratista), v.nsupervisor, v.nfaena, 
				           v.nlabor,v.horas, v.tipo_pago,v.nespecie,v.nvariedad, v.ncuartel, getMacroName(macro), getCecoOrdenName(cecoOrden), btn];
				tabla.row.add(tbl2).draw(false);
			})
			$("#tbl_RendimientoVlidadr_filter").hide();
			loading.hide();
		}
	})
	}, 100);
	$('#tbl_RendimientoVlidadr thead tr').clone(true).appendTo( '#tbl_RendimientoVlidadr thead' );
    $('#tbl_RendimientoVlidadr thead tr:eq(1) th').each( function (i) {
    	if(tipo == 2){
    		i = i -1;
    	}
    	if($(this).text() != "" && $(this).text() != "Detalle"){
    		var title = $(this).text();
            $(this).html( '<input type="text" class="form-control input-sm" placeholder="'+title+'" />' );
            $( 'input', this ).on( 'keyup change', function () {
                if ( tabla.column(i).search() !== this.value ) {
                	tabla.column(i).search(this.value).draw();
                }
            } );
    	}else{
    		$(this).html("");
    	}
    } );
}
function getContratistaName(id){
	var nameContratista = "";
	$.each(CONTRATISTAS.VENDOR, function(k,v){
		if(id == v.VENDOR_NO*1){
			nameContratista = v.NAME;
		}
	})
	return nameContratista;
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
	localStorage.setItem("filtrosValidadosContratista",JSON.stringify(json));
	
	if(tipo == 1 || tipo == 3){
		window.location.href = ("detalleRendimientoValidado?codigo_rg="+rg);
	}else{
		window.location.href = ("detalleRendimientoValidado?codigo_rd="+rg);
	}
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