
var dataTable = $('#tbl_ListaRendimiento').DataTable({
	dom: 'Bfrtip',
    buttons: 
    	[
    	 {  extend: 'excel',
            text: 'Excel',
            className: 'btn btn-default',
            exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7, 8, 10,12,14,16,18]
            }
              }
    ],
	"sPaginationType": "full_numbers" ,
	"filter": false,
	//"ordering": true,
	"order": [[ 0, "desc" ]]
	,"columnDefs" : [{
        "targets" : [10,12,14,16,18],
        "visible" : false,
        "searchable" : true
    }]
	 ,scrollY:        "500px",
    //scrollX:        true,
    scrollCollapse: true,
    paging:         true
	
});
function semanadelano(fecha) {
	var cons = [ 2, 1, 7, 6, 5, 4, 3 ];
	fecha = fecha.split("-");
	var dia = eval(fecha[2]);
	var mes = eval(fecha[1]);
	var ano = eval(fecha[0]);
	if (mes != 0) {
		mes--;
	}
	var dia_pri = new Date(ano, 0, 1);
	dia_pri = dia_pri.getDay();
	dia_pri = eval(cons[dia_pri]);
	var tiempo0 = new Date(ano, 0, dia_pri);
	dia = (dia + dia_pri);
	var tiempo1 = new Date(ano, mes, dia);
	var lapso = (tiempo1 - tiempo0)
	var semanas = Math.floor(lapso / 1000 / 60 / 60 / 24 / 7);
	if (dia_pri == 1) {
		semanas++;
	}
	if (semanas == 0) {
		semanas = 52;
		ano--;
	}
	if (ano < 10) {
		ano = '0' + ano;
	}
	return semanas;
}
$('#tbl_ListaRendimiento_paginate').css('text-align','center');
$('.buttons-excel').addClass('btn btn-circle red btn-outline');
//$('.buttons-pdf').addClass('btn btn-circle red btn-outline');
$('#tbl_ListaAplicaciones_length').hide();
$("#ver").click(function(){
	loadInfo();
});
var arrayMaquinaria  = [];
var arrayImplemento  = [];
var arrayCampo;
var tabla;
function getHuertos(){
	$.ajax({
		url: IPSERVERSAP+"JSON_BAPI_INTERNALORDER_GETLIST.aspx?TIPO=Z600",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			MACRO = data;
		}
	})
	var campoSesion;
	$.ajax({
		url: "/simpleWeb/json/AGRO/GETCAMPO/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			arrayCampo = data;
			var selectHuerto = "";
			$.each(arrayCampo, function(ks,va){
				selectHuerto += "<option value='"+va.campo+"'>"+va.descripcion+"</option>";
			})
			$("#dataHuerto").append(selectHuerto);
			$("#dataHuerto").trigger("change");
		}
	})
	return campoSesion;
}
getHuertos();
	$("#dataHuerto").val()
setTimeout(function(){
	$("#dataHuerto").trigger("change");
},500);

$("#dataHuerto").change(function(){
	//loadInfo();
	cambioCampo($(this).val());
});

$(document).ready(function(){
	$.fn.dataTable.ext.errMode = 'none';
	//loadInfo();
});
var especie;
var variedad;
var MACRO;
var CUARTEL = getCuartel();
var detalleCuartel;
var dataListaOrdenes = [];
var checked = [];
var $macros = [];
var $cecos;
function loadInfo(){
	$("#loading").show();
	setTimeout(function(){  
		var dataListaRendimientos = [];
		var url = "/simpleWeb/json/AGRO/GET_ListRendContratista/"+$("#dataHuerto").val();
		url	+= "/"+$("#contratista").val()+"/"+formatFecha($("#BoxFecha").val())+"/"+formatFecha($("#BoxFecha2").val());
		dataTable.clear().draw();
		$.ajax({
			url: url,
			type : "GET",
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success: function(data){
				console.log(data)
				dataListaRendimientos = data;
				var datos = [];
				if(tabla){
					tabla.destroy();
			        $('#tbl_RendimientoVlidadr').empty(); 
				}
				$.each(SESION.campo, function (k,v){
					if($("#dataHuerto").val() == v.campo){
						$.ajax({
							url: IPSERVERSAP+ "JSON_BAPI_INTERNALORDRGRP_GETDETAIL.aspx?GRUPO="+v.grupo_co,
							type:	"GET",
							dataType: 'json',
							async: false,
							success: function(data){
								$.each(data.HIERARCHYNODES, function(k,v){
									$macros.push(v);
								})
								$macros.push({
									DESCRIPT: "OTROS CENTRO DE COSTO",
									GROUPNAME: "1",
									HIERLEVEL: 0,
									VALCOUNT: 0
								})
							}
						})
						$.ajax({
							url: IPSERVERSAP+"JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+v.idSociedad+"&GRUPO="+v.grupo_ceco_work+"&CECO="+v.cecos,
							type:	"GET",
							dataType: 'json',
							async: false,
							success: function(data){
								$cecos = data;
							}
						})
					}
				});
				$.each(dataListaRendimientos, function(k,v){
					var macro = "No Aplica";
					if(v.macroco){
						macro = v.macroco;
					}
					var valor_trato = parseInt(v.valor_rendimiento) / parseInt(v.rendimiento);
					var pago = "";
					if (v.tipo_pago == 1){
						pago = "Dia";
					}else if(v.tipo_pago == 2){
						pago = "Trato";
					}
					if(!v.nvnombre){
						v.nvnombre = "NO APLICA";
						v.nEspecie = "NO APLICA";
						v.nVariedad = "NO APLICA";
					}
					var check = "<input type='checkbox' checked class='cbRendimiento' onchange='updateList("+v.codigo+")' id='cb"+v.codigo+"' value='"+v.codigo+"' >";
					var tbl = [check,formatFecha(v.fecha),
					           arrayContratista[v.idContratista.toString()],
					           v.supervisor,
					           v.nombre,
					           v.rut, 
					           v.nEspecie,
					           v.nVariedad,
					           v.nvnombre,
					           getMacroName(macro),
					           getCecoOrdenName(v.ordenco),
					           getNameCecos(v.ceco),
					           v.nFaena,
					           v.nLabor,
					           pago,
					           formatNumber(valor_trato),
					           formatNumber(v.rendimiento),
					           formatNumber(v.valor_rendimiento),
					           formatNumber(v.bono1),
					           formatNumber(v.valor_liquido)];
//					var rowNode = dataTable
//				    .row.add( tbl )
//				    .draw()
//				    .node();
					checked[v.codigo] = 1;
					datos.push(tbl);
				})
				
				tabla = $('#tbl_RendimientoVlidadr').DataTable({
					data: datos,
					bAutoWidth: false , 
					aoColumns : [{
						title: "#"
					},{
						title: "Fecha"
					},{
						title: "Contratista"
					},{
						title: "Supervisor"
					},{
						title: "Nombre Trabajador"
					},{
						title: "Rut Trabajador"
					},{
						title: "Especie"
					},{
						title: "Variedad"
					},{
						title: "Cuartel"
					},{
						title: "Agrupacion"
					},{
						title: "OrdenCo"
					},{
						title: "CeCO"
					},{
						title: "Faena"
					},{
						title: "Labor"
					},{
						title: "Tipo Pago"
					},{
						title: "Valor Trato"
					},{
						title: "Rendimiento"
					},{
						title: "Valor Rendimiento"
					},{
						title: "Bono"
					},{
						title: "Valor Liquido"
					}],
					ordering: false,
					sPaginationType: "full_numbers" ,
					fixedHeader: true
				});
				$("#tbl_RendimientoVlidadr_filter").hide();
				$("#dataTables_length").hide();
				loading.hide();
				$('#tbl_RendimientoVlidadr thead tr').clone(true).appendTo( '#tbl_RendimientoVlidadr thead' );
			    $('#tbl_RendimientoVlidadr thead tr:eq(1) th').each( function (i) {
			    	if($(this).text() != "" && $(this).text() != "#"){
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
			},error: function(er){
				console.log(er);
				$("#loading").hide();
			}
		});
	}, 500);
}

function generarLiquidacion(){
	$("#loading").show();
	var liquidacion = {};
	var semanas = "";
	var fechadesde = semanadelano(formatFecha($("#BoxFecha").val()));
	var fechahasta = semanadelano(formatFecha($("#BoxFecha2").val()));
	if(fechadesde == fechahasta){
		semanas = "Semana "+fechadesde.toString();
	}else{
		semanas = "Semanas "+fechadesde+" hasta "+fechahasta;
	}
	liquidacion.contratista = $("#contratista").val();
	liquidacion.campo       = $("#dataHuerto").val();
	liquidacion.usuario     = SESION.idUser;
	liquidacion.fecha_desde = formatFecha($("#BoxFecha").val());
	liquidacion.fecha_hasta = formatFecha($("#BoxFecha2").val());
	liquidacion.rendimientos = [];
	liquidacion.semanas = semanas;
	$.each(checked,function(k,v){
		if(v != undefined && v == 1){
			var temp = {};
			temp.id = v;
			liquidacion.rendimientos.push(k);
		}
	});
	$.ajax({
		url : "/simpleWeb/json/AGRO/GENERAR_LIQUIDACION",
		type : "PUT",
		data : JSON.stringify(liquidacion),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("Content-Type","application/json");
		},
		success : function(data, textStatus, jqXHR) {
			$("#loading").hide();
			alerta("Se ha generado la liquidación "+data);
			checked = [];
			$('.swal2-confirm').click(function(){
				loadInfo();
			})
		},
		error : function(jqXHR, textStatus, errorThrown) {
			swal({
			  title: "Error!",
			  text: "No se ha podido registrar la infomacion, consulte con el administrador del sistema",
			  type: "error",
			  confirmButtonText: "Aceptar"
			});
			$("#loading").hide();
		}
	});
}

function updateList(id){
	if($("#cb"+id).is(':checked')){
		checked[id] = 1;
	} else {
		checked[id] = 0;
	}
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
				//selectContratista += "<option value="+v.VENDOR_NO+">"+v.NAME+"</option>";
				selectContratista += "<option value="+parseInt(v.LIFNR)+">"+v.STCD1+" "+v.NAME1+"</option>";
			})			
		}
	})
	$("#contratista").html(selectContratista);
	$("#loading").hide();
	
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
function getNameCecos(id){
	var nameCeco = "NO APLICA";
	$.each($cecos.COSTCENTERLIST, function(k,v){
		if(v.COSTCENTER == id){
			nameCeco = v.DESCRIPT;
		}
	})
	return nameCeco;
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