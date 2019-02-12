$(document).ready(function(){
	loadInit(dateHoy());
})
var dataTable = $('#tbl_Rendimiento').DataTable({
	paging: false,
	filter: true,
	columnDefs : [{
    	targets: [0],
    	className: "sorting_1 static-rg"
    },{
    	targets: [1],
    	className: "sorting_1 static2-rg"
    },{
    	targets: [2],
    	className: "sorting_1 static3-rg rut"
    },{
    	targets: [3],
    	className: "sorting_1 static4-rg"
    },{
    	targets: [4],
    	className: "first-col-rg"
    },{
    	targets: [8,9,10,11,12,13,14,20,21],
    	className: "trHide"
    },{
    	targets: [15,16,19],
    	className: "trHide cuartel"
    },{
    	targets: [17,18],
    	className: "trHide ceco"
    }],
	order: [[ 3, "asc" ]],
	scrollCollapse: true,
});
$("#tbl_Rendimiento_filter").hide();
$('#buscador').on( 'keyup', function () {
	dataTable.search( this.value ).draw();
} );
var trabs = [];
var LABOR_GENERAL;
var tipo_pago_global;
var hora_precio = 0;
var countLabor = 1;
var hora_extra_precio = 0;
var sueldo_base;
var cuadrillaSeleccionada;
var rendimiento;
var datosGenerales;
var datosTrab;
var CUARTEL = getCuartel();
var jsonRendimientoDiario = [];
var dataR_D;
var valorXhora;
var basePiso;
var tipos_cargosJson = []; 
var MAQ_IMPL;
var tipo_pago = [{
	codigo: 2,
	descripcion: "Trato"
},{
	codigo: 1,
	descripcion: "Dia"
},{
	codigo: 3,
	descripcion: "Mixto"
}];
var base_pisoArray = [{
	codigo: 1,
	descripcion: "Trato"
},{
	codigo: 2,
	descripcion: "Dia"
}];
var aux = 0;
var valor_general;
var subsidio;
var CAMPO;
var NOMBRECAMPO;
var horasMes;
var MACRO;
var tipo_dia;
var codigo_rg;
function loadInit(fecha){
	loading.show();
	var data = rendimiento_rg;
	console.log(data)
	var day;
	var fecha = data.rendimiento_general[0].fecha;
	day = new Date(fecha);
	day = day.getDay();
	if(day == 0 || day == 1 || day == 2 || day == 3 || day == 4){
		tipo_dia = 0;
	}else{
		tipo_dia = 1;
	}
	fecha = fecha.split("-");
	fecha = fecha[0]+""+fecha[1];
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_HORAS_MES/"+fecha*1,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			horasMes = data;
		}
	})
	dataR_D = data.rd;
	datosGenerales = data;
	datosTrab = data.trab;
	rendimiento = data.rendimiento_general[0];
	valorXhora = rendimiento.valor_x_hora.toFixed(0)*1;
	if(rendimiento.base_piso_dia != 0){
		basePiso = 1;
	}else{
		basePiso = 2;
	}
	if(rendimiento.cuartel == 0){
		$.ajax({
			url: IPSERVERSAP+"JSON_BAPI_INTERNALORDER_GETLIST.aspx?TIPO=Z600",
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				MACRO = data;
			}
		})
	}
	codigo_rg = rendimiento.codigo;
	returnCampo(rendimiento.campo);
	tipo_pago_global = rendimiento.tipo_pago;
	var fecha = rendimiento.fecha.split(" ");
	valor_general = rendimiento.valor;
	var body_Datos_Comunes = "";
	body_Datos_Comunes += 	"<tr>";
	body_Datos_Comunes += 		"<td>"+rendimiento.nsupervisor+"</td>";
	body_Datos_Comunes += 		"<td>"+rendimiento.campo+"</td>";
	body_Datos_Comunes += 		"<td class='cuartel'>"+tblEspecie(rendimiento.especie)+"</td>";
	body_Datos_Comunes += 		"<td class='cuartel'>"+tblVariedad(rendimiento.variedad)+"</td>";
	body_Datos_Comunes += 		"<td class='cuartel'>"+tblCuartel(rendimiento.cuartel)+"</td>";
	if(rendimiento.ceco){
		body_Datos_Comunes += 		"<td class='ceco'>"+rendimiento.ceco+"</td>";
	}else{
		body_Datos_Comunes += 		"<td class='ceco'>"+rendimiento.ordenco+"</td>";
	}
	body_Datos_Comunes += 		"<td>"+tblFaena(rendimiento.faena)+"</td>";
	body_Datos_Comunes += 		"<td id='labor'></td>";
	body_Datos_Comunes += 		"<td>"+formatFecha(fecha[0])+"</td>";
	body_Datos_Comunes += 		"<td><input type='text' min='0' onkeyup='cambiarValorGeneral(this)' value='"+formatNumber(rendimiento.valor)+"' class='form-control input-sm number' id='valor_general'></td>";
	body_Datos_Comunes += 		"<td>"+formatNumber(rendimiento.base_piso_dia)+"</td>";
	body_Datos_Comunes += 		"<td>"+rendimiento.horas+"</td>";
	body_Datos_Comunes += 	"</tr>";
	$("#body_Datos_Comunes").html(body_Datos_Comunes);
	$("#valorth").append("<div class='input-icon input-icon-sm'><i class='fa fa-usd'></i><input type='text' min='0' onkeyup='valorXAll(this);' class='form-control input-sm number' id='valor'></div>");
	$("#hxth").append("<input type='text' min='0' onkeyup='horasXAll(this);' class='form-control input-sm number' id='hx'>");
	$("#bonoth").append("<div class='input-icon input-icon-sm'><i class='fa fa-usd'></i><input type='text' min='0' onkeyup='bonoAll(this);' class='form-control input-sm number' id='bono'></div>");
	$("#hx2th").append("<input type='text' min='0' onkeyup='hx_dosAll(this);' class='form-control input-sm number' id='hx_dos'>");
	$("#bono2th").append("<div class='input-icon input-icon-sm'><i class='fa fa-usd'></i><input type='text' min='0' onkeyup='bono_dosAll(this);' class='form-control input-sm number' id='bono_dos'></div>");
	$.each(data.trab, function(k,v){
		if(trabs.indexOf(v) == -1){
			trabs.push(v);
		}
	})
	var c = "";
	console.log(rendimiento)
	$.each(SESION.campo, function(k,v){
		if(rendimiento.campo == v.descripcion){
			CAMPO = v.campo;
			c = v.campos_maq;
		}
	})
	$.each(SESION.campo, function(k,v){
		if(v.campo == CAMPO){
			c = v.campos_maq;
			return false;
		}
	})
	console.log(IPSERVERSAP + "/JSON_BAPI_EQUI_GETLIST.aspx?CENTRO="+c)
	$.ajax({
		url: IPSERVERSAP + "/JSON_BAPI_EQUI_GETLIST.aspx?CENTRO="+c,//ZREP
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			console.log(data)
			MAQ_IMPL = data;
		}
	})
	$.each(trabs, function(kTrab, vTrab){
		//TODO
		var valor_hx = vTrab.hx.toFixed(0);
		var jsonCargos = {
			codigo: aux,
			cargo: "",
			sueldo: rendimiento.base_piso_dia / rendimiento.horas,
			labor: "",
			rebaja: 0,
			rut: vTrab.rut,
			id_ficha: vTrab.cargo,
			cargo_ficha: "Ficha",
			sueldo_ficha: vTrab.sueldoBase
		}
		tipos_cargosJson.push(jsonCargos);
		var valorLiquidoInicial = 0;
		if(rendimiento.base_piso_dia == 0){
			valorLiquidoInicial = vTrab.sueldoDiario;
		}else{
			valorLiquidoInicial = rendimiento.base_piso_dia;
		}
		var tbl = "";
		var horas_extras = 0;
		$("#maquinaria"+aux).html(getMaquinaria(CAMPO).maquinaria);
		$("#implemento"+aux).html(getMaquinaria(CAMPO).implemento);
		if(data.rd[kTrab].codigo == 0){
			$("#hx_dos"+aux).val(formatNumber(String(data.rd[kTrab].horas_extras).split(".").join(",")));
			$("#horas_extras"+aux).val(formatNumber(String(data.rd[kTrab].horas_extras).split(".").join(",")));
			$("#recRendimiento").attr("disabled", true)
			$("#faena"+aux).val(rendimiento.faena).trigger("change");
			$("#labor"+aux).val(rendimiento.labor);
			$("#valor"+aux).val(formatNumber(rendimiento.base_piso_dia));
			$("#basePiso"+aux).val(1);
			if(data.rendimiento_general[0].base_piso_dia*1 == 0){
				$("#valor"+aux).val(formatNumber(data.trab[kTrab].sueldoDiario.toFixed()));
				tipos_cargosJson[aux].sueldo = data.trab[kTrab].sueldoDiario.toFixed()*1/rendimiento.horas;
				$("#basePiso"+aux).val(2);
			}
			$("#especie"+aux).val(rendimiento.especie).trigger("change");
			$("#variedad"+aux).val(rendimiento.variedad).trigger("change");
			$("#cuartel"+aux).val(rendimiento.cuartel);
			$("#macro"+aux).val(rendimiento.macro).trigger("change");
			if(rendimiento.ceco){
				$("#ceco"+aux).val(rendimiento.ceco);
			}else{
				$("#ceco"+aux).val(rendimiento.ordenco);
			}
			$("#horas_trabajadas"+aux).val(formatNumber(String(rendimiento.horas).split(".").join(",")));
			$("#tipo_pago"+aux).val(rendimiento.tipo_pago);
//			calcularValor($("#horas_trabajadas"+aux), aux);
		}else{
			var rdt = data.rd[kTrab];
			var faenaRD;
			var auxDataVariedadSelect = [];
			var zona;
			$.each(SESION.campo, function(ka,va){
				if(va.campo == CAMPO){
					zona = va.zona;
				}
			})
			var rd_trab = data.rd[kTrab];
			var urlCTM = "/simpleWeb/json/AGRO/GET_FAENA_LABOR/"+rd_trab.labor*1+"/"+zona;
			$.ajax({
				url : urlCTM,
				type : "GET",
				dataType : 'json',
				async : false,
				success : function(data) {
					$.each(FAENA, function(kz,vz){
						if(data.faena == vz.faena && zona == vz.zona){
							faenaRD = vz.codigo;
						}
					})
				}
			})
			var basePiso = data.rd[aux].base_piso_hora*1;
			if(basePiso == 2){
				if(data.rd[aux].tipo_trato*1 == 2){
					$("#btnCambio"+aux).attr("disabled", true);
					$("#valor"+aux).attr("disabled", true);
				}
			}
			if(data.rd[kTrab].valor_hx_dos == 0){
				$("#valor_hx_dos"+aux).val(formatNumber(String((vTrab.hx).toFixed(0)).split(".").join(",")));
			}else{
				$("#valor_hx_dos"+aux).val(formatNumber(String(data.rd[kTrab].valor_hx_dos).split(".").join(",")));
			}
			if(data.rd[kTrab].res_hx == 0){
				$("#valor_hx"+aux).val(formatNumber(String((vTrab.hx).toFixed(0)).split(".").join(",")));
			}else{
				$("#valor_hx"+aux).val(formatNumber(String(data.rd[kTrab].valor_hx_dos).split(".").join(",")));
			}
			$("#valor_hx"+aux).val(formatNumber(String((vTrab.hx).toFixed(0)).split(".").join(",")));
			$("#basePiso"+aux).val(basePiso);
			$("#variedad"+aux).val(data.rd[aux].variedad);
			$("#valor"+aux).val(formatNumber(data.rd[kTrab].valor));
			$("#horas_trabajadas"+aux).val(formatNumber(String(rendimiento.horas).split(".").join(",")));
			$("#valor_hx_pdo"+aux).val(formatNumber(rdt.res_hx*1 + rdt.valor_hx));
			$("#valor_hx_dos"+aux).val(formatNumber(data.rd[kTrab].valor_hx_dos));
			$("#especie"+aux).val(rdt.especie).trigger("change");
			$("#variedad"+aux).val(rdt.variedad);
			$("#cuartel"+aux).val(rdt.cuartel);
			$("#macro"+aux).val(rdt.macroco).trigger("change");
			$("#ceco"+aux).val(rdt.ceco);
			$("#faena"+aux).val(faenaRD).trigger("change");
			$("#labor"+aux).val(data.rd[aux].labor).trigger("change");
			$("#tipo_pago"+aux).val(data.rd[aux].tipo_trato*1);
			$("#rendimiento"+aux).val(formatNumber(String(data.rd[kTrab].rendimiento).split(".").join(",")));
			if(data.rd[aux].maquinaria != 0){$("#maquinaria"+aux).val(parseFolio18(data.rd[aux].maquinaria));}
			if(data.rd[aux].implemento != 0){$("#implemento"+aux).val(parseFolio18(data.rd[aux].implemento));}
			if(data.rd[aux].bus != 0){$("#bus"+aux).val(data.rd[aux].bus);}
//			calcularValor($("#horas_trabajadas"+aux), aux);
		}
		calcularValor($("#tipo_pago"+aux), aux);
		if($("#tipo_pago"+aux).val()*1 == 2 && $("#basePiso"+aux).val()*1 == 2){
			$("#btnCambio"+aux).attr("disabled", true);
		}
		aux++;
	})
	if(rendimiento.cuartel == 0){
		$(".cuartel").hide();
	}else{
		$(".ceco").hide();
	}
	realV();
	format();
	selectCss();
	activateRequiredModal()
	loading.hide();
}
function apendTabla(vTrab){
	var jsonCargos = {
		codigo: aux,
		cargo: "",
		sueldo: rendimiento.base_piso_dia / rendimiento.horas,
		rut: vTrab.rut,
		id_ficha: vTrab.cargo,
		cargo_ficha: "Ficha",
		sueldo_ficha: vTrab.sueldoBase
	}
	if(rendimiento.base_piso_dia == 0){
		jsonCargos.sueldo = vTrab.sueldoDiario / rendimiento.horas;
	}
	tipos_cargosJson.push(jsonCargos);
	var tbl = "";
	var horas_extras = 0;
	var valor_hx = vTrab.hx.toFixed(0);
	var tbl =[];
	tbl.push("<input name='check' type='checkbox' checked value='"+aux+"'title='Seleccionar' id='check"+aux+"' onchange='selectTr(this, tr"+aux+");' class='checkbox'/>");
	tbl.push("<button title='Agregar Actividad a este trabajador' onclick='apendTabla("+JSON.stringify(vTrab)+");' class='btn blue btn-outline btn-sm'><i class='fa fa-plus' aria-hidden='true'></i></button><button title='Eliminar actividad de este Trabajaddor' onclick='delActivity("+aux+");' class='btn red btn-outline btn-sm'><i class='fa fa-minus' aria-hidden='true'></i></button>");
	tbl.push(vTrab.rut.bold());
	tbl.push(vTrab.nombre.bold());
	tbl.push("<div name='divHas' id='baseDiv"+aux+"' class=''><select id='basePiso"+aux+"' style='min-width: 125px; max-width: 125px; float: left;' class='form-control input-sm' onchange='calcularValor(this, "+aux+");'><option value=''>Seleccione</option><option value='1'>Si</option><option value='2'>No</option></select></div>");
	tbl.push("<select id='tipo_pago"+aux+"' name='tippag' class='form-control input-sm' onchange='calcularValor(this, "+aux+");'>"+cargarTipoPago()+"</select>");
	tbl.push("<button style='float: right;' onclick='changeBaseBtn("+aux+");' id='btnCambio"+aux+"' class='btn blue btn-outline btn-sm'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button><input type='hidden' value="+vTrab.cargo+" id='cargo"+aux+"'>");
	tbl.push("<div name='divHas' id='hoursDiv"+aux+"' class='input-group has-feedback'><input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm has-error' id='horas_trabajadas"+aux+"' value='"+formatNumber(String(rendimiento.horas).split(".").join(","))+"'><span title='Las horas trabajadas exceden las 9 horas diarias' id='hours"+aux+"' style='display: none;' class='input-group-addon btn-sm btn btn-outline yellow'><i class='fa fa-exclamation-triangle fa-yellow' aria-hidden='true'></i></span></div>");
	tbl.push("<input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number hrx' style='min-width: 110px; max-width: 110px; float: left;' id='horas_extras"+aux+"'><a title='Ver resumen Semanal' style='color: #008000;' onclick='detalleHxSemana("+JSON.stringify(vTrab)+");'>"+formatNumber(String(vTrab.hx_semana).split(".").join(","))+"</a>");
	tbl.push("<div class='input-icon input-icon-sm'><i class='fa fa-usd'></i><input type='text' value='"+formatNumber(valor_hx)+"' readonly class='form-control input-sm number' id='valor_hx"+aux+"'></div>");
	tbl.push("<div class='input-icon input-icon-sm'><i class='fa fa-usd'></i><input type='text' class='form-control input-sm number' onblur='calcularValor(this, "+aux+");' id='valor_hx_pdo"+aux+"'></div>");
	tbl.push("<div class='input-icon input-icon-sm'><i class='fa fa-usd'></i><input type='text' readonly class='form-control input-sm number mhx' id='monto_hx"+aux+"'></div>");
	tbl.push("<input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number hx_dos' id='hx_dos"+aux+"'>");
	tbl.push("<div class='input-icon input-icon-sm'><i class='fa fa-usd'></i><input type='text' value='"+formatNumber(valor_hx)+"' class='form-control input-sm number bono_dos' id='valor_hx_dos"+aux+"'></div>");
	tbl.push("<div class='input-icon input-icon-sm'><i class='fa fa-usd'></i><input type='text' readonly min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number bono_hx_dos' id='bono_dos"+aux+"'></div>");
	tbl.push("<select id='especie"+aux+"' style='min-width: 150px; max-width: 150px;' name='esp' class='form-control input-sm' onchange='changeEspecie(this.value,"+aux+");'>"+loadEspecie()+"</select>");
	tbl.push("<select id='variedad"+aux+"' style='min-width: 150px; max-width: 150px;' name='varie' class='form-control input-sm' onchange='changeVariedad(this.value, "+aux+");'></select>");
	tbl.push("<select id='macro"+aux+"' style='min-width: 150px; max-width: 150px;' name='esp' class='form-control input-sm' onchange='selectMacro(this,"+aux+");'>"+loadMacros()+"</select>");
	tbl.push("<select id='ceco"+aux+"' style='min-width: 150px; max-width: 150px;' name='esp' class='form-control input-sm'></select>");
	tbl.push("<select id='cuartel"+aux+"' style='min-width: 150px; max-width: 150px;' name='cuar' class='form-control input-sm' ></select>");
	tbl.push("<select id='faena"+aux+"' style='min-width: 150px; max-width: 150px;' name='fae' class='form-control input-sm' onchange='cambioFaena(this.value,"+aux+");'>"+cargarFaena()+"</select>");
	tbl.push("<select id='labor"+aux+"' style='min-width: 150px; max-width: 150px;' name='lab' class='form-control input-sm' onchange='changeLabor(this.value, "+aux+");'></select>");
	tbl.push("");
	tbl.push("<div name='divHas' id='val"+aux+"' class='input-icon input-icon-sm'><i class='fa fa-usd'></i><input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number valor' value='' id='valor"+aux+"'></div>");
	tbl.push("<div name='divHas' id='rend"+aux+"' class=''><input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' onkeydown='mover(event, this, "+aux+")' class='form-control input-sm number rendimiento' id='rendimiento"+aux+"'></div>");
	tbl.push("<div class='input-icon input-icon-sm'><i class='fa fa-usd'></i><input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number' id='valor_rendimiento"+aux+"' readonly></div>");
	tbl.push("<div class='input-icon input-icon-sm'><i class='fa fa-usd'></i><input type='text' min='0' onkeyup='calcularValor(this, "+aux+");' class='form-control input-sm number bono' id='bono"+aux+"'></div>");
	tbl.push("<div name='divHas' id='val_liq"+aux+"' class='input-icon input-icon-sm'><i class='fa fa-usd'></i><input type='text' min='0' readonly class='form-control input-sm number required liquido' id='valor_liquido"+aux+"'></div>");
	tbl.push("<select id='maquinaria"+aux+"' style='min-width: 150px; max-width: 150px;' onchange='cambiarColor(this)' class='form-control input-sm'>"+getMaquinaria(CAMPO).maquinaria+"</select>");
	tbl.push("<select id='implemento"+aux+"' style='min-width: 150px; max-width: 150px;' onchange='cambiarColor(this)' class='form-control input-sm'>"+getMaquinaria(CAMPO).implemento+"</select>");
	tbl.push("<select id='bus"+aux+"' style='min-width: 150px; max-width: 150px;' class='form-control input-sm'>"+getRecorrido(CAMPO)+"</select>");
	var rowNode = dataTable.row.add(tbl).node().id = aux;;
	dataTable.draw( false )
//	window.location.href = ("#"+aux);
	$("#"+aux).addClass("success");
	$("#faena"+aux).val(rendimiento.faena).trigger("change");
	$("#labor"+aux).val(rendimiento.labor).trigger("change");
	$("#especie"+aux).val(rendimiento.especie).trigger("change")
	$("#variedad"+aux).val(rendimiento.variedad).trigger("change");
	$("#cuartel"+aux).val(rendimiento.cuartel).trigger("change");
	$("#macro"+aux).val(rendimiento.macro).trigger("change");
	$("#ceco"+aux).val(rendimiento.ceco);
	datosTrab.push(vTrab);
	trabs.push(vTrab);
	if(datosGenerales.rendimiento_general[0].base_piso_dia == 0){
		$("#basePiso"+aux).val(2);
		$("#valor"+aux).val(formatNumber(vTrab.sueldoDiario));
	}else{
		$("#basePiso"+aux).val(1);
		$("#valor"+aux).val(formatNumber(datosGenerales.rendimiento_general[0].base_piso_dia));
		
	}
	calcularValor($("#horas_trabajadas"+aux), aux);
	$("#tipo_pago"+aux).val(datosGenerales.rendimiento_general[0].tipo_pago);
	calcularValor($("#horas_trabajadas"+aux), aux);
	if($("#tipo_pago"+aux).val()*1 == 2 && $("#basePiso"+aux).val()*1 == 2){
		$("#btnCambio"+aux).attr("disabled", true);
	}
	format();
	cleanRut();
	selectCss();
	realV();
	$("#"+aux).focus();
	$("#horas_trabajadas"+aux).focus();
	activarEfectoAddRow(aux);
	aux++;
	if(rendimiento.cuartel == 0){
		$(".cuartel").hide();
	}else{
		$(".ceco").hide();
	}
}
function activarEfectoAddRow(id){
	setTimeout(function() {
		$("#"+id).addClass( "success", 1000, callBAck(id) );
	}, 100);
}
function callBAck(id){
	setTimeout(function() {
		$( "#"+id ).removeClass( "success",1000 );
	}, 1500);
}
function loadMacros(){
	var macros = "<option value=''></option>";
	if(rendimiento.cuartel == 0){
		var gcc = "";
		$.each(SESION.campo, function(k,v){
			if(rendimiento.campo == v.descripcion){
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
						var e = v.GROUPNAME;
						if((e[e.length-1]*1 == 1 || e[e.length-1]*1 == 2) && e[e.length-2]*1 == 0){
							macros += "<option value='"+v.GROUPNAME+"'>"+v.DESCRIPT+"</option>";
						}
					})
				}
			})
		});
		macros += "<option value='1'>OTROS CENTRO DE COSTO</option>";
	}
	return macros;
}
function selectMacro(input, id){
	if(rendimiento.cuartel == 0){
		var ordenco = "<option value=''></option>"; 
		var campo = CAMPO;
		var sector;
		var cecoCuartel = [0];
		$.each(CUARTEL, function(k,v){
			if(v.campo == campo){
				cecoCuartel.push(v.ordenco);
			}
		})
		var auxArr = [];
		$.each(MACRO.ORDER_LIST, function(k,v){
			if(v.ORDER.indexOf(input.value) != -1 && auxArr.indexOf(v.OBJECT_NO) == -1 && !rtrnValCeco(v.OBJECT_NO)){
				auxArr.push(v.OBJECT_NO);
				ordenco += "<option value="+v.ORDER+">"+v.ORDER_NAME+"</option>";
			}
		})
		if(input.value*1 == 1){
			var sociedad;
			var grupo;
			$.each(SESION.campo, function(k,v){
				if(v.campo == campo){
					sociedad = v.idSociedad;
					grupo = v.grupo_ceco_work;
					return false;
				}
			})
			$.ajax({
				url: IPSERVERSAP+"JSON_BAPI_COSTCENTER_GETLIST1.aspx?SOCIEDAD="+sociedad+"&GRUPO="+grupo,
				type:	"GET",
				dataType: 'json',
				async: false,
				success: function(data){
					CECO = "<option value=''></option>";
					$.each(data.COSTCENTERLIST, function(k,v){
						CECO += "<option value="+v.COSTCENTER+">"+v.DESCRIPT+"</option>";
					})
					$("#ceco"+id).html(CECO);
				}
			})
			$("#ceco"+id).append(CECO);
		}else{
			$("#ceco"+id).html(ordenco);
		}
	}
}
function rtrnValCeco(e){
	var r = false;
	if(e[e.length-1]*1 == 6 && e[e.length-2]*1 == 1 && e != ""){
		r = true;
	}
	return r;
}
function hx_dosAll(input){
	var bono = $(".hx_dos");
	for(var i = 0; i < bono.length; i++){
		var id = $(bono[i])[0].id.split("dos");
		id = id[1];
		if($("#check"+id)[0].checked == true ){
			$(bono[i]).val(formatNumber(input.value));
			calcularValor($(bono[i]), id);
		}
	}
}
function detalleHxSemana(v){
	$.ajax({
		url: "/simpleWeb/json/AGRO/GET_DETALLE_HX_SEMANA/?TRABAJADOR="+v.idTrabajador+"&FECHA="+rendimiento.fecha,
		type:	"GET",
		dataType: 'json',
		async: false,
		success: function(data){
			var semana = [1,2,3,4,5,6,7];
			var pop = "";
			pop +=	"<div class='table-responsive'>";
			pop +=		"<table class='table table-bordered table-hover table-striped table-condensed' id='tbl_Datos_Comunes'>";
			pop +=			"<thead>";
			pop +=				"<tr>";
			pop +=					"<th>Domingo</th>";
			pop +=					"<th>Lunes</th>";
			pop +=					"<th>Martes</th>";
			pop +=					"<th>Miercoles</th>";
			pop +=					"<th>Jueves</th>";
			pop +=					"<th>Viernes</th>";
			pop +=					"<th>Sabado</th>";
			pop +=					"<th>Total Actual</th>";
			pop +=					"<th>Maximo Restante</th>";
			pop +=				"</tr>";
			pop +=			"</thead>";
			pop +=			"<body id='bodyValores'>";
			pop +=				"<tr>";
			for(var i = 0; i < semana.length; i++){
				if(data[i] && data[i].codigo == i+1){
					pop +=			"<td>"+data[i].horas_extras+"</td>";
				}else{
					pop +=			"<td>0</td>";
				}
			}
			pop +=					"<td>"+formatNumber(String(v.hx_semana).split(".").join(","))+"</td>";
			pop +=					"<td>"+formatNumber(String(12-v.hx_semana).split(".").join(","))+"</td>";
			pop +=				"</tr>";
			pop +=			"</body>";
			pop +=		"</table>";
			pop +=	'</div>';
			pop += 	"<div style='text-align: center;'>";
			pop += 		"<a id='confirmBase' class='btn green-dark submit-modal'onclick='closeModal()'>Aceptar</a>";
			pop += 	"</div>";
			popUp("Detalle Horas Extras "+v.nombre.toUpperCase(), pop, true, "650px", true);
		},error: function(er){
			console.log(er);
		}
	})
}
function realV(){
	if(realView){
		$(".trHide").hide();
	}else{
		$(".trHide").show();
	}
	if(rendimiento.cuartel == 0){
		$(".cuartel").hide();
	}else{
		$(".ceco").hide();
	}
}
var viewCount = 1;
var realView = true;
function trShow(){
	if(viewCount == 1){
		$("#aShow").html("<i class='fa fa-caret-left' aria-hidden='true'></i>");
		var selectedEffect = "slide";
		var options = {
			direction: "left"
		}
		$(".trHide").show(selectedEffect, options, 500, callback);
		realView = false;
		viewCount = 0;
	}else{
		$("#aShow").html("<i class='fa fa-caret-right' aria-hidden='true'></i>");
		var selectedEffect = "slide";
		var options = {
			direction: "left"
		}
		$(".trHide").hide(selectedEffect, options, 500, callback);
		realView = true;
		viewCount = 1;
	}
	setTimeout(function(){
		if(rendimiento.cuartel == 0){
			$(".cuartel").hide();
		}else{
			$(".ceco").hide();
		}
	}, 501);
	
}
function callback() {
	setTimeout(function() {
		$("#effect:visible").removeAttr("style").fadeOut();
	}, 1000);
};
function getRecorrido(campo){
	var recorrido = "<option value=''>Seleccione</option>";;
	$.ajax({
		url : "/simpleWeb/json/AGRO/GET_RECORRIDO_CAMPO/"+campo,
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			if(data.length == 0){
				recorrido = "<option value='0'>Sin Bus</option>";;
			}
			$.each(data, function(k,v){
				recorrido += "<option value='"+v.id_recorrido+"'>"+v.detalle+"</option>";
			})
		}
	})
	return recorrido;
}
function changeBaseBtn(id){
	var basePiso = $("#basePiso"+id).val();
	var baseSueldo = "";
	baseSueldo +=	"<div class='table-responsive'>";
	baseSueldo +=		"<table class='table table-bordered table-hover table-striped table-condensed' id='tbl_Datos_Comunes'>";
	baseSueldo +=			"<thead>";
	baseSueldo +=				"<tr>";
	baseSueldo +=					"<th>#</th>";
	baseSueldo +=					"<th>Tipo Trabajo</th>";
	baseSueldo +=					"<th>Sueldo Mensual</th>";
	baseSueldo +=				"</tr>";
	baseSueldo +=			"</thead>";
	baseSueldo +=			"<body id='bodyValores'>"+loadTipos_Pago(id)+"</body>";
	baseSueldo +=		"</table>";
	baseSueldo +=	'</div>';
	baseSueldo += 	"<div style='text-align: center;'>";
	baseSueldo += 		"<a class='btn green-dark submit-modal' id='confirmBase"+id+"' onclick='calcularValor(this, "+id+")'>Aceptar</a>";
	baseSueldo += 		"<a class='btn red' onclick='cancelAddPisoDia("+id+");'>Cancelar</a>";
	baseSueldo += 	"</div>";
	popUp("Base Sueldo", baseSueldo, true, "450px", true);
	format();
	$(".selectBase"+id).click(function(){
		var json = JSON.parse($(this).val());
		if(json.id != 0){
			$("#otro"+id).val("");
			$("#otro"+id).removeClass("required-modal");
			$("#otro"+id).attr("disabled", true);
			validateModal();
		}else{
			$("#otro"+id).attr("disabled", false);
			$("#otro"+id).addClass("required-modal");
		}
	})
}
var cargos;
function loadTipos_Pago(id){
	//TODO
	var cargosAux = [];
	var tBody = "";
	$.ajax({
		url : "/simpleWeb/json/AGRO/GETSUELDOSCARGO/"+CAMPO,
		type : "GET",
		dataType : 'json',
		async : false,
		success : function(data) {
			$.each(data, function(k,v){
				cargosAux.push(v);
			})
		}
	})
	var valor = $("#valor"+id).val().replace(".", "")*1;
	cargos = cargosAux;
	var auxCargoData;
	$.each(tipos_cargosJson, function(k,v){
		if(v.codigo == id){
			auxCargoData = v.cargo;
		}
	})
	var json = {
		id: 0,
		campo: '',
		cargo: 'Otro',
		sueldo: 0
	}
	$.each(tipos_cargosJson, function(k,v){
		if(v.codigo == id){
			var arr = {
				id: v.id_ficha,
				campo: '',
				cargo: v.cargo_ficha,
				sueldo: v.sueldo_ficha
			}
//			cargosAux.push(arr);
		}
	})
	cargosAux.push(json);
	$.each(cargosAux, function(k,v){
		var classDisabled = "disabledbutton";
		if(v.sueldo != 0){
			classDisabled = "";
		}
		if(v.sueldo != 0){
			if($("#cargo"+id).val()*1 == v.id){
				tBody += "<tr class='"+classDisabled+"'>";
				tBody += 	"<td><div class='form-check'><input class='form-check-input selectBase"+id+"' type='radio' checked value='"+JSON.stringify(v)+"' id='baseSelect"+id+"' name='optvalor"+id+"'><label class='form-check-label' for='baseSelect"+id+"'></label></div></td>";
				tBody += 	"<td>"+v.cargo.bold()+"</td>";
				tBody += 	"<td>$ "+formatNumber(v.sueldo.toFixed(0)).fontcolor("red")+"</td>";
				tBody += "</tr>";
			}else{
				tBody += "<tr class='"+classDisabled+"'>";
				tBody += 	"<td><div class='form-check'><input class='form-check-input selectBase"+id+"' type='radio' value='"+JSON.stringify(v)+"' id='baseSelect"+id+"' name='optvalor"+id+"'><label class='form-check-label' for='baseSelect"+id+"'></label></div></td>";
				tBody += 	"<td>"+v.cargo.bold()+"</td>";
				tBody += 	"<td>$ "+formatNumber(v.sueldo.toFixed(0)).fontcolor("red")+"</td>";
				tBody += "</tr>";
			}
		}
	})
	var otro = "otro";
	var check = "";
	if($("#cargo"+id).val()*1 == 0){
		check = "checked";
	}
	tBody += "<tr id='tr_otro'>";
	tBody += 	"<td><div class='form-check'><input class='form-check-input selectBase"+id+"' "+check+" type='radio' value='"+JSON.stringify(cargos[cargos.length-1])+"' id='baseSelect"+id+"' name='optvalor"+id+"'><label class='form-check-label' for='baseSelect'></label></div></td>";
	tBody += 	"<td>"+otro.bold()+"</td>";
	tBody += 	"<td><div class='input-icon input-icon-sm'><i class='fa fa-usd'></i><input type='text' class='form-control input-sm number' id='otro"+id+"'></div></td>";
	tBody += "</tr>";
	return tBody;
}
function returnCampo(campo){
	$.each(SESION.campo, function(k,v){
		if(v.descripcion == campo){
			CAMPO = v.campo;
		}
	})
}
function cambiarValorGeneral(input){
	valor_general = formatNumberDB(input.value);
	var rend = $(".rendimiento");
	$(".rendimiento").each(function(){
		var id = $(this)[0].id.split("dimiento")
		id = id[1];
		if($("#check"+id)[0].checked == true && $("#rendimiento"+id)[0].disabled == false){
			format();
			calcularValor($(this), id);
		}
	})
}
function valorXAll(input){
	var hrx = $(".valor");
	$(".valor").each(function(){
		var id = $(this)[0].id.split("lor"),
		id = id[1];
		if($("#check"+id)[0].checked == true && $("#valor"+id)[0].disabled == false){
			format();
			$(this).val(formatNumber(input.value));
			calcularValor($(this), id);
		}
	})
}
function horasXAll(input){
	var hrx = $(".hrx");
	for(var i = 0; i < hrx.length; i++){
		var id = $(hrx[i])[0].id.split("tras");
		id = id[1];
		if($("#check"+id)[0].checked == true ){
			format();
			$(hrx[i]).val(formatNumber(input.value));
			calcularValor($(bono[i]), id);
		}
	}
}
function bonoAll(input){
	var bono = $(".bono");
	for(var i = 0; i < bono.length; i++){
		var id = $(bono[i])[0].id.split("no");
		id = id[1];
		if($("#check"+id)[0].checked == true ){
			format();
			$(bono[i]).val(formatNumber(input.value));
			calcularValor($(bono[i]), id);
		}
	}
}
function bono_dosAll(input){
	var bono = $(".bono_dos");
	for(var i = 0; i < bono.length; i++){
		var id = $(bono[i])[0].id.split("dos");
		id = id[1];
		if($("#check"+id)[0].checked == true ){
			$(bono[i]).val(formatNumber(input.value));
			calcularValor($(bono[i]), id);
		}
	}
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
function delActivity(id){
	var c = confirmar.confirm("Desea Eliminar esta Actividad");
	$(c.aceptar).click(function(){
		for(var i = 0; i < datosTrab.length; i++){
			if(i == id){
				$("#"+id).remove();
				datosTrab[id] = [];
			}
		}
	})
}
function asignarRendimiento(){
	loading.show();
	setTimeout(function(){ 
	var count = 0;
	var x = 0;
	jsonRendimientoDiario = [];
	updJsonRendimientoDiario = [];
	delRD = [];
	$.each(datosTrab, function(ka,va){
		if(va.idTrabajador != 0){
			x++;
		}
	})
	var arrJsonValidate = [];
	var validarTabla = true;
	$.each(datosTrab, function(k,v){
		if(v.length != 0){
			var message = "";
			var e = 0;
			if(!$("#basePiso"+k).val()){
				$("#baseDiv"+k).addClass("has-error");
				e++;
				message += "<td>"+e+".- Base Piso Dia <br></td>";
			}
			if(!$("#horas_trabajadas"+k).val() || $("#horas_trabajadas"+k).val() == 0){
				$("#hoursDiv"+k).addClass('has-error');
				e++;
				message += ""+e+".- Horas Trabajadas <br>";
			}if(!$("#especie"+k).val() && rendimiento.cuartel != 0){
				e++;
				message += ""+e+".- Especie <br>";
			}if(!$("#variedad"+k).val() && rendimiento.cuartel != 0){
				e++;
				message += ""+e+".- Variedad <br>";
			}if(!$("#cuartel"+k).val() && rendimiento.cuartel != 0){
				e++;
				message += ""+e+".- Cuartel <br>";
			}if(!$("#labor"+k).val()){
				e++;
				message += ""+e+".- Labor <br>";
			}if(!$("#tipo_pago"+k).val() && $("#tipo_pago"+k)[0].disabled == false){
				$("#hoursDiv"+k).addClass('has-error');
				e++;
				message += ""+e+".- Tipo de Pago <br>";
			}
			switch($("#basePiso"+k).val()*1){
			case 1:
				if(!$("#valor"+k).val() || $("#valor"+k).val() == 0){
					$("#val"+k).addClass('has-error');
					e++;
					message += ""+e+".- Valor <br>";
				}
				break;
			case 2:
				if($("#tipo_pago"+k).val()*1 == 1){
					if(!$("#valor"+k).val() || $("#valor"+k).val() == 0){
						$("#val"+k).addClass('has-error');
						e++;
						message += ""+e+".- Valor <br>";
					}
				}else{
					$("#val"+k).removeClass('has-error');
				}
				break;
			default:
				break;
			}
			var validateLaborRend = validateLaborWithRend($("#labor"+k).val(), k);
			if(validateLaborRend == 1 || validateLaborRend == 2){
				if($("#rendimiento"+k).val() == 0 || !$("#rendimiento"+k).val()){
					$("#rend"+k).addClass('has-error');
					message += ""+e+".- Rendimiento <br>";
				}
			}
			if(!$("#valor_liquido"+k).val() || $("#valor_liquido"+k).val() == 0){
				$("#val_liq"+k).addClass('has-error');
				e++;
				message += ""+e+".- Valor Liquido <br>";
			}if(validarLaborCampo($("#faena"+k).val(), $("#labor"+k).val()) == 1 && !$("#maquinaria"+k).val()){
				$("#maquinaria"+k).removeClass("blue");
				$("#maquinaria"+k).addClass("red");
				$("#implemento"+k).removeClass("blue");
				$("#implemento"+k).addClass("red");
				e++;
				message += ""+e+".- Maquinaria <br>";
			}if(message != ""){
				validarTabla = false;
			}else{}
		}else{
			if(dataR_D[k]){
				delRD.push({codigo: dataR_D[k].codigo, rut: tipos_cargosJson[k].rut, codigo_rg: rendimiento.codigo*1});
				count++;
			}
		}
	})
	if(validarTabla){
		$.each(datosTrab, function(k,v){
			if(dataR_D[k] != undefined && dataR_D[k].codigo != 0){
				if(v.length != 0){
					var baseCargo = ($("#valor"+k).val().split(".").join(""))*1;
					var baseFicha = parseInt(v.sueldoDiario)/9*(($("#horas_trabajadas"+k).val().split(".").join(""))*1);
					var bono_produccion = parseInt($("#valor_liquido"+k).val().split(".").join("")) - baseCargo;
					var bono_cargo = parseInt(baseCargo) - parseInt(baseFicha);
					if(bono_cargo < 0) {
						bono_cargo = 0;
					}
					if(bono_produccion < 0) {
						bono_produccion = 0;
					}
					var updJson = {
						codigo: dataR_D[k].codigo*1,
						trabajador: v.idTrabajador*1,
						base_piso_hora: ($("#basePiso"+k).val())*1,
						subsidio: 0,
						labor: ($("#labor"+k).val())*1,
						valor: formatNumberDB($("#valor"+k).val()),
						tipo_trato: ($("#tipo_pago"+k).val())*1,
						rendimiento: formatNumberDB($("#rendimiento"+k).val()),
						valor_rendimiento: formatNumberDB($("#valor_rendimiento"+k).val()),
						horas_trabajadas: formatNumberDB($("#horas_trabajadas"+k).val())*1,
						horas_extras: formatNumberDB($("#horas_extras"+k).val())*1,
						bono1: formatNumberDB($("#bono"+k).val()),
						bono2: formatNumberDB($("#bono_dos"+k).val()),
						valor_liquido: formatNumberDB($("#valor_liquido"+k).val()),
						maquinaria: ($("#maquinaria"+k).val())*1,
						implemento: ($("#implemento"+k).val())*1,
						bus: ($("#bus"+k).val())*1,
						estado: 8,
						codigo_rg: rendimiento.codigo*1,
						cargo: $("#cargo"+k).val(),
						idContratista: v.idContratista,
						bonoCargo: bono_cargo,
						bonoProduccion: bono_produccion,
						baseFicha:baseFicha,
						baseCargo:baseCargo,
						fecha: rendimiento.fecha
					}
					var valor_hx = formatNumberDB($("#valor_hx"+k).val());
					if($("#horas_extras"+k).val()){
						updJson.valor_hx = formatNumberDB($("#valor_hx"+k).val());
						updJson.monto_hx = formatNumberDB($("#monto_hx"+k).val());
						if($("#valor_hx_pdo"+k).val()){
							updJson.res_hx = formatNumberDB($("#valor_hx_pdo"+k).val()) - valor_hx;
						}
					}
					if($("#hx_dos"+k).val()){
						updJson.hx_dos = formatNumberDB($("#hx_dos"+k).val());
						updJson.valor_hx_dos = formatNumberDB($("#valor_hx_dos"+k).val());
					}
					if($("#tipo_pago"+k).val()*1 == 2){
						updJson.subsidio = rendimiento.base_piso_dia - ($("#valor_rendimiento"+k).val().split(".").join(""))*1;
						if(updJson.subsidio < 0){
							updJson.subsidio = 0;
						}
					}
					if(updJson.idContratista == "" || updJson.idContratista == null){
						updJson.idContratista = 0;
					}
					if(JSON.stringify(dataR_D[k]) != JSON.stringify(updJson)){
						updJsonRendimientoDiario.push(updJson);
					}
					if(rendimiento.cuartel == 0){
						updJson.macroco = $("#macro"+k).val();
						if($("#macro"+k).val()*1 == 1){
							updJson.ceco = $("#ceco"+k).val();
						}else{
							updJson.ordenco = $("#ceco"+k).val();
						}
					}else{
						updJson.cuartel = $("#cuartel"+k).val();
					}
					count++;
				}
			}else{
				if(v.length != 0){
					var baseCargo = ($("#valor"+k).val().split(".").join(""))*1;
					var baseFicha = parseInt(v.sueldoDiario)/9*(($("#horas_trabajadas"+k).val().split(".").join(""))*1);
					var bono_produccion = parseInt($("#valor_liquido"+k).val().split(".").join("")) - baseCargo;
					var bono_cargo = parseInt(baseCargo) - parseInt(baseFicha);
					if(bono_cargo < 0) {
						bono_cargo = 0;
					}
					if(bono_produccion < 0) {
						bono_produccion = 0;
					}
					var json = {
						codigo: 0,
						trabajador: v.idTrabajador,
						base_piso_hora: $("#basePiso"+k).val(),
						subsidio: 0,
						labor: $("#labor"+k).val(),
						valor: formatNumberDB($("#valor"+k).val()),
						tipo_trato: ($("#tipo_pago"+k).val())*1,
						rendimiento: formatNumberDB($("#rendimiento"+k).val()),
						valor_rendimiento: formatNumberDB($("#valor_rendimiento"+k).val()),
						horas_trabajadas: formatNumberDB($("#horas_trabajadas"+k).val())*1,
						horas_extras: formatNumberDB($("#horas_extras"+k).val())*1,
						bono1: formatNumberDB($("#bono"+k).val()),
						bono2: formatNumberDB($("#bono_dos"+k).val()),
						valor_liquido: formatNumberDB($("#valor_liquido"+k).val()),
						maquinaria: $("#maquinaria"+k).val(),
						implemento: $("#implemento"+k).val(),
						bus: $("#bus"+k).val(),
						estado: 8,
						codigo_rg: rendimiento.codigo,
						cargo: $("#cargo"+k).val(),
						idContratista: v.idContratista,
						bonoCargo: bono_cargo,
						bonoProduccion: bono_produccion,
						baseFicha:baseFicha,
						baseCargo:baseCargo,
						fecha: rendimiento.fecha
					}
					var valor_hx = formatNumberDB($("#valor_hx"+k).val());
					if($("#horas_extras"+k).val()){
						json.valor_hx = formatNumberDB($("#valor_hx"+k).val());
						json.monto_hx = formatNumberDB($("#monto_hx"+k).val());
						if($("#valor_hx_pdo"+k).val()){
							json.res_hx = formatNumberDB($("#valor_hx_pdo"+k).val()) - valor_hx;
						}
					}
					if($("#hx_dos"+k).val()){
						json.hx_dos = formatNumberDB($("#hx_dos"+k).val());
						json.valor_hx_dos = formatNumberDB($("#valor_hx_dos"+k).val());
					}
					if($("#tipo_pago"+k).val()*1 == 2){
						json.subsidio = rendimiento.base_piso_dia - ($("#valor_rendimiento"+k).val().split(".").join(""))*1;
						if(json.subsidio < 0){
							json.subsidio = 0;
						}
					}
					if(json.idContratista == "" || json.idContratista == null){
						json.idContratista = 0;
					}
					if(rendimiento.cuartel == 0){
						json.macroco = $("#macro"+k).val();
						if($("#macro"+k).val()*1 == 1){
							json.ceco = $("#ceco"+k).val();
						}else{
							json.ordenco = $("#ceco"+k).val();
						}
					}else{
						json.cuartel = $("#cuartel"+k).val();
					}
					jsonRendimientoDiario.push(json);
					count++;
				}
			}
		})
	}else{
		alerta("Faltan registros por completar, favor revisar");
		loading.hide();
		return;
	}
	var correctos = 0;
	var fallidos = 0;
	var arrFallidos = [];
	if(count == x){
		if(jsonRendimientoDiario.length != 0){
			$.ajax({
				url : "/simpleWeb/json/AGRO/ADD_RENDIMIENTO_DIARIO/",
				type : "PUT",
				data : JSON.stringify(jsonRendimientoDiario),
				async : false,
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept","application/json");
					xhr.setRequestHeader("Content-Type","application/json");
				},
				success : function(data, textStatus, jqXHR) {
					$.each(data, function(k,v){
						if(v.estado == true){
							correctos++;
						}else{
							arrFallidos.push(v.objeto);
							fallidos++;
						}
					})
					$.ajax({
						url : "/simpleWeb/json/AGRO/CALIFICACION_RENDIMIENTO/"+rendimiento.codigo,
						type : "GET",
						dataType : 'json',
						async : false,
						success : function(v) {
							
						}
					})
					jsonRendimientoDiario = [];
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
		if(updJsonRendimientoDiario.length != 0){
			$.ajax({
				url : "/simpleWeb/json/AGRO/UPD_RENDIMIENTO_DIARIO/",
				type : "PUT",
				data : JSON.stringify(updJsonRendimientoDiario),
				async : false,
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept","application/json");
					xhr.setRequestHeader("Content-Type","application/json");
				},
				success : function(data, textStatus, jqXHR) {
					$.each(data, function(k,v){
						if(v.estado == true){
							correctos++;
						}else{
							arrFallidos.push(v.objeto);
							fallidos++;
						}
					})
					$.ajax({
						url : "/simpleWeb/json/AGRO/CALIFICACION_RENDIMIENTO/"+rendimiento.codigo,
						type : "GET",
						dataType : 'json',
						async : false,
						success : function(v) {
							
						}
					})
					updJsonRendimientoDiario = [];
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
		if(delRD.length != 0){
			$.ajax({
				url : "/simpleWeb/json/AGRO/DEL_RENDIMIENTO_DIARIO/",
				type : "PUT",
				data : JSON.stringify(delRD),
				async : false,
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept","application/json");
					xhr.setRequestHeader("Content-Type","application/json");
				},
				success : function(data, textStatus, jqXHR) {
					$.each(data, function(k,v){
						if(v.estado == true){
							correctos++;
						}else{
							arrFallidos.push(v.objeto);
							fallidos++;
						}
					})
					$.ajax({
						url : "/simpleWeb/json/AGRO/CALIFICACION_RENDIMIENTO/"+rendimiento.codigo,
						type : "GET",
						dataType : 'json',
						async : false,
						success : function(v) {
							
						}
					})
					delRD = [];
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
		if(updJsonRendimientoDiario.length == 0 && jsonRendimientoDiario.length == 0 && delRD.length == 0){
			loading.hide();
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
				window.location.href = ("AsignarCuadrilla");
			})
		}
	}
	}, 50);
}
function detaleFallas(data){
	var mensaje = "";
	mensaje +=	"<div class='table-responsive'>";
	mensaje +=		"<table class='table table-bordered table-hover table-striped table-condensed' id='tbl_Datos_Comunes'>";
	mensaje +=			"<thead>";
	mensaje +=				"<tr>";
	mensaje +=					"<th>Fecha</th>";
	mensaje +=					"<th>Campo</th>";
	mensaje +=					"<th>Trabajador</th>";
	mensaje +=					"<th>Horas</th>";
	mensaje +=					"<th>Valor Liquido</th>";
	mensaje +=				"</tr>";
	mensaje +=			"</thead>";
	mensaje +=			"<body id='bodyMensaje'>";
	$.each(data, function(k,v){
		var campo = "";
		var cuartel = "";
		$.each(SESION.campo, function(ka,va){
			if(va.campo == v.campo){
				campo = va.descripcion;
			}
		})
		$.each(CUARTEL, function(ka,va){
			if(va.codigo == v.cuartel){
				cuartel = v.nombre;
			}
		})
		mensaje += 			"<tr>";
		mensaje +=				"<td>"+v.fecha+"</td>";
		mensaje +=				"<td>"+campo+"</td>";
		mensaje +=				"<td>"+v.nvnombre+"</td>";
		mensaje +=				"<td>"+v.horas_trabajadas+"</td>";
		mensaje +=				"<td>"+v.valor_liquido+"</td>";
		mensaje +=			"</tr>";
	})
	mensaje +=			"</body>";
	mensaje +=		"</table>";
	mensaje +=	'</div>';
	mensaje += 	"<div style='text-align: center;'>";
	mensaje += 		"<a id='confirmBase' class='btn green-dark submit-modal'onclick='closeModal()'>Aceptar</a>";
	mensaje += 	"</div>";
	popUp("Detalle Ingresos Fallidos", mensaje, true, "700px", true);
}
function tblEspecie(especie){
	var especier;
	$.each(SESION.especie, function(k,v){
		if(v.codigo == especie){
			especier = v.especie;
		}
	})
	return especier;
}
function tblVariedad(vari){
	var variedad;
	$.each(SESION.variedad, function(k,v){
		if(v.codigo == vari){
			variedad = v.variedad;
		}
	})
	return variedad;
}
function tblCuartel(cuar){
	var cuartel;
	$.each(CUARTEL, function(k,v){
		if(v.codigo == cuar){
			cuartel = v.nombre;
		}
	})
	return cuartel;
}
function tblFaena(fae){
	var faena;
	$.each(FAENA, function(k,v){
		if(v.codigo == fae){
			faena = v.faena;
		}
	})
	return faena;
}
function cargarTipoPago(){
	var pago = "<option value=''>Seleccione</option>";
	$.each(tipo_pago, function(k,v){
		pago += "<option value='"+v.codigo+"'>"+v.descripcion+"</option>";
	})
	return pago;
}
function cargarFaena(){
	var zona = "";
	$.each(SESION.campo, function(k,v){
		if(CAMPO == v.campo){
			zona = v.zona;
			return false;
		}
	})
	var faena = "<option value=''>Seleccione</option>";
	$.each(FAENA, function(k,v){
		if(zona == v.zona){
			faena += "<option value='"+v.codigo+"'>"+v.faena+"</option>";
		}
	})
	return faena;
}
function validarLaborCampo(faena, labor){
	var reque;
	var zona = "";
	$.each(SESION.campo, function(k,v){
		if(CAMPO == v.campo){
			zona = v.zona;
		}
	})
//	$.ajax({
//		url : "/simpleWeb/json/AGRO/GET_LABOR_FAENA/"+faena+"/"+zona,
//		type : "GET",
//		dataType : 'json',
//		async : false,
//		success : function(data) {
//			console.log(LABOR_RG)
			$.each(LABOR_RG, function(k,v){
				if(v.codigo == labor){
					reque = v.maquinaria;
				}
			})
//		}
//	})
	return reque;
}
function validateLaborWithRend(labor, id){
	var vali = false;
	$.each(tipos_cargosJson, function(k,v){
		if(v.codigo == id){
			vali = v.revaja;
		}
	})
	return vali;
}
function changeLabor(labor, id){
	var zona = "";
	$.each(SESION.campo, function(k,v){
		if(CAMPO == v.campo){
			zona = v.zona;
		}
	})
//	$.ajax({
//		url : "/simpleWeb/json/AGRO/GET_LABOR_FAENA_MAQ/"+labor+"/"+zona,
//		type : "GET",
//		dataType : 'json',
//		async : false,
//		success : function(data) {
			$.each(LABOR_RG, function(k,v){
				if(v.codigo == labor){
					if(v.maquinaria == 0){
						$("#maquinaria"+id).prop("disabled", true);
						$("#implemento"+id).prop("disabled", true);
					}else{
						$("#maquinaria"+id).prop("disabled", false);
						$("#implemento"+id).prop("disabled", false);
					}
					$.each(tipos_cargosJson, function(kj,vj){
						if(vj.codigo == id){
							vj.labor = labor;
							vj.revaja = v.rebaja;
						}
					})
				}
			})
//		}
//	})
}
function cambioFaena(faena, id){
	var labor = "<option value=''>Seleccione</option>";
	var zona = "";
	$.each(SESION.campo, function(k,v){
		if(CAMPO == v.campo){
			zona = v.zona;
		}
	})
//	$.ajax({
//		url : "/simpleWeb/json/AGRO/GET_LABOR_FAENA/"+faena+"/"+zona,
//		type : "GET",
//		dataType : 'json',
//		async : false,
//		success : function(data) {
			LABOR_GENERAL = LABOR_RG;
			laborTbl(rendimiento.labor);
			$.each(LABOR_RG, function(k,v){
				if(v.faena == faena){
					labor += "<option value='"+v.codigo+"'>"+v.labor+"</option>";
				}
			})
//		}
//	})
	$("#labor"+id).html(labor);
	return labor;
}
function laborTbl(labor){
	$.each(LABOR_GENERAL, function(k,v){
		if(v.codigo == labor){
			$("#labor").html(v.labor);
		}
	})
}
function changeVariedad(variedad, id){
	var cuartel = "<option value=''>Selecciones</option>";
	var count = 0;
	$.each(CUARTEL, function(k,v){
		if(v.variedad == variedad && CAMPO == v.campo && v.especie == $("#especie"+id).val()){
			cuartel += "<option value='"+v.codigo+"'>"+v.nombre+"</option>";
			count++;
		}
	})
	var cuartel_null = "<option value=''>Sin Cuartel</option>";
	if(count == 0){
		$("#cuartel"+id).html(cuartel_null);
	}else{
		$("#cuartel"+id).html(cuartel);
	}
}
function changeEspecie(especie, id){
	var variedad = "<option value=''>Selecciones</option>";
	var cuartel = "<option value=''>Selecciones</option>";
	var count = 0;
	$.each(CUARTEL, function(k,v){
		if(v.especie == especie && CAMPO == v.campo){
			cuartel += "<option value='"+v.codigo+"'>"+v.nombre+"</option>";
			count++;
		}
	})
	$.each(SESION.variedad, function(k,v){
		if(v.especie == especie){
			variedad += "<option value='"+v.codigo+"'>"+v.variedad+"</option>";
		}
	})
	
	$("#variedad"+id).html(variedad);
	var cuartel_null = "<option value=''>Sin Cuartel</option>";
	if(count == 0){
		$("#cuartel"+id).html(cuartel_null);
	}else{
		$("#cuartel"+id).html(cuartel);
	}
}
function loadEspecie(id){
	var especie = "<option value=''>Seleccione</option>";
	var d = 0;
	$.each(SESION.especie, function(k,v){
		especie += "<option value='"+v.codigo+"'>"+v.especie+"</option>";
		d++;
	})
	return especie;
}
function loadVariedad(especie){
	var variedad = "<option value=''>Seleccione</option>";
	var auxVarSelect = [];
	$.each(SESION.variedad, function(k,v){
		if(v.especie == especie && auxVarSelect.indexOf(v.codigo) == -1){
			auxVarSelect.push(v.codigo)
			variedad += "<option value='"+v.codigo+"'>"+v.variedad+"</option>";
		}
	})
	return variedad;
}
function cancelAddPisoDia(id){
	closeModal();
}
function slectAddTrab(input){
	if(input.value){
		$.ajax({
			url: IPSERVERWORK + "/simpleWeb/json/AGRO/getDetalleTrabajadorAgro/?TRABAJADOR=*&CAMPO=*&RUT="+input.value+"&CARGO=*&FECHA="+rendimiento.fecha+"&DIGITADOR="+SESION.idUser,
			type:	"POST",
			dataType: 'json',
			async: false,
			data: {rut: input.value},
			success: function(data){
				console.log(data)
				$(input).val("").trigger("change");
				apendTabla(data[0]);
			}
		})
	}
}
function cleanRut(){
	setTimeout(function(){ $("#addTrabakador").val(""); $("#add_Trabakador").val("");}, 50);
}
function getMaquinaria(c){
	var jsonMaq = {
		maquinaria: "<option value=''></option>",
		implemento: "<option value=''></option>"
	}
	$.each(MAQ_IMPL.EQUIPMENT_LIST, function(ka,va){
		if(va.EQUICATGRY == "T"){
			jsonMaq.maquinaria += '<option value="'+va.EQUIPMENT+'">'+va.DESCRIPT+'</option>';
		}
		if(va.EQUICATGRY != "T" && va.EQUICATGRY != "V"){
			jsonMaq.implemento += '<option value="'+va.EQUIPMENT+'">'+va.DESCRIPT+'</option>';
		}
	})
	return jsonMaq;
}
function parseFolio18(value){
    var res="";
    if(!isNaN(parseInt(value))){
         res = ("000000000000000000" + value).slice (-18);
    }else{
        res = false;
    }
    return res;
}
function rechazar(){
	var option = {
		title: "Observacion",
		input: "text",
		id: "obsRechazo",
		required: true
	}
	var c = confirmar.confirm("¿Desea rechazar este Rendimiento?");
	$(c.aceptar).click(function(){
		$.ajax({
			url: "/simpleWeb/json/AGRO/UPDATE_RENDIMIENTO?TIPO=MASIVO&ESTADO=7&CODIGO="+codigo_rg,
			type:	"GET",
			dataType: 'json',
			async: false,
			success: function(data){
				var a = alerta("Se ha rechazado este Rendimiento");
				$(a.aceptar).click(function(){
					window.location.href = ("AsignarCuadrilla");
				})
			},errror: function(er){
				alerta("Ha ocurrido un error interno del servidor, consulte con el administrador del sistema")
			}
		})
	})
}
function cambiarColor(input){
	if(input.value != ""){
		$(input).removeClass("red");
		$(input).addClass("blue");
	}else{
		$(input).removeClass("blue");
		$(input).addClass("red");
	}
}
function calcularTotales(){
	var total_liquidos = 0;
	$(".liquido").each(function(){
		total_liquidos = total_liquidos*1 + formatNumberDB($(this).val());
	})
	$("#total_liquidos").val(formatNumber(String(total_liquidos).split(".").join(",")));
	var bonos = 0;
	$(".bono_hx_dos").each(function(){
		bonos = bonos*1 + formatNumberDB($(this).val());
	})
	$(".bono").each(function(){
		bonos = bonos*1 + formatNumberDB($(this).val());
	})
	$("#total_bonos").val(formatNumber(String(bonos).split(".").join(",")));
}
function horasTrabajadas(input, id){
	if(input.value > 9){
		$("#hours"+id).show();
	}else{
		$("#hours"+id).hide();
	}
	var valor_piso; 
	if(input.value*1 === 0 && input.value != ""){
		$("#rendimiento"+id).prop("disabled", true);
		$("#bono_dos"+id).prop("disabled", true);
		$("#rendimiento"+id).val(0);
		$("#bono_dos"+id).val(0);
		valor_piso = valorXhora * formatNumberDB(input.value);
	}else{
		var input_rut;
		$.each(datosTrab, function(k,v){
			if(id == k){
				input_rut = v.rut;
			}
		})
		var res_horas;
		var vres_horas;
		var c_res = 0;
		$.each(datosTrab, function(k,v){
			if(input_rut == v.rut){
				vres_horas = v.horas_restantes;
				res_horas = v.horas_restantes - $(input).val();
			}
			c_res++;
			if(c_res == datosTrab.length){
				if(res_horas < 0){
//					alerta("djkfsdfhjkdj")
				}
			}
		})
		
		$("#rendimiento"+id).prop("disabled", false);
		$("#bono_dos"+id).prop("disabled", false);
		valor_piso = valorXhora * input.value;
	}
//	changeLabor($("#labor"+id).val(), id);
	var res = false;
	$.each(tipos_cargosJson, function(k,v){
		if(id == v.codigo){
			valor_piso = formatNumberDB(input.value) * v.sueldo.toFixed(0);
			res = true;
		}
	})
	if(!res){
		if(valor_piso > datosGenerales.rendimiento_general[0].base_piso_dia && input.value == datosGenerales.rendimiento_general[0].horas){
			valor_piso = datosGenerales.rendimiento_general[0].base_piso_dia;
		}
	}
	$("#valor"+id).val(formatNumber(valor_piso.toFixed(0)));
}
function calcularValor(input, id){
	if(input.id == "horas_trabajadas"+id){
		horasTrabajadas(input, id);
	}
	var valor_liquido = 0;
	if(input.id == "basePiso"+id || input.id == "tipo_pago"+id){
		var tp = $("#tipo_pago"+id).val();
		var bpd = $("#basePiso"+id).val();
		if(tp*1 == 2 && bpd*1 == 2){
			$("#btnCambio"+id).prop("disabled", true);
			$("#valor"+id).prop("disabled", true);
			$("#valor"+id).val(0);
			$("#rendimiento"+id).prop("disabled", false);
		}else{
			$("#btnCambio"+id).prop("disabled", false);
			$("#valor"+id).prop("disabled", false);
//			$.each(datosTrab, function(k,v){
//				if(id == k){
//					$("#valor"+id).val(formatNumber(v.sueldoDiario.toFixed(0)));
//				}
//			})
		}
	}
	if(input.id == "confirmBase"+id){
		if(validateModal()){
			$(".selectBase"+id).each(function(){
				if($(this)[0].checked){
					var v = JSON.parse($(this).val());
					$.each(tipos_cargosJson, function(ka,va){
						if(va.codigo == id){
							va.cargo = v.id;
							va.sueldo = ((v.sueldo*1)/horasMes);
						}
					})
					$("#cargo"+id).val(v.id);
					var sueldo_base = v.sueldo;
					if(sueldo_base*1 == 0){
						sueldo_base = formatNumberDB($("#otro"+id).val());
						monto = formatNumberDB($("#otro"+id).val());
					}
					sueldo_base = ((sueldo_base)/horasMes)*formatNumberDB($("#horas_trabajadas"+id).val())*1;
					selected = v.cargo;
					$("#basePiso").val(formatNumber(String((sueldo_base/horasMes).toFixed(0) * formatNumberDB($("#horas_trabajadas").val())).split(".").join(","))).trigger("keyup");
					$("#valor"+id).val(formatNumber((sueldo_base*1).toFixed(0)));
					$("#btnCambio"+id).prop("disabled", false);
					closeModal();
				}
			})
		}
	}
	var b_dos = formatNumber(String(formatNumberDB($("#valor_hx_dos"+id).val()) * formatNumberDB($("#hx_dos"+id).val())).split(".").join(","));
	$("#bono_dos"+id).val(b_dos);
	var hx_dos = formatNumberDB($("#"))
	var basePiso = $("#basePiso"+id).val();
	var horas_trabajadas = formatNumberDB($("#horas_trabajadas"+id).val());
	var horas_extras = formatNumberDB($("#horas_extras"+id).val());
	var hrx = formatNumberDB($("#hx").val());
	var valor_hx = formatNumberDB($("#valor_hx"+id).val());
	var tipo_pago = formatNumberDB($("#tipo_pago"+id).val());
	var rendimiento = formatNumberDB($("#rendimiento"+id).val());
	var bono = formatNumberDB($("#bono"+id).val());
	var bono_dos = formatNumberDB($("#bono_dos"+id).val());
	var valor_hx_pdo = formatNumberDB($("#valor_hx_pdo"+id).val());
	var valor = 0;
	var hx_restante = 12 - formatNumberDB($("#hx_restante"+id).html());
	if(valor_hx_pdo < valor_hx){
		$("#valor_hx_pdo"+id).val(formatNumber(valor_hx));
	}
	valor_hx_pdo = formatNumberDB($("#valor_hx_pdo"+id).val());
	if(tipo_pago*1 == 1 && $("#valor"+id)[0].disabled == false || basePiso*1 == 1){
		valor = formatNumberDB($("#valor"+id).val());
	}
	if(rendimiento != ""){
		$("#rend"+id).removeClass("has-error");
	}
	if(valor != ""){
		$("#val"+id).removeClass("has-error");
	}
	if(input.value < 0){
		input.value = "";
	}
	var monto_hx = 0;
	if((horas_extras > 2 || horas_extras > hx_restante) && tipo_dia == 0){
		alerta("Las horas Extras no pueden exceder el numero legal permitido (2) para un dia Habil")
		$("#horas_extras"+id).val("");
		$(".mhx").val("");
		$("#hx").val("");
	}else if((horas_extras > 7.5 || horas_extras > hx_restante) && tipo_dia == 0){
		alerta("Las horas Extras no pueden exceder el numero legal permitido (7,5) para un fin de Semana")
		$("#horas_extras"+id).val("");
		$(".mhx").val("");
		$("#hx").val("");
	}else{
		if($("#valor_hx_pdo"+id).val()){
			$("#monto_hx"+id).val(formatNumber(String(horas_extras * valor_hx_pdo*1).split(".").join(",")));
		}else if(valor_hx_pdo < valor_hx){
			$("#monto_hx"+id).val(formatNumber(String(horas_extras * valor_hx*1).split(".").join(",")));
		}
	}
	monto_hx = formatNumberDB($("#monto_hx"+id).val());
	valor_liquido = valor_liquido + ((horas_extras*1) * hora_extra_precio);
	valor_liquido = valor_liquido + ((horas_trabajadas*1) * hora_precio);
	valor_liquido = valor_liquido + (bono*1);
	valor_liquido = valor_liquido + (bono_dos*1);
	if(tipo_pago == 1){
		$("#valor_rendimiento"+id).attr("disabled", false);
		var valor_rendimiento = (valor_general*1) * (rendimiento*1);
		valor_liquido = valor_liquido + valor_rendimiento;
		$("#valor_rendimiento"+id).val(valor_rendimiento);
	}else{
		$("#valor_rendimiento"+id).attr("disabled", true);
		valor_liquido = valor_liquido + valor*1;
		$("#valor_rendimiento"+id).val("");
	}
	var valor_rendimiento = (valor_general*1) * (rendimiento*1);
	$("#valor_rendimiento"+id).val(formatNumber(String(valor_rendimiento).split(".").join(",")));
	$("#val_liq"+id).removeClass("has-error");
	var valor_final = 0;
	switch(basePiso*1) {
	    case 1:
	    	switch(tipo_pago*1){
		    	case 1:
		    		valor_final = (valor*1 + (bono*1) + (bono_dos*1) + monto_hx);
		    		break;
		    	case 2:
		    		if(valor_rendimiento*1 > valor*1){
		    			valor_final = (String(valor_rendimiento + (bono*1) + (bono_dos*1) + monto_hx).split(".").join(","));
			    	}else if(valor_rendimiento*1 == valor*1){
		    			valor_final = (String(valor_rendimiento + (bono*1) + (bono_dos*1) + monto_hx).split(".").join(","));
			    	}else if(valor_rendimiento*1 < valor*1){
		    			valor_final = (String(valor + (bono*1) + (bono_dos*1) + monto_hx).split(".").join(","));
			    	}
		    		break;
	    		case 3:
	    			valor_final = (String(valor + valor_rendimiento + (bono*1) + (bono_dos*1) + monto_hx).split(".").join(","));
	    			break;
		    	default:
	    	}
	        break;
	    case 2:
	    	switch(tipo_pago*1){
	    		case 1:
	    			valor_final = valor + (bono) + (bono_dos) + monto_hx;
	    			break;
	    		case 2:
	    			valor_final = String(valor_rendimiento + (bono*1) + (bono_dos*1) + monto_hx).split(".").join(",");
	    			break;
	    		case 3:
	    			valor_final = String(valor + valor_rendimiento + (bono*1) + (bono_dos*1) + monto_hx).split(".").join(",");
	    			break;
	    		default:
	    	}
	        break;
	    default:
	}
	$("#valor_liquido"+id).val(formatNumber(String(valor_final).split(".").join(",")));
	calcularTotales();
}
function mover(e, input, id){
	var codigo = event.which || event.keyCode;
    if(codigo == 40){
    	var inputId = input.id.split(id).join("");
    	id = id + 1;
      	$($("#"+inputId+id)).focus();
    }else if(codigo == 38){
    	var inputId = input.id.split(id).join("");
    	id = id - 1;
      	$($("#"+inputId+id)).focus();
    }
}