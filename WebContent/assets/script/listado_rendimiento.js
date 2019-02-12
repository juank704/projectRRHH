var dataTable;
$(document).ready(function(){
	$.fn.dataTable.ext.errMode = 'none';
	getCampos1();
	$.ajax({
		url: IPSERVERSAP+"JSON_BAPI_INTERNALORDER_GETLIST.aspx?TIPO=Z600",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			MACRO = data;
		}
	})
	loadInfo();
	$("#loading").hide();
});  
var $contratistas = [];
var $maq_imp = [];
var $cecos = [];
var $trabajadores;
var socArr = [];
var camMaqArr = [];
var auxSoc = [];
var auxMaq = [];
var auxCecos = [];
var auxCecos2 = [];
var macros = [];
$.each(SESION.campo, function(k,v){
	if(auxMaq.indexOf(v.campos_maq) == -1){
		auxMaq.push(v.campos_maq);
		camMaqArr.push(v.campos_maq);
	}
	if(auxSoc.indexOf(v.sociedad) == -1){
		socArr.push(v.sociedad);
		auxSoc.push(v.sociedad);
	}
	if(auxCecos.indexOf(v.grupo_ceco_work) == -1){
		auxCecos.push(v.grupo_ceco_work);
		auxCecos2.push({sociedad: v.sociedad, grupo: v.grupo_ceco_work})
	}
})
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
$.each(SESION.campo, function(k,v){
	$.ajax({
		url: IPSERVERSAP+ "JSON_BAPI_INTERNALORDRGRP_GETDETAIL.aspx?GRUPO="+v.grupo_co,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			$.each(data.HIERARCHYNODES, function(k,v){
				var e = v.GROUPNAME;
				if((e[e.length-1]*1 == 1 || e[e.length-1]*1 == 2) && e[e.length-2]*1 == 0){
					macros.push(v);
				}
			})
		}
	})
})
var json = {
	DESCRIPT: "Otros Centros de Costos",
	GROUPNAME: "1"
}
macros.push(json);
$.ajax({
	url: IPSERVERSAP+ "JSON_ZMOV_10036.aspx?CONTRATISTA=X",
	type:	"GET",
	dataType: 'json',
	async: false,
	success: function(data){
		console.log(data)
		$.each(data.ET_DATPROV, function(k,v){
			$contratistas.push(v);
		})
	}
})
//}
for(var i = 0; i < camMaqArr.length; i++){
	$.ajax({
		url: IPSERVERSAP + "/JSON_BAPI_EQUI_GETLIST.aspx?CENTRO="+camMaqArr[i],//ZREP
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			$.each(data.EQUIPMENT_LIST, function(k,v){
				$maq_imp.push(v)
			})
		}
	})
}
$.ajax({
	url: "/simpleWeb/json/AGRO/GET_ALL_TRABAJADORES",
	type:	"GET",
	dataType: 'json',
	async: false,
	success: function(data){
		$trabajadores = data;
	}
})
$('.buttons-excel').addClass('btn btn-circle red btn-outline');
var FAENA = loadFaena();
var detalleListado;
var exportTabla = [];
var MAQ_IMPL;
function ex(){
	var doc = new jsPDF();
	doc.text(20, 20, 'Hello world.');
	doc.save('Test.pdf');
}

$("#ver").click(function(){
	listadoFilter();
});

function listadoFilter(input){
	$("#loading").show();
	var fecha_desde;
	var fecha_hasta;
	if($("#BoxFecha").val()){
		fecha_desde = formatFecha($("#BoxFecha").val());
	}
	if($("#BoxFecha2").val()){
		fecha_hasta = formatFecha($("#BoxFecha2").val());
	}
	if(fecha_desde && fecha_hasta){
		var campos = $("#BoxCampo").val();
		if(campos[0] == ""){
			campos = campos[1];
		}
		var sectores = $("#BoxSector").val();
		var especies = $("#BoxEspecie").val();
		var variedades = $("#BoxVariedad").val();
		var faenas = $("#BoxFaena").val();
		var labores = $("#BoxLabor").val();
		var trabajadores = $("#BoxTrabajador").val();
		var contra = $("#contratista").val();
		var cuartel = $("#BoxCuartel").val();
		var estado = $("#estado").val();
		//var url = "/simpleWeb/json/AGRO/GETLISTADO/"+fecha_desde+"/"+fecha_hasta+"/"+$("#BoxCampo").val()+"/"+$("#BoxSector").val()+"/"+especies+"/"+variedades+"/"+faenas+"/"+labores+"/"+trabajadores;
		var url = "/simpleWeb/json/AGRO/GETLISTADO/"+fecha_desde+"/"+fecha_hasta+"/"+campos;
		url += "/"+especies+"/"+variedades+"/"+faenas+"/"+labores+"/";
		url += trabajadores+"/"+$("#tipoTrabajador").val()+"/"+parseInt(contra)+"/"+cuartel+"/"+estado;
		var arrayMaq = [];
		console.log(macros)
		$.ajax({
			url: url,
			type:	"GET",
			dataType: 'json',
			async: true,
			success: function(data){
				console.log(data)
				exportTabla = [];	
				var tbl = "";
				if(dataTable){
					dataTable.destroy();
			        $('#tableListado').empty(); 
				}
				var datos = [];
				$.each(data, function(k,v){
					v.campo = v.descripcion;
					var maquinaria = "NO APLICA";
					var implemento = "NO APLICA";
					$.each(MAQ_IMPL, function(ka,va){
						if(parseFolio18(v.maquinaria) == va.EQUIPMENT && va.EQUICATGRY == "T"){
							v.nMaquinaria = va.DESCRIPT;
							maquinaria = va.DESCRIPT;
						}
						if(parseFolio18(v.implemento) == va.EQUIPMENT && (va.EQUICATGRY == "I" || va.EQUICATGRY == "A")){
							v.nImplemento = va.DESCRIPT;
							implemento = va.DESCRIPT;
						}
					})
					var macroco =  "NO APLICA";
					$.each(macros, function(ka,va){
						if(va.GROUPNAME == v.macroco){
							v.macroco = va.DESCRIPT; 
							macroco = va.DESCRIPT; 
						}
					})
					var auxArr = [];
					var ordenco = "NO APLICA";
					var ceco = "NO APLICA";
					if(macroco != "NO APLICA"){
						if(v.macroco == "1"){
							$.each(cecos, function(ka,va){
								if(va.COSTCENTER == v.ceco){
									ceco = va.DESCRIPT;
									v.ceco = va.DESCRIPT;
								}
							})
						}else{
							$.each(MACRO.ORDER_LIST, function(ka,va){
								if(va.ORDER == v.ordenco){
									auxArr.push(va.OBJECT_NO);
									ordenco = va.ORDER_NAME;
									v.ordenco = va.ORDER_NAME;
								}
							})
						}
					}
					if(v.cuartel != 0){
						ceco = v.nvnombre;
					}
					var base = "";
					if (v.base_piso_hora == 1){
						base = "SI";
					}else if(v.base_piso_hora == 2){
						base = "NO";
					}
					var pago = "";
					if (v.tipo_pago == 1){
						pago = "DIA";
					}else if(v.tipo_pago == 2){
						pago = "TRATO";
					}else{
						pago = "MIXTO";
					}
					var tipoTrab = "";
					var contratista = ""
					if(v.idContratista != null && v.idContratista != '' && v.idContratista != 0){
						
						tipoTrab = "CONTRATISTA";
						$.each($contratistas, function(kc,vc){
							if(vc.LIFNR*1 == v.idContratista*1){
								v.idContratista = vc.NAME1;
								contratista = vc.NAME1;
							}
						})
					} else {
						tipoTrab = "PROPIO";
					}
					var json = JSON.stringify(v);
					json = json.toUpperCase();
					json = json.split("NULL").join('""');
					v = JSON.parse(json);
					var valor_trato = v.VALOR_TRATO;// / v.RENDIMIENTO;
					if(valor_trato.toString() == "NaN"){
						valor_trato = 0;
					}
					var tbl = [
					           ""+formatFecha(v.FECHA)+"",//0
					           ""+v.SUPERVISOR+"",//1
					           ""+v.RUT+"",//2
					           ""+v.NOMBRE+"",//3
					           tipoTrab,//4
					           contratista,//5
					           v.DESCRIPCION,//6
					           v.NESPECIE,//7
					           v.NVARIEDAD,//8
					           v.NVNOMBRE,//9
					           macroco,//10
					           ordenco,//11
					           ceco,//12
					           v.NFAENA,//13
					           v.NLABOR,//14
					           //solo vista
					           formatNumber(String(v.HORAS_TRABAJADAS).split(".").join(",")),//15
					           formatNumber(String(v.HORAS_EXTRAS).split(".").join(",")),//16
					           "$ "+formatNumber(String(v.VALOR_HX).split(".").join(",")),//17
					           "$ "+formatNumber(v.RES_HX*1 + v.VALOR_HX*1),//18
					           "$ "+formatNumber(String(v.MONTO_HX).split(".").join(",")),//19
					           formatNumber(String(v.HX_DOS).split(".").join(",")),//20
					           "$ "+formatNumber(String(v.VALOR_HX_DOS).split(".").join(",")),//21
					           "$ "+formatNumber(String(v.BONO2).split(".").join(",")),//22
					           base,//23
					           pago,//24
					           "$ "+formatNumber(String(v.VALOR).split(".").join(",")),//25
					           "$ "+formatNumber(String(valor_trato).split(".").join(",")),//26
					           v.RENDIMIENTO,//27
					           "$ "+formatNumber(String(v.VALOR_RENDIMIENTO).split(".").join(",")),//28
					           "$ "+formatNumber(String(v.BONO1).split(".").join(",")),//29
					           "$ "+formatNumber(String(v.VALOR_LIQUIDO).split(".").join(",")),//30
					           "$ "+formatNumber(String(v.SUBSIDIO).split(".").join(",")),//31
					           //solo excel
					           v.HORAS_TRABAJADAS,//32
					           v.HORAS_EXTRAS,//33
					           v.VALOR_HX,//34
					           v.RES_HX*1 + v.VALOR_HX*1,//35
					           v.MONTO_HX,//36
					           v.HX_DOS,//37
					           v.VALOR_HX_DOS,//38
					           v.BONO2,//39
					           base,//40
					           pago,//41
					           v.VALOR,//42
					           parseInt(valor_trato),//43
					           v.RENDIMIENTO,//44
					           v.VALOR_RENDIMIENTO,//45
					           v.BONO1,//46
					           v.VALOR_LIQUIDO,//47
					           v.SUBSIDIO,//48
					           maquinaria,//49
					           implemento,//50
					           v.NESTADO,//51
					           "$ "+formatNumber(v.COSTO_EMPRESA), //52
					           v.COSTO_EMPRESA //53
					           ];
					datos.push(tbl);
					
				});

				detalleListado = data;
				var columnas = [{
					title: "Fecha",
					width: "120px"
				},{
					title: "Supervisor",
					width: "200px"
				},{
					title: "Rut",
					width: "120px"
				},{
					title: "Trabajador",
					width: "200px"
				},{
					title: "Tipo",
					width: "120px"
				},{
					title: "Contratista",
					width: "120px"
				},{
					title: "Fundo",
					width: "120px"
				},{
					title: "Especie",
					width: "120px"
				},{
					title: "Variedad",
					width: "120px"
				},{
					title: "Cuartel",
					width: "200px"
				},{
					title: "Agrupación",
					width: "120px"
				},{
					title: "OrdenCO",
					width: "120px"
				},{
					title: "CeCO",
					width: "200px"
				},{
					title: "Faena",
					width: "120px"
				},{
					title: "Labor",
					width: "200px"
				},{
					title: "Horas Trabajadas",
					width: "120px"
				},{
					title: "Horas Extras",
					width: "120px"
				},{
					title: "Valor Horas Extras",
					width: "120px"
				},{
					title: "Valor Pagado",
					width: "120px"
				},{
					title: "Monto Horas Extras",
					width: "120px"
				},{
					title: "Horas Extras 2",
					width: "120px"
				},{
					title: "Valor Horas Extras 2",
					width: "120px"
				},{
					title: "Bono 2",
					width: "120px"
				},{
					title: "Base Piso",
					width: "120px"
				},{
					title: "Tipo Pago",
					width: "120px"
				},{
					title: "Valor",
					width: "120px"
				},{
					title: "Valor Trato",
					width: "120px"
				},{
					title: "Rendimiento",
					width: "120px"
				},{
					title: "Valor Rendimiento",
					width: "120px"
				},{
					title: "Bono",
					width: "120px"
				},{
					title: "Valor Líquido",
					width: "120px"
				},{
					title: "Subsidio",
					width: "120px"
				},{
					title: "Horas Trabajadas",
					width: "120px"
				},{
					title: "Horas Extras",
					width: "120px"
				},{
					title: "Valor Horas Extras",
					width: "120px"
				},{
					title: "Valor Pagado",
					width: "120px"
				},{
					title: "Monto Horas Extras",
					width: "120px"
				},{
					title: "Horas Extras 2",
					width: "120px"
				},{
					title: "Valor Horas Extras 2",
					width: "120px"
				},{
					title: "Bono 2",
					width: "120px"
				},{
					title: "Base Piso",
					width: "120px"
				},{
					title: "Tipo Pago",
					width: "120px"
				},{
					title: "Valor",
					width: "120px"
				},{
					title: "Valor Trato",
					width: "120px"
				},{
					title: "Rendimiento",
					width: "120px"
				},{
					title: "Valor Rendimiento",
					width: "120px"
				},{
					title: "Bono",
					width: "120px"
				},{
					title: "Valor Líquido",
					width: "120px"
				},{
					title: "Subsidio",
					width: "120px"
				},{
					title: "Maquinaria",
					width: "120px"
				},{
					title: "Implemento",
					width: "120px"
				},{
					title: "Estado",
					width: "200px"
				},{
					title: "Costo Empresa",
					width: "200px"
				},{
					title: "Costo Empresa",
					width: "200px"
				}];
				dataTable = $('#tableListado').DataTable({
					data: datos,
					columns: columnas,
				    columnDefs : [{
				        targets: [32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48, 53],
				        visible: false,
				        searchable: true
				    },{
				    	targets: [0,1,2,3],
				    	className: "sorting_1"
				    }],
					sPaginationType: "full_numbers" ,
					filter: false,
					order: [[ 0, "desc" ]],
					scrollY: "400px",
					scrollX: true,
					scrollCollapse: true,
					paging: true,
					fixedColumns:   {
					    leftColumns: 4
					}
				});
				$('#tableListado_paginate').css('text-align','right');
				$('.buttons-excel').addClass('btn btn-circle red btn-outline');
				$('.buttons-pdf').addClass('btn btn-circle red btn-outline');
				$('#tbl_ListaAplicaciones_length').hide();
				$("#loading").hide();	
			} ,error: function(er){
				console.log(er);
				$("#loading").hide();
			}
		})	
	} else {
		$("#loading").hide();	
	}
	//$("#loading").hide();
}
var arrayCampo = [];
var arraySector = [];
var arrayEspecie = [];
var arrayVariedad = [];
var arrayFaena = [];
function loadInfo(){
	$('#tblInfo').html("");
	
	var Faena = "<option value='0'>Todos</option>";
	$.each(FAENA, function(ks, va){
		arrayFaena.push(va.codigo);
		Faena += "<option value='"+va.codigo+"'>"+va.faena+"</option>";
	})
	$("#BoxFaena").append(Faena);
}


var LABOR;
var arrayLabor = [];
function getCampos1(){
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_LABOR_ALL/",
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			LABOR = data;
			var selectLabor = "<option value='0'>Todos</option>";
			$.each(data, function(ks,va){
				arrayLabor.push(va.codigo);
				selectLabor += "<option value='"+va.codigo+"'>"+va.labor+"</option>";
			})
			$("#BoxLabor").append(selectLabor);
		}
	})
}

function cambioFaena(faena){
	var faena = $("#BoxFaena").val();
	var laborFilter = "<option value='0'>Todos</option>";
	$.each(LABOR, function(k,v){
		if(!faena || faena == 0){
			laborFilter += "<option value='"+v.codigo+"'>"+v.labor+"</option>";
		}else{
			for(var i = 0; i < faena.length; i++){
				if(faena[i] == v.faena){
					laborFilter += "<option value='"+v.codigo+"'>"+v.labor+"</option>";
				}
			}
		}
	})
	$("#BoxLabor").html(laborFilter);
}
var count = 0;
var cecos;
function cambioCampo(campo){
	var campo = $("#BoxCampo").val();
	if(!campo){
		return;
	}
	$("#loading").show();
	setTimeout(function(){
	var c = "";
	var sociedad = "";
	var sector = "";
	var campoAll = [];
	var camMaqArr = [];
	var socArr = [];
	$.each(SESION.campo, function(k,v){
		campoAll.push(v.campo);
		if(v.campo == campo){
			c = c.campos_maq;
			sociedad = v.sociedad;
			sector = v.sector;
		}
	})
	var selectEspecie = "<option value='0'>Todo</option>";
	var selectVariedad = "<option value='0'>Todo</option>";
	var selectCuartel = "<option value='0'>Todo</option>";
	var especies = [];
	var variedades = [];
	for(var i = 0; i < campo.length; i++){
		if(campo[i] == "0"){
			campo = campoAll;
			break;
		}
	}
	var sociedades = [];
	for(var i = 0; i < campo.length; i++){
		$.each(SESION.campo, function(k,v){
			if(campo[i] == v.campo){
				camMaqArr.push(v.campos_maq);
				sociedades.push(v.sociedad);
			}
		})
	}
	for(var i = 0; i < campo.length; i++){
		if(campo[i] != ""){
			var campoIn = campo[i];
			$.each(CUARTEL, function(k,v){
				if(v.campo == campoIn){
					$.each(SESION.especie, function(kb,vb){
						if(v.especie == vb.codigo && especies.indexOf(vb.codigo) == -1){
							especies.push(vb.codigo);
							selectEspecie += "<option value="+vb.codigo+">"+vb.especie+"</option>";
						}
					})
					$.each(SESION.variedad, function(kb,vb){
						if(v.variedad == vb.codigo && variedades.indexOf(vb.codigo) == -1){
							variedades.push(vb.codigo);
							selectVariedad += "<option value="+vb.codigo+">"+vb.variedad+"</option>";
						}
					})
					selectCuartel += "<option value="+v.codigo+">"+v.nombre+"</option>";
				}
			})
		}
	}
	MAQ_IMPL = $maq_imp;
	var selectContratista = "<option value='0'>Todo</option>";
//	for(var i = 0; i < sociedades.length; i++){
		$.each($contratistas, function(k,v){
//			if(sociedades[i] == v.sociedad){
				arrayContratista[parseInt(v.VENDOR_NO)] = v.NAME;
				selectContratista += "<option value="+v.LIFNR+">"+v.STCD1+" | "+v.NAME1+"</option>";
//			}
		})
//	}
	$("#contratista").html(selectContratista);
	var dato = "<option value='0'>Todos</option>";
	$.each($trabajadores, function(ks,va){
		dato += "<option value='"+va.id+"'>"+va.rut+" | "+va.nombre.toUpperCase()+"</option>";
	})
	$("#BoxTrabajador").html(dato);
	$("#BoxEspecie").html(selectEspecie);
	$("#BoxVariedad").html(selectVariedad);
	$("#BoxCuartel").html(selectCuartel);
	var gcc = "";
	var sociedad;
	var grupo;
	$.each(SESION.campo, function(k,v){
		if(campo == v.campo){
			sociedad = v.idSociedad;
			grupo = v.grupo_ceco_work;
			gcc = v.grupo_co;
			return false;
		}
	})
	
	
	cecos = $cecos;
	$("#loading").hide();
	}, 50);
}
$("#tipoTrabajador").change(function(){
	if($(this).val() == 2){
		$("#contratista").attr('disabled',false);
	} else {
		$("#contratista").val('0').trigger("change");
		$("#contratista").attr('disabled',true);
	}
});

function cambioEspecie(){
	var especie = $("#BoxEspecie").val();
	var campo = $("#BoxCampo").val();
	var variedades = [];
	var selectVariedad = "<option value='0'>Todo</option>";
	var selectCuartel = "<option value='0'>Todo</option>";
	$.each(CUARTEL, function(k,v){
		if(especie == v.especie) {
			$.each(SESION.variedad, function(kb,vb){
				if(v.variedad == vb.codigo && variedades.indexOf(vb.codigo) == -1 ){
					variedades.push(vb.codigo);
					selectVariedad += "<option value="+vb.codigo+">"+vb.variedad+"</option>";
				}
			})
			selectCuartel += "<option value="+v.codigo+">"+v.nombre+"</option>";
		}
	})
	$("#BoxVariedad").html(selectVariedad);
	$("#BoxCuartel").html(selectCuartel);
}
function cambioVariedad(){
	var campo = $("#BoxCampo").val();
	var variedad = $("#BoxVariedad").val();
	var selectCuartel = "<option value='0'>Todo</option>";
	$.each(CUARTEL, function(k,v){
		if(v.campo == campo){
			if(variedad == v.variedad) {
				selectCuartel += "<option value="+v.codigo+">"+v.nombre+"</option>";
			}
		}
	})
	$("#BoxCuartel").html(selectCuartel);
}
var arrayContratista = [];
function parseFolio18(value){
    var res="";
    if(!isNaN(parseInt(value))){
         res = ("000000000000000000" + value).slice (-18);
    }else{
        res = false;
    }
    return res;
}
function rtrnValCeco(e){
	var r = false;
	if(e[e.length-1]*1 == 6 && e[e.length-2]*1 == 1 && e != ""){
		r = true;
	}
	return r;
}
function generarExcel(){
	if(detalleListado){
		$.ajax({
			url : "/simpleWeb/json/AGRO/GENERAR_EXCEL_LISTADO/",
			type : "PUT",
			data : JSON.stringify(detalleListado),
			processData: false,
			contentType: false,
			dataType: "text",
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
			success : function(data, textStatus, jqXHR) {
				console.log(data);
				window.open("/simpleWeb/json/AGRO/DESCARGAR_EXCEL_LISTADO/"+data,"_blank");
				//alerta("Hecho")
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
	}
}